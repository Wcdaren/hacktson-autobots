/**
 * Sync Products Step
 *
 * Workflow step that indexes product data to OpenSearch.
 * Used by the syncProductsWorkflow to sync published products.
 *
 * @example
 * ```typescript
 * syncProductsStep({ products: publishedProducts })
 * ```
 */

import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { OPENSEARCH_MODULE } from '../../modules/opensearch';
import type OpenSearchModuleService from '../../modules/opensearch/service';

/**
 * Input type for the sync products step
 */
type SyncProductsStepInput = {
  /** Array of product documents to index */
  products: Record<string, unknown>[];
};

/**
 * Output type for the sync products step
 */
type SyncProductsStepOutput = {
  /** Number of products indexed */
  indexed: number;
};

/**
 * Step that indexes product data to OpenSearch
 *
 * This step takes an array of product documents and indexes them
 * to OpenSearch using the OpenSearch module service.
 *
 * @param input - Object containing products array to index
 * @returns StepResponse with the count of indexed products
 */
export const syncProductsStep = createStep(
  'sync-products-step',
  async ({ products }: SyncProductsStepInput, { container }): Promise<StepResponse<SyncProductsStepOutput>> => {
    if (products.length === 0) {
      return new StepResponse({ indexed: 0 });
    }

    const opensearchService: OpenSearchModuleService = container.resolve(OPENSEARCH_MODULE);
    await opensearchService.indexData(products);

    return new StepResponse({ indexed: products.length });
  },
);
