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
