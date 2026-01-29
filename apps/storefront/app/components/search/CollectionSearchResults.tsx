/**
 * CollectionSearchResults Component
 *
 * Displays search results for collection pages with pagination.
 * Uses the CollectionSearchProvider context and the shared ProductListingPage component.
 *
 * @module app/components/search/CollectionSearchResults
 */
import type { FC } from 'react';
import { useCollectionSearchReady } from '@app/providers/collection-search-provider';
import { ProductListingPage } from '@app/components/product/ProductListingPage';

export interface CollectionSearchResultsProps {
  className?: string;
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3 | 4;
  desktopColumns?: 3 | 4 | 5;
  resultsPerPageOptions?: number[];
}

/**
 * CollectionSearchResults Component
 *
 * A wrapper around ProductListingPage that uses the CollectionSearchProvider context.
 * Provides collection-specific defaults and empty state messaging.
 */
export const CollectionSearchResults: FC<CollectionSearchResultsProps> = ({
  className,
  mobileColumns = 2,
  tabletColumns = 3,
  desktopColumns = 4,
  resultsPerPageOptions = [12, 24, 48],
}) => {
  return (
    <ProductListingPage
      useSearchReady={useCollectionSearchReady}
      className={className}
      mobileColumns={mobileColumns}
      tabletColumns={tabletColumns}
      desktopColumns={desktopColumns}
      resultsPerPageOptions={resultsPerPageOptions}
      emptyStateTitle="No products found"
      emptyStateMessage="Try adjusting your filters to find what you are looking for."
      idPrefix="collection"
    />
  );
};
