# User Stories: E-Commerce Semantic Search Engine

## Project Overview
Backend search system for an e-commerce furniture website that enables semantic text search and image similarity search using AWS Bedrock Titan embeddings and OpenSearch.

---

## Epic 1: Data Ingestion and Preparation

### US-1.1: Bulk Data Loading from S3
**As a** Data Engineer  
**I want to** load product data from CSV files stored on S3 into the system  
**So that** the search engine has access to all product information for indexing

**Acceptance Criteria:**
- System can connect to S3 and retrieve CSV files from specified bucket/path
- System can parse the following CSV files:
  - variant.csv (core product data)
  - variant_affinity.csv (product relationships)
  - variant_file.csv (associated files)
  - variant_image.csv (product images)
  - variant_option.csv (product options)
  - variant_property.csv (detailed properties)
- Data is validated for completeness and integrity
- Failed records are logged with error details
- System provides progress tracking during bulk load
- Load process is idempotent (can be re-run safely)

---

### US-1.2: Product Data Enrichment
**As a** Data Engineer  
**I want to** combine data from multiple CSV sources into enriched product records  
**So that** each variant has complete information for search and retrieval

**Acceptance Criteria:**
- System joins data from all CSV files using variant_id as primary key
- Each enriched record contains:
  - Core variant information (name, description, SKU, pricing)
  - All associated images (white background and lifestyle)
  - Product properties (dimensions, materials, care instructions)
  - Product options (colors, sizes, configurations)
  - Related products (affinity data)
  - Associated files (assembly instructions, etc.)
  - Review ratings and counts
- Missing or null values are handled gracefully
- Enriched records are stored in a structured format suitable for embedding

---

### US-1.3: Text Content Aggregation for Embedding
**As a** Data Engineer  
**I want to** aggregate all searchable text fields into a comprehensive text representation  
**So that** semantic embeddings capture all relevant product information

**Acceptance Criteria:**
- System aggregates the following text fields per variant:
  - Product name and variant name
  - Product description
  - Backend and frontend categories/subcategories
  - Collection name
  - Color tone
  - All property values (materials, dimensions, care instructions, etc.)
  - Property explanations
  - Option types and values
- Text fields are cleaned and normalized (remove HTML, special characters)
- Fields are weighted appropriately (e.g., name and description more important than property details)
- Aggregated text is stored for embedding generation
- Text length is optimized for embedding model limits

---

## Epic 2: Embedding Generation

### US-2.1: Text Embedding Generation using Bedrock Titan
**As a** ML Engineer  
**I want to** generate embeddings for product text using AWS Bedrock Titan model  
**So that** semantic text search can find relevant products based on meaning

**Acceptance Criteria:**
- System connects to AWS Bedrock service
- System uses Titan embeddings model for text embedding
- Embeddings are generated for aggregated product text
- Batch processing is implemented for efficiency
- Failed embedding generations are retried with exponential backoff
- Embeddings are stored with their corresponding variant_id
- Embedding generation progress is tracked and logged
- System handles rate limits from Bedrock API gracefully

---

### US-2.2: Image Embedding Generation using Bedrock Titan
**As a** ML Engineer  
**I want to** generate embeddings for all product images using AWS Bedrock Titan model  
**So that** image similarity search can find visually similar products

**Acceptance Criteria:**
- System retrieves all product images (both white background and lifestyle)
- Images are downloaded from URLs in variant_image.csv
- System uses Titan multimodal embeddings model for image embedding
- Embeddings are generated for each image associated with a variant
- Both default and non-default images are embedded
- Image format validation (JPG, PNG only)
- Failed downloads or embedding generations are logged and retried
- Embeddings are stored with variant_id and image metadata (type, position, URL)
- Batch processing is implemented for efficiency

---

## Epic 3: Search Index Management

### US-3.1: OpenSearch Index Creation
**As a** Search Engineer  
**I want to** create and configure OpenSearch indices for text and image embeddings  
**So that** the system can perform efficient similarity searches

**Acceptance Criteria:**
- System creates separate indices for:
  - Text embeddings with metadata
  - Image embeddings with metadata
- Index schema includes:
  - Vector field for embeddings (appropriate dimensions for Titan model)
  - All product metadata fields (variant_id, product_id, name, price, etc.)
  - Filterable fields (price, category, color, material, size, availability)
