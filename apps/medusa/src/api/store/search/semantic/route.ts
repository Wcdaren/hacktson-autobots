/**
 * Semantic Search API Endpoint
 * POST /store/search/semantic
 *
 * Performs semantic search using text embeddings
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { OPENSEARCH_MODULE } from '../../../../modules/opensearch';
import { EMBEDDING_MODULE } from '../../../../modules/embedding';
import type OpenSearchModuleService from '../../../../modules/opensearch/service';
import type EmbeddingService from '../../../../modules/embedding/service';

interface SemanticSearchBody {
  query: string;
  size?: number;
  filters?: Record<string, unknown>;
  minScore?: number;
}

export async function POST(req: MedusaRequest<SemanticSearchBody>, res: MedusaResponse) {
  const startTime = Date.now();

  try {
    const { query, size = 20, filters, minScore = 0 } = req.body;

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

    const embeddingService = req.scope.resolve<EmbeddingService>(EMBEDDING_MODULE);
    const opensearchService = req.scope.resolve<OpenSearchModuleService>(OPENSEARCH_MODULE);

    // Generate embedding for the query
    const embeddingResult = await embeddingService.generateTextEmbedding(query);

    // Perform semantic search
    const results = await opensearchService.semanticSearch(embeddingResult.embedding, {
      size,
      filters,
      minScore,
    });

    const responseTime = Date.now() - startTime;
    console.log(`Semantic search completed in ${responseTime}ms for query: "${query.substring(0, 50)}..."`);

    return res.json({
      results,
      meta: {
        query,
        total: results.length,
        responseTimeMs: responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`Semantic search failed after ${responseTime}ms:`, error);

    return res.status(500).json({
      error: 'Semantic search failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
