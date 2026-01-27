# Integration Contract

## Overview
This document defines the integration points between all units in the E-Commerce Semantic Search Engine system. It specifies the APIs, data formats, and communication protocols that each unit exposes and consumes.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Configuration Management (Unit 5)            │
│                    Provides config to all units                  │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌──────────────────┐      ┌──────────────────┐                │
│  │  Data Ingestion  │─────▶│    Embedding     │                │
│  │   Service (U1)   │      │  Generation (U2) │                │
│  └──────────────────┘      └──────────────────┘                │
│           │                          │                           │
│           │                          ▼                           │
│           │                 ┌──────────────────┐                │
│           └────────────────▶│  Search Index    │                │
│                             │  Service (U3)    │                │
│                             └──────────────────┘                │
│                                      │                           │
│                                      ▼                           │
│                             ┌──────────────────┐                │
│                             │  Search Query    │◀───── Frontend │
│                             │  Service (U4)    │                │
│                             └──────────────────┘                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

External Dependencies:
- AWS S3 (data source)
- AWS Bedrock (embeddings)
- AWS OpenSearch (search index)
```

---

## Unit 1: Data Ingestion Service

### Exposed Interfaces

#### 1.1 Enriched Product Data Output
**Purpose**: Provides enriched product data to downstream services

**Data Format**: JSON
```json
{
  "variant_id": "147",
  "product_id": "79",
  "sku": "50850023",
  "variant_name": "Peri Coffee Table",
  "product_name": "Peri Coffee Table",
  "description": "Peri's rounded yet rectangular form...",
  "aggregated_text": "Peri Coffee Table. Peri's rounded yet rectangular form...",
  "price": 549.0,
  "original_price": 549.0,
  "sale_price": 549.0,
  "currency": "SGD",
  "lifecycle_status": "Active",
  "product_type": "Simple",
  "categories": {
    "backend_category": "Tables",
    "backend_subcategory": "Coffee Tables",
    "frontend_category": "Tables",
    "frontend_subcategory": "Coffee Tables"
  },
  "collection": null,
  "color_tone": "Brown",
  "is_in_stock": true,
  "delivery_time_min_weeks": 1.0,
  "delivery_time_max_weeks": 2.0,
  "review_count": 325.0,
  "review_rating": 4.9,
  "variant_url": "https://www.castlery.com/sg/products/peri-coffee-table",
  "images": [
    {
      "image_url": "https://res.cloudinary.com/...",
      "image_type": "White Background",
      "image_position": 1,
      "default_image": true
    }
  ],
  "properties": {
    "dimensions": "W120 x D70 x H30cm",
    "material": "Walnut veneer with engineered wood",
    "care": "Dust with a soft, dry cloth..."
  },
  "options": {},
  "affinity": ["148", "480"],
  "files": [
    {
      "file_type": "Assembly",
      "file_url": "https://res.cloudinary.com/..."
    }
  ],
  "metadata": {
    "market": "SG",
    "is_custom_variant": false,
    "has_free_swatch_available": false
  }
}
```

**Storage Location**: 
- File system: `/data/enriched/products.json` (JSONL format)
- Or in-memory for direct handoff to Unit 2

**Access Method**: 
```python
from data_ingestion import DataIngestionService

service = DataIngestionService()
enriched_products = service.load_and_enrich()
# Returns: Iterator[EnrichedProduct]
```

### Consumed Interfaces
- **AWS S3**: CSV files from configured bucket/prefix
- **Configuration (Unit 5)**: Data ingestion configuration

---

## Unit 2: Embedding Generation Service

### Exposed Interfaces

#### 2.1 Text Embeddings Output
**Purpose**: Provides text embeddings for indexing

**Data Format**: JSON
```json
{
  "variant_id": "147",
  "embedding": [0.123, -0.456, 0.789, ...],  // 1536 dimensions
  "embedding_model": "amazon.titan-embed-text-v1",
  "text_length": 1234,
  "created_at": "2024-01-27T10:30:00Z"
}
```

**Storage Location**: `/data/embeddings/text_embeddings.json` (JSONL format)

**Access Method**:
```python
from embedding_generation import EmbeddingService

