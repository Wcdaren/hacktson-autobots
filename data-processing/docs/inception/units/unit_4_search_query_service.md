# Unit 4: Search Query Service

## Overview
The Search Query Service is the core search engine that provides the two main API functions: `get_text_results()` for semantic text search and `get_image_match_result()` for image similarity search. This unit implements multiple search strategies (KNN, BM25, Hybrid) and handles query processing, filtering, and result ranking.

## Responsibilities
- Provide text search API (`get_text_results`)
- Provide image search API (`get_image_match_result`)
- Extract filter criteria from natural language queries
- Perform KNN semantic search
- Perform BM25 keyword search
- Implement hybrid search with Reciprocal Rank Fusion
- Rank and score results
- Format responses as JSON
- Handle errors and validation
- Ensure sub-3-second response times

## User Stories Included

### From Epic 4: Text Search Functionality
- **US-4.1**: Semantic Text Search API
- **US-4.2**: Query Intent Extraction and Filtering
- **US-4.3**: BM25 Text Search
- **US-4.4**: Hybrid Search with Reciprocal Rank Fusion

### From Epic 5: Image Search Functionality
- **US-5.1**: Image Similarity Search API
- **US-5.2**: Image Search Result Ranking

### From Epic 7: Response Formatting and Error Handling
- **US-7.1**: Search Response Formatting
- **US-7.2**: Error Handling and Logging

### From Epic 8: Performance and Optimization
- **US-8.1**: Search Performance Optimization

### From Epic 10: LLM Fallback for Intent Extraction (NEW - Feature 5)
- **US-10.1**: Low-Quality Result Detection
- **US-10.2**: LLM Intent Extraction using Claude
- **US-10.3**: Two-Part Response Flow for Fallback
- **US-10.4**: LLM Response Caching

### From Epic 11: Related Search Tags (NEW - Feature 6)
- **US-11.1**: Related Tag Generation using LLM
- **US-11.2**: Tag Validation Against Product Catalog
- **US-11.3**: Tag Count and Type Configuration
- **US-11.4**: Tag Response Format
- **US-11.5**: Tag Click Search Refinement
- **US-11.6**: Tag Response Caching

## Acceptance Criteria Summary
- Text search completes in <3 seconds
- Image search completes in <3 seconds
- Extracts filters from natural language queries
- Supports KNN, BM25, and hybrid search modes
- Returns max 50 results with scores
- Handles errors with appropriate messages
- Returns configurable fields in JSON format
- Comprehensive logging
- **NEW (Feature 5)**: LLM fallback triggers when similarity score < threshold
- **NEW (Feature 5)**: Two-part response flow for fallback scenario
- **NEW (Feature 5)**: LLM responses are cached
- **NEW (Feature 6)**: Related tags generated for each search
- **NEW (Feature 6)**: Tags validated against product catalog
- **NEW (Feature 6)**: Min 3, Max 10 tags returned (configurable)
- **NEW (Feature 6)**: Tag click refines search results

## Technical Components
- Query processing engine
- Filter extraction module (NLP-based)
- KNN search module
- BM25 search module
- Reciprocal Rank Fusion implementation
- Result ranking and scoring
- Response formatter
- Error handler
- Performance monitor
- **NEW (Feature 5)**: LLM Fallback Service (Claude via Bedrock)
- **NEW (Feature 5)**: Intent Extraction Module
- **NEW (Feature 5)**: LLM Response Cache
- **NEW (Feature 6)**: Related Tags Generator (LLM-based)
- **NEW (Feature 6)**: Catalog Tag Validator
- **NEW (Feature 6)**: Tag Response Cache

## Dependencies
- **Upstream**: Search Index Service (Unit 3) - indexed data in OpenSearch
- **Upstream**: Embedding Generation Service (Unit 2) - for query embedding
- **Downstream**: Frontend/API consumers
- **External**: AWS Bedrock (for query embedding)
- **External**: AWS Bedrock Claude (for LLM fallback and tag generation) - NEW
- **External**: AWS OpenSearch

## Interfaces

### API Functions

#### Text Search API
```python
def get_text_results(user_search_string: str, selected_tag: str = None) -> dict:
    """
    Perform semantic text search on products.
    
    Args:
        user_search_string: Natural language search query
        selected_tag: Optional tag to refine search (from related_tags)
        
    Returns:
        dict: {
            "status": "success" | "error",
            "message": str (optional, for errors),
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
                    "images": [{"url": str, "type": str, ...}],
                    "categories": {...},
                    "properties": {...},
                    "options": {...},
                    "review_rating": float,
                    "review_count": int,
                    "is_in_stock": bool,
                    # ... all other configured fields
                }
            ],
            "related_tags": [  # NEW - Feature 6
                {
                    "tag": str,
                    "type": "category" | "price_range" | "material" | "style" | "color",
                    "count": int (optional)
                }
            ],
            "search_metadata": {
                "query": str,
                "search_mode": "knn" | "bm25" | "hybrid",
                "filters_applied": {...},
                "response_time_ms": int,
                "llm_fallback_used": bool,  # NEW - Feature 5
                "original_query": str (if fallback),  # NEW - Feature 5
                "enhanced_query": str (if fallback),  # NEW - Feature 5
                "tags_generated": bool  # NEW - Feature 6
            }
        }
    
    Raises:
        ValueError: If user_search_string is empty
        RuntimeError: If search service is unavailable
    """
```

