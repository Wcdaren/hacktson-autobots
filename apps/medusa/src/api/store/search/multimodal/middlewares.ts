/**
 * Multimodal Search API Middlewares
 *
 * Defines Zod validation schemas and middleware configuration for the
 * multimodal search endpoint.
 *
 * POST /store/search/multimodal
 */

import { z } from 'zod';
import { defineMiddlewares, validateAndTransformBody } from '@medusajs/framework/http';
import type { MiddlewareRoute } from '@medusajs/framework/http';

/**
 * Zod schema for multimodal search request validation
 *
 * Validates:
 * - At least one of 'query' or 'image' must be provided
 * - query: optional string for text search
 * - image: optional base64 encoded image string
 * - filters: optional record of filter values
 * - size: optional positive integer (1-100)
 * - regionId: optional string for region-aware pricing
 * - keywordWeight: optional number between 0 and 1
 * - semanticWeight: optional number between 0 and 1
 *
 * **Validates: Requirements 6.1, 6.2**
 */
export const MultimodalSearchSchema = z
  .object({
    /** Text query (optional if image provided) */
    query: z.string().max(1000, 'Query must be less than 1000 characters').optional(),
    /** Base64 encoded image (optional if query provided) */
    image: z.string().optional(),
    /** Optional filters to apply to search results */
    filters: z.record(z.unknown()).optional(),
    /** Number of results to return (1-100, default: 20) */
    size: z.number().int().positive().max(100).optional(),
    /** Region ID for region-aware pricing */
    regionId: z.string().optional(),
    /** Weight for keyword search (0-1) */
    keywordWeight: z.number().min(0).max(1).optional(),
    /** Weight for semantic search (0-1) */
    semanticWeight: z.number().min(0).max(1).optional(),
  })
  .refine((data) => data.query?.trim() || data.image, {
    message: "At least one of 'query' or 'image' must be provided",
  });

/**
 * Inferred type from the Zod schema for use in route handlers
 */
export type MultimodalSearchBody = z.infer<typeof MultimodalSearchSchema>;

/**
 * Middleware routes for multimodal search endpoint
 */
export const multimodalSearchMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/store/search/multimodal',
    method: 'POST',
    middlewares: [validateAndTransformBody(MultimodalSearchSchema)],
  },
];
