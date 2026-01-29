# Semantic Search and Image Search Technical Design

## Design Principles

1. **Transparent to Users** - Users don't need to know about "semantic" vs "keyword" search; hybrid search is the default and only mode
2. **Region-Aware Pricing** - Search results display correct prices based on user's selected region
3. **Simple UX Flow** - Header search → Search results page with filters
4. **No Match Type Display** - Users don't see "exact match" vs "semantic match" labels

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Storefront (Remix)                        │
├─────────────────────────────────────────────────────────────────┤
│  Header SearchBox   │  Search Page        │  SearchResults       │
│  (Quick Search)     │  (Full Search+Image)│  (Region Prices)     │
└─────────────────────┴─────────────────────┴─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Medusa Backend API                          │
├─────────────────────────────────────────────────────────────────┤
│  /store/search/hybrid         │  /store/search/image            │
│  (Default Search - Always)    │  (Image Search Endpoint)        │
└───────────────────────────────┴─────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  AWS Bedrock    │ │  AWS Rekognition│ │   OpenSearch    │
│  (Text Embed)   │ │  (Image Feature)│ │   (k-NN Index)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Region-Aware Pricing Design

### Problem
- Products have different prices in different regions (US, EU, UK, etc.)
- Search results need to display the correct price for the user's current region
- Price range filters need to work correctly per region

### Solution: Per-Region Price Fields

Instead of storing prices in a nested object, we create separate fields for each region:

```typescript
// OpenSearch ProductDocument
{
  id: "prod_123",
  title: "Modern Sofa",
  // ... other fields
  
  // Per-region prices (min_price only, in cents)
  price_reg_us: 150000,      // $1,500 USD
  price_reg_eu: 135000,      // €1,350 EUR  
  price_reg_uk: 120000,      // £1,200 GBP
  
  // Per-region currency codes
  currency_reg_us: "usd",
  currency_reg_eu: "eur",
  currency_reg_uk: "gbp",
  
  // Default price (fallback)
  default_price: 150000,
  default_currency: "usd",
}
```

### Why min_price Only (No max_price)

- **Simpler index structure** - Less data to maintain
- **Better UX** - Display "From $1,500" in search results
- **Intuitive filtering** - When user selects "$1,000-$2,000", they expect products starting at that price range
- **Detailed pricing on product page** - Users see all variant prices when they click through

### Search Query with Region

```typescript
// Frontend passes regionId to search API
const response = await fetch('/store/search/hybrid', {
  method: 'POST',
  body: JSON.stringify({
    query: "comfortable sofa",
    regionId: "reg_us",  // Current user's region
    size: 20,
  })
});

// Backend dynamically selects price field
const priceField = `price_reg_${regionId}`;
const currencyField = `currency_reg_${regionId}`;
```

### Price Range Facet per Region

```typescript
// Dynamic aggregation based on region
const aggregations = {
  price_ranges: {
    range: {
      field: `price_reg_${regionId}`,
      ranges: [
        { key: "Under $500", to: 50000 },
        { key: "$500 - $1,000", from: 50000, to: 100000 },
        { key: "$1,000 - $2,000", from: 100000, to: 200000 },
        { key: "Over $2,000", from: 200000 },
      ]
    }
  }
};
```

## UI/UX Design

### Search Flow

1. **Header Search Box**
   - Compact search input in header
   - On submit: Navigate to `/search?q={query}`
   - On mobile: Icon only, taps to search page

2. **Search Results Page** (`/search`)
   - Full search box with image search button (camera icon)
   - Filters sidebar (desktop) / drawer (mobile)
   - Results grid with pagination
   - Price displayed as "From $XXX" per region

3. **Category/Collection Listing Pages (CLP)**
   - `/categories/:handle` and `/collections/:handle` use the same search infrastructure
   - Pre-filter by category_id or collection_id
   - Same facet filters as search page (excluding the pre-filtered dimension)
   - Hierarchical category navigation for nested categories

4. **Image Search**
   - Camera icon in search box triggers file upload
   - Drag-and-drop support
   - Preview with loading state
   - Results show "Visual Match" indicator

### Category/Collection Page Integration

Category and Collection pages should leverage the search infrastructure instead of direct Medusa API calls:

```
/categories/living-room
  → OpenSearch browse with filter: { category_ids: ["cat_living_room"] }
  → Show child categories as navigation chips
  → Show facets: collections, tags, price, materials (exclude category facet)

/collections/summer-sale  
  → OpenSearch browse with filter: { collection_ids: ["col_summer"] }
  → Show facets: categories, tags, price, materials (exclude collection facet)
```

### Hierarchical Category Facet

Categories in Medusa are nested (parent_category_id). The facet should reflect this:

```typescript
// Index structure for hierarchical categories
{
  category_ids: ["cat_furniture", "cat_living_room", "cat_sofas"],  // All ancestor IDs
  category_names: ["Furniture", "Living Room", "Sofas"],            // All ancestor names
  category_path: "Furniture > Living Room > Sofas",                 // Full path string
  category_level: 2,                                                // Depth level (0-indexed)
  category_parent_id: "cat_living_room",                            // Direct parent
}

// Facet display as tree
Furniture (50)
  └─ Living Room (30)
       └─ Sofas (15)
       └─ Chairs (10)
  └─ Bedroom (20)
```

### Search Results Display

```tsx
// No match type badges - transparent to users
<ProductCard>
  <img src={product.thumbnail} />
  <h3>{product.title}</h3>
  <p className="text-gray-600">From {formatPrice(product.price, product.currency)}</p>
</ProductCard>
```

## Component Design

### 1. Backend Components

#### 1.1 Embedding Service Module

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
  async generateTextEmbedding(text: string): Promise<TextEmbeddingResult>;
  async generateImageEmbedding(imageBuffer: Buffer): Promise<ImageEmbeddingResult>;
  async batchGenerateTextEmbeddings(texts: string[]): Promise<TextEmbeddingResult[]>;
}
```

#### 1.2 OpenSearch Module Extension

**Update**: `apps/medusa/src/modules/opensearch/`

```typescript
// Updated ProductDocument type with region prices
export interface ProductDocument {
  id: string;
  title: string;
  description?: string;
  handle: string;
  thumbnail?: string;
  
  // Category/Collection facets
  category_ids: string[];
  category_names: string[];
  collection_ids: string[];
  collection_names: string[];
  
  // Per-region prices (dynamically named fields)
  // price_reg_{regionId}: number
  // currency_reg_{regionId}: string
  [key: `price_reg_${string}`]: number;
  [key: `currency_reg_${string}`]: string;
  
  // Default/fallback price
  default_price: number;
  default_currency: string;
  
  // Vector embeddings
  text_embedding?: number[];      // 1024 dimensions
  image_embedding?: number[];     // 1024 dimensions
  embedding_updated_at?: string;
  
  created_at: string;
  updated_at: string;
}

// Search options now include regionId
export interface HybridSearchOptions {
  size?: number;
  filters?: Record<string, unknown>;
  regionId: string;  // Required for price field selection
  keywordWeight?: number;
  semanticWeight?: number;
}
```

#### 1.3 API Routes

**Location**: `apps/medusa/src/api/store/search/`

```
apps/medusa/src/api/store/search/
├── hybrid/
│   └── route.ts      # POST /store/search/hybrid (default search)
├── image/
│   └── route.ts      # POST /store/search/image
└── browse/
    └── route.ts      # POST /store/search/browse (no query)
```

### 2. Frontend Components

#### 2.1 Search Provider (Simplified)

**Location**: `apps/storefront/app/providers/search-provider.tsx`

```typescript
// Remove SearchMode - always use hybrid
interface SearchProviderProps {
  regionId: string;  // From root loader
  backendUrl: string;
  publishableApiKey?: string;
}

// No mode switching, hybrid is always used
export const SearchProvider: FC<PropsWithChildren<SearchProviderProps>> = ({
  children,
  regionId,
  backendUrl,
  publishableApiKey,
}) => {
  // Always create hybrid connector with regionId
  const connector = createHybridSearchConnector({
    backendUrl,
    publishableApiKey,
    regionId,
  });
  
  // ...
};
```

#### 2.2 Hybrid Search Connector

**Location**: `apps/storefront/libs/util/search/hybridSearchConnector.ts`

```typescript
export interface HybridSearchConnectorConfig {
  backendUrl: string;
  publishableApiKey?: string;
  regionId: string;  // For price field selection
}

