/**
 * Sync Products Workflow
 *
 * Workflow that synchronizes product data from Medusa to OpenSearch.
 * Fetches products using Query, transforms them to the OpenSearch document format,
 * indexes published products, and removes unpublished products from the index.
 *
 * Supports optional AI-powered description generation using Claude AI via AWS Bedrock.
 * When enabled, generates bilingual descriptions and AI embeddings for enhanced search.
 *
 * @example
 * ```typescript
 * // Full sync of all products
 * await syncProductsWorkflow(container).run({
 *   input: { limit: 100, offset: 0 }
 * })
 *
 * // Sync specific product by ID
 * await syncProductsWorkflow(container).run({
 *   input: { filters: { id: "prod_123" } }
 * })
 *
 * // Sync with AI description generation enabled
 * await syncProductsWorkflow(container).run({
 *   input: {
 *     limit: 100,
 *     generateAIDescriptions: true,
 *     aiConcurrency: 3
 *   }
 * })
 * ```
 *
 * _Requirements: 1.1, 1.4_
 */

import { createWorkflow, transform, when, WorkflowResponse } from '@medusajs/framework/workflows-sdk';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import { syncProductsStep } from './steps/sync-products';
import { deleteProductsFromOpenSearchStep } from './steps/delete-products-from-opensearch';
import { generateEmbeddingsStep } from './steps/generate-embeddings';
import { generateAIDescriptionsStep, type AIDescriptionResult } from './steps/generate-ai-descriptions';
import { generateAIEmbeddingsStep, type AIEmbeddingResult } from './steps/generate-ai-embeddings';

/**
 * Input type for the sync products workflow
 */
type SyncProductsWorkflowInput = {
  /** Optional filters to apply when fetching products */
  filters?: Record<string, unknown>;
  /** Maximum number of products to fetch (default: no limit) */
  limit?: number;
  /** Number of products to skip (for pagination) */
  offset?: number;
  /** Whether to generate embeddings for semantic search */
  generateEmbeddings?: boolean;
  /**
   * Whether to generate AI-powered descriptions using Claude AI.
   * When enabled, analyzes product thumbnails to generate bilingual descriptions
   * and AI embeddings for enhanced semantic search.
   * Default: false (for backward compatibility)
   * _Requirements: 1.1, 1.4_
   */
  generateAIDescriptions?: boolean;
  /**
   * Concurrency limit for AI description generation.
   * Controls how many products are processed in parallel.
   * Default: 3
   */
  aiDescriptionConcurrency?: number;
  /**
   * Concurrency limit for AI embedding generation.
   * Controls how many embeddings are generated in parallel.
   * Default: 5
   */
  aiEmbeddingConcurrency?: number;
};

/**
 * Product document structure for OpenSearch indexing
 */
type OpenSearchProductDocument = Record<string, unknown> & {
  id: string;
  title: string;
  description: string | null;
  handle: string;
  thumbnail: string | null;
  category_ids: string[];
  category_names: string[];
  collection_ids: string[];
  collection_names: string[];
  tag_ids: string[];
  tag_values: string[];
  price: number;
  created_at: Date;
  updated_at: Date;
  // AI-generated fields (optional, populated when generateAIDescriptions is true)
  ai_description_en?: string;
  ai_description_zh?: string;
  ai_colors?: string[];
  ai_materials?: string[];
  ai_design_elements?: string[];
  ai_style?: string;
  ai_analysis_timestamp?: string;
  // AI embedding fields (optional, populated when generateAIDescriptions is true)
  ai_text_embedding_en?: number[];
  ai_text_embedding_zh?: number[];
  ai_combined_embedding?: number[];
};

/**
 * Sync Products Workflow
 *
 * This workflow:
 * 1. Fetches products from Medusa using Query
 * 2. Separates published products from unpublished ones
 * 3. Transforms published products to OpenSearch document format
 * 4. Indexes published products to OpenSearch
 * 5. Removes unpublished products from OpenSearch index
 */
