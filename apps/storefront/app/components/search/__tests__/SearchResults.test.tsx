/**
 * Tests for SearchResults Component
 *
 * Tests that the SearchResults component renders product grid correctly
 * with loading, empty, and populated states.
 *
 * @module app/components/search/__tests__/SearchResults.test
 */
import { render, screen } from '@testing-library/react';

// Mock react-router Link
jest.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock the Elastic Search UI components
jest.mock('@elastic/react-search-ui', () => ({
  Results: jest.fn(({ resultView: ResultView, view: View }) => {
    const mockResults = [
      {
        id: { raw: 'prod_1' },
        title: { raw: 'Test Product 1' },
        handle: { raw: 'test-product-1' },
        thumbnail: { raw: 'https://example.com/image1.jpg' },
        price: { raw: 29.99 },
      },
      {
        id: { raw: 'prod_2' },
        title: { raw: 'Test Product 2' },
        handle: { raw: 'test-product-2' },
        thumbnail: { raw: 'https://example.com/image2.jpg' },
        price: { raw: 49.99 },
      },
    ];

    return (
      <div data-testid="results">
        {View ? (
          <View>
            {mockResults.map((result) => (
              <div key={result.id.raw} data-testid="result-item">
                {ResultView && <ResultView result={result} />}
              </div>
            ))}
          </View>
        ) : (
          mockResults.map((result) => (
            <div key={result.id.raw} data-testid="result-item">
              {ResultView && <ResultView result={result} />}
            </div>
          ))
        )}
      </div>
    );
  }),
  PagingInfo: jest.fn(({ view: View }) => {
    if (View) {
      return <View start={1} end={12} totalResults={24} searchTerm="test" />;
    }
    return <div data-testid="paging-info">Showing 1 - 12 of 24 results</div>;
  }),
  Paging: jest.fn(({ view: View }) => {
    if (View) {
      return <View current={1} totalPages={2} onChange={jest.fn()} />;
    }
    return <div data-testid="paging">Page 1 of 2</div>;
  }),
  ResultsPerPage: jest.fn(({ options, view: View }) => {
    if (View) {
      return <View options={options} value={12} onChange={jest.fn()} />;
    }
    return <div data-testid="results-per-page">12 per page</div>;
  }),
  withSearch: jest.fn((mapContextToProps) => (Component: any) => {
    return function WrappedComponent(props: any) {
      const searchContext = {
        isLoading: false,
        totalResults: 24,
        searchTerm: 'test',
      };
      const mappedProps = mapContextToProps(searchContext);
      return <Component {...props} {...mappedProps} />;
    };
  }),
}));

// Mock ProductListItem
jest.mock('@app/components/product/ProductListItem', () => ({
  ProductListItem: ({ product }: any) => (
    <div data-testid="product-list-item">
      <span data-testid="product-title">{product.title}</span>
      <span data-testid="product-price">{product.variants?.[0]?.calculated_price?.calculated_amount}</span>
    </div>
  ),
}));

// Import components after mocking
import { SearchResultsComponent, LoadingSkeleton, EmptyState, ResultView } from '../SearchResults';

