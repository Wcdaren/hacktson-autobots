/**
 * Admin API Route: POST /admin/opensearch/sync
 *
 * Triggers a full product reindex to OpenSearch.
 * This endpoint allows administrators to manually sync all products
 * to the OpenSearch index.
 *
 * @example
 * ```bash
 * # Sync all products (default pagination)
 * curl -X POST http://localhost:9000/admin/opensearch/sync \
 *   -H "Authorization: Bearer <token>" \
 *   -H "Content-Type: application/json"
 *
 * # Sync with custom pagination
 * curl -X POST http://localhost:9000/admin/opensearch/sync \
 *   -H "Authorization: Bearer <token>" \
 *   -H "Content-Type: application/json" \
 *   -d '{"limit": 50, "offset": 0}'
 * ```
 */

import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { MedusaError } from '@medusajs/framework/utils';
import { syncProductsWorkflow } from '../../../../workflows/sync-products';

/**
 * Request body type for the sync endpoint
 */
type SyncRequestBody = {
  /** Maximum number of products to sync (default: 100) */
  limit?: number;
  /** Number of products to skip for pagination (default: 0) */
  offset?: number;
};

/**
 * POST /admin/opensearch/sync
 *
 * Triggers a full product reindex to OpenSearch.
 * Accepts optional limit and offset parameters for pagination.
 *
 * @param req - Medusa request object
 * @param res - Medusa response object
 * @returns JSON response with sync status
 */
export async function POST(req: MedusaRequest<SyncRequestBody>, res: MedusaResponse): Promise<void> {
  try {
    const { limit = 100, offset = 0 } = (req.body as SyncRequestBody) || {};

    // Validate input parameters
    if (typeof limit !== 'number' || limit < 1) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Limit must be a positive number');
    }

    if (typeof offset !== 'number' || offset < 0) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Offset must be a non-negative number');
    }

    // Execute the sync workflow
    const { result } = await syncProductsWorkflow(req.scope).run({
      input: { limit, offset },
    });

    res.status(200).json({
      success: true,
      message: 'Product sync initiated successfully',
      data: {
        synced_count: result.products?.length || 0,
        limit,
        offset,
      },
    });
  } catch (error) {
    // Log the full error for debugging
    console.error('OpenSearch sync error:', error);

    // Re-throw MedusaErrors as-is
    if (error instanceof MedusaError) {
      throw error;
    }

    // Wrap unexpected errors with more details
    const errorMessage =
      error instanceof Error ? `${error.message}${error.stack ? `\nStack: ${error.stack}` : ''}` : 'Unknown error';

    throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, `Failed to sync products to OpenSearch: ${errorMessage}`);
  }
}
