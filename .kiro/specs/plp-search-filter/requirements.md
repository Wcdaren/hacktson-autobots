# PLP Search & Filter Feature Requirements

## Overview
Implement Product Listing Page (PLP) search and filter functionality for the e-commerce storefront, using **OpenSearch** as the search engine backend to provide high-performance full-text search, faceted filtering, and price range filtering capabilities.

## Architecture Overview

The frontend uses Elastic Search UI with `@elastic/search-ui-elasticsearch-connector` to connect directly to OpenSearch. The Medusa backend only handles data synchronization (indexing products to OpenSearch).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT ENVIRONMENT                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────┐                      ┌─────────────────┐              │
│   │   Storefront    │─────────────────────▶│   OpenSearch    │              │
│   │   (Remix)       │  Direct Connection   │   (Docker)      │              │
│   │                 │  via Elasticsearch   │                 │              │
│   │   Search UI +   │  APIConnector        │   :9200         │              │
│   │   Connector     │                      │                 │              │
│   └─────────────────┘                      └─────────────────┘              │
│                                                    ▲                         │
│                                                    │ Data Sync               │
│                                            ┌───────┴───────┐                 │
│                                            │  Medusa API   │                 │
│                                            │  (Indexing)   │                 │
│                                            └───────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ENVIRONMENT                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐     │
│   │   Storefront    │─────▶│  Storefront API │─────▶│   OpenSearch    │     │
│   │   (Browser)     │      │  Proxy Routes   │      │   (Secured)     │     │
│   │                 │      │  /api/search    │      │                 │     │
│   │   Search UI +   │      │  /api/auto...   │      │                 │     │
│   │   ApiProxy      │      │                 │      │                 │     │
│   │   Connector     │      └─────────────────┘      └─────────────────┘     │
│   └─────────────────┘                                      ▲                 │
│                                                            │ Data Sync       │
│                                                    ┌───────┴───────┐         │
│                                                    │  Medusa API   │         │
│                                                    │  (Indexing)   │         │
│                                                    └───────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
```

## User Stories

### 1. Product Search
**As a** customer  
**I want to** search products by keyword  
**So that** I can quickly find products I'm looking for

#### Acceptance Criteria
- 1.1 User can enter keywords in the search box
- 1.2 Search results should match product title and description
- 1.3 Search term should be reflected in URL (e.g., `?q=coffee`)
- 1.4 Support clearing search term
- 1.5 Search should support debouncing to avoid frequent requests

### 2. Category Filter
**As a** customer  
**I want to** filter products by category  
**So that** I can browse products within a specific category

#### Acceptance Criteria
- 2.1 Display available product categories list
- 2.2 Support selecting single or multiple categories
- 2.3 Category filter should be reflected in URL (e.g., `?category=coffee-beans`)
- 2.4 Display product count for each category (optional)

### 3. Collection Filter
**As a** customer  
**I want to** filter products by collection  
**So that** I can view products from specific collections

#### Acceptance Criteria
- 3.1 Display available product collections list
- 3.2 Support selecting single or multiple collections
- 3.3 Collection filter should be reflected in URL (e.g., `?collection=summer-sale`)

### 4. Price Range Filter
**As a** customer  
**I want to** filter products by price range  
**So that** I can find products within my budget

#### Acceptance Criteria
- 4.1 Provide price range inputs (minimum and maximum price)
- 4.2 Price filter should be reflected in URL (e.g., `?price_min=10&price_max=50`)
- 4.3 Display current currency symbol
- 4.4 Support clearing price filter

### 5. Product Sorting
**As a** customer  
**I want to** sort products by different criteria  
**So that** I can view products in my preferred order

#### Acceptance Criteria
- 5.1 Support sorting by price (low to high, high to low)
- 5.2 Support sorting by name (A-Z, Z-A)
- 5.3 Support sorting by newest arrivals
- 5.4 Sort option should be reflected in URL (e.g., `?sort=price_asc`)
- 5.5 Default sort is newest arrivals

### 6. URL State Management
**As a** customer  
**I want to** share filtered product lists via URL  
**So that** I can share specific product views with others

#### Acceptance Criteria
- 6.1 All filter conditions should be reflected in URL query parameters
- 6.2 Filter state should persist after page refresh
- 6.3 Support browser forward/back navigation
- 6.4 URL should be human-readable

### 7. Filter UI/UX
**As a** customer  
**I want to** have a clear and intuitive filter interface  
**So that** I can easily apply and manage filters

#### Acceptance Criteria
- 7.1 Display sidebar filter panel on desktop
- 7.2 Display expandable filter drawer on mobile
- 7.3 Show currently applied filter conditions
- 7.4 Provide "Clear all filters" functionality
- 7.5 Show loading state when filters change

### 8. Active Filters Display
**As a** customer  
**I want to** see which filters are currently active  
**So that** I can easily manage and remove individual filters

#### Acceptance Criteria
- 8.1 Display active filter tags above product list
- 8.2 Each tag can be clicked to remove individually
- 8.3 Display total product count after filtering

## Technical Notes

### OpenSearch Integration

#### 1. OpenSearch Module (Medusa Backend - Indexing Only)
Create a custom Medusa module to sync product data to OpenSearch. This module handles indexing only - search queries go directly from the frontend to OpenSearch.

**Module Structure:**
```
apps/medusa/src/modules/opensearch/
├── index.ts           # Module definition
├── service.ts         # OpenSearch service (indexing, delete)
└── types.ts           # Type definitions
```

**Core Functions:**
- `indexData()` - Index product data to OpenSearch
- `deleteFromIndex()` - Delete products from index
- `ensureIndex()` - Create index with proper mapping

#### 2. Product Index Schema
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text" },
      "handle": { "type": "keyword" },
      "category_ids": { "type": "keyword" },
      "category_names": { "type": "keyword" },
      "collection_ids": { "type": "keyword" },
      "collection_names": { "type": "keyword" },
      "tag_ids": { "type": "keyword" },
      "tag_values": { "type": "keyword" },
      "price": { "type": "float" },
      "currency_code": { "type": "keyword" },
      "thumbnail": { "type": "keyword" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

#### 3. Data Sync (Subscribers)
Create event subscribers to sync index when products change:
- `product.created` - Add to index
- `product.updated` - Update index
- `product.deleted` - Delete from index

#### 4. Docker Setup
Add OpenSearch service to `apps/medusa/docker-compose.yaml`:

```yaml
opensearch:
  image: opensearchproject/opensearch:2.11.0
  environment:
    - discovery.type=single-node
    - DISABLE_SECURITY_PLUGIN=true
    - OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m
  ports:
    - "9200:9200"
  volumes:
    - opensearch-data:/usr/share/opensearch/data
