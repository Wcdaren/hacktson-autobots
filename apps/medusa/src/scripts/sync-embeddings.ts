/**
 * Sync Embeddings Script
 *
 * Batch script to regenerate embeddings for all products in the catalog.
 * This is useful for:
 * - Initial setup of semantic search
 * - Rebuilding embeddings after model changes
 * - Recovering from embedding generation failures
 *
 * @example
 * ```bash
 * npx medusa exec ./src/scripts/sync-embeddings.ts
 * ```
 */

import type { ExecArgs } from '@medusajs/framework/types';
import { syncProductsWorkflow } from '../workflows/sync-products';

const BATCH_SIZE = 50;

export default async function syncEmbeddings({ container }: ExecArgs): Promise<void> {
  console.log('Starting embedding sync for all products...');
  const startTime = Date.now();

  let offset = 0;
  let totalProcessed = 0;
  let hasMore = true;

  while (hasMore) {
    console.log(`Processing batch starting at offset ${offset}...`);

    try {
      const result = await syncProductsWorkflow(container).run({
        input: {
          limit: BATCH_SIZE,
          offset,
          generateEmbeddings: true,
        },
      });

      const batchCount = result.result.products?.length || 0;
      totalProcessed += batchCount;

      console.log(`  Processed ${batchCount} products (total: ${totalProcessed})`);

      if (batchCount < BATCH_SIZE) {
        hasMore = false;
      } else {
        offset += BATCH_SIZE;
      }
    } catch (error) {
      console.error(`Error processing batch at offset ${offset}:`, error);
      // Continue with next batch
      offset += BATCH_SIZE;
    }
  }

  const duration = (Date.now() - startTime) / 1000;
  console.log(`\nEmbedding sync complete!`);
  console.log(`  Total products processed: ${totalProcessed}`);
  console.log(`  Duration: ${duration.toFixed(2)} seconds`);
}
