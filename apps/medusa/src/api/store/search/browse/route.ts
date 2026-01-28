/**
 * Browse Products API Endpoint
 * POST /store/search/browse
 *
 * Returns all products from OpenSearch without requiring a search query.
 * Used for product listing pages when no search term is provided.
 * Now includes facet aggregations for filtering UI.
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { OPENSEARCH_MODULE } from '../../../../modules/opensearch';
import type OpenSearchModuleService from '../../../../modules/opensearch/service';

interface BrowseProductsBody {
  size?: number;
  from?: number;
  filters?: Record<string, unknown>;
  sort?: { field: string; order: 'asc' | 'desc' };
}

export async function POST(req: MedusaRequest<BrowseProductsBody>, res: MedusaResponse) {
  const startTime = Date.now();

  try {
    const { size = 20, from = 0, filters, sort } = req.body;

    const opensearchService = req.scope.resolve<OpenSearchModuleService>(OPENSEARCH_MODULE);

    // Perform browse query with facets
    const { results, facets, total } = await opensearchService.browseProductsWithFacets({
      size,
      from,
      filters,
      sort,
    });

    const responseTime = Date.now() - startTime;
    console.log(`Browse products completed in ${responseTime}ms, returned ${results.length} products`);

    return res.json({
      results,
      facets,
      meta: {
        total,
        responseTimeMs: responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`Browse products failed after ${responseTime}ms:`, error);

    return res.status(500).json({
      error: 'Browse products failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
