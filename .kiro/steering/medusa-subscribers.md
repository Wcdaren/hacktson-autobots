---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/subscribers/**/*"
---

# Subscribers and Events

Subscribers are asynchronous functions that execute when specific events are emitted.

## When to Use Subscribers

- ✅ Send confirmation emails when orders are placed
- ✅ Sync data to external systems when products are updated
- ✅ Trigger webhooks when entities change
- ✅ Perform non-blocking side effects

**Don't use subscribers for:**
- ❌ Periodic tasks (use scheduled jobs instead)
- ❌ Operations that must block the main flow (use workflows)

## Creating a Subscriber

```typescript
// src/subscribers/order-placed.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function orderPlacedHandler({
  event: { eventName, data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const query = container.resolve("query")

  logger.info(`Order ${data.id} was placed`)

  // Retrieve full order data (event only contains ID)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "email", "customer.*", "items.*"],
    filters: { id: data.id },
  })

  // Process order...
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
```

### Listening to Multiple Events

```typescript
export default async function productChangesHandler({
  event: { eventName, data },
  container,
}: SubscriberArgs<{ id: string }>) {
  switch (eventName) {
    case "product.created":
      // Handle creation
      break
    case "product.updated":
      // Handle update
      break
  }
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated", "product.deleted"],
}
```

## Common Commerce Events

```typescript
// Order events
"order.placed", "order.updated", "order.canceled", "order.completed"

// Product events
"product.created", "product.updated", "product.deleted"

// Customer events
"customer.created", "customer.updated"

// Cart events
"cart.created", "cart.updated"
```

## Triggering Custom Events

```typescript
import { emitEventStep } from "@medusajs/medusa/core-flows"

// In workflow
emitEventStep({
  eventName: "review.created",
  data: { id: review.id, product_id: input.product_id },
})
```

## Best Practices

### 1. Always Use Logging

```typescript
export default async function mySubscriber({ event: { data }, container }) {
  const logger = container.resolve("logger")
  logger.info(`Handling event for ${data.id}`)

  try {
    // Logic
    logger.info(`Successfully handled event`)
  } catch (error) {
    logger.error(`Failed: ${error.message}`)
  }
}
```

### 2. Handle Errors Gracefully

Don't throw at top level - log errors and let the subscriber complete:

```typescript
try {
  await sendEmail(data.id)
} catch (error) {
  logger.error(`Failed to send email: ${error.message}`)
  // Don't throw - subscriber completes gracefully
}
```

### 3. Use Workflows for Mutations

```typescript
import { syncProductWorkflow } from "../workflows/sync-product"

export default async function productCreatedHandler({ event: { data }, container }) {
  await syncProductWorkflow(container).run({
    input: { product_id: data.id },
  })
}
```

### 4. Make Subscribers Idempotent

```typescript
export default async function orderPlacedHandler({ event: { data }, container }) {
  const myService = container.resolve("my-service")

  // Check if already processed
  const processed = await myService.isOrderProcessed(data.id)
  if (processed) return

  await myService.processOrder(data.id)
  await myService.markOrderAsProcessed(data.id)
}
```
