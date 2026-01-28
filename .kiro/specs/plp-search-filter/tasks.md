# PLP Search & Filter Implementation Tasks

## Task List

### Phase 1: Infrastructure Setup

- [x] 1. Setup OpenSearch Docker Configuration
  - [x] 1.1 Add OpenSearch service to docker-compose.yaml
  - [x] 1.2 Add OpenSearch volume configuration
  - [x] 1.3 Add healthcheck configuration
  - [x] 1.4 Update .env.template with OpenSearch variables
  - [x] 1.5 Test OpenSearch container startup

### Phase 2: Backend - OpenSearch Module

- [x] 2. Create OpenSearch Module
  - [x] 2.1 Create module directory structure (src/modules/opensearch/)
  - [x] 2.2 Implement types.ts with TypeScript interfaces
  - [x] 2.3 Implement service.ts with OpenSearch client
  - [x] 2.4 Implement indexData() method for bulk indexing
  - [x] 2.5 Implement deleteFromIndex() method
  - [x] 2.6 Implement ensureIndex() with proper mapping
  - [x] 2.7 Create module definition in index.ts
  - [x] 2.8 Register module in medusa-config.ts

### Phase 3: Backend - Sync Workflow

- [x] 3. Create Sync Products Workflow
  - [x] 3.1 Create syncProductsStep in src/workflows/steps/
  - [x] 3.2 Create deleteProductsFromOpenSearchStep
  - [x] 3.3 Create main syncProductsWorkflow
  - [x] 3.4 Test workflow execution

- [x] 4. Create Event Subscribers
  - [x] 4.1 Create product-sync.ts subscriber (product.created, product.updated)
  - [x] 4.2 Create product-delete.ts subscriber (product.deleted)
  - [x] 4.3 Create opensearch-sync.ts subscriber (manual sync event)
  - [x] 4.4 Test subscriber triggers

### Phase 4: Backend - Admin API

- [x] 5. Create Admin Sync API Route
  - [x] 5.1 Create route file at src/api/admin/opensearch/sync/route.ts
  - [x] 5.2 Implement POST handler to trigger full reindex
  - [x] 5.3 Test admin sync endpoint

### Phase 5: Frontend - Search Infrastructure

- [x] 6. Install Frontend Dependencies
  - [x] 6.1 Add @elastic/search-ui to package.json
  - [x] 6.2 Add @elastic/react-search-ui to package.json
  - [x] 6.3 Add @elastic/search-ui-elasticsearch-connector to package.json
  - [x] 6.4 Add @elastic/react-search-ui-views to package.json
  - [x] 6.5 Run yarn install

- [x] 7. Create Search Connector
  - [x] 7.1 Create connector.ts in libs/util/search/
  - [x] 7.2 Configure ElasticsearchAPIConnector for development
  - [x] 7.3 Configure ApiProxyConnector for production
  - [x] 7.4 Create connector factory function

- [x] 8. Create Search Provider
  - [x] 8.1 Create search-provider.tsx in app/providers/
  - [x] 8.2 Configure search query options (search_fields, result_fields, facets)
  - [x] 8.3 Configure URL state tracking
  - [x] 8.4 Integrate with root providers

### Phase 6: Frontend - API Proxy Routes (Production)

- [x] 9. Create Search API Proxy Routes
  - [x] 9.1 Create api.search.tsx route for search proxy
  - [x] 9.2 Create api.autocomplete.tsx route for autocomplete proxy
  - [x] 9.3 Test proxy routes with production connector

### Phase 7: Frontend - Search Components

- [x] 10. Create Search Box Component
  - [x] 10.1 Create SearchBox.tsx in app/components/search/
  - [x] 10.2 Configure search-as-you-type with debouncing
  - [x] 10.3 Style with Tailwind CSS

- [x] 11. Create Filter Components
  - [x] 11.1 Create SearchFilters.tsx container component
  - [x] 11.2 Configure category facet with Facet component
  - [x] 11.3 Configure collection facet with Facet component
  - [x] 11.4 Configure price range facet
  - [x] 11.5 Create SortSelector with Sorting component
  - [x] 11.6 Style all filter components

- [x] 12. Create Active Filters Display
  - [x] 12.1 Create ActiveFilters.tsx component with withSearch HOC
  - [x] 12.2 Implement filter tag rendering
  - [x] 12.3 Implement individual filter removal
  - [x] 12.4 Implement "Clear all" functionality

- [x] 13. Create Mobile Filter Drawer
  - [x] 13.1 Create MobileFilterDrawer.tsx component
  - [x] 13.2 Implement drawer open/close animation
  - [x] 13.3 Add filter button for mobile
  - [x] 13.4 Test responsive behavior

### Phase 8: Frontend - Search Results

- [x] 14. Create Search Results Component
  - [x] 14.1 Create SearchResults.tsx component
  - [x] 14.2 Integrate with existing ProductListItem component
  - [x] 14.3 Add loading state with withSearch
  - [x] 14.4 Add empty state

- [x] 15. Create Pagination Component
  - [x] 15.1 Configure Paging component from Search UI
  - [x] 15.2 Configure PagingInfo for result count
  - [x] 15.3 Configure ResultsPerPage selector

### Phase 9: Route Integration

- [x] 16. Update Products Index Route
  - [x] 16.1 Wrap route with SearchProvider
  - [x] 16.2 Add SearchBox to header area
  - [x] 16.3 Add sidebar with SearchFilters (desktop)
  - [x] 16.4 Add MobileFilterDrawer (mobile)
  - [x] 16.5 Replace ProductGrid with SearchResults
  - [x] 16.6 Add ActiveFilters display

### Phase 10: Testing

- [x] 17. Backend Unit Tests
  - [x] 17.1 Test OpenSearch service indexData method
  - [x] 17.2 Test OpenSearch service deleteFromIndex method
  - [x] 17.3 Test ensureIndex creates proper mapping

- [x] 18. Backend Integration Tests
  - [x] 18.1 Test sync workflow execution
  - [x] 18.2 Test event subscribers trigger correctly
  - [x] 18.3 Test admin sync endpoint

- [x] 19. Property-Based Tests
  - [x] 19.1 Test search result relevance property
  - [x] 19.2 Test category filter accuracy property
  - [x] 19.3 Test price range filter correctness property
  - [x] 19.4 Test sort order consistency property
  - [x] 19.5 Test aggregation count accuracy property

- [ ] 20. Frontend Tests
  - [-] 20.1 Test connector factory returns correct connector
  - [-] 20.2 Test filter components render correctly
  - [-] 20.3 Test URL state synchronization

### Phase 11: Documentation & Cleanup

- [ ] 21. Documentation
  - [ ] 21.1 Update README with search feature documentation
  - [ ] 21.2 Document environment variables
  - [ ] 21.3 Add development vs production setup guide

- [ ] 22. Final Review
  - [ ] 22.1 Code review and cleanup
  - [ ] 22.2 Performance optimization
  - [ ] 22.3 Accessibility review
