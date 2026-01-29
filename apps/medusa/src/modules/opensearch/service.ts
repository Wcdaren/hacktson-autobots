/**
 * OpenSearch Module Service
 *
 * Provides methods for indexing and managing product data in OpenSearch.
 * This service handles data synchronization only - search queries go directly
 * from the frontend to OpenSearch.
 */

import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import type {
  OpenSearchModuleOptions,
  ProductDocument,
  SemanticSearchOptions,
  ImageSearchOptions,
  HybridSearchOptions,
  BrowseOptions,
  SearchResult,
  FacetResult,
  SearchWithFacetsResult,
} from './types';

/**
 * OpenSearch Module Service
 *
 * Handles product data indexing and deletion in OpenSearch.
 * Used by workflows and subscribers to keep the search index in sync
 * with the Medusa product catalog.
 */
export default class OpenSearchModuleService {
  private client: Client;
  private options: OpenSearchModuleOptions;

  /**
   * Creates a new OpenSearch service instance
   * @param _ - Container dependencies (unused, required by Medusa module pattern)
   * @param options - OpenSearch configuration options
   */
  constructor(_: Record<string, unknown>, options: OpenSearchModuleOptions) {
    this.options = options;

    // Check if connecting via SSH tunnel (localhost with HTTPS)
    const isLocalTunnel = options.host.includes('localhost') || options.host.includes('127.0.0.1');

    // Build client configuration based on authentication mode
    if (options.useAwsAuth) {
      // Use AWS Signature V4 authentication for AWS OpenSearch Service with IAM
      const awsRegion = options.awsRegion || 'us-east-1';
      this.client = new Client({
        ...AwsSigv4Signer({
          region: awsRegion,
          service: 'es', // 'es' for OpenSearch Service, 'aoss' for Serverless
          getCredentials: () => {
            const credentialsProvider = defaultProvider();
            return credentialsProvider();
          },
        }),
        node: options.host,
        ssl: isLocalTunnel ? { rejectUnauthorized: false } : undefined,
      });
    } else if (options.username && options.password) {
      // Use basic authentication (username/password)
      this.client = new Client({
        node: options.host,
        auth: {
          username: options.username,
          password: options.password,
        },
        ssl: isLocalTunnel ? { rejectUnauthorized: false } : undefined,
      });
    } else {
      // Use no authentication for local OpenSearch
      this.client = new Client({
        node: options.host,
        ssl: isLocalTunnel ? { rejectUnauthorized: false } : undefined,
      });
    }
  }

  /**
   * Index product data to OpenSearch
   *
   * Performs bulk indexing of product documents. Creates the index with
   * proper mapping if it doesn't exist.
   *
   * @param data - Array of product documents to index
   * @param type - Index type (defaults to "product")
   * @throws Error if bulk indexing fails
   */
  async indexData(data: Record<string, unknown>[], type: string = 'product'): Promise<void> {
    if (data.length === 0) {
      return;
    }

    const indexName = this.getIndexName(type);

    // Ensure index exists with proper mapping
    await this.ensureIndex(indexName);

    // Build bulk operation body
    const body = data.flatMap((doc) => [{ index: { _index: indexName, _id: doc.id as string } }, doc]);

    const response = await this.client.bulk({
      body,
      refresh: true,
    });

    if (response.body.errors) {
      const errorItems = response.body.items.filter((item: { index?: { error?: unknown } }) => item.index?.error);
      console.error('OpenSearch bulk indexing errors:', JSON.stringify(errorItems, null, 2));
      throw new Error(`Failed to index ${errorItems.length} documents to OpenSearch`);
    }
  }

  /**
   * Delete products from OpenSearch index
   *
   * Removes documents with the specified IDs from the index.
   *
   * @param ids - Array of product IDs to delete
   * @param type - Index type (defaults to "product")
   */
  async deleteFromIndex(ids: string[], type: string = 'product'): Promise<void> {
    if (ids.length === 0) {
      return;
    }

    const indexName = this.getIndexName(type);

    // Check if index exists before attempting delete
    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return;
    }

