# PLP Search Feature Architecture Design

## 1. Business Context & Pain Points

### 1.1 Business Scenario

The Product Listing Page (PLP) is a critical touchpoint in the e-commerce customer journey. Users expect to:

- Quickly find target products through keyword search
- Narrow down choices through multi-dimensional filtering (categories, price, attributes)
- Get search results sorted by relevance to their intent

### 1.2 Pain Points of Existing Solutions

| Pain Point | Manifestation | Business Impact |
|------------|---------------|-----------------|
| **Weak Search** | Only exact matching, no fuzzy search or synonyms | Users can't find products, conversion drops |
| **Limited Filtering** | No multi-dimensional faceted filtering | Poor filtering efficiency, bad UX |
| **Performance Bottleneck** | Slow database queries with large datasets | Slow page load, user churn |
| **No Smart Sorting** | Cannot sort by relevance | Search results don't match user intent |

### 1.3 Target Solution

Build a **professional-grade search experience** supporting:
- Full-text Search
- Multi-dimensional Faceted Filtering
- Relevance-based Sorting
- Millisecond-level Response Time


---

## 2. Domain-Driven Design (DDD) Analysis

### 2.1 Domain Identification

Through business scenario analysis, we identify two core domains:

```
┌─────────────────────────────────────────────────────────────┐
│                    E-Commerce Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────┐       ┌─────────────────────┐     │
│   │    Product Domain   │       │    Search Domain    │     │
│   │                     │       │                     │     │
│   │  • Product lifecycle│       │  • Search index mgmt│     │
│   │  • Inventory & price│       │  • Full-text search │     │
│   │  • Categories & tags│       │  • Faceted filtering│     │
│   │  • Business rules   │       │  • Relevance sorting│     │
│   │                     │       │                     │     │
│   └─────────────────────┘       └─────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Domain Boundaries & Responsibilities

#### Product Domain

**Core Responsibility**: Authoritative source of product data, handles all product-related business logic

| Aggregate Root | Responsibility | Key Behaviors |
|----------------|----------------|---------------|
| Product | Product entity management | Create, Update, Publish, Unpublish |
| Category | Category hierarchy | Hierarchy management, product classification |
| Collection | Product collections | Marketing groups, themed collections |

**Data Characteristics**:
- Strong consistency required
- Transactional operations
- Complex business rule validation

#### Search Domain

**Core Responsibility**: Provide high-performance product retrieval capabilities

| Core Concept | Responsibility | Key Capabilities |
|--------------|----------------|------------------|
| ProductDocument | Search document | Flattened searchable structure |
| SearchIndex | Index management | Index creation, update, deletion |
| Facet | Aggregation dimensions | Categories, price ranges, attributes |

**Data Characteristics**:
- Eventual consistency acceptable
- Read-optimized data structure
- High-concurrency query support


### 2.3 Why Separate Two Domains?

**Key Insight**: Product management and product search are fundamentally different business concerns

| Dimension | Product Domain | Search Domain |
|-----------|----------------|---------------|
| **Core Focus** | Data correctness | Query performance |
| **Consistency** | Strong consistency | Eventual consistency |
| **Data Structure** | Normalized (3NF) | Denormalized (flattened) |
| **Operation Pattern** | Balanced read/write | Read-intensive |
| **Scaling Direction** | Vertical scaling | Horizontal scaling |

This separation embodies **CQRS (Command Query Responsibility Segregation)**:
- **Command (Write)**: Handled by Product Domain
- **Query (Read)**: Optimized by Search Domain

---

## 3. Domain Model Design

### 3.1 Product Domain Model

```
┌─────────────────────────────────────────────────────────────┐
│                    Product Aggregate                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐                                            │
│  │   Product   │ (Aggregate Root)                           │
│  │  ─────────  │                                            │
│  │  id         │                                            │
│  │  title      │                                            │
│  │  handle     │                                            │
│  │  status     │◀─── published | draft                      │
│  │  description│                                            │
│  └──────┬──────┘                                            │
│         │                                                    │
│         │ 1:N                                                │
│         ▼                                                    │
│  ┌─────────────┐      ┌─────────────┐                       │
│  │   Variant   │      │    Price    │                       │
│  │  ─────────  │ 1:N  │  ─────────  │                       │
│  │  sku        │─────▶│  amount     │                       │
│  │  title      │      │  currency   │                       │
│  └─────────────┘      └─────────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐
│    Category     │     │   Collection    │
│   ───────────   │     │   ───────────   │
│   id            │     │   id            │
│   name          │     │   title         │
│   parent_id     │     │   handle        │
└─────────────────┘     └─────────────────┘
        │                       │
        └───────────┬───────────┘
                    │ M:N
                    ▼
              ┌───────────┐
              │  Product  │
              └───────────┘
