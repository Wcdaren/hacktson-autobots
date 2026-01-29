/**
 * Search Provider
 *
 * Provides search functionality using Elastic Search UI with OpenSearch backend.
 * Always uses hybrid search (combining keyword matching and semantic understanding)
 * which is transparent to users - they simply search and get the best results.
 *
 * @module app/providers/search-provider
 */
import { SearchProvider as ElasticSearchProvider } from '@elastic/react-search-ui';
import { type FC, type PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';

import { createHybridSearchConnector } from '@libs/util/search/hybridSearchConnector';

/**
 * Image search state
 */
export interface ImageSearchState {
  isActive: boolean;
  previewUrl: string | null;
  isLoading: boolean;
}

/**
 * Context to track if search is ready (client-side only)
 */
const SearchReadyContext = createContext<boolean>(false);

/**
 * Context for image search state
 */
const ImageSearchContext = createContext<{
  imageSearch: ImageSearchState;
  setImageSearch: (state: ImageSearchState) => void;
  clearImageSearch: () => void;
}>({
  imageSearch: { isActive: false, previewUrl: null, isLoading: false },
  setImageSearch: () => {},
  clearImageSearch: () => {},
});

/**
 * Hook to check if search context is available
 * Returns false during SSR and true after client-side hydration
 */
export function useSearchReady(): boolean {
  return useContext(SearchReadyContext);
}

/**
 * Hook to access and control image search state
 */
export function useImageSearchState() {
  return useContext(ImageSearchContext);
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
const searchConfig = {
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
 * Get search configuration with hybrid connector
 * Always uses hybrid search - transparent to users
 * @param backendUrl - Medusa backend URL for hybrid search
 * @param publishableApiKey - Medusa publishable API key
 * @param regionId - User's region ID for price field selection
 */
function getSearchConfig(backendUrl?: string, publishableApiKey?: string, regionId?: string) {
  // Always use hybrid search connector - transparent to users
  const connector = createHybridSearchConnector({
    backendUrl: backendUrl || 'http://localhost:9000',
    publishableApiKey,
    regionId,
    // Hybrid search uses balanced weights for keyword and semantic matching
    keywordWeight: 0.5,
    semanticWeight: 0.5,
  });

  return {
    ...searchConfig,
    apiConnector: connector,
  };
}

/**
 * Props for SearchProvider
 */
interface SearchProviderComponentProps {
  /** Medusa backend URL for search */
  backendUrl?: string;
  /** Medusa publishable API key */
  publishableApiKey?: string;
  /** User's region ID for price field selection */
  regionId?: string;
}

/**
 * SearchProvider Component
 *
 * Wraps children with Elastic Search UI's SearchProvider to provide
 * search context throughout the application.
 *
 * Features:
 * - Hybrid search combining keyword matching and semantic understanding
 * - Search is transparent to users - they simply search and get the best results
 * - Full-text search on product title and description
 * - Faceted filtering by category, collection, and price range
 * - URL state synchronization for shareable search results
 * - Debounced URL updates for better UX
 * - SSR-safe: Only initializes search on client-side
 * - Region-aware pricing based on user's selected region
 *
 * @example
 * ```tsx
 * import { SearchProvider } from "@app/providers/search-provider"
 *
 * function App() {
 *   return (
 *     <SearchProvider regionId="reg_us" backendUrl="http://localhost:9000">
 *       <SearchBox />
 *       <SearchResults />
 *     </SearchProvider>
 *   )
 * }
 * ```
 */
export const SearchProvider: FC<PropsWithChildren<SearchProviderComponentProps>> = ({
  children,
  backendUrl,
  publishableApiKey,
  regionId,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [imageSearch, setImageSearch] = useState<ImageSearchState>({
    isActive: false,
    previewUrl: null,
    isLoading: false,
  });

  const clearImageSearch = () => {
    setImageSearch({ isActive: false, previewUrl: null, isLoading: false });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or initial hydration, render children with search not ready
  // This prevents the connector from trying to connect during SSR
  if (!isClient) {
    return (
      <ImageSearchContext.Provider value={{ imageSearch, setImageSearch, clearImageSearch }}>
        <SearchReadyContext.Provider value={false}>{children}</SearchReadyContext.Provider>
      </ImageSearchContext.Provider>
    );
  }

  return (
    <ImageSearchContext.Provider value={{ imageSearch, setImageSearch, clearImageSearch }}>
      <SearchReadyContext.Provider value={true}>
        <ElasticSearchProvider config={getSearchConfig(backendUrl, publishableApiKey, regionId)}>
          {children}
        </ElasticSearchProvider>
      </SearchReadyContext.Provider>
    </ImageSearchContext.Provider>
  );
};

/**
 * Export the search configuration for use in other components
 * This can be useful for testing or custom search implementations
 */
export { searchConfig };
