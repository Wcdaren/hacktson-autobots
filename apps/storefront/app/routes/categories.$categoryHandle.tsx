import { Container } from '@app/components/common/container';
import {
  CategoryFilters,
  CategoryMobileFilterDrawer,
  CategoryActiveFilters,
  CategorySearchResults,
} from '@app/components/search';
import { CategorySearchProvider } from '@app/providers/category-search-provider';
import { listCategories } from '@libs/util/server/data/categories.server';
import { getSelectedRegion } from '@libs/util/server/data/regions.server';
import { config } from '@libs/util/server/config.server';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { Link, useLoaderData } from 'react-router';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const handle = params.categoryHandle as string;

  // Get the user's selected region for region-aware pricing
  const region = await getSelectedRegion(request.headers);
  const regionId = region?.id;

  const categories = await listCategories();

  const category = categories.find((c) => c.handle === handle);

  if (!category) {
    throw redirect('/products');
  }

  // Find child categories for navigation chips
  const childCategories = categories.filter((c) => c.parent_category_id === category.id);

  // Find parent category for breadcrumb
  const parentCategory = category.parent_category_id
    ? categories.find((c) => c.id === category.parent_category_id)
    : null;

  return {
    category,
    categories,
    childCategories,
    parentCategory,
    regionId: regionId || '',
    backendUrl: config.PUBLIC_MEDUSA_API_URL || 'http://localhost:9000',
    publishableApiKey: config.MEDUSA_PUBLISHABLE_KEY || '',
  };
};

export type ProductCategoryRouteLoader = typeof loader;

export default function ProductCategoryRoute() {
  const data = useLoaderData<ProductCategoryRouteLoader>();

  if (!data) return null;

  const { category, categories, childCategories, parentCategory, regionId, backendUrl, publishableApiKey } = data;

  return (
    <CategorySearchProvider
      key={category.id}
      categoryId={category.id}
      regionId={regionId}
      backendUrl={backendUrl}
      publishableApiKey={publishableApiKey}
      currentCategory={{
        id: category.id,
        name: category.name,
        handle: category.handle,
        parent_category_id: category.parent_category_id || null,
      }}
      allCategories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        handle: c.handle,
        parent_category_id: c.parent_category_id || null,
      }))}
    >
      <Container className="pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-8 mb-6">
          <Link to="/products" className="hover:text-gray-900 transition-colors">
            All Products
          </Link>
          {parentCategory && (
            <>
              <span className="text-gray-300">/</span>
              <Link to={`/categories/${parentCategory.handle}`} className="hover:text-gray-900 transition-colors">
                {parentCategory.name}
              </Link>
            </>
          )}
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">{category.name}</h1>
          {category.description && <p className="text-gray-600 max-w-2xl">{category.description}</p>}
        </div>

        {/* Child Categories Navigation Chips */}
        {childCategories.length > 0 && (
          <div className="mb-10">
            <div className="flex flex-wrap gap-3">
              {childCategories.map((child) => (
                <Link
                  key={child.id}
                  to={`/categories/${child.handle}`}
                  className="px-5 py-2.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        <div className="mb-6">
          <CategoryActiveFilters />
        </div>

        {/* Mobile Filter Button - visible on mobile only */}
        <div className="mb-6 lg:hidden">
          <CategoryMobileFilterDrawer buttonLabel="Filters" showMetadataFacets={true} />
        </div>

        {/* Main Content Area */}
        <div className="flex gap-8">
          {/* Desktop Sidebar with Filters - hidden on mobile */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
              <CategoryFilters showMetadataFacets={true} />
            </div>
          </aside>

          {/* Search Results */}
          <main className="min-w-0 flex-1">
            <CategorySearchResults
              mobileColumns={2}
              tabletColumns={3}
              desktopColumns={3}
              resultsPerPageOptions={[12, 24, 48]}
            />
          </main>
        </div>
      </Container>
    </CategorySearchProvider>
  );
}
