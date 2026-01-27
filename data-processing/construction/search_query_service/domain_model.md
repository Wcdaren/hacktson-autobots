# Domain Model: Search Query Service

## Domain-Driven Design Analysis

### Bounded Context
**Search Query Context** - Responsible for processing user search requests (text and image) and returning relevant product results using semantic similarity and keyword matching.

---

## Ubiquitous Language

### Core Terms
- **Search Query**: A user's request to find products, either text-based or image-based
- **Text Query**: Natural language search string from user
- **Image Query**: Base64-encoded image uploaded by user
- **Query Embedding**: Vector representation of a query (text or image)
- **Search Result**: A product that matches the query with a relevance score
- **Similarity Score**: Numerical measure of how well a product matches the query
- **Search Filter**: Constraints extracted from query (price, color, material, etc.)
- **Search Strategy**: Method used to find results (KNN, BM25, or Hybrid)
- **Reciprocal Rank Fusion (RRF)**: Algorithm to combine results from multiple search strategies
- **Product Variant**: A specific configuration of a product (the searchable entity)

---

## Domain Model Components

### 1. Aggregates

#### SearchQuery Aggregate
**Aggregate Root**: SearchQuery

**Purpose**: Represents a user's search request with all its properties and behaviors

**Entities**:
- SearchQuery (Root)

**Value Objects**:
- QueryText
- QueryImage
- QueryEmbedding
- SearchFilters
- SearchMode

**Invariants**:
- A query must have either text or image, not both
- Query text cannot be empty if it's a text query
- Query image must be valid format (JPG/PNG) if it's an image query
- Search filters must be valid (e.g., price min < price max)

```
SearchQuery (Aggregate Root)
├── query_id: QueryId (VO)
├── query_type: QueryType (VO) [TEXT | IMAGE]
├── query_content: QueryText | QueryImage (VO)
├── query_embedding: QueryEmbedding (VO)
├── filters: SearchFilters (VO)
├── search_mode: SearchMode (VO)
├── created_at: DateTime
└── Methods:
    ├── validate()
    ├── extract_filters()
    ├── generate_embedding()
    └── to_opensearch_query()
```

#### SearchResult Aggregate
**Aggregate Root**: SearchResult

**Purpose**: Represents the outcome of a search operation

**Entities**:
- SearchResult (Root)
- ProductMatch (Entity)

**Value Objects**:
- Score
- Rank
- ProductData
- SearchMetadata

**Invariants**:
- Results must be ordered by rank
- Each result must have a valid score
- Maximum 50 results per search
- All results must reference valid product variants

```
SearchResult (Aggregate Root)
├── search_id: SearchId (VO)
├── query: SearchQuery (reference)
├── matches: List<ProductMatch> (Entity)
├── total_count: int
├── search_metadata: SearchMetadata (VO)
├── response_time_ms: int
└── Methods:
    ├── add_match(product, score)
    ├── rank_by_score()
    ├── limit_results(max_count)
    ├── to_json()
    └── apply_filters()

ProductMatch (Entity within SearchResult)
├── match_id: MatchId (VO)
├── variant_id: VariantId (VO)
├── product_data: ProductData (VO)
├── score: Score (VO)
├── rank: Rank (VO)
└── Methods:
    └── to_dict()
```

---

### 2. Value Objects

#### QueryText
```python
class QueryText:
    value: str
    
    Invariants:
    - Cannot be empty or whitespace only
    - Maximum length: 1000 characters
    
    Methods:
    - validate()
    - normalize() -> str  # Trim, lowercase
    - __eq__()
```

#### QueryImage
```python
class QueryImage:
    base64_data: str
    format: ImageFormat  # JPG | PNG
    size_bytes: int
    
    Invariants:
    - Must be valid base64
    - Format must be JPG or PNG
    - Size must be <= 5MB
    
    Methods:
    - validate()
    - decode() -> bytes
    - get_format() -> ImageFormat
    - __eq__()
```

#### QueryEmbedding
```python
class QueryEmbedding:
    vector: List[float]
    dimension: int  # 1536 for text, 1024 for image
    model: str  # Model used to generate
    
    Invariants:
    - Vector length must match dimension
    - All values must be valid floats
    
    Methods:
    - validate()
    - to_list() -> List[float]
    - __eq__()
```

