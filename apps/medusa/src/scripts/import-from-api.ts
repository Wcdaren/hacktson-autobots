import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Sitemap-Based Product Importer (Enhanced)
 *
 * Strategy:
 * 1. Fetch product URLs from Castlery sitemap.xml
 * 2. Extract product slugs from URLs
 * 3. Fetch detailed data from Castlery Production API
 *
 * Enhanced Features:
 * - Variant-specific images (each variant has its own gallery)
 * - Product properties (material, care, dimensions, comfort ratings)
 * - Variant properties (fabric composition, etc.)
 * - Original price (list_price) for sale display
 * - Dimension images per variant
 * - Option swatch images
 */

interface ImportConfig {
  maxProducts: number;
  apiBaseUrl: string;
  sitemapUrl: string;
  concurrency: number;
}

const IMPORT_CONFIG: ImportConfig = {
  maxProducts: parseInt(process.env.MAX_PRODUCTS || '40'),
  apiBaseUrl: 'https://apigw-sg-prod.castlery.com/v2/products',
  sitemapUrl: 'https://www.castlery.com/sg/sitemap.xml',
  concurrency: 5,
};

/**
 * Fetch and parse sitemap.xml to extract product URLs
 */
async function fetchProductSlugsFromSitemap(): Promise<string[]> {
  try {
    const response = await fetch(IMPORT_CONFIG.sitemapUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`);
    }

    const xml = await response.text();

    // Extract URLs from sitemap XML
    const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
    if (!urlMatches) {
      throw new Error('No URLs found in sitemap');
    }

    // Extract product slugs from URLs
    const slugs: string[] = [];
    const productUrlPattern = /\/products\/([^\/\?]+)/;

    for (const match of urlMatches) {
      const url = match.replace(/<\/?loc>/g, '');
      const slugMatch = url.match(productUrlPattern);

      if (slugMatch && slugMatch[1]) {
        slugs.push(slugMatch[1]);
      }
    }

    return slugs;
  } catch (error) {
    throw new Error(`Failed to fetch sitemap: ${error instanceof Error ? error.message : error}`);
  }
}

/**
 * Fetch product details from Castlery API (v2)
 */
async function fetchProductFromAPI(slug: string): Promise<any> {
  const url = `${IMPORT_CONFIG.apiBaseUrl}/${slug}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`⚠️  API error for ${slug}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`⚠️  Failed to fetch ${slug}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Fetch products in batches with concurrency control
 */
async function fetchProductsBatch(slugs: string[]): Promise<any[]> {
  const results: any[] = [];

  for (let i = 0; i < slugs.length; i += IMPORT_CONFIG.concurrency) {
    const batch = slugs.slice(i, i + IMPORT_CONFIG.concurrency);
    const batchResults = await Promise.all(batch.map((slug) => fetchProductFromAPI(slug)));
    results.push(...batchResults);

    // Progress indicator
    const progress = Math.min(i + IMPORT_CONFIG.concurrency, slugs.length);
    process.stdout.write(`\r   Fetching: ${progress}/${slugs.length} products...`);
  }

  console.log(''); // New line after progress
  return results.filter(Boolean); // Remove nulls
}

/**
 * Category with hierarchical structure
 */
interface Category {
  name: string;
  permalink: string;
  level: number;
  parent?: string;
}

/**
 * Extract hierarchical categories from taxons
 */
function extractCategories(taxons: any[]): Category[] {
  if (!taxons || !Array.isArray(taxons)) return [];

  const categories: Category[] = [];
  const seen = new Set<string>();

  taxons.forEach((taxon: any) => {
    if (taxon.ancestors && taxon.ancestors.includes('Category')) {
      if (taxon.name === 'Category') return;
      if (seen.has(taxon.name)) return;
      seen.add(taxon.name);

      categories.push({
        name: taxon.name,
        permalink: taxon.permalink,
        level: taxon.level,
        parent: taxon.ancestors && taxon.ancestors.length > 1 ? taxon.ancestors[taxon.ancestors.length - 1] : undefined,
      });
    }
  });

  return categories;
}

/**
 * Extract collection from taxons
 */
function extractCollection(taxons: any[]): string | null {
  if (!taxons || !Array.isArray(taxons)) return null;

  const collectionTaxon = taxons.find((t: any) => t.ancestors && t.ancestors.includes('Collections') && t.level === 1);

  return collectionTaxon?.name || null;
}

/**
 * Product option with values and metadata
 */
interface ProductOption {
  title: string;
  values: Array<{
    value: string;
    presentation: string;
    image?: string;
  }>;
}

/**
 * Extract product options from API variant data
 */
function extractProductOptions(variants: any[]): ProductOption[] {
  const optionMap = new Map<string, Map<string, { presentation: string; image?: string }>>();

  variants.forEach((variant) => {
    if (!variant.variant_option_values) return;

    variant.variant_option_values.forEach((optionValue: any) => {
      const optionName = optionValue.option_type_presentation || optionValue.option_type_name;
      const valueName = optionValue.name;
      const presentation = optionValue.presentation || valueName;

      if (!optionMap.has(optionName)) {
        optionMap.set(optionName, new Map());
      }

      const valueMap = optionMap.get(optionName)!;
      if (!valueMap.has(valueName)) {
        valueMap.set(valueName, {
          presentation,
          image: optionValue.image_src || undefined,
        });
      }
    });
  });

  return Array.from(optionMap.entries()).map(([title, valueMap]) => ({
    title,
    values: Array.from(valueMap.entries())
      .map(([value, data]) => ({
        value,
        presentation: data.presentation,
        image: data.image,
      }))
      .sort((a, b) => a.presentation.localeCompare(b.presentation)),
  }));
}

/**
 * Extract variant options
 */
function extractVariantOptions(variant: any, productOptions: ProductOption[]): Record<string, string> {
  const options: Record<string, string> = {};

  // Check if variant has option values (must be non-empty array)
  const hasOptionValues =
    variant.variant_option_values &&
    Array.isArray(variant.variant_option_values) &&
    variant.variant_option_values.length > 0;

  if (!hasOptionValues) {
    // No option values on variant - use defaults from product options
    productOptions.forEach((opt) => {
      options[opt.title] = opt.values[0]?.presentation || 'Default';
    });
    return options;
  }

  // Extract options from variant's option values
  variant.variant_option_values.forEach((optionValue: any) => {
    const optionName = optionValue.option_type_presentation || optionValue.option_type_name;
    const presentation = optionValue.presentation || optionValue.name;
    options[optionName] = presentation;
  });

  // Ensure all product options have a value (fill in missing ones)
  productOptions.forEach((opt) => {
    if (!options[opt.title]) {
      options[opt.title] = opt.values[0]?.presentation || 'Default';
    }
  });

  return options;
}

/**
 * Extract images from a variant
 */
function extractVariantImages(variant: any): string[] {
  const images: string[] = [];

  // Extract from images array (product shots)
  if (variant.images && Array.isArray(variant.images)) {
    variant.images.forEach((img: any) => {
      const imageUrl = img.links?.large || img.links?.medium || img.product_url;
      if (imageUrl && !images.includes(imageUrl)) {
        images.push(imageUrl);
      }
    });
  }

  // Extract from assets array (lifestyle shots)
  if (variant.assets && Array.isArray(variant.assets)) {
    variant.assets.forEach((asset: any) => {
      const imageUrl = asset.links?.large || asset.links?.medium || asset.product_url;
      if (imageUrl && !images.includes(imageUrl)) {
        images.push(imageUrl);
      }
    });
  }

  // Add dimension image if available
  if (variant.dimension_image?.links?.large) {
    const dimUrl = variant.dimension_image.links.large;
    if (!images.includes(dimUrl)) {
      images.push(dimUrl);
    }
  }

  return images;
}

/**
 * Product property with structured data
 */
interface ProductProperty {
  name: string;
  presentation: string;
  value: string;
  explanation?: string;
}

/**
 * Extract product properties from API data
 */
function extractProductProperties(apiProduct: any): {
  details: ProductProperty[];
  dimensions: ProductProperty[];
  deliveryReturns: ProductProperty[];
  comfortRatings: ProductProperty[];
} {
  const props = apiProduct.product_properties || {};

  const extractProps = (arr: any[]): ProductProperty[] => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr
      .filter((p: any) => p.is_public !== false)
      .map((p: any) => ({
        name: p.name,
        presentation: p.presentation,
        value: p.value,
        explanation: p.explanation,
      }));
  };

  return {
    details: extractProps(props.product_details),
    dimensions: extractProps(props.product_dimensions),
    deliveryReturns: extractProps(props.delivery_returns),
    comfortRatings: extractProps(props.comfort_ratings),
  };
}

/**
 * Extract variant-specific properties
 */
function extractVariantProperties(variant: any): ProductProperty[] {
  const props = variant.variant_properties || {};
  const allProps: ProductProperty[] = [];

  ['product_details', 'product_dimensions', 'delivery_returns', 'comfort_ratings'].forEach((key) => {
    if (props[key] && Array.isArray(props[key])) {
      props[key].forEach((p: any) => {
        if (p.is_public !== false) {
          allProps.push({
            name: p.name,
            presentation: p.presentation,
            value: p.value,
          });
        }
      });
    }
  });

  return allProps;
}

/**
 * Transform API product to Medusa format
 */
function transformAPIProduct(apiProduct: any, index: number): any {
  if (!apiProduct.variants || apiProduct.variants.length === 0) {
    console.warn(`⚠️  Product ${apiProduct.slug} has no variants, skipping`);
    return null;
  }

  const title = apiProduct.name || `Product ${index + 1}`;
  const handle = apiProduct.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const description = apiProduct.description || '';

  if (!title || title.trim().length === 0) {
    console.warn(`⚠️  Product ${apiProduct.slug} has no title, skipping`);
    return null;
  }

  const basePrice = parseFloat(apiProduct.price) || 0;
  const listPrice = parseFloat(apiProduct.list_price) || basePrice;

  if (basePrice <= 0) {
    console.warn(`⚠️  Product ${apiProduct.slug} has invalid price: ${basePrice}, skipping`);
    return null;
  }

  const firstVariant = apiProduct.variants[0];

  // Extract ALL images from ALL variants for product-level images (deduplicated)
  const allImagesSet = new Set<string>();
  apiProduct.variants.forEach((variant: any) => {
    const variantImages = extractVariantImages(variant);
    variantImages.forEach((img: string) => allImagesSet.add(img));
  });
  const images = Array.from(allImagesSet);

  // Use first image as thumbnail
  const thumbnail = images[0] || '';

  const categories = extractCategories(apiProduct.taxons);
  const collection = extractCollection(apiProduct.taxons);

  // Extract tags from first variant (they're usually the same across variants)
  const tags: string[] = [];
  if (firstVariant.tags && Array.isArray(firstVariant.tags)) {
    firstVariant.tags.forEach((tag: string) => {
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    });
  }

  if (firstVariant.badges && Array.isArray(firstVariant.badges)) {
    firstVariant.badges.forEach((badge: string) => {
      const badgeTag = `badge:${badge.toLowerCase()}`;
      if (!tags.includes(badgeTag)) {
        tags.push(badgeTag);
      }
    });
  }

  const status = !apiProduct.discontinued && apiProduct.available_on ? 'published' : 'draft';

  const productOptions = extractProductOptions(apiProduct.variants);

  if (productOptions.length === 0) {
    productOptions.push({
      title: 'Default',
      values: [{ value: 'Default', presentation: 'Default' }],
    });
  }

  // Extract product properties (material, care, dimensions, etc.)
  const productProperties = extractProductProperties(apiProduct);

  // Build metadata from product properties
  const metadata: Record<string, any> = {};

  if (productProperties.details.length > 0) {
    metadata.material = productProperties.details.find((p) => p.name === 'material')?.value;
    metadata.care = productProperties.details.find((p) => p.name === 'care')?.value;
    metadata.filling = productProperties.details.find((p) => p.name === 'filling')?.value;
    metadata.cover_type = productProperties.details.find((p) => p.name === 'cover_type')?.value;
  }

  if (productProperties.dimensions.length > 0) {
    metadata.dimensions = productProperties.dimensions.find((p) => p.name === 'general_dimensions')?.value;
    metadata.weight = productProperties.dimensions.find((p) => p.name === 'product_weight')?.value;
    metadata.seating_depth = productProperties.dimensions.find((p) => p.name === 'seating_depth')?.value;
    metadata.seating_height = productProperties.dimensions.find((p) => p.name === 'seating_height')?.value;
  }

  if (productProperties.comfortRatings.length > 0) {
    metadata.comfort_ratings = {};
    productProperties.comfortRatings.forEach((r) => {
      metadata.comfort_ratings[r.name] = r.value;
    });
  }

  if (productProperties.deliveryReturns.length > 0) {
    metadata.warranty = productProperties.deliveryReturns.find((p) => p.name === 'warranty')?.value;
    metadata.assembly = productProperties.deliveryReturns.find((p) => p.name === 'assembly_condition')?.value;
  }

  // Clean up undefined values from metadata
  Object.keys(metadata).forEach((key) => {
    if (metadata[key] === undefined) {
      delete metadata[key];
    }
  });

  // Transform variants with their own images
  const variants = apiProduct.variants.map((variant: any) => {
    const variantPrice = parseFloat(variant.price) || basePrice;
    const variantListPrice = parseFloat(variant.list_price) || listPrice;
    const options = extractVariantOptions(variant, productOptions);

    // Extract variant-specific properties
    const variantProps = extractVariantProperties(variant);
    const variantMetadata: Record<string, any> = {};

    variantProps.forEach((p) => {
      variantMetadata[p.name] = p.value;
    });

    return {
      title: variant.name || `${title} - Variant`,
      sku: variant.sku || `SKU-${apiProduct.id}`,
      options,
      price: variantPrice,
      listPrice: variantListPrice,
      images: variantImages,
      metadata: Object.keys(variantMetadata).length > 0 ? variantMetadata : undefined,
      manage_inventory: false,
    };
  });

  return {
    id: apiProduct.id,
    title,
    description,
    handle,
    status,
    thumbnail,
    images,
    categories,
    tags,
    collection,
    variants,
    productOptions,
    basePrice,
    listPrice,
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
  };
}

/**
 * Validate that all variants have options matching product options
 */
function validateProductOptions(product: any): boolean {
  const optionTitles = product.productOptions.map((o: ProductOption) => o.title);

  for (const variant of product.variants) {
    const variantOptionKeys = Object.keys(variant.options);

    // Check that variant has all required options
    for (const title of optionTitles) {
      if (!variantOptionKeys.includes(title)) {
        console.warn(`⚠️  Variant "${variant.sku}" missing option "${title}" for product "${product.title}"`);
        return false;
      }

      // Check that the option value is not empty
      if (!variant.options[title] || variant.options[title].trim() === '') {
        console.warn(`⚠️  Variant "${variant.sku}" has empty value for option "${title}" in product "${product.title}"`);
        return false;
      }
    }

    // Check that variant options match product option values
    for (const [optionTitle, optionValue] of Object.entries(variant.options)) {
      const productOption = product.productOptions.find((o: ProductOption) => o.title === optionTitle);
      if (!productOption) {
        console.warn(`⚠️  Variant "${variant.sku}" has unknown option "${optionTitle}" in product "${product.title}"`);
        return false;
      }

      const validValues = productOption.values.map((v: any) => v.presentation);
      if (!validValues.includes(optionValue as string)) {
        console.warn(
          `⚠️  Variant "${variant.sku}" has invalid value "${optionValue}" for option "${optionTitle}" in product "${product.title}". Valid values: ${validValues.join(', ')}`,
        );
        return false;
      }
    }
  }

  return true;
}

/**
 * Generate TypeScript seed file (enhanced with variant images)
 */
function generateSeedFile(
  products: any[],
  allCategories: Map<string, Category>,
  tags: Set<string>,
  collections: Set<string>,
): string {
  const categoryHierarchy: any[] = [];
  const rootCategories = Array.from(allCategories.values()).filter((c) => c.level === 1);

  rootCategories.forEach((root) => {
    const children = Array.from(allCategories.values())
      .filter((c) => c.parent === root.name)
      .map((c) => ({ name: c.name, permalink: c.permalink }));

    categoryHierarchy.push({
      name: root.name,
      permalink: root.permalink,
      children: children.length > 0 ? children : undefined,
    });
  });

  const tagsArray = Array.from(tags).filter(Boolean);
  const collectionsArray = Array.from(collections).filter(Boolean);

  return `import { CreateProductWorkflowInputDTO, ProductCollectionDTO, ProductTagDTO } from '@medusajs/framework/types';
import { ProductStatus } from '@medusajs/utils';

/**
 * Products imported from Castlery Production API (Enhanced)
 * Generated on: ${new Date().toISOString()}
 * Total products: ${products.length}
 * Source: Castlery Sitemap + Production API (https://apigw-sg-prod.castlery.com/v2)
 * 
 * Enhanced Features:
 * - Variant-specific images (each variant has its own gallery)
 * - Product metadata (material, care, dimensions, comfort ratings)
 * - Variant metadata (fabric composition, etc.)
 * - Original price (list_price) for sale display
 * - Option swatch images preserved in metadata
 */

export const importedCategoryHierarchy = ${JSON.stringify(categoryHierarchy, null, 2)};

export const importedCategories = ${JSON.stringify(
    Array.from(allCategories.values()).map((c) => c.name),
    null,
    2,
  )};

export const importedTags = ${JSON.stringify(tagsArray, null, 2)};

export const importedCollections = ${JSON.stringify(collectionsArray, null, 2)};

/**
 * Variant images map - stores images for each variant by SKU
 * This can be used to update variant images after product creation
 */
export const variantImagesMap: Record<string, string[]> = ${JSON.stringify(
    products.reduce((acc: Record<string, string[]>, product: any) => {
      product.variants.forEach((v: any) => {
        if (v.images && v.images.length > 0) {
          acc[v.sku] = v.images;
        }
      });
      return acc;
    }, {}),
    null,
    2,
  )};

export const seedProductsFromAPI = ({
  collections,
  tags,
  sales_channels,
  categories,
  shipping_profile_id,
  region_id,
}: {
  collections: ProductCollectionDTO[];
  tags: ProductTagDTO[];
  categories: { id: string; name: string }[];
  sales_channels: { id: string }[];
  shipping_profile_id: string;
  region_id: string;
}): CreateProductWorkflowInputDTO[] => [
${products
  .map((product) => {
    const categoryIds = product.categories
      .map((cat: Category) => `categories.find(c => c.name === ${JSON.stringify(cat.name)})?.id`)
      .filter(Boolean);

    const tagIds = product.tags
      .map((tag: string) => `tags.find(t => t.value === ${JSON.stringify(tag)})?.id`)
      .filter(Boolean);

    const collectionId = product.collection
      ? `collections.find(c => c.title === ${JSON.stringify(product.collection)})?.id`
      : 'undefined';

    const optionsStr = product.productOptions
      .map((option: ProductOption) => {
        const valuesStr = option.values
          .map((v: any) => {
            return `        ${JSON.stringify(v.presentation)}`;
          })
          .join(',\n');

        const hasImages = option.values.some((v: any) => v.image);
        const metadataStr = hasImages
          ? `,
        metadata: {
          swatches: ${JSON.stringify(
            option.values.reduce((acc: any, v: any) => {
              if (v.image) acc[v.presentation] = v.image;
              return acc;
            }, {}),
          )}
        }`
          : '';

        return `      {
        title: ${JSON.stringify(option.title)},
        values: [
${valuesStr}
        ]${metadataStr}
      }`;
      })
      .join(',\n');

    const variantsStr = product.variants
      .map((variant: any) => {
        // Build variant metadata string
        let variantMetadataStr = '';
        const variantMeta: Record<string, any> = {};

        // Add variant-specific metadata
        if (variant.metadata) {
          Object.assign(variantMeta, variant.metadata);
        }

        // Add variant images to metadata for later retrieval
        if (variant.images && variant.images.length > 0) {
          variantMeta.images = variant.images;
        }

        if (Object.keys(variantMeta).length > 0) {
          variantMetadataStr = `
        metadata: ${JSON.stringify(variantMeta, null, 10)},`;
        }

        return `      {
        title: ${JSON.stringify(variant.title)},
        sku: ${JSON.stringify(variant.sku)},
        options: ${JSON.stringify(variant.options, null, 10)},
        manage_inventory: false,${variantMetadataStr}
        prices: [
          {
            amount: ${Math.round(variant.price * 100)},
            currency_code: 'usd',
          },
          {
            amount: ${Math.round(variant.price * 100)},
            currency_code: 'usd',
            region_id,
          },
        ],
      }`;
      })
      .join(',\n');

    // Build product metadata string
    let productMetadataStr = '';
    if (product.metadata && Object.keys(product.metadata).length > 0) {
      productMetadataStr = `
    metadata: ${JSON.stringify(product.metadata, null, 4)},`;
    }

    return `  {
    title: ${JSON.stringify(product.title)},
    description: ${JSON.stringify(product.description)},
    handle: ${JSON.stringify(product.handle)},
    status: ProductStatus.${product.status.toUpperCase()},
    thumbnail: ${JSON.stringify(product.thumbnail)},
    shipping_profile_id,${productMetadataStr}
    ${categoryIds.length > 0 ? `category_ids: [${categoryIds.join(', ')}].filter(Boolean),` : ''}
    ${tagIds.length > 0 ? `tag_ids: [${tagIds.join(', ')}].filter(Boolean),` : ''}
    ${product.collection ? `collection_id: ${collectionId},` : ''}
    images: ${JSON.stringify(
      product.images.map((url: string) => ({ url })),
      null,
      6,
    )},
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
${optionsStr}
    ],
    variants: [
${variantsStr}
    ],
  }`;
  })
  .join(',\n')}
];
`;
}

async function main() {
  console.log('🚀 Sitemap-Based Product Importer');
  console.log('━'.repeat(80));
  console.log('');

  try {
    // Step 1: Fetch product slugs from sitemap
    console.log('📋 Step 1/3: Fetching product URLs from sitemap...');
    console.log(`   Sitemap: ${IMPORT_CONFIG.sitemapUrl}`);

    const allSlugs = await fetchProductSlugsFromSitemap();
    const slugs = allSlugs.slice(0, IMPORT_CONFIG.maxProducts);

    console.log(`✅ Found ${allSlugs.length} product URLs in sitemap`);
    console.log(`   Using first ${slugs.length} products`);
    console.log('');

    // Step 2: Fetch detailed data from API
    console.log('📦 Step 2/3: Fetching detailed data from Castlery Production API...');
    console.log(`   API: ${IMPORT_CONFIG.apiBaseUrl}`);
    console.log(`   Concurrency: ${IMPORT_CONFIG.concurrency} requests at a time`);

    const apiProducts = await fetchProductsBatch(slugs);

    console.log(`✅ Fetched ${apiProducts.length} products from API`);
    console.log('');

    // Step 3: Transform to Medusa format
    console.log('🔄 Step 3/3: Transforming to Medusa format...');

    const allCategories = new Map<string, Category>();
    const tags = new Set<string>();
    const collections = new Set<string>();

    let skippedCount = 0;
    const transformedProducts = apiProducts
      .map((product, idx) => {
        const transformed = transformAPIProduct(product, idx);
        if (!transformed) skippedCount++;
        return transformed;
      })
      .filter(Boolean);

    if (skippedCount > 0) {
      console.log(`⚠️  Skipped ${skippedCount} invalid products`);
    }

    transformedProducts.forEach((product: any) => {
      product.categories.forEach((cat: Category) => {
        allCategories.set(cat.name, cat);
      });
      product.tags.forEach((tag: string) => tags.add(tag));
      if (product.collection) collections.add(product.collection);
    });

    console.log(`✅ Transformed ${transformedProducts.length} products`);
    console.log(`   Categories: ${allCategories.size} (hierarchical)`);
    console.log(`   Tags: ${tags.size}`);
    console.log(`   Collections: ${collections.size}`);
    console.log('');

    // Validate product options
    console.log('🔍 Validating product options...');
    let validationErrors = 0;
    transformedProducts.forEach((product: any) => {
      if (!validateProductOptions(product)) {
        validationErrors++;
      }
    });

    if (validationErrors > 0) {
      console.log(`⚠️  ${validationErrors} products have option validation issues (will still be included)`);
    } else {
      console.log('✅ All products passed option validation');
    }
    console.log('');

    // Show sample
    console.log('📋 Sample products:');
    transformedProducts.slice(0, 5).forEach((p: any, idx: number) => {
      const optionInfo =
        p.productOptions.length > 0
          ? ` (${p.productOptions.map((o: any) => `${o.title}: ${o.values.length}`).join(', ')})`
          : '';
      const variantImgCount = p.variants.reduce((sum: number, v: any) => sum + (v.images?.length || 0), 0);
      const metaInfo = p.metadata ? ` [+metadata]` : '';
      console.log(
        `   ${idx + 1}. ${p.title} - $${p.basePrice} (${p.variants.length} variants${optionInfo}, ${variantImgCount} variant imgs${metaInfo})`,
      );
    });
    console.log('');

    // Generate seed file
    console.log('📝 Generating seed file...');
    const seedFileContent = generateSeedFile(transformedProducts, allCategories, tags, collections);

    const outputPath = join(__dirname, 'seed', 'products-from-api.ts');
    writeFileSync(outputPath, seedFileContent, 'utf-8');

    console.log(`✅ Seed file generated: ${outputPath}`);
    console.log('');

    // Summary
    console.log('📊 Import Summary:');
    console.log('━'.repeat(80));
    console.log(`   Products: ${transformedProducts.length}`);
    console.log(`   Variants: ${transformedProducts.reduce((sum: number, p: any) => sum + p.variants.length, 0)}`);
    const totalVariantImages = transformedProducts.reduce(
      (sum: number, p: any) => sum + p.variants.reduce((vSum: number, v: any) => vSum + (v.images?.length || 0), 0),
      0,
    );
    console.log(`   Variant Images: ${totalVariantImages}`);
    const productsWithMetadata = transformedProducts.filter(
      (p: any) => p.metadata && Object.keys(p.metadata).length > 0,
    ).length;
    console.log(`   Products with Metadata: ${productsWithMetadata}`);
    console.log(`   Categories: ${allCategories.size} (with hierarchy)`);
    console.log(`   Collections: ${collections.size}`);
    console.log(`   Tags: ${tags.size}`);
    console.log('');

    console.log('✅ Import complete!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Review: src/scripts/seed/products-from-api.ts');
    console.log('   2. Run: yarn setup');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ Error during import:');
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
      console.error('');
      console.error('Stack trace:');
      console.error(error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main().catch(console.error);
