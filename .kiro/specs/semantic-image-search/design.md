# Semantic Search and Image Search Technical Design

## Compatibility with Existing UI Library

### @elastic/react-search-ui Integration Strategy

The existing project uses `@elastic/react-search-ui` as the search UI framework. This library supports **Custom Connectors**, which we will leverage:

1. **Retain existing components** - SearchBox, SearchResults, SearchFilters, Paging, etc. continue to be used
2. **Extend connector** - Create custom connector to handle semantic search logic on the backend
3. **Transparent upgrade** - Minimal frontend code changes, mainly backend API and connector extensions

### Implementation Approach

```typescript
// Extend existing connector to add semantic search support
function createHybridSearchConnector(): APIConnector {
  return {
    async onSearch(state, queryConfig) {
      // 1. Call backend hybrid search API
      // 2. Backend processing: keyword search + vector search
      // 3. Return merged results
    },
    async onAutocomplete(state, queryConfig) {
      // Maintain existing autocomplete logic
    }
  };
}
```

### Image Search Integration

Image search added as **independent functionality** to SearchBox component:
- Add camera icon button
- After image upload, call separate image search API
- Results managed through SearchProvider's `setSearchTerm` or custom state management

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Storefront (Remix)                        │
├─────────────────────────────────────────────────────────────────┤
│  SearchBox          │  ImageUpload        │  SearchResults       │
│  (Text+Semantic)    │  (Image Upload)     │  (Hybrid Results)    │
└─────────────────────┴─────────────────────┴─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Medusa Backend API                          │
├─────────────────────────────────────────────────────────────────┤
│  /api/store/search/semantic   │  /api/store/search/image        │
│  (Semantic Search Endpoint)   │  (Image Search Endpoint)        │
└───────────────────────────────┴─────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  AWS Bedrock    │ │  AWS Rekognition│ │   OpenSearch    │
│  (Text Embed)   │ │  (Image Feature)│ │   (k-NN Index)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Component Design

### 1. Backend Components

#### 1.1 Embedding Service Module (EmbeddingService)

**Location**: `apps/medusa/src/modules/embedding/`

```typescript
// types.ts
export interface EmbeddingServiceOptions {
  awsRegion: string;
  bedrockModelId: string; // amazon.titan-embed-text-v2:0
  rekognitionEnabled: boolean;
}

export interface TextEmbeddingResult {
  embedding: number[];
  inputTokens: number;
}

export interface ImageEmbeddingResult {
  embedding: number[];
  labels: string[];
}

// service.ts
export default class EmbeddingService {
  // Generate text embedding vector
  async generateTextEmbedding(text: string): Promise<TextEmbeddingResult>;
  
  // Generate image embedding vector
  async generateImageEmbedding(imageBuffer: Buffer): Promise<ImageEmbeddingResult>;
  
  // Batch generate text embeddings
  async batchGenerateTextEmbeddings(texts: string[]): Promise<TextEmbeddingResult[]>;
}
```

#### 1.2 OpenSearch Module Extension

**Update**: `apps/medusa/src/modules/opensearch/`

```typescript
// Extend ProductDocument type
export interface ProductDocument {
  // ... existing fields
  
  // New vector fields
  text_embedding: number[];      // Text embedding vector (1024 dimensions)
  image_embedding: number[];     // Image embedding vector (1024 dimensions)
  embedding_updated_at: string;  // Embedding update timestamp
}

// Extend OpenSearchModuleService
export default class OpenSearchModuleService {
  // ... existing methods
  
  // Semantic search
  async semanticSearch(query: string, options?: SemanticSearchOptions): Promise<SearchResult[]>;
  
  // Image search
  async imageSearch(embedding: number[], options?: ImageSearchOptions): Promise<SearchResult[]>;
  
  // Hybrid search (keyword + semantic)
  async hybridSearch(query: string, embedding: number[], options?: HybridSearchOptions): Promise<SearchResult[]>;
}
```

#### 1.3 API Routes

**Location**: `apps/medusa/src/api/store/search/`

```
apps/medusa/src/api/store/search/
├── semantic/
│   └── route.ts      # POST /store/search/semantic
├── image/
│   └── route.ts      # POST /store/search/image
└── hybrid/
    └── route.ts      # POST /store/search/hybrid
```

### 2. Frontend Components

#### 2.1 Enhanced SearchBox Component

**Location**: `apps/storefront/app/components/search/SearchBox.tsx`

```typescript
export interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  debounceLength?: number;
  searchAsYouType?: boolean;
  enableImageSearch?: boolean;  // New: enable image search
  enableSemanticSearch?: boolean; // New: enable semantic search
}
```

#### 2.2 Image Upload Component

**Location**: `apps/storefront/app/components/search/ImageSearchUpload.tsx`

```typescript
export interface ImageSearchUploadProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
  isLoading?: boolean;
  previewUrl?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
}
```

