/**
 * Multimodal Search API Endpoint
 * POST /store/search/multimodal
 *
 * Performs multimodal search combining text and/or image inputs.
 * Supports three search modes:
 * - Text-only: Natural language queries with intent extraction
 * - Image-only: Visual similarity search with AI-generated descriptions
 * - Mixed-modal: Combined text and image search with constraint filtering
 *
 * **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { MULTIMODAL_SEARCH_MODULE } from '../../../../modules/multimodal-search';
import type MultimodalSearchService from '../../../../modules/multimodal-search/service';
import type { MultimodalSearchBody } from './middlewares';

/**
 * POST /store/search/multimodal
 *
 * Performs multimodal search combining text and/or image inputs.
 *
 * Request body:
 * - query?: string - Text query (optional if image provided)
 * - image?: string - Base64 encoded image (optional if query provided)
 * - filters?: Record<string, unknown> - Optional filters
 * - size?: number - Number of results (1-100, default: 20)
 * - regionId?: string - Region ID for pricing
 * - keywordWeight?: number - Keyword search weight (0-1)
 * - semanticWeight?: number - Semantic search weight (0-1)
 *
 * Response:
 * - results: Array of search results with document, score, matchType
 * - intent: Extracted search intent
 * - facets: Facet aggregations for filtering
 * - meta: Search metadata (total, responseTimeMs, searchType, etc.)
 */
export async function POST(req: MedusaRequest<MultimodalSearchBody>, res: MedusaResponse) {
  const startTime = Date.now();

  try {
    const { query, image, filters, size, regionId, keywordWeight, semanticWeight } = req.validatedBody;

    // Resolve the multimodal search service
    const multimodalSearchService = req.scope.resolve<MultimodalSearchService>(MULTIMODAL_SEARCH_MODULE);

    // Convert base64 image to Buffer if provided
    let imageBuffer: Buffer | undefined;
    if (image) {
      try {
        // Handle both raw base64 and data URL format
        const base64Data = image.includes(',') ? image.split(',')[1] : image;
        imageBuffer = Buffer.from(base64Data, 'base64');
      } catch (error) {
        return res.status(400).json({
          error: 'Invalid image format',
          message: 'Image must be a valid base64 encoded string',
        });
      }
    }

    // Execute multimodal search
    const searchResponse = await multimodalSearchService.search({
      query: query?.trim(),
      image: imageBuffer,
      filters,
      size,
      regionId,
      keywordWeight,
      semanticWeight,
    });

    const responseTime = Date.now() - startTime;
    const queryPreview = query ? `"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` : '[image only]';
    console.log(`Multimodal search completed in ${responseTime}ms for: ${queryPreview}`);

    return res.json({
      results: searchResponse.results,
      intent: searchResponse.intent,
      facets: searchResponse.facets,
      meta: {
        query: query?.trim(),
        total: searchResponse.meta.total,
        responseTimeMs: responseTime,
        searchType: searchResponse.meta.searchType,
        extractedConstraints: searchResponse.meta.extractedConstraints,
        detectedLanguage: searchResponse.meta.detectedLanguage,
        usedAIEmbeddings: searchResponse.meta.usedAIEmbeddings,
        regionId,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`Multimodal search failed after ${responseTime}ms:`, error);

    // Check if it's a validation error (should be caught by middleware, but just in case)
    if (error instanceof Error && error.message.includes("At least one of 'query' or 'image'")) {
      return res.status(400).json({
        error: 'Invalid request',
        message: error.message,
      });
    }

    return res.status(500).json({
      error: 'Multimodal search failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      fallback_used: true,
    });
  }
}
