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
 * Region information from Medusa
 */
interface RegionInfo {
  id: string;
  name: string;
  currency_code: string;
}

/**
 * Category information from Medusa
 */
interface CategoryInfo {
  id: string;
  name: string;
  handle: string;
  parent_category_id: string | null;
}

/**
 * Hierarchical category information for a product
 */
interface CategoryHierarchy {
  /** All ancestor category IDs (from root to leaf) */
  categoryIds: string[];
  /** All ancestor category names (from root to leaf) */
  categoryNames: string[];
  /** Full path string (e.g., "Furniture > Living Room > Sofas") */
  categoryPath: string;
  /** Depth level of the most specific category (0-indexed) */
  categoryLevel: number;
  /** Direct parent category ID (null for root categories) */
  categoryParentId: string | null;
}

/**
 * Build a map of category ID to category info for quick lookups
 */
function buildCategoryMap(categories: CategoryInfo[]): Map<string, CategoryInfo> {
  const map = new Map<string, CategoryInfo>();
  for (const category of categories) {
    map.set(category.id, category);
  }
  return map;
}

/**
 * Traverse category tree and collect all ancestors for a given category
 * Returns ancestors from root to the given category (inclusive)
 *
 * @param categoryId - The category ID to start from
 * @param categoryMap - Map of all categories for quick lookup
 * @returns Array of categories from root to the given category
 */
function collectCategoryAncestors(categoryId: string, categoryMap: Map<string, CategoryInfo>): CategoryInfo[] {
  const ancestors: CategoryInfo[] = [];
  let currentId: string | null = categoryId;

  // Traverse up the tree collecting ancestors
  while (currentId) {
    const category = categoryMap.get(currentId);
    if (!category) break;

    ancestors.unshift(category); // Add to beginning (root first)
    currentId = category.parent_category_id;
  }

  return ancestors;
}

/**
 * Build hierarchical category information for a product
 * Collects all ancestor IDs/names and builds the path string
 *
 * @param productCategories - Categories directly assigned to the product
 * @param categoryMap - Map of all categories for quick lookup
 * @returns Hierarchical category information
 */
function buildCategoryHierarchy(
  productCategories: Array<{ id: string; name: string }>,
  categoryMap: Map<string, CategoryInfo>,
): CategoryHierarchy {
  if (!productCategories || productCategories.length === 0) {
    return {
      categoryIds: [],
      categoryNames: [],
      categoryPath: '',
      categoryLevel: -1,
      categoryParentId: null,
    };
  }

  // Collect all unique ancestor IDs and names across all product categories
  const allCategoryIds = new Set<string>();
  const allCategoryNames = new Set<string>();
  let deepestLevel = -1;
  let deepestCategoryParentId: string | null = null;
  let deepestCategoryPath = '';

  for (const productCategory of productCategories) {
    const ancestors = collectCategoryAncestors(productCategory.id, categoryMap);

    // Add all ancestors to the sets
    for (const ancestor of ancestors) {
      allCategoryIds.add(ancestor.id);
      allCategoryNames.add(ancestor.name);
    }

    // Track the deepest category for path and level
    const level = ancestors.length - 1; // 0-indexed
    if (level > deepestLevel) {
      deepestLevel = level;
      deepestCategoryPath = ancestors.map((a) => a.name).join(' > ');
      // Parent is the second-to-last in the chain, or null if root
      deepestCategoryParentId = ancestors.length > 1 ? ancestors[ancestors.length - 2].id : null;
    }
  }

  return {
    categoryIds: Array.from(allCategoryIds),
    categoryNames: Array.from(allCategoryNames),
    categoryPath: deepestCategoryPath,
    categoryLevel: deepestLevel,
    categoryParentId: deepestCategoryParentId,
  };
}

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
 * Normalize region ID for use as field suffix
 * Converts "reg_01ABC123" to "01abc123" (lowercase, no prefix)
 */