#### 2.3 Search Results Enhancement

**Location**: `apps/storefront/app/components/search/SearchResults.tsx`

```typescript
// Extend result type to display match type
export interface EnhancedSearchResult {
  // ... existing fields
  matchType: 'exact' | 'semantic' | 'visual';
  similarityScore?: number;
}
```

### 3. Data Flow

#### 3.1 Semantic Search Flow

```
1. User enters query text
2. Frontend sends request to /store/search/hybrid
3. Backend calls Bedrock to generate query text embedding vector
4. Backend executes OpenSearch hybrid query:
   - BM25 keyword matching
   - k-NN vector similarity
5. Merge results, sort by combined score
6. Return results to frontend
```

#### 3.2 Image Search Flow

```
1. User uploads image
2. Frontend previews image, sends to /store/search/image
3. Backend calls Rekognition to extract image features
4. Backend executes OpenSearch k-NN query
5. Return visually similar product list
6. Frontend displays results, supports continued filtering
```

#### 3.3 Product Indexing Flow

```
1. Product create/update triggers subscriber
2. Subscriber calls EmbeddingService:
   - Generate product text embedding (title + description)
   - Generate product image embedding (thumbnail)
3. Update OpenSearch index with vector fields
```

## OpenSearch Index Mapping

```json
{
  "mappings": {
    "properties": {
      // ... existing field mappings
      
      "text_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib",
          "parameters": {
            "ef_construction": 128,
            "m": 24
          }
        }
      },
      "image_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib",
          "parameters": {
            "ef_construction": 128,
            "m": 24
          }
        }
      },
      "embedding_updated_at": {
        "type": "date"
      }
    }
  },
  "settings": {
    "index": {
      "knn": true,
      "knn.algo_param.ef_search": 100
    }
  }
}
```

## Hybrid Search Query

```json
{
  "size": 20,
  "query": {
    "hybrid": {
      "queries": [
        {
          "multi_match": {
            "query": "comfortable sofa",
            "fields": ["title^3", "description", "category_names"]
          }
        },
        {
          "knn": {
            "text_embedding": {
              "vector": [0.1, 0.2, ...],
              "k": 20
            }
          }
        }
      ]
    }
  }
}
```

## Correctness Properties

### P1: Search Result Ordering Correctness
**Validates**: 1.1.2, 1.2.2, 2.2.1
```
For any search result list results:
  results[i].score >= results[i+1].score for all i
```

### P2: Response Time Constraint
**Validates**: 1.1.3
```
For any semantic search request:
  responseTime < 2000ms
```

### P3: File Validation Correctness
**Validates**: 2.1.3
```
For any uploaded file:
  If file.type not in ['image/jpeg', 'image/png', 'image/webp']
  or file.size > 5MB
  then return validation error
```

### P4: Embedding Vector Dimension Correctness
**Validates**: 3.1.1, 3.1.2
```
For any generated embedding vector:
  embedding.length === 1024
```

### P5: Retry Mechanism Correctness
**Validates**: 3.2.3
```
For any embedding generation request:
  If failed, retry up to 3 times
  Retry interval grows exponentially (1s, 2s, 4s)
```

### P6: Exact Match Priority
**Validates**: 1.2.2
```
For hybrid search results:
  If result.matchType === 'exact'
  then result.score > any semanticOnlyResult.score
```

## Testing Framework

- **Unit Tests**: Jest + @swc/jest
- **Property Tests**: fast-check
- **Integration Tests**: Jest + real OpenSearch instance

## Environment Variables

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Bedrock Configuration
BEDROCK_MODEL_ID=amazon.titan-embed-text-v2:0

# Rekognition Configuration
REKOGNITION_ENABLED=true

# OpenSearch k-NN Configuration
OPENSEARCH_KNN_ENABLED=true
```

## Cost Estimation (100 Products)

| Service | Purpose | Estimated Cost/Month |
|---------|---------|---------------------|
| Bedrock Titan Embeddings | Text Embedding | ~$1 |
| Rekognition | Image Features | ~$1 |
| OpenSearch | Vector Storage | Existing cost |

**Note**: Main cost comes from real-time embedding generation during user searches. Query caching is recommended.

## Implementation Phases

### Phase 1: Infrastructure
- Create EmbeddingService module
- Update OpenSearch index mapping
- Add k-NN support

### Phase 2: Backend API
- Implement semantic search endpoint
- Implement image search endpoint
- Implement hybrid search endpoint

### Phase 3: Product Indexing
- Update product sync workflow
- Add embedding generation subscriber
- Implement batch index rebuild functionality

### Phase 4: Frontend Integration
- Enhance SearchBox component
- Add image upload component
- Update search results display

### Phase 5: Testing & Optimization
- Write property tests
- Performance optimization
- Query cache implementation
