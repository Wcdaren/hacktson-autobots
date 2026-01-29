/**
 * useMultimodalSearch Hook
 *
 * Manages multimodal search functionality combining text and image inputs.
 *
 * @module app/hooks/useMultimodalSearch
 */
import { useState, useCallback } from 'react';
import type { SearchIntent, SearchConstraints } from '@app/components/search/IntentChips';

/**
 * Search result from the API
 */
export interface SearchResult {
  document: ProductDocument;
  score: number;
  matchType: 'text' | 'visual' | 'mixed' | 'semantic';
  similarityScore?: number;
  regionPrice?: number;
  regionCurrency?: string;
}

/**
 * Product document structure
 */
export interface ProductDocument {
  id: string;
  title: string;
  description: string;
  handle: string;
  thumbnail: string;
  // Additional fields...
  [key: string]: unknown;
}

/**
 * Facet result structure
 */
export interface FacetResult {
  [key: string]: Array<{
    value: string;
    count: number;
  }>;
}

/**
 * Search response metadata
 */
export interface SearchMeta {
  query?: string;
  total: number;
  responseTimeMs: number;
  searchType: 'text_only' | 'image_only' | 'mixed_modal';
  extractedConstraints?: SearchConstraints;
}

/**
 * Options for the useMultimodalSearch hook
 */
export interface UseMultimodalSearchOptions {
  /** Backend URL */
  backendUrl: string;
  /** Region ID for pricing */
  regionId?: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Keyword weight (0-1) */
  keywordWeight?: number;
  /** Semantic weight (0-1) */
  semanticWeight?: number;
}

/**
 * Return type for the useMultimodalSearch hook
 */
export interface UseMultimodalSearchReturn {
  // State
  results: SearchResult[];
  intent: SearchIntent | null;
  facets: Record<string, FacetResult>;
  isLoading: boolean;
  error: Error | null;
  meta: SearchMeta | null;

  // Actions
  search: (query: string, imageBase64?: string) => Promise<void>;
  searchByImage: (imageBase64: string) => Promise<void>;
  searchByText: (query: string) => Promise<void>;
  clearResults: () => void;

  // Metadata
  searchType: 'text_only' | 'image_only' | 'mixed_modal' | null;
  responseTimeMs: number | null;
}

/**
 * useMultimodalSearch Hook
 *
 * Provides multimodal search functionality.
 *
 * Features:
 * - Text-only search
 * - Image-only search
 * - Mixed-modal search (text + image)
 * - Intent extraction
 * - Loading and error states
 * - Result management
 *
 * @example
 * ```tsx
 * import { useMultimodalSearch } from "@app/hooks/useMultimodalSearch"
 *
 * function SearchPage() {
 *   const {
 *     results,
 *     intent,
 *     isLoading,
 *     error,
 *     search,
 *     searchByImage
 *   } = useMultimodalSearch({
 *     backendUrl: 'http://localhost:9000',
 *     regionId: 'us'
 *   })
 *
 *   const handleSearch = async (query: string, image?: File) => {
 *     if (image) {
 *       const base64 = await convertToBase64(image)
 *       await search(query, base64)
 *     } else {
 *       await search(query)
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       {isLoading && <p>Loading...</p>}
 *       {error && <p>Error: {error.message}</p>}
 *       {intent && <IntentChips intent={intent} />}
 *       {results.map(result => <ProductCard key={result.document.id} {...result} />)}
 *     </div>
 *   )
 * }
 * ```
 */
export function useMultimodalSearch(options: UseMultimodalSearchOptions): UseMultimodalSearchReturn {
  const { backendUrl, regionId, keywordWeight = 0.5, semanticWeight = 0.5 } = options;

  const [results, setResults] = useState<SearchResult[]>([]);
  const [intent, setIntent] = useState<SearchIntent | null>(null);
  const [facets, setFacets] = useState<Record<string, FacetResult>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [meta, setMeta] = useState<SearchMeta | null>(null);

  /**
   * Perform a multimodal search
   */
  const search = useCallback(
    async (query: string, imageBase64?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const endpoint = `${backendUrl}/store/search/multimodal`;

        const body: Record<string, unknown> = {
          size: 24,
          keywordWeight,
          semanticWeight,
        };

        if (query) {
          body.query = query;
        }

        if (imageBase64) {
          body.image = imageBase64;
        }

        if (regionId) {
          body.regionId = regionId;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data = await response.json();

        setResults(data.results || []);
        setIntent(data.intent || null);
        setFacets(data.facets || {});
        setMeta(data.meta || null);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error('Search failed');
        setError(errorObj);
        setResults([]);
        setIntent(null);
        setFacets({});
        setMeta(null);
      } finally {
        setIsLoading(false);
      }
    },
    [backendUrl, regionId, keywordWeight, semanticWeight],
  );

  /**
   * Search by image only
   */
  const searchByImage = useCallback(
    async (imageBase64: string) => {
      await search('', imageBase64);
    },
    [search],
  );

  /**
   * Search by text only
   */
  const searchByText = useCallback(
    async (query: string) => {
      await search(query);
    },
    [search],
  );

  /**
   * Clear search results
   */
  const clearResults = useCallback(() => {
    setResults([]);
    setIntent(null);
    setFacets({});
    setError(null);
    setMeta(null);
  }, []);

  return {
    // State
    results,
    intent,
    facets,
    isLoading,
    error,
    meta,

    // Actions
    search,
    searchByImage,
    searchByText,
    clearResults,

    // Metadata
    searchType: meta?.searchType || null,
    responseTimeMs: meta?.responseTimeMs || null,
  };
}