- KNN configuration is optimized for similarity search
- BM25 configuration is set up for text fields
- Index settings include appropriate shards and replicas
- Mapping includes all necessary fields from enriched product data

---

### US-3.2: Data Indexing to OpenSearch
**As a** Search Engineer  
**I want to** index embeddings and metadata into OpenSearch  
**So that** search queries can retrieve relevant results

**Acceptance Criteria:**
- Text embeddings are indexed with full product metadata
- Image embeddings are indexed with image metadata and product reference
- Bulk indexing is used for efficiency
- Failed indexing operations are retried
- Index refresh is triggered after bulk operations
- System validates successful indexing
- Indexing progress is tracked and logged
- System can handle large datasets (thousands of products)

---

## Epic 4: Text Search Functionality

### US-4.1: Semantic Text Search API
**As a** Frontend Developer  
**I want to** call a function `get_text_results(String user_search_string)` that returns relevant products  
**So that** users can find products using natural language queries

**Acceptance Criteria:**
- Function accepts a string parameter (user search query)
- Function validates input (non-empty string)
- Returns error code and message "empty search query" if input is empty
- Query is embedded using Bedrock Titan model
- System performs KNN search on OpenSearch using query embedding
- Results include similarity scores
- Maximum 50 results are returned
- Response time is under 3 seconds
- Returns JSON array with product information and image URLs
- Returned fields are configurable via YAML config

---

### US-4.2: Query Intent Extraction and Filtering
**As a** Search Engineer  
**I want to** extract filter criteria from natural language queries  
**So that** search results match user-specified constraints

**Acceptance Criteria:**
- System extracts the following filter types from query text:
  - Price range (e.g., "under $500", "between $200 and $400")
  - Material (e.g., "wooden", "leather", "fabric")
  - Size/dimensions (e.g., "large", "king size", "180cm")
  - Color (e.g., "grey", "walnut", "white")
  - Category (e.g., "sofa", "dining table", "bed")
  - Comfort level (e.g., "soft", "firm")
  - Theme/style (e.g., "modern", "mid-century")
  - Availability (e.g., "in stock")
- Extracted filters are applied to OpenSearch query
- Filters are combined with semantic search using boolean queries
- System handles ambiguous or conflicting filters gracefully
- Filter extraction is logged for debugging

---

### US-4.3: BM25 Text Search
**As a** Search Engineer  
**I want to** implement BM25 keyword-based search  
**So that** exact keyword matches are prioritized appropriately

**Acceptance Criteria:**
- BM25 search is performed on text fields (name, description, properties)
- BM25 parameters (k1, b) are configurable via YAML
- Search covers all relevant text fields with appropriate field boosting
- Results include BM25 relevance scores
- Can be used standalone or combined with semantic search

---

### US-4.4: Hybrid Search with Reciprocal Rank Fusion
**As a** Search Engineer  
**I want to** combine semantic (KNN) and keyword (BM25) search results using reciprocal rank fusion  
**So that** search results benefit from both semantic understanding and exact matches

**Acceptance Criteria:**
- System performs both KNN and BM25 searches in parallel
- Reciprocal rank fusion algorithm combines results
- RRF parameters (k constant) are configurable via YAML
- Combined results are re-ranked based on RRF scores
- Final results include both semantic and BM25 scores for transparency
- Hybrid search can be enabled/disabled via configuration
- Performance remains under 3 seconds

---

## Epic 5: Image Search Functionality

### US-5.1: Image Similarity Search API
**As a** Frontend Developer  
**I want to** call a function `get_image_match_result(base64 image object)` that returns visually similar products  
**So that** users can find products by uploading reference images

**Acceptance Criteria:**
- Function accepts base64 encoded image as parameter
- Function validates image format (JPG, PNG only)
- Returns error code and message "invalid uploaded image format" for unsupported formats
- Image is decoded and embedded using Bedrock Titan multimodal model
- System performs KNN search on image embeddings in OpenSearch
- Results include similarity scores
- Maximum 50 results are returned
- Response time is under 3 seconds
- Returns JSON array with product information and image URLs
- Minimum similarity threshold is configurable via YAML

---

### US-5.2: Image Search Result Ranking
**As a** Search Engineer  
**I want to** rank image search results by similarity score  
**So that** the most visually similar products appear first

