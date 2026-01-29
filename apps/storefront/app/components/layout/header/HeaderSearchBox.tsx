/**
 * HeaderSearchBox Component
 *
 * A compact search box designed for the header/navbar.
 * Provides quick search access and navigates to the full search page.
 *
 * @module app/components/layout/header/HeaderSearchBox
 */
import { type FC, useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface HeaderSearchBoxProps {
  /** Additional CSS classes */
  className?: string;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * HeaderSearchBox Component
 *
 * A compact search input for the header that:
 * - Shows a search icon button on mobile (navigates directly to search page)
 * - Shows an always-visible search input on desktop
 * - Navigates to /search page with query on submit
 * - Preserves search term from URL when on search page
 */
export const HeaderSearchBox: FC<HeaderSearchBoxProps> = ({ className, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync search term from URL when on search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const q = params.get('q') || '';
      setSearchTerm(q);
    }
  }, [location.pathname, location.search]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedTerm = searchTerm.trim();
      if (trimmedTerm) {
        navigate(`/search?q=${encodeURIComponent(trimmedTerm)}`);
      } else {
        navigate('/search');
      }
      // Blur input after submit
      inputRef.current?.blur();
    },
    [searchTerm, navigate],
  );

  const handleClear = useCallback(() => {
    setSearchTerm('');
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
      inputRef.current?.blur();
    }
  }, []);

  return (
    <div ref={containerRef} className={clsx('relative flex items-center', className)}>
      {/* Mobile: Icon button that navigates to search page */}
      <button
        type="button"
        onClick={() => navigate('/search')}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors md:hidden"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {/* Desktop: Always visible search input */}
      <form onSubmit={handleSubmit} className="hidden md:block">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={clsx(
              'w-48 lg:w-56 pl-9 pr-8 py-2 text-sm bg-gray-50 border rounded-full',
              'placeholder-gray-400 text-gray-900',
              'transition-all duration-200',
              isFocused
                ? 'border-gray-400 ring-1 ring-gray-400 bg-white w-64 lg:w-72'
                : 'border-gray-200 hover:border-gray-300',
            )}
            aria-label="Search products"
          />

          {/* Search Icon */}
          <button
            type="submit"
            className="absolute left-0 inset-y-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
            aria-label="Submit search"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>

          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-0 inset-y-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HeaderSearchBox;
