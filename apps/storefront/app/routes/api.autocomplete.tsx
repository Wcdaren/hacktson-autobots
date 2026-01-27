/**
 * Autocomplete API Proxy Route
 *
 * This route proxies autocomplete requests from the frontend to OpenSearch.
 * Used in production to keep OpenSearch credentials server-side for security.
 *
 * The frontend uses ApiProxyConnector which sends autocomplete requests to this endpoint,
 * and this route forwards them to OpenSearch using ElasticsearchAPIConnector.
 *
 * @module routes/api.autocomplete
 */
import { type ActionFunctionArgs, data } from 'react-router';
import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector';

/**
 * OpenSearch connector instance for server-side autocomplete operations.
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
 * Autocomplete request body structure from Search UI
 */
interface AutocompleteRequestBody {
  /** Current search state from Search UI */
  state: Record<string, unknown>;
  /** Query configuration for autocomplete from Search UI */
  queryConfig: Record<string, unknown>;
}

/**
 * Handles POST requests for autocomplete operations.
 *
 * The Search UI library sends autocomplete requests in a specific format with
 * `state` and `queryConfig` properties. This action forwards those to
 * OpenSearch via the ElasticsearchAPIConnector.
 *
 * @param request - The incoming request containing autocomplete parameters
 * @returns JSON response with autocomplete suggestions
 *
 * @example
 * ```typescript
 * // Request body format from Search UI
 * {
 *   state: {
 *     searchTerm: "cof"
 *   },
 *   queryConfig: {
 *     results: {
 *       search_fields: { title: {} },
 *       result_fields: { title: { raw: {} } }
 *     },
 *     suggestions: {
 *       types: { documents: { fields: ["title"] } }
 *     }
 *   }
 * }
 * ```
 */
export async function action({ request }: ActionFunctionArgs) {
  try {
    const body: AutocompleteRequestBody = await request.json();

    // Validate request body
    if (!body.state || !body.queryConfig) {
      return data({ error: 'Invalid request body. Expected state and queryConfig properties.' }, { status: 400 });
    }

    // Forward the autocomplete request to OpenSearch via the connector
    const response = await connector.onAutocomplete(body.state, body.queryConfig);

    return data(response);
  } catch (error) {
    console.error('Autocomplete API error:', error);

    // Return a user-friendly error response
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return data({ error: `Autocomplete failed: ${errorMessage}` }, { status: 500 });
  }
}
