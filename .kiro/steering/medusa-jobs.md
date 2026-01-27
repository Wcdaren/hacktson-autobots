---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/jobs/**/*"
---

# Scheduled Jobs

Scheduled jobs are asynchronous functions that run automatically at specified intervals.

## When to Use Scheduled Jobs

- ✅ Syncing data with third-party services on a schedule
- ✅ Sending periodic reports (daily, weekly)
- ✅ Cleaning up stale data (expired carts, old sessions)
- ✅ Generating batch exports

**Don't use scheduled jobs for:**
- ❌ Reacting to events (use subscribers instead)
- ❌ One-time tasks (use workflows directly)

## Creating a Scheduled Job

```typescript
// src/jobs/sync-products.ts
import { MedusaContainer } from "@medusajs/framework/types"

export default async function syncProductsJob(container: MedusaContainer) {
  const logger = container.resolve("logger")

  logger.info("Starting product sync...")

  try {
    // Job logic here
    logger.info("Product sync completed")
  } catch (error) {
    logger.error(`Product sync failed: ${error.message}`)
  }
}

export const config = {
  name: "sync-products-daily",
  schedule: "0 0 * * *", // Cron: midnight daily
}
```

## Configuration Options

```typescript
export const config = {
  name: "my-job",           // Required: unique identifier
  schedule: "* * * * *",    // Required: cron expression
  numberOfExecutions: 3,    // Optional: limit total executions
}
```

**⚠️ Understanding numberOfExecutions:**

`numberOfExecutions` limits how many times the job runs **on its schedule**, NOT immediately:

```typescript
// Will run ONCE at the next midnight, not now!
export const config = {
  name: "test-job",
  schedule: "0 0 * * *",
  numberOfExecutions: 1,
}

// To test immediately, use a frequent schedule
export const config = {
  name: "test-job",
  schedule: "* * * * *", // Every minute
  numberOfExecutions: 1,
}
```

## Cron Expression Examples

```typescript
"* * * * *"      // Every minute
"*/5 * * * *"    // Every 5 minutes
"0 * * * *"      // Every hour
"0 0 * * *"      // Daily at midnight
"0 0 * * 0"      // Every Sunday at midnight
"0 */6 * * *"    // Every 6 hours
```

## Executing Workflows in Scheduled Jobs

```typescript
import { sendNewsletterWorkflow } from "../workflows/send-newsletter"

export default async function sendNewsletterJob(container: MedusaContainer) {
  const logger = container.resolve("logger")
  const query = container.resolve("query")

  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["id", "email"],
    filters: { newsletter_subscribed: true },
  })

  await sendNewsletterWorkflow(container).run({
    input: { customer_ids: customers.map((c) => c.id) },
  })

  logger.info("Newsletter sent successfully")
}

export const config = {
  name: "send-weekly-newsletter",
  schedule: "0 0 * * 0", // Every Sunday at midnight
}
```

## Best Practices

### 1. Always Use Logging

```typescript
export default async function myJob(container: MedusaContainer) {
  const logger = container.resolve("logger")
  logger.info("Job started")

  try {
    // Job logic
    logger.info("Job completed successfully")
  } catch (error) {
    logger.error(`Job failed: ${error.message}`)
  }
}
```

### 2. Handle Errors Gracefully

Don't throw at top level - log and let the job complete:

```typescript
try {
  const items = await service.getItems()
  // Process items
} catch (error) {
  logger.error(`Job failed: ${error.message}`)
  // Job completes, will retry on next schedule
}
```

### 3. Make Jobs Idempotent

```typescript
export default async function syncProducts(container: MedusaContainer) {
  const myService = container.resolve("my-service")

  // Check what's already synced
  const lastSyncTime = await myService.getLastSyncTime()

  // Only sync products updated since last sync
  const { data: products } = await query.graph({
    entity: "product",
    filters: { updated_at: { $gte: lastSyncTime } },
  })

  for (const product of products) {
    await myService.upsertToExternalSystem(product)
  }

  await myService.setLastSyncTime(new Date())
}
```
