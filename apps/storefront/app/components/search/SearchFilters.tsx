/**
 * SearchFilters Component
 *
 * A container component that provides filtering and sorting functionality
 * for the product search. Integrates with Elastic Search UI to provide
 * faceted filtering by category, collection, and price range.
 *
 * @module app/components/search/SearchFilters
 */
import { Facet, Sorting } from '@elastic/react-search-ui';
import type {
  FacetViewProps as ElasticFacetViewProps,
  SortingViewProps as ElasticSortingViewProps,
} from '@elastic/react-search-ui-views';
import type { FieldValue, FilterValue } from '@elastic/search-ui';
import type { FC } from 'react';
import clsx from 'clsx';
import { useSearchReady } from '@app/providers/search-provider';

/**
 * Sort options for product listing
 * Each option specifies a field and direction for sorting
 */
const SORT_OPTIONS = [
  { name: 'Relevance', value: '', direction: '' },
  { name: 'Newest', value: 'created_at', direction: 'desc' },
  { name: 'Price: Low to High', value: 'min_price', direction: 'asc' },
  { name: 'Price: High to Low', value: 'min_price', direction: 'desc' },
  { name: 'Name: A-Z', value: 'title.keyword', direction: 'asc' },
  { name: 'Name: Z-A', value: 'title.keyword', direction: 'desc' },
] as const;

/**
 * Props for the SearchFilters component
 */
export interface SearchFiltersProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether to show the sort selector (default: true) */
  showSort?: boolean;
  /** Whether to show the category facet (default: true) */
  showCategories?: boolean;
  /** Whether to show the collection facet (default: true) */
  showCollections?: boolean;
  /** Whether to show the price range facet (default: true) */
  showPriceRange?: boolean;
  /** Whether to show the tags facet (default: false) */
  showTags?: boolean;
  /** Whether to show metadata facets (default: false) */
  showMetadataFacets?: boolean;
}

/**
 * Helper function to get display value from a filter value
 * Handles both string values and range values (for price facet)
 */
function getDisplayValue(value: FilterValue): string {
  if (typeof value === 'object' && value !== null && 'name' in value) {
    return value.name;
  }
  return String(value);
}

/**
 * Custom facet view with Tailwind styling
 * Uses the proper types from @elastic/react-search-ui-views
 */
