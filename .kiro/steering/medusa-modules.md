---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/modules/**/*"
---

# Custom Modules

A module is a reusable package of functionalities related to a single domain or integration. Modules contain data models (database tables) and a service class that provides methods to manage them.

## Module Structure

```
src/modules/[name]/
├── models/
│   └── [model].ts       # Data model definitions
├── service.ts           # Main service class
└── index.ts             # Module definition export
```

## Creating a Custom Module - Checklist

1. Create data model in `src/modules/[name]/models/`
2. Create service extending MedusaService
3. Export module definition in `index.ts`
4. **CRITICAL: Register module in `medusa-config.ts`**
5. **CRITICAL: Generate migrations: `npx medusa db:generate [module-name]`**
6. **CRITICAL: Run migrations: `npx medusa db:migrate`**
7. Run build to validate implementation

## Data Model Example

```typescript
// src/modules/blog/models/post.ts
import { model } from "@medusajs/framework/utils"

const Post = model.define("post", {
  id: model.id().primaryKey(),
  title: model.text(),
  content: model.text().nullable(),
  published: model.boolean().default(false),
})

export default Post
```

**Automatic Properties:** `created_at`, `updated_at`, `deleted_at` are added automatically. Never add them explicitly.

## Property Types

```typescript
id: model.id().primaryKey(),
name: model.text(),
description: model.text().nullable(),
quantity: model.number(),
price: model.bigNumber(),
is_active: model.boolean().default(true),
status: model.enum(["draft", "published"]).default("draft"),
published_at: model.dateTime().nullable(),
metadata: model.json().nullable(),
tags: model.array().nullable(),
```

## Property Modifiers

```typescript
model.text()              // Required by default
model.text().nullable()   // Allow null
model.text().default("x") // Default value
model.text().unique()     // Unique constraint
```

## Relationships Within a Module

```typescript
// One-to-many
export const Post = model.define("post", {
  id: model.id().primaryKey(),
  comments: model.hasMany(() => Comment, { mappedBy: "post" }),
})

export const Comment = model.define("comment", {
  id: model.id().primaryKey(),
  post: model.belongsTo(() => Post, { mappedBy: "comments" }),
})
```

## Service Example

```typescript
// src/modules/blog/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import Post from "./models/post"

class BlogModuleService extends MedusaService({
  Post,
}) {}

export default BlogModuleService
```

## Module Definition

```typescript
// src/modules/blog/index.ts
import BlogModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const BLOG_MODULE = "blog"

export default Module(BLOG_MODULE, {
  service: BlogModuleService,
})
```

**⚠️ CRITICAL - Module Name Format:**
- Module names MUST be in camelCase
- ✅ CORRECT: `"blog"`, `"productReview"`, `"orderTracking"`
- ❌ WRONG: `"product-review"`, `"order-tracking"` (causes runtime errors)

## Auto-Generated CRUD Methods

```typescript
// Create
const post = await blogService.createPosts({ title: "Hello" })

// Retrieve
const post = await blogService.retrievePost("post_123")

// List
const posts = await blogService.listPosts({ published: true })

// List with count
const [posts, count] = await blogService.listAndCountPosts({ published: true })

// Update
const post = await blogService.updatePosts({ id: "post_123", title: "Updated" })

// Delete
await blogService.deletePosts("post_123")

// Soft delete / restore
await blogService.softDeletePosts("post_123")
await blogService.restorePosts("post_123")
```

## Loaders

Loaders run when the Medusa application starts:

```typescript
// src/modules/blog/loaders/hello-world.ts
import { LoaderOptions } from "@medusajs/framework/types"

export default async function helloWorldLoader({ container }: LoaderOptions) {
  const logger = container.resolve("logger")
  logger.info("[BLOG MODULE] Started!")
}

// Export in module definition
export default Module("blog", {
  service: BlogModuleService,
  loaders: [helloWorldLoader],
})
```
