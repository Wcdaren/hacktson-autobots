import { z } from 'zod';
import type { TransformedProduct, ValidationResult, ValidationReport, Category } from './types';

/**
 * Zod validation schemas for product import data
 */

export const CategorySchema = z.object({
  name: z.string().min(1),
  permalink: z.string(),
  level: z.number().int().min(0).max(3),
  parent: z.string().optional(),
});

export const ProductOptionValueSchema = z.object({
  value: z.string(),
  presentation: z.string().min(1),
  image: z.string().url().optional(),
});

export const ProductOptionSchema = z.object({
  title: z.string().min(1),
  values: z.array(ProductOptionValueSchema).min(1),
});

export const VariantSchema = z.object({
  title: z.string().min(1),
  sku: z.string().min(1),
  options: z.record(z.string()),
  price: z.number().positive(),
  manage_inventory: z.boolean(),
});

export const TransformedProductSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string().min(1),
  description: z.string(),
  handle: z.string().min(1).regex(/^[a-z0-9-]+$/),
  status: z.enum(['published', 'draft']),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()).min(1),
  categories: z.array(CategorySchema),
  tags: z.array(z.string()),
  collection: z.string().nullable(),
  variants: z.array(VariantSchema).min(1),
  productOptions: z.array(ProductOptionSchema).min(1),
  basePrice: z.number().positive(),
});

/**
 * Data validator class
 */
export class DataValidator {
  /**
   * Validate a single product
   */
  validateProduct(product: any): ValidationResult {
    const result = TransformedProductSchema.safeParse(product);
    
    if (!result.success) {
      return {
        valid: false,
        errors: result.error,
        product: null,
      };
    }
    
    return {
      valid: true,
      errors: null,
      product: result.data as TransformedProduct,
    };
  }
  
  /**
   * Validate category hierarchy
   */
  validateCategoryHierarchy(categories: Category[]): boolean {
    const categoryMap = new Map(categories.map(c => [c.name, c]));
    
    for (const category of categories) {
      if (category.parent) {
        const parent = categoryMap.get(category.parent);
        if (!parent) {
          console.warn(`⚠️  Category "${category.name}" references non-existent parent "${category.parent}"`);
          return false;
        }
        if (parent.level >= category.level) {
          console.warn(`⚠️  Category "${category.name}" has invalid level hierarchy`);
          return false;
        }
      }
    }
    
    return true;
  }
  
  /**
   * Generate validation report
   */
  generateValidationReport(results: ValidationResult[]): ValidationReport {
    const valid = results.filter(r => r.valid).length;
    const invalid = results.filter(r => !r.valid).length;
    
    const errorsByType = new Map<string, number>();
    results.forEach(r => {
      if (r.errors) {
        r.errors.errors?.forEach((err: any) => {
          const key = err.path.join('.') + ': ' + err.message;
          errorsByType.set(key, (errorsByType.get(key) || 0) + 1);
        });
      }
    });
    
    return {
      total: results.length,
      valid,
      invalid,
      successRate: (valid / results.length) * 100,
      errorsByType: Array.from(errorsByType.entries()).map(([error, count]) => ({
        error,
        count,
      })),
    };
  }
}
