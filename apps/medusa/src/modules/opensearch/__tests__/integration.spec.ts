/**
 * OpenSearch Module Integration Tests
 *
 * Integration tests for the OpenSearch module including:
 * - Sync workflow execution (via service integration)
 * - Event subscribers configuration verification
 * - Admin sync endpoint behavior
 *
 * These tests verify that components work together correctly
 * by mocking external dependencies (OpenSearch) while testing
 * the integration between workflows, subscribers, and services.
 *
 * Note: Due to Medusa's workflow SDK requiring a full runtime environment,
 * we test the integration at the service level and verify subscriber/route
 * configurations through file system checks rather than direct imports.
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenSearchModuleService from '../service';
import type { OpenSearchModuleOptions } from '../types';

// Mock the OpenSearch client
const mockBulk = jest.fn();
const mockDeleteByQuery = jest.fn();
const mockIndicesExists = jest.fn();
const mockIndicesCreate = jest.fn();
const mockClusterHealth = jest.fn();

jest.mock('@opensearch-project/opensearch', () => ({
  Client: jest.fn().mockImplementation(() => ({
    bulk: mockBulk,
    deleteByQuery: mockDeleteByQuery,
    indices: {
      exists: mockIndicesExists,
      create: mockIndicesCreate,
    },
    cluster: {
      health: mockClusterHealth,
    },
  })),
}));

describe('OpenSearch Module Integration Tests', () => {
  const defaultOptions: OpenSearchModuleOptions = {
    host: 'http://localhost:9200',
    productIndexName: 'test-products',
  };

  let opensearchService: OpenSearchModuleService;

  beforeEach(() => {
    jest.clearAllMocks();
    opensearchService = new OpenSearchModuleService({}, defaultOptions);

    // Default mock responses
    mockIndicesExists.mockResolvedValue({ body: true });
    mockBulk.mockResolvedValue({ body: { errors: false, items: [] } });
    mockDeleteByQuery.mockResolvedValue({ body: { deleted: 0 } });
    mockClusterHealth.mockResolvedValue({ body: { status: 'green' } });
  });

  describe('18.1 Sync Workflow Execution', () => {
    describe('syncProductsWorkflow integration with OpenSearch service', () => {
      it('should correctly call OpenSearch service when syncing products', async () => {
        // Arrange
        const products = [
          {
            id: 'prod_123',
            title: 'Test Product',
            description: 'A test product',
            handle: 'test-product',
            thumbnail: 'https://example.com/image.jpg',
            category_ids: ['cat_1'],
            category_names: ['Category 1'],
            collection_ids: ['col_1'],
            collection_names: ['Collection 1'],
            tag_ids: ['tag_1'],
            tag_values: ['Tag 1'],
            price: 29.99,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ];

        // Act
        await opensearchService.indexData(products);

        // Assert
        expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
        expect(mockBulk).toHaveBeenCalledWith({
          body: [{ index: { _index: 'test-products', _id: 'prod_123' } }, products[0]],
          refresh: true,
        });
      });

      it('should handle empty product list gracefully', async () => {
        // Arrange
        const emptyProducts: Record<string, unknown>[] = [];

        // Act
        await opensearchService.indexData(emptyProducts);

        // Assert
        expect(mockBulk).not.toHaveBeenCalled();
        expect(mockIndicesExists).not.toHaveBeenCalled();
      });

      it('should handle errors gracefully when bulk indexing fails', async () => {
        // Arrange
        const products = [{ id: 'prod_123', title: 'Test Product' }];
        mockBulk.mockResolvedValue({
          body: {
            errors: true,
            items: [
              {
                index: {
                  _id: 'prod_123',
                  error: {
                    type: 'mapper_parsing_exception',
                    reason: 'failed to parse field',
                  },
                },
              },
            ],
          },
        });

        // Act & Assert
        await expect(opensearchService.indexData(products)).rejects.toThrow(
          'Failed to index 1 documents to OpenSearch',
        );
      });

      it('should create index with proper mapping when index does not exist', async () => {
        // Arrange
        const products = [{ id: 'prod_123', title: 'Test Product' }];
        mockIndicesExists.mockResolvedValue({ body: false });
        mockIndicesCreate.mockResolvedValue({ body: {} });

        // Act
        await opensearchService.indexData(products);

        // Assert
        expect(mockIndicesCreate).toHaveBeenCalledWith({
          index: 'test-products',
          body: {
            mappings: {
              properties: expect.objectContaining({
                id: { type: 'keyword' },
                title: expect.objectContaining({ type: 'text' }),
                price: { type: 'float' },
              }),
            },
          },
        });
      });

      it('should handle multiple products in a single sync operation', async () => {
        // Arrange
        const products = [
          { id: 'prod_1', title: 'Product 1', price: 10.0 },
          { id: 'prod_2', title: 'Product 2', price: 20.0 },
          { id: 'prod_3', title: 'Product 3', price: 30.0 },
        ];

        // Act
        await opensearchService.indexData(products);

        // Assert
        expect(mockBulk).toHaveBeenCalledWith({
          body: [
            { index: { _index: 'test-products', _id: 'prod_1' } },
            products[0],
            { index: { _index: 'test-products', _id: 'prod_2' } },
            products[1],
            { index: { _index: 'test-products', _id: 'prod_3' } },
            products[2],
          ],
          refresh: true,
        });
      });

      it('should handle products with all fields correctly', async () => {
        // Arrange
        const fullProduct = {
          id: 'prod_full',
          title: 'Full Product',
          description: 'Complete product with all fields',
          handle: 'full-product',
          thumbnail: 'https://example.com/image.jpg',
          category_ids: ['cat_1', 'cat_2'],
          category_names: ['Category 1', 'Category 2'],
          collection_ids: ['col_1'],
          collection_names: ['Collection 1'],
          tag_ids: ['tag_1', 'tag_2'],
          tag_values: ['Tag 1', 'Tag 2'],
          price: 99.99,
          created_at: new Date('2024-01-01'),
          updated_at: new Date('2024-01-02'),
        };

        // Act
        await opensearchService.indexData([fullProduct]);

        // Assert
        expect(mockBulk).toHaveBeenCalledWith({
          body: [{ index: { _index: 'test-products', _id: 'prod_full' } }, fullProduct],
          refresh: true,
        });
      });
    });

    describe('deleteProductsFromOpenSearchStep integration', () => {
      it('should delete products from index when IDs are provided', async () => {
        // Arrange
        const ids = ['prod_1', 'prod_2'];

        // Act
        await opensearchService.deleteFromIndex(ids);

        // Assert
        expect(mockDeleteByQuery).toHaveBeenCalledWith({
          index: 'test-products',
          body: {
            query: {
              terms: {
                _id: ['prod_1', 'prod_2'],
              },
            },
          },
          refresh: true,
        });
      });

      it('should handle empty IDs array gracefully', async () => {
        // Arrange
        const emptyIds: string[] = [];

        // Act
        await opensearchService.deleteFromIndex(emptyIds);

        // Assert
        expect(mockDeleteByQuery).not.toHaveBeenCalled();
      });

      it('should not attempt delete when index does not exist', async () => {
        // Arrange
        const ids = ['prod_123'];
        mockIndicesExists.mockResolvedValue({ body: false });

        // Act
        await opensearchService.deleteFromIndex(ids);

        // Assert
        expect(mockDeleteByQuery).not.toHaveBeenCalled();
      });
    });

    describe('workflow file structure verification', () => {
      const workflowsDir = path.join(__dirname, '../../../workflows');

      it('should have sync-products.ts workflow file', () => {
        const workflowPath = path.join(workflowsDir, 'sync-products.ts');
        expect(fs.existsSync(workflowPath)).toBe(true);
      });

      it('should have sync-products step file', () => {
        const stepPath = path.join(workflowsDir, 'steps/sync-products.ts');
        expect(fs.existsSync(stepPath)).toBe(true);
      });

      it('should have delete-products-from-opensearch step file', () => {
        const stepPath = path.join(workflowsDir, 'steps/delete-products-from-opensearch.ts');
        expect(fs.existsSync(stepPath)).toBe(true);
      });

      it('sync-products workflow should import useQueryGraphStep', () => {
        const workflowPath = path.join(workflowsDir, 'sync-products.ts');
        const content = fs.readFileSync(workflowPath, 'utf-8');
        expect(content).toContain('useQueryGraphStep');
      });

      it('sync-products workflow should import syncProductsStep', () => {
        const workflowPath = path.join(workflowsDir, 'sync-products.ts');
        const content = fs.readFileSync(workflowPath, 'utf-8');
        expect(content).toContain('syncProductsStep');
      });

      it('sync-products workflow should import deleteProductsFromOpenSearchStep', () => {
        const workflowPath = path.join(workflowsDir, 'sync-products.ts');
        const content = fs.readFileSync(workflowPath, 'utf-8');
        expect(content).toContain('deleteProductsFromOpenSearchStep');
      });
    });
  });

  describe('18.2 Event Subscribers Trigger Correctly', () => {
    const subscribersDir = path.join(__dirname, '../../../subscribers');

    describe('product-sync subscriber configuration', () => {
      it('should have product-sync.ts subscriber file', () => {
        const subscriberPath = path.join(subscribersDir, 'product-sync.ts');
        expect(fs.existsSync(subscriberPath)).toBe(true);
      });

      it('should be configured to listen to product.created event', () => {
        const subscriberPath = path.join(subscribersDir, 'product-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('product.created');
      });

      it('should be configured to listen to product.updated event', () => {
        const subscriberPath = path.join(subscribersDir, 'product-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('product.updated');
      });

      it('should export a SubscriberConfig', () => {
        const subscriberPath = path.join(subscribersDir, 'product-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('export const config: SubscriberConfig');
      });

      it('should import syncProductsWorkflow', () => {
        const subscriberPath = path.join(subscribersDir, 'product-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('syncProductsWorkflow');
      });
    });

    describe('product-delete subscriber configuration', () => {
      it('should have product-delete.ts subscriber file', () => {
        const subscriberPath = path.join(subscribersDir, 'product-delete.ts');
        expect(fs.existsSync(subscriberPath)).toBe(true);
      });

      it('should be configured to listen to product.deleted event', () => {
        const subscriberPath = path.join(subscribersDir, 'product-delete.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('product.deleted');
      });

      it('should export a SubscriberConfig', () => {
        const subscriberPath = path.join(subscribersDir, 'product-delete.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('export const config: SubscriberConfig');
      });

      it('should import OPENSEARCH_MODULE', () => {
        const subscriberPath = path.join(subscribersDir, 'product-delete.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('OPENSEARCH_MODULE');
      });

      it('should call deleteFromIndex method', () => {
        const subscriberPath = path.join(subscribersDir, 'product-delete.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('deleteFromIndex');
      });
    });

    describe('opensearch-sync subscriber configuration', () => {
      it('should have opensearch-sync.ts subscriber file', () => {
        const subscriberPath = path.join(subscribersDir, 'opensearch-sync.ts');
        expect(fs.existsSync(subscriberPath)).toBe(true);
      });

      it('should be configured to listen to opensearch.sync event', () => {
        const subscriberPath = path.join(subscribersDir, 'opensearch-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('opensearch.sync');
      });

      it('should export a SubscriberConfig', () => {
        const subscriberPath = path.join(subscribersDir, 'opensearch-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('export const config: SubscriberConfig');
      });

      it('should import syncProductsWorkflow', () => {
        const subscriberPath = path.join(subscribersDir, 'opensearch-sync.ts');
        const content = fs.readFileSync(subscriberPath, 'utf-8');
        expect(content).toContain('syncProductsWorkflow');
      });
    });

    describe('subscriber handler integration with OpenSearch service', () => {
      it('should call OpenSearch service deleteFromIndex when product is deleted', async () => {
        // Arrange
        const productId = 'prod_to_delete';

        // Act - simulate what the subscriber does
        await opensearchService.deleteFromIndex([productId]);

        // Assert
        expect(mockDeleteByQuery).toHaveBeenCalledWith({
          index: 'test-products',
          body: {
            query: {
              terms: {
                _id: [productId],
              },
            },
          },
          refresh: true,
        });
      });

      it('should call OpenSearch service indexData when product is created/updated', async () => {
        // Arrange
        const product = {
          id: 'prod_new',
          title: 'New Product',
          description: 'A new product',
          handle: 'new-product',
          price: 49.99,
        };

        // Act - simulate what the subscriber does via workflow
        await opensearchService.indexData([product]);

        // Assert
        expect(mockBulk).toHaveBeenCalledWith({
          body: [{ index: { _index: 'test-products', _id: 'prod_new' } }, product],
          refresh: true,
        });
      });
    });
  });

  describe('18.3 Admin Sync Endpoint', () => {
    const routePath = path.join(__dirname, '../../../api/admin/opensearch/sync/route.ts');

    describe('POST /admin/opensearch/sync route configuration', () => {
      it('should have route.ts file at correct path', () => {
        expect(fs.existsSync(routePath)).toBe(true);
      });

      it('should export a POST handler function', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('export async function POST');
      });

      it('should import syncProductsWorkflow', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('syncProductsWorkflow');
      });

      it('should import MedusaRequest and MedusaResponse', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('MedusaRequest');
        expect(content).toContain('MedusaResponse');
      });

      it('should handle limit parameter', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('limit');
      });

      it('should handle offset parameter', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('offset');
      });

      it('should validate limit is a positive number', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('limit < 1');
      });

      it('should validate offset is a non-negative number', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('offset < 0');
      });

      it('should return success response with synced count', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('success: true');
        expect(content).toContain('synced_count');
      });

      it('should handle errors with MedusaError', () => {
        const content = fs.readFileSync(routePath, 'utf-8');
        expect(content).toContain('MedusaError');
      });
    });

    describe('sync endpoint integration with OpenSearch service', () => {
      it('should ensure index exists before syncing', async () => {
        // Arrange
        const products = [{ id: 'prod_123', title: 'Test' }];
        mockIndicesExists.mockResolvedValue({ body: false });
        mockIndicesCreate.mockResolvedValue({ body: {} });

        // Act
        await opensearchService.indexData(products);

        // Assert
        expect(mockIndicesExists).toHaveBeenCalled();
        expect(mockIndicesCreate).toHaveBeenCalled();
      });

      it('should skip index creation if index already exists', async () => {
        // Arrange
        const products = [{ id: 'prod_123', title: 'Test' }];
        mockIndicesExists.mockResolvedValue({ body: true });

        // Act
        await opensearchService.indexData(products);

        // Assert
        expect(mockIndicesExists).toHaveBeenCalled();
        expect(mockIndicesCreate).not.toHaveBeenCalled();
      });

      it('should handle sync request with multiple products', async () => {
        // Arrange
        const products = [
          { id: 'prod_1', title: 'Product 1' },
          { id: 'prod_2', title: 'Product 2' },
          { id: 'prod_3', title: 'Product 3' },
        ];

        // Act
        await opensearchService.indexData(products);

        // Assert - verify bulk was called with all products
        const bulkCall = mockBulk.mock.calls[0][0];
        expect(bulkCall.body).toHaveLength(6); // 3 products * 2
      });

      it('should handle errors appropriately when sync fails', async () => {
        // Arrange
        const products = [{ id: 'prod_error', title: 'Error Product' }];
        mockBulk.mockRejectedValue(new Error('OpenSearch connection failed'));

        // Act & Assert
        await expect(opensearchService.indexData(products)).rejects.toThrow('OpenSearch connection failed');
      });
    });
  });

  describe('OpenSearch Service Health Check Integration', () => {
    it('should return true when cluster is healthy (green)', async () => {
      // Arrange
      mockClusterHealth.mockResolvedValue({ body: { status: 'green' } });

      // Act
      const result = await opensearchService.healthCheck();

      // Assert
      expect(result).toBe(true);
    });

    it('should return true when cluster is healthy (yellow)', async () => {
      // Arrange
      mockClusterHealth.mockResolvedValue({ body: { status: 'yellow' } });

      // Act
      const result = await opensearchService.healthCheck();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when cluster is unhealthy (red)', async () => {
      // Arrange
      mockClusterHealth.mockResolvedValue({ body: { status: 'red' } });

      // Act
      const result = await opensearchService.healthCheck();

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when connection fails', async () => {
      // Arrange
      mockClusterHealth.mockRejectedValue(new Error('Connection refused'));

      // Act
      const result = await opensearchService.healthCheck();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('Module Registration Verification', () => {
    const moduleIndexPath = path.join(__dirname, '../index.ts');

    it('should export OPENSEARCH_MODULE constant', () => {
      const content = fs.readFileSync(moduleIndexPath, 'utf-8');
      expect(content).toContain("export const OPENSEARCH_MODULE = 'opensearch'");
    });

    it('should export default Module definition', () => {
      const content = fs.readFileSync(moduleIndexPath, 'utf-8');
      expect(content).toContain('export default Module');
    });

    it('should register OpenSearchModuleService', () => {
      const content = fs.readFileSync(moduleIndexPath, 'utf-8');
      expect(content).toContain('OpenSearchModuleService');
    });
  });
});
