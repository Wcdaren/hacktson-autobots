/**
 * OpenSearch Module
 *
 * A custom Medusa module for indexing product data to OpenSearch.
 * This module handles data synchronization only - search queries go directly
 * from the frontend to OpenSearch using Elastic Search UI.
 *
 * @example
 * ```typescript
 * // In medusa-config.ts
 * modules: [
 *   {
 *     resolve: "./src/modules/opensearch",
 *     options: {
 *       host: process.env.OPENSEARCH_HOST || "http://localhost:9200",
 *       productIndexName: process.env.OPENSEARCH_PRODUCT_INDEX || "products",
 *     },
 *   },
 * ]
 * ```
 *
 * @example
 * ```typescript
 * // Using the module in a workflow or subscriber
 * const opensearchService = container.resolve(OPENSEARCH_MODULE)
 * await opensearchService.indexData(products)
 * ```
 */

import { Module } from '@medusajs/framework/utils';
import OpenSearchModuleService from './service';

/**
 * Module identifier for dependency injection
 */
export const OPENSEARCH_MODULE = 'opensearch';

/**
 * OpenSearch Module Definition
 *
 * Registers the OpenSearch service with the Medusa container.
 */
export default Module(OPENSEARCH_MODULE, {
  service: OpenSearchModuleService,
});