```

### URL Parameter Schema
```
/products?q=keyword&category=id1,id2&collection=id1&price_min=10&price_max=100&sort=price&order=asc&page=1
```

### NPM Dependencies
**Backend (Medusa):**
- `@opensearch-project/opensearch` - OpenSearch JavaScript client

**Frontend (Storefront):**
- `@elastic/search-ui` - Search UI core library
- `@elastic/react-search-ui` - Search UI React component library
- `@elastic/search-ui-elasticsearch-connector` - Official connector for Elasticsearch/OpenSearch
- `@elastic/react-search-ui-views` - Pre-built Search UI view components

### Frontend Architecture (Search UI)

Use Elastic Search UI library with the official `@elastic/search-ui-elasticsearch-connector` to connect directly to OpenSearch.

**Development vs Production:**
- **Development**: Use `ElasticsearchAPIConnector` for direct OpenSearch connection
- **Production**: Use `ApiProxyConnector` with storefront API routes for security

**Connector Configuration:**
```typescript
// libs/util/search/connector.ts
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"
import { ApiProxyConnector } from "@elastic/search-ui-elasticsearch-connector"

export const createSearchConnector = () => {
  if (process.env.NODE_ENV === "development") {
    return new ElasticsearchAPIConnector({
      host: process.env.OPENSEARCH_HOST || "http://localhost:9200",
      index: "products",
    })
  }
  
  return new ApiProxyConnector({
    basePath: "/api/search",
  })
}
```

**Storefront API Proxy Routes (Production):**
```typescript
// app/routes/api.search.tsx
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"

