/**
 * Tests for SearchBox Component
 *
 * Tests that the SearchBox component renders correctly with
 * proper styling and configuration.
 *
 * @module app/components/search/__tests__/SearchBox.test
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the Elastic Search UI SearchBox
const mockGetInputProps = jest.fn((additionalProps = {}) => ({
  ...additionalProps,
  onChange: jest.fn(),
  value: '',
}));

const mockGetAutocomplete = jest.fn(() => <div data-testid="autocomplete" />);

jest.mock('@elastic/react-search-ui', () => ({
  SearchBox: jest.fn(({ inputView: InputView, inputProps, searchAsYouType, debounceLength }) => (
    <div data-testid="elastic-search-box" data-search-as-you-type={searchAsYouType} data-debounce={debounceLength}>
      {InputView ? (
        <InputView getInputProps={mockGetInputProps} getAutocomplete={mockGetAutocomplete} getButtonProps={jest.fn()} />
      ) : (
        <input {...inputProps} data-testid="default-input" />
      )}
    </div>
  )),
}));

// Import after mocking
import { SearchBox } from '../SearchBox';

describe('SearchBox Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the search box', () => {
      render(<SearchBox />);

      expect(screen.getByTestId('elastic-search-box')).toBeInTheDocument();
    });

    it('should render custom input view', () => {
      render(<SearchBox />);

      // The custom input view should be rendered
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const { container } = render(<SearchBox />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render autocomplete container', () => {
      render(<SearchBox />);

      expect(screen.getByTestId('autocomplete')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should use default placeholder', () => {
      render(<SearchBox />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Search products...');
    });

    it('should use custom placeholder', () => {
      render(<SearchBox placeholder="Find products..." />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Find products...');
    });

    it('should apply custom className', () => {
      const { container } = render(<SearchBox className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should use default debounceLength of 300ms', () => {
      render(<SearchBox />);

      const searchBox = screen.getByTestId('elastic-search-box');
      expect(searchBox).toHaveAttribute('data-debounce', '300');
    });

    it('should use custom debounceLength', () => {
      render(<SearchBox debounceLength={500} />);

      const searchBox = screen.getByTestId('elastic-search-box');
      expect(searchBox).toHaveAttribute('data-debounce', '500');
    });

    it('should enable searchAsYouType by default', () => {
      render(<SearchBox />);

      const searchBox = screen.getByTestId('elastic-search-box');
      expect(searchBox).toHaveAttribute('data-search-as-you-type', 'true');
    });

    it('should allow disabling searchAsYouType', () => {
      render(<SearchBox searchAsYouType={false} />);

      const searchBox = screen.getByTestId('elastic-search-box');
      expect(searchBox).toHaveAttribute('data-search-as-you-type', 'false');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on input', () => {
      render(<SearchBox />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search products');
    });

    it('should have aria-hidden on search icon', () => {
      const { container } = render(<SearchBox />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Styling', () => {
    it('should have proper input styling classes', () => {
      render(<SearchBox />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('w-full');
      expect(input).toHaveClass('px-4');
      expect(input).toHaveClass('py-2');
      expect(input).toHaveClass('border');
      expect(input).toHaveClass('rounded-lg');
    });

    it('should have focus ring classes', () => {
      render(<SearchBox />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:ring-2');
      expect(input).toHaveClass('focus:ring-primary');
    });

    it('should have left padding for search icon', () => {
      render(<SearchBox />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-10');
    });
  });

  describe('Input Props', () => {
    it('should call getInputProps with correct arguments', () => {
      render(<SearchBox placeholder="Custom placeholder" />);

      expect(mockGetInputProps).toHaveBeenCalledWith(
        expect.objectContaining({
          placeholder: 'Custom placeholder',
          'aria-label': 'Search products',
        }),
      );
    });
  });
});
