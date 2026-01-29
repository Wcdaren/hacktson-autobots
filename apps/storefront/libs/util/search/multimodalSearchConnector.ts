/**
 * Multimodal Search Connector
 *
 * Custom connector that supports multimodal search (text + image)
 * by routing requests through the Medusa backend API.
 * Extends the hybrid search connector with image support and intent extraction.
 *
 * @module libs/util/search/multimodalSearchConnector
 */

import type {
  APIConnector,
  RequestState,
  QueryConfig,
  ResponseState,
  AutocompleteResponseState,
} from '@elastic/search-ui';
import type { SearchIntent, SearchConstraints } from '@app/components/search/IntentChips';

/**
 * Configuration options for the multimodal search connector
 */
export interface MultimodalSearchConnectorConfig {
  /** Medusa backend URL */
  backendUrl: string;
  /** Medusa publishable API key */
  publishableApiKey?: string;
  /** User's region ID for price field selection */
  regionId?: string;
  /** Whether to enable image search */
  enableImageSearch?: boolean;
  /** Whether to enable intent extraction */
  enableIntentExtraction?: boolean;
  /** Weight for keyword search (0-1) */
  keywordWeight?: number;
  /** Weight for semantic search (0-1) */
  semanticWeight?: number;
  /** Maximum image size in MB */
  maxImageSizeMB?: number;
}

/**
 * Search result from the multimodal search API
 */
interface MultimodalSearchResult {
  document: Record<string, unknown>;
  score: number;
  matchType: 'text' | 'visual' | 'mixed' | 'semantic';
  similarityScore?: number;
  regionPrice?: number;
  regionCurrency?: string;
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
 * Response from the multimodal search API
 */
interface MultimodalSearchResponse {
  results: MultimodalSearchResult[];
  intent?: SearchIntent;
  facets?: Record<string, FacetResult>;
  meta: {
    query?: string;
    total: number;
    responseTimeMs: number;
    searchType: 'text_only' | 'image_only' | 'mixed_modal';
    extractedConstraints?: SearchConstraints;
  };
}

/**
 * Extended request state with image data
 */
interface MultimodalRequestState extends RequestState {
  imageData?: string; // Base64 encoded image
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<MultimodalSearchConnectorConfig> = {
  backendUrl: 'http://localhost:9000',
  publishableApiKey: '',
  regionId: '',
  enableImageSearch: true,
  enableIntentExtraction: true,
  keywordWeight: 0.5,
  semanticWeight: 0.5,
  maxImageSizeMB: 5,
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

/**
 * Creates a multimodal search connector that routes requests through
 * the Medusa backend for combined text and image search with intent extraction.
 *
 * @param config - Configuration options
 * @returns APIConnector instance for use with SearchProvider
 */
export function createMultimodalSearchConnector(config: Partial<MultimodalSearchConnectorConfig> = {}): APIConnector {
  const mergedConfig: Required<MultimodalSearchConnectorConfig> = {
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
      const multimodalState = state as MultimodalRequestState;
      const searchTerm = multimodalState.searchTerm || '';
      const imageData = multimodalState.imageData;
      const resultsPerPage = queryConfig.resultsPerPage || 20;

      // Build headers with optional API key
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (mergedConfig.publishableApiKey) {
        headers['x-publishable-api-key'] = mergedConfig.publishableApiKey;
      }

      // Determine endpoint based on input
      const hasText = searchTerm.trim().length > 0;
      const hasImage = imageData && imageData.length > 0;

      // If no text and no image, use browse endpoint
      if (!hasText && !hasImage) {
        try {
          const response = await fetch(`${mergedConfig.backendUrl}/store/search/browse`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              size: resultsPerPage,
              filters: buildFilters(state.filters),
              regionId: mergedConfig.regionId || undefined,
            }),
          });

          if (!response.ok) {
            return {
              ...emptyResponse,
              wasSearched: true,
            };
          }

          const data: MultimodalSearchResponse = await response.json();

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

      // Use multimodal endpoint if image is provided or intent extraction is enabled
      const useMultimodal = hasImage || (mergedConfig.enableIntentExtraction && hasText);
      const endpoint = useMultimodal
        ? `${mergedConfig.backendUrl}/store/search/multimodal`
        : `${mergedConfig.backendUrl}/store/search/hybrid`;

      try {
        const body: Record<string, unknown> = {
          size: resultsPerPage,
          keywordWeight: mergedConfig.keywordWeight,
          semanticWeight: mergedConfig.semanticWeight,
          filters: buildFilters(state.filters),
        };

        if (hasText) {
          body.query = searchTerm;
        }

        if (hasImage && mergedConfig.enableImageSearch) {
          body.image = imageData;
        }

        if (mergedConfig.regionId) {
          body.regionId = mergedConfig.regionId;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Search request failed: ${response.statusText}`);
        }

        const data: MultimodalSearchResponse = await response.json();

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
          requestId: `multimodal-${Date.now()}`,
          wasSearched: true,
          facets: transformFacets(data.facets),
          resultSearchTerm: searchTerm,
          pagingStart: 1,
          pagingEnd: Math.min(resultsPerPage, totalResults),
          rawResponse: {
            ...data,
            intent: data.intent, // Include intent in raw response
          },
        };
      } catch (error) {
        console.error('Multimodal search failed:', error);
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
            regionId: mergedConfig.regionId || undefined,
          }),
        });

        if (!response.ok) {
          return emptyAutocompleteResponse;
        }

        const data: MultimodalSearchResponse = await response.json();

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

export default createMultimodalSearchConnector;
