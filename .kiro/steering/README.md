# Kiro Steering Files

This directory contains AI guidance documents (steering files) that help Kiro understand the project structure, patterns, and best practices.

## 📁 File Organization

### Project Overview (Always Loaded)
- **product.md** - Project overview and key features
- **structure.md** - Monorepo structure and file organization
- **tech.md** - Technology stack and common commands

### Backend (Medusa v2) - Auto-loads based on file location
- **medusa-development.md** - Core development patterns and best practices (all Medusa files)
- **medusa-modules.md** - Custom module development (modules directory)
- **medusa-workflows.md** - Multi-step workflow patterns (workflows directory)
- **medusa-api-routes.md** - API endpoint patterns (api directory)
- **medusa-subscribers.md** - Event-driven architecture (subscribers directory)
- **medusa-jobs.md** - Background job processing (jobs directory)
- **medusa-links.md** - Module relationship patterns (links directory)
- **medusa-querying.md** - Data querying patterns (all Medusa files)
- **medusa-admin-ui.md** - Admin dashboard customization (admin directory)

### Frontend (Remix Storefront) - Auto-loads based on file location
- **remix-routing.md** - React Router v7 patterns and Medusa integration (all storefront files)
- **remix-components.md** - Component patterns and Tailwind CSS (components directory)
- **remix-forms.md** - Form handling with remix-hook-form and Zod (all storefront files)

### Development Practices - Auto-loads based on file type
- **typescript-patterns.md** - TypeScript best practices and patterns (all .ts/.tsx files)
- **testing-patterns.md** - Unit, integration, and E2E testing (all test files)

## 🎯 How Steering Files Work

Kiro automatically loads steering files based on their configuration:

### Inclusion Types

1. **Always Loaded** (`inclusion: always`)
   - Project overview, structure, and tech stack
   - Loaded in every context

2. **File Match** (`inclusion: fileMatch`)
   - Automatically loaded when working on matching files
   - Examples:
     - `apps/medusa/src/modules/**/*` → loads medusa-modules.md
     - `apps/storefront/**/*.tsx` → loads remix-routing.md
     - `**/*.test.ts` → loads testing-patterns.md

3. **Manual** (`inclusion: manual`)
   - Loaded only when explicitly referenced with `#` in chat
   - Use for specialized or rarely-needed guidance

### File Match Patterns

The steering files use glob patterns to match files:
- `**/*.{ts,tsx}` - All TypeScript files
- `apps/medusa/**/*` - All files in Medusa app
- `apps/storefront/app/components/**/*` - All component files
- `**/*.{test,spec}.ts` - All test files

## 📝 When to Update

Update steering files when:
- Adding new architectural patterns
- Changing technology stack
- Establishing new conventions
- Documenting common pitfalls

## 🔄 Migration from Cursor

These files were converted from `.cursor/rules/*.mdc` format to Kiro's `.md` format:
- Added YAML frontmatter for inclusion rules
- Converted to pure Markdown
- Organized by feature area
- Configured file matching patterns for automatic loading

## 💡 Best Practices

1. **Keep files focused** - Each file covers a specific area
2. **Use examples** - Include code examples for patterns
3. **Stay current** - Update as the project evolves
4. **Be concise** - Focus on what's unique to this project
