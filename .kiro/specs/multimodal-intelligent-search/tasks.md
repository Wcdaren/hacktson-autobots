# Implementation Plan: Multimodal Intelligent Search

## Overview

This implementation plan breaks down the multimodal intelligent search feature into discrete, incremental tasks. Each task builds on previous work and includes testing requirements. The implementation follows the existing Medusa v2 + Remix architecture patterns.

## Tasks

- [x] 1. Create Image Analyzer Service
  - [x] 1.1 Create image analyzer module structure
    - Create `src/modules/image-analyzer/` directory
    - Create `types.ts` with interfaces for `ImageAnalysisResult`, `ProductAttributes`, `SearchImageAnalysis`
    - Create `service.ts` extending base service pattern
    - Create `index.ts` with module definition
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Implement Claude AI image analysis
    - Add method `analyzeProductImage(imageBuffer: Buffer)` using AWS Bedrock Claude 3 Sonnet
    - Implement prompt template for bilingual description generation
    - Parse JSON response to extract `description_en`, `description_zh`, and `attributes`
    - Add retry logic with exponential backoff for transient failures
    - _Requirements: 1.1, 1.2, 1.3, 8.4_

  - [x] 1.3 Implement search image analysis
    - Add method `analyzeSearchImage(imageBuffer: Buffer)` for user-uploaded images
    - Extract `dominant_colors`, `style_keywords`, `suggested_category`
    - Implement fallback to Rekognition labels on Claude failure
    - _Requirements: 5.1, 5.2, 1.5_

  - [ ]* 1.4 Write property tests for Image Analyzer
    - **Property 1: Bilingual Description Generation**
    - **Property 2: Attribute Extraction Completeness**
    - **Validates: Requirements 1.2, 1.3**

  - [x] 1.5 Register image analyzer module in medusa-config.ts
    - Add module configuration with AWS Bedrock settings
    - _Requirements: 1.1_

- [x] 2. Create Query Intent Extractor Service
  - [x] 2.1 Create intent extractor module structure
    - Create `src/modules/intent-extractor/` directory
    - Create `types.ts` with `SearchIntent`, `SearchConstraints` interfaces
    - Create `service.ts` with intent extraction logic
    - Create `index.ts` with module definition
    - _Requirements: 3.1, 3.5_

  - [x] 2.2 Implement intent extraction with Claude AI
    - Add method `extractIntent(query: string, imageContext?: SearchImageAnalysis)`
    - Implement prompt template for structured intent extraction
    - Handle Chinese price patterns (e.g., "1000以下" → price_max: 1000)
    - Handle English price patterns (e.g., "under $100" → price_max: 100)
    - Implement language detection
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.3 Implement fallback behavior
    - Return basic intent with original query on extraction failure
    - Log errors for monitoring
    - _Requirements: 3.7_

  - [ ]* 2.4 Write property tests for Intent Extractor
    - **Property 7: Intent Extraction Structure**
    - **Property 8: Bilingual Query Parsing**
    - **Validates: Requirements 3.1, 3.3, 3.4, 3.5**

  - [x] 2.5 Register intent extractor module in medusa-config.ts
    - Add module configuration
    - _Requirements: 3.1_

- [x] 3. Checkpoint - Verify core services
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Enhance OpenSearch Index Schema
  - [x] 4.1 Update OpenSearch index mapping
    - Add `ai_description_en`, `ai_description_zh` text fields
    - Add `ai_colors`, `ai_materials`, `ai_design_elements` keyword arrays
    - Add `ai_style` keyword field
    - Add `ai_analysis_timestamp` date field
    - _Requirements: 1.4_

  - [x] 4.2 Add AI embedding vector fields
    - Add `ai_text_embedding_en` k-NN vector field (1024 dimensions)
    - Add `ai_text_embedding_zh` k-NN vector field (1024 dimensions)
    - Add `ai_combined_embedding` k-NN vector field (1024 dimensions)
    - Configure HNSW parameters for cosine similarity
    - _Requirements: 1.4_

  - [x] 4.3 Update ProductDocument type definitions
    - Extend `ProductDocument` interface with new AI fields
    - Update `types.ts` in opensearch module
    - _Requirements: 1.4_

