/**
 * Type definitions for product import system
 */

export interface ImportConfig {
  maxProducts: number;
  apiBaseUrl: string;
  sitemapUrl: string;
  concurrency: number;
  region: 'sg' | 'us' | 'au';
  retryAttempts: number;
  retryDelay: number;
  dryRun: boolean;
  verbose: boolean;
  specificSlugs?: string[];
}

export interface Category {
  name: string;
  permalink: string;
  level: number;
  parent?: string;
}

export interface ProductOptionValue {
  value: string;
  presentation: string;
  image?: string;
}

export interface ProductOption {
  title: string;
  values: ProductOptionValue[];
}

export interface Variant {
  title: string;
  sku: string;
  options: Record<string, string>;
  price: number;
  manage_inventory: boolean;
}

export interface TransformedProduct {
  id: string | number;
  title: string;
  description: string;
  handle: string;
  status: 'published' | 'draft';
  thumbnail: string;
  images: string[];
  categories: Category[];
  tags: string[];
  collection: string | null;
  variants: Variant[];
  productOptions: ProductOption[];
  basePrice: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: any | null;
  product: TransformedProduct | null;
}

export interface ValidationReport {
  total: number;
  valid: number;
  invalid: number;
  successRate: number;
  errorsByType: Array<{ error: string; count: number }>;
}
