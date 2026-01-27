# Product Import Refinement - Design Document

## Architecture Overview

The product import system is a **one-time data generation tool** that creates a static seed file to be committed to the repository.

### Workflow Philosophy

**Import Script (Manual, Occasional):**
```
yarn import:products → Fetch from API → Transform → Validate → Generate products-from-api.ts
```

**Seed Process (Automatic, Frequent):**
```
yarn setup → Read products-from-api.ts (static file) → Seed to database
```

### Key Principles

1. **Static Data File**: `products-from-api.ts` is a committed file, not generated on-the-fly
2. **Decoupled Import**: Import script runs independently, not part of seed process
3. **Version Control**: Product data changes are tracked in git
4. **Reproducible Seeds**: Same seed file produces same database state
5. **Manual Updates**: Product data updated only when explicitly needed

### Pipeline Architecture

```
Sitemap Fetch → Product Slugs → API Batch Fetch → Transform → Validate → Generate Static File
                                                                              ↓
                                                                    products-from-api.ts
                                                                    (committed to git)
                                                                              ↓
                                                                    yarn setup (seed.ts)
```

### Core Components

1. **Configuration Manager** - Handles environment variables and CLI options
2. **Sitemap Fetcher** - Retrieves product URLs from sitemap.xml
3. **API Client** - Fetches product data from Castlery API with retry logic
4. **Data Transformer** - Converts API response to Medusa format
5. **Data Validator** - Validates transformed data using Zod schemas
6. **Seed Generator** - Generates TypeScript seed file
7. **Logger** - Provides colored console output and file logging

## File Structure

```
apps/medusa/src/scripts/
├── import-from-api.ts                    # Main entry point (renamed)
├── import/                               # New directory for import logic
│   ├── config.ts                         # Configuration management
│   ├── sitemap-fetcher.ts               # Sitemap parsing
│   ├── api-client.ts                    # API requests with retry
│   ├── transformer.ts                   # Data transformation
│   ├── validator.ts                     # Zod schemas and validation
│   ├── seed-generator.ts                # TypeScript file generation
│   ├── logger.ts                        # Logging utilities
│   └── types.ts                         # TypeScript interfaces
└── seed/
    ├── products-from-api.ts             # Generated seed file (renamed)
    └── products.ts                      # Manual seed data (unchanged)
```

## Detailed Component Design

### 1. Configuration Manager

**File:** `src/scripts/import/config.ts`

```typescript
import { z } from 'zod'

const ConfigSchema = z.object({
  maxProducts: z.number().positive().default(40),
  apiBaseUrl: z.string().url(),
  sitemapUrl: z.string().url(),
  concurrency: z.number().min(1).max(10).default(5),
  region: z.enum(['sg', 'us', 'au']).default('sg'),
  retryAttempts: z.number().min(0).max(5).default(3),
  retryDelay: z.number().positive().default(1000),
  dryRun: z.boolean().default(false),
  verbose: z.boolean().default(false),
  specificSlugs: z.array(z.string()).optional(),
})

export type ImportConfig = z.infer<typeof ConfigSchema>

export function loadConfig(): ImportConfig {
  return ConfigSchema.parse({
    maxProducts: parseInt(process.env.MAX_PRODUCTS || '40'),
    apiBaseUrl: process.env.API_BASE_URL || 'https://apigw-sg-prod.castlery.com/v2/products',
    sitemapUrl: process.env.SITEMAP_URL || 'https://www.castlery.com/sg/sitemap.xml',
    concurrency: parseInt(process.env.CONCURRENCY || '5'),
    region: process.env.REGION || 'sg',
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(process.env.RETRY_DELAY || '1000'),
    dryRun: process.argv.includes('--dry-run'),
    verbose: process.argv.includes('--verbose'),
    specificSlugs: process.env.SPECIFIC_SLUGS?.split(','),
  })
}
```

### 2. Logger

**File:** `src/scripts/import/logger.ts`

