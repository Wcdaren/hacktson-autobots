# Technology Stack

## Core Technologies

### Backend
- **Python**: 3.9+ (primary language)
- **Flask**: Web framework for EC2 deployment
- **AWS Lambda**: Serverless deployment option

### AWS Services
- **Bedrock**: 
  - Titan Text Embeddings (1536-dim)
  - Titan Image Embeddings (1024-dim)
  - Claude 3 Sonnet (LLM for intent extraction)
- **OpenSearch**: Vector search with KNN + BM25
- **S3**: Product data storage (CSV files)

### Key Libraries
- `boto3`: AWS SDK
- `opensearch-py`: OpenSearch client
- `pandas`: Data processing
- `flask`: API server
- `flask-cors`: CORS support
- `pyyaml`: Configuration management
- `python-dotenv`: Environment variables
- `sshtunnel`: SSH tunneling for local dev

## Build System

### Environment Setup
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

### Configuration
- **config.yaml**: AWS resources, search parameters, feature flags
- **.env**: Credentials (not committed to git)
  - `OPENSEARCH_USERNAME`
  - `OPENSEARCH_PASSWORD`
  - `S3_BUCKET_NAME`

## Common Commands

### Data Pipeline
```bash
# Run complete pipeline (ingestion → embeddings → indexing)
python pipeline.py

# With custom config
python pipeline.py --config custom_config.yaml
```

### API Server (EC2)
```bash
# Start Flask server
./start_server.sh

# Or manually
python app.py --host 0.0.0.0 --port 5000

# With debug mode
python app.py --debug
```

### Lambda Deployment
```bash
# Deploy to AWS Lambda
./deploy.sh --bucket YOUR-BUCKET --opensearch YOUR-DOMAIN
```

### Testing
```bash
# Test environment setup
python test_env_loading.py

# Test API endpoints
python test_api.py http://your-endpoint

# Connectivity test (Jupyter notebook)
jupyter notebook "notebooks/3. aws_connectivity_test.ipynb"
```

### Development
```bash
# Check diagnostics (if available)
# Use IDE's built-in linting/type checking

# Run specific service units
python -m unit_1_data_ingestion.data_ingestion_service
python -m unit_2_embedding_generation.embedding_service
python -m unit_3_search_index.index_service
python -m unit_4_search_query.search_service
```

## Deployment Options

### Option A: EC2
- Instance: t3.medium+ (4GB+ RAM)
- Runs Flask server on port 5000
- Use systemd for production service management
- Nginx reverse proxy recommended

### Option B: Lambda
- Runtime: Python 3.11
- API Gateway for HTTP endpoints
- CloudFormation for infrastructure
- Serverless, auto-scaling

## Development Tools

### SSH Tunneling (Local Dev)
```bash
# OpenSearch/RDS accessed via jumphost
ssh -i ~/.ssh/id_rsa ec2-user@jumphost-sg.castlery.com
```

### Jupyter Notebooks
- Data exploration: `notebooks/2. data exploration.ipynb`
- Connectivity testing: `notebooks/3. aws_connectivity_test.ipynb`

## Architecture Patterns

### Domain-Driven Design (DDD)
- Aggregates: SearchQuery, SearchResult
- Value Objects: QueryText, SearchFilters, Score, Rank
- Domain Services: FilterExtractionService, EmbeddingService, SearchStrategyService
- Repositories: OpenSearchRepository, LLMResponseCache, TagCache

### Layered Architecture
```
API Layer → Application Layer → Domain Layer → Infrastructure Layer
```

## Performance Considerations

- Batch processing for embeddings (batch_size: 25)
- Connection pooling for OpenSearch
- Response caching (LLM responses, tags)
- Parallel processing for hybrid search
- Timeout enforcement (3 seconds)
