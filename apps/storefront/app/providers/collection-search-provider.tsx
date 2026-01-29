/**
 * Collection Search Provider
 *
 * Provides search functionality for collection pages using Elastic Search UI
 * with OpenSearch backend. Pre-applies collection filter and excludes collection
 * facet from the filters sidebar.
 *
 * @module app/providers/collection-search-provider
 */
import { SearchProvider as ElasticSearchProvider } from '@elastic/react-search-ui';
import { type FC, type PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';

import { createCollectionSearchConnector } from '@libs/util/search/collectionSearchConnector';

/**
 * Context to track if collection search is ready (client-side only)
 */
const CollectionSearchReadyContext = createContext<boolean>(false);

/**
 * Hook to check if collection search context is available
 * Returns false during SSR and true after client-side hydration
 */
export function useCollectionSearchReady(): boolean {
  return useContext(CollectionSearchReadyContext);
}

/**
 * Search configuration for collection pages
 *
 * Similar to the main search config but:
 * - Excludes collection_names from facets (since we're already filtering by collection)
 * - Includes categories, tags, price, and metadata facets
 */
const collectionSearchConfig = {
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
     * Facets for collection page filtering
     * Note: collection_names is EXCLUDED since we're already filtering by collection
     */
    facets: {
      category_names: { type: 'value', size: 50 },
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
      'category_names',
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
 * Get search configuration with collection connector
 */
function getCollectionSearchConfig(
  collectionId: string,
  backendUrl?: string,
  publishableApiKey?: string,
  regionId?: string,
) {
  const connector = createCollectionSearchConnector({
    collectionId,
    backendUrl: backendUrl || 'http://localhost:9000',
    publishableApiKey,
    regionId,
  });

  return {
    ...collectionSearchConfig,
    apiConnector: connector,
  };
}

/**
 * Props for CollectionSearchProvider
 */
interface CollectionSearchProviderProps {
  /** Collection ID to pre-filter by */
  collectionId: string;
  /** Medusa backend URL for search */
  backendUrl?: string;
  /** Medusa publishable API key */
  publishableApiKey?: string;
  /** User's region ID for price field selection */
  regionId?: string;
}

/**
 * CollectionSearchProvider Component
 *
 * Wraps children with Elastic Search UI's SearchProvider configured for
 * collection page browsing. Pre-applies collection filter and provides faceted
 * filtering for categories, tags, price, and materials.
 *
 * @example
 * ```tsx
 * import { CollectionSearchProvider } from "@app/providers/collection-search-provider"
 *
 * function CollectionPage({ collectionId }) {
 *   return (
 *     <CollectionSearchProvider collectionId={collectionId} regionId="reg_us">
 *       <CollectionFilters />
 *       <SearchResults />
 *     </CollectionSearchProvider>
 *   )
 * }
 * ```
 */
export const CollectionSearchProvider: FC<PropsWithChildren<CollectionSearchProviderProps>> = ({
  children,
  collectionId,
  backendUrl,
  publishableApiKey,
  regionId,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or initial hydration, render children with search not ready
  if (!isClient) {
    return <CollectionSearchReadyContext.Provider value={false}>{children}</CollectionSearchReadyContext.Provider>;
  }

  return (
    <CollectionSearchReadyContext.Provider value={true}>
      <ElasticSearchProvider config={getCollectionSearchConfig(collectionId, backendUrl, publishableApiKey, regionId)}>
        {children}
      </ElasticSearchProvider>
    </CollectionSearchReadyContext.Provider>
  );
};

export { collectionSearchConfig };
