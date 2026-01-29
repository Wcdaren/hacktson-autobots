/**
 * Generate AI Descriptions Step
 *
 * Workflow step that generates AI-powered descriptions for products using
 * Claude AI via the Image Analyzer service. Processes product thumbnails
 * to generate bilingual descriptions and extract visual attributes.
 *
 * Implements concurrency control to avoid overwhelming the API and
 * handles errors gracefully by skipping products that fail analysis.
 *
 * @example
 * ```typescript
 * generateAIDescriptionsStep({
 *   products: publishedProducts,
 *   concurrency: 3
 * })
 * ```
 *
 * _Requirements: 1.1, 8.5_
 */

import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { IMAGE_ANALYZER_MODULE } from '../../modules/image-analyzer';
import type ImageAnalyzerService from '../../modules/image-analyzer/service';

/** Default concurrency limit for AI analysis to avoid overwhelming the API */
const DEFAULT_CONCURRENCY = 3;

/**
 * Input type for the generate AI descriptions step
 */
export interface GenerateAIDescriptionsInput {
  /** Array of products with their thumbnails to analyze */
  products: Array<{
    id: string;
    thumbnail?: string | null;
  }>;
  /** Concurrency limit for parallel processing (default: 3) */
  concurrency?: number;
}

/**
 * Result of AI description generation for a single product
 */
export interface AIDescriptionResult {
  /** Product ID */
  product_id: string;
  /** AI-generated English description */
  ai_description_en: string;
  /** AI-generated Chinese description */
  ai_description_zh: string;
  /** Extracted color attributes */
  ai_colors: string[];
  /** Extracted material attributes */
  ai_materials: string[];
  /** Extracted design element keywords */
  ai_design_elements: string[];
  /** Style classification */
  ai_style: string;
  /** Timestamp when AI analysis was performed */
  ai_analysis_timestamp: string;
}

/**
 * Output type for the generate AI descriptions step
 */
export interface GenerateAIDescriptionsOutput {
  /** Successfully analyzed products with AI descriptions */
  results: AIDescriptionResult[];
  /** Product IDs that failed analysis */
  failed: string[];
}

/**
 * Download image from URL and return as Buffer
 * @param url - Image URL to download
 * @returns Buffer containing image data, or null if download fails
 */
async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MedusaAIDescriptionGenerator/1.0',
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
 * Process a single product to generate AI descriptions
 *
 * @param product - Product with thumbnail to analyze
 * @param imageAnalyzerService - Image Analyzer service instance
 * @returns AI description result or null if analysis fails
 */
async function processProduct(
  product: { id: string; thumbnail?: string | null },
  imageAnalyzerService: ImageAnalyzerService,
): Promise<AIDescriptionResult | null> {
  // Skip products without thumbnails
  if (!product.thumbnail) {
    console.log(`Skipping product ${product.id}: no thumbnail`);
    return null;
  }

  try {
    // Download the product thumbnail
    const imageBuffer = await downloadImage(product.thumbnail);
    if (!imageBuffer) {
      console.warn(`Failed to download thumbnail for product ${product.id}`);
      return null;
    }

    // Analyze the image using Claude AI
    const analysisResult = await imageAnalyzerService.analyzeProductImage(imageBuffer);

    // Build the AI description result
    const result: AIDescriptionResult = {
      product_id: product.id,
      ai_description_en: analysisResult.description_en,
      ai_description_zh: analysisResult.description_zh,
      ai_colors: analysisResult.attributes.colors,
      ai_materials: analysisResult.attributes.materials,
      ai_design_elements: analysisResult.attributes.design_elements,
      ai_style: analysisResult.attributes.style,
      ai_analysis_timestamp: new Date().toISOString(),
    };

    console.log(
      `Generated AI description for product ${product.id}: ` +
        `colors=[${result.ai_colors.slice(0, 3).join(', ')}], ` +
        `style=${result.ai_style}`,
    );

    return result;
  } catch (error) {
    console.error(`Failed to generate AI description for product ${product.id}:`, error);
    return null;
  }
}

/**
 * Step that generates AI descriptions for product images
 *
 * This step takes an array of products with thumbnails and generates
 * AI-powered descriptions using Claude AI via the Image Analyzer service.
 *
 * Features:
 * - Bilingual descriptions (English and Chinese)
 * - Visual attribute extraction (colors, materials, style, design elements)
 * - Concurrency control to avoid overwhelming the API
 * - Graceful error handling (skips products that fail analysis)
 * - Async processing to avoid blocking the indexing workflow
 *
 * @param input - Object containing products array and concurrency option
 * @returns StepResponse with AI description results and failed product IDs
 *
 * _Requirements: 1.1, 8.5_
 */
export const generateAIDescriptionsStep = createStep(
  'generate-ai-descriptions-step',
  async (
    { products, concurrency = DEFAULT_CONCURRENCY }: GenerateAIDescriptionsInput,
    { container },
  ): Promise<StepResponse<GenerateAIDescriptionsOutput>> => {
    // Return early if no products to process
    if (products.length === 0) {
      return new StepResponse({
        results: [],
        failed: [],
      });
    }

    // Filter products that have thumbnails
    const productsWithThumbnails = products.filter(
      (product) => product.thumbnail && typeof product.thumbnail === 'string',
    );

    // Track products without thumbnails as skipped (not failed)
    const productsWithoutThumbnails = products
      .filter((product) => !product.thumbnail || typeof product.thumbnail !== 'string')
      .map((product) => product.id);

    if (productsWithoutThumbnails.length > 0) {
      console.log(`Skipping ${productsWithoutThumbnails.length} products without thumbnails`);
    }

    if (productsWithThumbnails.length === 0) {
      return new StepResponse({
        results: [],
        failed: [],
      });
    }

    console.log(
      `Generating AI descriptions for ${productsWithThumbnails.length} products ` +
        `with concurrency ${concurrency}...`,
    );

    // Resolve the Image Analyzer service
    const imageAnalyzerService: ImageAnalyzerService = container.resolve(IMAGE_ANALYZER_MODULE);

    // Process products in batches with concurrency control
    const processResults = await processInBatches(productsWithThumbnails, concurrency, async (product) => {
      const result = await processProduct(product, imageAnalyzerService);
      return { product, result };
    });

    // Separate successful results from failures
    const results: AIDescriptionResult[] = [];
    const failed: string[] = [];

    for (const { product, result } of processResults) {
      if (result) {
        results.push(result);
      } else {
        failed.push(product.id);
      }
    }

    console.log(`AI description generation complete: ` + `${results.length} successful, ${failed.length} failed`);

    return new StepResponse({
      results,
      failed,
    });
  },
);

export default generateAIDescriptionsStep;
