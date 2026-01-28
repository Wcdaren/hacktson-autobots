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
    llm_fallback_used: bool = False  # NEW - Feature 5
    original_query: Optional[str] = None  # NEW - Feature 5
    enhanced_query: Optional[str] = None  # NEW - Feature 5
    tags_generated: bool = False  # NEW - Feature 6
    
    Methods:
    - to_dict() -> dict
```

#### ExtractedIntents (NEW - Feature 5)
```python
class ExtractedIntents:
    original_query: str
    abstract_terms: List[str]  # e.g., ["royal", "modern"]
    concrete_attributes: Dict[str, List[str]]  # e.g., {"royal": ["ornate", "elegant"]}
    suggested_filters: SearchFilters
    enhanced_query: str
    
    Invariants:
    - At least one abstract term must be identified
    - Concrete attributes must be from catalog
    
    Methods:
    - to_dict() -> dict
    - get_enhanced_query() -> str
```

#### CatalogKnowledge (NEW - Feature 5)
```python
class CatalogKnowledge:
    categories: List[str]
    materials: List[str]
    colors: List[str]
    styles: List[str]
    price_ranges: List[str]
    
    Methods:
    - to_prompt_context() -> str  # Format for LLM prompt
    - validate_attribute(attr: str) -> bool
```

#### SearchTag (NEW - Feature 6)
```python
class SearchTag:
    tag: str  # Display text, e.g., "Dining Chairs"
    tag_type: TagType  # CATEGORY | PRICE_RANGE | MATERIAL | STYLE | COLOR
    count: Optional[int]  # Number of products matching this tag
    relevance_score: float  # How relevant to query (0-1)
    
    Invariants:
    - Tag must not be empty
    - Tag type must be valid
    - Relevance score between 0 and 1
    
    Methods:
    - to_dict() -> dict
    - __eq__()
```

#### TagType (NEW - Feature 6)
```python
class TagType(Enum):
    CATEGORY = "category"
    PRICE_RANGE = "price_range"
    MATERIAL = "material"
    STYLE = "style"
    COLOR = "color"
```

#### CatalogValues (NEW - Feature 6)
```python
class CatalogValues:
    categories: List[str]
    price_ranges: List[str]
    materials: List[str]
    styles: List[str]
    colors: List[str]
    
    Methods:
    - is_valid_tag(tag: str, tag_type: TagType) -> bool
    - get_all_values() -> Dict[TagType, List[str]]
```

#### RefinedQuery (NEW - Feature 6)
```python
class RefinedQuery:
    original_query: str
    selected_tag: SearchTag
    enhanced_query: str
    additional_filters: SearchFilters
    
    Methods:
    - to_search_query() -> SearchQuery
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

#### IntentExtractionService (NEW - Feature 5)
**Purpose**: Extract meaningful intents from abstract queries using LLM

**Responsibilities**:
- Detect when search results have low quality (below similarity threshold)
- Use Claude LLM to extract concrete product attributes from abstract terms
- Map abstract terms to catalog-valid attributes
- Cache LLM responses for performance

**Methods**:
```python
class IntentExtractionService:
    def should_trigger_fallback(top_score: float, threshold: float) -> bool:
        """Determine if LLM fallback should be triggered"""
        pass
    
    def extract_intents(
        query: str,
        catalog_knowledge: CatalogKnowledge
    ) -> ExtractedIntents:
        """
        Use Claude LLM to extract concrete attributes from abstract query.
        
        Examples:
        - "royal table" -> ["ornate", "elegant", "traditional", "gold accents"]
        - "cozy sofa" -> ["soft fabric", "plush", "comfortable", "warm colors"]
        """
        pass
    
    def enhance_query(
        original_query: str,
        extracted_intents: ExtractedIntents
    ) -> str:
        """Reformulate query with extracted concrete attributes"""
        pass
```

**Domain Logic**:
- Maintains intent mapping knowledge base (abstract -> concrete)
- Uses Claude LLM via Bedrock for intelligent extraction
- Validates extracted attributes against catalog
- Caches responses to reduce LLM calls

#### RelatedTagsService (NEW - Feature 6)
**Purpose**: Generate personalized, clickable search tags using two-tier approach

**Responsibilities**:
- **Tier 1 (Primary)**: Lookup tags from pre-computed index (instant, <1ms)
- **Tier 2 (Fallback)**: Generate tags using LLM for unique queries (1-2s)
- Validate tags against product catalog
- Ensure tag diversity (categories, prices, materials, styles, colors)
- Cache LLM-generated tags for future use

