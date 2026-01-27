/**
 * Script to sync all products to OpenSearch
 * Run with: yarn medusa exec ./src/scripts/sync-opensearch.ts
 */

import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';

const BATCH_SIZE = 10; // Process products in small batches

// Known metadata keys that should be indexed as facets
const METADATA_FACET_KEYS = ['care', 'material', 'warranty', 'assembly', 'cover_type', 'filling'] as const;

/**
 * Extract metadata fields as individual facet values
 */
function extractMetadataFacets(metadata: Record<string, unknown> | null | undefined): Record<string, string> {
  const facets: Record<string, string> = {};

  if (!metadata || typeof metadata !== 'object') {
    return facets;
  }

  for (const key of METADATA_FACET_KEYS) {
    const value = metadata[key];
    if (value != null && typeof value === 'string' && value.trim() !== '') {
      facets[`meta_${key}`] = value.trim();
    }
  }

  return facets;
}

/**
 * Extract option information from product
 */
function extractOptions(options: any[]): { names: string[]; values: string[] } {
  const names: string[] = [];
  const values: string[] = [];

  for (const option of options || []) {
    if (option.title) {
      names.push(option.title);
    }
    for (const optionValue of option.values || []) {
      if (optionValue.value) {
        values.push(optionValue.value);
      }
    }
  }

  return { names, values };
}

/**
 * Extract variant information
 */
function extractVariantInfo(variants: any[]): {
  count: number;
  skus: string[];
  titles: string[];
} {
  const skus: string[] = [];
  const titles: string[] = [];

  for (const variant of variants || []) {
    if (variant.sku) {
      skus.push(variant.sku);
    }
    if (variant.title) {
      titles.push(variant.title);
    }
  }

  return {
    count: variants?.length || 0,
    skus,
    titles,
  };
}

/**
 * Transform a product to OpenSearch document format
 */
function transformProduct(product: any, variantPrices: Map<string, any[]>): Record<string, unknown> {
  const metadataFacets = extractMetadataFacets(product.metadata);
  const options = extractOptions(product.options);
  const variantInfo = extractVariantInfo(product.variants);

  // Calculate price range from variant prices
  let minPrice = 0;
  let maxPrice = 0;
  let currencyCode = '';

  const allPrices: number[] = [];
  for (const variant of product.variants || []) {
    const prices = variantPrices.get(variant.id) || [];
    for (const price of prices) {
      if (price.amount != null) {
        allPrices.push(price.amount);
        if (!currencyCode && price.currency_code) {
          currencyCode = price.currency_code;
        }
      }
    }
  }

  if (allPrices.length > 0) {
    minPrice = Math.min(...allPrices);
    maxPrice = Math.max(...allPrices);
  }

  return {
    // Basic info
    id: product.id,
    title: product.title,
    subtitle: product.subtitle || '',
    description: product.description || '',
    handle: product.handle,
    thumbnail: product.thumbnail || product.images?.[0]?.url || '',
    status: product.status || 'draft',

    // Product attributes (from product model)
    weight: product.weight || null,
    height: product.height || null,
    width: product.width || null,
    length: product.length || null,
    origin_country: product.origin_country || '',
    is_giftcard: product.is_giftcard || false,
    discountable: product.discountable !== false,

    // Product type
    type_id: product.type_id || product.type?.id || '',
    type_name: product.type?.value || '',

    // Categories
    category_ids: product.categories?.map((c: any) => c.id) || [],
    category_names: product.categories?.map((c: any) => c.name) || [],

    // Collections
    collection_ids: product.collection_id ? [product.collection_id] : [],
    collection_names: product.collection?.title ? [product.collection.title] : [],

    // Tags
    tag_ids: product.tags?.map((t: any) => t.id) || [],
    tag_values: product.tags?.map((t: any) => t.value) || [],

    // Options
    option_names: options.names,
    option_values: options.values,

    // Prices (in cents)
    min_price: minPrice,
    max_price: maxPrice,
    price: minPrice, // backward compatibility
    currency_code: currencyCode,

    // Variants
    variant_count: variantInfo.count,
    variant_skus: variantInfo.skus,
    variant_titles: variantInfo.titles,

    // Metadata facets (individual fields for filtering)
    ...metadataFacets,

    // Raw metadata for display
    metadata: product.metadata || {},

    // Timestamps
    created_at: product.created_at,
    updated_at: product.updated_at,
  };
}

