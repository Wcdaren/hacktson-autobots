/**
 * OpenSearch Module Types
 *
 * Type definitions for the OpenSearch module used for product search indexing.
 */

/**
 * Configuration options for the OpenSearch module
 */
export type OpenSearchModuleOptions = {
  /** OpenSearch host URL (e.g., "http://localhost:9200") */
  host: string;
  /** Name of the product index in OpenSearch */
  productIndexName: string;
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