```typescript
import chalk from 'chalk'
import { writeFileSync, appendFileSync } from 'fs'
import { join } from 'path'

export class Logger {
  private logFile: string
  private verbose: boolean
  
  constructor(verbose: boolean = false) {
    this.verbose = verbose
    this.logFile = join(__dirname, '..', 'logs', `import-${Date.now()}.log`)
  }
  
  success(message: string) {
    console.log(chalk.green('✓'), message)
    this.writeToFile(`[SUCCESS] ${message}`)
  }
  
  warning(message: string) {
    console.log(chalk.yellow('⚠'), message)
    this.writeToFile(`[WARNING] ${message}`)
  }
  
  error(message: string, error?: Error) {
    console.log(chalk.red('✗'), message)
    this.writeToFile(`[ERROR] ${message}`)
    if (error && this.verbose) {
      console.error(chalk.red(error.stack))
      this.writeToFile(error.stack || '')
    }
  }
  
  info(message: string) {
    console.log(chalk.blue('ℹ'), message)
    this.writeToFile(`[INFO] ${message}`)
  }
  
  debug(message: string, data?: any) {
    if (this.verbose) {
      console.log(chalk.gray('→'), message)
      if (data) {
        console.log(chalk.gray(JSON.stringify(data, null, 2)))
      }
    }
    this.writeToFile(`[DEBUG] ${message}`)
  }
  
  progress(current: number, total: number, message: string) {
    const percentage = Math.round((current / total) * 100)
    const bar = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2))
    process.stdout.write(`\r${chalk.cyan(bar)} ${percentage}% ${message}`)
  }
  
  private writeToFile(message: string) {
    const timestamp = new Date().toISOString()
    appendFileSync(this.logFile, `${timestamp} ${message}\n`)
  }
  
  getLogFile(): string {
    return this.logFile
  }
}
```

### 3. Data Validator

**File:** `src/scripts/import/validator.ts`

```typescript
import { z } from 'zod'

// Validation schemas
export const CategorySchema = z.object({
  name: z.string().min(1),
  permalink: z.string(),
  level: z.number().int().min(0).max(3),
  parent: z.string().optional(),
})

export const ProductOptionValueSchema = z.object({
  value: z.string(),
  presentation: z.string().min(1),
  image: z.string().url().optional(),
})

export const ProductOptionSchema = z.object({
  title: z.string().min(1),
  values: z.array(ProductOptionValueSchema).min(1),
})

export const VariantSchema = z.object({
  title: z.string().min(1),
  sku: z.string().min(1),
  options: z.record(z.string()),
  price: z.number().positive(),
  manage_inventory: z.boolean(),
})

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
})

export type TransformedProduct = z.infer<typeof TransformedProductSchema>
export type ValidationResult = {
  valid: boolean
  errors: z.ZodError | null
  product: TransformedProduct | null
}

export class DataValidator {
  private logger: Logger
  
  constructor(logger: Logger) {
    this.logger = logger
  }
  
  validateProduct(product: any): ValidationResult {
    const result = TransformedProductSchema.safeParse(product)
    
    if (!result.success) {
      this.logger.warning(`Validation failed for product: ${product.title || product.id}`)
      this.logger.debug('Validation errors:', result.error.errors)
      
      return {
        valid: false,
        errors: result.error,
        product: null,
      }
    }
    
    return {
      valid: true,
      errors: null,
      product: result.data,
    }
  }
  
  validateCategoryHierarchy(categories: Category[]): boolean {
    const categoryMap = new Map(categories.map(c => [c.name, c]))
    
    for (const category of categories) {
      if (category.parent) {
        const parent = categoryMap.get(category.parent)
        if (!parent) {
          this.logger.warning(`Category "${category.name}" references non-existent parent "${category.parent}"`)
          return false
        }
        if (parent.level >= category.level) {
          this.logger.warning(`Category "${category.name}" has invalid level hierarchy`)
          return false
        }
      }
    }
    
    return true
  }
  
  generateValidationReport(results: ValidationResult[]): ValidationReport {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    
    const errorsByType = new Map<string, number>()
    results.forEach(r => {
      if (r.errors) {
        r.errors.errors.forEach(err => {
          const key = err.path.join('.') + ': ' + err.message
          errorsByType.set(key, (errorsByType.get(key) || 0) + 1)
        })
      }
    })
    
    return {
      total: results.length,
      valid,
      invalid,
      successRate: (valid / results.length) * 100,
      errorsByType: Array.from(errorsByType.entries()).map(([error, count]) => ({
        error,
        count,
      })),
    }
  }
}

export interface ValidationReport {
  total: number
  valid: number
  invalid: number
  successRate: number
  errorsByType: Array<{ error: string; count: number }>
}
```

