/**
 * ImageDropzone Component
 *
 * A drag-and-drop image upload component for multimodal search.
 * Supports file validation (size, format), image preview, and remove functionality.
 *
 * @module app/components/search/ImageDropzone
 */
import { type FC, useState, useRef, useCallback, useEffect } from 'react';

/**
 * Allowed image MIME types
 */
const DEFAULT_ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Default maximum file size in MB
 */
const DEFAULT_MAX_SIZE_MB = 5;

/**
 * Props for the ImageDropzone component
 */
export interface ImageDropzoneProps {
  /** Callback when a valid image is selected */
  onImageSelect: (file: File) => void;
  /** Callback when the image is removed */
  onImageRemove: () => void;
  /** Currently selected image file */
  currentImage?: File | null;
  /** Maximum file size in MB (default: 5) */
  maxSizeMB?: number;
  /** Accepted image MIME types (default: JPEG, PNG, WebP) */
  acceptedFormats?: string[];
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Custom class name for the container */
  className?: string;
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
 * Validates an image file against size and format constraints
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number = DEFAULT_MAX_SIZE_MB,
  acceptedFormats: string[] = DEFAULT_ACCEPTED_FORMATS,
): ValidationResult {
  // Check file type
  if (!acceptedFormats.includes(file.type)) {
    const formatNames = acceptedFormats.map((t) => t.split('/')[1].toUpperCase()).join(', ');
    return {
      valid: false,
      error: `Invalid file type. Accepted formats: ${formatNames}`,
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  return { valid: true };
}

/**
 * ImageDropzone Component
 *
 * Provides a drag-and-drop area for image upload with preview functionality.
 *
 * Features:
 * - Drag and drop support
 * - Click to browse files
 * - File type validation (JPEG, PNG, WebP)
 * - File size validation (configurable, default 5MB)
 * - Image preview with remove button
 * - Loading state indicator
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * import { ImageDropzone } from "@app/components/search/ImageDropzone"
 *
 * function ImageSearch() {
 *   const [image, setImage] = useState<File | null>(null)
 *
 *   return (
 *     <ImageDropzone
 *       onImageSelect={setImage}
 *       onImageRemove={() => setImage(null)}
 *       currentImage={image}
 *     />
 *   )
 * }
 * ```
 */
export const ImageDropzone: FC<ImageDropzoneProps> = ({
  onImageSelect,
  onImageRemove,
  currentImage,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  isLoading = false,
  className = '',
  error,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL when currentImage changes
  useEffect(() => {
    if (currentImage) {
      const url = URL.createObjectURL(currentImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
    return undefined;
  }, [currentImage]);

  const handleFile = useCallback(
    (file: File) => {
      setValidationError(undefined);

      const validation = validateImageFile(file, maxSizeMB, acceptedFormats);
      if (!validation.valid) {
        setValidationError(validation.error);
        return;
      }

      onImageSelect(file);
    },
    [maxSizeMB, acceptedFormats, onImageSelect],
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the dropzone entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragging(false);
    }
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
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFile],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValidationError(undefined);
    onImageRemove();
  };

  const handleRemoveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setValidationError(undefined);
      onImageRemove();
    }
  };

  const displayError = error || validationError;
  const formatNames = acceptedFormats.map((t) => t.split('/')[1].toUpperCase()).join(', ');

  // Show preview if image is selected
  if (currentImage && previewUrl) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={previewUrl}
            alt="Selected image preview"
            className={`w-full h-48 object-contain ${isLoading ? 'opacity-50' : ''}`}
          />

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                <span className="text-white text-sm font-medium">Processing...</span>
              </div>
            </div>
          )}

          {/* Remove button */}
          {!isLoading && (
            <button
              type="button"
              onClick={handleRemove}
              onKeyDown={handleRemoveKeyDown}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label="Remove image"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* File info */}
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span className="truncate max-w-[200px]" title={currentImage.name}>
            {currentImage.name}
          </span>
          <span>{(currentImage.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>

        {displayError && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {displayError}
          </p>
        )}
      </div>
    );
  }

  // Show upload dropzone
  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${displayError ? 'border-red-300 bg-red-50' : ''}
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        `}
        aria-label="Upload image for search. Drop an image here or click to browse."
        aria-describedby="dropzone-description"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />

        {/* Upload icon */}
        <div className={`mx-auto h-12 w-12 ${isDragging ? 'text-primary' : 'text-gray-400'}`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Instructions */}
        <div id="dropzone-description" className="mt-4 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            {formatNames} (max {maxSizeMB}MB)
          </p>
        </div>

        {/* Drag indicator */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-lg pointer-events-none">
            <p className="text-primary font-medium">Drop image here</p>
          </div>
        )}
      </div>

      {displayError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default ImageDropzone;
