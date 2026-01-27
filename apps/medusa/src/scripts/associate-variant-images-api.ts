/**
 * Associate Variant Images via Admin API
 *
 * Alternative approach using the Admin API endpoint instead of direct module service.
 * This is useful when you need to run the script externally or want to use the
 * official API contract.
 *
 * Endpoint: POST /admin/products/{id}/variants/{variant_id}/images/batch
 * Available from Medusa v2.11.2+
 *
 * Usage:
 *   MEDUSA_BACKEND_URL=http://localhost:9000 \
 *   MEDUSA_API_KEY=your_api_key \
 *   npx ts-node src/scripts/associate-variant-images-api.ts
 */

import { variantImagesMap } from './seed/products-from-api';

interface Config {
  backendUrl: string;
  apiKey: string;
  maxProducts: number;
}

const CONFIG: Config = {
  backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
  apiKey: process.env.MEDUSA_API_KEY || '',
  maxProducts: parseInt(process.env.MAX_PRODUCTS || '1000'),
};

interface ProductImage {
  id: string;
  url: string;
}

interface ProductVariant {
  id: string;
  sku: string | null;
}

interface Product {
  id: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

interface ProductsResponse {
  products: Product[];
  count: number;
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (CONFIG.apiKey) {
    headers['Authorization'] = `Bearer ${CONFIG.apiKey}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

async function fetchAllProducts(): Promise<Product[]> {
  const products: Product[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = `${CONFIG.backendUrl}/admin/products?offset=${offset}&limit=${limit}&fields=id,images,variants`;
    const response = await fetchWithAuth(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data: ProductsResponse = await response.json();
    products.push(...data.products);

    if (data.products.length < limit || products.length >= CONFIG.maxProducts) {
      break;
    }

    offset += limit;
  }

  return products.slice(0, CONFIG.maxProducts);
}

async function batchVariantImages(
  productId: string,
  variantId: string,
  imageIds: string[],
): Promise<{ added: string[]; removed: string[] }> {
  const url = `${CONFIG.backendUrl}/admin/products/${productId}/variants/${variantId}/images/batch`;

  const response = await fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify({
      add: imageIds,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to batch variant images: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function main() {
  console.log('🖼️  Variant Image Association Script (Admin API)');
  console.log('━'.repeat(80));
  console.log(`   Backend URL: ${CONFIG.backendUrl}`);
  console.log(`   API Key: ${CONFIG.apiKey ? '***' + CONFIG.apiKey.slice(-4) : 'Not set'}`);
  console.log('');

  if (!CONFIG.apiKey) {
    console.log('⚠️  Warning: No API key set. Authentication may fail.');
    console.log('   Set MEDUSA_API_KEY environment variable.');
    console.log('');
  }

  // Fetch all products
  console.log('📦 Fetching products...');
  const products = await fetchAllProducts();
  console.log(`   Found ${products.length} products`);
  console.log('');

  // Build lookup maps
  const skuToVariant = new Map<string, { variantId: string; productId: string }>();
  const productImageMap = new Map<string, Map<string, string>>();

  for (const product of products) {
    const imageUrlToId = new Map<string, string>();
    for (const image of product.images || []) {
      imageUrlToId.set(image.url, image.id);
    }
    productImageMap.set(product.id, imageUrlToId);

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

    // Find matching image IDs
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
      await batchVariantImages(productId, variantId, imageIdsToAdd);
      successCount++;
      process.stdout.write(`\r   Progress: ${successCount + skipCount + errorCount}/${skus.length}`);
    } catch (error) {
      errorCount++;
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`SKU ${sku}: ${message}`);
    }
  }

  console.log('');
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
  console.log('✅ Done!');
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