export default async function syncOpenSearch({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productService = container.resolve(Modules.PRODUCT);
  const pricingService = container.resolve(Modules.PRICING);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  // Try to resolve OpenSearch service
  let opensearchService: any;
  try {
    opensearchService = container.resolve('opensearch');
  } catch (error) {
    logger.error('OpenSearch module not found. Make sure it is configured in medusa-config.ts');
    return;
  }

  logger.info('Starting product sync to OpenSearch...');

  try {
    // Delete existing index to apply new mapping
    logger.info('Deleting existing index to apply new mapping...');
    await opensearchService.deleteIndex('product');

    // Get product count first
    const [, totalCount] = await productService.listAndCountProducts({}, { take: 1 });
    logger.info(`Found ${totalCount} products to sync`);

    if (totalCount === 0) {
      logger.info('No products to sync');
      return;
    }

    let processedCount = 0;
    let withPrices = 0;
    let withMetadata = 0;
    let withCollections = 0;
    let withCategories = 0;
    let offset = 0;

    // Process in batches using Product Service
    while (offset < totalCount) {
      logger.info(`Processing batch ${Math.floor(offset / BATCH_SIZE) + 1}/${Math.ceil(totalCount / BATCH_SIZE)}`);

      // Fetch products with relations (but not prices - those come from Pricing module)
      const [products] = await productService.listAndCountProducts(
        {},
        {
          relations: ['variants', 'categories', 'tags', 'images', 'options', 'options.values', 'type', 'collection'],
          take: BATCH_SIZE,
          skip: offset,
        },
      );

      if (products.length === 0) break;

      // Get variant IDs for this batch
      const variantIds: string[] = [];
      for (const product of products) {
        for (const variant of product.variants || []) {
          variantIds.push(variant.id);
        }
      }

      // Fetch prices for all variants in this batch using Query
      const variantPrices = new Map<string, any[]>();

      if (variantIds.length > 0) {
        try {
          const { data: variants } = await query.graph({
            entity: 'variant',
            fields: ['id', 'prices.amount', 'prices.currency_code'],
            filters: {
              id: variantIds,
            },
          });

          for (const variant of variants as any[]) {
            variantPrices.set(variant.id, variant.prices || []);
          }
        } catch (priceError) {
          logger.warn(`Could not fetch prices for batch: ${priceError}`);
        }
      }

      // Log first product structure for debugging (only first batch)
      if (offset === 0 && products.length > 0) {
        const sampleProduct = products[0];
        logger.info(`Sample product fields: ${Object.keys(sampleProduct).join(', ')}`);
        if (sampleProduct.metadata) {
          logger.info(`Sample metadata: ${JSON.stringify(sampleProduct.metadata)}`);
        }
        if (sampleProduct.collection) {
          logger.info(`Sample collection: id=${sampleProduct.collection.id}, title=${sampleProduct.collection.title}`);
        }
        const sampleVariantId = sampleProduct.variants?.[0]?.id;
        if (sampleVariantId && variantPrices.has(sampleVariantId)) {
          logger.info(`Sample variant prices: ${JSON.stringify(variantPrices.get(sampleVariantId))}`);
        }
      }

      // Transform products to OpenSearch documents
      const documents = products.map((p: any) => transformProduct(p, variantPrices));

      // Update stats
      withPrices += documents.filter((d: any) => d.min_price > 0).length;
      withMetadata += documents.filter((d: any) => Object.keys(d.metadata || {}).length > 0).length;
      withCollections += documents.filter((d: any) => d.collection_names.length > 0).length;
      withCategories += documents.filter((d: any) => d.category_names.length > 0).length;

      // Log sample document (only first batch)
      if (offset === 0 && documents.length > 0) {
        logger.info(`Sample document: ${JSON.stringify(documents[0], null, 2)}`);
      }

      // Index this batch to OpenSearch
      await opensearchService.indexData(documents, 'product');
      processedCount += documents.length;
      logger.info(`Indexed ${processedCount}/${totalCount} products`);

      offset += BATCH_SIZE;
    }

    logger.info(`Successfully synced ${processedCount} products to OpenSearch`);

    // Log summary
    logger.info(`Summary:`);
    logger.info(`  - Products with prices: ${withPrices}/${processedCount}`);
    logger.info(`  - Products with metadata: ${withMetadata}/${processedCount}`);
    logger.info(`  - Products with collections: ${withCollections}/${processedCount}`);
    logger.info(`  - Products with categories: ${withCategories}/${processedCount}`);
  } catch (error) {
    logger.error('Failed to sync products to OpenSearch:', error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}