#### Image Search API
```python
def get_image_match_result(image_base64: str) -> dict:
    """
    Perform image similarity search on products.
    
    Args:
        image_base64: Base64 encoded image (JPG or PNG)
        
    Returns:
        dict: Same structure as get_text_results (including related_tags)
        
    Raises:
        ValueError: If image format is invalid
        RuntimeError: If search service is unavailable
    """
```

#### LLM Intent Extraction API (NEW - Feature 5)
```python
def extract_intent_with_llm(query: str, catalog_knowledge: dict) -> dict:
    """
    Use Claude LLM to extract concrete product attributes from abstract query.
    
    Args:
        query: Original user search query (e.g., "modern yet royal table")
        catalog_knowledge: Dict containing valid categories, materials, colors, styles
        
    Returns:
        dict: {
            "status": "success" | "error",
            "original_query": str,
            "enhanced_query": str,
            "extracted_intents": [
                {
                    "abstract_term": str,
                    "concrete_attributes": [str]
                }
            ],
            "suggested_filters": {...},
            "cached": bool,
            "processing_time_ms": int
        }
    """
```

#### Related Tags Generation API (NEW - Feature 6)
```python
def generate_related_tags(query: str, search_results: list = None) -> dict:
    """
    Generate personalized, clickable search tags based on query.
    
    Args:
        query: User search query
        search_results: Optional list of search results to inform tag generation
        
    Returns:
        dict: {
            "status": "success" | "error",
            "query": str,
            "tags": [
                {
                    "tag": str,
                    "type": "category" | "price_range" | "material" | "style" | "color",
                    "count": int (optional),
                    "relevance_score": float
                }
            ],
            "cached": bool,
            "processing_time_ms": int
        }
    """
```

#### Tag-Based Search Refinement API (NEW - Feature 6)
```python
def refine_search_with_tag(original_query: str, selected_tag: str, tag_type: str) -> dict:
    """
    Refine search by applying selected tag as filter or query enhancement.
    
    Args:
        original_query: Original user search query
        selected_tag: Tag selected by user
        tag_type: Type of tag
        
    Returns:
        dict: Same structure as get_text_results
    """
```

### Configuration
```yaml
search_query:
  # Search modes
  default_search_mode: "hybrid"  # "knn", "bm25", or "hybrid"
  
  # Result limits
  max_results: 50
  response_timeout_seconds: 3
  
  # KNN search settings
  knn:
    k: 100  # Retrieve top 100 for reranking
    min_score: 0.0  # Minimum similarity score
  
  # BM25 search settings
  bm25:
    k1: 1.2  # Term frequency saturation
    b: 0.75  # Length normalization
    fields:
      variant_name: 3.0  # Field boost weights
      product_name: 3.0
      description: 2.0
      aggregated_text: 1.0
      properties: 1.0
  
  # Hybrid search settings
  hybrid:
    rrf_k: 60  # Reciprocal Rank Fusion constant
    knn_weight: 0.5  # Weight for KNN results
    bm25_weight: 0.5  # Weight for BM25 results
  
  # Image search settings
  image_search:
    min_similarity_threshold: 0.0  # Configurable threshold
    supported_formats: ["jpg", "jpeg", "png"]
    max_image_size_mb: 5
  
  # Filter extraction
  filter_extraction:
    enabled: true
    extract_price_range: true
    extract_materials: true
    extract_colors: true
    extract_sizes: true
    extract_categories: true
    extract_dimensions: true
    extract_availability: true
  
  # Response configuration
  response:
    include_fields: "all"  # or list of specific fields
    include_scores: true
    include_metadata: true
  
  # Performance
  cache_embeddings: true
  cache_ttl_seconds: 3600
  parallel_search: true  # For hybrid mode

# NEW - Feature 5: LLM Fallback Configuration
llm_fallback:
  enabled: true
  model_id: "anthropic.claude-3-sonnet-20240229-v1:0"  # Configurable Claude model
  similarity_threshold: 0.3  # Trigger fallback when top score is below this
  cache_enabled: true
  cache_ttl_seconds: 3600  # 1 hour cache for LLM responses
  max_retries: 2
  timeout_seconds: 30
  
  # Intent mapping knowledge base
  intent_mappings:
    royal: ["ornate", "gold accents", "traditional", "vintage", "elegant"]
    cozy: ["soft fabric", "plush", "comfortable", "warm colors"]
    minimalist: ["clean lines", "simple", "modern", "neutral colors"]
    rustic: ["wood", "natural", "farmhouse", "distressed"]
    industrial: ["metal", "iron", "raw", "urban"]

# NEW - Feature 6: Related Tags Configuration
related_tags:
  enabled: true
  min_tags: 3
  max_tags: 10
  llm_model_id: "anthropic.claude-3-sonnet-20240229-v1:0"
  cache_enabled: true
  cache_ttl_seconds: 1800  # 30 minutes
  
  # Tag types to generate
  tag_types:
    - categories
    - price_ranges
    - materials
    - styles
    - colors
  
  # Valid catalog values for tag validation
  catalog_values:
    categories: ["Sofas", "Tables", "Chairs", "Beds", "Desks", "Dining Chairs", "Armchairs", "Recliners", "Sectionals", "Coffee Tables", "Side Tables", "Console Tables", "Bar Stools", "Office Chairs", "King Beds", "Queen Beds", "Nightstands", "Dressers", "Wardrobes", "Bookcases", "TV Units", "Ottomans", "Benches"]
    price_ranges: ["Under $500", "Under $1,000", "Under $1,500", "Under $2,000", "$500-$1,000", "$1,000-$2,000", "$2,000-$3,000", "Over $3,000"]
    materials: ["Leather", "Fabric", "Wood", "Metal", "Glass", "Marble", "Rattan", "Velvet", "Linen", "Cotton", "Walnut", "Oak", "Acacia", "Teak"]
    styles: ["Modern", "Traditional", "Minimalist", "Scandinavian", "Industrial", "Mid-Century", "Contemporary", "Rustic", "Bohemian", "Coastal", "Farmhouse", "Art Deco", "Swivel", "Reclining", "Extendable", "Modular"]
    colors: ["Brown", "Grey", "White", "Black", "Beige", "Blue", "Green", "Navy", "Cream", "Tan", "Charcoal", "Natural", "Walnut", "Oak"]
```

