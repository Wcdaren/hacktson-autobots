# PLP Search & Filter Feature Design

## Technical Design

### Overview
This design document outlines the implementation of the PLP (Product Listing Page) search and filter functionality using OpenSearch as the search engine backend and Elastic Search UI with `@elastic/search-ui-elasticsearch-connector` for the frontend.

## System Architecture

### Development Environment (Direct Connection)
```
┌────────────────────────────────────────────────────────────────────────────┐
│                              STOREFRONT (Remix)                            │
├────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────────────┐  ┌───────────────────┐  │
│  │  SearchProvider │  │ ElasticsearchAPIConnector│  │ Search Components │  │
│  │  (Search UI)    │──│ (Direct to OpenSearch)   │  │ - SearchBox       │  │
│  │                 │  │                          │  │ - Facets          │  │
│  └─────────────────┘  └────────────┬─────────────┘  │ - Results         │  │
│                                    │                │ - Sorting         │  │
│                                    │                │ - Paging          │  │
│                                    │                └───────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────────┘
                                     │ Direct HTTP
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                           OPENSEARCH (Docker :9200)                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Index: products                                                     │   │
│  │  - Full-text search on title, description                           │   │
│  │  - Aggregations for faceted filters                                 │   │
│  │  - Range queries for price filtering                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
                                     ▲
                                     │ Data Sync
┌────────────────────────────────────┴───────────────────────────────────────┐
│                         MEDUSA BACKEND (Sync Only)                         │
├────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  OpenSearch Module (indexing only)                                   │   │
│  │  - indexProducts() / deleteFromIndex()                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Workflows & Subscribers                                             │   │
│  │  - syncProductsWorkflow                                              │   │
│  │  - product.created/updated/deleted subscribers                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Admin API: POST /admin/opensearch/sync (manual reindex)             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
```

### Production Environment (Proxy Connection)
```
┌────────────────────────────────────────────────────────────────────────────┐
│                              STOREFRONT (Remix)                            │
├────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────────────┐  ┌───────────────────┐  │
│  │  SearchProvider │  │ ApiProxyConnector        │  │ Search Components │  │
│  │  (Search UI)    │──│ (via Storefront API)     │  │ - SearchBox       │  │
│  │                 │  │                          │  │ - Facets          │  │
│  └─────────────────┘  └────────────┬─────────────┘  │ - Results         │  │
│                                    │                │ - Sorting         │  │
│                                    │                │ - Paging          │  │
│                                    │                └───────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────────┘
                                     │ /api/search, /api/autocomplete
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                    STOREFRONT API ROUTES (Proxy)                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  POST /api/search        → ElasticsearchAPIConnector.onSearch()      │   │
│  │  POST /api/autocomplete  → ElasticsearchAPIConnector.onAutocomplete()│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────┼───────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                           OPENSEARCH (Secured)                             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Backend Implementation

### 1. OpenSearch Module

#### Module Definition
```typescript
// src/modules/opensearch/index.ts
import { Module } from "@medusajs/framework/utils"
import OpenSearchModuleService from "./service"

export const OPENSEARCH_MODULE = "opensearch"

export default Module(OPENSEARCH_MODULE, {
  service: OpenSearchModuleService,
})
```

#### Service Implementation
```typescript
// src/modules/opensearch/service.ts
import { Client } from "@opensearch-project/opensearch"

type OpenSearchOptions = {
  host: string
  productIndexName: string
}

export default class OpenSearchModuleService {
  private client: Client
  private options: OpenSearchOptions

  constructor({}, options: OpenSearchOptions) {
    this.client = new Client({
      node: options.host,
    })
    this.options = options
  }

  /**
   * Index product data to OpenSearch
   */
  async indexData(data: Record<string, unknown>[], type: string = "product") {
    const indexName = this.getIndexName(type)
    
    // Ensure index exists with proper mapping
    await this.ensureIndex(indexName)
    
    const body = data.flatMap(doc => [
      { index: { _index: indexName, _id: doc.id } },
      doc
    ])
    
    await this.client.bulk({ body, refresh: true })
  }

  /**
   * Delete products from OpenSearch index
   */
  async deleteFromIndex(ids: string[], type: string = "product") {
    if (ids.length === 0) return
    
    const indexName = this.getIndexName(type)
    await this.client.deleteByQuery({
      index: indexName,
      body: {
        query: { terms: { _id: ids } }
      }
    })
  }