#### SearchFilters
```python
class SearchFilters:
    price_range: Optional[PriceRange]
    colors: List[str]
    materials: List[str]
    sizes: List[str]
    categories: List[str]
    dimensions: Optional[str]
    in_stock_only: bool
    
    Methods:
    - is_empty() -> bool
    - to_opensearch_filter() -> dict
    - merge(other: SearchFilters) -> SearchFilters
    - validate()
```

#### PriceRange
```python
class PriceRange:
    min_price: Optional[float]
    max_price: Optional[float]
    currency: str
    
    Invariants:
    - If both set, min_price <= max_price
    - Prices must be non-negative
    
    Methods:
    - validate()
    - contains(price: float) -> bool
```

#### SearchMode
```python
class SearchMode(Enum):
    KNN = "knn"
    BM25 = "bm25"
    HYBRID = "hybrid"
```

#### Score
```python
class Score:
    value: float
    score_type: ScoreType  # SIMILARITY | BM25 | RRF
    
    Invariants:
    - Value must be between 0.0 and 1.0 (normalized)
    
    Methods:
    - normalize() -> float
    - compare(other: Score) -> int
    - __eq__(), __lt__(), __gt__()
```

#### Rank
```python
class Rank:
    position: int
    
    Invariants:
    - Position must be >= 1
    
    Methods:
    - __eq__(), __lt__(), __gt__()
```

#### ProductData
```python
class ProductData:
    variant_id: str
    product_id: str
    variant_name: str
    product_name: str
    description: str
    price: float
    currency: str
    images: List[ImageData]
    categories: dict
    properties: dict
    options: dict
    review_rating: Optional[float]
    review_count: Optional[int]
    is_in_stock: bool
    metadata: dict
    
    Methods:
    - to_dict() -> dict
    - get_primary_image() -> ImageData
```

#### SearchMetadata
```python
class SearchMetadata:
    query_text: Optional[str]
    search_mode: SearchMode
    filters_applied: SearchFilters
    response_time_ms: int
    total_results: int
    
    Methods:
    - to_dict() -> dict
```

---

### 3. Domain Services

#### FilterExtractionService
**Purpose**: Extract search filters from natural language queries

**Responsibilities**:
- Parse query text to identify filter criteria
- Extract price ranges, colors, materials, sizes, categories
- Handle ambiguous or conflicting filters

**Methods**:
```python
class FilterExtractionService:
    def extract_filters(query_text: str) -> SearchFilters:
        """
        Extract filters from natural language query.
        
        Examples:
        - "grey sofa under $1000" -> color=[grey], category=[sofa], price.max=1000
        - "king size bed" -> size=[king], category=[bed]
        """
        pass
```

**Domain Logic**:
- Uses pattern matching and NLP techniques
- Maintains dictionary of color terms, material terms, size terms
- Handles currency symbols and price expressions
- Resolves category synonyms (e.g., "couch" -> "sofa")

#### EmbeddingService
**Purpose**: Generate embeddings for queries

**Responsibilities**:
- Interface with Bedrock Titan models
- Generate text embeddings
- Generate image embeddings
- Cache embeddings for performance

**Methods**:
```python
class EmbeddingService:
    def embed_text(query_text: QueryText) -> QueryEmbedding:
        """Generate embedding for text query"""
        pass
    
    def embed_image(query_image: QueryImage) -> QueryEmbedding:
        """Generate embedding for image query"""
        pass
```

#### SearchStrategyService
**Purpose**: Execute different search strategies

**Responsibilities**:
- Perform KNN semantic search
- Perform BM25 keyword search
- Combine results using Reciprocal Rank Fusion
- Apply filters to search results

**Methods**:
```python
class SearchStrategyService:
    def search_knn(
        embedding: QueryEmbedding,
        filters: SearchFilters,
        k: int
    ) -> List[ProductMatch]:
        """Perform KNN similarity search"""
        pass
    
    def search_bm25(
        query_text: QueryText,
        filters: SearchFilters,
        k: int
    ) -> List[ProductMatch]:
        """Perform BM25 keyword search"""
        pass
    
    def search_hybrid(
        embedding: QueryEmbedding,
        query_text: QueryText,
        filters: SearchFilters,
        k: int
    ) -> List[ProductMatch]:
        """Perform hybrid search with RRF"""
        pass
```

#### ReciprocalRankFusionService
**Purpose**: Combine results from multiple search strategies