- [x] 5. Enhance Indexing Workflow
  - [x] 5.1 Create AI description generation workflow step
    - Create `src/workflows/steps/generate-ai-descriptions.ts`
    - Process product thumbnails through Image Analyzer
    - Handle batch processing with concurrency control
    - Implement async processing to avoid blocking
    - _Requirements: 1.1, 8.5_

  - [x] 5.2 Create AI embedding generation step
    - Generate embeddings from AI descriptions (English and Chinese)
    - Generate combined embedding from full AI analysis
    - _Requirements: 1.4_

  - [x] 5.3 Update sync products workflow
    - Integrate AI description step into existing workflow
    - Add feature flag for AI analysis
    - Ensure backward compatibility
    - _Requirements: 1.1, 1.4_

  - [ ]* 5.4 Write property tests for indexing
    - **Property 3: AI Description Persistence Round-Trip**
    - **Validates: Requirements 1.4**

- [x] 6. Checkpoint - Verify indexing pipeline
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Create Multimodal Search Service
  - [x] 7.1 Create multimodal search service
    - Create `src/modules/multimodal-search/` directory
    - Create `types.ts` with request/response interfaces
    - Create `service.ts` orchestrating search flow
    - _Requirements: 2.1, 4.1, 5.3_

  - [x] 7.2 Implement text-only search with intent extraction
    - Extract intent from query using Intent Extractor
    - Apply extracted constraints as filters
    - Use language-appropriate AI embeddings for semantic search
    - _Requirements: 3.1, 4.1, 4.2, 7.4_

  - [x] 7.3 Implement image-only search
    - Analyze uploaded image with Image Analyzer
    - Generate search embedding from AI description
    - Combine visual and semantic similarity
    - _Requirements: 5.1, 5.3, 5.4_

  - [x] 7.4 Implement mixed-modal search
    - Combine image analysis with text constraints
    - Apply constraint filtering on visually similar results
    - Merge and rank results by combined score
    - _Requirements: 2.1, 2.3, 2.4, 2.5_

  - [ ]* 7.5 Write property tests for multimodal search
    - **Property 5: Mixed-Modal Constraint Filtering**
    - **Property 13: Language-Appropriate Matching**
    - **Validates: Requirements 2.4, 7.4**

  - [x] 7.6 Register multimodal search module
    - Add module to medusa-config.ts
    - _Requirements: 2.1_

- [x] 8. Create Multimodal Search API Endpoint
  - [x] 8.1 Create API route structure
    - Create `src/api/store/search/multimodal/route.ts`
    - Create `src/api/store/search/multimodal/middlewares.ts`
    - Define Zod schema for request validation
    - _Requirements: 6.1, 6.2_

  - [x] 8.2 Implement POST handler
    - Validate request (at least query or image required)
    - Decode base64 image if provided
    - Call multimodal search service
    - Return results with intent metadata
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

  - [x] 8.3 Add error handling
    - Return 400 for invalid requests
    - Return 500 with fallback indicator on service failures
    - Implement graceful degradation
    - _Requirements: 6.4, 8.2_

  - [ ]* 8.4 Write property tests for API
    - **Property 11: API Input Validation**
    - **Property 12: API Response Completeness**
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.5**

