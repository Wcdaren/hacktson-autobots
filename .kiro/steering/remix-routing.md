---
inclusion: fileMatch
fileMatchPattern: 'apps/storefront/**/*.{ts,tsx}'
---

# Remix Storefront Routing & Integration

You are an expert in React Router v7 (Remix), TypeScript, React, and e-commerce storefront development with Medusa integration.

## Core Principles

- Write performant, accessible React components
- Follow React Router v7 conventions and patterns
- Implement proper SEO optimization
- Use TypeScript for type safety
- Follow responsive design principles with Tailwind CSS
- Integrate seamlessly with Medusa backend APIs
- Prioritize user experience and performance

## React Router v7 (Remix) Patterns

### Route Structure

```typescript
// app/routes/products.$handle.tsx
import type { LoaderFunctionArgs, MetaFunction } from "@react-router/node"
import { useLoaderData } from "@react-router/react"

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.product?.title || "Product" },
    { name: "description", content: data?.product?.description },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const product = await getProduct(params.handle!)
  
  if (!product) {
    throw new Response("Not Found", { status: 404 })
  }
  
  return { product }
}

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>()
  
  return (
    <div>
      <h1>{product.title}</h1>
      {/* Component implementation */}
    </div>
  )
}
```

### File-Based Routing

Routes in `app/routes/`:
- `_index.tsx` → `/` (homepage)
- `products.$handle.tsx` → `/products/:handle`
- `collections.$handle.tsx` → `/collections/:handle`
- `checkout._index.tsx` → `/checkout`
- `checkout.payment.tsx` → `/checkout/payment`

### Form Handling

```typescript
// Use remix-hook-form with @lambdacurry/forms
import { RemixFormProvider, useRemixForm } from "remix-hook-form"
import { TextField } from "@lambdacurry/forms/remix-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(1, "First name is required"),
})

export default function ContactForm() {
  const form = useRemixForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  })

  return (
    <RemixFormProvider {...form}>
      <form method="post">
        <TextField 
          name="email" 
          label="Email" 
          type="email"
          required 
        />
        <TextField 
          name="firstName" 
          label="First Name" 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </RemixFormProvider>
  )
}
```

### Action Handlers

```typescript
import type { ActionFunctionArgs } from "@react-router/node"
import { data } from "@react-router/node"
import { getValidatedFormData } from "remix-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data: formData,
    receivedValues,
  } = await getValidatedFormData<FormData>(request, zodResolver(schema))

  if (errors) {
    return data({ errors }, { status: 400 })
  }

  try {
    await processForm(formData)
    return data({ success: true })
  } catch (error) {
    return data(
      { errors: { root: { message: "Something went wrong" } } },
      { status: 500 }
    )
  }
}
```

## Medusa Integration

### SDK Setup

```typescript
// lib/medusa.ts
import { Medusa } from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
})
```

### Data Fetching in Loaders

```typescript
// In route loaders
export async function loader() {
  const { products } = await medusa.store.product.list({
    limit: 20,
    fields: "+variants.prices",
  })
  
  return { products }
}
```

### Cart Management

```typescript
// hooks/useCart.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartState {
  cartId: string | null
  items: CartItem[]
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      
      addItem: async (variantId, quantity) => {
        const { cartId } = get()
        
        if (!cartId) {
          const cart = await medusa.store.cart.create({})
          set({ cartId: cart.id })
        }
        
        await medusa.store.cart.lineItem.create(cartId, {
          variant_id: variantId,
          quantity,
        })
        
        // Refresh cart data
        await refreshCart()
      },
      
      // Other methods...
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
)
```

## SEO and Meta Tags

### Dynamic Meta Tags

```typescript
export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const product = data?.product
  
  if (!product) {
    return [
      { title: "Product Not Found" },
      { name: "robots", content: "noindex" },
    ]
  }
  
  return [
    { title: `${product.title} | Your Store` },
    { name: "description", content: product.description },
    { property: "og:title", content: product.title },
    { property: "og:description", content: product.description },
    { property: "og:image", content: product.thumbnail },
    { property: "og:url", content: `https://yourstore.com${location.pathname}` },
    { name: "twitter:card", content: "summary_large_image" },
  ]
}
```

### Structured Data

```typescript
// Add JSON-LD structured data
export function ProductStructuredData({ product }: { product: Product }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    offers: {
      "@type": "Offer",
      price: product.variants?.[0]?.prices?.[0]?.amount,
      priceCurrency: product.variants?.[0]?.prices?.[0]?.currency_code,
      availability: "https://schema.org/InStock",
    },
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

## Error Handling

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import { isRouteErrorResponse, useRouteError } from "@react-router/react"

export function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{error.status}</h1>
          <p className="text-xl">{error.statusText}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-xl">Something went wrong</p>
      </div>
    </div>
  )
}
```

## Performance Optimization

### Caching

```typescript
// Use proper cache headers in loaders
export async function loader({ request }: LoaderFunctionArgs) {
  const products = await getProducts()
  
  return data(
    { products },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    }
  )
}
```

### Code Splitting

```typescript
// Use React.lazy for code splitting
import { lazy, Suspense } from "react"

const CheckoutForm = lazy(() => import("./CheckoutForm"))

export function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  )
}
```

## Best Practices

- Use loaders for data fetching (not useEffect)
- Implement proper error boundaries
- Use TypeScript for type safety
- Follow Remix conventions for routing
- Optimize images and assets
- Implement proper SEO meta tags
- Use proper caching strategies
- Handle errors gracefully
- Test critical user flows
- Follow accessibility guidelines
