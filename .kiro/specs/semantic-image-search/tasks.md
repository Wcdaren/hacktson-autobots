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

## Phase 2: Backend API

- [x] 3. Create Search API Endpoints
  - [x] 3.1 Create `/api/store/search/semantic/route.ts` - semantic search endpoint
  - [x] 3.2 Create `/api/store/search/image/route.ts` - image search endpoint
  - [x] 3.3 Create `/api/store/search/hybrid/route.ts` - hybrid search endpoint
  - [x] 3.4 Implement request validation and error handling
  - [x] 3.5 Add response time logging

## Phase 3: Product Indexing

- [x] 4. Update Product Sync Flow
  - [x] 4.1 Update `sync-products` workflow to add embedding generation step
  - [x] 4.2 Create `generate-embeddings` workflow step
  - [x] 4.3 Update `product-sync` subscriber to trigger embedding generation
  - [x] 4.4 Implement batch index rebuild script `sync-embeddings.ts`

- [x] 5. Create Admin API
  - [x] 5.1 Create `/api/admin/opensearch/embeddings/route.ts` - embedding status query
  - [x] 5.2 Create `/api/admin/opensearch/embeddings/rebuild/route.ts` - rebuild index

## Phase 4: Frontend Integration

- [x] 6. Extend Search Connector
  - [x] 6.1 Create `hybridSearchConnector.ts` - hybrid search connector
  - [x] 6.2 Update `search-provider.tsx` to use new connector
  - [x] 6.3 Add semantic search toggle configuration

- [x] 7. Enhance SearchBox Component
  - [x] 7.1 Add camera icon button
  - [x] 7.2 Create `ImageSearchUpload.tsx` component
  - [x] 7.3 Implement image drag-and-drop upload
  - [x] 7.4 Implement image preview and loading state
  - [x] 7.5 Implement file type and size validation
  - [x] 7.6 Integrate image search API call

- [x] 8. Update Search Results Display
  - [x] 8.1 Extend result type to add `matchType` and `similarityScore`
  - [x] 8.2 Update `ResultView` to display match type label
  - [x] 8.3 Add image search results clear button

## Phase 5: Testing

- [x] 9. Unit Tests
  - [x] 9.1 EmbeddingService unit tests
  - [x] 9.2 OpenSearch vector search method tests
  - [x] 9.3 File validation logic tests

- [x] 10. Property-Based Tests (PBT)
  - [x] 10.1 P1: Search result ordering correctness test
  - [x] 10.2 P3: File validation correctness test
  - [x] 10.3 P4: Embedding vector dimension correctness test
  - [x] 10.4 P5: Retry mechanism correctness test

- [x] 11. Integration Tests
  - [x] 11.1 Semantic search endpoint integration test
  - [x] 11.2 Image search endpoint integration test
  - [x] 11.3 Hybrid search endpoint integration test

## Phase 6: Optimization & Documentation

- [ ]* 12. Performance Optimization (Optional)
  - [ ]* 12.1 Implement query embedding cache
  - [ ]* 12.2 Add search result cache
  - [ ]* 12.3 Optimize batch embedding generation

- [ ]* 13. Documentation (Optional)
  - [ ]* 13.1 Update API documentation
  - [ ]* 13.2 Add configuration guide
  - [ ]* 13.3 Write usage guide