function normalizeRegionId(regionId: string): string {
  // Remove "reg_" prefix if present and convert to lowercase
  return regionId.replace(/^reg_/i, '').toLowerCase();
}

/**
 * Calculate per-region minimum prices from variant prices
 * @param variants - Product variants
 * @param variantPrices - Map of variant ID to prices
 * @param regions - Available regions
 * @returns Object with per-region price fields and default price
 */
function calculateRegionPrices(
  variants: any[],
  variantPrices: Map<string, any[]>,
  regions: RegionInfo[],
): {
  regionPriceFields: Record<string, number | string>;
  defaultPrice: number;
  defaultCurrency: string;
  minPrice: number;
  maxPrice: number;
  currencyCode: string;
} {
  // Track min prices per region
  const regionMinPrices = new Map<string, { minPrice: number; currencyCode: string }>();

  // Track all prices for overall min/max
  const allPrices: number[] = [];
  let defaultCurrency = '';

  // Process each variant's prices
  for (const variant of variants || []) {
    const prices = variantPrices.get(variant.id) || [];

    for (const price of prices) {
      if (price.amount == null) continue;

      allPrices.push(price.amount);

      // Set default currency from first price found
      if (!defaultCurrency && price.currency_code) {
        defaultCurrency = price.currency_code;
      }

      // If price has region_id, track it for that region
      if (price.region_id) {
        const normalizedRegionId = normalizeRegionId(price.region_id);
        const existing = regionMinPrices.get(normalizedRegionId);

        if (!existing || price.amount < existing.minPrice) {
          regionMinPrices.set(normalizedRegionId, {
            minPrice: price.amount,
            currencyCode: price.currency_code || defaultCurrency,
          });
        }
      } else if (price.currency_code) {
        // Price without region_id - associate with regions that have matching currency
        for (const region of regions) {
          if (region.currency_code === price.currency_code) {
            const normalizedRegionId = normalizeRegionId(region.id);
            const existing = regionMinPrices.get(normalizedRegionId);

            // Only set if no region-specific price exists or this is lower
            if (!existing || price.amount < existing.minPrice) {
              regionMinPrices.set(normalizedRegionId, {
                minPrice: price.amount,
                currencyCode: price.currency_code,
              });
            }
          }
        }
      }
    }
  }

  // Calculate overall min/max prices
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;

  // Build per-region price fields
  const regionPriceFields: Record<string, number | string> = {};

  for (const [normalizedRegionId, priceInfo] of regionMinPrices) {
    regionPriceFields[`price_reg_${normalizedRegionId}`] = priceInfo.minPrice;
    regionPriceFields[`currency_reg_${normalizedRegionId}`] = priceInfo.currencyCode;
  }

  return {
    regionPriceFields,
    defaultPrice: minPrice,
    defaultCurrency: defaultCurrency || 'usd',
    minPrice,
    maxPrice,
    currencyCode: defaultCurrency,
  };
}

/**
 * Transform a product to OpenSearch document format
 */