const connector = new ElasticsearchAPIConnector({
  host: process.env.OPENSEARCH_HOST!,
  index: "products",
})

export async function action({ request }) {
  const body = await request.json()
  const response = await connector.onSearch(body.state, body.queryConfig)
  return json(response)
}
```

**Search UI Components:**
- `SearchProvider` - Search state management
- `SearchBox` - Search input box
- `Facet` - Faceted filter component
- `Results` - Search results display
- `Paging` - Pagination component
- `Sorting` - Sort selector

### Backend Architecture (Medusa - Indexing Only)

Follow Medusa official MeiliSearch/Algolia integration patterns to implement OpenSearch module for data synchronization only.

**1. OpenSearch Module (`src/modules/opensearch/`)**
```
├── index.ts           # Module definition (Module())
├── service.ts         # OpenSearch service (indexing only)
└── types.ts           # Type definitions
```

**2. Sync Products Workflow (`src/workflows/`)**
```
├── sync-products.ts                    # Main workflow
└── steps/
    ├── sync-products.ts                # Index products step
    └── delete-products-from-opensearch.ts  # Delete products step
```

**3. Subscribers (`src/subscribers/`)**
```
├── opensearch-sync.ts    # Listen to opensearch.sync event (manual sync)
└── product-sync.ts       # Listen to product.created/updated/deleted
```

**4. API Routes (`src/api/`)**
```
└── admin/opensearch/sync/route.ts  # POST /admin/opensearch/sync (trigger full reindex)
```

## Out of Scope
- Search suggestions/autocomplete (can be added in future iteration)
- Search history
- Save filter preferences
- OpenSearch Dashboards visualization
- Multi-language search support

## Environment Variables

### Medusa Backend
```bash
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products
```

### Storefront
```bash
# Development: Direct OpenSearch connection
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products

# Production: These are used server-side only in API proxy routes
# The browser uses ApiProxyConnector which calls /api/search
```

## Dependencies

### Backend
- `@opensearch-project/opensearch` ^2.x

### Frontend
- `@elastic/search-ui` ^1.x
- `@elastic/react-search-ui` ^1.x
- `@elastic/search-ui-elasticsearch-connector` ^1.x
- `@elastic/react-search-ui-views` ^1.x

### Infrastructure
- Docker & Docker Compose
- OpenSearch 2.11.0+

## References

### Medusa Search Integration Patterns
- [MeiliSearch Integration Guide](https://docs.medusajs.com/resources/integrations/guides/meilisearch)
- [Algolia Integration Guide](https://docs.medusajs.com/resources/integrations/guides/algolia)

### Elastic Search UI
- [Elasticsearch Connector](https://www.elastic.co/guide/en/search-ui/current/api-connectors-elasticsearch.html)
- [Production Usage with ApiProxyConnector](https://elastic.co/docs/reference/search-ui/tutorials-elasticsearch-production-usage)
- [Building a Custom Connector](https://www.elastic.co/docs/current/search-ui/guides/building-a-custom-connector)
- [React Components API](https://www.elastic.co/docs/reference/search-ui)

### OpenSearch
- [JavaScript Client](https://docs.opensearch.org/docs/latest/clients/javascript/index/)
- [Docker Quickstart](https://opensearch.org/docs/2.1/quickstart/)
