# Search Query Service - Implementation

## Overview
This is a minimal working implementation of the Search Query Service for the E-Commerce Semantic Search Engine. The implementation demonstrates the core search functionality with in-memory mock data.

## Structure

```
construction/search_query_service/
├── domain_model.md           # DDD domain model design
├── logical_design.md          # Logical architecture and class designs
├── README.md                  # This file
├── generate_implementation.py # Script to generate additional files
└── src/
    ├── demo.py               # ✅ Working demo script
    ├── api/
    │   └── search_api.py     # Main API functions (partial)
    └── domain/
        └── value_objects/
            ├── query_types.py  # Query value objects
            └── filters.py      # Filter value objects
```

## Features Implemented

### ✅ Core API Functions
- `get_text_results(user_search_string)` - Text search with filter extraction
- `get_image_match_result(image_base64)` - Image similarity search (mock)

### ✅ Filter Extraction
Extracts filters from natural language queries:
- **Price filters**: "under $1000", "below 500"
- **Color filters**: "grey", "brown"
- **Material filters**: "wood", "fabric"
- **Category filters**: "sofa", "table", "chair", "bed"

### ✅ Search Functionality
- Keyword-based matching with scoring
- Filter application (price, color, material, category)
- Result ranking by relevance score
- Maximum 50 results per query

### ✅ Error Handling
- Empty query → "empty search query"
- No results → "no results found for query"
- Invalid image → "invalid uploaded image format"

### ✅ Response Format
```json
{
  "status": "success",
  "total_results": 1,
  "results": [
    {
      "variant_id": "7544",
      "product_name": "Adams 2 Seater Sofa",
      "description": "...",
      "price": 999.0,
      "currency": "SGD",
      "image_url": "https://...",
      "score": 0.75,
      "rank": 1
    }
  ],
  "search_metadata": {
    "query": "grey sofa under $1000",
    "search_mode": "mock_keyword_matching",
    "filters_applied": {}
  }
}
```

## Running the Demo

### Prerequisites
- Python 3.9+
- Virtual environment activated

### Run Demo
```bash
# Activate virtual environment
source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate

# Run demo
python construction/search_query_service/src/demo.py
```

### Demo Tests
The demo runs 5 test cases:
1. ✅ Simple text search: "sofa"
2. ✅ Text search with filters: "grey sofa under $1000"
3. ✅ Empty query error: ""
4. ✅ No results: "xyz123nonexistent"
5. ✅ Image search (mock): base64 image

## Mock Data
The demo uses 5 sample products:
- Peri Coffee Table ($549)
- Andre Coffee Table ($549)
- Adams 2 Seater Sofa ($999) - grey, fabric
- Seb King Size Bed ($1099)
- Madison Armchair ($649) - grey, fabric

## Implementation Notes

### Current Implementation
- **In-memory data**: Uses mock product list
- **Simple scoring**: Keyword matching with word overlap
- **Mock embeddings**: No actual Bedrock integration yet
- **Mock OpenSearch**: No actual OpenSearch integration yet

### Production Implementation (Next Steps)
To make this production-ready, you would need to:

1. **Replace mock data** with actual data from:
   - Unit 1: Data Ingestion Service (enriched products)
   - Unit 2: Embedding Generation Service (embeddings)
   - Unit 3: Search Index Service (OpenSearch indices)

2. **Implement real services**:
   - `EmbeddingService` → Connect to AWS Bedrock Titan
   - `OpenSearchRepository` → Connect to AWS OpenSearch
   - `SearchStrategyService` → Implement KNN, BM25, Hybrid search

3. **Add configuration**:
   - YAML config file with AWS credentials
   - Environment variable support
   - Logging configuration

4. **Add caching**:
   - Cache query embeddings
   - Cache search results (TTL: 1 hour)

5. **Add monitoring**:
   - Response time tracking
   - Error rate monitoring
   - Search quality metrics

## API Usage Examples

### Text Search
```python
from api.search_api import get_text_results

# Simple search
result = get_text_results("sofa")

# Search with filters
result = get_text_results("grey sofa under $1000")

# Search with multiple filters
result = get_text_results("wooden dining table between $500 and $800")
```

### Image Search
```python
from api.search_api import get_image_match_result
import base64

# Load and encode image
with open("sofa_image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

# Search
result = get_image_match_result(image_data)
```

## Architecture

### Layered Design
```
API Layer (search_api.py)
    ↓
Application Layer (search services)
    ↓
Domain Layer (aggregates, value objects, services)
    ↓
Infrastructure Layer (OpenSearch, Bedrock, Config)
```

### Domain-Driven Design
- **Aggregates**: SearchQuery, SearchResult
- **Value Objects**: QueryText, QueryImage, SearchFilters, ProductMatch
- **Domain Services**: FilterExtractionService, SearchStrategyService
- **Policies**: ResultLimitPolicy, SearchTimeoutPolicy

## Testing

### Manual Testing
Run the demo script to test all functionality:
```bash
python construction/search_query_service/src/demo.py
```

### Unit Testing (To Be Added)
```bash
pytest tests/
```

## Configuration (Future)

### config.yaml
```yaml
search_query:
  max_results: 50
  response_timeout_seconds: 3
  default_search_mode: "hybrid"
  
  knn:
    k: 100
    min_score: 0.0
  
  bm25:
    k1: 1.2
    b: 0.75
  
  hybrid:
    rrf_k: 60
```

## Performance Targets
- Text search: <3 seconds (95th percentile)
- Image search: <3 seconds (95th percentile)
- Max results: 50 per query
- Concurrent queries: 10+ per second

## Error Codes
- `EMPTY_QUERY` - Search query is empty
- `INVALID_IMAGE` - Image format not supported
- `NO_RESULTS` - No results found for query
- `SEARCH_FAILED` - Internal search error
- `SERVICE_UNAVAILABLE` - External service unavailable
- `TIMEOUT` - Search exceeded timeout

## Next Steps

### Phase 3: Operations (Deployment)
1. Create CloudFormation templates
2. Deploy to AWS Lambda
3. Set up API Gateway
4. Configure OpenSearch domain
5. Set up Bedrock access
6. Add monitoring and logging

### Integration with Other Units
1. Connect to Data Ingestion Service (Unit 1)
2. Connect to Embedding Generation Service (Unit 2)
3. Connect to Search Index Service (Unit 3)
4. Load configuration from Unit 5

## License
Internal use only - Hackathon demo

## Contact
Data Science Team
