import { Container } from '@app/components/common/container';
import { PageHeading } from '@app/components/sections/PageHeading';
import { CollectionSearchProvider } from '@app/providers/collection-search-provider';
import {
  CollectionFilters,
  CollectionMobileFilterDrawer,
  CollectionActiveFilters,
  CollectionSearchResults,
} from '@app/components/search';
import { fetchCollections } from '@libs/util/server/data/collections.server';
import { getSelectedRegion } from '@libs/util/server/data/regions.server';
import { config } from '@libs/util/server/config.server';
import clsx from 'clsx';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { NavLink, useLoaderData } from 'react-router';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const handle = params.collectionHandle as string;

  // Get the user's selected region for region-aware pricing
  const region = await getSelectedRegion(request.headers);
  const regionId = region?.id;

  const { collections } = await fetchCollections();

  const collection = collections?.find((c) => c.handle === handle);

  if (!collection) throw redirect('/products');

  // Get backend URL and API key for the search provider
  const backendUrl = config.PUBLIC_MEDUSA_API_URL || 'http://localhost:9000';
  const publishableApiKey = config.MEDUSA_PUBLISHABLE_KEY;

  return { collections, collection, regionId, backendUrl, publishableApiKey };
};

export type ProductCollectionRouteLoader = typeof loader;

export default function ProductCollectionRoute() {
  const data = useLoaderData<ProductCollectionRouteLoader>();

  if (!data) return null;

  const { collections, collection, regionId, backendUrl, publishableApiKey } = data;

  return (
    <CollectionSearchProvider
      collectionId={collection.id}
      backendUrl={backendUrl}
      publishableApiKey={publishableApiKey}
      regionId={regionId}
    >
      <Container className="pb-16">
        <PageHeading className="w-full text-center text-5xl xs:text-6xl md:text-8xl font-ballet mt-24 font-normal lg:font-normal">
          {collection.title}
        </PageHeading>

        {collections.length > 1 && (
          <div className="flex flex-col w-full items-center">
            <div className="flex-1">
              <div className="inline-flex gap-5 text-2xl font-italiana border-b border-primary mt-4 mb-8">
                {collections.map((col) => (
                  <NavLink
                    to={`/collections/${col.handle}`}
                    key={col.id}
                    className={({ isActive }) =>
                      clsx('h-full p-4', {
                        'font-bold border-b-2 border-primary': isActive,
                        '!border-none active:': !isActive,
                      })
                    }
                  >
                    {col.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Button */}
        <div className="mb-4 lg:hidden">
          <CollectionMobileFilterDrawer />
        </div>

        {/* Active Filters */}
        <CollectionActiveFilters className="mb-4" />

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <CollectionFilters />
            </div>
          </aside>

          {/* Product Results */}
          <div className="flex-1">
            <CollectionSearchResults />
          </div>
        </div>
      </Container>
    </CollectionSearchProvider>
  );
}
