/**
 * SearchResults Component
 *
 * Displays search results in a grid layout with pagination controls.
 * Integrates with Elastic Search UI and the existing ProductListItem component.
 *
 * @module app/components/search/SearchResults
 */
import { Results, PagingInfo, Paging, ResultsPerPage, withSearch } from '@elastic/react-search-ui';
import type {
  ResultsViewProps as ElasticResultsViewProps,
  PagingInfoViewProps as ElasticPagingInfoViewProps,
  PagingViewProps as ElasticPagingViewProps,
  ResultsPerPageViewProps as ElasticResultsPerPageViewProps,
} from '@elastic/react-search-ui-views';
import type { SearchResult } from '@elastic/search-ui';
import type { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router';
import { ProductListItem } from '@app/components/product/ProductListItem';
import type { StoreProduct } from '@medusajs/types';
import { useSearchReady, useImageSearchState } from '@app/providers/search-provider';

/**
 * Props for the SearchResults component
 */
export interface SearchResultsProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Number of columns on mobile (default: 2) */
  mobileColumns?: 1 | 2;
  /** Number of columns on tablet (default: 3) */
  tabletColumns?: 2 | 3 | 4;
  /** Number of columns on desktop (default: 4) */
  desktopColumns?: 3 | 4 | 5 | 6;
  /** Options for results per page selector */
  resultsPerPageOptions?: number[];
}

/**
 * Props injected by withSearch HOC for loading state
 */
interface SearchResultsWithSearchProps extends SearchResultsProps {
  /** Whether search is currently loading */
  isLoading: boolean;
  /** Total number of results */
  totalResults: number;
  /** Current search term */
  searchTerm: string;
}

/**
 * Match type for search results
 */
export type MatchType = 'exact' | 'semantic' | 'visual' | 'hybrid';

/**
 * Enhanced search result with match type and similarity score
 */
export interface EnhancedSearchResult {
  product: StoreProduct;
  matchType: MatchType;
  similarityScore?: number;
}

/**
 * Transform a search result into a StoreProduct-compatible object
 * Maps OpenSearch indexed fields to the ProductListItem expected format
 */
function transformResultToProduct(result: SearchResult): EnhancedSearchResult {
  // Safely extract raw values, handling undefined and complex objects
  const getRawValue = (field: any): any => {
    if (!field) return undefined;
    if (typeof field === 'object' && 'raw' in field) {
      return field.raw;
    }
    return field;
  };

  // Use min_price for display, fallback to price for backward compatibility
  const minPrice = getRawValue(result.min_price);
  const price = getRawValue(result.price);
  const priceValue = typeof minPrice === 'number' ? minPrice : typeof price === 'number' ? price : 0;

  const currencyCode = getRawValue(result.currency_code) || 'usd';

  // Determine match type from result metadata
  const matchType = (getRawValue(result.match_type) as MatchType) || 'exact';
  const similarityScore =
    typeof getRawValue(result.similarity_score) === 'number' ? getRawValue(result.similarity_score) : undefined;

  // Safely get string values
  const id = String(getRawValue(result.id) || '');
  const title = String(getRawValue(result.title) || 'Untitled');
  const handle = String(getRawValue(result.handle) || '');
  const thumbnail = getRawValue(result.thumbnail) || null;

  const product = {
    id,
    title,
    handle,
    thumbnail,
    variants: [
      {
        id: `${id}-variant`,
        calculated_price: {
          calculated_amount: priceValue,
          original_amount: priceValue,
          currency_code: String(currencyCode),
        },
      },
    ],
  } as StoreProduct;

  return { product, matchType, similarityScore };
}

/**
 * Match type badge component
 */
const MatchTypeBadge: FC<{ matchType: MatchType; similarityScore?: number }> = ({ matchType, similarityScore }) => {
  const badgeConfig = {
    exact: { label: 'Exact Match', className: 'bg-green-100 text-green-800' },
    semantic: { label: 'Semantic', className: 'bg-blue-100 text-blue-800' },
    visual: { label: 'Visual Match', className: 'bg-purple-100 text-purple-800' },
    hybrid: { label: 'Hybrid', className: 'bg-orange-100 text-orange-800' },
  };

  const config = badgeConfig[matchType];

  return (
    <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
      <span className={clsx('px-2 py-0.5 text-xs font-medium rounded-full', config.className)}>{config.label}</span>
      {similarityScore !== undefined && (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
          {Math.round(similarityScore * 100)}%
        </span>
      )}
    </div>
  );
};