**Acceptance Criteria:**
- Results are sorted by descending similarity score
- Similarity score is included in response
- If no results meet minimum threshold, return error code with "no results found for query"
- If results exist but are below threshold, still return them with scores
- Threshold value is configurable via YAML config

---

## Epic 6: Configuration Management

### US-6.1: YAML Configuration System
**As a** System Administrator  
**I want to** configure system behavior via YAML files  
**So that** I can adjust search parameters without code changes

**Acceptance Criteria:**
- System reads configuration from YAML file(s)
- Configuration includes:
  - AWS credentials and region
  - S3 bucket and paths for data
  - Bedrock model identifiers
  - OpenSearch endpoint and credentials
  - Search parameters:
    - Maximum results (default: 50)
    - Response timeout (default: 3 seconds)
    - Image similarity threshold
    - RRF k constant
    - BM25 parameters (k1, b)
    - Field weights for hybrid search
  - Return field configuration (which fields to include in response)
  - Logging level and output
- Configuration is validated on startup
- Invalid configuration triggers clear error messages
- Configuration can be reloaded without restart (optional)

---

## Epic 7: Response Formatting and Error Handling

### US-7.1: Search Response Formatting
**As a** Frontend Developer  
**I want to** receive search results in a consistent JSON format  
**So that** I can easily parse and display results

**Acceptance Criteria:**
- Response includes:
  - Status code (success/error)
  - Total number of results
  - Array of product results, each containing:
    - variant_id
    - product_id
    - All configured fields from variant data
    - Array of image URLs
    - Similarity/relevance score
    - Rank position
- Response structure is consistent for both text and image search
- All fields from variant data are included by default (configurable)
- Response is valid JSON
- Large text fields are not truncated
- Image URLs are fully qualified and accessible

---

### US-7.2: Error Handling and Logging
**As a** System Administrator  
**I want to** receive clear error messages and comprehensive logs  
**So that** I can troubleshoot issues effectively

**Acceptance Criteria:**
- System returns appropriate error codes and messages for:
  - Empty search query: "empty search query"
  - Invalid image format: "invalid uploaded image format"
  - No results found: "no results found for query"
  - Service unavailable (OpenSearch, Bedrock)
  - Timeout exceeded
  - Invalid configuration
- All errors are logged with:
  - Timestamp
  - Error type
  - Error message
  - Stack trace (for exceptions)
  - Request context (query, parameters)
- Successful requests are logged with:
  - Timestamp
  - Query/image identifier
  - Number of results
  - Response time
- Logs are written to configurable output (file, CloudWatch)
- Log level is configurable (DEBUG, INFO, WARN, ERROR)

---

## Epic 8: Performance and Optimization

### US-8.1: Search Performance Optimization
**As a** Search Engineer  
**I want to** ensure search queries complete within 3 seconds  
**So that** the demo provides a good user experience

**Acceptance Criteria:**
- Text search completes in under 3 seconds for 95% of queries
- Image search completes in under 3 seconds for 95% of queries
- Hybrid search completes in under 3 seconds for 95% of queries
- System uses connection pooling for OpenSearch
- Embedding generation is cached where possible
- Parallel processing is used for hybrid search
- Performance metrics are logged for each request
- Slow queries (>2 seconds) are logged with details for optimization

---

### US-8.2: Resource Management
**As a** System Administrator  
**I want to** ensure the system uses AWS resources efficiently  
**So that** costs are minimized for the hackathon demo

**Acceptance Criteria:**
- Bedrock API calls are batched where possible
- OpenSearch queries are optimized (appropriate filters, field selection)
- Image downloads are cached during indexing
- Failed operations use exponential backoff to avoid API throttling
- System gracefully handles rate limits
- Resource usage is logged (API calls, data transfer)
- System can run on EC2 instance or SageMaker notebook

---

## Epic 9: Testing and Validation

### US-9.1: Search Quality Validation
**As a** Product Owner  
**I want to** validate that search results are relevant  
**So that** the demo showcases the system's capabilities effectively

**Acceptance Criteria:**
- Test queries are defined covering:
  - Simple product names ("sofa", "dining table")
  - Descriptive queries ("comfortable grey sofa under $1000")
  - Style-based queries ("mid-century modern furniture")
  - Material-based queries ("wooden coffee table")
  - Size-based queries ("king size bed")
- Each test query returns relevant results
- Results include appropriate similarity scores
- Image search with sample furniture images returns visually similar items
- System handles edge cases (very long queries, special characters)

