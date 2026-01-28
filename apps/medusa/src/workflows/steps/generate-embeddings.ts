/**
 * Generate Embeddings Step
 *
 * Workflow step that generates text and image embeddings for products.
 * Used by the syncProductsWorkflow to add semantic search capabilities.
 *
 * @example
 * ```typescript
 * generateEmbeddingsStep({ products: publishedProducts })
 * ```
 */

import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { EMBEDDING_MODULE } from '../../modules/embedding';
import type EmbeddingService from '../../modules/embedding/service';

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

    // Add embeddings to products
    const productsWithEmbeddings = products.map((product, index) => ({
      ...product,
      text_embedding: textEmbeddings[index]?.embedding || [],
      embedding_updated_at: new Date().toISOString(),
    }));

    // TODO: Image embedding generation would require fetching images from URLs
    // This is left as a future enhancement since it requires HTTP requests
    // and may significantly slow down the sync process

    return new StepResponse({
      products: productsWithEmbeddings,
      textEmbeddingsGenerated: textEmbeddings.filter((e) => e.embedding.length > 0).length,
      imageEmbeddingsGenerated: 0,
    });
  },
);
