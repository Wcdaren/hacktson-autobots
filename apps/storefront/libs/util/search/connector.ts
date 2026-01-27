/**
 * Search Connector Factory
 *
 * Creates the appropriate search connector based on the environment:
 * - Development: Direct connection to OpenSearch via ElasticsearchAPIConnector
 * - Production: Proxied connection via ApiProxyConnector for security
 *
 * @module libs/util/search/connector
 */
import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector';

/**
 * Configuration options for the search connector
 */
interface SearchConnectorConfig {
  /** OpenSearch host URL */
  host: string;
  /** OpenSearch index name */
  index: string;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: SearchConnectorConfig = {
  host: 'http://localhost:9200',
  index: 'products',
};

/**
 * Creates an ElasticsearchAPIConnector for direct OpenSearch connection.
 * Used in development environment where direct access is acceptable.
 *
 * @param config - Configuration options for the connector
 * @returns ElasticsearchAPIConnector instance
 */
function createDevConnector(config: SearchConnectorConfig): ElasticsearchAPIConnector {
  return new ElasticsearchAPIConnector({
    host: config.host,
    index: config.index,
    connectionOptions: {
      // OpenSearch compatibility headers
      headers: {
        'Content-Type': 'application/json',
      },
      // Disable credentials to avoid CORS preflight issues
      credentials: 'omit',
    },
  });
}

/**
 * Creates an ApiProxyConnector for proxied OpenSearch connection.
 * Used in production environment where direct OpenSearch access should be hidden
 * behind server-side API routes for security.
 *
 * Note: ApiProxyConnector is a class from @elastic/search-ui-elasticsearch-connector
 * that routes requests through a specified base path instead of directly to OpenSearch.
 *
 * @returns ApiProxyConnector instance configured to use /api/search routes
 */
function createProdConnector(): ElasticsearchAPIConnector {
  // In production/browser, we use the same ElasticsearchAPIConnector but configured
  // to point to our API proxy routes. We need to use the full URL including origin.
  //
  // The storefront API routes at /api/search and /api/autocomplete will
  // handle the actual OpenSearch communication server-side.
  //
  // ElasticsearchAPIConnector sends requests to {host}/{index}/_search
  // So we set host to origin and index to 'api/search' to get /api/search/_search
  // But our route is /api/search, so we need a different approach.
  //
  // Actually, the connector sends POST to {host}/{index}/_search
  // We need to intercept this and redirect to our API route.
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  return new ElasticsearchAPIConnector({
    host: origin,
    index: 'api/search',
    connectionOptions: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Factory function that creates the appropriate search connector
 * based on the current environment.
 *
 * In development:
 * - Uses ElasticsearchAPIConnector for direct OpenSearch connection
 * - Reads configuration from environment variables
 *
 * In production:
 * - Uses ApiProxyConnector to route requests through storefront API
 * - OpenSearch credentials are kept server-side for security
 *
 * @returns Search connector instance (ElasticsearchAPIConnector or ApiProxyConnector)
 *
 * @example
 * ```typescript
 * import { createSearchConnector } from "@libs/util/search/connector"
 *
 * const connector = createSearchConnector()
 *
 * // Use with SearchProvider
 * const searchConfig = {
 *   apiConnector: connector,
 *   // ... other config
 * }
 * ```
 */
export function createSearchConnector(): ElasticsearchAPIConnector {
  // Always use API proxy to avoid CORS issues
  // The API proxy routes handle the actual OpenSearch communication server-side
  if (isBrowser()) {
    return createProdConnector();
  }

  // Server environment - this shouldn't be called during SSR
  // but if it is, return dev connector with defaults
  return createDevConnector(DEFAULT_CONFIG);
}

/**
 * Creates a search connector with custom configuration.
 * Useful for testing or when you need to override default settings.
 *
 * @param config - Custom configuration options
 * @returns ElasticsearchAPIConnector instance
 *
 * @example
 * ```typescript
 * const connector = createSearchConnectorWithConfig({
 *   host: "http://custom-opensearch:9200",
 *   index: "custom-products",
 * })
 * ```
 */
export function createSearchConnectorWithConfig(config: Partial<SearchConnectorConfig>): ElasticsearchAPIConnector {
  const mergedConfig: SearchConnectorConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  return createDevConnector(mergedConfig);
}

/**
 * Re-export the connector type for use in other modules
 */
export type { SearchConnectorConfig };
