/**
 * Tests for SearchFilters Component
 *
 * Tests that the SearchFilters component renders correctly with
 * category, collection, and price facets.
 *
 * @module app/components/search/__tests__/SearchFilters.test
 */
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the Elastic Search UI components
jest.mock('@elastic/react-search-ui', () => ({
  Facet: jest.fn(({ field, label, view: View }) => (
    <div data-testid={`facet-${field}`}>
      <span data-testid={`facet-label-${field}`}>{label}</span>
      {View && (
        <View
          label={label}
          options={[
            { value: 'option1', count: 5, selected: false },
            { value: 'option2', count: 3, selected: true },
          ]}
          onSelect={jest.fn()}
          onRemove={jest.fn()}
        />
      )}
    </div>
  )),
  Sorting: jest.fn(({ label, view: View, sortOptions }) => (
    <div data-testid="sorting">
      <span data-testid="sorting-label">{label}</span>
      {View && (
        <View
          label={label}
          options={sortOptions.map((opt: any) => ({
            label: opt.name,
            value: `${opt.value}|||${opt.direction}`,
          }))}
          value=""
          onChange={jest.fn()}
        />
      )}
    </div>
  )),
}));

// Import after mocking
import { SearchFilters, SORT_OPTIONS } from '../SearchFilters';

describe('SearchFilters Component', () => {
  describe('Rendering', () => {
    it('should render all filter sections by default', () => {
      render(<SearchFilters />);

      // Check sorting is rendered
      expect(screen.getByTestId('sorting')).toBeInTheDocument();

      // Check all facets are rendered
      expect(screen.getByTestId('facet-category_names')).toBeInTheDocument();
      expect(screen.getByTestId('facet-collection_names')).toBeInTheDocument();
      expect(screen.getByTestId('facet-price')).toBeInTheDocument();
    });

    it('should render category facet with correct label', () => {
      render(<SearchFilters />);

      expect(screen.getByTestId('facet-label-category_names')).toHaveTextContent('Categories');
    });

    it('should render collection facet with correct label', () => {
      render(<SearchFilters />);

      expect(screen.getByTestId('facet-label-collection_names')).toHaveTextContent('Collections');
    });

    it('should render price range facet with correct label', () => {
      render(<SearchFilters />);

      expect(screen.getByTestId('facet-label-price')).toHaveTextContent('Price Range');
    });

    it('should render sorting with correct label', () => {
      render(<SearchFilters />);

      expect(screen.getByTestId('sorting-label')).toHaveTextContent('Sort by');
    });
  });

  describe('Conditional Rendering', () => {
    it('should hide sort selector when showSort is false', () => {
      render(<SearchFilters showSort={false} />);

      expect(screen.queryByTestId('sorting')).not.toBeInTheDocument();
    });

    it('should hide category facet when showCategories is false', () => {
      render(<SearchFilters showCategories={false} />);

      expect(screen.queryByTestId('facet-category_names')).not.toBeInTheDocument();
    });

    it('should hide collection facet when showCollections is false', () => {
      render(<SearchFilters showCollections={false} />);

      expect(screen.queryByTestId('facet-collection_names')).not.toBeInTheDocument();
    });

    it('should hide price range facet when showPriceRange is false', () => {
      render(<SearchFilters showPriceRange={false} />);

      expect(screen.queryByTestId('facet-price')).not.toBeInTheDocument();
    });

    it('should render only specified facets', () => {
      render(<SearchFilters showSort={false} showCategories={true} showCollections={false} showPriceRange={false} />);

      expect(screen.queryByTestId('sorting')).not.toBeInTheDocument();
      expect(screen.getByTestId('facet-category_names')).toBeInTheDocument();
      expect(screen.queryByTestId('facet-collection_names')).not.toBeInTheDocument();
      expect(screen.queryByTestId('facet-price')).not.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<SearchFilters className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should have default spacing class', () => {
      const { container } = render(<SearchFilters />);

      expect(container.firstChild).toHaveClass('space-y-6');
    });
  });

  describe('Sort Options', () => {
    it('should export correct sort options', () => {
      expect(SORT_OPTIONS).toEqual([
        { name: 'Relevance', value: '', direction: '' },
        { name: 'Newest', value: 'created_at', direction: 'desc' },
        { name: 'Price: Low to High', value: 'price', direction: 'asc' },
        { name: 'Price: High to Low', value: 'price', direction: 'desc' },
        { name: 'Name: A-Z', value: 'title.keyword', direction: 'asc' },
        { name: 'Name: Z-A', value: 'title.keyword', direction: 'desc' },
      ]);
    });

    it('should have 6 sort options', () => {
      expect(SORT_OPTIONS).toHaveLength(6);
    });
  });
});
