/**
 * Sync Products Workflow
 *
 * Workflow that synchronizes product data from Medusa to OpenSearch.
 * Fetches products using Query, transforms them to the OpenSearch document format,
 * indexes published products, and removes unpublished products from the index.
 *
 * @example
 * ```typescript
 * // Full sync of all products
 * await syncProductsWorkflow(container).run({
 *   input: { limit: 100, offset: 0 }
 * })
 *
 * // Sync specific product by ID
 * await syncProductsWorkflow(container).run({
 *   input: { filters: { id: "prod_123" } }
 * })
 * ```
 */

import { createWorkflow, transform, WorkflowResponse } from '@medusajs/framework/workflows-sdk';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import { syncProductsStep } from './steps/sync-products';
import { deleteProductsFromOpenSearchStep } from './steps/delete-products-from-opensearch';

/**
 * Input type for the sync products workflow
 */
type SyncProductsWorkflowInput = {
  /** Optional filters to apply when fetching products */
  filters?: Record<string, unknown>;
  /** Maximum number of products to fetch (default: no limit) */
  limit?: number;
  /** Number of products to skip (for pagination) */
  offset?: number;
};

/**
 * Product document structure for OpenSearch indexing
 */
type OpenSearchProductDocument = Record<string, unknown> & {
  id: string;
  title: string;
  description: string | null;
  handle: string;
  thumbnail: string | null;
  category_ids: string[];
  category_names: string[];
  collection_ids: string[];
  collection_names: string[];
  tag_ids: string[];
  tag_values: string[];
  price: number;
  created_at: Date;
  updated_at: Date;
};

/**
 * Sync Products Workflow
 *
 * This workflow:
 * 1. Fetches products from Medusa using Query
 * 2. Separates published products from unpublished ones
 * 3. Transforms published products to OpenSearch document format
 * 4. Indexes published products to OpenSearch
 * 5. Removes unpublished products from OpenSearch index
 */
export const syncProductsWorkflow = createWorkflow('sync-products', (input: SyncProductsWorkflowInput) => {
  // Step 1: Fetch products using Query
  const { data: products, metadata } = useQueryGraphStep({
    entity: 'product',
    fields: [
      'id',
      'title',
      'description',
      'handle',
      'thumbnail',
      'categories.id',
      'categories.name',
      'collections.id',
      'collections.title',
      'tags.id',
      'tags.value',
      'variants.calculated_price',
      'status',
      'created_at',
      'updated_at',
    ],
    pagination: {
      take: input.limit,
      skip: input.offset,
    },
    filters: input.filters,
  });

  // Step 2: Transform products - separate published from unpublished
  const { publishedProducts, unpublishedProductIds } = transform(
    { products },
    (data): { publishedProducts: OpenSearchProductDocument[]; unpublishedProductIds: string[] } => {
      const publishedProducts: OpenSearchProductDocument[] = [];
      const unpublishedProductIds: string[] = [];

      // Type assertion for products from Query
      const productList = data.products as Array<{
        id: string;
        title: string;
        description: string | null;
        handle: string;
        thumbnail: string | null;
        categories?: Array<{ id: string; name: string }>;
        collections?: Array<{ id: string; title: string }>;
        tags?: Array<{ id: string; value: string }>;
        variants?: Array<{
          calculated_price?: {
            calculated_amount?: number;
          };
        }>;
        status: string;
        created_at: Date;
        updated_at: Date;
      }>;

      productList.forEach((product) => {
        if (product.status === 'published') {
          publishedProducts.push({
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            thumbnail: product.thumbnail,
            category_ids: product.categories?.map((c) => c.id) || [],
            category_names: product.categories?.map((c) => c.name) || [],
            collection_ids: product.collections?.map((c) => c.id) || [],
            collection_names: product.collections?.map((c) => c.title) || [],
            tag_ids: product.tags?.map((t) => t.id) || [],
            tag_values: product.tags?.map((t) => t.value) || [],
            price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
            created_at: product.created_at,
            updated_at: product.updated_at,
          });
        } else {
          unpublishedProductIds.push(product.id);
        }
      });

      return { publishedProducts, unpublishedProductIds };
    },
  );

  // Step 3: Index published products to OpenSearch
  syncProductsStep({ products: publishedProducts });

  // Step 4: Remove unpublished products from OpenSearch
  deleteProductsFromOpenSearchStep({ ids: unpublishedProductIds });

  // Return workflow response
  return new WorkflowResponse({ products, metadata });
});

export default syncProductsWorkflow;
