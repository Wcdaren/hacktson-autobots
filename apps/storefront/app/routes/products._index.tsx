/**
 * Products Index Route
 *
 * Displays the product listing page with search, filtering, and sorting capabilities.
 * Uses Elastic Search UI with OpenSearch backend for full-text search and faceted filtering.
 *
 * @module app/routes/products._index
 */
import { Breadcrumbs } from '@app/components/common/breadcrumbs';
import { Container } from '@app/components/common/container';
import { SearchBox, SearchFilters, ActiveFilters, MobileFilterDrawer, SearchResults } from '@app/components/search';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';

/**
 * Breadcrumb configuration for the products page
 */
const breadcrumbs = [
  {
    label: (
      <span className="flex whitespace-nowrap">
        <HomeIcon className="inline h-4 w-4" />
        <span className="sr-only">Home</span>
      </span>
    ),
    url: `/`,
  },
  {
    label: 'All Products',
  },
];

/**
 * Products Index Route Component
 *
 * Renders the product listing page with:
 * - Search box for full-text product search
 * - Active filters display showing current filter state
 * - Desktop sidebar with category, collection, and price filters
 * - Mobile filter drawer for responsive filter access
 * - Search results grid with pagination
 *
 * All search functionality is powered by Elastic Search UI connected to OpenSearch.
 * Filter state is synchronized with URL parameters for shareable links.
 */
export default function ProductsIndexRoute() {
  return (
    <Container className="pb-16">
      {/* Header with breadcrumbs */}
      <div className="my-8 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <SearchBox placeholder="Search products..." className="max-w-xl" />
      </div>

      {/* Active Filters Display */}
      <div className="mb-6">
        <ActiveFilters />
      </div>

      {/* Mobile Filter Button - visible on mobile only */}
      <div className="mb-6 lg:hidden">
        <MobileFilterDrawer buttonLabel="Filters" showTags={true} showMetadataFacets={true} />
      </div>

      {/* Main Content Area */}
      <div className="flex gap-8">
        {/* Desktop Sidebar with Filters - hidden on mobile */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
            <SearchFilters showTags={true} showMetadataFacets={true} />
          </div>
        </aside>

        {/* Search Results */}
        <main className="min-w-0 flex-1">
          <SearchResults mobileColumns={2} tabletColumns={3} desktopColumns={3} resultsPerPageOptions={[12, 24, 48]} />
        </main>
      </div>
    </Container>
  );
}