---

### US-9.2: End-to-End Integration Testing
**As a** Developer  
**I want to** test the complete data pipeline from ingestion to search  
**So that** I can verify the system works correctly

**Acceptance Criteria:**
- Test can load sample data from S3
- Test verifies embeddings are generated correctly
- Test verifies data is indexed in OpenSearch
- Test performs sample text searches and validates responses
- Test performs sample image searches and validates responses
- Test verifies error handling for invalid inputs
- Test verifies configuration loading
- All tests can be run automatically

---

## Non-Functional Requirements

### NFR-1: Scalability
- System should handle at least 1000 product variants for the demo
- Should be architecturally capable of scaling to 10,000+ variants

### NFR-2: Availability
- System should be available during demo period
- Graceful degradation if external services (Bedrock, OpenSearch) are slow

### NFR-3: Security
- AWS credentials are stored securely (not in code)
- S3 access uses appropriate IAM roles
- OpenSearch access is authenticated
- No sensitive data in logs

### NFR-4: Maintainability
- Code is modular and well-documented
- Configuration is externalized
- Clear separation between data ingestion, embedding, and search components

### NFR-5: Observability
- Comprehensive logging at all stages
- Performance metrics for each operation
- Clear error messages for troubleshooting

---

## Out of Scope (for Hackathon)
- Real-time data updates
- Periodic data refresh from S3
- Multi-language support
- Pagination
- User authentication/authorization
- A/B testing framework
- Advanced analytics and monitoring dashboards
- Auto-scaling infrastructure
- Production-grade high availability setup

---

## Epic 10: LLM Fallback for Intent Extraction (Feature 5)

### US-10.1: Low-Quality Result Detection
**As a** Search Engineer  
**I want to** detect when search results have low similarity scores  
**So that** the system can trigger an LLM fallback to improve results

**Acceptance Criteria:**
- System evaluates the top result's similarity score after initial search
- If top score is below configurable threshold (default: 0.3), fallback is triggered
- Threshold is configurable via YAML config file
- Detection happens before returning results to user
- System logs when fallback is triggered with query and score details
- Fallback can be enabled/disabled via configuration

---

### US-10.2: LLM Intent Extraction using Claude
**As a** Search Engineer  
**I want to** use Claude LLM (via Bedrock) to extract meaningful intents from abstract queries  
**So that** queries like "modern yet royal table" can be mapped to concrete product attributes

**Acceptance Criteria:**
- System connects to AWS Bedrock Claude model
- Claude model ID is configurable via YAML (default: anthropic.claude-3-sonnet)
- LLM receives the original query and catalog knowledge (categories, materials, colors, styles)
- LLM extracts concrete product attributes from abstract terms:
  - "royal" → "ornate", "gold accents", "traditional", "vintage", "elegant"
  - "cozy" → "soft fabric", "plush", "comfortable", "warm colors"
  - "minimalist" → "clean lines", "simple", "modern", "neutral colors"
- Extracted intents are used to reformulate the search query
- LLM response is parsed and validated
- Error handling for LLM service unavailability
- Timeout is configurable (default: 30 seconds)
- Max retries is configurable (default: 2)

---

### US-10.3: Two-Part Response Flow for Fallback
**As a** Frontend Developer  
**I want to** receive a status message when LLM fallback is being used  
**So that** I can show appropriate loading/status to the user

**Acceptance Criteria:**
- When fallback is triggered, first response is:
  ```json
  {"status": "no results found, falling back to LLM model to retrieve results"}
  ```
- Second response contains actual search results from LLM-enhanced query
- Response includes metadata indicating LLM fallback was used:
  ```json
  {"search_metadata": {"llm_fallback_used": true, "original_query": "...", "enhanced_query": "..."}}
  ```
- If LLM fallback also returns no results, return standard "no results found" error
- Response time for fallback scenario is acceptable (additional 1-2 seconds)

---

### US-10.4: LLM Response Caching
**As a** System Administrator  
**I want to** cache LLM responses for similar queries  
**So that** repeated queries don't incur additional LLM costs and latency

**Acceptance Criteria:**
- LLM responses are cached with the original query as key
- Cache TTL is configurable via YAML (default: 1 hour / 3600 seconds)
- Cache can be enabled/disabled via configuration
- Cache hit/miss is logged for monitoring
- Similar queries (normalized) share cached responses
- Cache is cleared on system restart (in-memory for demo)
- Cache size is bounded to prevent memory issues

