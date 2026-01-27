/**
 * Tests for MobileFilterDrawer Component
 *
 * Tests that the MobileFilterDrawer component opens/closes correctly
 * and displays filter content.
 *
 * @module app/components/search/__tests__/MobileFilterDrawer.test
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { Filter } from '@elastic/search-ui';

// Mock Headless UI Dialog components
jest.mock('@headlessui/react', () => ({
  Dialog: ({ open, onClose, children, className }: any) =>
    open ? (
      <div data-testid="dialog" className={className} role="dialog">
        {children}
      </div>
    ) : null,
  DialogBackdrop: ({ children, className }: any) => (
    <div data-testid="dialog-backdrop" className={className}>
      {children}
    </div>
  ),
  DialogPanel: ({ children, className }: any) => (
    <div data-testid="dialog-panel" className={className}>
      {children}
    </div>
  ),
  DialogTitle: ({ children, className }: any) => (
    <h2 data-testid="dialog-title" className={className}>
      {children}
    </h2>
  ),
}));

// Mock Heroicons
jest.mock('@heroicons/react/24/outline/XMarkIcon', () => {
  return function MockXMarkIcon(props: any) {
    return <svg data-testid="x-mark-icon" {...props} />;
  };
});

jest.mock('@heroicons/react/24/outline/AdjustmentsHorizontalIcon', () => {
  return function MockAdjustmentsIcon(props: any) {
    return <svg data-testid="adjustments-icon" {...props} />;
  };
});

// Mock IconButton
jest.mock('@app/components/common/buttons/IconButton', () => ({
  IconButton: ({ onClick, 'aria-label': ariaLabel }: any) => (
    <button onClick={onClick} aria-label={ariaLabel} data-testid="icon-button">
      Close
    </button>
  ),
}));

// Mock SearchFilters
jest.mock('../SearchFilters', () => ({
  SearchFilters: ({ showSort, showCategories, showCollections, showPriceRange }: any) => (
    <div data-testid="search-filters">
      {showSort && <div data-testid="filter-sort">Sort</div>}
      {showCategories && <div data-testid="filter-categories">Categories</div>}
      {showCollections && <div data-testid="filter-collections">Collections</div>}
      {showPriceRange && <div data-testid="filter-price">Price</div>}
    </div>
  ),
}));

// Import the unwrapped component for testing
import { MobileFilterDrawerComponent } from '../MobileFilterDrawer';

describe('MobileFilterDrawer Component', () => {
  const defaultProps = {
    filters: [] as Filter[],
  };

  describe('Filter Button', () => {
    it('should render filter button', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      expect(screen.getByRole('button', { name: /Open filters/i })).toBeInTheDocument();
    });

    it('should display "Filters" label by default', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('should display custom button label', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} buttonLabel="Filter Products" />);

      expect(screen.getByText('Filter Products')).toBeInTheDocument();
    });

    it('should show filter count badge when filters are active', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics', 'Clothing'], type: 'any' }];

      render(<MobileFilterDrawerComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should not show badge when no filters are active', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} filters={[]} />);

      // The badge should not be present
      const button = screen.getByRole('button', { name: /Open filters/i });
      expect(button.querySelector('.bg-primary')).not.toBeInTheDocument();
    });

    it('should include filter count in aria-label when filters are active', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<MobileFilterDrawerComponent {...defaultProps} filters={filters} />);

      expect(screen.getByRole('button', { name: /Open filters, 1 active/i })).toBeInTheDocument();
    });
  });

  describe('Drawer Open/Close', () => {
    it('should not show drawer initially', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });

    it('should open drawer when filter button is clicked', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });

    it('should show "Filters" title in drawer header', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Filters');
    });

    it('should close drawer when close button is clicked', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      // Open drawer
      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();

      // Close drawer
      const closeButton = screen.getByTestId('icon-button');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });

    it('should close drawer when "View Results" button is clicked', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      // Open drawer
      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      // Click View Results
      const viewResultsButton = screen.getByRole('button', { name: /View Results/i });
      fireEvent.click(viewResultsButton);

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Filter Content', () => {
    it('should render SearchFilters component in drawer', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('search-filters')).toBeInTheDocument();
    });

    it('should pass showSort prop to SearchFilters', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} showSort={true} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('filter-sort')).toBeInTheDocument();
    });

    it('should pass showCategories prop to SearchFilters', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} showCategories={true} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('filter-categories')).toBeInTheDocument();
    });

    it('should pass showCollections prop to SearchFilters', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} showCollections={true} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('filter-collections')).toBeInTheDocument();
    });

    it('should pass showPriceRange prop to SearchFilters', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} showPriceRange={true} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('filter-price')).toBeInTheDocument();
    });

    it('should hide filters when props are false', () => {
      render(
        <MobileFilterDrawerComponent
          {...defaultProps}
          showSort={false}
          showCategories={false}
          showCollections={false}
          showPriceRange={false}
        />,
      );

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.queryByTestId('filter-sort')).not.toBeInTheDocument();
      expect(screen.queryByTestId('filter-categories')).not.toBeInTheDocument();
      expect(screen.queryByTestId('filter-collections')).not.toBeInTheDocument();
      expect(screen.queryByTestId('filter-price')).not.toBeInTheDocument();
    });
  });

  describe('View Results Button', () => {
    it('should show filter count in View Results button when filters are active', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<MobileFilterDrawerComponent {...defaultProps} filters={filters} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByText(/1 filter applied/i)).toBeInTheDocument();
    });

    it('should show plural "filters" when multiple filters are active', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics', 'Clothing'], type: 'any' }];

      render(<MobileFilterDrawerComponent {...defaultProps} filters={filters} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByText(/2 filters applied/i)).toBeInTheDocument();
    });

    it('should not show filter count when no filters are active', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} filters={[]} />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      const viewResultsButton = screen.getByRole('button', { name: /View Results/i });
      expect(viewResultsButton).not.toHaveTextContent('filter');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom buttonClassName', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} buttonClassName="custom-button-class" />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      expect(filterButton).toHaveClass('custom-button-class');
    });

    it('should apply custom drawerClassName', () => {
      render(<MobileFilterDrawerComponent {...defaultProps} drawerClassName="custom-drawer-class" />);

      const filterButton = screen.getByRole('button', { name: /Open filters/i });
      fireEvent.click(filterButton);

      expect(screen.getByTestId('dialog-panel')).toHaveClass('custom-drawer-class');
    });
  });
});
