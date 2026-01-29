/**
 * Search Route
 *
 * Dedicated search page with full search, filtering, and sorting capabilities.
 * Uses Elastic Search UI with OpenSearch backend for full-text search and faceted filtering.
 * Supports semantic search and image-based product search.
 *
 * @module app/routes/search
 */
import { Container } from '@app/components/common/container';
import {
  SearchFilters,
  ActiveFilters,
  MobileFilterDrawer,
  SearchResults,
  ImageSearchUpload,
  SearchModeToggle,
  ImageDropzone,
  IntentChips,
  MultimodalSearchInput,
  type SearchMode,
  type SearchIntent,
} from '@app/components/search';
import { useImageSearchState, useSearchReady } from '@app/providers/search-provider';
import { useImageSearch } from '@app/hooks/useImageSearch';
import { useMultimodalSearch } from '@app/hooks/useMultimodalSearch';
import { useImageUpload } from '@app/hooks/useImageUpload';
import { withSearch } from '@elastic/react-search-ui';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import { useEffect, useState, useRef, type FC } from 'react';
import { useSearchParams } from 'react-router';

/**
 * Search input component that syncs with Elastic Search UI
 */
interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onImageSearch: (file: File) => void;
}

const SearchInputComponent: FC<SearchInputProps> = ({ searchTerm, setSearchTerm, onImageSearch }) => {
  const [localTerm, setLocalTerm] = useState(searchTerm || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local state with search term from context
  useEffect(() => {
    setLocalTerm(searchTerm || '');
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localTerm);
  };

  const handleClear = () => {
    setLocalTerm('');
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSearch(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          placeholder="Search for furniture, decor, and more..."
          className="w-full pl-12 pr-24 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-shadow"
          aria-label="Search products"
        />

        {/* Search Icon */}
        <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        </div>

        {/* Right side buttons */}
        <div className="absolute right-2 inset-y-0 flex items-center gap-1">
          {/* Clear button */}
          {localTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Camera button for image search */}
          <button
            type="button"
            onClick={handleCameraClick}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Search by image"
            title="Search by image"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Search button */}
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </form>
  );
};

/**
 * Connected search input that receives search context
 */
const ConnectedSearchInput = withSearch(({ searchTerm, setSearchTerm }) => ({
  searchTerm,
  setSearchTerm,
}))(SearchInputComponent) as FC<{ onImageSearch: (file: File) => void }>;

/**
 * Component to sync URL query param with search state
 * Watches for changes in the URL 'q' parameter and updates search state
 */
interface SearchSyncProps {
  setSearchTerm: (term: string) => void;
  searchTerm: string;
}

const SearchSyncComponent: FC<SearchSyncProps> = ({ setSearchTerm, searchTerm }) => {
  const [searchParams] = useSearchParams();
  const lastSyncedRef = useRef<string | null>(null);

  useEffect(() => {
    const q = searchParams.get('q') || '';

    // Only update if the URL param is different from what we last synced
    // and different from the current search term
    if (q !== lastSyncedRef.current && q !== searchTerm) {
      lastSyncedRef.current = q;
      setSearchTerm(q);
    }
  }, [searchParams, setSearchTerm, searchTerm]);

  return null;
};

const ConnectedSearchSync = withSearch(({ setSearchTerm, searchTerm }) => ({
  setSearchTerm,
  searchTerm,
}))(SearchSyncComponent) as FC;

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
 * - Multimodal search with text + image combined
 * - Search mode toggle (text, image, mixed)
 * - Intent chips display for extracted constraints
 *
 * All search functionality is powered by Elastic Search UI connected to OpenSearch.
 * Filter state is synchronized with URL parameters for shareable links.
 */
export default function SearchRoute() {
  const isSearchReady = useSearchReady();
  const { imageSearch, setImageSearch, clearImageSearch } = useImageSearchState();
  const {
    results: imageResults,
    isLoading: imageSearchLoading,
    error: imageSearchError,
    searchByImage,
    clearSearch: clearImageSearchResults,
  } = useImageSearch();

  // Multimodal search state
  const [searchMode, setSearchMode] = useState<SearchMode>('text');
  const [extractedIntent, setExtractedIntent] = useState<SearchIntent | null>(null);

  const {
    results: multimodalResults,
    intent: multimodalIntent,
    isLoading: multimodalLoading,
    error: multimodalError,
    search: performMultimodalSearch,
    searchType: multimodalSearchType,
  } = useMultimodalSearch({
    backendUrl:
      typeof window !== 'undefined'
        ? window.ENV?.MEDUSA_BACKEND_URL || 'http://localhost:9000'
        : 'http://localhost:9000',
  });

  const { image: uploadedImage, preview: imagePreview, selectImage, removeImage, getBase64 } = useImageUpload();

  // Update extracted intent when multimodal search returns intent
  useEffect(() => {
    if (multimodalIntent) {
      setExtractedIntent(multimodalIntent);
    }
  }, [multimodalIntent]);

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

  const handleMultimodalSearch = async (query: string) => {
    const imageBase64 = uploadedImage ? await getBase64() : undefined;
    await performMultimodalSearch(query, imageBase64 ?? undefined);
  };

  const handleConstraintRemove = (constraintType: string, value: string) => {
    if (!extractedIntent) return;

    // Create updated constraints
    const updatedConstraints = { ...extractedIntent.constraints };

    if (constraintType === 'colors' && updatedConstraints.colors) {
      updatedConstraints.colors = updatedConstraints.colors.filter((c) => c !== value);
      if (updatedConstraints.colors.length === 0) delete updatedConstraints.colors;
    } else if (constraintType === 'materials' && updatedConstraints.materials) {
      updatedConstraints.materials = updatedConstraints.materials.filter((m) => m !== value);
      if (updatedConstraints.materials.length === 0) delete updatedConstraints.materials;
    } else if (constraintType === 'categories' && updatedConstraints.categories) {
      updatedConstraints.categories = updatedConstraints.categories.filter((c) => c !== value);
      if (updatedConstraints.categories.length === 0) delete updatedConstraints.categories;
    } else if (constraintType === 'styles' && updatedConstraints.styles) {
      updatedConstraints.styles = updatedConstraints.styles.filter((s) => s !== value);
      if (updatedConstraints.styles.length === 0) delete updatedConstraints.styles;
    } else if (constraintType === 'price_min') {
      delete updatedConstraints.price_min;
    } else if (constraintType === 'price_max') {
      delete updatedConstraints.price_max;
    }

    // Update intent with new constraints
    setExtractedIntent({
      ...extractedIntent,
      constraints: updatedConstraints,
    });

    // Re-run search with updated constraints
    handleMultimodalSearch(extractedIntent.original_query);
  };

  return (
    <Container className="pb-16">
      {/* Sync URL query param with search state */}
      {isSearchReady && <ConnectedSearchSync />}

      {/* Search Header */}
      <div className="py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-2">Search Products</h1>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Find exactly what you're looking for. Try semantic search, upload an image, or combine both.
        </p>

        {/* Search Mode Toggle - responsive with ARIA labels */}
        <div className="mb-4 overflow-x-auto" role="group" aria-label="Search mode selection">
          <SearchModeToggle mode={searchMode} onModeChange={setSearchMode} />
        </div>

        {/* Search Box - conditional based on mode */}
        {searchMode === 'text' && isSearchReady ? (
          <ConnectedSearchInput onImageSearch={handleImageSearch} />
        ) : searchMode === 'text' && !isSearchReady ? (
          <div className="max-w-2xl">
            <div className="w-full h-14 bg-gray-100 rounded-xl animate-pulse" aria-label="Loading search" />
          </div>
        ) : null}

        {/* Multimodal Search Input - for image and mixed modes - responsive */}
        {(searchMode === 'image' || searchMode === 'mixed') && (
          <div className="w-full max-w-2xl" role="search" aria-label="Multimodal search">
            <MultimodalSearchInput
              onSearch={handleMultimodalSearch}
              placeholder={
                searchMode === 'image'
                  ? 'Upload an image to find similar products...'
                  : 'Describe what you want or upload an image...'
              }
              showImageUpload={true}
              initialQuery=""
            />
          </div>
        )}
      </div>

      {/* Image Dropzone - shown when in image or mixed mode - responsive stacked on mobile */}
      {(searchMode === 'image' || searchMode === 'mixed') && (
        <div className="mb-6 w-full max-w-2xl" role="region" aria-label="Image upload area">
          <ImageDropzone
            onImageSelect={selectImage}
            onImageRemove={removeImage}
            currentImage={uploadedImage}
            maxSizeMB={5}
            acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
          />
        </div>
      )}

      {/* Intent Chips Display - shown when we have extracted intent - responsive horizontal scroll on mobile */}
      {extractedIntent && (
        <div
          className="mb-6 w-full max-w-2xl overflow-x-auto"
          role="region"
          aria-label="Extracted search constraints"
          aria-live="polite"
        >
          <IntentChips intent={extractedIntent} onConstraintRemove={handleConstraintRemove} />
        </div>
      )}

      {/* Image Search Upload Area - shown when image search is active (legacy) */}
      {imageSearch.isActive && searchMode === 'text' && (
        <div className="mb-6 w-full max-w-md" role="region" aria-label="Image search">
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

      {/* Image Search Results - shown when we have image search results (legacy) - responsive grid */}
      {imageResults.length > 0 && searchMode === 'text' && (
        <div className="mb-8" role="region" aria-label="Visually similar products">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900" id="image-results-heading">
              Visually Similar Products ({imageResults.length})
            </h3>
            <button
              type="button"
              onClick={handleClearImageSearch}
              className="text-sm text-primary hover:text-primary/80 self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Clear image search results"
            >
              Clear image search
            </button>
          </div>
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            role="list"
            aria-labelledby="image-results-heading"
          >
            {imageResults.slice(0, 10).map((result) => (
              <a
                key={result.document.id}
                href={`/products/${result.document.handle}`}
                className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                role="listitem"
                aria-label={`${result.document.title}, ${result.similarityScore ? Math.round(result.similarityScore * 100) + '% match' : ''}`}
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  {result.document.thumbnail ? (
                    <img
                      src={result.document.thumbnail}
                      alt={result.document.title}
                      className="h-full w-full object-contain object-center transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </div>
                <h4 className="mt-2 text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">
                  {result.document.title}
                </h4>
                {result.similarityScore && (
                  <p
                    className="text-xs text-gray-500"
                    aria-label={`${Math.round(result.similarityScore * 100)} percent match`}
                  >
                    {Math.round(result.similarityScore * 100)}% match
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      <div className="mb-6" role="region" aria-label="Active filters">
        <ActiveFilters />
      </div>

      {/* Mobile Filter Button - visible on mobile only */}
      <div className="mb-6 lg:hidden">
        <MobileFilterDrawer buttonLabel="Filters" showTags={true} showMetadataFacets={true} />
      </div>

      {/* Main Content Area - responsive layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop Sidebar with Filters - hidden on mobile and tablet */}
        <aside
          className="hidden lg:block w-full lg:w-64 flex-shrink-0"
          role="complementary"
          aria-label="Search filters"
        >
          <div className="lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
            <SearchFilters showTags={true} showMetadataFacets={true} />
          </div>
        </aside>

        {/* Search Results - full width on mobile, flex-1 on desktop */}
        <main
          className="min-w-0 flex-1 w-full"
          role="main"
          aria-label="Search results"
          aria-live="polite"
          aria-atomic="false"
        >
          <SearchResults mobileColumns={2} tabletColumns={3} desktopColumns={3} resultsPerPageOptions={[12, 24, 48]} />
        </main>
      </div>
    </Container>
  );
}
