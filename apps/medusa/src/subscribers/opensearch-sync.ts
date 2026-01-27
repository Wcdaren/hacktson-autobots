/**
 * OpenSearch Sync Subscriber
 *
 * Listens to the custom opensearch.sync event for manual synchronization
 * of product data to OpenSearch.
 *
 * This subscriber allows administrators to trigger a full or partial
 * reindex of products to OpenSearch via the admin API or programmatically.
 *
 * @example
 * Trigger a manual sync by emitting the opensearch.sync event:
 * ```typescript
 * const eventBus = container.resolve("eventBusService")
 * await eventBus.emit("opensearch.sync", { limit: 100, offset: 0 })
 * ```
 */

import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { syncProductsWorkflow } from '../workflows/sync-products';

/**
 * Event data type for manual sync events
 */
type OpenSearchSyncEventData = {
  /** Maximum number of products to sync (defaults to 100) */
  limit?: number;
  /** Number of products to skip for pagination (defaults to 0) */
  offset?: number;
};

/**
 * Handles opensearch.sync events for manual synchronization
 *
 * When the opensearch.sync event is emitted, this handler triggers
 * the syncProductsWorkflow to index products to OpenSearch.
 * Supports pagination via limit and offset parameters.
 *
 * @param event - The event object containing optional limit and offset
 * @param container - The Medusa container for dependency resolution
 */
export default async function handleOpenSearchSync({
  event: { data },
  container,
}: SubscriberArgs<OpenSearchSyncEventData>): Promise<void> {
  await syncProductsWorkflow(container).run({
    input: {
      limit: data?.limit || 100,
      offset: data?.offset || 0,
    },
  });
}

/**
 * Subscriber configuration
 *
 * Subscribes to the custom opensearch.sync event for manual
 * synchronization triggers from the admin API or other sources.
 */
export const config: SubscriberConfig = {
  event: 'opensearch.sync',
};
