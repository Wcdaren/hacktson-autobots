/**
 * SearchBox Component
 *
 * A search input component that integrates with Elastic Search UI.
 * Provides search-as-you-type functionality with debouncing for optimal UX.
 * Supports image search via camera icon button.
 *
 * @module app/components/search/SearchBox
 */
import { SearchBox as ElasticSearchBox } from '@elastic/react-search-ui';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useSearchReady } from '@app/providers/search-provider';

/**
 * Props for the SearchBox component
 */
export interface SearchBoxProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Debounce delay in milliseconds (default: 300ms) */
  debounceLength?: number;
  /** Whether to enable search-as-you-type (default: true) */
  searchAsYouType?: boolean;
  /** Whether to enable image search (default: false) */
  enableImageSearch?: boolean;
  /** Callback when image is selected for search */
  onImageSearch?: (file: File) => void;
}

/**
 * Custom input view component for the SearchBox
 * Provides a styled input with search icon
 */
interface InputViewProps {
  getAutocomplete: () => React.JSX.Element;
  getButtonProps: (additionalProps?: Record<string, unknown>) => Record<string, unknown>;
  getInputProps: (additionalProps?: Record<string, unknown>) => Record<string, unknown>;
}

/**
 * Placeholder search input for SSR
 */
const SearchBoxPlaceholder: FC<{ placeholder: string; className?: string }> = ({ placeholder, className }) => (
  <div className={className}>
    <div className="relative">
      <input
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-shadow duration-200 text-sm"
        aria-label="Search products"
        disabled
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  </div>
);

/**
 * SearchBox Component
 *
 * A styled search input that integrates with Elastic Search UI's SearchProvider.
 * Features:
 * - Search-as-you-type with configurable debouncing
 * - Tailwind CSS styling matching the storefront design
 * - Accessible input with proper focus states
 * - Responsive design
 * - SSR-safe: Renders placeholder during server-side rendering
 *
 * @example
 * ```tsx
 * import { SearchBox } from "@app/components/search"
 *
 * function ProductSearch() {
 *   return (
 *     <SearchProvider>
 *       <SearchBox placeholder="Search products..." />
 *     </SearchProvider>
 *   )
 * }
 * ```
 */
export const SearchBox: FC<SearchBoxProps> = ({
  placeholder = 'Search products...',
  className,
  debounceLength = 300,
  searchAsYouType = true,
  enableImageSearch = false,
  onImageSearch,
}) => {
  const isSearchReady = useSearchReady();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageSearch) {
      onImageSearch(file);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Render placeholder during SSR
  if (!isSearchReady) {
    return <SearchBoxPlaceholder placeholder={placeholder} className={className} />;
  }

  return (
    <div className={className}>
      <ElasticSearchBox
        searchAsYouType={searchAsYouType}
        debounceLength={debounceLength}
        inputProps={{
          placeholder,
          'aria-label': 'Search products',
        }}
        inputView={({ getAutocomplete, getInputProps }: InputViewProps) => (
          <div className="relative">
            <div className="relative">
              <input
                {...getInputProps({
                  placeholder,
                  className: `w-full px-4 py-2 pl-10 ${enableImageSearch ? 'pr-10' : ''} border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-shadow duration-200 text-sm`,
                  'aria-label': 'Search products',
                })}
              />
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {/* Camera Icon for Image Search */}
              {enableImageSearch && (
                <>
                  <button
                    type="button"
                    onClick={handleCameraClick}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Search by image"
                    title="Search by image"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
            {getAutocomplete()}
          </div>
        )}
      />
    </div>
  );
};
