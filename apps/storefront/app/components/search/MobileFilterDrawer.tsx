/**
 * MobileFilterDrawer Component
 *
 * A slide-in drawer component for mobile devices that displays search filters.
 * Provides a responsive filter interface that slides in from the left side
 * on mobile devices while remaining hidden on desktop.
 *
 * @module app/components/search/MobileFilterDrawer
 */
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import { withSearch } from '@elastic/react-search-ui';
import type { Filter } from '@elastic/search-ui';
import type { FC } from 'react';
import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { IconButton } from '@app/components/common/buttons/IconButton';
import { SearchFilters } from './SearchFilters';
import { useSearchReady } from '@app/providers/search-provider';

/**
 * Props for the MobileFilterDrawer component
 */
export interface MobileFilterDrawerProps {
  /** Additional CSS classes for the filter button */
  buttonClassName?: string;
  /** Additional CSS classes for the drawer panel */
  drawerClassName?: string;
  /** Custom label for the filter button */
  buttonLabel?: string;
  /** Whether to show the sort selector in the drawer (default: true) */
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
 * Props injected by withSearch HOC
 */
interface SearchContextProps {
  /** Array of currently active filters */
  filters: Filter[];
}

/**
 * Combined props for the internal component
 */
type MobileFilterDrawerInternalProps = MobileFilterDrawerProps & SearchContextProps;

/**
 * MobileFilterDrawer Internal Component
 *
 * A responsive filter drawer that:
 * - Shows a filter button on mobile devices (hidden on lg+ screens)
 * - Slides in from the left side when opened
 * - Contains all search filters (categories, collections, price range, sorting)
 * - Displays active filter count on the button badge
 * - Includes smooth open/close animations
 *
 * @example
 * ```tsx
 * import { MobileFilterDrawer } from "@app/components/search"
 *
 * function ProductListPage() {
 *   return (
 *     <SearchProvider>
 *       <div className="lg:hidden">
 *         <MobileFilterDrawer />
 *       </div>
 *       <aside className="hidden lg:block">
 *         <SearchFilters />
 *       </aside>
 *     </SearchProvider>
 *   )
 * }
 * ```
 */
const MobileFilterDrawerComponent: FC<MobileFilterDrawerInternalProps> = ({
  buttonClassName,
  drawerClassName,
  buttonLabel = 'Filters',
  showSort = true,
  showCategories = true,
  showCollections = true,
  showPriceRange = true,
  showTags = false,
  showMetadataFacets = false,
  filters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Calculate total active filter count
  const activeFilterCount = filters?.reduce((count, filter) => count + filter.values.length, 0) ?? 0;

  return (
    <>
      {/* Filter Button - visible on mobile only */}
      <button
        type="button"
        onClick={handleOpen}
        className={clsx(
          'lg:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors',
          buttonClassName,
        )}
        aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''}`}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        <span>{buttonLabel}</span>
        {activeFilterCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-semibold text-white bg-primary rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filter Drawer */}
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50 lg:hidden">
        {/* Backdrop with transition */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              {/* Panel with slide-in transition from left */}
              <DialogPanel
                transition
                className={clsx(
                  'pointer-events-auto w-screen max-w-xs transform duration-300 ease-in-out data-[closed]:-translate-x-full',
                  drawerClassName,
                )}
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                    <DialogTitle className="text-lg font-semibold text-gray-900">Filters</DialogTitle>
                    <IconButton icon={XMarkIcon} onClick={handleClose} className="-m-2" aria-label="Close filters" />
                  </div>

                  {/* Filter Content */}
                  <div className="flex-1 overflow-y-auto px-4 py-6">
                    <SearchFilters
                      showSort={showSort}
                      showCategories={showCategories}
                      showCollections={showCollections}
                      showPriceRange={showPriceRange}
                      showTags={showTags}
                      showMetadataFacets={showMetadataFacets}
                    />
                  </div>

                  {/* Footer with Apply Button */}
                  <div className="border-t border-gray-200 px-4 py-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full px-4 py-3 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                    >
                      View Results
                      {activeFilterCount > 0 && (
                        <span className="ml-2">
                          ({activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied)
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

/**
 * MobileFilterDrawer wrapped with Search UI context
 * Automatically receives filters from SearchProvider
 */
const MobileFilterDrawerWithSearch = withSearch(({ filters }) => ({
  filters,
}))(MobileFilterDrawerComponent);

/**
 * SSR-safe MobileFilterDrawer component
 */
export const MobileFilterDrawer: FC<MobileFilterDrawerProps> = (props) => {
  const isSearchReady = useSearchReady();

  if (!isSearchReady) {
    return (
      <button
        type="button"
        disabled
        className={clsx(
          'lg:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed',
          props.buttonClassName,
        )}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        <span>{props.buttonLabel || 'Filters'}</span>
      </button>
    );
  }

  return <MobileFilterDrawerWithSearch {...props} />;
};

/**
 * Export the unwrapped component for testing purposes
 */
export { MobileFilterDrawerComponent };
