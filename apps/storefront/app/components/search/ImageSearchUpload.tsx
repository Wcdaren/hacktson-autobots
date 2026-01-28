/**
 * ImageSearchUpload Component
 *
 * A component for uploading images to search for visually similar products.
 * Supports drag-and-drop, file selection, and displays preview with loading state.
 *
 * @module app/components/search/ImageSearchUpload
 */
import { type FC, useState, useRef, useCallback } from 'react';

/**
 * Allowed image MIME types
 */
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Maximum file size in bytes (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Props for the ImageSearchUpload component
 */
export interface ImageSearchUploadProps {
  /** Callback when a valid image is selected */
  onImageSelect: (file: File) => void;
  /** Callback to clear the current image */
  onClear: () => void;
  /** Whether the search is in progress */
  isLoading?: boolean;
  /** Preview URL of the selected image */
  previewUrl?: string;
  /** Maximum file size in MB (default: 5) */
  maxSizeMB?: number;
  /** Accepted image formats */
  acceptedFormats?: string[];
  /** Error message to display */
  error?: string;
}

/**
 * Validation result type
 */
interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an image file
 */
export function validateImageFile(
  file: File,
  maxSizeBytes: number = MAX_FILE_SIZE,
  allowedTypes: string[] = ALLOWED_MIME_TYPES,
): ValidationResult {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.map((t) => t.split('/')[1]).join(', ')}`,
    };
  }

  // Check file size
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeBytes / 1024 / 1024}MB limit`,
    };
  }

  return { valid: true };
}

/**
 * ImageSearchUpload Component
 *
 * Provides a drag-and-drop area and file picker for image search.
 * Features:
 * - Drag and drop support
 * - File type validation (JPG, PNG, WebP)
 * - File size validation (max 5MB)
 * - Image preview
 * - Loading state indicator
 * - Clear button to reset
 *
 * @example
 * ```tsx
 * import { ImageSearchUpload } from "@app/components/search"
 *
 * function ImageSearch() {
 *   const [previewUrl, setPreviewUrl] = useState<string>()
 *   const [isLoading, setIsLoading] = useState(false)
 *
 *   const handleImageSelect = async (file: File) => {
 *     setPreviewUrl(URL.createObjectURL(file))
 *     setIsLoading(true)
 *     // Perform image search...
 *   }
 *
 *   return (
 *     <ImageSearchUpload
 *       onImageSelect={handleImageSelect}
 *       onClear={() => setPreviewUrl(undefined)}
 *       previewUrl={previewUrl}
 *       isLoading={isLoading}
 *     />
 *   )
 * }
 * ```
 */
export const ImageSearchUpload: FC<ImageSearchUploadProps> = ({
  onImageSelect,
  onClear,
  isLoading = false,
  previewUrl,
  maxSizeMB = 5,
  acceptedFormats = ALLOWED_MIME_TYPES,
  error,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFile = useCallback(
    (file: File) => {
      setValidationError(undefined);

      const validation = validateImageFile(file, maxSizeBytes, acceptedFormats);
      if (!validation.valid) {
        setValidationError(validation.error);
        return;
      }

      onImageSelect(file);
    },
    [maxSizeBytes, acceptedFormats, onImageSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFile],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setValidationError(undefined);
    onClear();
  };

  const displayError = error || validationError;

  // Show preview if image is selected
  if (previewUrl) {
    return (
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img
            src={previewUrl}
            alt="Search image preview"
            className={`w-full h-48 object-cover ${isLoading ? 'opacity-50' : ''}`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          )}
          {!isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Clear image"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {isLoading && <p className="mt-2 text-sm text-gray-500 text-center">Searching for similar products...</p>}
      </div>
    );
  }

  // Show upload area
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          ${displayError ? 'border-red-300' : ''}
        `}
        aria-label="Upload image for search"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-xs text-gray-500">JPG, PNG, or WebP (max {maxSizeMB}MB)</p>
      </div>
      {displayError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default ImageSearchUpload;