**Responsibilities**:
- Implement RRF algorithm
- Merge and re-rank results
- Handle duplicate results

**Methods**:
```python
class ReciprocalRankFusionService:
    def fuse_results(
        knn_results: List[ProductMatch],
        bm25_results: List[ProductMatch],
        k: int = 60
    ) -> List[ProductMatch]:
        """
        Combine results using RRF algorithm:
        RRF_score(d) = Σ(1 / (k + rank_i(d)))
        """
        pass
```

#### ResultRankingService
**Purpose**: Rank and score search results

**Responsibilities**:
- Normalize scores from different sources
- Apply ranking logic
- Limit results to max count
- Sort by score/rank

**Methods**:
```python
class ResultRankingService:
    def rank_results(
        matches: List[ProductMatch],
        max_results: int = 50
    ) -> List[ProductMatch]:
        """Rank results by score and limit to max"""
        pass
    
    def normalize_scores(
        matches: List[ProductMatch],
        score_type: ScoreType
    ) -> List[ProductMatch]:
        """Normalize scores to 0-1 range"""
        pass
```

---

### 4. Repositories

#### SearchQueryRepository
**Purpose**: Persist and retrieve search queries (optional, for analytics)

**Methods**:
```python
class SearchQueryRepository:
    def save(query: SearchQuery) -> None:
        """Save search query for analytics"""
        pass
    
    def find_by_id(query_id: QueryId) -> Optional[SearchQuery]:
        """Retrieve query by ID"""
        pass
```

#### SearchResultRepository
**Purpose**: Cache search results for performance

**Methods**:
```python
class SearchResultRepository:
    def save(result: SearchResult) -> None:
        """Cache search result"""
        pass
    
    def find_by_query(query: SearchQuery) -> Optional[SearchResult]:
        """Retrieve cached result for query"""
        pass
    
    def invalidate(query_id: QueryId) -> None:
        """Invalidate cached result"""
        pass
```

#### OpenSearchRepository
**Purpose**: Interface with OpenSearch for search operations

**Methods**:
```python
class OpenSearchRepository:
    def knn_search(
        index: str,
        embedding: QueryEmbedding,
        filters: dict,
        k: int
    ) -> List[dict]:
        """Perform KNN search on OpenSearch"""
        pass
    
    def bm25_search(
        index: str,
        query_text: str,
        filters: dict,
        k: int
    ) -> List[dict]:
        """Perform BM25 search on OpenSearch"""
        pass
    
    def get_product_by_id(variant_id: str) -> Optional[dict]:
        """Retrieve product data by variant ID"""
        pass
```

---

### 5. Domain Events

#### SearchQuerySubmitted
```python
class SearchQuerySubmitted:
    query_id: QueryId
    query_type: QueryType
    timestamp: DateTime
    user_id: Optional[str]
```

#### SearchResultsReturned
```python
class SearchResultsReturned:
    query_id: QueryId
    result_count: int
    response_time_ms: int
    timestamp: DateTime
```

#### SearchFailed
```python
class SearchFailed:
    query_id: QueryId
    error_code: str
    error_message: str
    timestamp: DateTime
```

---

### 6. Policies

#### SearchTimeoutPolicy
**Purpose**: Ensure searches complete within time limit

**Rule**: If search exceeds 3 seconds, return partial results or timeout error

**Implementation**:
```python
class SearchTimeoutPolicy:
    timeout_seconds: int = 3
    
    def enforce(search_operation: Callable) -> SearchResult:
        """Execute search with timeout"""
        pass
```

#### ResultLimitPolicy
**Purpose**: Limit number of results returned

**Rule**: Maximum 50 results per search

**Implementation**:
```python
class ResultLimitPolicy:
    max_results: int = 50
    
    def enforce(results: List[ProductMatch]) -> List[ProductMatch]:
        """Limit results to max count"""
        pass
```

#### FilterValidationPolicy
**Purpose**: Validate extracted filters

**Rule**: Filters must be logically consistent (e.g., min_price <= max_price)

**Implementation**:
```python
class FilterValidationPolicy:
    def validate(filters: SearchFilters) -> bool:
        """Validate filter consistency"""
        pass
```

---

