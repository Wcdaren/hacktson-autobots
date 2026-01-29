/**
 * Image Analyzer Module
 *
 * Provides AI-powered image analysis for product images using Claude AI
 * via AWS Bedrock. Generates rich, bilingual descriptions and extracts
 * visual attributes for improved search relevance.
 *
 * @example
 * ```typescript
 * // In medusa-config.ts
 * modules: [
 *   {
 *     resolve: "./src/modules/image-analyzer",
 *     options: {
 *       awsRegion: process.env.AWS_REGION || "us-east-1",
 *       bedrockModelId: process.env.BEDROCK_CLAUDE_MODEL_ID || "anthropic.claude-3-sonnet-20240229-v1:0",
 *     },
 *   },
 * ]
 * ```
 *
 * @example
 * ```typescript
 * // Using the module in a workflow or subscriber
 * const imageAnalyzerService = container.resolve(IMAGE_ANALYZER_MODULE)
 * const result = await imageAnalyzerService.analyzeProductImage(imageBuffer)
 * console.log(result.description_en, result.description_zh)
 * ```
 */

import { Module } from '@medusajs/framework/utils';
import ImageAnalyzerService from './service';

/**
 * Module identifier for dependency injection
 */
export const IMAGE_ANALYZER_MODULE = 'imageAnalyzer';

/**
 * Image Analyzer Module Definition
 *
 * Registers the Image Analyzer service with the Medusa container.
 */
export default Module(IMAGE_ANALYZER_MODULE, {
  service: ImageAnalyzerService,
});

export { ImageAnalyzerService };
export * from './types';
