/**
 * Associate Variant Images Script
 *
 * This script runs AFTER products have been seeded to associate variant-specific
 * images with their variants. Medusa v2.11.2+ supports variant images, but they
 * must be added in a two-step process:
 *
 * 1. Images are uploaded to the product (done during seed)
 * 2. Images are associated with specific variants (this script)
 *
 * The script uses the variantImagesMap from the seed file which maps SKU → image URLs.
 *
 * Usage:
 *   npx medusa exec ./src/scripts/associate-variant-images.ts
 *
 * Requirements:
 *   - Medusa v2.11.2 or later
 *   - Products must already be seeded with images
 */

import type { ExecArgs } from '@medusajs/framework/types';
import type { IProductModuleService } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';
import { batchVariantImagesWorkflow } from '@medusajs/medusa/core-flows';
import { variantImagesMap } from './seed/products-from-api';

interface ProductImage {
  id: string;
  url: string;
}

interface ProductVariant {
  id: string;
  sku: string | null;
  product_id: string;
}

interface Product {
  id: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export default async function associateVariantImages({ container }: ExecArgs) {
  console.log('🖼️  Variant Image Association Script');
  console.log('━'.repeat(80));
  console.log('');

  const productModuleService: IProductModuleService = container.resolve(Modules.PRODUCT);

  // Get all products with their images and variants
  console.log('📦 Fetching products with images and variants...');

  const [products] = await productModuleService.listAndCountProducts(
    {},
    {
      relations: ['images', 'variants'],
      take: 1000,
    },
  );

  console.log(`   Found ${products.length} products`);
  console.log('');

  // Build a map of SKU → variant info
  const skuToVariant = new Map<string, { variantId: string; productId: string }>();
  const productImageMap = new Map<string, Map<string, string>>(); // productId → (url → imageId)

  for (const product of products as Product[]) {
    // Build image URL → ID map for this product
    const imageUrlToId = new Map<string, string>();
    for (const image of product.images || []) {
      imageUrlToId.set(image.url, image.id);
    }
    productImageMap.set(product.id, imageUrlToId);

    // Build SKU → variant map
    for (const variant of product.variants || []) {
      if (variant.sku) {
        skuToVariant.set(variant.sku, {
          variantId: variant.id,
          productId: product.id,
        });
      }
    }
  }

  console.log(`   Mapped ${skuToVariant.size} variants by SKU`);
  console.log('');

  // Process variant images
  console.log('🔗 Associating images with variants...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  const skus = Object.keys(variantImagesMap);
  console.log(`   Processing ${skus.length} variants from variantImagesMap`);
  console.log('');

  for (const sku of skus) {
    const variantInfo = skuToVariant.get(sku);

    if (!variantInfo) {
      skipCount++;
      continue;
    }

    const { variantId, productId } = variantInfo;
    const imageUrls = variantImagesMap[sku];
    const productImages = productImageMap.get(productId);

    if (!productImages || productImages.size === 0) {
      skipCount++;
      continue;
    }

    // Find matching image IDs for this variant's URLs
    const imageIdsToAdd: string[] = [];

    for (const url of imageUrls) {
      const imageId = productImages.get(url);
      if (imageId) {
        imageIdsToAdd.push(imageId);
      }
    }

    if (imageIdsToAdd.length === 0) {
      skipCount++;
      continue;
    }

    try {
      // Use the batchVariantImagesWorkflow to associate images (recommended approach)
      await batchVariantImagesWorkflow(container).run({
        input: {
          variant_id: variantId,
          add: imageIdsToAdd,
        },
      });

      successCount++;
      process.stdout.write(`\r   Progress: ${successCount + skipCount + errorCount}/${skus.length}`);
    } catch (error) {
      errorCount++;
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`SKU ${sku}: ${message}`);
    }
  }

  console.log(''); // New line after progress
  console.log('');

  // Summary
  console.log('📊 Summary:');
  console.log('━'.repeat(80));
  console.log(`   ✅ Successfully associated: ${successCount} variants`);
  console.log(`   ⏭️  Skipped (no match): ${skipCount} variants`);
  console.log(`   ❌ Errors: ${errorCount} variants`);

  if (errors.length > 0) {
    console.log('');
    console.log('⚠️  Errors:');
    errors.slice(0, 10).forEach((err) => console.log(`   - ${err}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more`);
    }
  }

  console.log('');
  console.log('✅ Variant image association complete!');
}