### 4. API Client with Retry

**File:** `src/scripts/import/api-client.ts`

```typescript
import { Logger } from './logger'
import { ImportConfig } from './config'

export class APIClient {
  private config: ImportConfig
  private logger: Logger
  
  constructor(config: ImportConfig, logger: Logger) {
    this.config = config
    this.logger = logger
  }
  
  async fetchWithRetry<T>(
    url: string,
    attempt: number = 1
  ): Promise<T | null> {
    try {
      this.logger.debug(`Fetching: ${url} (attempt ${attempt})`)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return data as T
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      if (attempt < this.config.retryAttempts) {
        const delay = this.config.retryDelay * attempt
        this.logger.warning(`Retry ${attempt}/${this.config.retryAttempts} after ${delay}ms: ${url}`)
        
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.fetchWithRetry<T>(url, attempt + 1)
      }
      
      this.logger.error(`Failed after ${attempt} attempts: ${url}`, error as Error)
      return null
    }
  }
  
  async fetchProduct(slug: string): Promise<any> {
    const url = `${this.config.apiBaseUrl}/${slug}`
    return this.fetchWithRetry(url)
  }
  
  async fetchProductsBatch(slugs: string[]): Promise<any[]> {
    const results: any[] = []
    
    for (let i = 0; i < slugs.length; i += this.config.concurrency) {
      const batch = slugs.slice(i, i + this.config.concurrency)
      const batchResults = await Promise.all(
        batch.map(slug => this.fetchProduct(slug))
      )
      
      results.push(...batchResults)
      
      const progress = Math.min(i + this.config.concurrency, slugs.length)
      this.logger.progress(progress, slugs.length, 'Fetching products...')
    }
    
    console.log('') // New line after progress
    return results.filter(Boolean)
  }
}
```

### 5. Seed Generator

**File:** `src/scripts/import/seed-generator.ts`

```typescript
import { TransformedProduct, Category } from './types'

export class SeedGenerator {
  generateSeedFile(
    products: TransformedProduct[],
    allCategories: Map<string, Category>,
    tags: Set<string>,
    collections: Set<string>
  ): string {
    const categoryHierarchy = this.buildCategoryHierarchy(allCategories)
    const tagsArray = Array.from(tags).filter(Boolean).sort()
    const collectionsArray = Array.from(collections).filter(Boolean).sort()
    
    return `import { CreateProductWorkflowInputDTO, ProductCollectionDTO, ProductTagDTO } from '@medusajs/framework/types';
import { ProductStatus } from '@medusajs/utils';

/**
 * Products imported from Castlery Production API
 * Generated on: ${new Date().toISOString()}
 * Total products: ${products.length}
 * Source: Castlery Sitemap + Production API
 * 
 * Features:
 * - Hierarchical category structure
 * - Complete option metadata from API
 * - Accurate variant option values with presentation names
 * - Swatch images preserved in metadata
 * - Data validated with Zod schemas
 */

export const importedCategoryHierarchy = ${JSON.stringify(categoryHierarchy, null, 2)};

export const importedCategories = ${JSON.stringify(
  Array.from(allCategories.values()).map(c => c.name).sort(),
  null,
  2
)};

export const importedTags = ${JSON.stringify(tagsArray, null, 2)};

export const importedCollections = ${JSON.stringify(collectionsArray, null, 2)};

