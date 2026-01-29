# Semantic Search and Image Search Implementation Tasks

## Phase 1: Infrastructure

- [x] 1. Create EmbeddingService Module
  - [x] 1.1 Create module directory structure `apps/medusa/src/modules/embedding/`
  - [x] 1.2 Define types `types.ts` (EmbeddingServiceOptions, TextEmbeddingResult, ImageEmbeddingResult)
  - [x] 1.3 Implement AWS Bedrock client initialization
  - [x] 1.4 Implement `generateTextEmbedding()` method - call Titan Embeddings V2
  - [x] 1.5 Implement `generateImageEmbedding()` method - call Rekognition
  - [x] 1.6 Implement `batchGenerateTextEmbeddings()` method
  - [x] 1.7 Implement retry mechanism (exponential backoff)
  - [x] 1.8 Register module in `medusa-config.ts`

- [x] 2. Extend OpenSearch Module for k-NN Support
  - [x] 2.1 Update `ProductDocument` type to add vector fields
  - [x] 2.2 Update `ensureIndex()` to add k-NN index mapping
  - [x] 2.3 Implement `semanticSearch()` method - k-NN vector search
  - [x] 2.4 Implement `imageSearch()` method - image vector search
  - [x] 2.5 Implement `hybridSearch()` method - keyword + vector hybrid search

- [x] 3. Add Region-Aware Pricing Support
  - [x] 3.1 Update `ProductDocument` type to add per-region price fields (`price_reg_{regionId}`, `currency_reg_{regionId}`, `default_price`, `default_currency`)
  - [x] 3.2 Update OpenSearch index mapping to include per-region price fields as `float` type
  - [x] 3.3 Update `sync-opensearch.ts` to extract and index min_price per region from product variants
  - [x] 3.4 Update `hybridSearch()` and `browseProductsWithFacets()` methods to accept `regionId` parameter
  - [x] 3.5 Update price range aggregation to use dynamic region price field based on `regionId`

- [x] 4. Add Hierarchical Category Support
  - [x] 4.1 Update `ProductDocument` type to add `category_path`, `category_level`, `category_parent_id` fields
  - [x] 4.2 Update OpenSearch index mapping to include hierarchical category fields
  - [x] 4.3 Update `sync-opensearch.ts` to build category hierarchy (collect all ancestor IDs/names, build path string)
  - [x] 4.4 Create helper function to traverse category tree and collect ancestors

## Phase 2: Backend API

- [x] 5. Create Search API Endpoints
  - [x] 5.1 Create `/api/store/search/semantic/route.ts` - semantic search endpoint
  - [x] 5.2 Create `/api/store/search/image/route.ts` - image search endpoint
  - [x] 5.3 Create `/api/store/search/hybrid/route.ts` - hybrid search endpoint
  - [x] 5.4 Implement request validation and error handling
  - [x] 5.5 Add response time logging

- [x] 6. Update Search API for Region Pricing
  - [x] 6.1 Update hybrid search endpoint to accept `regionId` in request body
  - [x] 6.2 Update browse endpoint to accept `regionId` parameter
  - [x] 6.3 Return region-specific price and currency in search results
  - [x] 6.4 Add fallback to `default_price` when region price is missing

## Phase 3: Product Indexing

- [x] 7. Update Product Sync Flow
  - [x] 7.1 Update `sync-products` workflow to add embedding generation step
  - [x] 7.2 Create `generate-embeddings` workflow step
  - [x] 7.3 Update `product-sync` subscriber to trigger embedding generation
  - [x] 7.4 Implement batch index rebuild script `sync-embeddings.ts`

- [x] 8. Create Admin API
  - [x] 8.1 Create `/api/admin/opensearch/embeddings/route.ts` - embedding status query
  - [x] 8.2 Create `/api/admin/opensearch/embeddings/rebuild/route.ts` - rebuild index

## Phase 4: Frontend Integration

- [x] 9. Extend Search Connector
  - [x] 9.1 Create `hybridSearchConnector.ts` - hybrid search connector
  - [x] 9.2 Update `search-provider.tsx` to use new connector
  - [x] 9.3 Add semantic search toggle configuration

- [x] 10. Enhance SearchBox Component
  - [x] 10.1 Add camera icon button
  - [x] 10.2 Create `ImageSearchUpload.tsx` component
  - [x] 10.3 Implement image drag-and-drop upload
  - [x] 10.4 Implement image preview and loading state
  - [x] 10.5 Implement file type and size validation
  - [x] 10.6 Integrate image search API call

- [x] 11. Update Search Results Display
  - [x] 11.1 Extend result type to add `matchType` and `similarityScore`
  - [x] 11.2 Update `ResultView` to display match type label
  - [x] 11.3 Add image search results clear button

- [x] 12. Simplify Search UI/UX
  - [x] 12.1 Remove `SearchMode` enum and mode switching from `search-provider.tsx` - always use hybrid search
  - [x] 12.2 Update `hybridSearchConnector.ts` to accept and pass `regionId` to backend
  - [x] 12.3 Remove match type badges from `SearchResults.tsx` - users don't need to see exact/semantic/visual labels
  - [x] 12.4 Update price display to show "From $XXX" format using region-specific price

- [x] 13. Integrate Category/Collection Pages with Search
  - [x] 13.1 Refactor `categories.$categoryHandle.tsx` to use OpenSearch browse with `category_ids` filter
  - [x] 13.2 Refactor `collections.$collectionHandle.tsx` to use OpenSearch browse with `collection_ids` filter
  - [x] 13.3 Add facet filters sidebar to category page (exclude category facet, show collections/tags/price/materials)
  - [x] 13.4 Add facet filters sidebar to collection page (exclude collection facet, show categories/tags/price/materials)
  - [x] 13.5 Create shared `ProductListingPage` component for reuse between search/category/collection pages
  - [x] 13.6 Display child categories as navigation chips on category page (using hierarchical data)

## Phase 5: Testing

- [x] 14. Unit Tests
  - [x] 14.1 EmbeddingService unit tests
  - [x] 14.2 OpenSearch vector search method tests
  - [x] 14.3 File validation logic tests

- [x] 15. Property-Based Tests (PBT)
  - [x] 15.1 P1: Search result ordering correctness test
  - [x] 15.2 P3: File validation correctness test
  - [x] 15.3 P4: Embedding vector dimension correctness test
  - [x] 15.4 P5: Retry mechanism correctness test

- [x] 16. Integration Tests
  - [x] 16.1 Semantic search endpoint integration test
  - [x] 16.2 Image search endpoint integration test
  - [x] 16.3 Hybrid search endpoint integration test

- [~] 17. Region Pricing Tests
  - [x] 17.1 Unit test for region price field selection logic
  - [x] 17.2 Integration test for price range facet with different regions
  - [~] 17.3 P6: Property test for region price consistency

## Phase 6: Optimization & Documentation

- [ ]* 18. Performance Optimization (Optional)
  - [ ]* 18.1 Implement query embedding cache
  - [ ]* 18.2 Add search result cache
  - [ ]* 18.3 Optimize batch embedding generation

- [ ]* 19. Documentation (Optional)
  - [ ]* 19.1 Update API documentation
  - [ ]* 19.2 Add configuration guide
  - [ ]* 19.3 Write usage guide
