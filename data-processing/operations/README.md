# Phase 3: Operations - Deployment & Infrastructure

## Overview
Production-ready deployment infrastructure for the semantic search system with real AWS integrations (Bedrock, OpenSearch, S3).

## 🚀 Quick Start

```bash
# 1. Configure (edit config.yaml with your AWS resources)
vim config.yaml

# 2. Run data pipeline
python pipeline.py

# 3. Deploy API
./deploy.sh --bucket YOUR-BUCKET --opensearch YOUR-DOMAIN

# 4. Test
python test_api.py YOUR-API-ENDPOINT
```

See `QUICK_START.md` for detailed 5-minute guide.

## 📁 Directory Structure

```
operations/
├── README.md                          # This file
├── DEPLOYMENT_GUIDE.md                # Comprehensive deployment guide
├── QUICK_START.md                     # 5-minute quick start
├── config.yaml                        # Production configuration
├── requirements.txt                   # Python dependencies
├── pipeline.py                        # Main data pipeline orchestrator
├── lambda_handler.py                  # Lambda entry point for API
├── deploy.sh                          # Automated deployment script
├── cloudformation_template.yaml       # Infrastructure as code
├── test_api.py                        # API test suite
│
├── unit_1_data_ingestion/
│   └── data_ingestion_service.py      # Load CSV from S3, enrich data
│
├── unit_2_embedding_generation/
│   └── embedding_service.py           # Generate embeddings via Bedrock
│
├── unit_3_search_index/
│   └── index_service.py               # Create and manage OpenSearch indices
│
└── unit_4_search_query/
    └── search_service.py              # Production search API
```

## 🏗️ Architecture

### Serverless Deployment (Recommended)
```
User Request
    ↓
API Gateway (/search/text, /search/image)
    ↓
Lambda Functions (Python 3.11)
    ↓
┌─────────────┬──────────────┬─────────┐
│   Bedrock   │  OpenSearch  │   S3    │
│ (Embeddings)│   (Search)   │ (Data)  │
└─────────────┴──────────────┴─────────┘
```

### Data Pipeline Flow
```
S3 CSV Files
    ↓
Unit 1: Data Ingestion (load & enrich)
    ↓
Unit 2: Embedding Generation (Bedrock Titan)
    ↓
Unit 3: Index Creation (OpenSearch KNN)
    ↓
Ready for Search Queries
```

## 📋 Components

### 1. Configuration (`config.yaml`)
- AWS resource settings (S3, Bedrock, OpenSearch)
- Search parameters (mode, max results, timeout)
- Filter configuration (colors, materials, categories)
- Hybrid search weights and RRF parameters
- Indexing and KNN settings

### 2. Data Pipeline (`pipeline.py`)
Orchestrates the complete data ingestion and indexing process:
- Loads 3,693 products from S3
- Generates embeddings via Bedrock
- Creates OpenSearch indices
- Indexes all products with embeddings

**Run time**: ~5-10 minutes for full dataset

### 3. Search Service (`unit_4_search_query/search_service.py`)
Production search API with:
- Text search with filter extraction
- Image similarity search
- KNN, BM25, and Hybrid search modes
- Reciprocal Rank Fusion
- Real-time query embedding via Bedrock
- OpenSearch KNN vector search

### 4. Lambda Handler (`lambda_handler.py`)
Serverless API entry point:
- Routes requests to text/image search
- Handles API Gateway events
- Returns formatted JSON responses
- Error handling and logging

### 5. Infrastructure (`cloudformation_template.yaml`)
Complete serverless stack:
- 2 Lambda functions (text + image search)
- API Gateway with REST endpoints
- IAM roles with least-privilege permissions
- Environment configuration

### 6. Deployment Script (`deploy.sh`)
Automated deployment:
- Creates Lambda package with dependencies
- Deploys CloudFormation stack
- Updates Lambda function code
- Outputs API endpoints

### 7. Test Suite (`test_api.py`)
Comprehensive API testing:
- Text search tests (5 queries)
- Image search tests
- Error handling tests
- Performance tests (response time)

## 🎯 Features

### Search Capabilities
✅ **Text Search**
- Semantic search using embeddings
- Keyword search with BM25
- Hybrid search with RRF
- Natural language filter extraction
- Price, color, material, category filters

✅ **Image Search**
- Image similarity using Bedrock Titan
- KNN vector search
- Support for JPG and PNG formats

✅ **Performance**
- <3 second response time
- Up to 50 results per query
- Auto-scaling with Lambda
- Concurrent request handling