  /**
   * Ensure index exists with proper mapping for Search UI compatibility
   */
  private async ensureIndex(indexName: string) {
    const exists = await this.client.indices.exists({ index: indexName })
    
    if (!exists.body) {
      await this.client.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              id: { type: "keyword" },
              title: { 
                type: "text", 
                analyzer: "standard",
                fields: { keyword: { type: "keyword" } }
              },
              description: { type: "text" },
              handle: { type: "keyword" },
              thumbnail: { type: "keyword" },
              category_ids: { type: "keyword" },
              category_names: { type: "keyword" },
              collection_ids: { type: "keyword" },
              collection_names: { type: "keyword" },
              tag_ids: { type: "keyword" },
              tag_values: { type: "keyword" },
              price: { type: "float" },
              created_at: { type: "date" },
              updated_at: { type: "date" },
            }
          }
        }
      })
    }
  }

  private getIndexName(type: string) {
    return type === "product" ? this.options.productIndexName : type
  }
}
```

### 2. Sync Products Workflow

```typescript
// src/workflows/sync-products.ts
import { createWorkflow, transform, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { syncProductsStep } from "./steps/sync-products"
import { deleteProductsFromOpenSearchStep } from "./steps/delete-products-from-opensearch"

type SyncProductsWorkflowInput = {
  filters?: Record<string, unknown>
  limit?: number
  offset?: number
}

export const syncProductsWorkflow = createWorkflow(
  "sync-products",
  ({ filters, limit, offset }: SyncProductsWorkflowInput) => {
    const { data: products, metadata } = useQueryGraphStep({
      entity: "product",
      fields: [
        "id",
        "title",
        "description",
        "handle",
        "thumbnail",
        "categories.id",
        "categories.name",
        "collections.id",
        "collections.title",
        "tags.id",
        "tags.value",
        "variants.calculated_price",
        "status",
        "created_at",
        "updated_at",
      ],
      pagination: { take: limit, skip: offset },
      filters,
    })

    const { publishedProducts, unpublishedProductIds } = transform(
      { products },
      (data) => {
        const publishedProducts: any[] = []
        const unpublishedProductIds: string[] = []

        data.products.forEach((product) => {
          if (product.status === "published") {
            publishedProducts.push({
              id: product.id,
              title: product.title,
              description: product.description,
              handle: product.handle,
              thumbnail: product.thumbnail,
              category_ids: product.categories?.map((c) => c.id) || [],
              category_names: product.categories?.map((c) => c.name) || [],
              collection_ids: product.collections?.map((c) => c.id) || [],
              collection_names: product.collections?.map((c) => c.title) || [],
              tag_ids: product.tags?.map((t) => t.id) || [],
              tag_values: product.tags?.map((t) => t.value) || [],
              price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
              created_at: product.created_at,
              updated_at: product.updated_at,
            })
          } else {
            unpublishedProductIds.push(product.id)
          }
        })

        return { publishedProducts, unpublishedProductIds }
      }
    )

    syncProductsStep({ products: publishedProducts })
    deleteProductsFromOpenSearchStep({ ids: unpublishedProductIds })

    return new WorkflowResponse({ products, metadata })
  }
)
```

### 3. Event Subscribers

```typescript
// src/subscribers/product-sync.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { syncProductsWorkflow } from "../workflows/sync-products"

export default async function handleProductEvents({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await syncProductsWorkflow(container).run({
    input: {
      filters: { id: data.id },
    },
  })
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated"],
}
```

```typescript
// src/subscribers/product-delete.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { OPENSEARCH_MODULE } from "../modules/opensearch"

export default async function handleProductDelete({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const opensearchService = container.resolve(OPENSEARCH_MODULE)
  await opensearchService.deleteFromIndex([data.id])
}

export const config: SubscriberConfig = {
  event: "product.deleted",
}
```

### 4. Docker Configuration

```yaml
# apps/medusa/docker-compose.yaml (additions)
services:
  opensearch:
    image: opensearchproject/opensearch:2.11.0
    container_name: opensearch
    environment:
      - discovery.type=single-node
      - DISABLE_SECURITY_PLUGIN=true
      - OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
      - "9600:9600"
    volumes:
      - opensearch-data:/usr/share/opensearch/data
    networks:
      - medusa-network
    healthcheck:
      test: ["CMD-SHELL", "curl -s http://localhost:9200 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  opensearch-data:
```

## Frontend Implementation

### 1. Search Connector Configuration

The frontend uses Elastic Search UI's official `@elastic/search-ui-elasticsearch-connector` to connect directly to OpenSearch. This approach differs between development and production environments for security reasons.

#### Development Environment (Direct Connection)

In development, the frontend connects directly to OpenSearch using `ElasticsearchAPIConnector`:

```typescript
// apps/storefront/libs/util/search/connector.ts
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"

// Development: Direct connection to OpenSearch
export const createSearchConnector = () => {
  const isDev = process.env.NODE_ENV === "development"
  
  if (isDev) {
    return new ElasticsearchAPIConnector({
      host: process.env.OPENSEARCH_HOST || "http://localhost:9200",
      index: process.env.OPENSEARCH_PRODUCT_INDEX || "products",
      connectionOptions: {
        // OpenSearch compatibility headers
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  }
  
  // Production: Use API proxy (see below)
  return createApiProxyConnector()
}
```

#### Production Environment (API Proxy)

In production, exposing OpenSearch directly to the browser is a security risk. Instead, we use `ApiProxyConnector` which routes requests through storefront API routes:

```typescript
// apps/storefront/libs/util/search/connector.ts
import { ApiProxyConnector } from "@elastic/search-ui-elasticsearch-connector"

const createApiProxyConnector = () => {
  return new ApiProxyConnector({
    basePath: "/api/search",
  })
}
```

### 2. Storefront API Proxy Routes (Production)

These routes proxy search requests to OpenSearch securely from the server side:

```typescript
// apps/storefront/app/routes/api.search.tsx
import { ActionFunctionArgs, json } from "@remix-run/node"
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"

const connector = new ElasticsearchAPIConnector({
  host: process.env.OPENSEARCH_HOST!,
  index: process.env.OPENSEARCH_PRODUCT_INDEX || "products",
})

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json()
  
  // The connector expects the Search UI request format
  const response = await connector.onSearch(body.state, body.queryConfig)
  
  return json(response)
}
```

```typescript
// apps/storefront/app/routes/api.autocomplete.tsx
import { ActionFunctionArgs, json } from "@remix-run/node"
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"

const connector = new ElasticsearchAPIConnector({
  host: process.env.OPENSEARCH_HOST!,
  index: process.env.OPENSEARCH_PRODUCT_INDEX || "products",
})

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json()
  
  const response = await connector.onAutocomplete(body.state, body.queryConfig)
  
  return json(response)
}
```

### 3. Search Provider Setup

```typescript
// apps/storefront/app/providers/search-provider.tsx
import { SearchProvider as ElasticSearchProvider } from "@elastic/react-search-ui"
import { createSearchConnector } from "@libs/util/search/connector"

const connector = createSearchConnector()

const searchConfig = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      title: { weight: 3 },
      description: { weight: 1 },
    },
    result_fields: {
      id: { raw: {} },
      title: { raw: {} },
      description: { raw: {}, snippet: { size: 200 } },
      handle: { raw: {} },
      thumbnail: { raw: {} },
      price: { raw: {} },
      category_ids: { raw: {} },
      category_names: { raw: {} },
      collection_ids: { raw: {} },
      collection_names: { raw: {} },
    },
    facets: {
      category_names: { type: "value", size: 50 },
      collection_names: { type: "value", size: 50 },
      price: {
        type: "range",
        ranges: [
          { from: 0, to: 25, name: "Under $25" },
          { from: 25, to: 50, name: "$25 - $50" },
          { from: 50, to: 100, name: "$50 - $100" },
          { from: 100, name: "Over $100" },
        ],
      },
    },
    disjunctiveFacets: ["category_names", "collection_names"],
  },
  initialState: {
    resultsPerPage: 12,
  },
  trackUrlState: true,
  urlPushDebounceLength: 500,
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  return (
    <ElasticSearchProvider config={searchConfig}>
      {children}
    </ElasticSearchProvider>
  )
}
```

### 4. Search Components

```typescript
// apps/storefront/app/components/search/SearchFilters.tsx
import { Facet, Sorting } from "@elastic/react-search-ui"
import "@elastic/react-search-ui-views/lib/styles/styles.css"

const SORT_OPTIONS = [
  { name: "Relevance", value: "", direction: "" },
  { name: "Newest", value: "created_at", direction: "desc" },
  { name: "Price: Low to High", value: "price", direction: "asc" },
  { name: "Price: High to Low", value: "price", direction: "desc" },
  { name: "Name: A-Z", value: "title.keyword", direction: "asc" },
  { name: "Name: Z-A", value: "title.keyword", direction: "desc" },
]

export function SearchFilters() {
  return (
    <div className="space-y-6">
      <Sorting
        label="Sort by"
        sortOptions={SORT_OPTIONS}
      />
      
      <Facet
        field="category_names"
        label="Categories"
        filterType="any"
        isFilterable={true}
        show={10}
      />
      
      <Facet
        field="collection_names"
        label="Collections"
        filterType="any"
        show={10}
      />
      
      <Facet
        field="price"
        label="Price Range"
        filterType="any"
      />
    </div>
  )
}
```

```typescript
// apps/storefront/app/components/search/SearchResults.tsx
import { Results, PagingInfo, Paging, ResultsPerPage } from "@elastic/react-search-ui"
import { ProductListItem } from "@app/components/product/ProductListItem"

export function SearchResults() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <PagingInfo />
        <ResultsPerPage options={[12, 24, 48]} />
      </div>
      
      <Results
        resultView={({ result }) => (
          <ProductListItem
            product={{
              id: result.id?.raw,
              title: result.title?.raw,
              handle: result.handle?.raw,
              thumbnail: result.thumbnail?.raw,
              variants: [{
                calculated_price: {
                  calculated_amount: result.price?.raw,
                },
              }],
            }}
          />
        )}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      />
      
      <Paging />
    </div>
  )
}
```

```typescript
// apps/storefront/app/components/search/SearchBox.tsx
import { SearchBox as ElasticSearchBox } from "@elastic/react-search-ui"

