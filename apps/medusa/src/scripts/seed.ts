import {
  createApiKeysWorkflow,
  createProductCategoriesWorkflow,
  createProductTagsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from '@medusajs/core-flows';
import type { IPaymentModuleService } from '@medusajs/framework/types';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';
import { createCollectionsWorkflow } from '@medusajs/medusa/core-flows';
import type {
  ExecArgs,
  IFulfillmentModuleService,
  ISalesChannelModuleService,
  IStoreModuleService,
} from '@medusajs/types';
import {
  seedProductsFromAPI,
  importedCategoryHierarchy,
  importedCategories,
  importedTags,
  importedCollections,
} from './seed/products-from-api';

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const remoteLink = container.resolve(ContainerRegistrationKeys.LINK);
  const fulfillmentModuleService: IFulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService: ISalesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService: IStoreModuleService = container.resolve(Modules.STORE);

  const paymentModuleService: IPaymentModuleService = container.resolve(Modules.PAYMENT);

  const canadianCountries = ['ca'];
  const americanCountries = ['us'];
  const allCountries = [...canadianCountries, ...americanCountries];

  logger.info('Seeding store data...');

  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: 'Default Sales Channel',
  });

  if (!defaultSalesChannel.length) {
    // create the default sales channel
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [
          {
            name: 'Default Sales Channel',
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          {
            currency_code: 'usd',
            is_default: true,
          },
          {
            currency_code: 'cad',
          },
        ],
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info('Seeding region data...');

  // Check if regions already exist
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const { data: existingRegions } = await query.graph({
    entity: 'region',
    fields: ['id', 'name', 'currency_code'],
  });

  let usRegion, caRegion;

  if (existingRegions.length >= 2) {
    logger.info('Regions already exist, skipping creation...');
    usRegion = existingRegions.find((r: any) => r.currency_code === 'usd');
    caRegion = existingRegions.find((r: any) => r.currency_code === 'cad');
  } else {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: 'United States',
            currency_code: 'usd',
            countries: americanCountries,
            payment_providers: [], // No payment providers - Stripe disabled
          },
          {
            name: 'Canada',
            currency_code: 'cad',
            countries: canadianCountries,
            payment_providers: [], // No payment providers - Stripe disabled
          },
        ],
      },
    });
    usRegion = regionResult[0];
    caRegion = regionResult[1];
  }
  logger.info('Finished seeding regions.');

  logger.info('Seeding tax regions...');

  // Check if tax regions already exist
  const { data: existingTaxRegions } = await query.graph({
    entity: 'tax_region',
    fields: ['id', 'country_code'],
  });

  if (existingTaxRegions.length === 0) {
    await createTaxRegionsWorkflow(container).run({
      input: allCountries.map((country_code) => ({
        country_code,
        provider_id: 'tp_system', // Use Medusa's built-in system tax provider
      })),
    });
    logger.info('Finished seeding tax regions.');
  } else {
    logger.info('Tax regions already exist, skipping creation...');
  }

  logger.info('Seeding stock location data...');

  let americanStockLocation;
  const { data: existingLocations } = await query.graph({
    entity: 'stock_location',
    fields: ['id', 'name'],
  });

  if (existingLocations.length > 0) {
    logger.info('Stock locations already exist, using existing...');
    americanStockLocation = existingLocations[0];
  } else {
    const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: 'South Lamar Location',
            address: {
              city: 'Austin',
              country_code: 'US',
              province: 'TX',
              address_1: '1200 S Lamar Blvd',
              postal_code: '78704',
            },
          },
        ],
      },
    });
    americanStockLocation = stockLocationResult[0];

    await remoteLink.create([
      {
        [Modules.STOCK_LOCATION]: {
          stock_location_id: americanStockLocation.id,
        },
        [Modules.FULFILLMENT]: {
          fulfillment_provider_id: 'manual_manual',
        },
      },
    ]);
  }

  logger.info('Seeding fulfillment data...');
  const { result: shippingProfileResult } = await createShippingProfilesWorkflow(container).run({
    input: {
      data: [
        {
          name: 'Default',
          type: 'default',
        },
      ],
    },
  });

  const shippingProfile = shippingProfileResult[0];

  const northAmericanFulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: 'North American delivery',
    type: 'shipping',
    service_zones: [
      {
        name: 'United States',
        geo_zones: [
          {
            country_code: 'us',
            type: 'country',
          },
        ],
      },
      {
        name: 'Canada',
        geo_zones: [
          {
            country_code: 'ca',
            type: 'country',
          },
        ],
      },
    ],
  });

  await remoteLink.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: americanStockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: northAmericanFulfillmentSet.id,
    },
  });

  // Create collections from imported ES data
  const collectionTitles = importedCollections.slice(0, 10); // Limit to 10 collections
  const { result: collectionsResult } = await createCollectionsWorkflow(container).run({
    input: {
      collections: collectionTitles.map((title) => ({
        title,
        handle: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      })),
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: 'Standard Shipping',
        price_type: 'flat',
        provider_id: 'manual_manual',
        service_zone_id: northAmericanFulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: 'Standard',
          description: 'Ship in 2-3 days.',
          code: 'standard',
        },
        prices: [
          {
            currency_code: 'usd',
            amount: 5,
          },
          {
            currency_code: 'cad',
            amount: 5,
          },
          {
            region_id: usRegion.id,
            amount: 5,
          },
          {
            region_id: caRegion.id,
            amount: 5,
          },
        ],
        rules: [
          {
            attribute: 'enabled_in_store',
            value: 'true',
            operator: 'eq',
          },
          {
            attribute: 'is_return',
            value: 'false',
            operator: 'eq',
          },
        ],
      },
      {
        name: 'Express Shipping',
        price_type: 'flat',
        provider_id: 'manual_manual',
        service_zone_id: northAmericanFulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: 'Express',
          description: 'Ship in 24 hours.',
          code: 'express',
        },
        prices: [
          {
            currency_code: 'usd',
            amount: 10,
          },
          {
            currency_code: 'cad',
            amount: 10,
          },
          {
            region_id: usRegion.id,
            amount: 10,
          },
          {
            region_id: caRegion.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: 'enabled_in_store',
            value: 'true',
            operator: 'eq',
          },
          {
            attribute: 'is_return',
            value: 'false',
            operator: 'eq',
          },
        ],
      },
    ],
  });

  logger.info('Finished seeding fulfillment data.');

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: americanStockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });

  logger.info('Finished seeding stock location data.');

  logger.info('Seeding publishable API key data...');
  const { result: publishableApiKeyResult } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: 'Storefront',
          type: 'publishable',
          created_by: '',
        },
      ],
    },
  });
  const publishableApiKey = publishableApiKeyResult[0];

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });

  logger.info('Finished seeding publishable API key data.');

  logger.info('Seeding product data...');

  // Create parent categories from hierarchy
  const parentCategoryNames = importedCategoryHierarchy.map((cat) => cat.name);
  const { result: parentCategoryResult } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: parentCategoryNames.map((name) => ({
        name,
        is_active: true,
      })),
    },
  });

  // Create child categories with parent relationships
  const childCategories = importedCategoryHierarchy.flatMap((parent) =>
    (parent.children || []).map((child) => ({
      name: child.name,
      parent_category_id: parentCategoryResult.find((p: any) => p.name === parent.name)?.id,
      is_active: true,
    })),
  );

  const { result: childCategoryResult } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: childCategories,
    },
  });

  // Combine all categories for product assignment
  const categoryResult = [...parentCategoryResult, ...childCategoryResult];

  // Create tags from imported ES data
  const tagValues = importedTags.slice(0, 30); // Limit to 30 most common tags
  const { result: productTagsResult } = await createProductTagsWorkflow(container).run({
    input: {
      product_tags: tagValues.map((value) => ({ value })),
    },
  });

  // Seed products from Elasticsearch import
  const { result: productResult } = await createProductsWorkflow(container).run({
    input: {
      products: seedProductsFromAPI({
        collections: collectionsResult,
        tags: productTagsResult,
        categories: categoryResult,
        sales_channels: [{ id: defaultSalesChannel[0].id }],
        shipping_profile_id: shippingProfile.id,
        region_id: usRegion.id,
      }),
    },
  });

  logger.info('Finished seeding product data.');
  logger.info(`PUBLISHABLE API KEY: ${publishableApiKey.token}`);
}