## Domain Model Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Search Query Context                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         SearchQuery (Aggregate Root)                      │  │
│  │  - query_id                                               │  │
│  │  - query_type: TEXT | IMAGE                               │  │
│  │  - query_content: QueryText | QueryImage (VO)             │  │
│  │  - query_embedding: QueryEmbedding (VO)                   │  │
│  │  - filters: SearchFilters (VO)                            │  │
│  │  - search_mode: SearchMode (VO)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          │ generates                             │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         SearchResult (Aggregate Root)                     │  │
│  │  - search_id                                              │  │
│  │  - matches: List<ProductMatch>                            │  │
│  │  - total_count                                            │  │
│  │  - search_metadata: SearchMetadata (VO)                   │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────┐              │  │
│  │  │  ProductMatch (Entity)                  │              │  │
│  │  │  - variant_id                           │              │  │
│  │  │  - product_data: ProductData (VO)       │              │  │
│  │  │  - score: Score (VO)                    │              │  │
│  │  │  - rank: Rank (VO)                      │              │  │
│  │  └────────────────────────────────────────┘              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Domain Services                              │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  - FilterExtractionService                                │  │
│  │  - EmbeddingService                                       │  │
│  │  - SearchStrategyService                                  │  │
│  │  - ReciprocalRankFusionService                            │  │
│  │  - ResultRankingService                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Repositories                                 │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  - OpenSearchRepository                                   │  │
│  │  - SearchResultRepository (cache)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Domain Rules

### Business Rules
1. **Single Query Type**: A search query must be either text OR image, never both
2. **Result Limit**: Maximum 50 results per search
3. **Response Time**: Searches must complete within 3 seconds
4. **Filter Consistency**: Extracted filters must be logically valid
5. **Score Normalization**: All scores normalized to 0-1 range for comparison
6. **Ranking Order**: Results always ordered by score (descending)

### Technical Rules
1. **Embedding Dimensions**: Text embeddings are 1536-dim, image embeddings are 1024-dim
2. **Image Formats**: Only JPG and PNG supported
3. **Query Length**: Text queries limited to 1000 characters
4. **Image Size**: Images limited to 5MB
5. **Cache TTL**: Cached results expire after 1 hour

---

## Domain Workflows

### Text Search Workflow
```
1. User submits text query
2. Create SearchQuery aggregate with QueryText
3. FilterExtractionService extracts filters from text
4. EmbeddingService generates QueryEmbedding
5. SearchStrategyService executes search (KNN/BM25/Hybrid)
6. ResultRankingService ranks and limits results
7. Create SearchResult aggregate with ProductMatches
8. Return SearchResult as JSON
```

### Image Search Workflow
```
1. User submits image (base64)
2. Create SearchQuery aggregate with QueryImage
3. Validate image format and size
4. EmbeddingService generates QueryEmbedding
5. SearchStrategyService executes KNN search on image index
6. ResultRankingService ranks and limits results
7. Create SearchResult aggregate with ProductMatches
8. Return SearchResult as JSON
```

### Hybrid Search Workflow
```
1. Create SearchQuery with text
2. Extract filters
3. Generate embedding
4. Execute KNN search → List A
5. Execute BM25 search → List B
6. ReciprocalRankFusionService fuses A and B
7. Rank and limit results
8. Return SearchResult
```

---

## Anti-Corruption Layer

### External System Interfaces

#### Bedrock Adapter
```python
class BedrockAdapter:
    """Translates between domain and Bedrock API"""
    
    def to_bedrock_request(query: QueryText | QueryImage) -> dict:
        """Convert domain query to Bedrock API format"""
        pass
    
    def from_bedrock_response(response: dict) -> QueryEmbedding:
        """Convert Bedrock response to domain embedding"""
        pass
```

#### OpenSearch Adapter
```python
class OpenSearchAdapter:
    """Translates between domain and OpenSearch API"""
    
    def to_opensearch_query(
        embedding: QueryEmbedding,
        filters: SearchFilters,
        mode: SearchMode
    ) -> dict:
        """Convert domain query to OpenSearch DSL"""
        pass
    
    def from_opensearch_response(response: dict) -> List[ProductMatch]:
        """Convert OpenSearch hits to domain matches"""
        pass
```

---

## Summary

This domain model provides:
- **Clear boundaries** with aggregates (SearchQuery, SearchResult)
- **Rich domain logic** in value objects and services
- **Encapsulation** of business rules
- **Separation of concerns** between domain and infrastructure
- **Testability** through well-defined interfaces
- **Flexibility** to change search strategies without affecting domain model