```


### 3.2 Search Domain Model

```
┌─────────────────────────────────────────────────────────────┐
│                   ProductDocument                            │
│            (Search-optimized Flattened Document)             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Basic Information                                   │    │
│  │  ─────────────────                                  │    │
│  │  id, title, handle, thumbnail, description          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Classification Dimensions (Facets)                  │    │
│  │  ──────────────────────────────                     │    │
│  │  category_ids: ["cat_1", "cat_2"]                   │    │
│  │  category_names: ["Living Room", "Sofas"]           │    │
│  │  collection_ids: ["col_1"]                          │    │
│  │  collection_names: ["Summer Sale"]                  │    │
│  │  tag_values: ["new", "bestseller"]                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Price Range                                         │    │
│  │  ───────────                                        │    │
│  │  min_price: 29900  (lowest variant price)           │    │
│  │  max_price: 59900  (highest variant price)          │    │
│  │  currency_code: "usd"                               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Product Attributes (Dynamic Facets)                 │    │
│  │  ───────────────────────────────                    │    │
│  │  meta_material: "Leather"                           │    │
│  │  meta_care: "Dry clean only"                        │    │
│  │  option_values: ["Red", "Blue", "Large", "Small"]   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Design Principles**:

1. **Flattened Structure**: Expand nested relationships (categories, collections, tags) into arrays for search engine indexing
2. **Pre-computed Aggregations**: `min_price`/`max_price` calculated at index time, avoiding query-time aggregation
3. **Multi-value Fields**: `category_names` etc. use arrays to support multi-select filtering

---

## 4. Domain Event Design

### 4.1 Event Identification

Identifying key domain events from business scenarios:

| Business Action | Domain Event | Event Meaning |
|-----------------|--------------|---------------|
| Create Product | `ProductCreated` | New product enters the system |
| Update Product | `ProductUpdated` | Product information changed |
| Publish Product | `ProductPublished` | Product goes live for sale |
| Unpublish Product | `ProductUnpublished` | Product no longer for sale |
| Delete Product | `ProductDeleted` | Product removed from system |


### 4.2 Event Flow Design

