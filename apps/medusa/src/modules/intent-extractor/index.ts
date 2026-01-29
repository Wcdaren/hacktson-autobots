/**
 * Intent Extractor Module
 *
 * Provides AI-powered query intent extraction using Claude AI via AWS Bedrock.
 * Extracts structured search parameters from natural language queries in both
 * Chinese and English, enabling intelligent product search.
 *
 * @example
 * ```typescript
 * // In medusa-config.ts
 * modules: [
 *   {
 *     resolve: "./src/modules/intent-extractor",
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
 * // Using the module in a workflow or API route
 * const intentExtractorService = container.resolve(INTENT_EXTRACTOR_MODULE)
 * const intent = await intentExtractorService.extractIntent("找一个蓝色的沙发，价格在1000以下")
 * console.log(intent.constraints) // { colors: ["blue"], price_max: 1000 }
 * ```
 */

import { Module } from '@medusajs/framework/utils';
import IntentExtractorService from './service';

/**
 * Module identifier for dependency injection
 */
export const INTENT_EXTRACTOR_MODULE = 'intentExtractor';

/**
 * Intent Extractor Module Definition
 *
 * Registers the Intent Extractor service with the Medusa container.
 */
export default Module(INTENT_EXTRACTOR_MODULE, {
  service: IntentExtractorService,
});

export { IntentExtractorService };
export * from './types';
