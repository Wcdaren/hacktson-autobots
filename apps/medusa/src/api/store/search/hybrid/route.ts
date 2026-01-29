/**
 * Hybrid Search API Endpoint
 * POST /store/search/hybrid
 *
 * Performs hybrid search combining keyword matching and semantic similarity.
 * Now includes facet aggregations for filtering UI.
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { OPENSEARCH_MODULE } from '../../../../modules/opensearch';
import { EMBEDDING_MODULE } from '../../../../modules/embedding';
import type OpenSearchModuleService from '../../../../modules/opensearch/service';
import type EmbeddingService from '../../../../modules/embedding/service';

interface HybridSearchBody {
  query: string;
  size?: number;
  filters?: Record<string, unknown>;
  keywordWeight?: number;
  semanticWeight?: number;
  /** Region ID for region-aware pricing (e.g., "reg_us", "reg_eu") */
  regionId?: string;
}

export async function POST(req: MedusaRequest<HybridSearchBody>, res: MedusaResponse) {
  const startTime = Date.now();

  try {
    const { query, size = 20, filters, keywordWeight = 0.5, semanticWeight = 0.5, regionId } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Query is required and must be a string',
      });
    }

    if (query.length > 1000) {
      return res.status(400).json({
        error: 'Query must be less than 1000 characters',
      });
    }

    // Validate weights
    if (keywordWeight < 0 || keywordWeight > 1 || semanticWeight < 0 || semanticWeight > 1) {
      return res.status(400).json({
        error: 'Weights must be between 0 and 1',
      });
    }

    const embeddingService = req.scope.resolve<EmbeddingService>(EMBEDDING_MODULE);
    const opensearchService = req.scope.resolve<OpenSearchModuleService>(OPENSEARCH_MODULE);

    // Generate embedding for the query
    const embeddingResult = await embeddingService.generateTextEmbedding(query);

    // Perform hybrid search with facets
    const { results, facets, total } = await opensearchService.hybridSearchWithFacets(
      query,
      embeddingResult.embedding,
      {
        size,
        filters,
        keywordWeight,
        semanticWeight,
        regionId,
      },
    );

    const responseTime = Date.now() - startTime;
    console.log(`Hybrid search completed in ${responseTime}ms for query: "${query.substring(0, 50)}..."`);

    return res.json({
      results,
      facets,
      meta: {
        query,
        total,
        responseTimeMs: responseTime,
        weights: { keyword: keywordWeight, semantic: semanticWeight },
        regionId,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`Hybrid search failed after ${responseTime}ms:`, error);

    return res.status(500).json({
      error: 'Hybrid search failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