const CustomFacetView: FC<ElasticFacetViewProps> = ({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder,
}) => {
  /**
   * Handle facet value selection/removal
   * The library expects FieldValue but options contain FilterValue
   * We cast to maintain type safety while working with the library's API
   */
  const handleChange = (value: FilterValue, isSelected: boolean) => {
    if (isSelected) {
      onRemove(value as unknown as FieldValue);
    } else {
      onSelect(value as unknown as FieldValue);
    }
  };

  return (
    <div className={clsx('border-b border-gray-200 pb-4', className)}>
      <h3 className="mb-3 text-sm font-semibold text-gray-900">{label}</h3>

      {showSearch && onSearch && (
        <input
          type="text"
          placeholder={searchPlaceholder || `Search ${label?.toLowerCase() || 'options'}...`}
          onChange={(e) => onSearch(e.target.value)}
          className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          aria-label={`Search ${label || 'options'}`}
        />
      )}

      <ul className="space-y-2">
        {options.map((option) => {
          const displayValue = getDisplayValue(option.value);

          return (
            <li key={displayValue}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                <input
                  type="checkbox"
                  checked={option.selected}
                  onChange={() => handleChange(option.value, option.selected ?? false)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="flex-1">{displayValue}</span>
                <span className="text-xs text-gray-500">({option.count})</span>
              </label>
            </li>
          );
        })}
      </ul>

      {showMore && onMoreClick && (
        <button
          type="button"
          onClick={onMoreClick}
          className="mt-2 text-sm font-medium text-primary hover:text-primary/80"
        >
          Show more
        </button>
      )}
    </div>
  );
};

/**
 * Custom sorting view with Tailwind styling
 * Uses the proper types from @elastic/react-search-ui-views
 */
const CustomSortingView: FC<ElasticSortingViewProps> = ({ className, label, onChange, options, value }) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
        {label || 'Sort by'}
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * SearchFilters Component
 *
 * A comprehensive filter panel for product search that includes:
 * - Sort selector with multiple sorting options
 * - Category facet with checkbox selection
 * - Collection facet with checkbox selection
 * - Price range facet with predefined ranges
 *
 * All filters integrate with Elastic Search UI's SearchProvider
 * and automatically sync with URL state.
 *
 * @example
 * ```tsx
 * import { SearchFilters } from "@app/components/search"
 *
 * function ProductListPage() {
 *   return (
 *     <SearchProvider>
 *       <div className="flex">
 *         <aside className="w-64">
 *           <SearchFilters />
 *         </aside>
 *         <main>
 *           <SearchResults />
 *         </main>
 *       </div>
 *     </SearchProvider>
 *   )
 * }
 * ```
 */
export const SearchFilters: FC<SearchFiltersProps> = ({
  className,
  showSort = true,
  showCategories = true,
  showCollections = true,
  showPriceRange = true,
  showTags = false,
  showMetadataFacets = false,
}) => {
  const isSearchReady = useSearchReady();

  // Don't render during SSR
  if (!isSearchReady) {
    return (
      <div className={clsx('space-y-6', className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 rounded bg-gray-200" />
          <div className="h-6 w-24 rounded bg-gray-200" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 w-full rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Sort Selector */}
      {showSort && (
        <div className="border-b border-gray-200 pb-4">
          <Sorting
            label="Sort by"
            sortOptions={SORT_OPTIONS.map((option) => ({
              name: option.name,
              value: option.value,
              direction: option.direction,
            }))}
            view={CustomSortingView}
          />
        </div>
      )}

      {/* Category Facet */}
      {showCategories && (
        <Facet
          field="category_names"
          label="Categories"
          filterType="any"
          isFilterable={true}
          show={10}
          view={CustomFacetView}
        />
      )}

      {/* Collection Facet */}
      {showCollections && (
        <Facet
          field="collection_names"
          label="Collections"
          filterType="any"
          isFilterable={true}
          show={10}
          view={CustomFacetView}
        />
      )}

      {/* Tags Facet */}
      {showTags && (
        <Facet field="tag_values" label="Tags" filterType="any" isFilterable={true} show={10} view={CustomFacetView} />
      )}

      {/* Metadata Facets */}
      {showMetadataFacets && (
        <>
          <Facet
            field="meta_material"
            label="Material"
            filterType="any"
            isFilterable={true}
            show={10}
            view={CustomFacetView}
          />
          <Facet
            field="meta_care"
            label="Care Instructions"
            filterType="any"
            isFilterable={true}
            show={10}
            view={CustomFacetView}
          />
          <Facet
            field="meta_warranty"
            label="Warranty"
            filterType="any"
            isFilterable={true}
            show={10}
            view={CustomFacetView}
          />
          <Facet
            field="meta_assembly"
            label="Assembly"
            filterType="any"
            isFilterable={true}
            show={10}
            view={CustomFacetView}
          />
          <Facet
            field="meta_cover_type"
            label="Cover Type"
            filterType="any"
            isFilterable={true}
            show={10}
            view={CustomFacetView}
          />
          <Facet
            field="meta_filling"
            label="Filling"
            filterType="any"
            isFilterable={true}
            show={10}
            view={CustomFacetView}
          />
        </>
      )}

      {/* Price Range Facet */}
      {showPriceRange && <Facet field="min_price" label="Price Range" filterType="any" view={CustomFacetView} />}
    </div>
  );
};

/**
 * Export sort options for use in other components
 */
export { SORT_OPTIONS };
