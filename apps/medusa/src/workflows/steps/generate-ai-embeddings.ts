/**
 * Generate AI Embeddings Step
 *
 * Workflow step that generates embeddings from AI-generated descriptions.
 * Creates three types of embeddings for enhanced semantic search:
 * - ai_text_embedding_en: From English AI description
 * - ai_text_embedding_zh: From Chinese AI description
 * - ai_combined_embedding: From combined description + attributes
 *
 * @example
 * ```typescript
 * generateAIEmbeddingsStep({
 *   aiDescriptions: aiDescriptionResults,
 *   concurrency: 3
 * })
 * ```
 *
 * _Requirements: 1.4_
 */

import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { EMBEDDING_MODULE } from '../../modules/embedding';
import type EmbeddingService from '../../modules/embedding/service';
import type { AIDescriptionResult } from './generate-ai-descriptions';

/** Default concurrency limit for embedding generation */
const DEFAULT_CONCURRENCY = 5;

/**
 * Input type for the generate AI embeddings step
 */
export interface GenerateAIEmbeddingsInput {
  /** Array of AI description results from the previous step */
  aiDescriptions: AIDescriptionResult[];
  /** Concurrency limit for parallel processing (default: 5) */
  concurrency?: number;
}

/**
 * Result of AI embedding generation for a single product
 */
export interface AIEmbeddingResult {
  /** Product ID */
  product_id: string;
  /** Embedding from English AI description */
  ai_text_embedding_en: number[];
  /** Embedding from Chinese AI description */
  ai_text_embedding_zh: number[];
  /** Combined embedding from full AI analysis */
  ai_combined_embedding: number[];
}

/**
 * Output type for the generate AI embeddings step
 */
export interface GenerateAIEmbeddingsOutput {
  /** Successfully generated embeddings */
  results: AIEmbeddingResult[];
  /** Product IDs that failed embedding generation */
  failed: string[];
}

/**
 * Build combined text from AI description and attributes for embedding
 * Creates a rich text representation combining all AI-extracted information
 *
 * @param description - AI description result
 * @returns Combined text for embedding generation
 */
function buildCombinedText(description: AIDescriptionResult): string {
  const parts: string[] = [];

  // Add both language descriptions
  if (description.ai_description_en) {
    parts.push(description.ai_description_en);
  }
  if (description.ai_description_zh) {
    parts.push(description.ai_description_zh);
  }

  // Add style
  if (description.ai_style) {
    parts.push(`Style: ${description.ai_style}`);
  }

  // Add colors
  if (description.ai_colors && description.ai_colors.length > 0) {
    parts.push(`Colors: ${description.ai_colors.join(', ')}`);
  }

  // Add materials
  if (description.ai_materials && description.ai_materials.length > 0) {
    parts.push(`Materials: ${description.ai_materials.join(', ')}`);
  }

  // Add design elements
  if (description.ai_design_elements && description.ai_design_elements.length > 0) {
    parts.push(`Design elements: ${description.ai_design_elements.join(', ')}`);
  }

  return parts.join('. ');
}

/**
 * Process items in batches with concurrency control
 * Processes items in parallel batches to avoid overwhelming external APIs
 *
 * @param items - Array of items to process
 * @param batchSize - Number of items to process in parallel
 * @param processor - Async function to process each item
 * @returns Array of processed results
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
 * Process a single AI description to generate embeddings
 *
 * @param description - AI description result to process
 * @param embeddingService - Embedding service instance
 * @returns AI embedding result or null if generation fails
 */
async function processDescription(
  description: AIDescriptionResult,
  embeddingService: EmbeddingService,
): Promise<AIEmbeddingResult | null> {
  try {
    // Generate all three embeddings in parallel for efficiency
    const [enEmbedding, zhEmbedding, combinedEmbedding] = await Promise.all([
      // English description embedding
      embeddingService.generateTextEmbedding(description.ai_description_en || ''),
      // Chinese description embedding
      embeddingService.generateTextEmbedding(description.ai_description_zh || ''),
      // Combined embedding from full AI analysis
      embeddingService.generateTextEmbedding(buildCombinedText(description)),
    ]);

    const result: AIEmbeddingResult = {
      product_id: description.product_id,
      ai_text_embedding_en: enEmbedding.embedding,
      ai_text_embedding_zh: zhEmbedding.embedding,
      ai_combined_embedding: combinedEmbedding.embedding,
    };

    console.log(
      `Generated AI embeddings for product ${description.product_id}: ` +
        `en=${enEmbedding.embedding.length}d, ` +
        `zh=${zhEmbedding.embedding.length}d, ` +
        `combined=${combinedEmbedding.embedding.length}d`,
    );

    return result;
  } catch (error) {
    console.error(`Failed to generate AI embeddings for product ${description.product_id}:`, error);
    return null;
  }
}

/**
 * Step that generates embeddings from AI descriptions
 *
 * This step takes AI description results from the previous step and generates
 * three types of embeddings for each product:
 * - ai_text_embedding_en: Embedding from English description for English queries
 * - ai_text_embedding_zh: Embedding from Chinese description for Chinese queries
 * - ai_combined_embedding: Combined embedding for mixed-modal and image searches
 *
 * Features:
 * - Parallel embedding generation for efficiency
 * - Concurrency control to avoid overwhelming the API
 * - Graceful error handling (skips products that fail)
 *
 * @param input - Object containing AI descriptions and concurrency option
 * @returns StepResponse with embedding results and failed product IDs
 *
 * _Requirements: 1.4_
 */
export const generateAIEmbeddingsStep = createStep(
  'generate-ai-embeddings-step',
  async (
    { aiDescriptions, concurrency = DEFAULT_CONCURRENCY }: GenerateAIEmbeddingsInput,
    { container },
  ): Promise<StepResponse<GenerateAIEmbeddingsOutput>> => {
    // Return early if no descriptions to process
    if (aiDescriptions.length === 0) {
      return new StepResponse({
        results: [],
        failed: [],
      });
    }

    console.log(
      `Generating AI embeddings for ${aiDescriptions.length} products ` + `with concurrency ${concurrency}...`,
    );

    // Resolve the Embedding service
    const embeddingService: EmbeddingService = container.resolve(EMBEDDING_MODULE);

    // Process descriptions in batches with concurrency control
    const processResults = await processInBatches(aiDescriptions, concurrency, async (description) => {
      const result = await processDescription(description, embeddingService);
      return { description, result };
    });

    // Separate successful results from failures
    const results: AIEmbeddingResult[] = [];
    const failed: string[] = [];

    for (const { description, result } of processResults) {
      if (result) {
        results.push(result);
      } else {
        failed.push(description.product_id);
      }
    }

    console.log(`AI embedding generation complete: ` + `${results.length} successful, ${failed.length} failed`);

    return new StepResponse({
      results,
      failed,
    });
  },
);

export default generateAIEmbeddingsStep;
