/**
 * Search Route
 *
 * Dedicated search page with full search, filtering, and sorting capabilities.
 * Uses Elastic Search UI with OpenSearch backend for full-text search and faceted filtering.
 * Supports semantic search and image-based product search.
 *
 * @module app/routes/search
 */
import { Breadcrumbs } from '@app/components/common/breadcrumbs';
import { Container } from '@app/components/common/container';
import {
  SearchBox,
  SearchFilters,
  ActiveFilters,
  MobileFilterDrawer,
  SearchResults,
  ImageSearchUpload,
} from '@app/components/search';
import { useImageSearchState } from '@app/providers/search-provider';
import { useImageSearch } from '@app/hooks/useImageSearch';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

/**
 * Breadcrumb configuration for the search page
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
    label: 'Search',
  },
];

/**
 * Search Route Component
 *
 * Renders the dedicated search page with:
 * - Large search box for full-text product search with image search support
 * - Active filters display showing current filter state
 * - Desktop sidebar with category, collection, and price filters
 * - Mobile filter drawer for responsive filter access
 * - Search results grid with pagination
 * - Image search upload for visual product search
 *
 * All search functionality is powered by Elastic Search UI connected to OpenSearch.
 * Filter state is synchronized with URL parameters for shareable links.
 */
export default function SearchRoute() {
  const { imageSearch, setImageSearch, clearImageSearch } = useImageSearchState();
  const {
    results: imageResults,
    isLoading: imageSearchLoading,
    error: imageSearchError,
    searchByImage,
    clearSearch: clearImageSearchResults,
  } = useImageSearch();

  const handleImageSearch = async (file: File) => {
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImageSearch({ isActive: true, previewUrl, isLoading: true });

    await searchByImage(file);

    setImageSearch({ isActive: true, previewUrl, isLoading: false });
  };

  const handleClearImageSearch = () => {
    clearImageSearch();
    clearImageSearchResults();
  };

  return (
    <Container className="pb-16">
      {/* Header with breadcrumbs */}
      <div className="my-8 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
          <h1 className="text-2xl font-semibold text-gray-900">Search Products</h1>
        </div>
        <p className="text-gray-600">
          Find exactly what you're looking for with our powerful search. Try semantic search or upload an image to find
          similar products.
        </p>
      </div>

      {/* Search Box with Image Search */}
      <div className="mb-6">
        <SearchBox
          placeholder="Search for furniture, decor, and more..."
          className="max-w-2xl"
          enableImageSearch={true}
          onImageSearch={handleImageSearch}
        />
      </div>

      {/* Image Search Upload Area - shown when image search is active */}
      {imageSearch.isActive && (
        <div className="mb-6 max-w-md">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Image Search</h3>
          <ImageSearchUpload
            onImageSelect={handleImageSearch}
            onClear={handleClearImageSearch}
            isLoading={imageSearch.isLoading || imageSearchLoading}
            previewUrl={imageSearch.previewUrl || undefined}
            error={imageSearchError || undefined}
          />
        </div>
      )}

      {/* Image Search Results - shown when we have image search results */}
      {imageResults.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Visually Similar Products ({imageResults.length})</h3>
            <button
              type="button"
              onClick={handleClearImageSearch}
              className="text-sm text-primary hover:text-primary/80"
            >
              Clear image search
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {imageResults.slice(0, 10).map((result) => (
              <a key={result.document.id} href={`/products/${result.document.handle}`} className="group block">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {result.document.thumbnail ? (
                    <img
                      src={result.document.thumbnail}
                      alt={result.document.title}
                      className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">No image</div>
                  )}
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">{result.document.title}</h4>
                {result.similarityScore && (
                  <p className="text-xs text-gray-500">{Math.round(result.similarityScore * 100)}% match</p>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

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
          <div className="sticky top-24">
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