export function SearchBox() {
  return (
    <ElasticSearchBox
      searchAsYouType={true}
      debounceLength={300}
      inputProps={{
        placeholder: "Search products...",
        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
      }}
    />
  )
}
```

```typescript
// apps/storefront/app/components/search/ActiveFilters.tsx
import { withSearch } from "@elastic/react-search-ui"

interface ActiveFiltersProps {
  filters: any[]
  clearFilters: (except?: string[]) => void
  removeFilter: (name: string, value: any) => void
}

function ActiveFiltersComponent({ filters, clearFilters, removeFilter }: ActiveFiltersProps) {
  if (!filters || filters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) =>
        filter.values.map((value: any) => (
          <button
            key={`${filter.field}-${typeof value === "object" ? value.name : value}`}
            onClick={() => removeFilter(filter.field, value)}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <span>{filter.field}: {typeof value === "object" ? value.name : value}</span>
            <span className="text-gray-500">×</span>
          </button>
        ))
      )}
      <button
        onClick={() => clearFilters()}
        className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
      >
        Clear all
      </button>
    </div>
  )
}

export const ActiveFilters = withSearch(
  ({ filters, clearFilters, removeFilter }) => ({
    filters,
    clearFilters,
    removeFilter,
  })
)(ActiveFiltersComponent)
```

## Correctness Properties

Based on the acceptance criteria analysis, the following properties must hold:

### Property 1: Search Result Relevance
For any product indexed with title or description containing keyword K, searching for K should return that product in results.

```typescript
// Property: search_returns_matching_products
// Validates: Requirements 1.2
describe("Search Result Relevance", () => {
  it("should return products matching search keyword in title or description", async () => {
    // Given: A product with title "Premium Coffee Beans"
    // When: Searching for "coffee"
    // Then: The product should appear in results
  })
})
```

### Property 2: Category Filter Accuracy
For any category filter applied, all returned products must belong to the selected category.

```typescript
// Property: category_filter_accuracy
// Validates: Requirements 2.1, 2.4
describe("Category Filter Accuracy", () => {
  it("should only return products in selected categories", async () => {
    // Given: Products in categories A, B, C
    // When: Filtering by category A
    // Then: All results should have category_id = A
  })
})
```

### Property 3: Price Range Filter Correctness
For any price range filter [min, max], all returned products must have price within that range.

```typescript
// Property: price_range_filter_correctness
// Validates: Requirements 4.1, 4.2
describe("Price Range Filter", () => {
  it("should only return products within price range", async () => {
    // Given: Products with various prices
    // When: Filtering by price_min=10, price_max=50
    // Then: All results should have 10 <= price <= 50
  })
})
```

### Property 4: Sort Order Consistency
For any sort option, the results must be ordered according to the specified field and direction.

```typescript
// Property: sort_order_consistency
// Validates: Requirements 5.1, 5.2, 5.3
describe("Sort Order Consistency", () => {
  it("should maintain correct order when sorting by price ascending", async () => {
    // Given: Products with prices [30, 10, 50, 20]
    // When: Sorting by price ascending
    // Then: Results should be ordered [10, 20, 30, 50]
  })
})
```

### Property 5: Aggregation Count Accuracy
The count displayed for each facet value must match the actual number of products with that value.

```typescript
// Property: aggregation_count_accuracy
// Validates: Requirements 2.4, 8.3
describe("Aggregation Count Accuracy", () => {
  it("should display accurate counts for each category", async () => {
    // Given: 5 products in category A, 3 in category B
    // When: Fetching aggregations
    // Then: Category A count = 5, Category B count = 3
  })
})
```

### Property 6: URL State Synchronization
All applied filters must be reflected in URL parameters and vice versa.

```typescript
// Property: url_state_sync
// Validates: Requirements 6.1, 6.2
describe("URL State Synchronization", () => {
  it("should sync filter state with URL parameters", async () => {
    // Given: URL with ?category=abc&price_min=10
    // When: Page loads
    // Then: Filters should be applied accordingly
  })
})
```

## Testing Strategy

### Unit Tests
- OpenSearch module service methods
- Query builder functions
- Response transformers
- Custom connector methods

### Integration Tests
- Search API endpoint with various filter combinations
- Product sync workflow execution
- Event subscriber triggers

### Property-Based Tests
- Search result relevance
- Filter accuracy
- Sort order consistency
- Aggregation counts

### E2E Tests
- Full search flow from UI to results
- Filter application and URL updates
- Mobile responsive behavior

## File Structure

```
apps/medusa/src/
├── modules/
│   └── opensearch/
│       ├── index.ts              # Module definition
│       ├── service.ts            # OpenSearch indexing service
│       └── types.ts              # Type definitions
├── workflows/
│   ├── sync-products.ts          # Main sync workflow
│   └── steps/
│       ├── sync-products.ts      # Index products step
│       └── delete-products-from-opensearch.ts
├── subscribers/
│   ├── opensearch-sync.ts        # Manual sync event handler
│   ├── product-sync.ts           # product.created/updated handler
│   └── product-delete.ts         # product.deleted handler
└── api/
    └── admin/
        └── opensearch/
            └── sync/
                └── route.ts      # POST /admin/opensearch/sync

