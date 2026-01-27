/**
 * OpenSearch Module Service Unit Tests
 *
 * Tests for the OpenSearch service methods including indexData, deleteFromIndex,
 * and ensureIndex functionality.
 */

import OpenSearchModuleService from '../service';
import type { OpenSearchModuleOptions } from '../types';

// Mock the OpenSearch client
const mockBulk = jest.fn();
const mockDeleteByQuery = jest.fn();
const mockIndicesExists = jest.fn();
const mockIndicesCreate = jest.fn();
const mockIndicesDelete = jest.fn();
const mockClusterHealth = jest.fn();
const mockCount = jest.fn();

jest.mock('@opensearch-project/opensearch', () => ({
  Client: jest.fn().mockImplementation(() => ({
    bulk: mockBulk,
    deleteByQuery: mockDeleteByQuery,
    indices: {
      exists: mockIndicesExists,
      create: mockIndicesCreate,
      delete: mockIndicesDelete,
    },
    cluster: {
      health: mockClusterHealth,
    },
    count: mockCount,
  })),
}));

describe('OpenSearchModuleService', () => {
  let service: OpenSearchModuleService;
  const defaultOptions: OpenSearchModuleOptions = {
    host: 'http://localhost:9200',
    productIndexName: 'test-products',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OpenSearchModuleService({}, defaultOptions);
  });

  describe('indexData', () => {
    it('should return early when data array is empty', async () => {
      // Arrange
      const emptyData: Record<string, unknown>[] = [];

      // Act
      await service.indexData(emptyData);

      // Assert
      expect(mockBulk).not.toHaveBeenCalled();
      expect(mockIndicesExists).not.toHaveBeenCalled();
    });

    it('should call bulk API with correct format for single document', async () => {
      // Arrange
      const data = [
        {
          id: 'prod_123',
          title: 'Test Product',
          description: 'A test product description',
          price: 29.99,
        },
      ];

      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      expect(mockBulk).toHaveBeenCalledWith({
        body: [{ index: { _index: 'test-products', _id: 'prod_123' } }, data[0]],
        refresh: true,
      });
    });

    it('should call bulk API with correct format for multiple documents', async () => {
      // Arrange
      const data = [
        { id: 'prod_1', title: 'Product 1', price: 10.0 },
        { id: 'prod_2', title: 'Product 2', price: 20.0 },
        { id: 'prod_3', title: 'Product 3', price: 30.0 },
      ];

      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      expect(mockBulk).toHaveBeenCalledWith({
        body: [
          { index: { _index: 'test-products', _id: 'prod_1' } },
          data[0],
          { index: { _index: 'test-products', _id: 'prod_2' } },
          data[1],
          { index: { _index: 'test-products', _id: 'prod_3' } },
          data[2],
        ],
        refresh: true,
      });
    });

    it('should ensure index exists before indexing', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];

      mockIndicesExists.mockResolvedValue({ body: false });
      mockIndicesCreate.mockResolvedValue({ body: {} });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
      expect(mockIndicesCreate).toHaveBeenCalled();
    });

    it('should throw error when bulk indexing has errors', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];

      mockIndicesExists.mockResolvedValue({ body: true });
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
      await expect(service.indexData(data)).rejects.toThrow('Failed to index 1 documents to OpenSearch');
    });

    it('should use custom index type when provided', async () => {
      // Arrange
      const data = [{ id: 'custom_123', name: 'Custom Item' }];
      const customType = 'custom-index';

      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data, customType);

      // Assert
      expect(mockBulk).toHaveBeenCalledWith({
        body: [{ index: { _index: customType, _id: 'custom_123' } }, data[0]],
        refresh: true,
      });
    });

    it('should handle documents with all product fields', async () => {
      // Arrange
      const fullProductData = [
        {
          id: 'prod_full',
          title: 'Full Product',
          description: 'Complete product with all fields',
          handle: 'full-product',
          thumbnail: 'https://example.com/image.jpg',
          category_ids: ['cat_1', 'cat_2'],
          category_names: ['Category 1', 'Category 2'],
          collection_ids: ['col_1'],
          collection_names: ['Collection 1'],
          tag_ids: ['tag_1'],
          tag_values: ['Tag 1'],
          price: 99.99,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
        },
      ];

      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(fullProductData);

      // Assert
      expect(mockBulk).toHaveBeenCalledWith({
        body: [{ index: { _index: 'test-products', _id: 'prod_full' } }, fullProductData[0]],
        refresh: true,
      });
    });
  });

  describe('deleteFromIndex', () => {
    it('should return early when ids array is empty', async () => {
      // Arrange
      const emptyIds: string[] = [];

      // Act
      await service.deleteFromIndex(emptyIds);

      // Assert
      expect(mockDeleteByQuery).not.toHaveBeenCalled();
      expect(mockIndicesExists).not.toHaveBeenCalled();
    });

    it('should return early when index does not exist', async () => {
      // Arrange
      const ids = ['prod_123'];
      mockIndicesExists.mockResolvedValue({ body: false });

      // Act
      await service.deleteFromIndex(ids);

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
      expect(mockDeleteByQuery).not.toHaveBeenCalled();
    });

    it('should call deleteByQuery with correct document ID', async () => {
      // Arrange
      const ids = ['prod_123'];
      mockIndicesExists.mockResolvedValue({ body: true });
      mockDeleteByQuery.mockResolvedValue({ body: { deleted: 1 } });

      // Act
      await service.deleteFromIndex(ids);

      // Assert
      expect(mockDeleteByQuery).toHaveBeenCalledWith({
        index: 'test-products',
        body: {
          query: {
            terms: {
              _id: ['prod_123'],
            },
          },
        },
        refresh: true,
      });
    });

    it('should call deleteByQuery with multiple document IDs', async () => {
      // Arrange
      const ids = ['prod_1', 'prod_2', 'prod_3'];
      mockIndicesExists.mockResolvedValue({ body: true });
      mockDeleteByQuery.mockResolvedValue({ body: { deleted: 3 } });

      // Act
      await service.deleteFromIndex(ids);

      // Assert
      expect(mockDeleteByQuery).toHaveBeenCalledWith({
        index: 'test-products',
        body: {
          query: {
            terms: {
              _id: ['prod_1', 'prod_2', 'prod_3'],
            },
          },
        },
        refresh: true,
      });
    });

    it('should use custom index type when provided', async () => {
      // Arrange
      const ids = ['custom_123'];
      const customType = 'custom-index';
      mockIndicesExists.mockResolvedValue({ body: true });
      mockDeleteByQuery.mockResolvedValue({ body: { deleted: 1 } });

      // Act
      await service.deleteFromIndex(ids, customType);

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: customType });
      expect(mockDeleteByQuery).toHaveBeenCalledWith({
        index: customType,
        body: {
          query: {
            terms: {
              _id: ['custom_123'],
            },
          },
        },
        refresh: true,
      });
    });

    it('should handle non-existent documents gracefully', async () => {
      // Arrange
      const ids = ['non_existent_id'];
      mockIndicesExists.mockResolvedValue({ body: true });
      mockDeleteByQuery.mockResolvedValue({ body: { deleted: 0 } });

      // Act & Assert - should not throw
      await expect(service.deleteFromIndex(ids)).resolves.not.toThrow();
    });
  });

  describe('ensureIndex (via indexData)', () => {
    it('should create index with proper mapping when index does not exist', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];
      mockIndicesExists.mockResolvedValue({ body: false });
      mockIndicesCreate.mockResolvedValue({ body: {} });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      expect(mockIndicesCreate).toHaveBeenCalledWith({
        index: 'test-products',
        body: {
          mappings: {
            properties: {
              id: { type: 'keyword' },
              title: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              description: { type: 'text' },
              handle: { type: 'keyword' },
              thumbnail: { type: 'keyword' },
              category_ids: { type: 'keyword' },
              category_names: { type: 'keyword' },
              collection_ids: { type: 'keyword' },
              collection_names: { type: 'keyword' },
              tag_ids: { type: 'keyword' },
              tag_values: { type: 'keyword' },
              price: { type: 'float' },
              created_at: { type: 'date' },
              updated_at: { type: 'date' },
            },
          },
        },
      });
    });

    it('should skip index creation when index already exists', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];
      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
      expect(mockIndicesCreate).not.toHaveBeenCalled();
    });

    it('should configure title field with text type and keyword subfield for sorting', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];
      mockIndicesExists.mockResolvedValue({ body: false });
      mockIndicesCreate.mockResolvedValue({ body: {} });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      const createCall = mockIndicesCreate.mock.calls[0][0];
      const titleMapping = createCall.body.mappings.properties.title;

      expect(titleMapping.type).toBe('text');
      expect(titleMapping.analyzer).toBe('standard');
      expect(titleMapping.fields.keyword.type).toBe('keyword');
    });

    it('should configure price field as float for range queries', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];
      mockIndicesExists.mockResolvedValue({ body: false });
      mockIndicesCreate.mockResolvedValue({ body: {} });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      const createCall = mockIndicesCreate.mock.calls[0][0];
      expect(createCall.body.mappings.properties.price.type).toBe('float');
    });

    it('should configure category and collection fields as keyword for faceted filtering', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];
      mockIndicesExists.mockResolvedValue({ body: false });
      mockIndicesCreate.mockResolvedValue({ body: {} });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      const createCall = mockIndicesCreate.mock.calls[0][0];
      const properties = createCall.body.mappings.properties;

      expect(properties.category_ids.type).toBe('keyword');
      expect(properties.category_names.type).toBe('keyword');
      expect(properties.collection_ids.type).toBe('keyword');
      expect(properties.collection_names.type).toBe('keyword');
      expect(properties.tag_ids.type).toBe('keyword');
      expect(properties.tag_values.type).toBe('keyword');
    });

    it('should configure date fields for timestamp sorting', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test Product' }];
      mockIndicesExists.mockResolvedValue({ body: false });
      mockIndicesCreate.mockResolvedValue({ body: {} });
      mockBulk.mockResolvedValue({
        body: {
          errors: false,
          items: [],
        },
      });

      // Act
      await service.indexData(data);

      // Assert
      const createCall = mockIndicesCreate.mock.calls[0][0];
      const properties = createCall.body.mappings.properties;

      expect(properties.created_at.type).toBe('date');
      expect(properties.updated_at.type).toBe('date');
    });
  });

  describe('healthCheck', () => {
    it('should return true when cluster status is green', async () => {
      // Arrange
      mockClusterHealth.mockResolvedValue({
        body: { status: 'green' },
      });

      // Act
      const result = await service.healthCheck();

      // Assert
      expect(result).toBe(true);
    });

    it('should return true when cluster status is yellow', async () => {
      // Arrange
      mockClusterHealth.mockResolvedValue({
        body: { status: 'yellow' },
      });

      // Act
      const result = await service.healthCheck();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when cluster status is red', async () => {
      // Arrange
      mockClusterHealth.mockResolvedValue({
        body: { status: 'red' },
      });

      // Act
      const result = await service.healthCheck();

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when connection fails', async () => {
      // Arrange
      mockClusterHealth.mockRejectedValue(new Error('Connection refused'));

      // Act
      const result = await service.healthCheck();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getDocumentCount', () => {
    it('should return 0 when index does not exist', async () => {
      // Arrange
      mockIndicesExists.mockResolvedValue({ body: false });

      // Act
      const result = await service.getDocumentCount();

      // Assert
      expect(result).toBe(0);
      expect(mockCount).not.toHaveBeenCalled();
    });

    it('should return document count when index exists', async () => {
      // Arrange
      mockIndicesExists.mockResolvedValue({ body: true });
      mockCount.mockResolvedValue({ body: { count: 42 } });

      // Act
      const result = await service.getDocumentCount();

      // Assert
      expect(result).toBe(42);
      expect(mockCount).toHaveBeenCalledWith({ index: 'test-products' });
    });

    it('should use custom index type when provided', async () => {
      // Arrange
      const customType = 'custom-index';
      mockIndicesExists.mockResolvedValue({ body: true });
      mockCount.mockResolvedValue({ body: { count: 10 } });

      // Act
      const result = await service.getDocumentCount(customType);

      // Assert
      expect(result).toBe(10);
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: customType });
      expect(mockCount).toHaveBeenCalledWith({ index: customType });
    });
  });

  describe('deleteIndex', () => {
    it('should delete index when it exists', async () => {
      // Arrange
      mockIndicesExists.mockResolvedValue({ body: true });
      mockIndicesDelete.mockResolvedValue({ body: {} });

      // Act
      await service.deleteIndex();

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
      expect(mockIndicesDelete).toHaveBeenCalledWith({ index: 'test-products' });
    });

    it('should not attempt delete when index does not exist', async () => {
      // Arrange
      mockIndicesExists.mockResolvedValue({ body: false });

      // Act
      await service.deleteIndex();

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
      expect(mockIndicesDelete).not.toHaveBeenCalled();
    });

    it('should use custom index type when provided', async () => {
      // Arrange
      const customType = 'custom-index';
      mockIndicesExists.mockResolvedValue({ body: true });
      mockIndicesDelete.mockResolvedValue({ body: {} });

      // Act
      await service.deleteIndex(customType);

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: customType });
      expect(mockIndicesDelete).toHaveBeenCalledWith({ index: customType });
    });
  });

  describe('getIndexName', () => {
    it('should return configured productIndexName for product type', async () => {
      // Arrange
      const data = [{ id: 'prod_123', title: 'Test' }];
      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({ body: { errors: false, items: [] } });

      // Act
      await service.indexData(data, 'product');

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'test-products' });
    });

    it('should return type as index name for non-product types', async () => {
      // Arrange
      const data = [{ id: 'item_123', name: 'Test' }];
      mockIndicesExists.mockResolvedValue({ body: true });
      mockBulk.mockResolvedValue({ body: { errors: false, items: [] } });

      // Act
      await service.indexData(data, 'categories');

      // Assert
      expect(mockIndicesExists).toHaveBeenCalledWith({ index: 'categories' });
    });
  });
});
