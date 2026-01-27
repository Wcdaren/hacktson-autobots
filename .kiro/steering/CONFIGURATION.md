# Steering Files Configuration Summary

This document provides a quick reference for all steering file configurations and their automatic loading rules.

## 📋 Configuration Overview

### Always Loaded (3 files)
These files are loaded in every context:

| File | Purpose |
|------|---------|
| `product.md` | Project overview and key features |
| `structure.md` | Monorepo structure and file organization |
| `tech.md` | Technology stack and common commands |

### File Match Based Loading (15 files)

#### Backend - Medusa v2

| File | Pattern | When Loaded |
|------|---------|-------------|
| `medusa-development.md` | `apps/medusa/**/*.{ts,js}` | Any Medusa TypeScript/JavaScript file |
| `medusa-modules.md` | `apps/medusa/src/modules/**/*` | Working in modules directory |
| `medusa-workflows.md` | `apps/medusa/src/workflows/**/*` | Working in workflows directory |
| `medusa-api-routes.md` | `apps/medusa/src/api/**/*` | Working in API routes |
| `medusa-subscribers.md` | `apps/medusa/src/subscribers/**/*` | Working in subscribers directory |
| `medusa-jobs.md` | `apps/medusa/src/jobs/**/*` | Working in jobs directory |
| `medusa-links.md` | `apps/medusa/src/links/**/*` | Working in links directory |
| `medusa-querying.md` | `apps/medusa/**/*` | Any file in Medusa app |
| `medusa-admin-ui.md` | `apps/medusa/src/admin/**/*` | Working in admin directory |

#### Frontend - Remix Storefront

| File | Pattern | When Loaded |
|------|---------|-------------|
| `remix-routing.md` | `apps/storefront/**/*.{ts,tsx}` | Any storefront TypeScript/React file |
| `remix-forms.md` | `apps/storefront/**/*.{ts,tsx}` | Any storefront TypeScript/React file |
| `remix-components.md` | `apps/storefront/app/components/**/*.{ts,tsx}` | Working in components directory |

#### Development Practices

| File | Pattern | When Loaded |
|------|---------|-------------|
| `typescript-patterns.md` | `**/*.{ts,tsx}` | Any TypeScript file in the project |
| `testing-patterns.md` | `**/*.{test,spec}.{ts,tsx}` | Any test file |

## 🎯 Pattern Matching Rules

### Glob Pattern Syntax

- `**` - Matches any number of directories
- `*` - Matches any characters within a directory level
- `{ts,tsx}` - Matches either `.ts` or `.tsx` extensions
- `{test,spec}` - Matches either `.test` or `.spec` in filename

### Examples

```
apps/medusa/src/modules/my-module/service.ts
  ✓ Loads: medusa-development.md (matches apps/medusa/**/*.ts)
  ✓ Loads: medusa-modules.md (matches apps/medusa/src/modules/**/*) 
  ✓ Loads: medusa-querying.md (matches apps/medusa/**/*) 
  ✓ Loads: typescript-patterns.md (matches **/*.ts)
  ✓ Always: product.md, structure.md, tech.md

apps/storefront/app/components/ProductCard.tsx
  ✓ Loads: remix-routing.md (matches apps/storefront/**/*.tsx)
  ✓ Loads: remix-forms.md (matches apps/storefront/**/*.tsx)
  ✓ Loads: remix-components.md (matches apps/storefront/app/components/**/*.tsx)
  ✓ Loads: typescript-patterns.md (matches **/*.tsx)
  ✓ Always: product.md, structure.md, tech.md

apps/medusa/src/modules/my-module/__tests__/service.test.ts
  ✓ Loads: medusa-development.md (matches apps/medusa/**/*.ts)
  ✓ Loads: medusa-modules.md (matches apps/medusa/src/modules/**/*) 
  ✓ Loads: medusa-querying.md (matches apps/medusa/**/*) 
  ✓ Loads: typescript-patterns.md (matches **/*.ts)
  ✓ Loads: testing-patterns.md (matches **/*.test.ts)
  ✓ Always: product.md, structure.md, tech.md
```

## 🔧 Adding New Steering Files

When creating a new steering file:

1. **Choose inclusion type:**
   - `always` - For project-wide information
   - `fileMatch` - For context-specific guidance
   - `manual` - For specialized/rarely-needed info

2. **Add frontmatter:**
   ```yaml
   ---
   inclusion: fileMatch
   fileMatchPattern: 'your/pattern/**/*.{ts,tsx}'
   ---
   ```

3. **Test the pattern:**
   - Open a file that should match
   - Verify the steering file loads
   - Adjust pattern if needed

4. **Update README.md:**
   - Add entry to appropriate section
   - Document when it loads

## 📊 Loading Priority

When multiple steering files match:
1. All matching files are loaded
2. More specific patterns don't override general ones
3. Files are combined to provide comprehensive context

Example: Working in `apps/medusa/src/modules/my-module/service.ts` loads:
- Always loaded files (3)
- Medusa-specific files (3)
- TypeScript patterns (1)
- **Total: 7 steering files**

## 🚀 Best Practices

1. **Keep patterns specific** - Avoid overly broad patterns
2. **Test your patterns** - Verify files load in correct contexts
3. **Document changes** - Update README.md when adding files
4. **Avoid overlaps** - Don't duplicate content across files
5. **Use hierarchy** - General → Specific (always → fileMatch → manual)

## 🔍 Debugging

To check which steering files are loaded:
1. Open a file in your editor
2. Check Kiro's context (if available)
3. Verify expected files are included

Common issues:
- Pattern too specific → File never loads
- Pattern too broad → File loads in wrong contexts
- Missing frontmatter → File never auto-loads
- Wrong glob syntax → Pattern doesn't match

## 📝 Maintenance Checklist

- [ ] All files have appropriate frontmatter
- [ ] Patterns are tested and working
- [ ] README.md is up to date
- [ ] No duplicate content across files
- [ ] Examples are current and accurate
- [ ] File organization is logical