**Methods**:
```python
class RelatedTagsService:
    def get_tags(
        query: str,
        search_results: List[ProductMatch] = None,
        catalog_values: CatalogValues = None
    ) -> List[SearchTag]:
        """
        Get personalized tags for query using two-tier approach.
        
        Strategy:
        1. Try pre-computed tag index first (instant)
        2. If not found, use LLM generation (1-2s)
        3. Cache LLM results for future use
        
        Performance:
        - 95% of queries: <1ms (pre-computed index)
        - 5% of queries: 1-2s (LLM generation)
        
        Examples:
        - "brown leather chair" -> ["Swivel", "Dining Chairs", "Recliners", "Under $1,000", "Armchairs"]
        - "modern sofa" -> ["Sectional", "2-Seater", "3-Seater", "Fabric", "Leather", "Grey"]
        """
        pass
    
    def should_use_llm(query: str) -> bool:
        """Determine if LLM is needed or pre-computed index can be used"""
        pass
    
    def generate_tags_with_llm(
        query: str,
        search_results: List[ProductMatch] = None,
        catalog_values: CatalogValues = None
    ) -> List[SearchTag]:
        """Generate tags using LLM for unique queries"""
        pass
    
    def validate_tags(
        tags: List[SearchTag],
        catalog_values: CatalogValues
    ) -> List[SearchTag]:
        """Filter tags to only include those that exist in catalog"""
        pass
    
    def balance_tag_types(
        tags: List[SearchTag],
        min_tags: int,
        max_tags: int
    ) -> List[SearchTag]:
        """Ensure balanced mix of tag types"""
        pass
```

**Domain Logic**:
- **Primary Strategy**: Uses pre-computed tag index for 95% of queries (instant)
- **Fallback Strategy**: Uses Claude LLM for unique/complex queries (5%)
- Validates all tags against catalog values
- Balances tag types for diversity
- Caches LLM responses to reduce future calls
- Pre-computed index built during data ingestion phase

#### TagIndexService (NEW - Feature 6)
**Purpose**: Pre-compute and index tags for instant retrieval

**Responsibilities**:
- Build tag index during data ingestion phase
- Map query terms to tags (inverted index)
- Map categories to related tags
- Store common query patterns
- Provide instant tag lookup (<1ms)
- Export/import index for persistence

**Methods**:
```python
class TagIndexService:
    def build_index(catalog_values: CatalogValues) -> None:
        """
        Build pre-computed tag index from catalog.
        Called during data ingestion phase.
        """
        pass
    
    def get_tags_for_query(query: str, max_tags: int = 10) -> List[SearchTag]:
        """
        Get pre-computed tags for query (instant lookup).
        Returns tags in <1ms for common queries.
        """
        pass
    
    def has_tags_for_query(query: str) -> bool:
        """Check if query exists in pre-computed index"""
        pass
    
    def add_query_pattern(query: str, tags: List[SearchTag]) -> None:
        """Add new query pattern to index (from LLM results)"""
        pass
    
    def export_index(filepath: str) -> None:
        """Export index to JSON for persistence"""
        pass
    
    def load_index(filepath: str) -> None:
        """Load index from JSON"""
        pass
```

**Domain Logic**:
- Pre-computes tags for all product categories
- Builds inverted index: query_term → tags
- Stores common query patterns (sofa, chair, table, etc.)
- Provides O(1) lookup time for indexed queries
- Grows over time as LLM-generated tags are added
- Persisted to disk for fast startup

#### TagRefinementService (NEW - Feature 6)
**Purpose**: Refine search based on selected tag

**Responsibilities**:
- Apply tag as filter or query enhancement
- Handle different tag types appropriately
- Maintain original query context

**Methods**:
```python
class TagRefinementService:
    def refine_search(
        original_query: str,
        selected_tag: SearchTag
    ) -> RefinedQuery:
        """
        Apply tag to refine search.
        
        Behavior by tag type:
        - price_range: Apply as price filter
        - category: Filter by category
        - material/style/color: Add to query or apply as filter
        """
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

#### LLMResponseCache (NEW - Feature 5)
**Purpose**: Cache LLM responses for intent extraction

**Methods**:
```python
class LLMResponseCache:
    def get(query: str) -> Optional[ExtractedIntents]:
        """Get cached intent extraction result"""
        pass
    
    def set(query: str, intents: ExtractedIntents, ttl_seconds: int) -> None:
        """Cache intent extraction result"""
        pass
    
    def invalidate(query: str) -> None:
        """Invalidate cached result"""
        pass
    
    def clear() -> None:
        """Clear all cached results"""
        pass