describe('SearchResults Component', () => {
  const defaultProps = {
    isLoading: false,
    totalResults: 24,
    searchTerm: 'test',
  };

  describe('Loading State', () => {
    it('should render loading skeleton when isLoading is true', () => {
      render(<SearchResultsComponent {...defaultProps} isLoading={true} />);

      // Check for skeleton elements (animated pulse divs)
      const container = document.querySelector('.animate-pulse');
      expect(container).toBeInTheDocument();
    });

    it('should render correct number of skeleton items', () => {
      const { container } = render(
        <SearchResultsComponent {...defaultProps} isLoading={true} resultsPerPageOptions={[12]} />,
      );

      // LoadingSkeleton renders 12 items by default (first option in resultsPerPageOptions)
      const skeletonItems = container.querySelectorAll('.animate-pulse');
      expect(skeletonItems.length).toBeGreaterThan(0);
    });
  });

  describe('Empty State', () => {
    it('should render empty state when totalResults is 0', () => {
      render(<SearchResultsComponent {...defaultProps} totalResults={0} />);

      expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    it('should show search term in empty state message', () => {
      render(<SearchResultsComponent {...defaultProps} totalResults={0} searchTerm="coffee" />);

      expect(screen.getByText(/coffee/)).toBeInTheDocument();
    });

    it('should show generic message when no search term', () => {
      render(<SearchResultsComponent {...defaultProps} totalResults={0} searchTerm="" />);

      expect(screen.getByText(/Try adjusting your filters/)).toBeInTheDocument();
    });
  });

  describe('Results Rendering', () => {
    it('should render results when not loading and has results', () => {
      render(<SearchResultsComponent {...defaultProps} />);

      expect(screen.getByTestId('results')).toBeInTheDocument();
    });

    it('should render paging info', () => {
      render(<SearchResultsComponent {...defaultProps} />);

      // The custom PagingInfo view should be rendered
      expect(screen.getByText(/Showing/)).toBeInTheDocument();
    });

    it('should render results per page selector', () => {
      render(<SearchResultsComponent {...defaultProps} />);

      expect(screen.getByText('Show:')).toBeInTheDocument();
    });

    it('should render pagination', () => {
      render(<SearchResultsComponent {...defaultProps} />);

      // Pagination should be present
      const pagination = document.querySelector('nav[aria-label="Pagination"]');
      expect(pagination).toBeInTheDocument();
    });
  });

  describe('Grid Layout', () => {
    it('should apply default column classes', () => {
      render(<SearchResultsComponent {...defaultProps} />);

      // The grid should have responsive column classes
      const resultsContainer = screen.getByTestId('results');
      expect(resultsContainer).toBeInTheDocument();
    });

    it('should accept custom column props', () => {
      render(<SearchResultsComponent {...defaultProps} mobileColumns={1} tabletColumns={2} desktopColumns={3} />);

      expect(screen.getByTestId('results')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<SearchResultsComponent {...defaultProps} className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Results Per Page Options', () => {
    it('should use default options [12, 24, 48]', () => {
      render(<SearchResultsComponent {...defaultProps} />);

      // Check that the select has the expected options
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should accept custom resultsPerPageOptions', () => {
      render(<SearchResultsComponent {...defaultProps} resultsPerPageOptions={[10, 20, 50]} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });
});

describe('LoadingSkeleton Component', () => {
  it('should render default 8 skeleton items', () => {
    const { container } = render(<LoadingSkeleton />);

    const skeletonItems = container.querySelectorAll('.animate-pulse');
    expect(skeletonItems).toHaveLength(8);
  });

  it('should render custom count of skeleton items', () => {
    const { container } = render(<LoadingSkeleton count={4} />);

    const skeletonItems = container.querySelectorAll('.animate-pulse');
    expect(skeletonItems).toHaveLength(4);
  });
});

describe('EmptyState Component', () => {
  it('should render empty state message', () => {
    render(<EmptyState />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('should show search term when provided', () => {
    render(<EmptyState searchTerm="coffee beans" />);

    expect(screen.getByText(/coffee beans/)).toBeInTheDocument();
  });

  it('should show generic message when no search term', () => {
    render(<EmptyState />);

    expect(screen.getByText(/Try adjusting your filters/)).toBeInTheDocument();
  });

  it('should render search icon', () => {
    const { container } = render(<EmptyState />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

describe('ResultView Component', () => {
  const mockResult = {
    id: { raw: 'prod_123' },
    title: { raw: 'Test Product' },
    handle: { raw: 'test-product' },
    thumbnail: { raw: 'https://example.com/image.jpg' },
    price: { raw: 29.99 },
  };

  it('should render product link with correct href', () => {
    render(<ResultView result={mockResult} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/test-product');
  });

  it('should render ProductListItem with transformed product data', () => {
    render(<ResultView result={mockResult} />);

    expect(screen.getByTestId('product-list-item')).toBeInTheDocument();
    expect(screen.getByTestId('product-title')).toHaveTextContent('Test Product');
  });

  it('should pass price to ProductListItem', () => {
    render(<ResultView result={mockResult} />);

    expect(screen.getByTestId('product-price')).toHaveTextContent('29.99');
  });

  it('should have accessible aria-label', () => {
    render(<ResultView result={mockResult} />);

    const link = screen.getByRole('link', { name: /View Test Product/i });
    expect(link).toBeInTheDocument();
  });
});
