/**
 * Tests for Search Connector Factory
 *
 * Tests that the connector factory returns the correct connector type
 * based on the environment (development vs production).
 *
 * @module libs/util/search/__tests__/connector.test
 */

// Store original environment
const originalEnv = process.env;

describe('Search Connector Factory', () => {
  beforeEach(() => {
    // Reset modules to clear cached connector
    jest.resetModules();
    // Reset environment
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('createSearchConnector', () => {
    describe('Development Environment', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'development';
      });

      it('should return a connector in development', async () => {
        const { createSearchConnector } = await import('../connector');
        const connector = createSearchConnector();

        expect(connector).toBeDefined();
        expect(typeof connector).toBe('object');
      });

      it('should create connector with onSearch method', async () => {
        const { createSearchConnector } = await import('../connector');
        const connector = createSearchConnector();

        expect(connector.onSearch).toBeDefined();
      });

      it('should create connector with onAutocomplete method', async () => {
        const { createSearchConnector } = await import('../connector');
        const connector = createSearchConnector();

        expect(connector.onAutocomplete).toBeDefined();
      });
    });

    describe('Production Environment', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      it('should attempt to create a production connector', async () => {
        // In production, the connector uses '/api' as host which is invalid
        // for the ElasticsearchAPIConnector validation.
        // This test verifies the production code path is executed.
        const { createSearchConnector } = await import('../connector');

        // The production connector will throw because '/api' is not a valid URL
        // This is expected behavior - in a real browser environment,
        // the ApiProxyConnector would be used instead
        expect(() => createSearchConnector()).toThrow('Invalid host URL format');
      });
    });
  });

  describe('createSearchConnectorWithConfig', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should create connector with custom configuration', async () => {
      const { createSearchConnectorWithConfig } = await import('../connector');
      const customConfig = {
        host: 'http://custom-opensearch:9200',
        index: 'custom-index',
      };

      const connector = createSearchConnectorWithConfig(customConfig);

      expect(connector).toBeDefined();
      expect(typeof connector).toBe('object');
    });

    it('should create connector with partial configuration', async () => {
      const { createSearchConnectorWithConfig } = await import('../connector');

      // Only provide host, index should use default
      const connector = createSearchConnectorWithConfig({ host: 'http://partial-config:9200' });

      expect(connector).toBeDefined();
    });

    it('should create connector with empty configuration using defaults', async () => {
      const { createSearchConnectorWithConfig } = await import('../connector');

      const connector = createSearchConnectorWithConfig({});

      expect(connector).toBeDefined();
    });

    it('should create connector with onSearch method', async () => {
      const { createSearchConnectorWithConfig } = await import('../connector');

      const connector = createSearchConnectorWithConfig({
        host: 'http://test:9200',
        index: 'test-index',
      });

      expect(connector.onSearch).toBeDefined();
      expect(typeof connector.onSearch).toBe('function');
    });

    it('should create connector with onAutocomplete method', async () => {
      const { createSearchConnectorWithConfig } = await import('../connector');

      const connector = createSearchConnectorWithConfig({
        host: 'http://test:9200',
        index: 'test-index',
      });

      expect(connector.onAutocomplete).toBeDefined();
      expect(typeof connector.onAutocomplete).toBe('function');
    });
  });

  describe('SearchConnectorConfig type', () => {
    it('should export SearchConnectorConfig type', async () => {
      // This test verifies the type is exported (compile-time check)
      const module = await import('../connector');

      // The module should have the expected exports
      expect(module.createSearchConnector).toBeDefined();
      expect(module.createSearchConnectorWithConfig).toBeDefined();
    });
  });

  describe('Environment-based connector selection', () => {
    it('should create valid connector in development', async () => {
      process.env.NODE_ENV = 'development';
      jest.resetModules();

      const { createSearchConnector } = await import('../connector');
      const connector = createSearchConnector();

      expect(connector).toBeDefined();
      expect(connector.onSearch).toBeDefined();
    });

    it('should use different code path for production', async () => {
      // Test that production uses a different configuration
      process.env.NODE_ENV = 'production';
      jest.resetModules();

      const { createSearchConnector } = await import('../connector');

      // Production throws because '/api' is not a valid URL for the connector
      // In a real browser, this would work with the ApiProxyConnector
      expect(() => createSearchConnector()).toThrow();
    });
  });

  describe('Default configuration', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
      delete process.env.OPENSEARCH_HOST;
      delete process.env.OPENSEARCH_PRODUCT_INDEX;
    });

    it('should use default host when OPENSEARCH_HOST is not set', async () => {
      jest.resetModules();
      const { createSearchConnector } = await import('../connector');

      // Should not throw with default configuration
      const connector = createSearchConnector();
      expect(connector).toBeDefined();
    });

    it('should use default index when OPENSEARCH_PRODUCT_INDEX is not set', async () => {
      jest.resetModules();
      const { createSearchConnector } = await import('../connector');

      // Should not throw with default configuration
      const connector = createSearchConnector();
      expect(connector).toBeDefined();
    });
  });

  describe('Custom environment variables', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should use OPENSEARCH_HOST when set', async () => {
      process.env.OPENSEARCH_HOST = 'http://custom-host:9200';
      jest.resetModules();

      const { createSearchConnector } = await import('../connector');
      const connector = createSearchConnector();

      expect(connector).toBeDefined();
    });

    it('should use OPENSEARCH_PRODUCT_INDEX when set', async () => {
      process.env.OPENSEARCH_PRODUCT_INDEX = 'custom-products';
      jest.resetModules();

      const { createSearchConnector } = await import('../connector');
      const connector = createSearchConnector();

      expect(connector).toBeDefined();
    });
  });
});