```
┌─────────────────────────────────────────────────────────────┐
│                    Event Flow Design                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │  Admin User  │                                           │
│  └──────┬───────┘                                           │
│         │ Create/Update/Delete Product                       │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │   Product    │                                           │
│  │   Domain     │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         │ Publish Domain Events                              │
│         ▼                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Event Bus                          │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────────┐    │   │
│  │  │ Product    │ │ Product    │ │ Product        │    │   │
│  │  │ Created    │ │ Updated    │ │ Deleted        │    │   │
│  │  └─────┬──────┘ └─────┬──────┘ └───────┬────────┘    │   │
│  └────────┼──────────────┼────────────────┼─────────────┘   │
│           │              │                │                  │
│           └──────────────┼────────────────┘                  │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Event Handlers (Subscribers)             │   │
│  │                                                       │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  ProductSyncHandler                             │ │   │
│  │  │  ─────────────────                              │ │   │
│  │  │  Listens: ProductCreated, ProductUpdated        │ │   │
│  │  │  Action: Sync product to search index           │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  │                                                       │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  ProductDeleteHandler                           │ │   │
│  │  │  ─────────────────                              │ │   │
│  │  │  Listens: ProductDeleted                        │ │   │
│  │  │  Action: Remove product from search index       │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Search Domain                        │   │
│  │                  (OpenSearch)                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Event Processing Strategy

| Event | Processing Strategy | Rationale |
|-------|---------------------|-----------|
| `ProductCreated` | Async indexing | Don't block creation flow |
| `ProductUpdated` | Async update | Allow brief inconsistency |
| `ProductDeleted` | Async deletion | Search results can tolerate brief delay |

**Eventual Consistency Guarantee**:
- Retry mechanism on event processing failure
- Manual full sync capability as fallback


---

## 5. Data Synchronization Flow Design

### 5.1 Sync Workflow Orchestration

Breaking down complex sync logic into composable steps:

```
┌─────────────────────────────────────────────────────────────┐
│                   Sync Workflow                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Input: { productId? | limit, offset }                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Step 1: Query Products                             │    │
│  │  ─────────────────────                              │    │
│  │  Fetch product data from Product Domain             │    │
│  │  Including: basic info, categories, collections,    │    │
│  │             tags, variants, prices                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Step 2: Transform Data                             │    │
│  │  ─────────────────────                              │    │
│  │  Convert domain model to search document            │    │
│  │                                                     │    │
│  │  Product (Normalized)  ──▶  ProductDocument (Flat)  │    │
│  │                                                     │    │
│  │  • Expand nested relations to arrays                │    │
│  │  • Calculate min_price / max_price                  │    │
│  │  • Separate published / unpublished                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│              ┌───────────┴───────────┐                      │
│              ▼                       ▼                      │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  Step 3a: Index     │  │  Step 3b: Delete    │          │
│  │  ─────────────────  │  │  ─────────────────  │          │
│  │  Index published    │  │  Delete unpublished │          │
│  │  products to        │  │  products from      │          │
│  │  Search Domain      │  │  Search Domain      │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│  Output: { synced_count, deleted_count }                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Data Transformation Rules

```
┌─────────────────────────────────────────────────────────────┐
│              Data Transformation Rules                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Product Domain Model          Search Document               │
│  ────────────────────          ───────────────               │
│                                                              │
│  product.id              ──▶   id                           │
│  product.title           ──▶   title                        │
│  product.handle          ──▶   handle                       │
│  product.thumbnail       ──▶   thumbnail                    │
│  product.description     ──▶   description                  │
│                                                              │
│  product.categories[]    ──▶   category_ids[]               │
│    └─ .id                      category_names[]             │
│    └─ .name                                                 │
│                                                              │
│  product.collection      ──▶   collection_ids[]             │
│    └─ .id                      collection_names[]           │
│    └─ .title                                                │
│                                                              │
│  product.tags[]          ──▶   tag_ids[]                    │
│    └─ .id                      tag_values[]                 │
│    └─ .value                                                │
│                                                              │
│  product.variants[]      ──▶   min_price (calculate min)    │
│    └─ .prices[]                max_price (calculate max)    │
│       └─ .amount               variant_count                │
│                                                              │
│  product.metadata        ──▶   meta_* (flatten)             │
│    └─ { material: "X" }        meta_material: "X"           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```


---

## 6. Search Capability Design

### 6.1 Search Feature Matrix

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Full-text Search** | Keyword matching on title, description | Search engine full-text index |
| **Faceted Filtering** | Multi-dimensional filtering | Aggregation queries + filters |
| **Price Range** | Filter by price range | Range Query |
| **Sorting** | Relevance, price, date | Sort + Score |
| **Pagination** | Browse large datasets | From/Size |

### 6.2 Facet Design

