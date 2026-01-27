# Quick Start Guide - 5 Minutes to Production

## Prerequisites
- AWS account with Bedrock, OpenSearch, S3 access
- AWS CLI configured
- Python 3.11+ with virtual environment

## Step 1: Configure (1 minute)

Edit `config.yaml`:
```yaml
aws:
  region: us-east-1
  s3:
    bucket: YOUR-BUCKET-NAME  # Replace
  opensearch:
    endpoint: https://YOUR-DOMAIN.us-east-1.es.amazonaws.com  # Replace
```

## Step 2: Run Pipeline (3-5 minutes)

```bash
# Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run data pipeline
python pipeline.py
```

This will:
- Load 3,693 products from S3
- Generate embeddings via Bedrock
- Create OpenSearch indices
- Index all products

## Step 3: Deploy API (1 minute)

```bash
./deploy.sh \
  --bucket YOUR-BUCKET-NAME \
  --opensearch YOUR-DOMAIN.us-east-1.es.amazonaws.com
```

## Step 4: Test

```bash
# Get your API endpoint from deployment output
API_ENDPOINT="https://abc123.execute-api.us-east-1.amazonaws.com/dev"

# Test text search
curl -X POST $API_ENDPOINT/search/text \
  -H 'Content-Type: application/json' \
  -d '{"query": "grey sofa under $1000"}'
```

## Done! 🎉

Your semantic search API is live at:
- Text Search: `$API_ENDPOINT/search/text`
- Image Search: `$API_ENDPOINT/search/image`

## What You Get

✅ Semantic text search with filter extraction
✅ Image similarity search
✅ Hybrid search (KNN + BM25 + RRF)
✅ Auto-scaling serverless API
✅ <3 second response time
✅ Up to 50 results per query

## Next Steps

- Add authentication (API Gateway authorizer)
- Set up monitoring (CloudWatch dashboards)
- Add caching (ElastiCache)
- Configure CI/CD pipeline

See `DEPLOYMENT_GUIDE.md` for detailed documentation.
