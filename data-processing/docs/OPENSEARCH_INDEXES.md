# OpenSearch Indexes Documentation

## Overview

This document describes the OpenSearch indexes used by the semantic search system, including their structure, sample data, and usage examples.

## Connection Details

- **OpenSearch Endpoint**: `vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com`
- **Region**: `ap-southeast-1`
- **Access**: Requires SSH tunnel via `jumphost-sg.castlery.com` (username: `autobots`)
- **Authentication**: Basic auth (username/password from environment variables)

## Indexes

### 1. Text Search Index

**Index Name**: `search_engine_v1_text`

**Purpose**: Semantic text search with product metadata and KNN vector search

**Statistics**:
- Documents: 3,591 products
- Size: ~17 MB
- Embedding Dimension: 1024 (Titan Text Embeddings v2)

**Schema**:

```json
{
  "mappings": {
    "properties": {
      "variant_id": {"type": "keyword"},
      "product_id": {"type": "keyword"},
      "variant_name": {"type": "text", "fields": {"keyword": {"type": "keyword"}}},
      "product_name": {"type": "text", "fields": {"keyword": {"type": "keyword"}}},
      "description": {"type": "text"},
      "aggregated_text": {"type": "text"},
      "price": {"type": "float"},
      "currency": {"type": "keyword"},
      "product_type": {"type": "keyword"},
      "frontend_category": {"type": "keyword"},
      "frontend_subcategory": {"type": "keyword"},
      "backend_category": {"type": "keyword"},
      "review_count": {"type": "integer"},
      "review_rating": {"type": "float"},
      "collection": {"type": "keyword"},
      "color_tone": {"type": "keyword"},
      "material": {"type": "keyword"},
      "other_properties": {"type": "text"},
      "variant_url": {"type": "keyword"},
      "stock_status": {"type": "keyword"},
      "lifecycle_status": {"type": "keyword"},
      "text_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "l2",
          "engine": "lucene"
        }
      }
    }
  }
}
```

**Sample Document**:

```json
{
  "variant_id": "27156",
  "product_id": "5241",
  "variant_name": "Sierra Outdoor Dining Chair Cover Beige",
  "product_name": "Sierra Outdoor Dining Chair Cover",
  "description": "Perfectly tailored to fit your outdoor furniture, these covers are durable and made to weather the elements.",
  "aggregated_text": "Sierra Outdoor Dining Chair Cover Beige Sierra Outdoor Dining Chair Cover Perfectly tailored to fit your outdoor furniture...",
  "price": 29.0,
  "currency": "SGD",
  "product_type": "Simple",
  "frontend_category": "Outdoor",
  "frontend_subcategory": "Outdoor Accessories",
  "backend_category": "Outdoor",
  "review_count": 0,
  "review_rating": 0.0,
  "collection": "Sierra Outdoor",
  "color_tone": "Beige",
  "material": "Fabric; 600D Polyester with PVC backing",
  "other_properties": "Quantity: Single",
  "variant_url": "https://www.castlery.com/sg/products/sierra-outdoor-dining-chair-cover?material=beige&quantity=single",
  "stock_status": "in_stock",
  "lifecycle_status": "active",
  "text_embedding": [0.123, -0.456, 0.789, ...] // 1024 dimensions
}
```

### 2. Image Search Index

**Index Name**: `search_engine_v1_image`

**Purpose**: Visual similarity search using product images

**Statistics**:
- Documents: 3,348 images
- Size: ~13 MB
- Embedding Dimension: 1024 (Titan Image Embeddings v1)

**Schema**:

```json
{
  "mappings": {
    "properties": {
      "variant_id": {"type": "keyword"},
      "filename": {"type": "keyword"},
      "image_url": {"type": "keyword"},
      "image_type": {"type": "keyword"},
      "image_position": {"type": "integer"},
      "is_default": {"type": "boolean"},
      "image_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "l2",
          "engine": "lucene"
        }
      },
      "product_name": {"type": "text"},
      "price": {"type": "float"}
    }
  }
}
```