```
┌─────────────────────────────────────────────────────────────┐
│                    Facet Configuration                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Value Facets                                        │    │
│  │  ────────────                                       │    │
│  │                                                     │    │
│  │  category_names    ──▶  [Living Room (12)]          │    │
│  │                         [Bedroom (8)]               │    │
│  │                         [Office (5)]                │    │
│  │                                                     │    │
│  │  collection_names  ──▶  [Summer Sale (15)]          │    │
│  │                         [New Arrivals (10)]         │    │
│  │                                                     │    │
│  │  meta_material     ──▶  [Leather (20)]              │    │
│  │                         [Fabric (35)]               │    │
│  │                         [Wood (12)]                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Range Facets                                        │    │
│  │  ────────────                                       │    │
│  │                                                     │    │
│  │  min_price         ──▶  [Under $500 (25)]           │    │
│  │                         [$500 - $1,000 (18)]        │    │
│  │                         [$1,000 - $2,000 (12)]      │    │
│  │                         [Over $2,000 (8)]           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Disjunctive Facets (OR Logic)                       │    │
│  │  ─────────────────────────────                      │    │
│  │                                                     │    │
│  │  Select "Living Room" OR "Bedroom"                  │    │
│  │  = Show products in either category                 │    │
│  │                                                     │    │
│  │  NOT "Living Room" AND "Bedroom"                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Search Field Weights

```
┌─────────────────────────────────────────────────────────────┐
│                  Search Field Weights                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Field              Weight    Description                    │
│  ─────              ──────    ───────────                    │
│  title              5         Title match most important     │
│  subtitle           3         Subtitle secondary             │
│  description        2         Description lower weight       │
│                                                              │
│  Example:                                                    │
│  Search "leather sofa"                                      │
│                                                              │
│  Product A: title="Leather Sofa"        ──▶ Score: High     │
│  Product B: description="...leather..." ──▶ Score: Low      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```


---

## 7. Overall Architecture View

### 7.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        System Architecture                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                      Presentation Layer                      │    │
│  │  ┌─────────────────────┐    ┌─────────────────────┐         │    │
│  │  │     Admin UI        │    │     Storefront      │         │    │
│  │  │                     │    │                     │         │    │
│  │  │  • Product mgmt     │    │  • Search box       │         │    │
│  │  │  • Manual sync btn  │    │  • Filters          │         │    │
│  │  │                     │    │  • Product list     │         │    │
│  │  └──────────┬──────────┘    └──────────┬──────────┘         │    │
│  └─────────────┼──────────────────────────┼─────────────────────┘    │
│                │                          │                          │
│                │ REST API                 │ Direct Query             │
│                ▼                          ▼                          │
│  ┌─────────────────────────┐    ┌─────────────────────────┐         │
│  │    Product Domain       │    │     Search Domain       │         │
│  │    ──────────────       │    │     ─────────────       │         │
│  │                         │    │                         │         │
│  │  ┌─────────────────┐    │    │  ┌─────────────────┐    │         │
│  │  │  Product Module │    │    │  │  Search Module  │    │         │
│  │  │  ─────────────  │    │    │  │  ────────────   │    │         │
│  │  │  • CRUD ops     │    │    │  │  • Index mgmt   │    │         │
│  │  │  • Business rules│   │    │  │  • Doc sync     │    │         │
│  │  └─────────────────┘    │    │  └─────────────────┘    │         │
│  │           │              │    │           │             │         │
│  │           ▼              │    │           ▼             │         │
│  │  ┌─────────────────┐    │    │  ┌─────────────────┐    │         │
│  │  │   PostgreSQL    │    │    │  │   OpenSearch    │    │         │
│  │  │   (Data Store)  │    │    │  │ (Search Engine) │    │         │
│  │  └─────────────────┘    │    │  └─────────────────┘    │         │
│  │                         │    │                         │         │
│  └────────────┬────────────┘    └─────────────────────────┘         │
│               │                                                      │
│               │ Domain Events                                        │
│               ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Event Bus                                │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │    │
│  │  │ Product      │  │ Product      │  │ Product      │       │    │
│  │  │ Created      │  │ Updated      │  │ Deleted      │       │    │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │    │
│  └─────────┼─────────────────┼─────────────────┼────────────────┘    │
│            │                 │                 │                     │
│            └─────────────────┼─────────────────┘                     │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                   Event Handlers                             │    │
│  │  ┌─────────────────────────────────────────────────────┐    │    │
│  │  │              Sync Workflow                           │    │    │
│  │  │  Query ──▶ Transform ──▶ Index/Delete               │    │    │
│  │  └─────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```