export const seedProductsFromAPI = ({
  collections,
  tags,
  sales_channels,
  categories,
  shipping_profile_id,
}: {
  collections: ProductCollectionDTO[];
  tags: ProductTagDTO[];
  categories: { id: string; name: string }[];
  sales_channels: { id: string }[];
  shipping_profile_id: string;
}): CreateProductWorkflowInputDTO[] => [
${products.map(product => this.generateProductEntry(product)).join(',\n')}
];
`
  }
  
  private buildCategoryHierarchy(allCategories: Map<string, Category>): any[] {
    const hierarchy: any[] = []
    const rootCategories = Array.from(allCategories.values())
      .filter(c => c.level === 1)
      .sort((a, b) => a.name.localeCompare(b.name))
    
    rootCategories.forEach(root => {
      const children = Array.from(allCategories.values())
        .filter(c => c.parent === root.name)
        .map(c => ({ name: c.name, permalink: c.permalink }))
        .sort((a, b) => a.name.localeCompare(b.name))
      
      hierarchy.push({
        name: root.name,
        permalink: root.permalink,
        children: children.length > 0 ? children : undefined,
      })
    })
    
    return hierarchy
  }
  
  private generateProductEntry(product: TransformedProduct): string {
    // Implementation similar to current generateSeedFile
    // but with improved formatting and validation
    // ... (detailed implementation)
  }
}
```

## Data Flow

### Import Pipeline

```typescript
async function runImport() {
  // 1. Load configuration
  const config = loadConfig()
  const logger = new Logger(config.verbose)
  
  // 2. Fetch sitemap
  const sitemapFetcher = new SitemapFetcher(config, logger)
  const slugs = await sitemapFetcher.fetchProductSlugs()
  
  // 3. Fetch products from API
  const apiClient = new APIClient(config, logger)
  const apiProducts = await apiClient.fetchProductsBatch(slugs)
  
  // 4. Transform data
  const transformer = new DataTransformer(logger)
  const transformedProducts = apiProducts.map(p => transformer.transform(p))
  
  // 5. Validate data
  const validator = new DataValidator(logger)
  const validationResults = transformedProducts.map(p => validator.validateProduct(p))
  const validProducts = validationResults.filter(r => r.valid).map(r => r.product!)
  
  // 6. Generate validation report
  const report = validator.generateValidationReport(validationResults)
  logger.info(`Validation: ${report.valid}/${report.total} products valid (${report.successRate.toFixed(1)}%)`)
  
  // 7. Generate seed file
  if (!config.dryRun) {
    const generator = new SeedGenerator()
    const seedContent = generator.generateSeedFile(validProducts, categories, tags, collections)
    writeFileSync(outputPath, seedContent)
  }
  
  // 8. Display summary
  displaySummary(report, logger)
}
```

## Correctness Properties

### Property 1: Data Completeness
**Validates: Requirements 2.1, 2.2, 2.3**

Every imported product must have:
- Non-empty title and handle
- At least one variant with positive price
- At least one valid image URL
- Valid category hierarchy

```typescript
function verifyDataCompleteness(product: TransformedProduct): boolean {
  return (
    product.title.length > 0 &&
    product.handle.length > 0 &&
    product.variants.length > 0 &&
    product.variants.every(v => v.price > 0) &&
    product.images.length > 0 &&
    product.images.every(url => isValidUrl(url))
  )
}
```

### Property 2: Category Hierarchy Integrity
**Validates: Requirements 2.4, 5.3**

Category parent-child relationships must be valid:
- Parent must exist if referenced
- Parent level must be less than child level
- No circular references

```typescript
function verifyCategoryHierarchy(categories: Category[]): boolean {
  const categoryMap = new Map(categories.map(c => [c.name, c]))
  
  for (const category of categories) {
    if (category.parent) {
      const parent = categoryMap.get(category.parent)
      if (!parent || parent.level >= category.level) {
        return false
      }
    }
  }
  
  return true
}
```

### Property 3: Option Value Consistency
**Validates: Requirements 5.1, 5.2**

Product options and variant options must be consistent:
- Variant options must reference valid product option values
- Presentation names must match

