/**
 * SearchModeToggle Component
 *
 * Toggle between different search modes: text, image, and mixed.
 * Provides a visual indicator of the current search mode.
 *
 * @module app/components/search/SearchModeToggle
 */
import { type FC } from 'react';

/**
 * Search mode types
 */
export type SearchMode = 'text' | 'image' | 'mixed';

/**
 * Props for the SearchModeToggle component
 */
export interface SearchModeToggleProps {
  /** Current search mode */
  mode: SearchMode;
  /** Callback when mode changes */
  onModeChange: (mode: SearchMode) => void;
  /** Custom class name for the container */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * SearchModeToggle Component
 *
 * Provides a toggle interface for switching between search modes.
 *
 * Features:
 * - Three modes: text-only, image-only, mixed
 * - Visual indicators for each mode
 * - Keyboard accessible
 * - Responsive design
 *
 * @example
 * ```tsx
 * import { SearchModeToggle } from "@app/components/search/SearchModeToggle"
 *
 * function SearchPage() {
 *   const [mode, setMode] = useState<SearchMode>('text')
 *
 *   return (
 *     <SearchModeToggle
 *       mode={mode}
 *       onModeChange={setMode}
 *     />
 *   )
 * }
 * ```
 */
export const SearchModeToggle: FC<SearchModeToggleProps> = ({
  mode,
  onModeChange,
  className = '',
  disabled = false,
}) => {
  const modes: Array<{ value: SearchMode; label: string; icon: React.ReactNode }> = [
    {
      value: 'text',
      label: 'Text',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      value: 'image',
      label: 'Image',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      value: 'mixed',
      label: 'Mixed',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`inline-flex rounded-lg border border-gray-300 bg-white p-1 ${className}`}
      role="group"
      aria-label="Search mode"
    >
      {modes.map((modeOption) => {
        const isActive = mode === modeOption.value;
        return (
          <button
            key={modeOption.value}
            type="button"
            onClick={() => onModeChange(modeOption.value)}
            disabled={disabled}
            className={`
              inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isActive ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
            `}
            aria-pressed={isActive}
            aria-label={`${modeOption.label} search mode`}
          >
            {modeOption.icon}
            <span className="hidden sm:inline">{modeOption.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SearchModeToggle;
