/**
 * Category Search Provider
 *
 * Provides search functionality for category pages using Elastic Search UI
 * with OpenSearch backend. Pre-applies category filter and excludes category
 * facet from the filters sidebar.
 *
 * @module app/providers/category-search-provider
 */
import { SearchProvider as ElasticSearchProvider } from '@elastic/react-search-ui';
import { type FC, type PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';

import { createCategorySearchConnector } from '@libs/util/search/categorySearchConnector';

/**
 * Category node structure for tree display
 */
export interface CategoryNode {
  id: string;
  name: string;
  handle: string;
  parent_category_id: string | null;
}

/**
 * Context value for category data
 */
interface CategoryContextValue {
  isReady: boolean;
  currentCategory: CategoryNode | null;
  allCategories: CategoryNode[];
}

/**
 * Context to track if category search is ready and provide category data
 */
const CategorySearchContext = createContext<CategoryContextValue>({
  isReady: false,
  currentCategory: null,
  allCategories: [],
});

/**
 * Hook to check if category search context is available
 * Returns false during SSR and true after client-side hydration
 */
export function useCategorySearchReady(): boolean {
  return useContext(CategorySearchContext).isReady;
}

/**
 * Hook to access category data for tree display
 */
export function useCategoryData(): { currentCategory: CategoryNode | null; allCategories: CategoryNode[] } {
  const { currentCategory, allCategories } = useContext(CategorySearchContext);
  return { currentCategory, allCategories };
}

/**
 * Search configuration for category pages
 *
 * Similar to the main search config but:
 * - Excludes category_names from facets (since we're already filtering by category)
 * - Includes collections, tags, price, and metadata facets
 */
const categorySearchConfig = {
  searchQuery: {
    search_fields: {
      title: { weight: 5 },
      subtitle: { weight: 3 },
      description: { weight: 2 },
    },
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
      meta_care: { raw: {} },
      meta_material: { raw: {} },
      meta_warranty: { raw: {} },
      meta_assembly: { raw: {} },
      meta_cover_type: { raw: {} },
      meta_filling: { raw: {} },
    },
    /**
     * Facets for category page filtering
     * Note: category_names is included for tree display counts but not shown as a filter
     */
    facets: {
      category_names: { type: 'value', size: 100 },
      collection_names: { type: 'value', size: 50 },
      tag_values: { type: 'value', size: 30 },
      meta_material: { type: 'value', size: 30 },
      meta_care: { type: 'value', size: 20 },
      meta_warranty: { type: 'value', size: 20 },
      meta_assembly: { type: 'value', size: 20 },
      meta_cover_type: { type: 'value', size: 20 },
      meta_filling: { type: 'value', size: 20 },
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
    disjunctiveFacets: [
      'collection_names',
      'tag_values',
      'meta_material',
      'meta_care',
      'meta_warranty',
      'meta_assembly',
      'meta_cover_type',
      'meta_filling',
    ],
  },
  initialState: {
    resultsPerPage: 12,
  },
  trackUrlState: true,
  urlPushDebounceLength: 500,
  alwaysSearchOnInitialLoad: true,
};

/**
 * Get search configuration with category connector
 *
 * Note: trackUrlState is disabled to ensure clean state when navigating
 * between categories. This means filter selections won't be preserved in
 * the URL, but it prevents stale filter state from persisting across
 * category navigation.
 *
 * TODO: Consider implementing custom URL state management that clears
 * filters when the category changes but preserves them within a category.
 */
function getCategorySearchConfig(
  categoryId: string,
  backendUrl?: string,
  publishableApiKey?: string,
  regionId?: string,
) {
  const connector = createCategorySearchConnector({
    categoryId,
    backendUrl: backendUrl || 'http://localhost:9000',
    publishableApiKey,
    regionId,
  });

  return {
    ...categorySearchConfig,
    apiConnector: connector,
    trackUrlState: false,
  };
}

/**
 * Props for CategorySearchProvider
 */
interface CategorySearchProviderProps {
  /** Category ID to pre-filter by */
  categoryId: string;
  /** Medusa backend URL for search */
  backendUrl?: string;
  /** Medusa publishable API key */
  publishableApiKey?: string;
  /** User's region ID for price field selection */
  regionId?: string;
  /** Current category data for tree display */
  currentCategory?: CategoryNode;
  /** All categories for building the tree */
  allCategories?: CategoryNode[];
}

/**
 * CategorySearchProvider Component
 *
 * Wraps children with Elastic Search UI's SearchProvider configured for
 * category page browsing. Pre-applies category filter and provides faceted
 * filtering for collections, tags, price, and materials.
 *
 * @example
 * ```tsx
 * import { CategorySearchProvider } from "@app/providers/category-search-provider"
 *
 * function CategoryPage({ categoryId }) {
 *   return (
 *     <CategorySearchProvider categoryId={categoryId} regionId="reg_us">
 *       <CategoryFilters />
 *       <SearchResults />
 *     </CategorySearchProvider>
 *   )
 * }
 * ```
 */
export const CategorySearchProvider: FC<PropsWithChildren<CategorySearchProviderProps>> = ({
  children,
  categoryId,
  backendUrl,
  publishableApiKey,
  regionId,
  currentCategory,
  allCategories = [],
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contextValue: CategoryContextValue = {
    isReady: isClient,
    currentCategory: currentCategory || null,
    allCategories,
  };

  // During SSR or initial hydration, render children with search not ready
  if (!isClient) {
    return <CategorySearchContext.Provider value={contextValue}>{children}</CategorySearchContext.Provider>;
  }

  return (
    <CategorySearchContext.Provider value={{ ...contextValue, isReady: true }}>
      <ElasticSearchProvider config={getCategorySearchConfig(categoryId, backendUrl, publishableApiKey, regionId)}>
        {children}
      </ElasticSearchProvider>
    </CategorySearchContext.Provider>
  );
};

export { categorySearchConfig };