### 7.2 Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Data Flow Overview                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Write Path                                                          │
│  ──────────                                                          │
│                                                                      │
│  Admin ──▶ Product API ──▶ PostgreSQL ──▶ Event ──▶ OpenSearch      │
│                                                                      │
│  1. Admin operates products through Admin UI                         │
│  2. Product Domain handles business logic, persists to PostgreSQL    │
│  3. Publishes domain events                                          │
│  4. Event Handler triggers sync workflow                             │
│  5. Data transformed and written to OpenSearch                       │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────   │
│                                                                      │
│  Read Path                                                           │
│  ─────────                                                           │
│                                                                      │
│  Storefront ──▶ OpenSearch ──▶ Search Results                       │
│                                                                      │
│  1. User enters search criteria in Storefront                        │
│  2. Frontend queries OpenSearch directly (bypasses backend API)      │
│  3. Returns search results and facet aggregations                    │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────   │
│                                                                      │
│  Key Design Decisions:                                               │
│  • Frontend connects directly to search engine for performance       │
│  • Writes sync asynchronously via events, non-blocking               │
│  • Search index is a projection of PostgreSQL, not source of truth   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. Key Design Decisions

### 8.1 Why Event-Driven Instead of Synchronous Calls?

| Approach | Pros | Cons |
|----------|------|------|
| **Synchronous** | Strong consistency | Increased latency, tight coupling |
| **Event-Driven** ✓ | Loose coupling, non-blocking | Eventual consistency |

**Decision Rationale**:
- Search results can tolerate brief delays (seconds)
- Product operations shouldn't fail due to search index failures
- Easier to extend with more event consumers in the future

### 8.2 Why Frontend Direct Connection to Search Engine?

| Approach | Pros | Cons |
|----------|------|------|
| **Backend Proxy** | Can add access control | Increased latency, backend load |
| **Direct Connection** ✓ | Low latency, reduced backend pressure | Need to handle CORS |

**Decision Rationale**:
- Product search is public data, no access control needed
- Search is high-frequency operation, direct connection significantly reduces latency
- Search engine itself has high-concurrency capabilities

### 8.3 Why Flattened Document Structure?

| Approach | Pros | Cons |
|----------|------|------|
| **Keep Nested Structure** | Consistent with source data | Complex queries, poor performance |
| **Flattened Structure** ✓ | Simple queries, good performance | Requires transformation logic |

**Decision Rationale**:
- Search engines are better optimized for flat structures
- Facet aggregations require top-level fields
- Transformation logic centralized in sync workflow, easy to maintain


---

## 9. Reliability Guarantees

### 9.1 Data Consistency Guarantees

