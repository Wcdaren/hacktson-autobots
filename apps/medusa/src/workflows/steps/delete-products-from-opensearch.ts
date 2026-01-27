/**
 * Delete Products from OpenSearch Step
 *
 * Workflow step that removes product data from OpenSearch index.
 * Used by the syncProductsWorkflow to remove unpublished or deleted products.
 *
 * @example
 * ```typescript
 * deleteProductsFromOpenSearchStep({ ids: unpublishedProductIds })
 * ```
 */

import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { OPENSEARCH_MODULE } from '../../modules/opensearch';
import type OpenSearchModuleService from '../../modules/opensearch/service';

/**
 * Input type for the delete products step
 */
type DeleteProductsStepInput = {
  /** Array of product IDs to delete from the index */
  ids: string[];
};

/**
 * Output type for the delete products step
 */
type DeleteProductsStepOutput = {
  /** Number of products deleted from the index */
  deleted: number;
};

/**
 * Step that deletes product data from OpenSearch
 *
 * This step takes an array of product IDs and removes them
 * from the OpenSearch index using the OpenSearch module service.
 *
 * @param input - Object containing product IDs to delete
 * @returns StepResponse with the count of deleted products
 */
export const deleteProductsFromOpenSearchStep = createStep(
  'delete-products-from-opensearch-step',
  async ({ ids }: DeleteProductsStepInput, { container }): Promise<StepResponse<DeleteProductsStepOutput>> => {
    if (ids.length === 0) {
      return new StepResponse({ deleted: 0 });
    }

    const opensearchService: OpenSearchModuleService = container.resolve(OPENSEARCH_MODULE);
    await opensearchService.deleteFromIndex(ids);

    return new StepResponse({ deleted: ids.length });
  },
);