### Filter Extraction Examples
```python
# Query: "grey sofa under $1000"
extracted_filters = {
    "color": ["grey"],
    "category": ["sofa"],
    "price": {"max": 1000}
}

# Query: "king size bed with wooden frame"
extracted_filters = {
    "size": ["king"],
    "category": ["bed"],
    "material": ["wood", "wooden"]
}

# Query: "comfortable leather armchair between $500 and $800"
extracted_filters = {
    "material": ["leather"],
    "category": ["armchair"],
    "price": {"min": 500, "max": 800},
    "properties": ["comfortable"]
}
```

## Search Algorithms

### KNN Semantic Search
1. Embed query using Bedrock Titan
2. Perform KNN search on OpenSearch
3. Apply extracted filters
4. Return top K results with cosine similarity scores

### BM25 Keyword Search
1. Parse query into keywords
2. Perform BM25 search on text fields
3. Apply field boosting
4. Apply extracted filters
5. Return top K results with BM25 scores

### Hybrid Search (Reciprocal Rank Fusion)
1. Perform KNN and BM25 searches in parallel
2. Apply RRF algorithm:
   ```
   RRF_score(d) = Σ(1 / (k + rank_i(d)))
   where k is constant (default 60)
   ```
3. Combine and re-rank results
4. Return top K results with combined scores

## Error Handling
- Empty query → Return error: "empty search query"
- Invalid image format → Return error: "invalid uploaded image format"
- No results found → Return error: "no results found for query"
- OpenSearch unavailable → Return error: "search service unavailable"
- Bedrock unavailable → Return error: "embedding service unavailable"
- Timeout exceeded → Return error: "search timeout exceeded"
- All errors include appropriate HTTP status codes

## Performance Targets
- Text search: <3 seconds for 95% of queries
- Image search: <3 seconds for 95% of queries
- Hybrid search: <3 seconds for 95% of queries
- Concurrent query handling: 10+ queries/second
- Cache hit rate: >70% for repeated queries

## Testing Requirements
- Unit tests for each search mode (KNN, BM25, hybrid)
- Unit tests for filter extraction
- Unit tests for RRF algorithm
- Unit tests for response formatting
- Integration tests with OpenSearch
- Performance tests for response time
- Load tests for concurrent queries
- Test error handling for all error cases
- Validate response format and content

## Non-Functional Requirements
- Sub-3-second response time
- Comprehensive logging (query, filters, results, timing)
- Performance monitoring
- Graceful degradation if services are slow
- Connection pooling for OpenSearch
- Query result caching
- Parallel processing for hybrid search

## Logging Requirements
Log for each request:
- Timestamp
- Query/image identifier
- Search mode used
- Filters extracted
- Number of results
- Response time (ms)
- Errors (if any)

## Monitoring Metrics
- Average response time
- 95th percentile response time
- Error rate
- Cache hit rate
- Search mode distribution
- Filter extraction success rate
