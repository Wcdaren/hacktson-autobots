# Unit 3: Search Index Service

## Overview
The Search Index Service is responsible for creating and managing OpenSearch indices, and indexing embeddings with metadata. This unit provides the foundation for fast similarity search by organizing data in OpenSearch with appropriate configurations for KNN and BM25 search.

## Responsibilities
- Create and configure OpenSearch indices
- Define index mappings for embeddings and metadata
- Configure KNN settings for vector search
- Configure BM25 settings for keyword search
- Bulk index embeddings and metadata
- Validate successful indexing
- Handle indexing errors and retries
- Provide index management operations

## User Stories Included

### From Epic 3: Search Index Management
- **US-3.1**: OpenSearch Index Creation
- **US-3.2**: Data Indexing to OpenSearch

## Acceptance Criteria Summary
- Creates separate indices for text and image embeddings
- Configures KNN for similarity search
- Configures BM25 for keyword search
- Indexes embeddings with full product metadata
- Implements bulk indexing for efficiency
- Retries failed indexing operations
- Validates successful indexing
- Tracks and logs progress

## Technical Components
- OpenSearch client
- Index schema definitions
- Bulk indexing engine
- Retry mechanism
- Index validation module
- Index management utilities

## Dependencies
- **Upstream**: Embedding Generation Service (Unit 2) - embeddings and metadata
- **Downstream**: Search Query Service (Unit 4)
- **External**: AWS OpenSearch Service

## Interfaces

### Input Interface
```python
# From Unit 2
class TextEmbedding:
    variant_id: str
    embedding: list[float]
    # ... metadata

class ImageEmbedding:
    variant_id: str
    image_url: str
    embedding: list[float]
    # ... metadata

# From Unit 1 (for metadata)
class EnrichedProduct:
    variant_id: str
    # ... all product fields
```

### Index Schemas

#### Text Embeddings Index
```json
{
  "mappings": {
    "properties": {
      "variant_id": {"type": "keyword"},
      "product_id": {"type": "keyword"},
      "text_embedding": {
        "type": "knn_vector",
        "dimension": 1536,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib"
        }
      },
      "variant_name": {"type": "text", "analyzer": "standard"},
      "product_name": {"type": "text", "analyzer": "standard"},
      "description": {"type": "text", "analyzer": "standard"},
      "aggregated_text": {"type": "text", "analyzer": "standard"},
      "price": {"type": "float"},
      "currency": {"type": "keyword"},
      "categories": {"type": "object"},
      "color": {"type": "keyword"},
      "material": {"type": "keyword"},
      "size": {"type": "keyword"},
      "dimensions": {"type": "text"},
      "is_in_stock": {"type": "boolean"},
      "review_rating": {"type": "float"},
      "review_count": {"type": "integer"},
      "images": {"type": "object"},
      "properties": {"type": "object"},
      "options": {"type": "object"},
      "metadata": {"type": "object"}
    }
  },
  "settings": {
    "index": {
      "knn": true,
      "knn.algo_param.ef_search": 512,
      "number_of_shards": 2,
      "number_of_replicas": 1
    }
  }
}
```

#### Image Embeddings Index
```json
{
  "mappings": {
    "properties": {
      "variant_id": {"type": "keyword"},
      "product_id": {"type": "keyword"},
      "image_url": {"type": "keyword"},
      "image_type": {"type": "keyword"},
      "image_position": {"type": "integer"},
      "is_default": {"type": "boolean"},
      "image_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib"
        }
      },
      "variant_name": {"type": "text"},
      "product_name": {"type": "text"},
      "price": {"type": "float"},
      "categories": {"type": "object"}
    }
  },
  "settings": {
    "index": {
      "knn": true,
      "knn.algo_param.ef_search": 512,
      "number_of_shards": 2,
      "number_of_replicas": 1
    }
  }
}
```

### Configuration
```yaml
search_index:
  opensearch:
    endpoint: "https://your-opensearch-domain.region.es.amazonaws.com"
    port: 443
    use_ssl: true
    verify_certs: true
    connection_timeout: 30
    max_retries: 3
  
  indices:
    text_embeddings:
      name: "product_text_embeddings"
      shards: 2
      replicas: 1
      knn_dimension: 1536  # Titan text embedding dimension
      knn_method: "hnsw"
      knn_space_type: "cosinesimil"
      ef_search: 512
    
    image_embeddings:
      name: "product_image_embeddings"
      shards: 2
      replicas: 1
      knn_dimension: 1024  # Titan image embedding dimension
      knn_method: "hnsw"
      knn_space_type: "cosinesimil"
      ef_search: 512
  
  indexing:
    bulk_size: 500
    bulk_timeout: 60  # seconds
    refresh_interval: "1s"
    max_retries: 3
    retry_delay: 2  # seconds
```

## Error Handling
- OpenSearch connection failure → Retry with exponential backoff
- Index already exists → Skip creation or delete and recreate (configurable)
- Bulk indexing failure → Retry failed documents
- Document validation failure → Log error, skip document
- Timeout during indexing → Increase timeout and retry

## Performance Targets
- Index 1000 text embeddings in under 2 minutes
- Index 5000 image embeddings in under 5 minutes
- Bulk indexing efficiency >90%
- Index creation time <30 seconds

## Testing Requirements
- Unit tests for index schema creation
- Unit tests for bulk indexing logic
- Mock OpenSearch for testing
- Test retry logic with simulated failures
- Integration test with real OpenSearch (small sample)
- Validate index mappings and settings
- Test query performance on indexed data

## Non-Functional Requirements
- Efficient bulk indexing
- Proper index configuration for performance
- Comprehensive error logging
- Progress tracking
- Index validation
- Idempotent operations (can re-index safely)

## Index Management Operations
- Create index
- Delete index
- Check index exists
- Get index stats
- Refresh index
- Bulk index documents
- Validate indexed documents