---

## Epic 11: Related Search Tags - Google Shopping Style (Feature 6)

### US-11.1: Related Tag Generation using LLM
**As a** Search Engineer  
**I want to** generate personalized search tags based on the user's query  
**So that** users can discover and refine their search like Google Shopping

**Acceptance Criteria:**
- System uses Claude LLM to generate relevant tags for each query
- Tags are personalized to the query context:
  - Query: "brown leather chair" → Tags: "Swivel", "Dining Chairs", "Recliners", "Armchairs", "Under $1,000"
  - Query: "modern sofa" → Tags: "Sectional", "2-Seater", "3-Seater", "Fabric", "Leather", "Grey"
- LLM receives query and catalog knowledge to generate relevant suggestions
- Generated tags are diverse (mix of categories, prices, materials, styles, colors)
- Tag generation happens in parallel with search (not blocking)
- LLM model ID is configurable via YAML

---

### US-11.2: Tag Validation Against Product Catalog
**As a** Search Engineer  
**I want to** filter generated tags to only show those that exist in the product catalog  
**So that** users don't click on tags that return no results

**Acceptance Criteria:**
- All generated tags are validated against catalog values in config
- Valid catalog values include:
  - Categories: Sofas, Tables, Chairs, Beds, Desks, etc.
  - Price Ranges: Under $500, Under $1,000, $1,000-$2,000, etc.
  - Materials: Leather, Fabric, Wood, Metal, Glass, etc.
  - Styles: Modern, Traditional, Minimalist, Scandinavian, etc.
  - Colors: Brown, Grey, White, Black, Beige, etc.
- Invalid tags (not in catalog) are removed from response
- Catalog values are configurable via YAML
- Validation is case-insensitive
- At least minimum number of valid tags must remain (configurable, default: 3)

---

### US-11.3: Tag Count and Type Configuration
**As a** System Administrator  
**I want to** configure the number and types of tags returned  
**So that** I can tune the user experience

**Acceptance Criteria:**
- Minimum tags: configurable (default: 3)
- Maximum tags: configurable (default: 10)
- Tag types to include are configurable:
  - categories
  - price_ranges
  - materials
  - styles
  - colors
- If fewer than minimum valid tags, system attempts to generate more
- Tags are balanced across types (not all from one category)
- Configuration is via YAML file

---

### US-11.4: Tag Response Format
**As a** Frontend Developer  
**I want to** receive related tags in a structured format  
**So that** I can display clickable tag buttons to users

**Acceptance Criteria:**
- Tags are included in search response under `related_tags` array
- Each tag includes:
  - `tag`: Display text (e.g., "Dining Chairs")
  - `type`: Tag type (e.g., "category", "price_range", "material", "style", "color")
  - `count`: Number of products matching this tag (optional, for display)
- Example response format:
  ```json
  {
    "related_tags": [
      {"tag": "Dining Chairs", "type": "category", "count": 45},
      {"tag": "Under $1,000", "type": "price_range", "count": 89},
      {"tag": "Leather", "type": "material", "count": 34}
    ]
  }
  ```
- Tags are ordered by relevance to query
- Response includes `tags_generated: true/false` in metadata

---

### US-11.5: Tag Click Search Refinement
**As a** Frontend Developer  
**I want to** refine search results when a user clicks on a tag  
**So that** users can easily narrow down their search

**Acceptance Criteria:**
- Clicking a tag updates the search with that tag as a filter/refinement
- Original query is preserved and combined with tag
- Example: Query "chair" + Click "Leather" → Search for "leather chair"
- Price range tags apply as filters (e.g., "Under $1,000" → price_max: 1000)
- Category tags filter by category
- Material/Style/Color tags are added to query or applied as filters
- New search returns updated results and new related tags
- API supports passing selected tag as parameter

---

### US-11.6: Tag Response Caching
**As a** System Administrator  
**I want to** cache generated tags for queries  
**So that** repeated queries don't incur additional LLM costs

**Acceptance Criteria:**
- Generated tags are cached with query as key
- Cache TTL is configurable via YAML (default: 30 minutes / 1800 seconds)
- Cache can be enabled/disabled via configuration
- Cache is separate from LLM fallback cache
- Cache hit/miss is logged for monitoring
- Cache is cleared on system restart (in-memory for demo)
