/**
 * Search API Proxy Route for Elasticsearch-style requests
 *
 * This route proxies raw Elasticsearch search requests from the frontend to OpenSearch.
 * Used when the frontend connector sends requests in Elasticsearch format.
 *
 * @module routes/api.search._search
 */
import { type ActionFunctionArgs, data } from 'react-router';

/**
 * OpenSearch configuration
 */
const OPENSEARCH_HOST = process.env.OPENSEARCH_HOST || 'http://localhost:9200';
const OPENSEARCH_INDEX = process.env.OPENSEARCH_PRODUCT_INDEX || 'products';

/**
 * Handles POST requests for raw Elasticsearch search operations.
 *
 * The ElasticsearchAPIConnector sends requests in raw Elasticsearch format.
 * This route forwards them directly to OpenSearch.
 *
 * @param request - The incoming request containing Elasticsearch query
 * @returns JSON response with search results
 */
export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();

    // Forward the search request to OpenSearch
    const response = await fetch(`${OPENSEARCH_HOST}/${OPENSEARCH_INDEX}/_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenSearch error:', errorText);
      return data({ error: `OpenSearch error: ${response.status}` }, { status: response.status });
    }

    const result = await response.json();
    return data(result);
  } catch (error) {
    console.error('Search API error:', error);

    // Return a user-friendly error response
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return data({ error: `Search failed: ${errorMessage}` }, { status: 500 });
  }
}
