/**
 * HeaderSearchBox Component
 *
 * A compact search box designed for the header/navbar.
 * Provides quick search access and navigates to the full search page.
 *
 * @module app/components/layout/header/HeaderSearchBox
 */
import { type FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
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
 * - Shows a search icon button on mobile
 * - Expands to full input on desktop
 * - Navigates to /search page with query on submit
 */
export const HeaderSearchBox: FC<HeaderSearchBoxProps> = ({ className, placeholder = 'Search products...' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsExpanded(false);
    } else {
      navigate('/search');
    }
  };

  const handleIconClick = () => {
    if (isExpanded && searchTerm.trim()) {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    } else {
      setIsExpanded(true);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsExpanded(false);
  };

  const handleBlur = () => {
    // Delay to allow click events to fire
    setTimeout(() => {
      if (!searchTerm.trim()) {
        setIsExpanded(false);
      }
    }, 200);
  };

  return (
    <div className={clsx('relative flex items-center', className)}>
      {/* Mobile: Icon button only */}
      <button
        type="button"
        onClick={() => navigate('/search')}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors md:hidden"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {/* Desktop: Expandable search input */}
      <div className="hidden md:flex items-center">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div
            className={clsx(
              'flex items-center transition-all duration-200 ease-in-out overflow-hidden',
              isExpanded ? 'w-64' : 'w-10',
            )}
          >
            <button
              type="button"
              onClick={handleIconClick}
              className="absolute left-0 p-2 text-gray-500 hover:text-gray-700 z-10"
              aria-label={isExpanded ? 'Submit search' : 'Open search'}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={clsx(
                'w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-full',
                'focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400',
                'transition-all duration-200',
                isExpanded ? 'opacity-100' : 'opacity-0',
              )}
              aria-label="Search products"
            />

            {isExpanded && searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 p-1 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeaderSearchBox;
