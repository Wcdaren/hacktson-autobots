# Product Import Refinement - Implementation Tasks

## Task Overview

This spec implements a refined product import system that generates static seed files from Castlery's API, with proper validation, logging, and documentation.

## Task List

### Phase 1: File Renaming and Cleanup

- [x] 1. Rename core import files
  - [x] 1.1 Rename `import-from-api-only.ts` to `import-from-api.ts`
  - [x] 1.2 Rename `seed/products-from-es.ts` to `seed/products-from-api.ts`
  - [x] 1.3 Update function name `seedProductsFromES` to `seedProductsFromAPI` in the file
  - [x] 1.4 Rename `README-ES-IMPORT.md` to `README-API-IMPORT.md`

- [x] 2. Update imports and references
  - [x] 2.1 Update import in `seed.ts` to use new file name
  - [x] 2.2 Update function call in `seed.ts` from `seedProductsFromES` to `seedProductsFromAPI`
  - [x] 2.3 Update `package.json` script from `es:import` to `import:products`
  - [x] 2.4 Update output path in import script to `products-from-api.ts`

- [x] 3. Delete ES-related files
  - [x] 3.1 Delete `src/scripts/explore-es-data.ts`
  - [x] 3.2 Delete `src/scripts/explore-specific-index.ts`
  - [x] 3.3 Delete `src/scripts/setup-es-tunnel.sh`
  - [x] 3.4 Delete `src/scripts/seed-with-es-data.ts.example`
  - [x] 3.5 Delete `src/scripts/README-ES-IMPORT.md` (old file)
  - [x] 3.6 Delete `es-sample-products.json` (root level)
  - [x] 3.7 Delete `apps/medusa/es-sample-products.json`
  - [x] 3.8 Delete `IMPORT-CLEANUP-SUMMARY.md`

- [x] 3.5 Remove manual seeding from seed.ts
  - [x] 3.5.1 Remove manual collection creation (lines using `importedCollections`)
  - [x] 3.5.2 Remove manual parent category creation (lines using `importedCategoryHierarchy`)
  - [x] 3.5.3 Remove manual child category creation (lines using `childCategories`)
  - [x] 3.5.4 Remove manual tag creation (lines using `importedTags`)
  - [x] 3.5.5 Update `seedProductsFromES` call to not pass pre-created collections/tags/categories
  - [x] 3.5.6 Verify imported product data already contains all category/tag/collection information

- [x] 4. Test renaming changes
  - [x] 4.1 Run `yarn setup` to verify seed process works
  - [x] 4.2 Verify no import errors in console
  - [x] 4.3 Check that products are seeded correctly
  - [x] 4.4 Verify admin panel shows products

### Phase 2: Add Data Validation

- [x] 5. Create validation infrastructure
  - [x] 5.1 Create `src/scripts/import/` directory
  - [x] 5.2 Create `import/types.ts` with TypeScript interfaces
  - [x] 5.3 Create `import/validator.ts` with Zod schemas
  - [x] 5.4 Add validation for product completeness (title, handle, variants)
  - [x] 5.5 Add validation for price values (must be positive)
  - [x] 5.6 Add validation for image URLs (must be valid URLs)
  - [x] 5.7 Add validation for category hierarchy (parent-child relationships)

- [ ] 6. Integrate validation into import script
  - [ ] 6.1 Import validator in main import script
  - [ ] 6.2 Add validation step after transformation
  - [ ] 6.3 Generate validation report with statistics
  - [ ] 6.4 Log validation warnings for invalid products
  - [ ] 6.5 Skip invalid products but continue import
  - [ ] 6.6 Display validation summary at end

- [ ] 7. Test validation
  - [ ] 7.1 Run import with current data
  - [ ] 7.2 Verify validation passes for valid products
  - [ ] 7.3 Test with intentionally invalid data
  - [ ] 7.4 Verify validation catches errors correctly

### Phase 3: Improve Logging and Progress

- [x] 8. Install dependencies
  - [x] 8.1 Add `chalk` to dependencies: `yarn add chalk`
  - [x] 8.2 Add `ora` to dependencies: `yarn add ora`

- [x] 9. Create logger infrastructure
  - [x] 9.1 Create `import/logger.ts` with Logger class
  - [x] 9.2 Implement colored console output (success, warning, error, info)
  - [x] 9.3 Implement progress indicators for API fetching
  - [x] 9.4 Implement file logging to `logs/` directory
  - [x] 9.5 Add verbose mode support

