# Deployment Guide - Semantic Search System

## Overview
This guide walks you through deploying the semantic search system to AWS using serverless architecture (Lambda + API Gateway).

## Prerequisites

### 1. AWS Account Setup
- AWS account with appropriate permissions
- AWS CLI installed and configured
- IAM permissions for:
  - Lambda
  - API Gateway
  - CloudFormation
  - OpenSearch
  - Bedrock
  - S3

### 2. AWS Resources Required
- **S3 Bucket**: Contains product CSV files
- **OpenSearch Domain**: For vector search indices
- **Bedrock Access**: Titan embedding models enabled

### 3. Local Environment
```bash
# Python 3.11 or higher
python --version

# AWS CLI configured
aws configure

# Install dependencies
pip install -r requirements.txt
```

## Deployment Steps

### Step 1: Prepare Configuration

Edit `config.yaml` with your AWS resource details:

```yaml
aws:
  region: us-east-1
  
  s3:
    bucket: your-bucket-name  # Your S3 bucket
    data_prefix: data/active_only/
  
  opensearch:
    endpoint: https://your-domain.us-east-1.es.amazonaws.com
    use_iam_auth: true
```

### Step 2: Run Data Pipeline

This step ingests data, generates embeddings, and creates indices:

```bash
# Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# Run pipeline
python pipeline.py --config config.yaml
```

**Expected output:**
```
STEP 1: DATA INGESTION
✓ Ingested 3693 products

STEP 2: EMBEDDING GENERATION
✓ Generated embeddings for 3693 products

STEP 3: CREATE OPENSEARCH INDICES
✓ Text index created
✓ Image index created

STEP 4: INDEX PRODUCTS
✓ Indexed 3693 products

PIPELINE COMPLETE
Total time: 450.23 seconds
```

### Step 3: Deploy Lambda Functions

Deploy the search API using CloudFormation:

```bash
./deploy.sh \
  --bucket your-bucket-name \
  --opensearch your-domain.us-east-1.es.amazonaws.com \
  --region us-east-1 \
  --environment dev
```

**What this does:**
1. Creates Lambda deployment package
2. Deploys CloudFormation stack
3. Creates API Gateway endpoints
4. Updates Lambda function code
5. Configures IAM roles and permissions

**Expected output:**
```
Deployment Complete!

API Endpoints:
  Text Search: https://abc123.execute-api.us-east-1.amazonaws.com/dev/search/text
  Image Search: https://abc123.execute-api.us-east-1.amazonaws.com/dev/search/image
```

### Step 4: Test the API

#### Test Text Search
```bash
curl -X POST https://your-api-endpoint/dev/search/text \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "grey sofa under $1000"
  }'
```

**Expected response:**
```json
{
  "status": "success",
  "total_results": 5,
  "results": [
    {
      "variant_id": "7544",
      "product_name": "Adams 2 Seater Sofa",
      "price": 999.0,
      "score": 0.8542,
      "rank": 1,
      "image_url": "https://..."
    }
  ],
  "search_metadata": {
    "query": "grey sofa under $1000",
    "search_mode": "hybrid",
    "filters_applied": {
      "price_max": 1000,
      "colors": ["grey"],
      "categories": ["sofa"]
    },
    "response_time_ms": 245
  }
}
```

#### Test Image Search
```bash
# Convert image to base64
IMAGE_BASE64=$(base64 -i test_image.jpg)

curl -X POST https://your-api-endpoint/dev/search/image \
  -H 'Content-Type: application/json' \
  -d "{
    \"image\": \"$IMAGE_BASE64\"
  }"
```

## Architecture

### Serverless Architecture
```
User Request
    ↓
API Gateway
    ↓
Lambda Function
    ↓
┌─────────────┬──────────────┐
│   Bedrock   │  OpenSearch  │
│  (Embeddings)│  (Search)    │
└─────────────┴──────────────┘
```

### Data Flow

**Text Search:**
1. User query → API Gateway → Lambda
2. Lambda → Bedrock (generate query embedding)
3. Lambda → OpenSearch (KNN + BM25 search)
4. Lambda → Reciprocal Rank Fusion
5. Lambda → Format results → Return JSON

**Image Search:**
1. User image → API Gateway → Lambda
2. Lambda → Bedrock (generate image embedding)
3. Lambda → OpenSearch (KNN search on image index)
4. Lambda → Format results → Return JSON

## Configuration Options

### Search Modes

Edit `config.yaml` to change search behavior:

```yaml
search_query:
  default_search_mode: hybrid  # Options: knn, bm25, hybrid
  max_results: 50
  response_timeout_seconds: 3
  
  # Hybrid mode weights
  hybrid_weights:
    knn_weight: 0.6
    bm25_weight: 0.4
  
  # RRF parameter
  rrf:
    k: 60
```

### Filter Configuration