    await this.client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          terms: {
            _id: ids,
          },
        },
      },
      refresh: true,
    });
  }

  /**
   * Ensure index exists with proper mapping for Search UI compatibility
   *
   * Creates the index with the appropriate field mappings if it doesn't exist.
   * The mapping is optimized for:
   * - Full-text search on title, description, subtitle
   * - Faceted filtering on categories, collections, tags, options, metadata fields
   * - Range queries on price
   * - Sorting by various fields
   * - k-NN vector search for semantic and image search
   *
   * @param indexName - Name of the index to create
   */
  private async ensureIndex(indexName: string): Promise<void> {
    const exists = await this.client.indices.exists({ index: indexName });

    if (!exists.body) {
      // Determine vector configuration based on OpenSearch version/environment
      // AWS OpenSearch supports cosinesimilarity with faiss
      // Local OpenSearch 2.11.0 requires l2 with nmslib
      const isAwsOpenSearch =
        this.options.useAwsAuth ||
        (!this.options.host.includes('localhost') && !this.options.host.includes('127.0.0.1'));

      const vectorConfig = isAwsOpenSearch
        ? {
            // AWS OpenSearch configuration
            space_type: 'cosinesimilarity',
            engine: 'faiss',
          }
        : {
            // Local Docker OpenSearch 2.11.0 configuration
            space_type: 'l2',
            engine: 'nmslib',
          };

      await this.client.indices.create({
        index: indexName,
        body: {
          settings: {
            index: {
              knn: true,
              'knn.algo_param.ef_search': 100,
            },
          },
          mappings: {
            // Dynamic templates for per-region price fields
            dynamic_templates: [
              {
                price_reg_fields: {
                  match_pattern: 'regex',
                  match: '^price_reg_.*$',
                  mapping: {
                    type: 'float',
                  },
                },
              },
              {
                currency_reg_fields: {
                  match_pattern: 'regex',
                  match: '^currency_reg_.*$',
                  mapping: {
                    type: 'keyword',
                  },
                },
              },
            ],
            properties: {
              // Primary identifier
              id: { type: 'keyword' },

              // Searchable text fields
              title: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              subtitle: { type: 'text' },
              description: { type: 'text' },

              // URL and media fields
              handle: { type: 'keyword' },
              thumbnail: { type: 'keyword' },

              // Product attributes
              status: { type: 'keyword' },
              origin_country: { type: 'keyword' },
              is_giftcard: { type: 'boolean' },
              discountable: { type: 'boolean' },

              // Dimensions
              weight: { type: 'float' },
              height: { type: 'float' },
              width: { type: 'float' },
              length: { type: 'float' },

              // Product type
              type_id: { type: 'keyword' },
              type_name: { type: 'keyword' },

              // Category facets (hierarchical)
              category_ids: { type: 'keyword' },
              category_names: { type: 'keyword' },
              category_path: { type: 'keyword' },
              category_level: { type: 'integer' },
              category_parent_id: { type: 'keyword' },

              // Collection facets
              collection_ids: { type: 'keyword' },
              collection_names: { type: 'keyword' },

              // Tag facets
              tag_ids: { type: 'keyword' },
              tag_values: { type: 'keyword' },

              // Product options
              option_names: { type: 'keyword' },
              option_values: { type: 'keyword' },

              // Price for range filtering and sorting
              min_price: { type: 'float' },
              max_price: { type: 'float' },
              price: { type: 'float' },
              currency_code: { type: 'keyword' },

              // Per-region pricing fields (dynamically added during indexing)
              // These fields follow the pattern: price_reg_{regionId} and currency_reg_{regionId}
              // OpenSearch supports dynamic field mapping, so new region fields will be auto-mapped
              // We define common regions here for explicit mapping
              default_price: { type: 'float' },
              default_currency: { type: 'keyword' },

              // Variant info
              variant_count: { type: 'integer' },
              variant_skus: { type: 'keyword' },
              variant_titles: { type: 'keyword' },

              // Metadata facets (individual fields for filtering)
              meta_care: { type: 'keyword' },
              meta_material: { type: 'keyword' },
              meta_warranty: { type: 'keyword' },
              meta_assembly: { type: 'keyword' },
              meta_cover_type: { type: 'keyword' },
              meta_filling: { type: 'keyword' },

              // Raw metadata for display
              metadata: { type: 'object', enabled: false },

              // Timestamps for sorting
              created_at: { type: 'date' },
              updated_at: { type: 'date' },

              // k-NN vector fields for semantic search
              // Configuration adapts based on OpenSearch environment
              text_embedding: {
                type: 'knn_vector',
                dimension: 1024,
                method: {
                  name: 'hnsw',
                  ...vectorConfig,
                  parameters: {
                    ef_construction: 128,
                    m: 24,
                  },
                },
              },
              image_embedding: {
                type: 'knn_vector',
                dimension: 1024,
                method: {
                  name: 'hnsw',
                  ...vectorConfig,
                  parameters: {
                    ef_construction: 128,
                    m: 24,
                  },
                },
              },
              embedding_updated_at: { type: 'date' },
            },
          },
        },
      });
    }
  }

  /**
   * Get the index name for a given type
   *
   * @param type - The type of index (e.g., "product")
   * @returns The configured index name for the type
   */
  private getIndexName(type: string): string {
    return type === 'product' ? this.options.productIndexName : type;
  }

  /**
   * Normalize region ID for use as field suffix
   * Converts "reg_01ABC123" to "01abc123" (lowercase, no prefix)
   *
   * @param regionId - The region ID to normalize
   * @returns Normalized region ID for field naming
   */
  private normalizeRegionId(regionId: string): string {
    return regionId.replace(/^reg_/i, '').toLowerCase();
  }

  /**
   * Get the price field name for a given region
   * Returns the region-specific price field or falls back to default_price
   *
   * @param regionId - Optional region ID
   * @returns The price field name to use
   */
  private getPriceFieldForRegion(regionId?: string): string {
    if (regionId) {
      const normalizedId = this.normalizeRegionId(regionId);
      return `price_reg_${normalizedId}`;
    }
    return 'default_price';
  }

  /**
   * Check if the OpenSearch connection is healthy
   *
   * @returns True if the connection is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.cluster.health();
      return response.body.status !== 'red';
    } catch {
      return false;
    }
  }

  /**
   * Get the count of documents in the product index
   *
   * @param type - Index type (defaults to "product")
   * @returns The number of documents in the index
   */
  async getDocumentCount(type: string = 'product'): Promise<number> {
    const indexName = this.getIndexName(type);

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return 0;
    }

    const response = await this.client.count({ index: indexName });
    return response.body.count;
  }

  /**
   * Delete the entire index
   *
   * Use with caution - this removes all indexed data.
   *
   * @param type - Index type (defaults to "product")
   */
  async deleteIndex(type: string = 'product'): Promise<void> {
    const indexName = this.getIndexName(type);

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (indexExists.body) {
      await this.client.indices.delete({ index: indexName });
    }
  }

  /**
   * Perform semantic search using k-NN vector similarity
   *
   * @param embedding - Query embedding vector (1024 dimensions)
   * @param options - Search options
   * @returns Array of search results sorted by similarity
   */
  async semanticSearch(embedding: number[], options: SemanticSearchOptions = {}): Promise<SearchResult[]> {
    const { size = 20, filters, minScore = 0, regionId } = options;
    const indexName = this.getIndexName('product');

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return [];
    }

    const query: Record<string, unknown> = {
      knn: {
        text_embedding: {
          vector: embedding,
          k: size,
        },
      },
    };

    // Add filters if provided
    const searchBody: Record<string, unknown> = {
      size,
      query: filters
        ? {
            bool: {
              must: [query],
              filter: this.buildFilterQuery(filters),
            },
          }
        : query,
    };

    const response = await this.client.search({
      index: indexName,
      body: searchBody,
    });

    return this.mapSearchResults(response.body.hits.hits, 'semantic', minScore, regionId);
  }

  /**
   * Perform image search using k-NN vector similarity on image embeddings
   *
   * @param embedding - Image embedding vector (1024 dimensions)
   * @param options - Search options
   * @returns Array of search results sorted by visual similarity
   */
  async imageSearch(embedding: number[], options: ImageSearchOptions = {}): Promise<SearchResult[]> {
    const { size = 20, filters, minScore = 0, regionId } = options;
    const indexName = this.getIndexName('product');

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return [];
    }

    const query: Record<string, unknown> = {
      knn: {
        image_embedding: {
          vector: embedding,
          k: size,
        },
      },
    };

    // Add filters if provided
    const searchBody: Record<string, unknown> = {
      size,
      query: filters
        ? {
            bool: {
              must: [query],
              filter: this.buildFilterQuery(filters),
            },
          }
        : query,
    };

    const response = await this.client.search({
      index: indexName,
      body: searchBody,
    });

    return this.mapSearchResults(response.body.hits.hits, 'visual', minScore, regionId);
  }

  /**
   * Perform hybrid search combining keyword matching and semantic similarity
   *
   * @param queryText - Text query for keyword matching
   * @param embedding - Query embedding vector for semantic matching
   * @param options - Search options including regionId for region-aware pricing
   * @returns Array of search results with combined scoring
   */
  async hybridSearch(
    queryText: string,
    embedding: number[],
    options: HybridSearchOptions = {},
  ): Promise<SearchResult[]> {
    const { size = 20, filters, keywordWeight = 0.5, semanticWeight = 0.5, regionId } = options;
    const indexName = this.getIndexName('product');

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return [];
    }

    // Keyword query
    const keywordQuery = {
      multi_match: {
        query: queryText,
        fields: ['title^3', 'description', 'category_names', 'tag_values'],
        type: 'best_fields',
        fuzziness: 'AUTO',
      },
    };

    // k-NN query
    const knnQuery = {
      knn: {
        text_embedding: {
          vector: embedding,
          k: size * 2, // Get more candidates for re-ranking
        },
      },
    };

    // Execute both queries
    const [keywordResponse, semanticResponse] = await Promise.all([
      this.client.search({
        index: indexName,
        body: {
          size: size * 2,
          query: filters ? { bool: { must: [keywordQuery], filter: this.buildFilterQuery(filters) } } : keywordQuery,
        },
      }),
      this.client.search({
        index: indexName,
        body: {
          size: size * 2,
          query: filters ? { bool: { must: [knnQuery], filter: this.buildFilterQuery(filters) } } : knnQuery,
        },
      }),
    ]);

    // Merge and re-rank results
    return this.mergeHybridResults(
      keywordResponse.body.hits.hits,
      semanticResponse.body.hits.hits,
      keywordWeight,
      semanticWeight,
      size,
      regionId,
    );
  }

  /**
   * Build filter query from filter object
   */
  private buildFilterQuery(filters: Record<string, unknown>): Record<string, unknown>[] {
    const filterClauses: Record<string, unknown>[] = [];

    for (const [field, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        filterClauses.push({ terms: { [field]: value } });
      } else if (typeof value === 'object' && value !== null) {
        // Range filter
        filterClauses.push({ range: { [field]: value } });
      } else {
        filterClauses.push({ term: { [field]: value } });
      }
    }

    return filterClauses;
  }

  /**
   * Map OpenSearch hits to SearchResult format
   * @param hits - OpenSearch hits
   * @param matchType - Type of match
   * @param minScore - Minimum score threshold
   * @param regionId - Optional region ID for region-specific pricing
   */
  private mapSearchResults(
    hits: Array<{ _source: ProductDocument; _score: number }>,
    matchType: 'exact' | 'semantic' | 'visual' | 'hybrid',
    minScore: number,
    regionId?: string,
  ): SearchResult[] {
    return hits
      .filter((hit) => hit._score >= minScore)
      .map((hit) => {
        const { price, currency } = this.getRegionPriceFromDocument(hit._source, regionId);
        return {
          document: hit._source,
          score: hit._score,
          matchType,
          similarityScore: matchType !== 'exact' ? hit._score : undefined,
          regionPrice: price,
          regionCurrency: currency,
        };
      });
  }

  /**
   * Extract region-specific price and currency from a product document
   * Falls back to default_price/default_currency if region price is not available
   *
   * @param document - Product document
   * @param regionId - Optional region ID
   * @returns Object with price and currency
   */
  private getRegionPriceFromDocument(
    document: ProductDocument,
    regionId?: string,
  ): { price: number; currency: string } {
    if (regionId) {
      const normalizedId = this.normalizeRegionId(regionId);
      const priceField = `price_reg_${normalizedId}` as keyof ProductDocument;
      const currencyField = `currency_reg_${normalizedId}` as keyof ProductDocument;

      const regionPrice = document[priceField] as number | undefined;
      const regionCurrency = document[currencyField] as string | undefined;

      // Return region-specific price if available, otherwise fall back to default
      if (regionPrice !== undefined && regionPrice !== null) {
        return {
          price: regionPrice,
          currency: regionCurrency || document.default_currency || document.currency_code || 'usd',
        };
      }
    }

    // Fallback to default price
    return {
      price: document.default_price || document.min_price || 0,
      currency: document.default_currency || document.currency_code || 'usd',
    };
  }

  /**
   * Merge keyword and semantic search results with weighted scoring
   * @param keywordHits - Keyword search hits
   * @param semanticHits - Semantic search hits
   * @param keywordWeight - Weight for keyword scores
   * @param semanticWeight - Weight for semantic scores
   * @param limit - Maximum number of results
   * @param regionId - Optional region ID for region-specific pricing
   */
  private mergeHybridResults(
    keywordHits: Array<{ _id: string; _source: ProductDocument; _score: number }>,
    semanticHits: Array<{ _id: string; _source: ProductDocument; _score: number }>,
    keywordWeight: number,
    semanticWeight: number,
    limit: number,
    regionId?: string,
  ): SearchResult[] {
    const scoreMap = new Map<string, { document: ProductDocument; keywordScore: number; semanticScore: number }>();

    // Normalize scores
    const maxKeywordScore = Math.max(...keywordHits.map((h) => h._score), 1);
    const maxSemanticScore = Math.max(...semanticHits.map((h) => h._score), 1);

    // Add keyword results
    for (const hit of keywordHits) {
      scoreMap.set(hit._id, {
        document: hit._source,
        keywordScore: hit._score / maxKeywordScore,
        semanticScore: 0,
      });
    }

    // Add/merge semantic results
    for (const hit of semanticHits) {
      const existing = scoreMap.get(hit._id);
      if (existing) {
        existing.semanticScore = hit._score / maxSemanticScore;
      } else {
        scoreMap.set(hit._id, {
          document: hit._source,
          keywordScore: 0,
          semanticScore: hit._score / maxSemanticScore,
        });
      }
    }

    // Calculate combined scores and sort
    const results: SearchResult[] = [];
    for (const [, data] of scoreMap) {
      const combinedScore = data.keywordScore * keywordWeight + data.semanticScore * semanticWeight;
      const matchType: 'exact' | 'semantic' | 'hybrid' =
        data.keywordScore > 0 && data.semanticScore > 0 ? 'hybrid' : data.keywordScore > 0 ? 'exact' : 'semantic';

      // Get region-specific price
      const { price, currency } = this.getRegionPriceFromDocument(data.document, regionId);

      results.push({
        document: data.document,
        score: combinedScore,
        matchType,
        similarityScore: data.semanticScore > 0 ? data.semanticScore : undefined,
        regionPrice: price,
        regionCurrency: currency,
      });
    }

    // Sort by combined score descending
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
  }

  /**
   * Browse all products without a search query
   *
   * @param options - Browse options (pagination, filters, sort)
   * @returns Array of product documents
   */
  async browseProducts(options: BrowseOptions = {}): Promise<ProductDocument[]> {
    const { size = 20, from = 0, filters, sort } = options;
    const indexName = this.getIndexName('product');

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return [];
    }

    const searchBody: Record<string, unknown> = {
      size,
      from,
      query: filters
        ? {
            bool: {
              must: [{ match_all: {} }],
              filter: this.buildFilterQuery(filters),
            },
          }
        : { match_all: {} },
    };

    // Add sorting if specified
    if (sort) {
      searchBody.sort = [{ [sort.field]: { order: sort.order } }];
    } else {
      // Default sort by created_at descending
      searchBody.sort = [{ created_at: { order: 'desc' } }];
    }

    const response = await this.client.search({
      index: indexName,
      body: searchBody,
    });

    return response.body.hits.hits.map((hit: { _source: ProductDocument }) => hit._source);
  }

  /**
   * Browse products with facet aggregations
   *
   * @param options - Browse options (pagination, filters, sort, regionId)
   * @returns Search results with facets and total count
   */
  async browseProductsWithFacets(options: BrowseOptions = {}): Promise<SearchWithFacetsResult> {
    const { size = 20, from = 0, filters, sort, regionId } = options;
    const indexName = this.getIndexName('product');

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return { results: [], facets: {}, total: 0 };
    }

    const searchBody: Record<string, unknown> = {
      size,
      from,
      query: filters
        ? {
            bool: {
              must: [{ match_all: {} }],
              filter: this.buildFilterQuery(filters),
            },
          }
        : { match_all: {} },
      aggs: this.buildFacetAggregations(regionId),
    };

    // Add sorting if specified
    if (sort) {
      searchBody.sort = [{ [sort.field]: { order: sort.order } }];
    } else {
      searchBody.sort = [{ created_at: { order: 'desc' } }];
    }

    const response = await this.client.search({
      index: indexName,
      body: searchBody,
    });

    const results = response.body.hits.hits.map((hit: { _source: ProductDocument; _score: number }) => {
      const { price, currency } = this.getRegionPriceFromDocument(hit._source, regionId);
      return {
        document: hit._source,
        score: hit._score || 1,
        matchType: 'exact' as const,
        regionPrice: price,
        regionCurrency: currency,
      };
    });

    const facets = this.parseFacetAggregations(response.body.aggregations || {});
    const total = response.body.hits.total?.value || response.body.hits.total || 0;

    return { results, facets, total };
  }

  /**
   * Hybrid search with facet aggregations
   *
   * @param queryText - Text query for keyword matching
   * @param embedding - Query embedding vector for semantic matching
   * @param options - Search options including regionId for region-aware pricing
   * @returns Search results with facets and total count
   */
  async hybridSearchWithFacets(
    queryText: string,
    embedding: number[],
    options: HybridSearchOptions = {},
  ): Promise<SearchWithFacetsResult> {
    const { size = 20, filters, keywordWeight = 0.5, semanticWeight = 0.5, regionId } = options;
    const indexName = this.getIndexName('product');

    const indexExists = await this.client.indices.exists({ index: indexName });
    if (!indexExists.body) {
      return { results: [], facets: {}, total: 0 };
    }

    // Keyword query with aggregations
    const keywordQuery = {
      multi_match: {
        query: queryText,
        fields: ['title^3', 'description', 'category_names', 'tag_values'],
        type: 'best_fields',
        fuzziness: 'AUTO',
      },
    };

    // k-NN query
    const knnQuery = {
      knn: {
        text_embedding: {
          vector: embedding,
          k: size * 2,
        },
      },
    };

    // Execute keyword query with aggregations (using regionId for price aggregation)
    const [keywordResponse, semanticResponse] = await Promise.all([
      this.client.search({
        index: indexName,
        body: {
          size: size * 2,
          query: filters ? { bool: { must: [keywordQuery], filter: this.buildFilterQuery(filters) } } : keywordQuery,
          aggs: this.buildFacetAggregations(regionId),
        },
      }),
      this.client.search({
        index: indexName,
        body: {
          size: size * 2,
          query: filters ? { bool: { must: [knnQuery], filter: this.buildFilterQuery(filters) } } : knnQuery,
        },
      }),
    ]);

    // Merge and re-rank results
    const results = this.mergeHybridResults(
      keywordResponse.body.hits.hits,
      semanticResponse.body.hits.hits,
      keywordWeight,
      semanticWeight,
      size,
      regionId,
    );

    const facets = this.parseFacetAggregations(keywordResponse.body.aggregations || {});
    const total = keywordResponse.body.hits.total?.value || keywordResponse.body.hits.total || 0;

    return { results, facets, total };
  }

  /**
   * Build facet aggregations for search queries
   *
   * @param regionId - Optional region ID for region-specific price aggregation
   * @returns Aggregation configuration object
   */
  private buildFacetAggregations(regionId?: string): Record<string, unknown> {
    // Determine which price field to use for aggregation
    const priceField = this.getPriceFieldForRegion(regionId);

    return {
      category_names: {
        terms: { field: 'category_names', size: 50 },
      },
      collection_names: {
        terms: { field: 'collection_names', size: 50 },
      },
      tag_values: {
        terms: { field: 'tag_values', size: 30 },
      },
      meta_material: {
        terms: { field: 'meta_material', size: 30 },
      },
      meta_care: {
        terms: { field: 'meta_care', size: 20 },
      },
      meta_warranty: {
        terms: { field: 'meta_warranty', size: 20 },
      },
      meta_assembly: {
        terms: { field: 'meta_assembly', size: 20 },
      },
      meta_cover_type: {
        terms: { field: 'meta_cover_type', size: 20 },
      },
      meta_filling: {
        terms: { field: 'meta_filling', size: 20 },
      },
      // Use region-specific price field for price range aggregation
      price_ranges: {
        range: {
          field: priceField,
          ranges: [
            { key: 'Under $500', to: 50000 },
            { key: '$500 - $1,000', from: 50000, to: 100000 },
            { key: '$1,000 - $2,000', from: 100000, to: 200000 },
            { key: 'Over $2,000', from: 200000 },
          ],
        },
      },
      // Keep min_price for backward compatibility
      min_price: {
        range: {
          field: 'min_price',
          ranges: [
            { key: 'Under $500', to: 50000 },
            { key: '$500 - $1,000', from: 50000, to: 100000 },
            { key: '$1,000 - $2,000', from: 100000, to: 200000 },
            { key: 'Over $2,000', from: 200000 },
          ],
        },
      },
    };
  }

  /**
   * Parse OpenSearch aggregation response into FacetResult format
   */
  private parseFacetAggregations(aggregations: Record<string, unknown>): Record<string, FacetResult> {
    const facets: Record<string, FacetResult> = {};

    for (const [field, agg] of Object.entries(aggregations)) {
      const aggData = agg as { buckets?: Array<{ key: string; doc_count: number }> };

      if (aggData.buckets && aggData.buckets.length > 0) {
        // Determine if this is a range facet (price-related)
        const isRangeFacet = field === 'min_price' || field === 'price_ranges';

        facets[field] = {
          field,
          type: isRangeFacet ? 'range' : 'value',
          data: aggData.buckets.map((bucket) => ({
            value: String(bucket.key),
            count: bucket.doc_count,
          })),
        };
      }
    }

    return facets;
  }
}