**Sample Document**:

```json
{
  "variant_id": "36682",
  "filename": "36682_1.png",
  "image_url": "36682_1.png",
  "image_type": "product",
  "image_position": 1,
  "is_default": true,
  "image_embedding": [0.234, -0.567, 0.890, ...], // 1024 dimensions
  "product_name": "",
  "price": 0.0
}
```

## Usage Examples

### Example 1: Text Search (KNN)

Search for products similar to "modern sofa":

```python
from opensearchpy import OpenSearch
import boto3
import json

# Generate query embedding
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
response = bedrock.invoke_model(
    modelId='amazon.titan-embed-text-v2:0',
    body=json.dumps({"inputText": "modern sofa"})
)
query_embedding = json.loads(response['body'].read())['embedding']

# Search OpenSearch
search_query = {
    "size": 10,
    "query": {
        "knn": {
            "text_embedding": {
                "vector": query_embedding,
                "k": 10
            }
        }
    }
}

results = client.search(index='search_engine_v1_text', body=search_query)
```

### Example 2: Hybrid Search (KNN + BM25)

Combine semantic and keyword search:

```python
search_query = {
    "size": 10,
    "query": {
        "hybrid": {
            "queries": [
                {
                    "knn": {
                        "text_embedding": {
                            "vector": query_embedding,
                            "k": 50
                        }
                    }
                },
                {
                    "multi_match": {
                        "query": "modern sofa",
                        "fields": [
                            "product_name^3",
                            "variant_name^2.5",
                            "description^1.5",
                            "aggregated_text"
                        ]
                    }
                }
            ]
        }
    }
}

results = client.search(index='search_engine_v1_text', body=search_query)
```

### Example 3: Filtered Search

Search with price and category filters:

```python
search_query = {
    "size": 10,
    "query": {
        "bool": {
            "must": [
                {
                    "knn": {
                        "text_embedding": {
                            "vector": query_embedding,
                            "k": 50
                        }
                    }
                }
            ],
            "filter": [
                {"term": {"frontend_category": "Living Room"}},
                {"range": {"price": {"gte": 500, "lte": 2000}}}
            ]
        }
    }
}

results = client.search(index='search_engine_v1_text', body=search_query)
```

### Example 4: Image Similarity Search

Find visually similar products:

```python
# Generate image embedding from uploaded image
with open('query_image.jpg', 'rb') as f:
    image_bytes = f.read()

image_base64 = base64.b64encode(image_bytes).decode('utf-8')
response = bedrock.invoke_model(
    modelId='amazon.titan-embed-image-v1',
    body=json.dumps({"inputImage": image_base64})
)
image_embedding = json.loads(response['body'].read())['embedding']

# Search for similar images
search_query = {
    "size": 10,
    "query": {
        "knn": {
            "image_embedding": {
                "vector": image_embedding,
                "k": 10
            }
        }
    }
}

results = client.search(index='search_engine_v1_image', body=search_query)
```

### Example 5: Get Product by ID

Retrieve a specific product:

```python
# Get by variant_id
product = client.get(index='search_engine_v1_text', id='27156')
print(product['_source'])
```

## Python Connection Example

Complete example with SSH tunnel:

```python
import os
import time
from sshtunnel import SSHTunnelForwarder
from opensearchpy import OpenSearch
from dotenv import load_dotenv

load_dotenv()

# Setup SSH tunnel
tunnel = SSHTunnelForwarder(
    ('jumphost-sg.castlery.com', 22),
    ssh_username='autobots',
    ssh_pkey=os.path.expanduser('~/.ssh/id_rsa'),
    remote_bind_address=(
        'vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com',
        443
    ),
    local_bind_address=('127.0.0.1', 9200)
)
tunnel.start()
time.sleep(2)

try:
    # Create OpenSearch client
    client = OpenSearch(
        hosts=[{'host': '127.0.0.1', 'port': tunnel.local_bind_port}],
        http_auth=(
            os.getenv('OPENSEARCH_USERNAME'),
            os.getenv('OPENSEARCH_PASSWORD')
        ),
        use_ssl=True,
        verify_certs=False,
        ssl_show_warn=False
    )
    
    # Test connection
    info = client.info()
    print(f"Connected to: {info['cluster_name']}")
    
    # Your search queries here...
    
finally:
    tunnel.stop()
```

## API Endpoints

The Flask API (`app.py`) provides these endpoints:

### POST /search/text
Search products by text query

**Request**:
```json
{
  "query": "modern sofa",
  "filters": {
    "price_min": 500,
    "price_max": 2000,
    "categories": ["Living Room"]
  },
  "max_results": 10
}
```

**Response**:
```json
{
  "results": [
    {
      "variant_id": "123",
      "variant_name": "Modern Sofa",
      "price": 1299.0,
      "score": 0.85,
      "url": "https://..."
    }
  ],
  "total": 45,
  "query_time_ms": 234
}
```

### POST /search/image
Search products by image

**Request**: Multipart form data with image file

**Response**: Same as text search

### GET /health
Health check endpoint

## Index Management

### Recreate Indexes

To recreate indexes from scratch:

```bash
# From S3 embeddings
python src/unit_3_search_index/index_from_s3.py

# From local embeddings
python src/index_local_embeddings.py
```

### Check Index Stats

```python
stats = client.indices.stats(index='search_engine_v1_text')
print(f"Documents: {stats['_all']['primaries']['docs']['count']}")
print(f"Size: {stats['_all']['primaries']['store']['size_in_bytes'] / (1024*1024):.2f} MB")
```

### Delete Index

```python
client.indices.delete(index='search_engine_v1_text')
```

## Performance Tuning

### KNN Settings

Current configuration in `config.yaml`:

```yaml
indexing:
  knn:
    method: hnsw
    engine: lucene
    space_type: l2
    ef_construction: 512
    m: 16
```

- `ef_construction`: Higher = better recall, slower indexing (default: 512)
- `m`: Number of connections per node (default: 16)
- `space_type`: Distance metric (l2, cosinesimil, innerproduct)

### Search Parameters

```yaml
search_query:
  max_results: 50
  response_timeout_seconds: 3
  hybrid_weights:
    knn_weight: 0.6
    bm25_weight: 0.4
```

## Troubleshooting

### Connection Issues

If you can't connect to OpenSearch:

1. Verify SSH tunnel is active
2. Check credentials in `.env` file
3. Ensure SSH key has correct permissions: `chmod 600 ~/.ssh/id_rsa`
4. Test jumphost connectivity: `ssh autobots@jumphost-sg.castlery.com`

### Index Not Found

If index doesn't exist, run the indexing pipeline:

```bash
python src/index_local_embeddings.py
```

### NaN Value Errors

If you encounter NaN value errors during indexing, the data ingestion service now automatically handles this by replacing NaN with appropriate defaults (empty strings, zeros).

## Monitoring

### CloudWatch Metrics

Metrics are sent to CloudWatch (if enabled in config):

- `search_latency`: Search response time
- `search_errors`: Failed search requests
- `index_size`: Index size in bytes
- `document_count`: Number of indexed documents

### Index Health

Check cluster health:

```python
health = client.cluster.health()
print(f"Status: {health['status']}")  # green, yellow, or red
print(f"Active shards: {health['active_shards']}")
print(f"Unassigned shards: {health['unassigned_shards']}")
```

## Support

For questions or issues:
- Check logs in CloudWatch (if enabled)
- Review `src/tests/` for test examples
- See `docs/PROJECT_DOCUMENTATION.md` for architecture details
