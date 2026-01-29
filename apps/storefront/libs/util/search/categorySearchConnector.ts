/**
 * Category Search Connector
 *
 * Custom connector for category pages that pre-applies a category filter
 * and routes requests through the Medusa backend browse API.
 * Excludes category facet from results since we're already filtering by category.
 *
 * @module libs/util/search/categorySearchConnector
 */

import type {
  APIConnector,
  RequestState,
  QueryConfig,
  ResponseState,
  AutocompleteResponseState,
} from '@elastic/search-ui';

/**
 * Configuration options for the category search connector
 */
export interface CategorySearchConnectorConfig {
  /** Category ID to pre-filter by */
  categoryId: string;
  /** Medusa backend URL */
  backendUrl: string;
  /** Medusa publishable API key */
  publishableApiKey?: string;
  /** User's region ID for price field selection */
  regionId?: string;
}

/**
 * Search result from the browse API
 */
interface BrowseSearchResult {
  document: Record<string, unknown>;
  score: number;
  matchType: 'exact' | 'semantic' | 'visual' | 'hybrid';
  similarityScore?: number;
}

/**
 * Facet bucket from API response
 */
interface FacetBucket {
  value: string;
  count: number;
}

/**
 * Facet result from API response
 */
interface FacetResult {
  field: string;
  type: 'value' | 'range';
  data: FacetBucket[];
}

/**
 * Response from the browse API
 */
interface BrowseSearchResponse {
  results: BrowseSearchResult[];
  facets?: Record<string, FacetResult>;
  meta: {
    total: number;
    responseTimeMs: number;
    regionId?: string;
  };
}

/**
 * Transform API facets to Search UI facet format
 * Includes category_names facet for tree display counts
 */
function transformFacets(apiFacets: Record<string, FacetResult> | undefined): ResponseState['facets'] {
  if (!apiFacets) {
    return {};
  }

  const facets: ResponseState['facets'] = {};

  for (const [field, facetResult] of Object.entries(apiFacets)) {
    if (facetResult.data && facetResult.data.length > 0) {
      facets[field] = [
        {
          field,
          type: facetResult.type === 'range' ? 'range' : 'value',
          data: facetResult.data.map((bucket) => ({
            value: bucket.value,
            count: bucket.count,
          })),
        },
      ];
    }
  }

  return facets;
}

/**
 * Build filter object from Search UI filter state
 * Merges user-selected filters with the pre-applied category filter
 */
function buildFilters(filters: RequestState['filters'], categoryId: string): Record<string, unknown> {
  const filterObj: Record<string, unknown> = {
    // Always include the category filter
    category_ids: [categoryId],
  };

  if (filters && filters.length > 0) {
    for (const filter of filters) {
      if (filter.values && filter.values.length > 0) {
        filterObj[filter.field] = filter.values.length === 1 ? filter.values[0] : filter.values;
      }
    }
  }

  return filterObj;
}

/**
 * Creates a category search connector that routes requests through
 * the Medusa backend browse API with a pre-applied category filter.
 *
 * @param config - Configuration options
 * @returns APIConnector instance for use with SearchProvider
 */
export function createCategorySearchConnector(config: CategorySearchConnectorConfig): APIConnector {
  const { categoryId, backendUrl, publishableApiKey, regionId } = config;

  const emptyResponse: ResponseState = {
    results: [],
    totalResults: 0,
    totalPages: 0,
    requestId: '',
    wasSearched: false,
    facets: {},
    resultSearchTerm: '',
    pagingStart: 0,
    pagingEnd: 0,
    rawResponse: {},
  };

  const emptyAutocompleteResponse: AutocompleteResponseState = {
    autocompletedResults: [],
    autocompletedResultsRequestId: '',
    autocompletedSuggestions: {},
    autocompletedSuggestionsRequestId: '',
  };

  return {
    async onSearch(state: RequestState, queryConfig: QueryConfig): Promise<ResponseState> {
      const resultsPerPage = queryConfig.resultsPerPage || 12;
      const currentPage = state.current || 1;
      const from = (currentPage - 1) * resultsPerPage;

      // Build headers with optional API key
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (publishableApiKey) {
        headers['x-publishable-api-key'] = publishableApiKey;
      }

      try {
        const response = await fetch(`${backendUrl}/store/search/browse`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            size: resultsPerPage,
            from,
            filters: buildFilters(state.filters, categoryId),
            regionId: regionId || undefined,
          }),
        });

        if (!response.ok) {
          console.error('Category browse failed:', response.statusText);
          return {
            ...emptyResponse,
            wasSearched: true,
          };
        }

        const data: BrowseSearchResponse = await response.json();

        const results = data.results.map((result) => ({
          id: { raw: result.document.id as string },
          title: { raw: result.document.title as string },
          description: { raw: (result.document.description as string) || '' },
          thumbnail: { raw: (result.document.thumbnail as string) || '' },
          handle: { raw: result.document.handle as string },
          price: { raw: result.document.price as number },
          min_price: { raw: result.document.min_price as number },
          currency_code: { raw: (result.document.currency_code as string) || 'usd' },
          category_names: { raw: (result.document.category_names as string[]) || [] },
          collection_names: { raw: (result.document.collection_names as string[]) || [] },
          tag_values: { raw: (result.document.tag_values as string[]) || [] },
          meta_material: { raw: (result.document.meta_material as string) || '' },
          meta_care: { raw: (result.document.meta_care as string) || '' },
          match_type: { raw: result.matchType },
          similarity_score: { raw: result.similarityScore },
          _meta: {
            score: result.score,
            matchType: result.matchType,
            similarityScore: result.similarityScore,
          },
        }));

        const totalResults = data.meta.total;
        const totalPages = Math.ceil(totalResults / resultsPerPage);

        return {
          results,
          totalResults,
          totalPages,
          requestId: `category-browse-${Date.now()}`,
          wasSearched: true,
          facets: transformFacets(data.facets),
          resultSearchTerm: '',
          pagingStart: from + 1,
          pagingEnd: Math.min(from + resultsPerPage, totalResults),
          rawResponse: data,
        };
      } catch (error) {
        console.error('Category browse failed:', error);
        return {
          ...emptyResponse,
          wasSearched: true,
        };
      }
    },

    async onAutocomplete(): Promise<AutocompleteResponseState> {
      // Autocomplete is not used on category pages
      return emptyAutocompleteResponse;
    },

    onResultClick(): void {
      // Optional: Track result clicks for analytics
    },

    onAutocompleteResultClick(): void {
      // Optional: Track autocomplete result clicks for analytics
    },
  };
}

export default createCategorySearchConnector;