/**
 * Custom result view that wraps ProductListItem with a link
 */
const ResultView: FC<{ result: SearchResult }> = ({ result }) => {
  try {
    const { product, matchType, similarityScore } = transformResultToProduct(result);
    const handle = product.handle;

    // Validate that we have required data
    if (!handle || !product.id) {
      console.warn('Invalid product data in search result:', result);
      return null;
    }

    return (
      <Link
        to={`/products/${handle}`}
        className="block relative transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        aria-label={`View ${product.title}`}
      >
        {matchType !== 'exact' && <MatchTypeBadge matchType={matchType} similarityScore={similarityScore} />}
        <ProductListItem product={product} />
      </Link>
    );
  } catch (error) {
    console.error('Error rendering search result:', error, result);
    return null;
  }
};

/**
 * Custom results container view with grid layout
 */
const CustomResultsView: FC<
  ElasticResultsViewProps & {
    mobileColumns: number;
    tabletColumns: number;
    desktopColumns: number;
  }
> = ({ children, className, mobileColumns, tabletColumns, desktopColumns }) => {
  const gridClasses = clsx(
    'grid gap-4 md:gap-6',
    {
      'grid-cols-1': mobileColumns === 1,
      'grid-cols-2': mobileColumns === 2,
    },
    {
      'md:grid-cols-2': tabletColumns === 2,
      'md:grid-cols-3': tabletColumns === 3,
      'md:grid-cols-4': tabletColumns === 4,
    },
    {
      'lg:grid-cols-3': desktopColumns === 3,
      'lg:grid-cols-4': desktopColumns === 4,
      'lg:grid-cols-5': desktopColumns === 5,
      'lg:grid-cols-6': desktopColumns === 6,
    },
    className,
  );

  return <div className={gridClasses}>{children}</div>;
};

/**
 * Custom paging info view showing result count
 */
const CustomPagingInfoView: FC<ElasticPagingInfoViewProps> = ({ start, end, totalResults, searchTerm }) => {
  // Ensure all values are valid numbers
  const safeStart = typeof start === 'number' && !isNaN(start) ? start : 0;
  const safeEnd = typeof end === 'number' && !isNaN(end) ? end : 0;
  const safeTotal = typeof totalResults === 'number' && !isNaN(totalResults) ? totalResults : 0;

  if (safeTotal === 0) return null;

  return (
    <p className="text-sm text-gray-600">
      Showing <span className="font-medium">{safeStart}</span> - <span className="font-medium">{safeEnd}</span> of{' '}
      <span className="font-medium">{safeTotal}</span> results
      {searchTerm && (
        <>
          {' '}
          for "<span className="font-medium">{String(searchTerm)}</span>"
        </>
      )}
    </p>
  );
};

/**
 * Custom results per page selector
 */
const CustomResultsPerPageView: FC<ElasticResultsPerPageViewProps> = ({ onChange, options, value }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="results-per-page" className="text-sm text-gray-600">
        Show:
      </label>
      <select
        id="results-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * Custom pagination view
 */
const CustomPagingView: FC<ElasticPagingViewProps> = ({ current, totalPages, onChange }) => {
  // Handle undefined values with defaults
  const currentPage = current ?? 1;
  const pages = totalPages ?? 1;

  if (pages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pageNumbers: (number | 'ellipsis')[] = [];
    const showPages = 5; // Number of page buttons to show

    if (pages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < pages - 2) {
        pageNumbers.push('ellipsis');
      }

      // Always show last page
      pageNumbers.push(pages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Previous button */}
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors',
          currentPage === 1
            ? 'cursor-not-allowed border-gray-200 text-gray-300'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50',
        )}
        aria-label="Previous page"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={clsx(
              'flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 text-sm transition-colors',
              page === currentPage
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50',
            )}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}

      {/* Next button */}
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === pages}
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors',
          currentPage === pages
            ? 'cursor-not-allowed border-gray-200 text-gray-300'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50',
        )}
        aria-label="Next page"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

/**
 * Loading skeleton for search results
 */
const LoadingSkeleton: FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-5 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

