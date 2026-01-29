/**
 * Search Components
 *
 * Re-exports all search-related components for convenient importing.
 *
 * @module app/components/search
 *
 * @example
 * ```tsx
 * import { SearchBox, SearchFilters, ActiveFilters, MobileFilterDrawer, SearchResults, ImageSearchUpload, ImageDropzone } from "@app/components/search"
 * ```
 */
export * from './SearchBox';
export * from './SearchFilters';
export * from './ActiveFilters';
export * from './MobileFilterDrawer';
export * from './SearchResults';
export * from './ImageSearchUpload';
// Export ImageDropzone component and types, but not validateImageFile to avoid conflict with ImageSearchUpload
export { ImageDropzone, type ImageDropzoneProps } from './ImageDropzone';
export { default as ImageDropzoneDefault } from './ImageDropzone';
// Export IntentChips component and types
export { IntentChips, type IntentChipsProps, type SearchIntent, type SearchConstraints } from './IntentChips';
export { default as IntentChipsDefault } from './IntentChips';
// Export SearchModeToggle component and types
export { SearchModeToggle, type SearchModeToggleProps, type SearchMode } from './SearchModeToggle';
export { default as SearchModeToggleDefault } from './SearchModeToggle';
// Export MultimodalSearchInput component and types
export { MultimodalSearchInput, type MultimodalSearchInputProps } from './MultimodalSearchInput';
export { default as MultimodalSearchInputDefault } from './MultimodalSearchInput';

// Category page specific components
export * from './CategoryFilters';
export * from './CategoryMobileFilterDrawer';
export * from './CategoryActiveFilters';
export * from './CategorySearchResults';

// Collection page specific components
export * from './CollectionFilters';
export * from './CollectionMobileFilterDrawer';
export * from './CollectionActiveFilters';
export * from './CollectionSearchResults';
