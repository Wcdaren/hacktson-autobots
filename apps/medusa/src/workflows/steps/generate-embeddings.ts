/**
 * Generate Embeddings Step
 *
 * Workflow step that generates text and image embeddings for products.
 * Used by the syncProductsWorkflow to add semantic search capabilities.
 *
 * @example
 * ```typescript
 * generateEmbeddingsStep({ products: publishedProducts, generateImageEmbeddings: true })
 * ```
 */

import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { EMBEDDING_MODULE } from '../../modules/embedding';
import type EmbeddingService from '../../modules/embedding/service';

/** Concurrency limit for image downloads to avoid overwhelming external servers */
const IMAGE_DOWNLOAD_CONCURRENCY = 3;

/**
 * Download image from URL and return as Buffer
 * @param url - Image URL to download
 * @returns Buffer containing image data, or null if download fails
 */
async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MedusaOpenSearchSync/1.0',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to download image from ${url}: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) {
      console.warn(`Invalid content type for ${url}: ${contentType}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.warn(`Error downloading image from ${url}:`, error);
    return null;
  }
}

/**
 * Process items in batches with concurrency control
 */
async function processInBatches<T, R>(items: T[], batchSize: number, processor: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }

  return results;
}

/**
 * Input type for the generate embeddings step
 */
type GenerateEmbeddingsStepInput = {
  /** Array of product documents to generate embeddings for */
  products: Array<{
    id: string;
    title: string;
    description?: string | null;
    thumbnail?: string | null;
    category_names?: string[];
    tag_values?: string[];
    [key: string]: unknown;
  }>;
  /** Whether to generate image embeddings (requires thumbnail URLs) */
  generateImageEmbeddings?: boolean;
};

/**
 * Output type for the generate embeddings step
 */
type GenerateEmbeddingsStepOutput = {
  /** Products with embeddings added */
  products: Array<Record<string, unknown>>;
  /** Number of text embeddings generated */
  textEmbeddingsGenerated: number;
  /** Number of image embeddings generated */
  imageEmbeddingsGenerated: number;
};

/**
 * Build searchable text from product fields
 */
function buildProductText(product: {
  title: string;
  description?: string | null;
  category_names?: string[];
  tag_values?: string[];
}): string {
  const parts: string[] = [product.title];

  if (product.description) {
    parts.push(product.description);
  }

  if (product.category_names && product.category_names.length > 0) {
    parts.push(product.category_names.join(', '));
  }

  if (product.tag_values && product.tag_values.length > 0) {
    parts.push(product.tag_values.join(', '));
  }

  return parts.join('. ');
}

/**
 * Step that generates embeddings for product data
 *
 * This step takes an array of product documents and generates
 * text embeddings (and optionally image embeddings) for semantic search.
 *
 * @param input - Object containing products array and options
 * @returns StepResponse with products including embeddings
 */
export const generateEmbeddingsStep = createStep(
  'generate-embeddings-step',
  async (
    { products, generateImageEmbeddings = false }: GenerateEmbeddingsStepInput,
    { container },
  ): Promise<StepResponse<GenerateEmbeddingsStepOutput>> => {
    if (products.length === 0) {
      return new StepResponse({
        products: [],
        textEmbeddingsGenerated: 0,
        imageEmbeddingsGenerated: 0,
      });
    }

    const embeddingService: EmbeddingService = container.resolve(EMBEDDING_MODULE);

    // Build text for each product
    const productTexts = products.map((product) => buildProductText(product));

    // Generate text embeddings in batch
    let textEmbeddings: Array<{ embedding: number[] }> = [];
    try {
      textEmbeddings = await embeddingService.batchGenerateTextEmbeddings(productTexts);
    } catch (error) {
      console.error('Failed to generate text embeddings:', error);
      // Continue without embeddings if generation fails
      textEmbeddings = products.map(() => ({ embedding: [] }));
    }

    // Add text embeddings to products (use Record type to allow adding image_embedding later)
    const productsWithEmbeddings: Array<Record<string, unknown>> = products.map((product, index) => ({
      ...product,
      text_embedding: textEmbeddings[index]?.embedding || [],
      embedding_updated_at: new Date().toISOString(),
    }));

    // Generate image embeddings if enabled
    let imageEmbeddingsGenerated = 0;

    if (generateImageEmbeddings) {
      console.log(`Generating image embeddings for ${products.length} products...`);

      // Process products with thumbnails
      const productsWithThumbnails = productsWithEmbeddings
        .map((product, index) => ({ product, index }))
        .filter(({ product }) => product.thumbnail && typeof product.thumbnail === 'string');

      if (productsWithThumbnails.length > 0) {
        const imageResults = await processInBatches(
          productsWithThumbnails,
          IMAGE_DOWNLOAD_CONCURRENCY,
          async ({ product, index }) => {
            try {
              const imageBuffer = await downloadImage(product.thumbnail as string);
              if (!imageBuffer) {
                return { index, embedding: null };
              }

              const result = await embeddingService.generateImageEmbedding(imageBuffer);
              console.log(
                `Generated image embedding for product ${product.id}, labels: ${result.labels.slice(0, 5).join(', ')}`,
              );
              return { index, embedding: result.embedding };
            } catch (error) {
              console.warn(`Failed to generate image embedding for product ${product.id}:`, error);
              return { index, embedding: null };
            }
          },
        );

        // Apply image embeddings to products
        for (const { index, embedding } of imageResults) {
          if (embedding) {
            productsWithEmbeddings[index].image_embedding = embedding;
            imageEmbeddingsGenerated++;
          }
        }
      }

      console.log(`Generated ${imageEmbeddingsGenerated} image embeddings`);
    }

    return new StepResponse({
      products: productsWithEmbeddings,
      textEmbeddingsGenerated: textEmbeddings.filter((e) => e.embedding.length > 0).length,
      imageEmbeddingsGenerated,
    });
  },
);
