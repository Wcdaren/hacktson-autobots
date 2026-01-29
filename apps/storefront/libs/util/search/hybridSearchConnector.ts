/**
 * Hybrid Search Connector
 *
 * Custom connector that supports hybrid search (keyword + semantic)
 * by routing requests through the Medusa backend API.
 * Includes facet aggregation support for filtering UI.
 *
 * @module libs/util/search/hybridSearchConnector
 */

import type {
  APIConnector,
  RequestState,
  QueryConfig,
  ResponseState,
  AutocompleteResponseState,
} from '@elastic/search-ui';

/**
 * Configuration options for the hybrid search connector
 */
export interface HybridSearchConnectorConfig {
  /** Medusa backend URL */
  backendUrl: string;
  /** Medusa publishable API key */
  publishableApiKey?: string;
  /** Whether to enable semantic search */
  enableSemanticSearch?: boolean;
  /** Weight for keyword search (0-1) */
  keywordWeight?: number;
  /** Weight for semantic search (0-1) */
  semanticWeight?: number;
}

/**
 * Search result from the hybrid search API
 */
interface HybridSearchResult {
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
 * Response from the hybrid search API
 */
interface HybridSearchResponse {
  results: HybridSearchResult[];
  facets?: Record<string, FacetResult>;
  meta: {
    query?: string;
    total: number;
    responseTimeMs: number;
    weights?: { keyword: number; semantic: number };
  };
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<HybridSearchConnectorConfig> = {
  backendUrl: 'http://localhost:9000',
  publishableApiKey: '',
  enableSemanticSearch: true,
  keywordWeight: 0.5,
  semanticWeight: 0.5,
};

/**
 * Transform API facets to Search UI facet format
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
 * Creates a hybrid search connector that routes requests through
 * the Medusa backend for combined keyword and semantic search.
 *
 * @param config - Configuration options
 * @returns APIConnector instance for use with SearchProvider
 */
export function createHybridSearchConnector(config: Partial<HybridSearchConnectorConfig> = {}): APIConnector {
  const mergedConfig: Required<HybridSearchConnectorConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

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
      const searchTerm = state.searchTerm || '';
      const resultsPerPage = queryConfig.resultsPerPage || 20;

      // Build headers with optional API key
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (mergedConfig.publishableApiKey) {
        headers['x-publishable-api-key'] = mergedConfig.publishableApiKey;
      }

      // When no search term, fetch all products with browse API
      if (!searchTerm.trim()) {
        try {
          const response = await fetch(`${mergedConfig.backendUrl}/store/search/browse`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              size: resultsPerPage,
              filters: buildFilters(state.filters),
            }),
          });

          if (!response.ok) {
            // If browse fails, return empty results
            return {
              ...emptyResponse,
              wasSearched: true,
            };
          }

          const data: HybridSearchResponse = await response.json();

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
            requestId: `browse-${Date.now()}`,
            wasSearched: true,
            facets: transformFacets(data.facets),
            resultSearchTerm: '',
            pagingStart: 1,
            pagingEnd: Math.min(resultsPerPage, totalResults),
            rawResponse: data,
          };
        } catch (error) {
          console.error('Browse products failed:', error);
          return {
            ...emptyResponse,
            wasSearched: true,
          };
        }
      }

      try {
        const endpoint = mergedConfig.enableSemanticSearch
          ? `${mergedConfig.backendUrl}/store/search/hybrid`
          : `${mergedConfig.backendUrl}/store/search/semantic`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: searchTerm,
            size: resultsPerPage,
            keywordWeight: mergedConfig.keywordWeight,
            semanticWeight: mergedConfig.semanticWeight,
            filters: buildFilters(state.filters),
          }),
        });

        if (!response.ok) {
          throw new Error(`Search request failed: ${response.statusText}`);
        }

        const data: HybridSearchResponse = await response.json();

        // Transform results to Search UI format
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
          requestId: `hybrid-${Date.now()}`,
          wasSearched: true,
          facets: transformFacets(data.facets),
          resultSearchTerm: searchTerm,
          pagingStart: 1,
          pagingEnd: Math.min(resultsPerPage, totalResults),
          rawResponse: data,
        };
      } catch (error) {
        console.error('Hybrid search failed:', error);
        return {
          ...emptyResponse,
          wasSearched: true,
        };
      }
    },

    async onAutocomplete(state: RequestState): Promise<AutocompleteResponseState> {
      // For autocomplete, we use a simpler semantic search
      const searchTerm = state.searchTerm || '';

      if (!searchTerm.trim() || searchTerm.length < 2) {
        return emptyAutocompleteResponse;
      }

      try {
        const response = await fetch(`${mergedConfig.backendUrl}/store/search/semantic`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(mergedConfig.publishableApiKey ? { 'x-publishable-api-key': mergedConfig.publishableApiKey } : {}),
          },
          body: JSON.stringify({
            query: searchTerm,
            size: 5,
          }),
        });

        if (!response.ok) {
          return emptyAutocompleteResponse;
        }

        const data: HybridSearchResponse = await response.json();

        const autocompletedResults = data.results.map((result) => ({
          id: { raw: result.document.id as string },
          title: { raw: result.document.title as string },
          handle: { raw: result.document.handle as string },
          thumbnail: { raw: (result.document.thumbnail as string) || '' },
        }));

        return {
          autocompletedResults,
          autocompletedResultsRequestId: `autocomplete-${Date.now()}`,
          autocompletedSuggestions: {},
          autocompletedSuggestionsRequestId: '',
        };
      } catch (error) {
        console.error('Autocomplete failed:', error);
        return emptyAutocompleteResponse;
      }
    },

    onResultClick(): void {
      // Optional: Track result clicks for analytics
    },

    onAutocompleteResultClick(): void {
      // Optional: Track autocomplete result clicks for analytics
    },
  };
}

/**
 * Build filter object from Search UI filter state
 */
function buildFilters(filters: RequestState['filters']): Record<string, unknown> | undefined {
  if (!filters || filters.length === 0) {
    return undefined;
  }

  const filterObj: Record<string, unknown> = {};

  for (const filter of filters) {
    if (filter.values && filter.values.length > 0) {
      filterObj[filter.field] = filter.values.length === 1 ? filter.values[0] : filter.values;
    }
  }

  return Object.keys(filterObj).length > 0 ? filterObj : undefined;
}

export default createHybridSearchConnector;
