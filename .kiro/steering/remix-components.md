---
inclusion: fileMatch
fileMatchPattern: 'apps/storefront/app/components/**/*.{ts,tsx}'
---

# Remix Storefront Component Patterns

You are an expert in React component development, TypeScript, and Tailwind CSS for building reusable, accessible, and performant UI components in e-commerce storefronts.

## Core Principles

- Write performant, accessible React components
- Use TypeScript for type safety and better developer experience
- Follow responsive design principles with Tailwind CSS
- Create reusable component patterns and design systems
- Prioritize user experience and accessibility
- Implement proper component composition and prop patterns

## Component Patterns

### Product Components

```typescript
// components/ProductCard.tsx
interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const variant = product.variants?.[0]
  const price = variant?.prices?.[0]
  
  return (
    <div className={cn("group relative", className)}>
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
        <img
          src={product.thumbnail || "/placeholder.jpg"}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform"
        />
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/products/${product.handle}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        
        {price && (
          <p className="text-sm text-gray-700">
            {formatPrice(price.amount, price.currency_code)}
          </p>
        )}
      </div>
    </div>
  )
}
```

### Layout Components

```typescript
// components/Layout.tsx
import { Outlet } from "@react-router/react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

## Styling with Tailwind CSS

### Responsive Design

```typescript
// Use mobile-first responsive design
<div className="
  grid 
  grid-cols-1 
  gap-4 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  xl:grid-cols-5
">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### Component Variants

```typescript
// Use clsx for conditional classes
import { clsx } from "clsx"

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  children,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300": variant === "secondary",
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50": variant === "outline",
        },
        {
          "px-3 py-2 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        }
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

## Component Organization

### File Structure

```
app/components/
├── common/           # Reusable UI primitives
│   ├── buttons/
│   ├── forms/
│   ├── card/
│   ├── modals/
│   └── images/
├── cart/            # Cart-specific components
├── checkout/        # Checkout flow components
├── product/         # Product display components
├── reviews/         # Review system components
└── layout/          # Header, footer, nav
```

### Component File Pattern

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests (optional)
└── index.ts               # Re-export
```

## Common Component Patterns

### Compound Components

```typescript
// Card compound component pattern
export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-lg border", className)}>{children}</div>
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b p-4">{children}</div>
}

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>
}

Card.Footer = function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="border-t p-4">{children}</div>
}

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props Pattern

```typescript
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return <>{children(data, loading, error)}</>
}
```

## Accessibility Best Practices

### ARIA Attributes

```typescript
<button
  aria-label={`Add ${product.title} to cart`}
  aria-describedby={`price-${product.id}`}
  onClick={handleAddToCart}
>
  Add to Cart
</button>

<span id={`price-${product.id}`} className="sr-only">
  Price: {formatPrice(price.amount, price.currency_code)}
</span>
```

### Keyboard Navigation

```typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick()
    }
  }}
  onClick={handleClick}
>
  Interactive Element
</div>
```

## Performance Optimization

### Lazy Loading

```typescript
import { lazy, Suspense } from "react"

const HeavyComponent = lazy(() => import("./HeavyComponent"))

export function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Memoization

```typescript
import { memo, useMemo } from "react"

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = useMemo(
    () => formatPrice(product.price),
    [product.price]
  )
  
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{formattedPrice}</p>
    </div>
  )
})
```

## Best Practices

- Use TypeScript for all components
- Implement proper prop types and interfaces
- Follow Tailwind CSS utility-first approach
- Use semantic HTML elements
- Implement proper accessibility attributes
- Optimize images with proper loading strategies
- Use React.memo for expensive components
- Keep components small and focused
- Use composition over inheritance
- Write tests for complex component logic
