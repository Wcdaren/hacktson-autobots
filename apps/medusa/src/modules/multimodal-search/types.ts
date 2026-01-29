/**
 * Multimodal Search Module Types
 *
 * Type definitions for the Multimodal Search module that orchestrates
 * image analysis, intent extraction, and search execution to provide
 * intelligent search capabilities combining text and image inputs.
 */

import type { SearchIntent, SearchConstraints } from '../intent-extractor/types';
import type { SearchImageAnalysis } from '../image-analyzer/types';
import type { ProductDocument, SearchResult, FacetResult } from '../opensearch/types';

/**
 * Configuration options for the Multimodal Search Service
 */
export interface MultimodalSearchServiceOptions {
  /** Default number of results to return */
  defaultSize?: number;
  /** Default weight for keyword search (0-1) */
  defaultKeywordWeight?: number;
  /** Default weight for semantic search (0-1) */
  defaultSemanticWeight?: number;
  /** Timeout in ms for the entire search operation */
  timeoutMs?: number;
  /** Whether to enable AI-enhanced embeddings for search */
  enableAIEmbeddings?: boolean;
}

/**
 * Request for multimodal search
 * At least one of query or image must be provided
 */
export interface MultimodalSearchRequest {
  /** Optional text query */
  query?: string;
  /** Optional image data as Buffer */
  image?: Buffer;
  /** Optional filters to apply to search results */
  filters?: Record<string, unknown>;
  /** Number of results to return (default: 20) */
  size?: number;
  /** Region ID for region-aware pricing */
  regionId?: string;
  /** Weight for keyword search (0-1, default: 0.5) */
  keywordWeight?: number;
  /** Weight for semantic search (0-1, default: 0.5) */
  semanticWeight?: number;
}

/**
 * Response from multimodal search
 */
export interface MultimodalSearchResponse {
  /** Array of search results */
  results: MultimodalSearchResult[];
  /** Extracted search intent from the query/image */
  intent: SearchIntent;
  /** Facet aggregations for filtering */
  facets: Record<string, FacetResult>;
  /** Search metadata */
  meta: MultimodalSearchMeta;
}

/**
 * Individual search result with match type information
 */
export interface MultimodalSearchResult {
  /** Product document from OpenSearch */
  document: ProductDocument;
  /** Relevance score */
  score: number;
  /** Type of match that produced this result */
  matchType: 'text' | 'visual' | 'mixed' | 'semantic';
  /** Similarity score for vector matches (0-1) */
  similarityScore?: number;
  /** Region-specific price (in cents) */
  regionPrice?: number;
  /** Region-specific currency code */
  regionCurrency?: string;
}

/**
 * Metadata about the search operation
 */
export interface MultimodalSearchMeta {
  /** Total number of matching documents */
  total: number;
  /** Time taken to process the search in milliseconds */
  responseTimeMs: number;
  /** Type of search performed based on input */
  searchType: 'text_only' | 'image_only' | 'mixed_modal';
  /** Extracted constraints from the query */
  extractedConstraints?: SearchConstraints;
  /** Image analysis result (if image was provided) */
  imageAnalysis?: SearchImageAnalysis;
  /** Whether AI-enhanced embeddings were used */
  usedAIEmbeddings?: boolean;
  /** Detected language of the query */
  detectedLanguage?: 'en' | 'zh' | 'mixed';
}

/**
 * Internal context for search orchestration
 */
export interface SearchContext {
  /** Original request */
  request: MultimodalSearchRequest;
  /** Extracted search intent */
  intent?: SearchIntent;
  /** Image analysis result */
  imageAnalysis?: SearchImageAnalysis;
  /** Query embedding for semantic search */
  queryEmbedding?: number[];
  /** Detected search type */
  searchType: 'text_only' | 'image_only' | 'mixed_modal';
  /** Start time for response time calculation */
  startTime: number;
}

/**
 * Options for constraint-based filtering
 */
export interface ConstraintFilterOptions {
  /** Color constraints to apply */
  colors?: string[];
  /** Minimum price constraint */
  priceMin?: number;
  /** Maximum price constraint */
  priceMax?: number;
  /** Material constraints to apply */
  materials?: string[];
  /** Category constraints to apply */
  categories?: string[];
  /** Style constraints to apply */
  styles?: string[];
}

/**
 * Result from applying constraints to search results
 */
export interface FilteredSearchResult {
  /** Filtered results */
  results: MultimodalSearchResult[];
  /** Number of results before filtering */
  totalBeforeFilter: number;
  /** Number of results after filtering */
  totalAfterFilter: number;
}

/** Default number of results to return */
export const DEFAULT_SIZE = 20;

/** Default keyword weight for hybrid search */
export const DEFAULT_KEYWORD_WEIGHT = 0.5;

/** Default semantic weight for hybrid search */
export const DEFAULT_SEMANTIC_WEIGHT = 0.5;

/** Default timeout for search operations (10 seconds) */
export const DEFAULT_TIMEOUT_MS = 10000;
