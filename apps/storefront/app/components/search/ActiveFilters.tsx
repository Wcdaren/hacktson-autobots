/**
 * ActiveFilters Component
 *
 * Displays currently active search filters as removable tags.
 * Integrates with Elastic Search UI to show and manage active filters.
 *
 * @module app/components/search/ActiveFilters
 */
import { withSearch } from '@elastic/react-search-ui';
import type { Filter, FilterValue } from '@elastic/search-ui';
import type { FC } from 'react';
import clsx from 'clsx';
import { useSearchReady } from '@app/providers/search-provider';

/**
 * Props for the ActiveFilters component
 * These are injected by the withSearch HOC
 */
interface ActiveFiltersProps {
  /** Array of currently active filters */
  filters: Filter[];
  /** Function to clear all filters, optionally except specified fields */
  clearFilters: (except?: string[]) => void;
  /** Function to remove a specific filter value */
  removeFilter: (name: string, value: FilterValue) => void;
  /** Additional CSS classes for the container */
  className?: string;
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
 * Helper function to format field name for display
 * Converts snake_case to Title Case
 */
function formatFieldName(field: string): string {
  return field
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace('Names', '')
    .replace('Ids', '')
    .trim();
}

/**
 * Helper function to generate a unique key for a filter value
 */
function getFilterKey(field: string, value: FilterValue): string {
  const displayValue = getDisplayValue(value);
  return `${field}-${displayValue}`;
}

/**
 * ActiveFilters Component
 *
 * Displays active filter tags that can be individually removed.
 * Features:
 * - Shows all currently applied filters as removable tags
 * - Individual filter removal by clicking the × button
 * - "Clear all" button to remove all filters at once
 * - Handles both string values and range values (for price filters)
 * - Styled with Tailwind CSS matching the storefront design
 *
 * @example
 * ```tsx
 * import { ActiveFilters } from "@app/components/search"
 *
 * function ProductListPage() {
 *   return (
 *     <SearchProvider>
 *       <ActiveFilters />
 *       <SearchResults />
 *     </SearchProvider>
 *   )
 * }
 * ```
 */
const ActiveFiltersComponent: FC<ActiveFiltersProps> = ({ filters, clearFilters, removeFilter, className }) => {
  // Don't render if there are no active filters
  if (!filters || filters.length === 0) {
    return null;
  }

  // Count total number of filter values
  const totalFilterCount = filters.reduce((count, filter) => count + filter.values.length, 0);

  return (
    <div className={clsx('flex flex-wrap items-center gap-2', className)} role="region" aria-label="Active filters">
      <span className="text-sm font-medium text-gray-700">Active filters:</span>

      {filters.map((filter) =>
        filter.values.map((value) => {
          const displayValue = getDisplayValue(value);
          const fieldLabel = formatFieldName(filter.field);
          const filterKey = getFilterKey(filter.field, value);

          return (
            <button
              key={filterKey}
              type="button"
              onClick={() => removeFilter(filter.field, value)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label={`Remove filter: ${fieldLabel} ${displayValue}`}
            >
              <span className="font-medium">{fieldLabel}:</span>
              <span>{displayValue}</span>
              <svg
                className="h-3.5 w-3.5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          );
        }),
      )}

      {/* Clear all button - only show if there are multiple filters */}
      {totalFilterCount > 1 && (
        <button
          type="button"
          onClick={() => clearFilters()}
          className="ml-2 text-sm font-medium text-red-600 transition-colors hover:text-red-800 focus:outline-none focus:underline"
          aria-label="Clear all filters"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

/**
 * ActiveFilters wrapped with Search UI context
 * Automatically receives filters, clearFilters, and removeFilter from SearchProvider
 */
const ActiveFiltersWithSearch = withSearch(({ filters, clearFilters, removeFilter }) => ({
  filters,
  clearFilters,
  removeFilter,
}))(ActiveFiltersComponent) as FC<{ className?: string }>;

/**
 * SSR-safe ActiveFilters component
 */
export const ActiveFilters: FC<{ className?: string }> = ({ className }) => {
  const isSearchReady = useSearchReady();

  if (!isSearchReady) {
    return null;
  }

  return <ActiveFiltersWithSearch className={className} />;
};

/**
 * Export the unwrapped component for testing purposes
 */
export { ActiveFiltersComponent };
