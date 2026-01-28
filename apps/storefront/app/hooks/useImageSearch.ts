/**
 * useImageSearch Hook
 *
 * Custom hook for performing image-based product search.
 * Handles file conversion, API calls, and state management.
 *
 * @module app/hooks/useImageSearch
 */
import { useState, useCallback } from 'react';

/**
 * Search result from the image search API
 */
export interface ImageSearchResult {
  document: {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    handle: string;
    price: number;
    category_names?: string[];
    collection_names?: string[];
    [key: string]: unknown;
  };
  score: number;
  matchType: 'visual';
  similarityScore?: number;
}

/**
 * Image search response from the API
 */
interface ImageSearchResponse {
  results: ImageSearchResult[];
  meta: {
    detectedLabels: string[];
    total: number;
    responseTimeMs: number;
  };
}

/**
 * State returned by the useImageSearch hook
 */
export interface UseImageSearchState {
  /** Search results */
  results: ImageSearchResult[];
  /** Whether a search is in progress */
  isLoading: boolean;
  /** Error message if search failed */
  error: string | null;
  /** Preview URL of the uploaded image */
  previewUrl: string | null;
  /** Labels detected in the image */
  detectedLabels: string[];
  /** Response time in milliseconds */
  responseTimeMs: number | null;
}

/**
 * Actions returned by the useImageSearch hook
 */
export interface UseImageSearchActions {
  /** Perform image search with a file */
  searchByImage: (file: File) => Promise<void>;
  /** Clear search results and state */
  clearSearch: () => void;
}

/**
 * Convert a File to base64 data URL
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * useImageSearch Hook
 *
 * Provides image search functionality with state management.
 *
 * @param backendUrl - Medusa backend URL
 * @returns State and actions for image search
 *
 * @example
 * ```tsx
 * function ImageSearchComponent() {
 *   const { results, isLoading, error, previewUrl, searchByImage, clearSearch } = useImageSearch();
 *
 *   const handleImageSelect = (file: File) => {
 *     searchByImage(file);
 *   };
 *
 *   return (
 *     <div>
 *       <ImageSearchUpload
 *         onImageSelect={handleImageSelect}
 *         onClear={clearSearch}
 *         isLoading={isLoading}
 *         previewUrl={previewUrl}
 *         error={error}
 *       />
 *       {results.map(result => (
 *         <ProductCard key={result.document.id} product={result.document} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useImageSearch(
  backendUrl: string = 'http://localhost:9000',
): UseImageSearchState & UseImageSearchActions {
  const [results, setResults] = useState<ImageSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectedLabels, setDetectedLabels] = useState<string[]>([]);
  const [responseTimeMs, setResponseTimeMs] = useState<number | null>(null);

  const searchByImage = useCallback(
    async (file: File) => {
      setIsLoading(true);
      setError(null);
      setResults([]);
      setDetectedLabels([]);
      setResponseTimeMs(null);

      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      try {
        // Convert file to base64
        const base64Image = await fileToBase64(file);

        // Call image search API
        const response = await fetch(`${backendUrl}/store/search/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            size: 20,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Search failed: ${response.statusText}`);
        }

        const data: ImageSearchResponse = await response.json();

        setResults(data.results);
        setDetectedLabels(data.meta.detectedLabels);
        setResponseTimeMs(data.meta.responseTimeMs);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Image search failed';
        setError(message);
        console.error('Image search error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [backendUrl],
  );

  const clearSearch = useCallback(() => {
    // Revoke object URL to free memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setResults([]);
    setIsLoading(false);
    setError(null);
    setPreviewUrl(null);
    setDetectedLabels([]);
    setResponseTimeMs(null);
  }, [previewUrl]);

  return {
    results,
    isLoading,
    error,
    previewUrl,
    detectedLabels,
    responseTimeMs,
    searchByImage,
    clearSearch,
  };
}

export default useImageSearch;
