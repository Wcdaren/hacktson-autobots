/**
 * Embedding Status API Endpoint
 * GET /admin/opensearch/embeddings
 *
 * Returns the status of embeddings in the OpenSearch index
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { OPENSEARCH_MODULE } from '../../../../modules/opensearch';
import type OpenSearchModuleService from '../../../../modules/opensearch/service';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const opensearchService = req.scope.resolve<OpenSearchModuleService>(OPENSEARCH_MODULE);

    // Get total document count
    const totalDocuments = await opensearchService.getDocumentCount('product');

    // Check health
    const isHealthy = await opensearchService.healthCheck();

    return res.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      index: {
        totalDocuments,
        // Note: Getting embedding counts would require a custom query
        // This is a simplified status endpoint
      },
      message: isHealthy
        ? 'OpenSearch is healthy and ready for semantic search'
        : 'OpenSearch connection issues detected',
    });
  } catch (error) {
    console.error('Failed to get embedding status:', error);

    return res.status(500).json({
      error: 'Failed to get embedding status',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
