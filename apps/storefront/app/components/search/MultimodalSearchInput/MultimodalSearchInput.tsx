/**
 * MultimodalSearchInput Component
 *
 * Combined search input supporting both text and image inputs.
 * Provides a unified interface for multimodal search.
 *
 * @module app/components/search/MultimodalSearchInput
 */
import { type FC, useState, useRef, useEffect } from 'react';

/**
 * Props for the MultimodalSearchInput component
 */
export interface MultimodalSearchInputProps {
  /** Callback when search is submitted */
  onSearch: (query: string, image?: File) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether to show the image upload button */
  showImageUpload?: boolean;
  /** Initial query value */
  initialQuery?: string;
  /** Initial image file */
  initialImage?: File | null;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Custom class name for the container */
  className?: string;
}

/**
 * MultimodalSearchInput Component
 *
 * Provides a combined text and image search input.
 *
 * Features:
 * - Text input with autocomplete
 * - Image upload trigger button
 * - Image preview with remove button
 * - Combined submit (text + image)
 * - Mobile-responsive design
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * import { MultimodalSearchInput } from "@app/components/search/MultimodalSearchInput"
 *
 * function SearchPage() {
 *   const handleSearch = (query: string, image?: File) => {
 *     // Perform search with query and/or image
 *   }
 *
 *   return (
 *     <MultimodalSearchInput
 *       onSearch={handleSearch}
 *       placeholder="Search for products..."
 *       showImageUpload={true}
 *     />
 *   )
 * }
 * ```
 */
export const MultimodalSearchInput: FC<MultimodalSearchInputProps> = ({
  onSearch,
  placeholder = 'Search for products...',
  showImageUpload = true,
  initialQuery = '',
  initialImage = null,
  isLoading = false,
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [image, setImage] = useState<File | null>(initialImage);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL when image changes
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreview(null);
    return undefined;
  }, [image]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || image) {
      onSearch(query.trim(), image || undefined);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setQuery('');
    setImage(null);
    setImagePreview(null);
    textInputRef.current?.focus();
  };

  const hasContent = query.trim() || image;

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={textInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className={`
              w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none
              transition-shadow disabled:opacity-50 disabled:cursor-not-allowed
              ${image ? 'rounded-b-none border-b-0' : ''}
            `}
            aria-label="Search query"
          />

          {/* Search Icon */}
          <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

          {/* Right side buttons */}
          <div className="absolute right-2 inset-y-0 flex items-center gap-1">
            {/* Clear button */}
            {hasContent && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Image upload button */}
            {showImageUpload && (
              <button
                type="button"
                onClick={handleImageUploadClick}
                disabled={isLoading}
                className={`
                  p-2 transition-colors rounded-full
                  ${image ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                aria-label="Upload image for search"
                title="Upload image"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            )}

            {/* Search button */}
            <button
              type="submit"
              disabled={isLoading || !hasContent}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${
                  isLoading || !hasContent
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }
              `}
              aria-label="Submit search"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Searching...</span>
                </span>
              ) : (
                'Search'
              )}
            </button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageSelect}
            className="hidden"
            aria-hidden="true"
          />
        </div>

        {/* Image preview */}
        {image && imagePreview && (
          <div className="relative border border-t-0 border-gray-300 rounded-b-xl p-3 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200">
                <img src={imagePreview} alt="Selected image preview" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
                <p className="text-xs text-gray-500">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={handleImageRemove}
                disabled={isLoading}
                className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Remove image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultimodalSearchInput;