```

#### TagCache (NEW - Feature 6)
**Purpose**: Cache generated tags for queries

**Methods**:
```python
class TagCache:
    def get(query: str) -> Optional[List[SearchTag]]:
        """Get cached tags for query"""
        pass
    
    def set(query: str, tags: List[SearchTag], ttl_seconds: int) -> None:
        """Cache tags for query"""
        pass
    
    def invalidate(query: str) -> None:
        """Invalidate cached tags"""
        pass
    
    def clear() -> None:
        """Clear all cached tags"""
        pass
```

#### CatalogTagRepository (NEW - Feature 6)
**Purpose**: Validate tags against product catalog

**Methods**:
```python
class CatalogTagRepository:
    def get_valid_categories() -> List[str]:
        """Get all valid category tags"""
        pass
    
    def get_valid_materials() -> List[str]:
        """Get all valid material tags"""
        pass
    
    def get_valid_colors() -> List[str]:
        """Get all valid color tags"""
        pass
    
    def get_valid_styles() -> List[str]:
        """Get all valid style tags"""
        pass
    
    def get_valid_price_ranges() -> List[str]:
        """Get all valid price range tags"""
        pass
    
    def is_valid_tag(tag: str, tag_type: TagType) -> bool:
        """Check if tag is valid for given type"""
        pass
    
    def get_product_count_for_tag(tag: str, tag_type: TagType) -> int:
        """Get number of products matching tag"""
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

#### LLMFallbackTriggered (NEW - Feature 5)
```python
class LLMFallbackTriggered:
    query_id: QueryId
    original_query: str
    top_score: float
    threshold: float
    timestamp: DateTime
```

#### IntentsExtracted (NEW - Feature 5)
```python
class IntentsExtracted:
    query_id: QueryId
    original_query: str
    enhanced_query: str
    abstract_terms: List[str]
    concrete_attributes: Dict[str, List[str]]
    cached: bool
    processing_time_ms: int
    timestamp: DateTime
```

#### LLMFallbackFailed (NEW - Feature 5)
```python
class LLMFallbackFailed:
    query_id: QueryId
    original_query: str
    error_code: str
    error_message: str
    timestamp: DateTime
```

#### RelatedTagsGenerated (NEW - Feature 6)
```python
class RelatedTagsGenerated:
    query_id: QueryId
    query: str
    tags: List[SearchTag]
    tag_count: int
    cached: bool
    processing_time_ms: int
    timestamp: DateTime
```

#### TagSearchRefined (NEW - Feature 6)
```python
class TagSearchRefined:
    query_id: QueryId
    original_query: str
    selected_tag: SearchTag
    refined_query: str
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

#### LLMFallbackPolicy (NEW - Feature 5)
**Purpose**: Determine when to trigger LLM fallback

**Rule**: Trigger fallback when top result similarity score is below threshold

**Implementation**:
```python
class LLMFallbackPolicy:
    similarity_threshold: float = 0.3  # Configurable
    enabled: bool = True
    
    def should_trigger(top_score: float) -> bool:
        """Determine if LLM fallback should be triggered"""
        return self.enabled and top_score < self.similarity_threshold
    
    def get_threshold() -> float:
        """Get current threshold value"""
        return self.similarity_threshold
```

#### TagGenerationPolicy (NEW - Feature 6)
**Purpose**: Control tag generation behavior

**Rule**: Generate between min and max tags, validate against catalog

**Implementation**:
```python
class TagGenerationPolicy:
    min_tags: int = 3
    max_tags: int = 10
    enabled: bool = True
    
    def validate_tag_count(tags: List[SearchTag]) -> bool:
        """Ensure tag count is within limits"""
        return self.min_tags <= len(tags) <= self.max_tags
    
    def filter_valid_tags(
        tags: List[SearchTag],
        catalog_values: CatalogValues
    ) -> List[SearchTag]:
        """Filter to only valid catalog tags"""
        pass
    
    def balance_tag_types(tags: List[SearchTag]) -> List[SearchTag]:
        """Ensure balanced mix of tag types"""
        pass