service = EmbeddingService()
text_embeddings = service.generate_text_embeddings(enriched_products)
# Returns: Iterator[TextEmbedding]
```

#### 2.2 Image Embeddings Output
**Purpose**: Provides image embeddings for indexing

**Data Format**: JSON
```json
{
  "variant_id": "147",
  "image_url": "https://res.cloudinary.com/...",
  "image_type": "White Background",
  "image_position": 1,
  "is_default": true,
  "embedding": [0.234, -0.567, 0.890, ...],  // 1024 dimensions
  "embedding_model": "amazon.titan-embed-image-v1",
  "created_at": "2024-01-27T10:35:00Z"
}
```

**Storage Location**: `/data/embeddings/image_embeddings.json` (JSONL format)

**Access Method**:
```python
image_embeddings = service.generate_image_embeddings(enriched_products)
# Returns: Iterator[ImageEmbedding]
```

#### 2.3 Query Embedding API
**Purpose**: Generate embeddings for search queries (used by Unit 4)

**Method Signature**:
```python
def embed_text_query(query: str) -> list[float]:
    """
    Generate embedding for text query.
    
    Args:
        query: User search string
        
    Returns:
        List of floats (1536 dimensions)
        
    Raises:
        ValueError: If query is empty
        RuntimeError: If Bedrock API fails
    """
    pass

def embed_image_query(image_base64: str) -> list[float]:
    """
    Generate embedding for image query.
    
    Args:
        image_base64: Base64 encoded image
        
    Returns:
        List of floats (1024 dimensions)
        
    Raises:
        ValueError: If image format is invalid
        RuntimeError: If Bedrock API fails
    """
    pass
```

### Consumed Interfaces
- **Unit 1**: Enriched product data
- **AWS Bedrock**: Titan embedding models
- **Configuration (Unit 5)**: Embedding generation configuration

---

## Unit 3: Search Index Service

### Exposed Interfaces

#### 3.1 Index Status API
**Purpose**: Check if indices are ready for search

**Method Signature**:
```python
def is_index_ready(index_name: str) -> bool:
    """Check if index exists and is ready"""
    pass

def get_index_stats(index_name: str) -> dict:
    """
    Get index statistics.
    
    Returns:
        {
            "document_count": int,
            "size_bytes": int,
            "status": "green" | "yellow" | "red"
        }
    """
    pass
```

#### 3.2 OpenSearch Client Access
**Purpose**: Provide OpenSearch client for search operations (used by Unit 4)

**Method Signature**:
```python
def get_opensearch_client() -> OpenSearch:
    """
    Get configured OpenSearch client.
    Used by Search Query Service for executing searches.
    """
    pass
```

### Consumed Interfaces
- **Unit 1**: Enriched product data (for metadata)
- **Unit 2**: Text and image embeddings
- **AWS OpenSearch**: Index storage
- **Configuration (Unit 5)**: Search index configuration

---

## Unit 4: Search Query Service

### Exposed Interfaces (Main APIs)

#### 4.1 Text Search API
**Purpose**: Main API for semantic text search

**Method Signature**:
```python
def get_text_results(user_search_string: str) -> dict:
    """
    Perform semantic text search.
    
    Args:
        user_search_string: Natural language search query
        
    Returns:
        {
            "status": "success" | "error",
            "message": str (optional),
            "total_results": int,
            "results": [
                {
                    "variant_id": str,
                    "product_id": str,
                    "rank": int,
                    "score": float,
                    "variant_name": str,
                    "product_name": str,
                    "description": str,
                    "price": float,
                    "currency": str,
                    "images": [
                        {
                            "url": str,
                            "type": str,
                            "position": int,
                            "is_default": bool
                        }
                    ],
                    "categories": {...},
                    "properties": {...},
                    "options": {...},
                    "review_rating": float,
                    "review_count": int,
                    "is_in_stock": bool,
                    # ... all other configured fields
                }
            ],
            "search_metadata": {
                "query": str,
                "search_mode": "knn" | "bm25" | "hybrid",
                "filters_applied": {
                    "price": {"min": float, "max": float},
                    "color": [str],
                    "material": [str],
                    "size": [str],
                    "category": [str]
                },
                "response_time_ms": int
            }
        }
        
    Raises:
        ValueError: If user_search_string is empty
        RuntimeError: If search service unavailable
    """
    pass