export const syncProductsWorkflow = createWorkflow('sync-products', (input: SyncProductsWorkflowInput) => {
  // Step 1: Fetch products using Query
  const { data: products, metadata } = useQueryGraphStep({
    entity: 'product',
    fields: [
      'id',
      'title',
      'description',
      'handle',
      'thumbnail',
      'categories.id',
      'categories.name',
      'collection.id',
      'collection.title',
      'tags.id',
      'tags.value',
      'variants.id',
      'variants.prices.*',
      'status',
      'created_at',
      'updated_at',
    ],
    pagination: {
      take: input.limit,
      skip: input.offset,
    },
    filters: input.filters,
  });

  // Step 2: Transform products - separate published from unpublished
  const { publishedProducts, unpublishedProductIds } = transform(
    { products },
    (data): { publishedProducts: OpenSearchProductDocument[]; unpublishedProductIds: string[] } => {
      const publishedProducts: OpenSearchProductDocument[] = [];
      const unpublishedProductIds: string[] = [];

      // Type assertion for products from Query
      const productList = data.products as Array<{
        id: string;
        title: string;
        description: string | null;
        handle: string;
        thumbnail: string | null;
        categories?: Array<{ id: string; name: string }>;
        collection?: { id: string; title: string } | null;
        tags?: Array<{ id: string; value: string }>;
        variants?: Array<{
          id: string;
          prices?: Array<{
            amount: number;
            currency_code: string;
          }>;
        }>;
        status: string;
        created_at: Date;
        updated_at: Date;
      }>;

      productList.forEach((product) => {
        if (product.status === 'published') {
          // Get the minimum price from all variants and prices
          let minPrice = 0;
          if (product.variants && product.variants.length > 0) {
            const allPrices = product.variants
              .flatMap((v) => v.prices || [])
              .map((p) => p.amount)
              .filter((amount) => amount > 0);
            if (allPrices.length > 0) {
              minPrice = Math.min(...allPrices);
            }
          }

          publishedProducts.push({
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            thumbnail: product.thumbnail,
            category_ids: product.categories?.map((c) => c.id) || [],
            category_names: product.categories?.map((c) => c.name) || [],
            collection_ids: product.collection ? [product.collection.id] : [],
            collection_names: product.collection ? [product.collection.title] : [],
            tag_ids: product.tags?.map((t) => t.id) || [],
            tag_values: product.tags?.map((t) => t.value) || [],
            price: minPrice,
            created_at: product.created_at,
            updated_at: product.updated_at,
          });
        } else {
          unpublishedProductIds.push(product.id);
        }
      });

      return { publishedProducts, unpublishedProductIds };
    },
  );

  // Step 3: Generate embeddings for published products (text + image)
  const { products: productsWithEmbeddings } = generateEmbeddingsStep({
    products: publishedProducts,
    generateImageEmbeddings: true,
  });

  // Step 4: Conditionally generate AI descriptions and embeddings when feature flag is enabled
  // Uses `when()` for workflow conditional execution
  // Both AI steps are grouped together since they depend on each other
  // _Requirements: 1.1, 1.4_
  const aiProcessingOutput = when(
    'generate-ai-content-conditional',
    input,
    (inputData) => inputData.generateAIDescriptions === true,
  ).then(() => {
    // Generate AI descriptions from product thumbnails using Claude AI
    const aiDescriptions = generateAIDescriptionsStep({
      products: publishedProducts,
      concurrency: input.aiDescriptionConcurrency,
    });

    // Generate embeddings from AI descriptions (English, Chinese, and combined)
    const aiEmbeddings = generateAIEmbeddingsStep({
      aiDescriptions: aiDescriptions.results,
      concurrency: input.aiEmbeddingConcurrency,
    });

    // Return both results using transform to combine them
    const combinedResult = transform({ aiDescriptions, aiEmbeddings }, (data) => ({
      descriptions: data.aiDescriptions,
      embeddings: data.aiEmbeddings,
    }));

    return combinedResult;
  });

  // Step 5: Merge AI fields into products before indexing
  // Combines base product data with AI descriptions and embeddings
  const productsToIndex = transform(
    {
      products: productsWithEmbeddings,
      aiProcessing: aiProcessingOutput,
      generateAIDescriptions: input.generateAIDescriptions,
    },
    (data): OpenSearchProductDocument[] => {
      // If AI descriptions were not generated, return products as-is
      if (!data.generateAIDescriptions || !data.aiProcessing) {
        return data.products as OpenSearchProductDocument[];
      }

      // Extract AI results from the combined output
      const aiProcessing = data.aiProcessing as {
        descriptions: { results: AIDescriptionResult[]; failed: string[] };
        embeddings: { results: AIEmbeddingResult[]; failed: string[] };
      };

      // Create lookup maps for AI data by product ID
      const aiDescriptionMap = new Map<string, AIDescriptionResult>();
      const aiEmbeddingMap = new Map<string, AIEmbeddingResult>();

      // Build description lookup map
      if (aiProcessing.descriptions?.results) {
        for (const desc of aiProcessing.descriptions.results) {
          aiDescriptionMap.set(desc.product_id, desc);
        }
      }

      // Build embedding lookup map
      if (aiProcessing.embeddings?.results) {
        for (const emb of aiProcessing.embeddings.results) {
          aiEmbeddingMap.set(emb.product_id, emb);
        }
      }

      // Merge AI fields into each product
      return (data.products as OpenSearchProductDocument[]).map((product) => {
        const aiDesc = aiDescriptionMap.get(product.id);
        const aiEmb = aiEmbeddingMap.get(product.id);

        // If no AI data for this product, return as-is
        if (!aiDesc && !aiEmb) {
          return product;
        }

        // Merge AI description fields
        const mergedProduct: OpenSearchProductDocument = { ...product };

        if (aiDesc) {
          mergedProduct.ai_description_en = aiDesc.ai_description_en;
          mergedProduct.ai_description_zh = aiDesc.ai_description_zh;
          mergedProduct.ai_colors = aiDesc.ai_colors;
          mergedProduct.ai_materials = aiDesc.ai_materials;
          mergedProduct.ai_design_elements = aiDesc.ai_design_elements;
          mergedProduct.ai_style = aiDesc.ai_style;
          mergedProduct.ai_analysis_timestamp = aiDesc.ai_analysis_timestamp;
        }

        // Merge AI embedding fields
        if (aiEmb) {
          mergedProduct.ai_text_embedding_en = aiEmb.ai_text_embedding_en;
          mergedProduct.ai_text_embedding_zh = aiEmb.ai_text_embedding_zh;
          mergedProduct.ai_combined_embedding = aiEmb.ai_combined_embedding;
        }

        return mergedProduct;
      });
    },
  );

  // Step 6: Index products (with embeddings and optional AI fields) to OpenSearch
  syncProductsStep({ products: productsToIndex });

  // Step 7: Remove unpublished products from OpenSearch
  deleteProductsFromOpenSearchStep({ ids: unpublishedProductIds });

  // Return workflow response
  return new WorkflowResponse({ products, metadata });
});

export default syncProductsWorkflow;
