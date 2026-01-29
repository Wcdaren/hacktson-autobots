/**
 * ProductListingPage Component
 *
 * A shared component for displaying product listings with pagination, filtering,
 * and responsive grid layout. Used by search, category, and collection pages.
 *
 * This component extracts common functionality:
 * - Product grid with responsive columns
 * - Pagination component
 * - Results per page selector
 * - Paging info display
 * - Loading skeleton
 * - Empty state
 * - Product card with "From $XXX" pricing
 *
 * @module app/components/product/ProductListingPage
 */
import { Results, Paging, ResultsPerPage, PagingInfo } from '@elastic/react-search-ui';
import type {
  ResultsViewProps as ElasticResultsViewProps,
  PagingViewProps as ElasticPagingViewProps,
  ResultsPerPageViewProps as ElasticResultsPerPageViewProps,
  PagingInfoViewProps as ElasticPagingInfoViewProps,
} from '@elastic/react-search-ui-views';
import { withSearch } from '@elastic/react-search-ui';
import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router';

// ============================================================================
// Types
// ============================================================================

/**
 * Search result structure from OpenSearch
 */
export interface ProductSearchResult {
  id?: { raw: string };
  title?: { raw: string };
  handle?: { raw: string };
  thumbnail?: { raw: string };
  min_price?: { raw: number };
  price?: { raw: number };
  currency_code?: { raw: string };
}

/**
 * Props for the ProductListingPage component
 */
export interface ProductListingPageProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Number of columns on mobile (default: 2) */
  mobileColumns?: 1 | 2;
  /** Number of columns on tablet (default: 3) */
  tabletColumns?: 2 | 3 | 4;
  /** Number of columns on desktop (default: 4) */
  desktopColumns?: 3 | 4 | 5;
  /** Options for results per page selector */
  resultsPerPageOptions?: number[];
  /** Custom empty state message */
  emptyStateMessage?: string;
  /** Custom empty state title */
  emptyStateTitle?: string;
  /** Whether to show search term in paging info */
  showSearchTerm?: boolean;
  /** Search term to display (if showSearchTerm is true) */
  searchTerm?: string;
  /** Custom header content to render above results */
  headerContent?: ReactNode;
  /** ID prefix for accessibility (to avoid duplicate IDs) */
  idPrefix?: string;
}

/**
 * Props injected by withSearch HOC
 */