- [x] 9. Checkpoint - Verify backend API
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Create Frontend Components
  - [x] 10.1 Create ImageDropzone component
    - Create `app/components/search/ImageDropzone/ImageDropzone.tsx`
    - Implement drag-and-drop functionality
    - Add file validation (size, format)
    - Add image preview with remove button
    - Style with Tailwind CSS
    - _Requirements: 2.2, 5.1_

  - [x] 10.2 Create IntentChips component
    - Create `app/components/search/IntentChips/IntentChips.tsx`
    - Display extracted constraints as chips
    - Add remove/edit functionality
    - Support color, price, material, category chips
    - _Requirements: 3.1, 3.2_

  - [x] 10.3 Create SearchModeToggle component
    - Create `app/components/search/SearchModeToggle/SearchModeToggle.tsx`
    - Toggle between text, image, and mixed modes
    - Style with Tailwind CSS
    - _Requirements: 2.1_

  - [x] 10.4 Create MultimodalSearchInput component
    - Create `app/components/search/MultimodalSearchInput/MultimodalSearchInput.tsx`
    - Combine text input with image upload trigger
    - Handle combined submission
    - _Requirements: 2.1, 2.2_

- [x] 11. Create Frontend Hooks
  - [x] 11.1 Create useImageUpload hook
    - Create `app/hooks/useImageUpload.ts`
    - Handle file selection and validation
    - Generate base64 encoding
    - Manage preview state
    - _Requirements: 2.2, 5.1_

  - [x] 11.2 Create useMultimodalSearch hook
    - Create `app/hooks/useMultimodalSearch.ts`
    - Implement search function calling backend API
    - Manage loading, error, and results state
    - Handle intent extraction response
    - _Requirements: 2.1, 3.1, 4.1_

  - [x] 11.3 Create multimodal search connector
    - Create `libs/util/search/multimodalSearchConnector.ts`
    - Extend existing hybrid search connector
    - Add image data support
    - Include intent in response
    - _Requirements: 6.1, 6.5_

- [x] 12. Update Search Page
  - [x] 12.1 Integrate multimodal components into search page
    - Update `app/routes/search.tsx`
    - Add SearchModeToggle
    - Add ImageDropzone (conditional on mode)
    - Add IntentChips display
    - _Requirements: 2.1, 3.1_

  - [x] 12.2 Update search results display
    - Add match type indicators (text, visual, mixed, semantic)
    - Add similarity score display
    - Update result card styling
    - _Requirements: 6.5_

  - [x] 12.3 Add responsive design
    - Implement mobile layout (stacked)
    - Implement tablet layout (side-by-side)
    - Implement desktop layout (full-width)
    - _Requirements: 2.1_

  - [x] 12.4 Add accessibility features
    - Add ARIA labels
    - Implement keyboard navigation
    - Add screen reader announcements
    - _Requirements: 2.1_

- [ ] 13. Add Internationalization
  - [~] 13.1 Create search translations
    - Add English translations for search UI
    - Add Chinese translations for search UI
    - _Requirements: 7.1, 7.2_

  - [~] 13.2 Integrate translations into components
    - Update components to use translation keys
    - _Requirements: 7.1, 7.2_

- [~] 14. Checkpoint - Verify frontend integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Integration and Error Handling
  - [~] 15.1 Implement graceful fallback chain
    - Claude failure → Rekognition fallback
    - Intent extraction failure → standard hybrid search
    - Image analysis timeout → cached/empty attributes
    - _Requirements: 1.5, 3.7, 8.2, 8.3_

  - [ ]* 15.2 Write property tests for fallback behavior
    - **Property 4: Graceful Fallback on Service Failure**
    - **Property 9: Graceful Degradation on Intent Failure**
    - **Validates: Requirements 1.5, 3.7, 8.2, 8.3**

  - [~] 15.3 Add retry logic with exponential backoff
    - Implement in Image Analyzer service
    - Implement in Intent Extractor service
    - Configure max retries and base delay
    - _Requirements: 8.4_

  - [ ]* 15.4 Write property tests for retry logic
    - **Property 14: Retry with Exponential Backoff**
    - **Validates: Requirements 8.4**

- [~] 16. Final Checkpoint - End-to-end verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify complete search flow: text-only, image-only, mixed-modal
  - Verify bilingual support (Chinese and English)
  - Verify fallback behavior when services are unavailable

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows existing Medusa v2 patterns and Remix conventions
