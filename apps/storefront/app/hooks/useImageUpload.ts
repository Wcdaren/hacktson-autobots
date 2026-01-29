/**
 * useImageUpload Hook
 *
 * Manages image upload state, validation, and base64 encoding for multimodal search.
 *
 * @module app/hooks/useImageUpload
 */
import { useState, useCallback, useEffect } from 'react';

/**
 * Allowed image MIME types
 */
const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Default maximum file size in MB
 */
const DEFAULT_MAX_SIZE_MB = 5;

/**
 * Options for the useImageUpload hook
 */
export interface UseImageUploadOptions {
  /** Maximum file size in MB (default: 5) */
  maxSizeMB?: number;
  /** Accepted image MIME types */
  acceptedFormats?: string[];
  /** Callback when image is selected */
  onImageSelect?: (file: File) => void;
  /** Callback when image is removed */
  onImageRemove?: () => void;
}

/**
 * Return type for the useImageUpload hook
 */
export interface UseImageUploadReturn {
  /** Currently selected image file */
  image: File | null;
  /** Preview URL for the selected image */
  preview: string | null;
  /** Whether the image is being processed */
  isProcessing: boolean;
  /** Error message if validation fails */
  error: string | null;
  /** Select an image file */
  selectImage: (file: File) => Promise<void>;
  /** Remove the selected image */
  removeImage: () => void;
  /** Get base64 encoded image data */
  getBase64: () => Promise<string | null>;
  /** Whether the image format is valid */
  isValidFormat: boolean;
  /** Whether the image size is valid */
  isValidSize: boolean;
}

/**
 * Validates an image file
 */
function validateImage(file: File, maxSizeMB: number, acceptedFormats: string[]): { valid: boolean; error?: string } {
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
 * Converts a File to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * useImageUpload Hook
 *
 * Manages image upload state for multimodal search.
 *
 * Features:
 * - File selection and validation
 * - Image preview generation
 * - Base64 encoding for API submission
 * - Error handling
 *
 * @example
 * ```tsx
 * import { useImageUpload } from "@app/hooks/useImageUpload"
 *
 * function ImageSearch() {
 *   const {
 *     image,
 *     preview,
 *     error,
 *     selectImage,
 *     removeImage,
 *     getBase64
 *   } = useImageUpload()
 *
 *   const handleSearch = async () => {
 *     const base64 = await getBase64()
 *     // Send to API
 *   }
 *
 *   return (
 *     <div>
 *       <input type="file" onChange={(e) => selectImage(e.target.files[0])} />
 *       {preview && <img src={preview} alt="Preview" />}
 *       {error && <p>{error}</p>}
 *     </div>
 *   )
 * }
 * ```
 */
export function useImageUpload(options: UseImageUploadOptions = {}): UseImageUploadReturn {
  const { maxSizeMB = DEFAULT_MAX_SIZE_MB, acceptedFormats = ACCEPTED_FORMATS, onImageSelect, onImageRemove } = options;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [isValidSize, setIsValidSize] = useState(true);

  // Generate preview URL when image changes
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
    return undefined;
  }, [image]);

  /**
   * Select an image file
   */
  const selectImage = useCallback(
    async (file: File) => {
      setError(null);
      setIsProcessing(true);

      try {
        // Validate the file
        const validation = validateImage(file, maxSizeMB, acceptedFormats);
        setIsValidFormat(acceptedFormats.includes(file.type));
        setIsValidSize(file.size <= maxSizeMB * 1024 * 1024);

        if (!validation.valid) {
          setError(validation.error || 'Invalid file');
          setIsProcessing(false);
          return;
        }

        setImage(file);
        onImageSelect?.(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process image');
      } finally {
        setIsProcessing(false);
      }
    },
    [maxSizeMB, acceptedFormats, onImageSelect],
  );

  /**
   * Remove the selected image
   */
  const removeImage = useCallback(() => {
    setImage(null);
    setPreview(null);
    setError(null);
    setIsValidFormat(true);
    setIsValidSize(true);
    onImageRemove?.();
  }, [onImageRemove]);

  /**
   * Get base64 encoded image data
   */
  const getBase64 = useCallback(async (): Promise<string | null> => {
    if (!image) {
      return null;
    }

    try {
      setIsProcessing(true);
      const base64 = await fileToBase64(image);
      return base64;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to encode image');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [image]);

  return {
    image,
    preview,
    isProcessing,
    error,
    selectImage,
    removeImage,
    getBase64,
    isValidFormat,
    isValidSize,
  };
}