Add or modify filter keywords:

```yaml
search_query:
  filters:
    color_values:
      - grey
      - brown
      - white
      # Add more colors
    
    material_values:
      - wood
      - leather
      # Add more materials
```

## Monitoring

### CloudWatch Logs

View Lambda logs:
```bash
aws logs tail /aws/lambda/semantic-search-text-dev --follow
```

### CloudWatch Metrics

Monitor:
- Lambda invocations
- Lambda duration
- Lambda errors
- API Gateway requests
- API Gateway latency

### OpenSearch Metrics

Check index health:
```bash
curl -X GET "https://your-opensearch-endpoint/_cat/indices?v"
```

## Troubleshooting

### Issue: Pipeline fails at embedding generation

**Cause**: Bedrock Titan models not enabled in region

**Solution**:
1. Go to AWS Bedrock console
2. Navigate to Model access
3. Enable Titan Text Embeddings and Titan Image Embeddings

### Issue: Lambda timeout

**Cause**: Response time > 30 seconds

**Solution**:
1. Increase Lambda timeout in CloudFormation template
2. Optimize OpenSearch queries
3. Reduce max_results

### Issue: OpenSearch connection refused

**Cause**: Security group or IAM permissions

**Solution**:
1. Check OpenSearch domain access policy
2. Verify Lambda IAM role has OpenSearch permissions
3. Ensure OpenSearch domain is in same VPC (if using VPC)

### Issue: No results returned

**Cause**: Index is empty or query doesn't match

**Solution**:
1. Verify pipeline completed successfully
2. Check index stats: `python -c "from unit_3_search_index.index_service import SearchIndexService; import yaml; config = yaml.safe_load(open('config.yaml')); service = SearchIndexService(config); print(service.get_index_stats())"`
3. Try broader search query

## Cost Estimation

### AWS Services Cost (Monthly)

**For 10,000 searches/day:**

- **Lambda**: ~$5
  - 10,000 invocations/day × 30 days = 300,000 invocations
  - Average 1 second duration, 1024 MB memory
  
- **API Gateway**: ~$3.50
  - 300,000 requests × $0.0000035/request
  
- **Bedrock**: ~$30
  - 300,000 embedding requests × $0.0001/request
  
- **OpenSearch**: ~$100-200
  - t3.small.search instance (dev)
  - 10 GB storage
  
- **S3**: <$1
  - Minimal storage and requests

**Total**: ~$140-240/month for dev environment

**Production**: Scale OpenSearch instance based on load

## Performance Optimization

### 1. Caching
Add caching layer (ElastiCache) for frequent queries:
```python
# Check cache before search
cached_result = redis_client.get(query_hash)
if cached_result:
    return cached_result
```

### 2. Batch Processing
Process multiple queries in parallel:
```python
# Use Lambda concurrent executions
# Configure reserved concurrency
```

### 3. Index Optimization
Tune OpenSearch settings:
```yaml
indexing:
  number_of_shards: 2  # Increase for larger datasets
  number_of_replicas: 1  # Increase for high availability
  knn:
    ef_construction: 512  # Higher = better accuracy, slower indexing
    m: 16  # Higher = better accuracy, more memory
```

## Scaling

### Horizontal Scaling
- Lambda auto-scales automatically
- Configure reserved concurrency for predictable performance
- Add OpenSearch data nodes for larger datasets

### Vertical Scaling
- Increase Lambda memory (improves CPU)
- Upgrade OpenSearch instance type
- Use OpenSearch UltraWarm for cost-effective storage

## Security Best Practices

1. **API Authentication**: Add API Gateway authorizer
2. **Encryption**: Enable encryption at rest for OpenSearch
3. **VPC**: Deploy Lambda and OpenSearch in VPC
4. **Secrets**: Use AWS Secrets Manager for credentials
5. **Logging**: Enable CloudTrail for audit logs

## Rollback

If deployment fails:

```bash
# Delete CloudFormation stack
aws cloudformation delete-stack --stack-name semantic-search-stack

# Restore previous version
aws lambda update-function-code \
  --function-name semantic-search-text-dev \
  --s3-bucket your-backup-bucket \
  --s3-key previous-version.zip
```

## Next Steps

1. **Add Authentication**: Implement API key or Cognito auth
2. **Add Caching**: Use ElastiCache for frequent queries
3. **Add Monitoring**: Set up CloudWatch dashboards
4. **Add CI/CD**: Automate deployment with GitHub Actions
5. **Add Testing**: Integration tests with real AWS services
6. **Add Documentation**: API documentation with Swagger/OpenAPI

## Support

For issues or questions:
1. Check CloudWatch logs
2. Review OpenSearch cluster health
3. Verify Bedrock model access
4. Check IAM permissions

---

**Deployment Complete!** 🎉

Your semantic search system is now live and ready to handle search requests.