export function createHybridSearchConnector(config: HybridSearchConnectorConfig): APIConnector {
  return {
    async onSearch(state, queryConfig) {
      const response = await fetch(`${config.backendUrl}/store/search/hybrid`, {
        method: 'POST',
        body: JSON.stringify({
          query: state.searchTerm,
          regionId: config.regionId,
          size: queryConfig.resultsPerPage,
          filters: buildFilters(state.filters),
        }),
      });
      
      // Transform results with region-specific prices
      // ...
    },
  };
}
```

#### 2.3 Search Results (Simplified)

**Location**: `apps/storefront/app/components/search/SearchResults.tsx`

```typescript
// Remove MatchTypeBadge - no match type display
const ResultView: FC<{ result: SearchResult }> = ({ result }) => {
  const { product } = transformResultToProduct(result);
  
  return (
    <Link to={`/products/${product.handle}`}>
      {/* No match type badge */}
      <ProductListItem product={product} />
    </Link>
  );
};
```

## OpenSearch Index Mapping

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text" },
      "handle": { "type": "keyword" },
      "thumbnail": { "type": "keyword" },
      
      "category_ids": { "type": "keyword" },
      "category_names": { "type": "keyword" },
      "category_path": { "type": "keyword" },
      "category_level": { "type": "integer" },
      "category_parent_id": { "type": "keyword" },
      "collection_ids": { "type": "keyword" },
      "collection_names": { "type": "keyword" },
      
      "price_reg_us": { "type": "float" },
      "price_reg_eu": { "type": "float" },
      "price_reg_uk": { "type": "float" },
      "currency_reg_us": { "type": "keyword" },
      "currency_reg_eu": { "type": "keyword" },
      "currency_reg_uk": { "type": "keyword" },
      "default_price": { "type": "float" },
      "default_currency": { "type": "keyword" },
      
      "text_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "faiss",
          "parameters": { "ef_construction": 128, "m": 24 }
        }
      },
      "image_embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "faiss",
          "parameters": { "ef_construction": 128, "m": 24 }
        }
      },
      "embedding_updated_at": { "type": "date" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
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

## Data Flow

### 1. Product Indexing Flow

```
1. Product create/update triggers subscriber
2. Subscriber fetches product with all region prices
3. For each region, extract min_price from variants
4. Generate text embedding (title + description)
5. Generate image embedding (thumbnail)
6. Index to OpenSearch with per-region price fields
```

### 2. Search Flow

```
1. User enters query in header search box
2. Navigate to /search?q={query}
3. SearchProvider initializes with current regionId
4. Connector calls /store/search/hybrid with regionId
5. Backend:
   a. Generate query embedding via Bedrock
   b. Execute hybrid search (keyword + k-NN)
   c. Select price field based on regionId
   d. Return results with correct prices
6. Display results with "From $XXX" pricing
```

### 3. Image Search Flow

```
1. User clicks camera icon in search box
2. Select/drop image file
3. Validate file (type, size)
4. Upload to /store/search/image
5. Backend:
   a. Generate image embedding via Rekognition
   b. Execute k-NN search on image_embedding
   c. Return visually similar products
6. Display results in search page
```

## Correctness Properties

### P1: Search Result Ordering
```
For any search result list:
  results[i].score >= results[i+1].score for all i
```

### P2: Response Time
```
For any search request:
  responseTime < 2000ms
```

### P3: File Validation
```
For any uploaded file:
  If file.type not in ['image/jpeg', 'image/png', 'image/webp']
  or file.size > 5MB
  then return validation error
```

### P4: Embedding Dimension
```
For any generated embedding:
  embedding.length === 1024
```

### P5: Retry Mechanism
```
For embedding generation:
  If failed, retry up to 3 times
  Retry interval: 1s, 2s, 4s (exponential)
```

### P6: Region Price Consistency
```
For any search result with regionId:
  result.price === document[`price_reg_${regionId}`]
  OR result.price === document.default_price (if region price missing)
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

## Implementation Phases

### Phase 1: Infrastructure
- Update OpenSearch index mapping with per-region price fields
- Update product sync to index region prices
- Create EmbeddingService module

### Phase 2: Backend API
- Update hybrid search endpoint to accept regionId
- Update browse endpoint for region prices
- Implement image search endpoint

### Phase 3: Frontend Integration
- Simplify SearchProvider (remove mode switching)
- Update connector to pass regionId
- Remove match type badges from results
- Update price display to "From $XXX"

### Phase 4: Testing
- Property-based tests for search ordering
- Integration tests for region price filtering
- File validation tests