```

**HTTP Endpoint** (if wrapped in API):
```
POST /api/v1/search/text
Content-Type: application/json

Request:
{
    "query": "grey sofa under $1000"
}

Response: (same as method return value)
```

#### 4.2 Image Search API
**Purpose**: Main API for image similarity search

**Method Signature**:
```python
def get_image_match_result(image_base64: str) -> dict:
    """
    Perform image similarity search.
    
    Args:
        image_base64: Base64 encoded image (JPG or PNG)
        
    Returns:
        Same structure as get_text_results()
        
    Raises:
        ValueError: If image format is invalid
        RuntimeError: If search service unavailable
    """
    pass
```

**HTTP Endpoint** (if wrapped in API):
```
POST /api/v1/search/image
Content-Type: application/json

Request:
{
    "image": "base64_encoded_image_string"
}

Response: (same as method return value)
```

### Consumed Interfaces
- **Unit 2**: Query embedding generation
- **Unit 3**: OpenSearch client and indices
- **Configuration (Unit 5)**: Search query configuration

---

## Unit 5: Configuration Management

### Exposed Interfaces

#### 5.1 Configuration Access API
**Purpose**: Provide configuration to all units

**Method Signature**:
```python
class Config:
    @staticmethod
    def load(config_path: str = "config.yaml") -> None:
        """Load configuration from YAML file"""
        pass
    
    @staticmethod
    def get(key_path: str, default=None):
        """Get config value by dot-notation path"""
        pass
    
    @staticmethod
    def get_aws_config() -> dict:
        """Get AWS configuration"""
        pass
    
    @staticmethod
    def get_data_ingestion_config() -> dict:
        """Get data ingestion configuration"""
        pass
    
    @staticmethod
    def get_embedding_config() -> dict:
        """Get embedding generation configuration"""
        pass
    
    @staticmethod
    def get_search_index_config() -> dict:
        """Get search index configuration"""
        pass
    
    @staticmethod
    def get_search_query_config() -> dict:
        """Get search query configuration"""
        pass
    
    @staticmethod
    def validate() -> list[str]:
        """Validate configuration, return errors"""
        pass
```

**Usage Example**:
```python
from config import Config

# Load configuration at startup
Config.load("config.yaml")

# Validate
errors = Config.validate()
if errors:
    raise ValueError(f"Invalid configuration: {errors}")

