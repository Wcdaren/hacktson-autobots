/**
 * CategorySearchResults Component
 */
import { Results, Paging, ResultsPerPage, PagingInfo } from '@elastic/react-search-ui';
import type {
  PagingViewProps as ElasticPagingViewProps,
  ResultsPerPageViewProps as ElasticResultsPerPageViewProps,
  PagingInfoViewProps as ElasticPagingInfoViewProps,
} from '@elastic/react-search-ui-views';
import { withSearch } from '@elastic/react-search-ui';
import type { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useCategorySearchReady } from '@app/providers/category-search-provider';

export interface CategorySearchResultsProps {
  className?: string;
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3 | 4;
  desktopColumns?: 3 | 4 | 5;
  resultsPerPageOptions?: number[];
}

function formatPrice(amount: number | undefined, currencyCode: string = 'usd'): string {
  if (amount === undefined || amount === null) return '';
  const dollars = amount / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}

interface CategorySearchResult {
  id?: { raw: string };
  title?: { raw: string };
  handle?: { raw: string };
  thumbnail?: { raw: string };
  min_price?: { raw: number };
  currency_code?: { raw: string };
}

const CategoryResultView: FC<{ result: CategorySearchResult }> = ({ result }) => {
  const id = result.id?.raw as string;
  const title = result.title?.raw as string;
  const handle = result.handle?.raw as string;
  const thumbnail = result.thumbnail?.raw as string;
  const minPrice = result.min_price?.raw as number | undefined;
  const currencyCode = (result.currency_code?.raw as string) || 'usd';

  return (
    <Link to={'/products/' + handle} className="group block" key={id}>
      <div className="aspect-square overflow-hidden rounded-lg border border-gray-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {minPrice !== undefined && <p className="text-sm text-gray-600">From {formatPrice(minPrice, currencyCode)}</p>}
      </div>
    </Link>
  );
};

const CustomPagingView: FC<ElasticPagingViewProps> = ({ current, totalPages, onChange }) => {
  const currentPage = current ?? 1;
  const pages = totalPages ?? 1;
  if (pages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
      if (currentPage < pages - 2) pageNumbers.push('...');
      pageNumbers.push(pages);
    }
    return pageNumbers;
  };

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={clsx(
              'px-3 py-2 text-sm font-medium rounded-md',
              page === currentPage
                ? 'bg-primary text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
            )}
          >
            {page}
          </button>
        ) : (
          <span key={'ellipsis-' + index} className="px-2 text-gray-500">
            {page}
          </span>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === pages}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

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

const CustomPagingInfoView: FC<ElasticPagingInfoViewProps> = ({ start, end, totalResults }) => {
  const safeStart = typeof start === 'number' ? start : 0;
  const safeEnd = typeof end === 'number' ? end : 0;
  const safeTotal = typeof totalResults === 'number' ? totalResults : 0;
  if (safeTotal === 0) return null;
  return (
    <p className="text-sm text-gray-600">
      Showing {safeStart} - {safeEnd} of {safeTotal} products
    </p>
  );
};

interface SearchContextProps {
  isLoading: boolean;
  totalResults: number;
}

const CategorySearchResultsInternal: FC<CategorySearchResultsProps & SearchContextProps> = ({
  className,
  mobileColumns = 2,
  tabletColumns = 3,
  desktopColumns = 4,
  resultsPerPageOptions = [12, 24, 48],
  isLoading,
  totalResults,
}) => {
  const gridClasses = clsx(
    'grid gap-4',
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

  if (isLoading) {
    return (
      <div className={clsx('space-y-6', className)}>
        <div className={gridClasses}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find what you are looking for.</p>
      </div>
    );
  }

  return (
    <div className={clsx('space-y-6', className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PagingInfo view={CustomPagingInfoView} />
        <ResultsPerPage options={resultsPerPageOptions} view={CustomResultsPerPageView} />
      </div>
      <Results resultView={CategoryResultView} view={({ children }) => <div className={gridClasses}>{children}</div>} />
      <Paging view={CustomPagingView} />
    </div>
  );
};

const CategorySearchResultsWithSearch = withSearch(({ isLoading, totalResults }) => ({
  isLoading,
  totalResults,
}))(CategorySearchResultsInternal);

export const CategorySearchResults: FC<CategorySearchResultsProps> = (props) => {
  const isSearchReady = useCategorySearchReady();

  if (!isSearchReady) {
    const gridClasses = clsx(
      'grid gap-4',
      { 'grid-cols-1': props.mobileColumns === 1, 'grid-cols-2': props.mobileColumns === 2 || !props.mobileColumns },
      {
        'sm:grid-cols-2': props.tabletColumns === 2,
        'sm:grid-cols-3': props.tabletColumns === 3 || !props.tabletColumns,
        'sm:grid-cols-4': props.tabletColumns === 4,
      },
      {
        'lg:grid-cols-3': props.desktopColumns === 3,
        'lg:grid-cols-4': props.desktopColumns === 4 || !props.desktopColumns,
        'lg:grid-cols-5': props.desktopColumns === 5,
      },
    );

    return (
      <div className={clsx('space-y-6', props.className)}>
        <div className={gridClasses}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <CategorySearchResultsWithSearch {...props} />;
};