/**
 * Image search indicator with clear button
 */
const ImageSearchIndicator: FC<{ previewUrl: string; onClear: () => void }> = ({ previewUrl, onClear }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg mb-4">
      <img src={previewUrl} alt="Search image" className="w-12 h-12 object-cover rounded-md" />
      <div className="flex-1">
        <p className="text-sm font-medium text-purple-900">Searching by image</p>
        <p className="text-xs text-purple-600">Showing visually similar products</p>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-md transition-colors"
        aria-label="Clear image search"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Clear
      </button>
    </div>
  );
};

/**
 * Empty state when no results are found
 */
const EmptyState: FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const safeSearchTerm = searchTerm ? String(searchTerm) : '';

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        className="mb-4 h-16 w-16 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">No products found</h3>
      <p className="max-w-md text-gray-600">
        {safeSearchTerm ? (
          <>
            We couldn't find any products matching "<span className="font-medium">{safeSearchTerm}</span>". Try
            adjusting your search or filters.
          </>
        ) : (
          <>Try adjusting your filters or browse our categories to find what you're looking for.</>
        )}
      </p>
    </div>
  );
};

/**
 * SearchResults Component (Inner)
 *
 * Displays search results with:
 * - Grid layout with responsive columns
 * - Loading skeleton during search
 * - Empty state when no results
 * - Pagination controls
 * - Results per page selector
 * - Result count information
 */
const SearchResultsComponent: FC<SearchResultsWithSearchProps> = ({
  className,
  mobileColumns = 2,
  tabletColumns = 3,
  desktopColumns = 4,
  resultsPerPageOptions = [12, 24, 48],
  isLoading,
  totalResults,
  searchTerm,
}) => {
  const { imageSearch, clearImageSearch } = useImageSearchState();

  // Validate totalResults to prevent NaN issues
  const safeTotalResults = typeof totalResults === 'number' && !isNaN(totalResults) ? totalResults : 0;

  // Show loading state
  if (isLoading) {
    return (
      <div className={clsx('space-y-6', className)}>
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
        </div>
        <LoadingSkeleton count={resultsPerPageOptions[0]} />
      </div>
    );
  }

  // Show empty state
  if (safeTotalResults === 0) {
    return (
      <div className={className}>
        {imageSearch.isActive && imageSearch.previewUrl && (
          <ImageSearchIndicator previewUrl={imageSearch.previewUrl} onClear={clearImageSearch} />
        )}
        <EmptyState searchTerm={searchTerm} />
      </div>
    );
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Image search indicator */}
      {imageSearch.isActive && imageSearch.previewUrl && (
        <ImageSearchIndicator previewUrl={imageSearch.previewUrl} onClear={clearImageSearch} />
      )}

      {/* Header with result count and per-page selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PagingInfo view={CustomPagingInfoView} />
        <ResultsPerPage options={resultsPerPageOptions} view={CustomResultsPerPageView} />
      </div>

      {/* Results grid */}
      <Results
        resultView={ResultView}
        view={(props) => (
          <CustomResultsView
            {...props}
            mobileColumns={mobileColumns}
            tabletColumns={tabletColumns}
            desktopColumns={desktopColumns}
          />
        )}
      />

      {/* Pagination */}
      <div className="mt-8">
        <Paging view={CustomPagingView} />
      </div>
    </div>
  );
};

/**
 * SearchResults wrapped with Search UI context
 * Automatically receives isLoading, totalResults, and searchTerm from SearchProvider
 */
const SearchResultsWithSearch = withSearch(({ isLoading, totalResults, searchTerm }) => ({
  isLoading,
  totalResults,
  searchTerm,
}))(SearchResultsComponent);

/**
 * SSR-safe SearchResults component
 */
export const SearchResults: FC<SearchResultsProps> = (props) => {
  const isSearchReady = useSearchReady();

  if (!isSearchReady) {
    return (
      <div className={clsx('space-y-6', props.className)}>
        <LoadingSkeleton count={props.resultsPerPageOptions?.[0] || 12} />
      </div>
    );
  }

  return <SearchResultsWithSearch {...props} />;
};

/**
 * Export the unwrapped component for testing purposes
 */
export { SearchResultsComponent, LoadingSkeleton, EmptyState, ResultView, MatchTypeBadge, ImageSearchIndicator };
