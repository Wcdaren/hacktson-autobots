/**
 * Rebuild Embeddings API Endpoint
 * POST /admin/opensearch/embeddings/rebuild
 *
 * Triggers a full rebuild of product embeddings in the OpenSearch index
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { syncProductsWorkflow } from '../../../../../workflows/sync-products';

interface RebuildBody {
  batchSize?: number;
}

export async function POST(req: MedusaRequest<RebuildBody>, res: MedusaResponse) {
  const startTime = Date.now();

  try {
    const { batchSize = 50 } = req.body || {};

    let offset = 0;
    let totalProcessed = 0;
    let hasMore = true;

    // Process in batches
    while (hasMore) {
      const result = await syncProductsWorkflow(req.scope).run({
        input: {
          limit: batchSize,
          offset,
          generateEmbeddings: true,
        },
      });

      const batchCount = result.result.products?.length || 0;
      totalProcessed += batchCount;

      if (batchCount < batchSize) {
        hasMore = false;
      } else {
        offset += batchSize;
      }
    }

    const duration = Date.now() - startTime;

    return res.json({
      success: true,
      message: 'Embedding rebuild completed',
      stats: {
        totalProductsProcessed: totalProcessed,
        durationMs: duration,
        durationSeconds: Math.round(duration / 1000),
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Embedding rebuild failed after ${duration}ms:`, error);

    return res.status(500).json({
      error: 'Embedding rebuild failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      durationMs: duration,
    });
  }
}