function transformProduct(
  product: any,
  variantPrices: Map<string, any[]>,
  regions: RegionInfo[],
  categoryMap: Map<string, CategoryInfo>,
): Record<string, unknown> {
  const metadataFacets = extractMetadataFacets(product.metadata);
  const options = extractOptions(product.options);
  const variantInfo = extractVariantInfo(product.variants);

  // Calculate per-region prices
  const { regionPriceFields, defaultPrice, defaultCurrency, minPrice, maxPrice, currencyCode } = calculateRegionPrices(
    product.variants,
    variantPrices,
    regions,
  );

  // Build hierarchical category information
  const categoryHierarchy = buildCategoryHierarchy(product.categories || [], categoryMap);

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

    // Categories (hierarchical - includes all ancestors)
    category_ids: categoryHierarchy.categoryIds,
    category_names: categoryHierarchy.categoryNames,
    category_path: categoryHierarchy.categoryPath,
    category_level: categoryHierarchy.categoryLevel,
    category_parent_id: categoryHierarchy.categoryParentId,

    // Collections
    collection_ids: product.collection_id ? [product.collection_id] : [],
    collection_names: product.collection?.title ? [product.collection.title] : [],

    // Tags
    tag_ids: product.tags?.map((t: any) => t.id) || [],
    tag_values: product.tags?.map((t: any) => t.value) || [],

    // Options
    option_names: options.names,
    option_values: options.values,

    // Legacy prices (in cents) - for backward compatibility
    min_price: minPrice,
    max_price: maxPrice,
    price: minPrice,
    currency_code: currencyCode,

    // Per-region prices (dynamically named fields)
    // e.g., price_reg_01abc123, currency_reg_01abc123
    ...regionPriceFields,

    // Default/fallback price
    default_price: defaultPrice,
    default_currency: defaultCurrency,

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
    // Fetch all regions for per-region pricing
    logger.info('Fetching regions...');
    const { data: regionsData } = await query.graph({
      entity: 'region',
      fields: ['id', 'name', 'currency_code'],
    });
    const regions: RegionInfo[] = (regionsData as any[]).map((r) => ({
      id: r.id,
      name: r.name,
      currency_code: r.currency_code,
    }));
    logger.info(`Found ${regions.length} regions: ${regions.map((r) => `${r.name} (${r.currency_code})`).join(', ')}`);

    // Fetch all categories for hierarchical category support
    logger.info('Fetching categories for hierarchy...');
    const { data: categoriesData } = await query.graph({
      entity: 'product_category',
      fields: ['id', 'name', 'handle', 'parent_category_id'],
    });
    const categories: CategoryInfo[] = (categoriesData as any[]).map((c) => ({
      id: c.id,
      name: c.name,
      handle: c.handle,
      parent_category_id: c.parent_category_id,
    }));
    const categoryMap = buildCategoryMap(categories);
    logger.info(`Found ${categories.length} categories for hierarchy building`);

    // Log category hierarchy for debugging
    const rootCategories = categories.filter((c) => !c.parent_category_id);
    logger.info(`Root categories: ${rootCategories.map((c) => c.name).join(', ')}`);

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
    let withRegionPrices = 0;
    let withMetadata = 0;
    let withCollections = 0;
    let withCategories = 0;
    let withCategoryHierarchy = 0;
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
      // Include region_id to support per-region pricing
      const variantPrices = new Map<string, any[]>();

      if (variantIds.length > 0) {
        try {
          const { data: variants } = await query.graph({
            entity: 'variant',
            fields: ['id', 'prices.amount', 'prices.currency_code', 'prices.region_id'],
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

      // Transform products to OpenSearch documents (with region pricing and hierarchical categories)
      const documents = products.map((p: any) => transformProduct(p, variantPrices, regions, categoryMap));

      // Update stats
      withPrices += documents.filter((d: any) => d.min_price > 0).length;
      withRegionPrices += documents.filter((d: any) => {
        // Check if any price_reg_* field exists
        return Object.keys(d).some((key) => key.startsWith('price_reg_') && d[key] > 0);
      }).length;
      withMetadata += documents.filter((d: any) => Object.keys(d.metadata || {}).length > 0).length;
      withCollections += documents.filter((d: any) => d.collection_names.length > 0).length;
      withCategories += documents.filter((d: any) => d.category_names.length > 0).length;
      withCategoryHierarchy += documents.filter((d: any) => d.category_path && d.category_path.length > 0).length;

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
    logger.info(`  - Products with region prices: ${withRegionPrices}/${processedCount}`);
    logger.info(`  - Products with metadata: ${withMetadata}/${processedCount}`);
    logger.info(`  - Products with collections: ${withCollections}/${processedCount}`);
    logger.info(`  - Products with categories: ${withCategories}/${processedCount}`);
    logger.info(`  - Products with category hierarchy: ${withCategoryHierarchy}/${processedCount}`);
  } catch (error) {
    logger.error('Failed to sync products to OpenSearch:', error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}
