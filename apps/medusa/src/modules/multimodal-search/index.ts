/**
 * Multimodal Search Module
 *
 * Provides intelligent search capabilities by orchestrating multiple AI services
 * to understand user intent from text, images, or combined inputs. This module
 * combines image analysis, intent extraction, and search execution to deliver
 * highly relevant search results.
 *
 * @example
 * ```typescript
 * // In medusa-config.ts
 * modules: [
 *   {
 *     resolve: "./src/modules/multimodal-search",
 *     options: {
 *       defaultSize: 20,
 *       defaultKeywordWeight: 0.5,
 *       defaultSemanticWeight: 0.5,
 *       enableAIEmbeddings: true,
 *     },
 *   },
 * ]
 * ```
 *
 * @example
 * ```typescript
 * // Using the module in an API route
 * const multimodalSearchService = container.resolve(MULTIMODAL_SEARCH_MODULE)
 *
 * // Text-only search
 * const textResults = await multimodalSearchService.search({
 *   query: "comfortable blue sofa for small apartment",
 *   regionId: "reg_us",
 * })
 *
 * // Image-only search
 * const imageResults = await multimodalSearchService.search({
 *   image: imageBuffer,
 *   regionId: "reg_us",
 * })
 *
 * // Mixed-modal search (text + image)
 * const mixedResults = await multimodalSearchService.search({
 *   query: "like this but in blue",
 *   image: imageBuffer,
 *   regionId: "reg_us",
 * })
 * ```
 *
 * @example
 * ```typescript
 * // Response structure
 * {
 *   results: [
 *     {
 *       document: { id: "prod_123", title: "Blue Sofa", ... },
 *       score: 0.95,
 *       matchType: "mixed",
 *       similarityScore: 0.92,
 *       regionPrice: 99900,
 *       regionCurrency: "usd",
 *     },
 *     // ... more results
 *   ],
 *   intent: {
 *     original_query: "like this but in blue",
 *     detected_language: "en",
 *     visual_reference: "modern minimalist sofa",
 *     constraints: { colors: ["blue"] },
 *     search_type: "mixed_modal",
 *   },
 *   facets: {
 *     category_names: { field: "category_names", type: "value", data: [...] },
 *     // ... more facets
 *   },
 *   meta: {
 *     total: 42,
 *     responseTimeMs: 1250,
 *     searchType: "mixed_modal",
 *     extractedConstraints: { colors: ["blue"] },
 *     usedAIEmbeddings: true,
 *     detectedLanguage: "en",
 *   },
 * }
 * ```
 */

import { Module } from '@medusajs/framework/utils';
import MultimodalSearchService from './service';

/**
 * Module identifier for dependency injection
 */
export const MULTIMODAL_SEARCH_MODULE = 'multimodalSearch';

/**
 * Multimodal Search Module Definition
 *
 * Registers the Multimodal Search service with the Medusa container.
 * This module depends on:
 * - imageAnalyzer: For analyzing product and search images
 * - intentExtractor: For extracting structured intent from queries
 * - opensearch: For executing search queries
 * - embedding: For generating text embeddings
 */
export default Module(MULTIMODAL_SEARCH_MODULE, {
  service: MultimodalSearchService,
});

export { MultimodalSearchService };
export * from './types';
