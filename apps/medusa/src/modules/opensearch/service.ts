/**
 * OpenSearch Module Service
 *
 * Provides methods for indexing and managing product data in OpenSearch.
 * This service handles data synchronization only - search queries go directly
 * from the frontend to OpenSearch.
 */

import { Client } from '@opensearch-project/opensearch';
import type { OpenSearchModuleOptions, ProductDocument } from './types';

/**
 * OpenSearch Module Service
 *
 * Handles product data indexing and deletion in OpenSearch.
 * Used by workflows and subscribers to keep the search index in sync
 * with the Medusa product catalog.
 */
export default class OpenSearchModuleService {
  private client: Client;
  private options: OpenSearchModuleOptions;

  /**
   * Creates a new OpenSearch service instance
   * @param _ - Container dependencies (unused, required by Medusa module pattern)
   * @param options - OpenSearch configuration options
   */
  constructor(_: Record<string, unknown>, options: OpenSearchModuleOptions) {
    this.client = new Client({
      node: options.host,
    });
    this.options = options;
  }

  /**
   * Index product data to OpenSearch
   *
   * Performs bulk indexing of product documents. Creates the index with
   * proper mapping if it doesn't exist.
   *
   * @param data - Array of product documents to index
   * @param type - Index type (defaults to "product")
   * @throws Error if bulk indexing fails
   */
  async indexData(data: Record<string, unknown>[], type: string = 'product'): Promise<void> {
    if (data.length === 0) {
      return;
    }

    const indexName = this.getIndexName(type);

    // Ensure index exists with proper mapping
    await this.ensureIndex(indexName);

    // Build bulk operation body
    const body = data.flatMap((doc) => [{ index: { _index: indexName, _id: doc.id as string } }, doc]);

    const response = await this.client.bulk({
      body,
      refresh: true,
    });

    if (response.body.errors) {
      const errorItems = response.body.items.filter((item: { index?: { error?: unknown } }) => item.index?.error);
      console.error('OpenSearch bulk indexing errors:', JSON.stringify(errorItems, null, 2));
      throw new Error(`Failed to index ${errorItems.length} documents to OpenSearch`);
    }
  }

  /**
   * Delete products from OpenSearch index
   *
   * Removes documents with the specified IDs from the index.
   *
   * @param ids - Array of product IDs to delete
   * @param type - Index type (defaults to "product")
   */
  async deleteFromIndex(ids: string[], type: string = 'product'): Promise<void> {
    if (ids.length === 0) {
      return;
    }

    const indexName = this.getIndexName(type);

    // Check if index exists before attempting delete
    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return;
    }

    await this.client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          terms: {
            _id: ids,
          },
        },
      },
      refresh: true,
    });
  }

  /**
   * Ensure index exists with proper mapping for Search UI compatibility
   *
   * Creates the index with the appropriate field mappings if it doesn't exist.
   * The mapping is optimized for:
   * - Full-text search on title, description, subtitle
   * - Faceted filtering on categories, collections, tags, options, metadata fields
   * - Range queries on price
   * - Sorting by various fields
   *
   * @param indexName - Name of the index to create
   */
  private async ensureIndex(indexName: string): Promise<void> {
    const exists = await this.client.indices.exists({ index: indexName });

    if (!exists.body) {
      await this.client.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              // Primary identifier
              id: { type: 'keyword' },

              // Searchable text fields
              title: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              subtitle: { type: 'text' },
              description: { type: 'text' },

              // URL and media fields
              handle: { type: 'keyword' },
              thumbnail: { type: 'keyword' },

              // Product attributes
              status: { type: 'keyword' },
              origin_country: { type: 'keyword' },
              is_giftcard: { type: 'boolean' },
              discountable: { type: 'boolean' },

              // Dimensions
              weight: { type: 'float' },
              height: { type: 'float' },
              width: { type: 'float' },
              length: { type: 'float' },

              // Product type
              type_id: { type: 'keyword' },
              type_name: { type: 'keyword' },

              // Category facets
              category_ids: { type: 'keyword' },
              category_names: { type: 'keyword' },

              // Collection facets
              collection_ids: { type: 'keyword' },
              collection_names: { type: 'keyword' },

              // Tag facets
              tag_ids: { type: 'keyword' },
              tag_values: { type: 'keyword' },

              // Product options
              option_names: { type: 'keyword' },
              option_values: { type: 'keyword' },

              // Price for range filtering and sorting
              min_price: { type: 'float' },
              max_price: { type: 'float' },
              price: { type: 'float' },
              currency_code: { type: 'keyword' },

              // Variant info
              variant_count: { type: 'integer' },
              variant_skus: { type: 'keyword' },
              variant_titles: { type: 'keyword' },

              // Metadata facets (individual fields for filtering)
              meta_care: { type: 'keyword' },
              meta_material: { type: 'keyword' },
              meta_warranty: { type: 'keyword' },
              meta_assembly: { type: 'keyword' },
              meta_cover_type: { type: 'keyword' },
              meta_filling: { type: 'keyword' },

              // Raw metadata for display
              metadata: { type: 'object', enabled: false },

              // Timestamps for sorting
              created_at: { type: 'date' },
              updated_at: { type: 'date' },
            },
          },
        },
      });
    }
  }

  /**
   * Get the index name for a given type
   *
   * @param type - The type of index (e.g., "product")
   * @returns The configured index name for the type
   */
  private getIndexName(type: string): string {
    return type === 'product' ? this.options.productIndexName : type;
  }

  /**
   * Check if the OpenSearch connection is healthy
   *
   * @returns True if the connection is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.cluster.health();
      return response.body.status !== 'red';
    } catch {
      return false;
    }
  }

  /**
   * Get the count of documents in the product index
   *
   * @param type - Index type (defaults to "product")
   * @returns The number of documents in the index
   */
  async getDocumentCount(type: string = 'product'): Promise<number> {
    const indexName = this.getIndexName(type);

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return 0;
    }

    const response = await this.client.count({ index: indexName });
    return response.body.count;
  }

  /**
   * Delete the entire index
   *
   * Use with caution - this removes all indexed data.
   *
   * @param type - Index type (defaults to "product")
   */
  async deleteIndex(type: string = 'product'): Promise<void> {
    const indexName = this.getIndexName(type);

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (indexExists.body) {
      await this.client.indices.delete({ index: indexName });
    }
  }
}