### Error Handling
- Empty query detection
- Invalid image format validation
- No results handling
- Timeout management
- Comprehensive error messages

## 📖 Documentation

- **DEPLOYMENT_GUIDE.md**: Complete deployment documentation
  - Prerequisites and setup
  - Step-by-step instructions
  - Configuration options
  - Monitoring and troubleshooting
  - Cost estimation
  - Performance optimization
  - Security best practices

- **QUICK_START.md**: 5-minute deployment guide
  - Minimal steps to get started
  - Quick configuration
  - Fast deployment
  - Basic testing

## 🧪 Testing

### Run Pipeline Locally
```bash
# Install dependencies
pip install -r requirements.txt

# Run pipeline
python pipeline.py --config config.yaml
```

### Test Search Service Locally
```bash
# Test with local config
cd unit_4_search_query
python search_service.py
```

### Test Deployed API
```bash
# Run full test suite
python test_api.py https://your-api-endpoint.com/dev

# Test with image
python test_api.py https://your-api-endpoint.com/dev test_image.jpg
```

## 🔧 Configuration

### Required AWS Resources

1. **S3 Bucket**: Contains product CSV files
   - `data/active_only/variant.csv`
   - `data/active_only/variant_image.csv`
   - `data/active_only/variant_property.csv`
   - `data/active_only/variant_option.csv`
   - `data/active_only/variant_affinity.csv`
   - `data/active_only/variant_file.csv`

2. **OpenSearch Domain**: For vector search
   - Version: 2.x or higher
   - Instance: t3.small.search (dev) or larger
   - Storage: 10 GB minimum
   - KNN plugin enabled

3. **Bedrock Access**: Titan models enabled
   - `amazon.titan-embed-text-v1` (1536-dim)
   - `amazon.titan-embed-image-v1` (1024-dim)

### Environment Variables (Optional)

Set in Lambda or local environment:
```bash
export AWS_REGION=us-east-1
export OPENSEARCH_ENDPOINT=your-domain.us-east-1.es.amazonaws.com
export S3_BUCKET=your-bucket-name
export SEARCH_MODE=hybrid
export MAX_RESULTS=50
```

## 📊 Performance

### Expected Metrics
- **Response Time**: <3 seconds (p95)
- **Throughput**: 10+ queries/second
- **Accuracy**: High semantic relevance
- **Availability**: 99.9% (Lambda SLA)

### Optimization Tips
1. Increase Lambda memory for faster execution
2. Use OpenSearch reserved instances for consistent performance
3. Enable caching for frequent queries
4. Tune KNN parameters (ef_construction, m)
5. Adjust hybrid search weights

## 💰 Cost Estimation

For 10,000 searches/day:
- Lambda: ~$5/month
- API Gateway: ~$3.50/month
- Bedrock: ~$30/month
- OpenSearch: ~$100-200/month
- S3: <$1/month

**Total**: ~$140-240/month (dev environment)

See DEPLOYMENT_GUIDE.md for detailed cost breakdown.

## 🔒 Security

- IAM roles with least-privilege permissions
- API Gateway with CORS enabled
- OpenSearch with IAM authentication
- No credentials in code or config
- CloudWatch logging enabled

## 📈 Monitoring

### CloudWatch Logs
```bash
# View Lambda logs
aws logs tail /aws/lambda/semantic-search-text-dev --follow
```

### CloudWatch Metrics
- Lambda invocations
- Lambda duration
- Lambda errors
- API Gateway requests
- API Gateway latency

### OpenSearch Metrics
- Index size
- Search latency
- Query rate
- Cluster health

## 🐛 Troubleshooting

See DEPLOYMENT_GUIDE.md for detailed troubleshooting guide.

Common issues:
- **Bedrock access denied**: Enable Titan models in Bedrock console
- **OpenSearch connection failed**: Check IAM permissions and security groups
- **Lambda timeout**: Increase timeout or optimize queries
- **No results**: Verify pipeline completed and indices are populated

## 🎓 Next Steps

1. **Deploy**: Follow QUICK_START.md to deploy in 5 minutes
2. **Test**: Run test suite to verify functionality
3. **Monitor**: Set up CloudWatch dashboards
4. **Optimize**: Tune search parameters based on results
5. **Scale**: Adjust OpenSearch and Lambda resources as needed

## 📞 Support

For issues or questions:
1. Check DEPLOYMENT_GUIDE.md troubleshooting section
2. Review CloudWatch logs
3. Verify AWS resource configuration
4. Check IAM permissions

---

**Ready to deploy!** 🚀

Start with `QUICK_START.md` for fastest deployment.
