/**
 * Tests for ActiveFilters Component
 *
 * Tests that the ActiveFilters component renders filter tags correctly
 * and handles filter removal.
 *
 * @module app/components/search/__tests__/ActiveFilters.test
 */
import { render, screen, fireEvent } from '@testing-library/react';
import type { Filter } from '@elastic/search-ui';

// Import the unwrapped component for testing
import { ActiveFiltersComponent } from '../ActiveFilters';

describe('ActiveFilters Component', () => {
  const mockClearFilters = jest.fn();
  const mockRemoveFilter = jest.fn();

  const defaultProps = {
    filters: [] as Filter[],
    clearFilters: mockClearFilters,
    removeFilter: mockRemoveFilter,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Empty State', () => {
    it('should not render when there are no filters', () => {
      const { container } = render(<ActiveFiltersComponent {...defaultProps} filters={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it('should not render when filters array is undefined', () => {
      const { container } = render(<ActiveFiltersComponent {...defaultProps} filters={undefined as any} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Filter Tag Rendering', () => {
    it('should render filter tags for string values', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Category:')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
    });

    it('should render filter tags for range values (price)', () => {
      const filters: Filter[] = [
        {
          field: 'price',
          values: [{ from: 0, to: 25, name: 'Under $25' }],
          type: 'any',
        },
      ];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      // The component formats 'price' as 'Price'
      expect(screen.getByText('Price:')).toBeInTheDocument();
      expect(screen.getByText('Under $25')).toBeInTheDocument();
    });

    it('should render multiple filter values for the same field', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics', 'Clothing'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Clothing')).toBeInTheDocument();
    });

    it('should render filters from multiple fields', () => {
      const filters: Filter[] = [
        { field: 'category_names', values: ['Electronics'], type: 'any' },
        { field: 'collection_names', values: ['Summer Sale'], type: 'any' },
      ];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Category:')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Collection:')).toBeInTheDocument();
      expect(screen.getByText('Summer Sale')).toBeInTheDocument();
    });

    it('should display "Active filters:" label', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Active filters:')).toBeInTheDocument();
    });
  });

  describe('Filter Removal', () => {
    it('should call removeFilter when clicking a filter tag', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      const filterButton = screen.getByRole('button', {
        name: /Remove filter: Category Electronics/i,
      });
      fireEvent.click(filterButton);

      expect(mockRemoveFilter).toHaveBeenCalledWith('category_names', 'Electronics');
    });

    it('should call removeFilter with correct value for range filters', () => {
      const rangeValue = { from: 0, to: 25, name: 'Under $25' };
      const filters: Filter[] = [{ field: 'price', values: [rangeValue], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      const filterButton = screen.getByRole('button', {
        name: /Remove filter: Price Under \$25/i,
      });
      fireEvent.click(filterButton);

      expect(mockRemoveFilter).toHaveBeenCalledWith('price', rangeValue);
    });
  });

  describe('Clear All Button', () => {
    it('should not show "Clear all" button when only one filter is applied', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
    });

    it('should show "Clear all" button when multiple filters are applied', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics', 'Clothing'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('should call clearFilters when clicking "Clear all"', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics', 'Clothing'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      const clearAllButton = screen.getByRole('button', { name: /Clear all filters/i });
      fireEvent.click(clearAllButton);

      expect(mockClearFilters).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label on filter buttons', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      const filterButton = screen.getByRole('button', {
        name: /Remove filter: Category Electronics/i,
      });
      expect(filterButton).toBeInTheDocument();
    });

    it('should have proper aria-label on clear all button', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics', 'Clothing'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      const clearAllButton = screen.getByRole('button', { name: /Clear all filters/i });
      expect(clearAllButton).toBeInTheDocument();
    });

    it('should have region role with aria-label', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByRole('region', { name: /Active filters/i })).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Electronics'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} className="custom-class" />);

      expect(screen.getByRole('region')).toHaveClass('custom-class');
    });
  });

  describe('Field Name Formatting', () => {
    it('should format category_names as "Category"', () => {
      const filters: Filter[] = [{ field: 'category_names', values: ['Test'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Category:')).toBeInTheDocument();
    });

    it('should format collection_names as "Collection"', () => {
      const filters: Filter[] = [{ field: 'collection_names', values: ['Test'], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Collection:')).toBeInTheDocument();
    });

    it('should format price as "Price"', () => {
      const filters: Filter[] = [{ field: 'price', values: [{ name: 'Test' }], type: 'any' }];

      render(<ActiveFiltersComponent {...defaultProps} filters={filters} />);

      expect(screen.getByText('Price:')).toBeInTheDocument();
    });
  });
});
