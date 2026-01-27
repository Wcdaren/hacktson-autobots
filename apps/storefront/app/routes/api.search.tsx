/**
 * Search API Proxy Route
 *
 * This route proxies search requests from the frontend to OpenSearch.
 * Used in production to keep OpenSearch credentials server-side for security.
 *
 * The frontend uses ApiProxyConnector which sends requests to this endpoint,
 * and this route forwards them to OpenSearch using ElasticsearchAPIConnector.
 *
 * @module routes/api.search
 */
import { type ActionFunctionArgs, data } from 'react-router';
import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector';

/**
 * OpenSearch connector instance for server-side search operations.
 * Configured with environment variables that are only available server-side.
 */
const connector = new ElasticsearchAPIConnector({
  host: process.env.OPENSEARCH_HOST || 'http://localhost:9200',
  index: process.env.OPENSEARCH_PRODUCT_INDEX || 'products',
  connectionOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

/**
 * Search request body structure from Search UI
 */
interface SearchRequestBody {
  /** Current search state from Search UI */
  state: Record<string, unknown>;
  /** Query configuration from Search UI */
  queryConfig: Record<string, unknown>;
}

/**
 * Handles POST requests for search operations.
 *
 * The Search UI library sends search requests in a specific format with
 * `state` and `queryConfig` properties. This action forwards those to
 * OpenSearch via the ElasticsearchAPIConnector.
 *
 * @param request - The incoming request containing search parameters
 * @returns JSON response with search results
 *
 * @example
 * ```typescript
 * // Request body format from Search UI
 * {
 *   state: {
 *     searchTerm: "coffee",
 *     filters: [...],
 *     current: 1,
 *     resultsPerPage: 12
 *   },
 *   queryConfig: {
 *     search_fields: { title: { weight: 3 } },
 *     result_fields: { title: { raw: {} } },
 *     facets: { category_names: { type: "value" } }
 *   }
 * }
 * ```
 */
export async function action({ request }: ActionFunctionArgs) {
  try {
    const body: SearchRequestBody = await request.json();

    // Validate request body
    if (!body.state || !body.queryConfig) {
      return data({ error: 'Invalid request body. Expected state and queryConfig properties.' }, { status: 400 });
    }

    // Forward the search request to OpenSearch via the connector
    const response = await connector.onSearch(body.state, body.queryConfig);

    return data(response);
  } catch (error) {
    console.error('Search API error:', error);

    // Return a user-friendly error response
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return data({ error: `Search failed: ${errorMessage}` }, { status: 500 });
  }
}
