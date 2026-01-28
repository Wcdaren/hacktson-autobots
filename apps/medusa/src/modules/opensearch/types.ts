/**
 * OpenSearch Module Types
 *
 * Type definitions for the OpenSearch module used for product search indexing.
 */

/**
 * Configuration options for the OpenSearch module
 */
export type OpenSearchModuleOptions = {
  /** OpenSearch host URL (e.g., "http://localhost:9200" or "https://xxx.us-east-1.es.amazonaws.com") */
  host: string;
  /** Name of the product index in OpenSearch */
  productIndexName: string;
  /** Whether k-NN (vector search) is enabled */
  knnEnabled?: boolean;
  /** Whether to use AWS Signature V4 authentication (for AWS OpenSearch Service with IAM) */
  useAwsAuth?: boolean;
  /** AWS region for AWS OpenSearch Service (default: us-east-1) */
  awsRegion?: string;
  /** Username for basic authentication */
  username?: string;
  /** Password for basic authentication */
  password?: string;
};

/**
 * Document structure for products indexed in OpenSearch
 * This structure is optimized for Search UI compatibility
 */
export type ProductDocument = {
  /** Unique product identifier */
  id: string;
  /** Product title for display and search */
  title: string;
  /** Product subtitle */
  subtitle?: string;
  /** Product description for search */
  description?: string;
  /** URL-friendly product handle */
  handle: string;
  /** Product thumbnail URL */
  thumbnail?: string;
  /** Product status (draft, proposed, published, rejected) */
  status: string;
  /** Product material */
  material?: string;
  /** Product weight */
  weight?: number;
  /** Product height */
  height?: number;
  /** Product width */
  width?: number;
  /** Product length */
  length?: number;
  /** Product origin country */
  origin_country?: string;
  /** Product type ID */
  type_id?: string;
  /** Product type name */
  type_name?: string;
  /** Whether product is a gift card */
  is_giftcard: boolean;
  /** Whether product is discountable */
  discountable: boolean;
  /** Array of category IDs the product belongs to */
  category_ids: string[];
  /** Array of category names for faceted filtering */
  category_names: string[];
  /** Array of collection IDs the product belongs to */
  collection_ids: string[];
  /** Array of collection names for faceted filtering */
  collection_names: string[];
  /** Array of tag IDs associated with the product */
  tag_ids: string[];
  /** Array of tag values for faceted filtering */
  tag_values: string[];
  /** Array of product option names (e.g., Size, Color) */
  option_names: string[];
  /** Array of all option values across all options */
  option_values: string[];
  /** Minimum product price across all variants */
  min_price: number;
  /** Maximum product price across all variants */
  max_price: number;
  /** Product price (alias for min_price for backward compatibility) */
  price: number;
  /** Currency code for prices */
  currency_code?: string;
  /** Number of variants */
  variant_count: number;
  /** Array of variant SKUs */
  variant_skus: string[];
  /** Array of variant titles */
  variant_titles: string[];
  /** Product metadata as JSON object */
  metadata?: Record<string, unknown>;
  /** Flattened metadata fields for search/filter */
  metadata_keys: string[];
  metadata_values: string[];
  /** ISO date string when product was created */
  created_at: string;
  /** ISO date string when product was last updated */
  updated_at: string;

  // Vector embedding fields for semantic search
  /** Text embedding vector (1024 dimensions) for semantic search */
  text_embedding?: number[];
  /** Image embedding vector (1024 dimensions) for image search */
  image_embedding?: number[];
  /** ISO date string when embeddings were last updated */
  embedding_updated_at?: string;
};

/**
 * Options for semantic search
 */
export type SemanticSearchOptions = {
  /** Number of results to return */
  size?: number;
  /** Filters to apply */
  filters?: Record<string, unknown>;
  /** Minimum similarity score (0-1) */
  minScore?: number;
};

/**
 * Options for image search
 */
export type ImageSearchOptions = {
  /** Number of results to return */
  size?: number;
  /** Filters to apply */
  filters?: Record<string, unknown>;
  /** Minimum similarity score (0-1) */
  minScore?: number;
};

/**
 * Options for hybrid search (keyword + semantic)
 */
export type HybridSearchOptions = {
  /** Number of results to return */
  size?: number;
  /** Filters to apply */
  filters?: Record<string, unknown>;
  /** Weight for keyword search (0-1) */
  keywordWeight?: number;
  /** Weight for semantic search (0-1) */
  semanticWeight?: number;
};

/**
 * Options for browsing products (no search query)
 */
export type BrowseOptions = {
  /** Number of results to return */
  size?: number;
  /** Offset for pagination */
  from?: number;
  /** Filters to apply */
  filters?: Record<string, unknown>;
  /** Sort configuration */
  sort?: { field: string; order: 'asc' | 'desc' };
};

/**
 * Search result with match type information
 */
export type SearchResult = {
  /** Product document */
  document: ProductDocument;
  /** Relevance score */
  score: number;
  /** Type of match */
  matchType: 'exact' | 'semantic' | 'visual' | 'hybrid';
  /** Similarity score for vector matches (0-1) */
  similarityScore?: number;
};

/**
 * OpenSearch index mapping properties
 */
export type IndexMappingProperties = {
  [key: string]: {
    type: string;
    analyzer?: string;
    fields?: {
      [key: string]: {
        type: string;
      };
    };
  };
};

/**
 * Bulk operation item for OpenSearch
 */
export type BulkOperationItem = {
  index: {
    _index: string;
    _id: string;
  };
};

/**
 * Facet bucket from OpenSearch aggregation
 */
export type FacetBucket = {
  /** Facet value */
  value: string;
  /** Count of documents with this value */
  count: number;
};

/**
 * Facet result for a single field
 */
export type FacetResult = {
  /** Field name */
  field: string;
  /** Type of facet */
  type: 'value' | 'range';
  /** Facet buckets */
  data: FacetBucket[];
};

/**
 * Range facet bucket
 */
export type RangeFacetBucket = {
  /** Range name/label */
  name: string;
  /** Start of range (inclusive) */
  from?: number;
  /** End of range (exclusive) */
  to?: number;
  /** Count of documents in this range */
  count: number;
};

/**
 * Search result with facets
 */
export type SearchWithFacetsResult = {
  /** Search results */
  results: SearchResult[];
  /** Facet aggregations */
  facets: Record<string, FacetResult>;
  /** Total count of matching documents */
  total: number;
};

/**
 * Facet configuration for search
 */
export type FacetConfig = {
  /** Field name to aggregate */
  field: string;
  /** Type of facet */
  type: 'value' | 'range';
  /** Maximum number of buckets for value facets */
  size?: number;
  /** Range definitions for range facets */
  ranges?: Array<{ name: string; from?: number; to?: number }>;
};