interface ProductListingPageWithSearchProps extends ProductListingPageProps {
  isLoading: boolean;
  totalResults: number;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format price for display
 * Converts cents to dollars and formats with currency symbol
 */
export function formatProductPrice(amount: number | undefined, currencyCode: string = 'usd'): string {
  if (amount === undefined || amount === null) return '';
  const dollars = amount / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}

/**
 * Get grid classes based on column configuration
 */
export function getGridClasses(
  mobileColumns: 1 | 2 = 2,
  tabletColumns: 2 | 3 | 4 = 3,
  desktopColumns: 3 | 4 | 5 = 4,
): string {
  return clsx(
    'grid gap-4 md:gap-6',
    { 'grid-cols-1': mobileColumns === 1, 'grid-cols-2': mobileColumns === 2 },
    {
      'sm:grid-cols-2': tabletColumns === 2,
      'sm:grid-cols-3': tabletColumns === 3,
      'sm:grid-cols-4': tabletColumns === 4,
    },
    {
      'lg:grid-cols-3': desktopColumns === 3,
      'lg:grid-cols-4': desktopColumns === 4,
      'lg:grid-cols-5': desktopColumns === 5,
    },
  );
}

// ============================================================================
// Sub-Components
// ============================================================================

/**
 * Product card component for search results
 * Displays product thumbnail, title, and "From $XXX" pricing
 */
export const ProductResultCard: FC<{ result: ProductSearchResult }> = ({ result }) => {
  const id = result.id?.raw;
  const title = result.title?.raw || 'Untitled';
  const handle = result.handle?.raw;
  const thumbnail = result.thumbnail?.raw;
  // Use min_price for display, fallback to price for backward compatibility
  const minPrice = result.min_price?.raw ?? result.price?.raw;
  const currencyCode = result.currency_code?.raw || 'usd';

  if (!handle || !id) {
    console.warn('Invalid product data in search result:', result);
    return null;
  }

  return (
    <Link to={`/products/${handle}`} className="group block" key={id}>
      <div className="aspect-square overflow-hidden rounded-lg border border-gray-100 bg-white">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {minPrice !== undefined && (
          <p className="text-sm text-gray-600">From {formatProductPrice(minPrice, currencyCode)}</p>
        )}
      </div>
    </Link>
  );
};

/**
 * Loading skeleton for product grid
 */
export const ProductListingSkeleton: FC<{
  count?: number;
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3 | 4;
  desktopColumns?: 3 | 4 | 5;
}> = ({ count = 12, mobileColumns = 2, tabletColumns = 3, desktopColumns = 4 }) => {
  const gridClasses = getGridClasses(mobileColumns, tabletColumns, desktopColumns);

  return (
    <div className={gridClasses}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Empty state when no products are found
 */
export const ProductListingEmptyState: FC<{
  title?: string;
  message?: string;
}> = ({ title = 'No products found', message = 'Try adjusting your filters to find what you are looking for.' }) => {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
    </div>
  );
};

/**
 * Custom pagination view
 */
const CustomPagingView: FC<ElasticPagingViewProps> = ({ current, totalPages, onChange }) => {
  const currentPage = current ?? 1;
  const pages = totalPages ?? 1;

  if (pages <= 1) return null;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pageNumbers: (number | 'ellipsis')[] = [];
    const showPages = 5;

    if (pages <= showPages) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push('ellipsis');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < pages - 2) {
        pageNumbers.push('ellipsis');
      }

      pageNumbers.push(pages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
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
 * Custom results per page selector
 */
const createResultsPerPageView = (idPrefix: string): FC<ElasticResultsPerPageViewProps> => {
  const CustomResultsPerPageView: FC<ElasticResultsPerPageViewProps> = ({ onChange, options, value }) => {
    if (!options || options.length === 0) return null;

    const selectId = `${idPrefix}-results-per-page`;

    return (
      <div className="flex items-center gap-2">
        <label htmlFor={selectId} className="text-sm text-gray-600">
          Show:
        </label>
        <select
          id={selectId}
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

  return CustomResultsPerPageView;
};

/**
 * Custom paging info view
 */
const createPagingInfoView = (showSearchTerm: boolean, searchTerm?: string): FC<ElasticPagingInfoViewProps> => {
  const CustomPagingInfoView: FC<ElasticPagingInfoViewProps> = ({ start, end, totalResults }) => {
    const safeStart = typeof start === 'number' && !isNaN(start) ? start : 0;
    const safeEnd = typeof end === 'number' && !isNaN(end) ? end : 0;
    const safeTotal = typeof totalResults === 'number' && !isNaN(totalResults) ? totalResults : 0;

    if (safeTotal === 0) return null;

    return (
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{safeStart}</span> - <span className="font-medium">{safeEnd}</span> of{' '}
        <span className="font-medium">{safeTotal}</span> products
        {showSearchTerm && searchTerm && (
          <>
            {' '}
            for "<span className="font-medium">{searchTerm}</span>"
          </>
        )}
      </p>
    );
  };

  return CustomPagingInfoView;
};

// ============================================================================
// Main Component
// ============================================================================

/**
 * Internal ProductListingPage component (receives search context via HOC)
 */
const ProductListingPageInternal: FC<ProductListingPageWithSearchProps> = ({
  className,
  mobileColumns = 2,
  tabletColumns = 3,
  desktopColumns = 4,
  resultsPerPageOptions = [12, 24, 48],
  emptyStateTitle,
  emptyStateMessage,
  showSearchTerm = false,
  searchTerm,
  headerContent,
  idPrefix = 'product-listing',
  isLoading,
  totalResults,
}) => {
  const gridClasses = getGridClasses(mobileColumns, tabletColumns, desktopColumns);
  const safeTotalResults = typeof totalResults === 'number' && !isNaN(totalResults) ? totalResults : 0;

  // Create view components with proper IDs
  const ResultsPerPageView = createResultsPerPageView(idPrefix);
  const PagingInfoView = createPagingInfoView(showSearchTerm, searchTerm);

  // Loading state
  if (isLoading) {
    return (
      <div className={clsx('space-y-6', className)}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
        </div>
        <ProductListingSkeleton
          count={resultsPerPageOptions[0]}
          mobileColumns={mobileColumns}
          tabletColumns={tabletColumns}
          desktopColumns={desktopColumns}
        />
      </div>
    );
  }

  // Empty state
  if (safeTotalResults === 0) {
    return (
      <div className={className}>
        {headerContent}
        <ProductListingEmptyState title={emptyStateTitle} message={emptyStateMessage} />
      </div>
    );
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Optional header content (e.g., image search indicator) */}
      {headerContent}

      {/* Header with result count and per-page selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PagingInfo view={PagingInfoView} />
        <ResultsPerPage options={resultsPerPageOptions} view={ResultsPerPageView} />
      </div>

      {/* Results grid */}
      <Results resultView={ProductResultCard} view={({ children }) => <div className={gridClasses}>{children}</div>} />

      {/* Pagination */}
      <div className="mt-8">
        <Paging view={CustomPagingView} />
      </div>
    </div>
  );
};

/**
 * ProductListingPage wrapped with Search UI context
 */
const ProductListingPageWithSearch = withSearch<ProductListingPageProps, { isLoading: boolean; totalResults: number }>(
  ({ isLoading, totalResults }) => ({
    isLoading,
    totalResults,
  }),
)(ProductListingPageInternal) as FC<ProductListingPageProps>;

/**
 * ProductListingPage Component
 *
 * A shared component for displaying product listings with:
 * - Responsive grid layout
 * - Loading skeleton during search
 * - Empty state when no results
 * - Pagination controls
 * - Results per page selector
 * - Result count information
 *
 * @example
 * ```tsx
 * // Basic usage with a search provider
 * <SearchProvider>
 *   <ProductListingPage />
 * </SearchProvider>
 *
 * // With custom configuration
 * <ProductListingPage
 *   mobileColumns={1}
 *   tabletColumns={2}
 *   desktopColumns={4}
 *   resultsPerPageOptions={[12, 24, 48, 96]}
 *   emptyStateTitle="No products in this category"
 *   emptyStateMessage="Check back later for new arrivals."
 *   idPrefix="category"
 * />
 * ```
 */
export interface ProductListingPageExternalProps extends ProductListingPageProps {
  /** Hook to check if search is ready (for SSR safety) */
  useSearchReady: () => boolean;
}

export const ProductListingPage: FC<ProductListingPageExternalProps> = ({
  useSearchReady,
  mobileColumns = 2,
  tabletColumns = 3,
  desktopColumns = 4,
  resultsPerPageOptions = [12, 24, 48],
  ...props
}) => {
  const isSearchReady = useSearchReady();

  if (!isSearchReady) {
    return (
      <div className={clsx('space-y-6', props.className)}>
        <ProductListingSkeleton
          count={resultsPerPageOptions[0]}
          mobileColumns={mobileColumns}
          tabletColumns={tabletColumns}
          desktopColumns={desktopColumns}
        />
      </div>
    );
  }

  return (
    <ProductListingPageWithSearch
      mobileColumns={mobileColumns}
      tabletColumns={tabletColumns}
      desktopColumns={desktopColumns}
      resultsPerPageOptions={resultsPerPageOptions}
      {...props}
    />
  );
};

// ============================================================================
// Exports
// ============================================================================

export {
  ProductListingPageInternal,
  ProductListingPageWithSearch,
  CustomPagingView,
  createResultsPerPageView,
  createPagingInfoView,
};
