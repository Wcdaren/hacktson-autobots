/**
 * Search Provider
 *
 * Provides search functionality using Elastic Search UI with OpenSearch backend.
 * Configures search fields, result fields, facets, and URL state tracking.
 *
 * @module app/providers/search-provider
 */
import { SearchProvider as ElasticSearchProvider } from '@elastic/react-search-ui';
import type { SearchProviderProps } from '@elastic/react-search-ui';
import { type FC, type PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';

import { createSearchConnector } from '@libs/util/search/connector';

/**
 * Context to track if search is ready (client-side only)
 */
const SearchReadyContext = createContext<boolean>(false);

/**
 * Hook to check if search context is available
 * Returns false during SSR and true after client-side hydration
 */
export function useSearchReady(): boolean {
  return useContext(SearchReadyContext);
}

/**
 * Search configuration for Elastic Search UI
 *
 * Configures:
 * - search_fields: Fields to search with weights (title has higher weight)
 * - result_fields: Fields to return in search results
 * - facets: Aggregations for filtering (categories, collections, price ranges)
 * - disjunctiveFacets: Facets that use OR logic within the same facet
 * - initialState: Default pagination settings
 * - trackUrlState: Enable URL state synchronization
 * - urlPushDebounceLength: Debounce URL updates to avoid excessive history entries
 *
 * Note: apiConnector is added dynamically in getSearchConfig() to avoid SSR issues
 */
const searchConfig: Omit<SearchProviderProps['config'], 'apiConnector'> = {
  searchQuery: {
    /**
     * Search fields with weights
     * Title is weighted highest, followed by subtitle, description
     */
    search_fields: {
      title: { weight: 5 },
      subtitle: { weight: 3 },
      description: { weight: 2 },
    },
    /**
     * Result fields to return from OpenSearch
     * raw: Return the raw value
     * snippet: Return a truncated snippet (for description)
     */
    result_fields: {
      id: { raw: {} },
      title: { raw: {} },
      subtitle: { raw: {} },
      description: { raw: {}, snippet: { size: 200 } },
      handle: { raw: {} },
      thumbnail: { raw: {} },
      status: { raw: {} },
      min_price: { raw: {} },
      max_price: { raw: {} },
      price: { raw: {} },
      currency_code: { raw: {} },
      category_ids: { raw: {} },
      category_names: { raw: {} },
      collection_ids: { raw: {} },
      collection_names: { raw: {} },
      tag_values: { raw: {} },
      option_names: { raw: {} },
      option_values: { raw: {} },
      variant_count: { raw: {} },
      metadata: { raw: {} },
      // Metadata facet fields
      meta_care: { raw: {} },
      meta_material: { raw: {} },
      meta_warranty: { raw: {} },
      meta_assembly: { raw: {} },
      meta_cover_type: { raw: {} },
      meta_filling: { raw: {} },
    },
    /**
     * Facets for filtering
     * - category_names: Value facet for category filtering
     * - collection_names: Value facet for collection filtering
     * - meta_*: Metadata facets for product attributes
     * - min_price: Range facet with predefined price ranges (in cents)
     */
    facets: {
      category_names: { type: 'value', size: 50 },
      collection_names: { type: 'value', size: 50 },
      // Metadata facets
      meta_material: { type: 'value', size: 30 },
      meta_care: { type: 'value', size: 20 },
      meta_warranty: { type: 'value', size: 20 },
      meta_assembly: { type: 'value', size: 20 },
      meta_cover_type: { type: 'value', size: 20 },
      meta_filling: { type: 'value', size: 20 },
      // Price range
      min_price: {
        type: 'range',
        ranges: [
          { from: 0, to: 50000, name: 'Under $500' },
          { from: 50000, to: 100000, name: '$500 - $1,000' },
          { from: 100000, to: 200000, name: '$1,000 - $2,000' },
          { from: 200000, name: 'Over $2,000' },
        ],
      },
    },
    /**
     * Disjunctive facets use OR logic within the same facet
     * This allows selecting multiple values within the same facet
     */
    disjunctiveFacets: [
      'category_names',
      'collection_names',
      'meta_material',
      'meta_care',
      'meta_warranty',
      'meta_assembly',
      'meta_cover_type',
      'meta_filling',
    ],
  },
  /**
   * Initial state configuration
   */
  initialState: {
    resultsPerPage: 12,
  },
  /**
   * Enable URL state tracking
   * This syncs search state with URL query parameters
   */
  trackUrlState: true,
  /**
   * Debounce URL updates to avoid excessive browser history entries
   * 500ms delay before pushing URL changes
   */
  urlPushDebounceLength: 500,
  /**
   * Always perform a search on initial load
   * This ensures products are displayed even without a search query
   */
  alwaysSearchOnInitialLoad: true,
};

/**
 * Get search configuration with connector
 * Creates connector lazily to avoid SSR issues
 */
function getSearchConfig(): SearchProviderProps['config'] {
  return {
    ...searchConfig,
    apiConnector: createSearchConnector(),
  };
}

/**
 * SearchProvider Component
 *
 * Wraps children with Elastic Search UI's SearchProvider to provide
 * search context throughout the application.
 *
 * Features:
 * - Full-text search on product title and description
 * - Faceted filtering by category, collection, and price range
 * - URL state synchronization for shareable search results
 * - Debounced URL updates for better UX
 * - SSR-safe: Only initializes search on client-side
 *
 * @example
 * ```tsx
 * import { SearchProvider } from "@app/providers/search-provider"
 *
 * function App() {
 *   return (
 *     <SearchProvider>
 *       <SearchBox />
 *       <SearchResults />
 *     </SearchProvider>
 *   )
 * }
 * ```
 */
export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or initial hydration, render children with search not ready
  // This prevents the connector from trying to connect during SSR
  if (!isClient) {
    return <SearchReadyContext.Provider value={false}>{children}</SearchReadyContext.Provider>;
  }

  return (
    <SearchReadyContext.Provider value={true}>
      <ElasticSearchProvider config={getSearchConfig()}>{children}</ElasticSearchProvider>
    </SearchReadyContext.Provider>
  );
};

/**
 * Export the search configuration for use in other components
 * This can be useful for testing or custom search implementations
 */
export { searchConfig };
