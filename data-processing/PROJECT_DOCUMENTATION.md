# Project Documentation

Complete technical documentation for the Semantic Search System.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Construction Phase](#construction-phase)
   - [Domain Model](#domain-model)
   - [Logical Design](#logical-design)
   - [Features 5 & 6](#features-5--6)
4. [Implementation Status](#implementation-status)
5. [Data Schema](#data-schema)

---

## Project Overview

**E-Commerce Semantic Search Engine** - Backend search system for furniture e-commerce enabling semantic text search and image similarity search using AWS Bedrock and OpenSearch.

### Key Features

- **Text Search**: Semantic search with natural language filters
- **Image Search**: Visual similarity search
- **Hybrid Search**: Combines KNN + BM25 with RRF
- **LLM Fallback** (Feature 5): Claude extracts intent from abstract queries
- **Related Tags** (Feature 6): Google Shopping-style clickable tags
- **Filter Extraction**: Auto-detects price, color, material, category

### Technology Stack

- **AWS Bedrock**: Titan embeddings (text + image), Claude for LLM
- **OpenSearch**: Vector search with KNN + BM25
- **S3**: Product data storage
- **Python**: Flask (EC2) or Lambda (serverless)

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                  Configuration (Unit 5)                      │
│                     YAML + Env Vars                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Unit 1: Data Ingestion                                      │
│  • Load CSV from S3                                          │
│  • Enrich product data                                       │
│  • Aggregate searchable text                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Unit 2: Embedding Generation                                │
│  • Text embeddings (Bedrock Titan)                           │
│  • Image embeddings (Bedrock Titan)                          │
│  • Query embedding APIs                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Unit 3: Search Index                                        │
│  • Create OpenSearch indices                                 │
│  • Index embeddings + metadata                               │
│  • Configure KNN & BM25                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Unit 4: Search Query Service ⭐                             │
│  • get_text_results(query)                                   │
│  • get_image_match_result(image)                             │
│  • Filter extraction                                         │
│  • KNN / BM25 / Hybrid search                                │
│  • LLM fallback (Feature 5)                                  │
│  • Related tags (Feature 6)                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                      Frontend / API
```

### Deployment Architecture

**Option 1: EC2**
```
User Request → EC2 (Flask) → Bedrock/OpenSearch/S3
```

**Option 2: Lambda**
```
User Request → API Gateway → Lambda → Bedrock/OpenSearch/S3
```

---

## Construction Phase

### Domain Model

**Location**: `construction/search_query_service/domain_model.md`

#### Aggregates

1. **SearchQuery Aggregate**
   - Root Entity: SearchQuery
   - Value Objects: QueryText, QueryType, Filters, SearchMode
   - Encapsulates: User search intent and parameters

2. **SearchResult Aggregate**
   - Root Entity: SearchResult
   - Value Objects: ProductMatch, Score, Rank, Metadata
   - Encapsulates: Search results and relevance

#### Domain Services

1. **FilterExtractionService**
   - Extracts filters from natural language
   - Identifies: price, color, material, size, category

2. **EmbeddingService**
   - Generates embeddings via Bedrock
   - Supports: text and image embeddings

3. **SearchStrategyService**
   - Implements: KNN, BM25, Hybrid search
   - Uses: Reciprocal Rank Fusion (RRF)

4. **LLMFallbackService** (Feature 5)
   - Extracts intent from abstract queries
   - Uses: Claude via Bedrock
   - Caches: LLM responses

5. **RelatedTagsService** (Feature 6)
   - Generates clickable search tags
   - Two-tier: Pre-computed index + LLM fallback
   - Validates: Against product catalog

#### Repositories

1. **SearchIndexRepository**
   - Interface to OpenSearch
   - Operations: search, index, update

2. **EmbeddingRepository**
   - Interface to Bedrock
   - Operations: generate_text_embedding, generate_image_embedding

3. **ProductRepository**
   - Interface to product data
   - Operations: get_by_id, search, filter

#### Domain Events

1. **SearchQuerySubmitted**
2. **SearchResultsReturned**
3. **LLMFallbackTriggered**

#### Policies

1. **LLMFallbackPolicy**
   - Trigger: When similarity score < threshold
   - Action: Use Claude to extract intent

2. **ResultRankingPolicy**
   - Applies: RRF for hybrid search
   - Limits: Max 50 results

3. **TagGenerationPolicy**
   - Trigger: On search query
   - Action: Generate related tags

---

### Logical Design

**Location**: `construction/search_query_service/logical_design.md`

#### Layered Architecture

```
┌─────────────────────────────────────────┐
│         API Layer                        │
│  • REST endpoints                        │
│  • Request/response handling             │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      Application Layer                   │
│  • Use cases                             │
│  • Orchestration                         │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Domain Layer                      │
│  • Business logic                        │
│  • Domain services                       │
│  • Value objects                         │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│    Infrastructure Layer                  │
│  • OpenSearch client                     │
│  • Bedrock client                        │
│  • S3 client                             │
└─────────────────────────────────────────┘
```

#### Key Modules

**API Layer**
- `search_api.py`: REST endpoints
- `request_validator.py`: Input validation
- `response_formatter.py`: Output formatting

**Application Layer**
- `text_search_use_case.py`: Text search orchestration
- `image_search_use_case.py`: Image search orchestration
- `tag_generation_use_case.py`: Tag generation orchestration

**Domain Layer**
- `filter_extraction_service.py`: Extract filters from query
- `search_strategy_service.py`: KNN/BM25/Hybrid search
- `llm_fallback_service.py`: Claude integration
- `related_tags_service.py`: Tag generation

**Infrastructure Layer**
- `opensearch_repository.py`: OpenSearch operations
- `bedrock_repository.py`: Bedrock operations
- `cache_repository.py`: Response caching

---

### Features 5 & 6

**Location**: `construction/search_query_service/logical_design_features_5_6.md`

#### Feature 5: LLM Fallback for Intent Extraction

**Purpose**: Extract meaningful intent from abstract queries like "modern yet royal table"

**Implementation**:
1. Check similarity score of top result
2. If score < threshold (0.3), trigger LLM fallback
3. Use Claude to extract concrete attributes
4. Re-run search with extracted attributes
5. Cache LLM responses

**Example**:
```
Query: "modern yet royal table"
↓ (Low similarity score)
LLM Extracts: {
  "style": ["modern", "traditional", "ornate"],
  "materials": ["wood", "gold accents"],
  "category": "table"
}
↓
Re-search with extracted attributes
```

#### Feature 6: Related Search Tags

**Purpose**: Generate Google Shopping-style clickable tags

**Implementation**:
- **Tier 1 (Primary)**: Pre-computed tag index
  - Built during data ingestion
  - O(1) lookup time
  - Handles 95% of queries
  
- **Tier 2 (Fallback)**: LLM generation
  - For unique queries
  - 1-2 second latency
  - Handles 5% of queries

**Tag Types**:
- Categories: "Sofas", "Tables", "Chairs"
- Price Ranges: "Under $500", "$500-$1,000"
- Materials: "Leather", "Wood", "Fabric"
- Styles: "Modern", "Traditional", "Minimalist"
- Colors: "Grey", "Brown", "White"

**Validation**:
- All tags validated against product catalog
- Only show tags with matching products
- Personalized to user query

---

## Implementation Status

### Phase 1: Inception ✅
- User stories documented
- 5 service units defined
- Integration contract complete
- See: `inception/` folder

### Phase 2: Construction ✅
- Domain model designed
- Logical architecture defined
- Demo implementation working
- See: `construction/` folder

### Phase 3: Operations ✅
- Data pipeline implemented
- Search service deployed
- Infrastructure as code ready
- See: `operations/` folder

### Features Implemented

**Core Features**:
- ✅ Text search with semantic embeddings
- ✅ Image similarity search
- ✅ Natural language filter extraction
- ✅ Hybrid search (KNN + BM25 + RRF)
- ✅ Error handling and validation

**Advanced Features**:
- ✅ Feature 5: LLM Fallback with Claude
- ✅ Feature 6: Related Search Tags (two-tier)
- ✅ Response caching
- ✅ Configurable search strategies

---

## Data Schema

### Input Data (CSV Files)

Located in: `data/active_only/`

| File | Records | Description |
|------|---------|-------------|
| `variant.csv` | 3,693 | Products with pricing, descriptions |
| `variant_image.csv` | 27,166 | Product images (white bg + lifestyle) |
| `variant_property.csv` | 186,698 | Materials, dimensions, care instructions |
| `variant_option.csv` | 7,981 | Colors, sizes, configurations |
| `variant_affinity.csv` | 3,745 | Product relationships |
| `variant_file.csv` | 1,585 | Assembly instructions, manuals |

### Enriched Product Schema

```json
{
  "variant_id": "147",
  "product_id": "79",
  "variant_name": "Peri Coffee Table",
  "product_name": "Peri Collection",
  "aggregated_text": "Peri Coffee Table. Peri's rounded...",
  "price": 549.0,
  "currency": "SGD",
  "categories": {
    "primary": "Tables",
    "secondary": "Coffee Tables",
    "style": "Modern"
  },
  "images": [
    {
      "url": "https://...",
      "type": "white_background",
      "is_primary": true
    }
  ],
  "properties": {
    "material": "Walnut Wood",
    "dimensions": "120cm x 60cm x 45cm",
    "weight": "25kg"
  },
  "options": [
    {
      "type": "color",
      "value": "Natural Walnut"
    }
  ],
  "text_embedding": [0.123, 0.456, ...],  // 1536-dim
  "image_embedding": [0.789, 0.012, ...]  // 1024-dim
}
```

### API Response Schema

```json
{
  "status": "success",
  "total_results": 10,
  "results": [
    {
      "variant_id": "147",
      "product_name": "Peri Coffee Table",
      "variant_name": "Peri Coffee Table - Natural Walnut",
      "description": "Modern coffee table with rounded edges",
      "price": 549.0,
      "currency": "SGD",
      "image_url": "https://...",
      "score": 0.85,
      "rank": 1,
      "categories": ["Tables", "Coffee Tables"],
      "properties": {
        "material": "Walnut Wood",
        "style": "Modern"
      }
    }
  ],
  "search_metadata": {
    "query": "modern coffee table",
    "search_mode": "hybrid",
    "filters_applied": {
      "category": ["table"],
      "price": {"max": 1000}
    },
    "response_time_ms": 245,
    "llm_fallback_used": false
  },
  "related_tags": [
    {
      "tag": "Coffee Tables",
      "type": "category",
      "count": 45
    },
    {
      "tag": "Under $1,000",
      "type": "price_range",
      "count": 32
    },
    {
      "tag": "Wood",
      "type": "material",
      "count": 28
    }
  ]
}
```

---

## Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Text search response time | <3s (p95) | ✅ Achieved |
| Image search response time | <3s (p95) | ✅ Achieved |
| Max results per query | 50 | ✅ Implemented |
| Concurrent queries | 10+/sec | ✅ Supported |
| Data ingestion (3,693 products) | <10 min | ✅ Achieved |
| Embedding generation | <10 min | ✅ Achieved |
| Tag generation (pre-computed) | <1ms | ✅ Achieved |
| Tag generation (LLM fallback) | <2s | ✅ Achieved |

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| `EMPTY_QUERY` | Empty search query | User submitted blank query |
| `INVALID_IMAGE` | Invalid image format | Image not JPG/PNG or corrupted |
| `NO_RESULTS` | No results found | No products match query |
| `SEARCH_FAILED` | Search operation failed | Internal OpenSearch error |
| `SERVICE_UNAVAILABLE` | Service unavailable | Bedrock or OpenSearch down |
| `TIMEOUT` | Request timeout | Exceeded 3 second limit |
| `LLM_FALLBACK_FAILED` | LLM fallback failed | Claude API error |
| `TAG_GENERATION_FAILED` | Tag generation failed | Tag service error |

---

## Configuration

### Search Configuration

```yaml
search_query:
  max_results: 50
  response_timeout_seconds: 3
  default_search_mode: hybrid
  
  hybrid_weights:
    knn_weight: 0.6
    bm25_weight: 0.4
  
  rrf:
    k: 60
  
  min_similarity_score: 0.0
  
  field_boosts:
    product_name: 3.0
    variant_name: 2.5
    description: 1.5
    categories: 2.0
    properties: 1.0
```

### Feature Configuration

```yaml
# Feature 5: LLM Fallback
llm_fallback:
  enabled: true
  model_id: anthropic.claude-3-sonnet-20240229-v1:0
  similarity_threshold: 0.3
  cache_enabled: true
  cache_ttl_seconds: 3600
  max_retries: 2
  timeout_seconds: 30

# Feature 6: Related Tags
related_tags:
  enabled: true
  min_tags: 3
  max_tags: 10
  llm_model_id: anthropic.claude-3-sonnet-20240229-v1:0
  cache_enabled: true
  cache_ttl_seconds: 1800
  
  tag_types:
    - categories
    - price_ranges
    - materials
    - styles
    - colors
```

---

## Testing

### Unit Tests
- Filter extraction
- Search strategies
- LLM fallback logic
- Tag generation

### Integration Tests
- End-to-end search flow
- Bedrock integration
- OpenSearch integration
- Cache behavior

### Performance Tests
- Response time under load
- Concurrent query handling
- Memory usage
- Cache hit rates

---

## Next Steps

1. **Monitor Performance**: Track response times, error rates
2. **Optimize Costs**: Review Bedrock usage, cache hit rates
3. **Enhance Features**: Add more filter types, improve LLM prompts
4. **Scale Infrastructure**: Add load balancing, auto-scaling
5. **Improve Accuracy**: Fine-tune search weights, RRF parameters

---

For deployment instructions, see: **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

For inception phase details, see: **`inception/` folder**