apps/storefront/
├── app/
│   ├── components/
│   │   └── search/
│   │       ├── SearchBox.tsx
│   │       ├── SearchFilters.tsx
│   │       ├── SearchResults.tsx
│   │       ├── ActiveFilters.tsx
│   │       └── MobileFilterDrawer.tsx
│   ├── providers/
│   │   └── search-provider.tsx
│   └── routes/
│       ├── products._index.tsx   # Updated with search
│       ├── api.search.tsx        # Search proxy (production)
│       └── api.autocomplete.tsx  # Autocomplete proxy (production)
└── libs/
    └── util/
        └── search/
            └── connector.ts      # Connector factory (dev/prod)
```

## Environment Variables

### Medusa Backend (.env)
```bash
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products
```

### Storefront (.env)
```bash
# Development: Direct OpenSearch connection
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products

# Production: These are used server-side only (in API routes)
# The frontend uses ApiProxyConnector which calls /api/search
```

## NPM Dependencies

### Backend (apps/medusa)
```json
{
  "@opensearch-project/opensearch": "^2.x"
}
```

### Frontend (apps/storefront)
```json
{
  "@elastic/search-ui": "^1.x",
  "@elastic/react-search-ui": "^1.x",
  "@elastic/search-ui-elasticsearch-connector": "^1.x",
  "@elastic/react-search-ui-views": "^1.x"
}
```
