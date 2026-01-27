/**
 * Product Delete Subscriber
 *
 * Listens to product.deleted events and removes the product
 * from the OpenSearch index.
 *
 * This subscriber ensures that deleted products are removed from
 * the search index to prevent stale search results.
 *
 * @example
 * When a product is deleted in Medusa, this subscriber automatically
 * removes it from the OpenSearch index.
 */

import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { OPENSEARCH_MODULE } from '../modules/opensearch';
import type OpenSearchModuleService from '../modules/opensearch/service';

/**
 * Event data type for product delete events
 */
type ProductDeleteEventData = {
  /** The ID of the product that was deleted */
  id: string;
};

/**
 * Handles product.deleted events
 *
 * When a product is deleted, this handler removes the product
 * from the OpenSearch index to keep the search results accurate.
 *
 * @param event - The event object containing the deleted product ID
 * @param container - The Medusa container for dependency resolution
 */
export default async function handleProductDelete({
  event: { data },
  container,
}: SubscriberArgs<ProductDeleteEventData>): Promise<void> {
  const opensearchService: OpenSearchModuleService = container.resolve(OPENSEARCH_MODULE);
  await opensearchService.deleteFromIndex([data.id]);
}

/**
 * Subscriber configuration
 *
 * Subscribes to the product.deleted event to remove deleted
 * products from the OpenSearch index.
 */
export const config: SubscriberConfig = {
  event: 'product.deleted',
};