```typescript
function verifyOptionConsistency(product: TransformedProduct): boolean {
  const validOptions = new Map<string, Set<string>>()
  
  product.productOptions.forEach(opt => {
    validOptions.set(opt.title, new Set(opt.values.map(v => v.presentation)))
  })
  
  return product.variants.every(variant => {
    return Object.entries(variant.options).every(([optionTitle, value]) => {
      const validValues = validOptions.get(optionTitle)
      return validValues && validValues.has(value)
    })
  })
}
```

### Property 4: Price Conversion
**Validates: Requirements 5.7**

Prices must be converted to cents (integer):

```typescript
function verifyPriceConversion(variant: Variant): boolean {
  return Number.isInteger(variant.price * 100) && variant.price > 0
}
```

## Error Handling Strategy

### Error Categories

1. **Network Errors** - Retry with exponential backoff
2. **Validation Errors** - Log and skip product
3. **Configuration Errors** - Fail fast with clear message
4. **File System Errors** - Fail with recovery suggestions

### Error Recovery

```typescript
class ErrorHandler {
  handleNetworkError(error: Error, context: string): void {
    // Retry logic
  }
  
  handleValidationError(error: z.ZodError, product: any): void {
    // Log detailed validation errors
    // Continue with next product
  }
  
  handleConfigError(error: Error): never {
    // Display clear error message
    // Exit with code 1
  }
  
  handleFileSystemError(error: Error, path: string): never {
    // Suggest fixes (permissions, disk space)
    // Exit with code 1
  }
}
```

## Testing Strategy

### Unit Tests

- Configuration parsing and validation
- Data transformation logic
- Validation schemas
- Category hierarchy building
- Seed file generation

### Integration Tests

- Sitemap fetching (with mock server)
- API client with retry logic
- End-to-end import pipeline
- File generation and formatting

### Property-Based Tests

- Category hierarchy integrity
- Option value consistency
- Data completeness
- Price conversion accuracy

## Performance Considerations

### Optimization Strategies

1. **Concurrent API Requests** - Configurable concurrency (default 5)
2. **Streaming File Write** - For large seed files
3. **Memory Management** - Process products in batches
4. **Caching** - Cache sitemap for repeated runs

### Memory Usage

- Estimated: ~50MB per 100 products
- Maximum: 500MB for 1000 products
- Mitigation: Batch processing if needed

## Migration Plan

### Phase 1: File Renaming (Non-breaking)
1. Rename `import-from-api-only.ts` → `import-from-api.ts`
2. Rename `products-from-es.ts` → `products-from-api.ts`
3. Update imports in `seed.ts`:
   ```typescript
   // Old
   import { seedProductsFromES } from './seed/products-from-es'
   
   // New
   import { seedProductsFromAPI } from './seed/products-from-api'
   ```
4. Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "import:products": "npx tsx src/scripts/import-from-api.ts"
     }
   }
   ```
5. Rename `README-ES-IMPORT.md` → `README-API-IMPORT.md`
6. Test with `yarn setup` (should work with existing file)
7. Remove old files after verification

### Phase 2: Add Validation (Non-breaking)
1. Add Zod schemas in `import/validator.ts`
2. Add validation step (warnings only initially)
3. Run import script: `yarn import:products`
4. Verify generated file is valid
5. Commit validated `products-from-api.ts`
6. Enable strict validation (fail on invalid data)

### Phase 3: Improve Logging (Non-breaking)
1. Install dependencies: `yarn add chalk ora`
2. Implement Logger class in `import/logger.ts`
3. Replace console.log calls in import script
4. Add progress indicators for API fetching
5. Test import: `yarn import:products`
6. Verify log output and log file generation

### Phase 4: Add Configuration (Non-breaking)
1. Implement config loader in `import/config.ts`
2. Add CLI argument parsing (--dry-run, --verbose)
3. Document new options in README
4. Test different configurations
5. Update documentation with examples

### Phase 5: Commit Static Data
1. Run final import: `yarn import:products`
2. Review generated `products-from-api.ts`
3. Commit to git:
   ```bash
   git add src/scripts/seed/products-from-api.ts
   git commit -m "chore: update product data from Castlery API"
   ```
4. Document update process in README
5. Remove import script from CI/CD (if present)

## Documentation Updates

### Files to Update

1. **README-API-IMPORT.md** (renamed from README-ES-IMPORT.md)
   - Emphasize this is a **one-time import tool**
   - Document when to run import (product updates, new products)
   - Explain that generated file is committed to git
   - Add section on updating product data

2. **package.json** - Update scripts:
   ```json
   {
     "scripts": {
       "import:products": "npx tsx src/scripts/import-from-api.ts",
       "import:products:dry-run": "npx tsx src/scripts/import-from-api.ts --dry-run",
       "import:products:verbose": "npx tsx src/scripts/import-from-api.ts --verbose"
     }
   }
   ```

3. **Root README.md** - Update setup instructions:
   ```markdown
   ## Setup
   
   # First time setup (uses committed product data)
   yarn setup
   
   # To update product data (optional, only when needed)
   yarn import:products
   git add src/scripts/seed/products-from-api.ts
   git commit -m "chore: update product data"
   ```

4. **Add IMPORT-GUIDE.md** - Detailed import guide:
   - When to update product data
   - How to run import script
   - How to verify generated data
   - How to commit changes
   - Troubleshooting common issues

### New Documentation Sections

#### When to Update Product Data

Update `products-from-api.ts` when:
- ✅ New products added to Castlery catalog
- ✅ Product information changed (prices, descriptions)
- ✅ Categories or collections restructured
- ✅ Initial project setup
- ❌ NOT during regular development
- ❌ NOT in CI/CD pipeline
- ❌ NOT before every seed

#### Product Data Update Workflow

```bash
# 1. Run import script
yarn import:products

# 2. Review changes
git diff src/scripts/seed/products-from-api.ts

# 3. Test seed process
yarn setup

# 4. Verify in admin panel
open http://localhost:9000/app

# 5. Commit if satisfied
git add src/scripts/seed/products-from-api.ts
git commit -m "chore: update product data from Castlery API"
git push
```

## Dependencies

### New Dependencies

```json
{
  "dependencies": {
    "chalk": "^5.3.0",
    "ora": "^8.0.1"
  }
}
```

### Existing Dependencies

- zod (already in project)
- @medusajs/framework
- TypeScript

## Backward Compatibility

### Seed Process (Unchanged)
- ✅ `yarn setup` works exactly as before
- ✅ `seed.ts` reads from static file (just renamed)
- ✅ Database seeding logic unchanged
- ✅ No changes to Medusa workflows

### Import Process (Improved)
- ✅ Import script runs independently
- ✅ Generated file format remains compatible
- ✅ Old environment variables still supported
- ✅ Can still use old file during migration

### Git Workflow
- ✅ `products-from-api.ts` is tracked in git
- ✅ Changes visible in pull requests
- ✅ Can revert to previous product data
- ✅ Team can review product updates

### CI/CD Considerations
- ✅ No import script in CI/CD pipeline
- ✅ Seed process uses committed file
- ✅ Faster deployments (no API calls)
- ✅ Reproducible builds

## File Lifecycle

### products-from-api.ts Lifecycle

```
[Developer runs import] → [File generated] → [Developer reviews] → [Commit to git]
                                                                          ↓
                                                                    [Team reviews PR]
                                                                          ↓
                                                                    [Merge to main]
                                                                          ↓
                                                            [CI/CD uses committed file]
                                                                          ↓
                                                                [Seed to production]
```

### When File Changes

**Triggers for Update:**
- New product launch
- Seasonal catalog update
- Price changes
- Category restructuring

**Update Process:**
1. Developer runs `yarn import:products`
2. Reviews diff in git
3. Tests locally with `yarn setup`
4. Creates PR with updated file
5. Team reviews product changes
6. Merges to main
7. Deploys with new data

### Version Control Benefits

- **Audit Trail**: See when products were updated
- **Rollback**: Revert to previous product data
- **Review**: Team can review product changes
- **Diff**: See exactly what changed
- **Blame**: Know who updated products and why