```

#### TagValidationPolicy (NEW - Feature 6)
**Purpose**: Validate tags against product catalog

**Rule**: Only return tags that exist in the product catalog

**Implementation**:
```python
class TagValidationPolicy:
    def is_valid(tag: SearchTag, catalog_values: CatalogValues) -> bool:
        """Check if tag exists in catalog"""
        pass
    
    def filter_invalid(
        tags: List[SearchTag],
        catalog_values: CatalogValues
    ) -> List[SearchTag]:
        """Remove invalid tags"""
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
6. Evaluate top result score against LLMFallbackPolicy threshold
7. IF score < threshold (Feature 5 - LLM Fallback):
   a. Emit LLMFallbackTriggered event
   b. IntentExtractionService extracts intents using Claude LLM
   c. Enhance query with extracted concrete attributes
   d. Re-execute search with enhanced query
   e. Emit IntentsExtracted event
8. ResultRankingService ranks and limits results
9. RelatedTagsService generates personalized tags (Feature 6)
10. Create SearchResult aggregate with ProductMatches and RelatedTags
11. Return SearchResult as JSON with related_tags
```

### Image Search Workflow
```
1. User submits image (base64)
2. Create SearchQuery aggregate with QueryImage
3. Validate image format and size
4. EmbeddingService generates QueryEmbedding
5. SearchStrategyService executes KNN search on image index
6. ResultRankingService ranks and limits results
7. RelatedTagsService generates tags based on top results (Feature 6)
8. Create SearchResult aggregate with ProductMatches and RelatedTags
9. Return SearchResult as JSON with related_tags
```

### Hybrid Search Workflow
```
1. Create SearchQuery with text
2. Extract filters
3. Generate embedding
4. Execute KNN search → List A
5. Execute BM25 search → List B
6. ReciprocalRankFusionService fuses A and B
7. Evaluate top score against LLMFallbackPolicy
8. IF fallback triggered, enhance query and re-search
9. Rank and limit results
10. Generate related tags
11. Return SearchResult with tags
```

### LLM Fallback Workflow (NEW - Feature 5)
```
1. Initial search returns low similarity scores (< threshold)
2. LLMFallbackPolicy.should_trigger() returns true
3. Emit LLMFallbackTriggered event
4. Check LLMResponseCache for cached result
5. IF cache miss:
   a. Build prompt with query + CatalogKnowledge
   b. Call Claude LLM via Bedrock
   c. Parse LLM response to extract intents
   d. Create ExtractedIntents value object
   e. Cache result in LLMResponseCache
   f. Emit IntentsExtracted event
6. IntentExtractionService.enhance_query() reformulates query
7. Re-execute search with enhanced query
8. Return results with llm_fallback_used: true in metadata
```

### Related Tags Generation Workflow (NEW - Feature 6)
```
1. Search completes with results
2. Check TagCache for cached tags
3. IF cache miss:
   a. Build prompt with query + search results context
   b. Call Claude LLM via Bedrock
   c. Parse LLM response to extract suggested tags
   d. TagValidationPolicy filters invalid tags
   e. TagGenerationPolicy balances tag types
   f. Cache result in TagCache
   g. Emit RelatedTagsGenerated event
4. Return tags with search results
```

### Tag Click Refinement Workflow (NEW - Feature 6)
```
1. User clicks on a tag (e.g., "Leather")
2. Create RefinedQuery with original query + selected tag
3. TagRefinementService determines refinement strategy:
   - price_range: Apply as price filter
   - category: Filter by category
   - material/style/color: Add to query text
4. Execute refined search
5. Generate new related tags for refined context
6. Emit TagSearchRefined event
7. Return refined results with new tags
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

#### Claude LLM Adapter (NEW - Feature 5 & 6)
```python
class ClaudeLLMAdapter:
    """Translates between domain and Bedrock Claude API"""
    
    def build_intent_extraction_prompt(
        query: str,
        catalog_knowledge: CatalogKnowledge
    ) -> str:
        """Build prompt for intent extraction"""
        pass
    
    def build_tag_generation_prompt(
        query: str,
        search_results: List[ProductMatch],
        catalog_values: CatalogValues
    ) -> str:
        """Build prompt for tag generation"""
        pass
    
    def invoke_claude(prompt: str, model_id: str) -> str:
        """Call Claude via Bedrock and return response"""
        pass
    
    def parse_intent_response(response: str) -> ExtractedIntents:
        """Parse Claude response to ExtractedIntents"""
        pass
    
    def parse_tag_response(response: str) -> List[SearchTag]:
        """Parse Claude response to SearchTags"""
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
- **LLM Integration** (Feature 5) for intelligent intent extraction from abstract queries
- **Related Tags** (Feature 6) for Google Shopping-style tag suggestions
- **Caching** for LLM responses and generated tags to optimize performance
- **Extensibility** for adding new tag types or intent mappings
