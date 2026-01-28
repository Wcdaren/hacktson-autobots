/**
 * Image Search API Endpoint
 * POST /store/search/image
 *
 * Performs image search using image embeddings
 */

import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { OPENSEARCH_MODULE } from '../../../../modules/opensearch';
import { EMBEDDING_MODULE } from '../../../../modules/embedding';
import type OpenSearchModuleService from '../../../../modules/opensearch/service';
import type EmbeddingService from '../../../../modules/embedding/service';

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface ImageSearchBody {
  image: string; // Base64 encoded image
  size?: number;
  filters?: Record<string, unknown>;
  minScore?: number;
}

export async function POST(req: MedusaRequest<ImageSearchBody>, res: MedusaResponse) {
  const startTime = Date.now();

  try {
    const { image, size = 20, filters, minScore = 0 } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        error: 'Image is required and must be a base64 encoded string',
      });
    }

    // Parse base64 image
    const matches = image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({
        error: 'Invalid image format. Expected base64 data URL',
      });
    }

    const [, mimeType, base64Data] = matches;

    // Validate mime type
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return res.status(400).json({
        error: `Invalid image type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
      });
    }

    // Decode and validate size
    const imageBuffer = Buffer.from(base64Data, 'base64');
    if (imageBuffer.length > MAX_FILE_SIZE) {
      return res.status(400).json({
        error: `Image size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      });
    }

    const embeddingService = req.scope.resolve<EmbeddingService>(EMBEDDING_MODULE);
    const opensearchService = req.scope.resolve<OpenSearchModuleService>(OPENSEARCH_MODULE);

    // Generate embedding for the image
    const embeddingResult = await embeddingService.generateImageEmbedding(imageBuffer);

    // Perform image search
    const results = await opensearchService.imageSearch(embeddingResult.embedding, {
      size,
      filters,
      minScore,
    });

    const responseTime = Date.now() - startTime;
    console.log(
      `Image search completed in ${responseTime}ms, detected labels: ${embeddingResult.labels.slice(0, 5).join(', ')}`,
    );

    return res.json({
      results,
      meta: {
        detectedLabels: embeddingResult.labels,
        total: results.length,
        responseTimeMs: responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`Image search failed after ${responseTime}ms:`, error);

    return res.status(500).json({
      error: 'Image search failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