- [ ] 10. Update import script with new logging
  - [ ] 10.1 Replace all `console.log` with logger methods
  - [ ] 10.2 Add progress bar for sitemap fetching
  - [ ] 10.3 Add progress bar for API batch fetching
  - [ ] 10.4 Add progress bar for data transformation
  - [ ] 10.5 Add colored status indicators (✓ ⚠ ✗)
  - [ ] 10.6 Generate detailed import summary

- [ ] 11. Test logging improvements
  - [ ] 11.1 Run import and verify colored output
  - [ ] 11.2 Test verbose mode with `--verbose` flag
  - [ ] 11.3 Verify log file is created
  - [ ] 11.4 Check log file contains all events

### Phase 4: Add Configuration Options

- [ ] 12. Create configuration system
  - [ ] 12.1 Create `import/config.ts` with config loader
  - [ ] 12.2 Define Zod schema for configuration
  - [ ] 12.3 Support environment variables (MAX_PRODUCTS, CONCURRENCY, etc.)
  - [ ] 12.4 Support CLI arguments (--dry-run, --verbose, --region)
  - [ ] 12.5 Add validation for configuration values

- [ ] 13. Implement CLI argument parsing
  - [ ] 13.1 Add `--dry-run` mode (validate only, don't write file)
  - [ ] 13.2 Add `--verbose` mode (detailed logging)
  - [ ] 13.3 Add `--region` option (sg, us, au)
  - [ ] 13.4 Add `--max-products` option
  - [ ] 13.5 Add `--help` to display usage information

- [ ] 14. Update package.json scripts
  - [ ] 14.1 Add `import:products` script
  - [ ] 14.2 Add `import:products:dry-run` script
  - [ ] 14.3 Add `import:products:verbose` script
  - [ ] 14.4 Add `import:products:help` script

- [ ] 15. Test configuration options
  - [ ] 15.1 Test dry-run mode
  - [ ] 15.2 Test verbose mode
  - [ ] 15.3 Test different regions
  - [ ] 15.4 Test max-products limit
  - [ ] 15.5 Verify help text displays correctly

### Phase 5: Improve Error Handling

- [ ] 16. Create API client with retry logic
  - [ ] 16.1 Create `import/api-client.ts`
  - [ ] 16.2 Implement retry mechanism with exponential backoff
  - [ ] 16.3 Add configurable retry attempts (default 3)
  - [ ] 16.4 Add configurable retry delay (default 1000ms)
  - [ ] 16.5 Log retry attempts with warnings

- [ ] 17. Improve error handling in import script
  - [ ] 17.1 Wrap sitemap fetch in try-catch with clear error message
  - [ ] 17.2 Handle individual product fetch failures gracefully
  - [ ] 17.3 Continue import if single product fails
  - [ ] 17.4 Collect and report all errors at end
  - [ ] 17.5 Provide actionable error messages

- [ ] 18. Test error handling
  - [ ] 18.1 Test with invalid sitemap URL
  - [ ] 18.2 Test with network timeout
  - [ ] 18.3 Test with invalid product slug
  - [ ] 18.4 Verify retry logic works
  - [ ] 18.5 Verify error messages are helpful

### Phase 6: Refactor Import Script Structure

- [ ] 19. Extract sitemap fetcher
  - [ ] 19.1 Create `import/sitemap-fetcher.ts`
  - [ ] 19.2 Move sitemap fetching logic
  - [ ] 19.3 Add error handling for sitemap parsing
  - [ ] 19.4 Add tests for sitemap fetcher

- [ ] 20. Extract data transformer
  - [ ] 20.1 Create `import/transformer.ts`
  - [ ] 20.2 Move transformation logic from main script
  - [ ] 20.3 Add helper functions for category extraction
  - [ ] 20.4 Add helper functions for option extraction
  - [ ] 20.5 Add tests for transformer

- [ ] 21. Extract seed generator
  - [ ] 21.1 Create `import/seed-generator.ts`
  - [ ] 21.2 Move seed file generation logic
  - [ ] 21.3 Improve code formatting in generated file
  - [ ] 21.4 Add tests for seed generator

- [ ] 22. Update main import script
  - [ ] 22.1 Import all new modules
  - [ ] 22.2 Simplify main function to orchestrate components
  - [ ] 22.3 Improve code readability
  - [ ] 22.4 Add JSDoc comments

### Phase 7: Documentation Updates

- [ ] 23. Update README-API-IMPORT.md
  - [ ] 23.1 Update title and introduction
  - [ ] 23.2 Emphasize this is a one-time import tool
  - [ ] 23.3 Document when to run import
  - [ ] 23.4 Add section on committing generated file
  - [ ] 23.5 Update configuration examples
  - [ ] 23.6 Update troubleshooting section
  - [ ] 23.7 Remove all ES references

- [ ] 24. Create IMPORT-GUIDE.md
  - [ ] 24.1 Document when to update product data
  - [ ] 24.2 Document step-by-step update workflow
  - [ ] 24.3 Add examples of git commands
  - [ ] 24.4 Add troubleshooting common issues
  - [ ] 24.5 Document configuration options

- [ ] 25. Update root README.md
  - [ ] 25.1 Update setup instructions
  - [ ] 25.2 Add section on updating product data
  - [ ] 25.3 Clarify that import is optional
  - [ ] 25.4 Add link to IMPORT-GUIDE.md

- [ ] 26. Update package.json
  - [ ] 26.1 Update script descriptions
  - [ ] 26.2 Add comments for import scripts
  - [ ] 26.3 Document environment variables

### Phase 8: Final Testing and Validation

- [ ] 27. Run complete import workflow
  - [ ] 27.1 Delete existing `products-from-api.ts`
  - [ ] 27.2 Run `yarn import:products`
  - [ ] 27.3 Verify file is generated correctly
  - [ ] 27.4 Review generated file for quality
  - [ ] 27.5 Check validation report

- [ ] 28. Test seed process
  - [ ] 28.1 Run `yarn nukedb` to reset database
  - [ ] 28.2 Run `yarn setup` to seed with new file
  - [ ] 28.3 Verify products appear in admin panel
  - [ ] 28.4 Check categories are hierarchical
  - [ ] 28.5 Verify collections are created
  - [ ] 28.6 Check tags are applied
  - [ ] 28.7 Verify product options and variants

- [ ] 29. Test all CLI options
  - [ ] 29.1 Test `yarn import:products:dry-run`
  - [ ] 29.2 Test `yarn import:products:verbose`
  - [ ] 29.3 Test with different MAX_PRODUCTS values
  - [ ] 29.4 Test with different REGION values
  - [ ] 29.5 Verify all options work as expected

- [ ] 30. Code quality checks
  - [ ] 30.1 Run `yarn typecheck` to verify no TypeScript errors
  - [ ] 30.2 Run `yarn format` to format code
  - [ ] 30.3 Review code for consistency
  - [ ] 30.4 Add missing JSDoc comments
  - [ ] 30.5 Remove any debug code

### Phase 9: Git Commit and Cleanup

- [ ] 31. Commit static product data
  - [ ] 31.1 Review `products-from-api.ts` changes
  - [ ] 31.2 Stage file: `git add src/scripts/seed/products-from-api.ts`
  - [ ] 31.3 Commit: `git commit -m "chore: update product data from Castlery API"`

- [ ] 32. Commit all code changes
  - [ ] 32.1 Stage all import script changes
  - [ ] 32.2 Stage documentation updates
  - [ ] 32.3 Stage package.json changes
  - [ ] 32.4 Commit: `git commit -m "feat: refine product import system with validation and logging"`

- [ ] 33. Final verification
  - [ ] 33.1 Pull latest changes
  - [ ] 33.2 Run `yarn setup` from clean state
  - [ ] 33.3 Verify everything works
  - [ ] 33.4 Push to remote

## Success Criteria

- ✅ All files renamed correctly with no broken imports
- ✅ All ES-related files deleted
- ✅ Data validation implemented with Zod
- ✅ Colored logging with progress indicators
- ✅ Configuration options working (dry-run, verbose, etc.)
- ✅ Error handling with retry logic
- ✅ Code refactored into modular components
- ✅ Documentation updated and comprehensive
- ✅ `yarn setup` works with committed file
- ✅ `yarn import:products` generates valid file
- ✅ All TypeScript checks pass
- ✅ Products seed correctly to database

## Notes

- Tasks should be completed in order within each phase
- Each phase can be tested independently
- Commit after each major phase
- Keep the old files until Phase 1 is fully tested
- The generated `products-from-api.ts` should be committed to git
- Import script is run manually, not part of CI/CD
