/**
 * Product Sync Subscriber
 *
 * Listens to product.created and product.updated events and syncs
 * the product data to OpenSearch for search indexing.
 *
 * This subscriber ensures that the OpenSearch index stays in sync
 * with the Medusa product catalog whenever products are created or updated.
 *
 * @example
 * When a product is created or updated in Medusa, this subscriber
 * automatically triggers the syncProductsWorkflow to index the product.
 */

import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { syncProductsWorkflow } from '../workflows/sync-products';

/**
 * Event data type for product events
 */
type ProductEventData = {
  /** The ID of the product that was created or updated */
  id: string;
};

/**
 * Handles product.created and product.updated events
 *
 * When a product is created or updated, this handler triggers the
 * syncProductsWorkflow to index the product data to OpenSearch.
 *
 * @param event - The event object containing the product ID
 * @param container - The Medusa container for dependency resolution
 */
export default async function handleProductEvents({
  event: { data },
  container,
}: SubscriberArgs<ProductEventData>): Promise<void> {
  const logger = container.resolve('logger');

  try {
    await syncProductsWorkflow(container).run({
      input: {
        filters: { id: data.id },
      },
    });
    logger.info(`Successfully synced product ${data.id} to OpenSearch`);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    logger.error(`Failed to sync product ${data.id} to OpenSearch`, errorObj);
    // Don't throw - let the subscriber complete gracefully
  }
}

/**
 * Subscriber configuration
 *
 * Subscribes to both product.created and product.updated events
 * to ensure the OpenSearch index is updated whenever products change.
 *
 * Note: This subscriber is disabled by default. To enable it, set
 * ENABLE_OPENSEARCH_SYNC=true in your .env file and ensure OpenSearch
 * is properly configured and accessible.
 */
export const config: SubscriberConfig = {
  event: process.env.ENABLE_OPENSEARCH_SYNC === 'true' ? ['product.created', 'product.updated'] : [],
};