# Access configuration
aws_config = Config.get_aws_config()
max_results = Config.get("search_query.max_results", default=50)
```

### Consumed Interfaces
- **File System**: config.yaml file
- **Environment Variables**: For sensitive values

---

## Data Flow Sequence

### Indexing Pipeline (One-time Setup)
```
1. Unit 5 (Config) loads configuration
2. Unit 1 (Data Ingestion) loads CSV from S3
3. Unit 1 enriches and aggregates data
4. Unit 2 (Embedding) generates text embeddings
5. Unit 2 generates image embeddings
6. Unit 3 (Search Index) creates OpenSearch indices
7. Unit 3 indexes embeddings + metadata
```

### Text Search Request Flow
```
1. Frontend calls Unit 4: get_text_results(query)
2. Unit 4 validates query
3. Unit 4 extracts filters from query
4. Unit 4 calls Unit 2: embed_text_query(query)
5. Unit 4 performs search on Unit 3's OpenSearch indices
6. Unit 4 ranks and formats results
7. Unit 4 returns JSON response to frontend
```

### Image Search Request Flow
```
1. Frontend calls Unit 4: get_image_match_result(image)
2. Unit 4 validates image format
3. Unit 4 calls Unit 2: embed_image_query(image)
4. Unit 4 performs KNN search on Unit 3's image index
5. Unit 4 ranks and formats results
6. Unit 4 returns JSON response to frontend
```

---

## Error Handling Contract

### Error Response Format
All units should return errors in consistent format:

```json
{
  "status": "error",
  "error_code": "EMPTY_QUERY" | "INVALID_IMAGE" | "NO_RESULTS" | "SERVICE_UNAVAILABLE" | "TIMEOUT",
  "message": "Human-readable error message",
  "details": {
    "timestamp": "2024-01-27T10:30:00Z",
    "request_id": "uuid",
    "additional_context": {}
  }
}
```

### Standard Error Codes
- `EMPTY_QUERY`: Search query is empty
- `INVALID_IMAGE`: Image format not supported
- `NO_RESULTS`: No results found for query
- `SERVICE_UNAVAILABLE`: External service (S3, Bedrock, OpenSearch) unavailable
- `TIMEOUT`: Operation exceeded timeout
- `INVALID_CONFIG`: Configuration validation failed
- `EMBEDDING_FAILED`: Failed to generate embedding
- `INDEX_FAILED`: Failed to index data

---

## Performance SLAs

### Unit 1: Data Ingestion Service
- Load 1000 products: <2 minutes
- Memory usage: <2GB

### Unit 2: Embedding Generation Service
- Text embedding: <100ms per product
- Image embedding: <200ms per image
- Batch of 25: <3 seconds

### Unit 3: Search Index Service
- Index 1000 text embeddings: <2 minutes
- Index 5000 image embeddings: <5 minutes

### Unit 4: Search Query Service
- Text search: <3 seconds (95th percentile)
- Image search: <3 seconds (95th percentile)
- Concurrent queries: 10+ per second

---

## Security Contract

### Authentication
- AWS credentials via environment variables or IAM roles
- OpenSearch credentials via environment variables
- No credentials in code or config files

### Data Privacy
- No PII in logs
- Secure transmission (HTTPS/TLS)
- Temporary files cleaned up after processing

---

## Testing Contract

### Unit Testing
Each unit must provide:
- Unit tests with >80% code coverage
- Mock external dependencies
- Test error handling

### Integration Testing
- End-to-end test from data ingestion to search
- Test with sample dataset (100 products)
- Validate all integration points

### Performance Testing
- Load test with 1000 products
- Concurrent query test (10 queries/second)
- Measure response times

---

## Deployment Dependencies

### Deployment Order
1. Unit 5 (Configuration) - First
2. Unit 1 (Data Ingestion) - Second
3. Unit 2 (Embedding Generation) - Third
4. Unit 3 (Search Index) - Fourth
5. Unit 4 (Search Query) - Last

### External Dependencies
- AWS S3 bucket with CSV data
- AWS Bedrock access (Titan models)
- AWS OpenSearch domain
- Python 3.9+
- Required Python packages (boto3, opensearch-py, pyyaml, etc.)

---

## Monitoring and Observability

### Metrics to Expose
Each unit should expose:
- Operation count
- Success/failure rate
- Response time (p50, p95, p99)
- Error count by type

### Logging Requirements
- Structured logging (JSON format)
- Log levels: DEBUG, INFO, WARN, ERROR
- Include request ID for tracing
- Performance metrics in logs

---

## Version Compatibility

### API Versioning
- All APIs use semantic versioning
- Breaking changes require major version bump
- Backward compatibility for minor versions

### Data Format Versioning
- Enriched product data format: v1.0
- Embedding format: v1.0
- Search response format: v1.0