```
┌─────────────────────────────────────────────────────────────┐
│              Consistency Guarantee Mechanisms                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  1. Real-time Sync (Event-Driven)                   │    │
│  │  ────────────────────────────────                   │    │
│  │  • Product changes trigger events                   │    │
│  │  • Event handlers auto-sync                         │    │
│  │  • Latency: seconds                                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  2. Manual Full Sync (Admin Trigger)                │    │
│  │  ───────────────────────────────────                │    │
│  │  • Admin can manually trigger full sync             │    │
│  │  • Used to fix data inconsistencies                 │    │
│  │  • Supports paginated batch processing              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  3. Scheduled Jobs (Optional Extension)             │    │
│  │  ──────────────────────────────────                 │    │
│  │  • Periodic full validation                         │    │
│  │  • Auto-repair drifted data                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Failure Handling Strategies

| Failure Scenario | Impact | Handling Strategy |
|------------------|--------|-------------------|
| Search engine unavailable | Search feature degraded | Frontend shows friendly message, other features unaffected |
| Event processing failure | Data inconsistency | Retry mechanism + manual sync fallback |
| Network partition | Sync delay | Event queue buffering, continue processing after recovery |

---

## 10. Scalability Considerations

### 10.1 Horizontal Scaling Capability

```
┌─────────────────────────────────────────────────────────────┐
│                  Scalability Design                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Product Domain                Search Domain                 │
│  ──────────────                ─────────────                 │
│                                                              │
│  ┌─────────────┐              ┌─────────────┐               │
│  │ PostgreSQL  │              │ OpenSearch  │               │
│  │             │              │   Cluster   │               │
│  │  • Replicas │              │             │               │
│  │  • Read/    │              │  • Sharding │               │
│  │    Write    │              │  • Replicas │               │
│  │    Split    │              │  • Auto-    │               │
│  └─────────────┘              │    scaling  │               │
│                               └─────────────┘               │
│                                                              │
│  Scaling Strategy:                                           │
│  • Product Domain: Primarily vertical, read/write split      │
│  • Search Domain: Horizontal scaling, add shards & replicas  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 Feature Extension Points

| Extension Direction | Implementation Approach |
|---------------------|------------------------|
| Add new facet dimensions | Modify document structure + frontend config |
| Search suggestions/autocomplete | Add Suggest index |
| Search analytics/trending | Integrate search log analysis |
| Personalized ranking | Incorporate user behavior data |
| Multi-language search | Configure multi-language analyzers |


---

## 11. Summary

### 11.1 Architecture Design Highlights

| Design Pattern | Application | Value Delivered |
|----------------|-------------|-----------------|
| **Domain-Driven Design** | Identified Product and Search domains | Separation of concerns, independent evolution |
| **Event-Driven Architecture** | Inter-domain communication via events | Loose coupling, async processing |
| **CQRS Concept** | Read/write separation to different stores | Individual optimization, performance gains |
| **Workflow Orchestration** | Sync logic decomposed into steps | Observable, retryable, extensible |

### 11.2 Business Problems Solved

```
┌─────────────────────────────────────────────────────────────┐
│                  Before vs After                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Before (Pain Points)          After (Solutions)             │
│  ────────────────────          ─────────────────             │
│                                                              │
│  ❌ Exact match only     ──▶   ✅ Full-text + fuzzy search   │
│  ❌ Single filter dim    ──▶   ✅ Multi-dimensional facets   │
│  ❌ Slow large queries   ──▶   ✅ Millisecond response       │
│  ❌ No relevance sort    ──▶   ✅ Smart relevance ranking    │
│  ❌ Non-shareable search ──▶   ✅ URL state synchronization  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 11.3 Technology Selection Summary

| Layer | Technology | Selection Rationale |
|-------|------------|---------------------|
| **Product Data Store** | PostgreSQL | Transaction support, data consistency |
| **Search Engine** | OpenSearch | Full-text search, facet aggregation, high performance |
| **Event Bus** | Built-in Event Bus | Lightweight, framework integration |
| **Frontend Search UI** | Elastic Search UI | Mature search UI component library |

---

## Appendix: Demo Presentation Flow

### A. Problem Demonstration
1. Show limitations of native search (exact match only)
2. Explain business pain points

### B. Architecture Walkthrough
1. Introduce the two-domain separation
2. Explain event-driven design

### C. Real-time Sync Demo
1. Create/update product in Admin
2. Observe event triggering
3. View search index update

### D. Search Experience Demo
1. Full-text search functionality
2. Faceted filtering
3. URL state synchronization
4. Sorting capabilities

### E. Operations Capability Demo
1. Admin Widget manual sync
2. Health check
