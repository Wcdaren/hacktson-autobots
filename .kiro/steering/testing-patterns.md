---
inclusion: fileMatch
fileMatchPattern: '**/*.{test,spec}.{ts,tsx}'
---

# Testing Patterns for Medusa Applications

You are an expert in testing TypeScript applications, focusing on unit, integration, and end-to-end testing for Medusa and React applications.

## Core Testing Principles

- Write tests that are readable, maintainable, and reliable
- Test behavior, not implementation details
- Use descriptive test names that explain the behavior being tested
- Arrange, Act, Assert (AAA) pattern for test structure
- Ensure tests are isolated and can run independently
- Test realistic scenarios and data flows
- Focus on critical user paths and business scenarios

## Unit Testing

### Medusa Service Testing

```typescript
// services/__tests__/UserService.test.ts
import { createMedusaContainer } from "@medusajs/framework/utils"
import { UserService } from "../UserService"

describe("UserService", () => {
  let container: MedusaContainer
  let userService: UserService
  let mockRepository: jest.Mocked<any>

  beforeEach(() => {
    container = createMedusaContainer()
    
    mockRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
    
    container.register("userRepository", mockRepository)
    userService = container.resolve("userService")
  })

  describe("create", () => {
    it("should create a new user with valid data", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        email: "john@example.com",
      }
      const expectedUser = { id: "user_123", ...userData }
      mockRepository.create.mockResolvedValue(expectedUser)

      // Act
      const result = await userService.create(userData)

      // Assert
      expect(mockRepository.create).toHaveBeenCalledWith(userData)
      expect(result).toEqual(expectedUser)
    })

    it("should throw validation error for invalid email", async () => {
      // Arrange
      const invalidUserData = {
        name: "John Doe",
        email: "invalid-email",
      }

      // Act & Assert
      await expect(userService.create(invalidUserData))
        .rejects
        .toThrow("Invalid email format")
    })
  })
})
```

### React Component Testing

```typescript
// components/__tests__/ProductCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { ProductCard } from "../ProductCard"
import { Product } from "../../types"

const mockProduct: Product = {
  id: "prod_123",
  title: "Test Product",
  description: "A test product",
  handle: "test-product",
  thumbnail: "/test-image.jpg",
  variants: [{
    id: "variant_123",
    prices: [{
      amount: 2000,
      currency_code: "usd",
    }],
  }],
}

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("$20.00")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test Product")
  })

  it("calls onAddToCart when add to cart button is clicked", () => {
    const mockOnAddToCart = jest.fn()
    
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    )
    
    fireEvent.click(screen.getByText("Add to Cart"))
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct.variants[0].id)
  })

  it("displays sold out state when no variants available", () => {
    const soldOutProduct = {
      ...mockProduct,
      variants: [],
    }
    
    render(<ProductCard product={soldOutProduct} />)
    
    expect(screen.getByText("Sold Out")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
```

### Hook Testing

```typescript
// hooks/__tests__/useCart.test.ts
import { renderHook, act } from "@testing-library/react"
import { useCart } from "../useCart"

// Mock the medusa SDK
jest.mock("../../lib/medusa", () => ({
  medusa: {
    store: {
      cart: {
        create: jest.fn(),
        lineItem: {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    },
  },
}))

describe("useCart", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart())
    
    expect(result.current.items).toEqual([])
    expect(result.current.total).toBe(0)
  })

  it("should add item to cart", async () => {
    const { result } = renderHook(() => useCart())
    
    await act(async () => {
      await result.current.addItem("variant_123", 2)
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })
})
```

## Integration Testing

### API Route Testing

```typescript
// api/__tests__/products.test.ts
import { createMedusaContainer } from "@medusajs/framework/utils"
import { medusaIntegrationTestRunner } from "@medusajs/test-utils"

medusaIntegrationTestRunner({
  testSuite: ({ getContainer, api }) => {
    describe("Products API", () => {
      let container: MedusaContainer

      beforeEach(() => {
        container = getContainer()
      })

      describe("GET /admin/products", () => {
        it("should return list of products", async () => {
          // Arrange - create test data
          const productService = container.resolve("productService")
          await productService.create({
            title: "Test Product",
            handle: "test-product",
          })

          // Act
          const response = await api.get("/admin/products")

          // Assert
          expect(response.status).toBe(200)
          expect(response.data.products).toHaveLength(1)
          expect(response.data.products[0].title).toBe("Test Product")
        })

        it("should filter products by title", async () => {
          // Arrange
          const productService = container.resolve("productService")
          await productService.create({
            title: "Product A",
            handle: "product-a",
          })
          await productService.create({
            title: "Product B",
            handle: "product-b",
          })

          // Act
          const response = await api.get("/admin/products?q=Product A")

          // Assert
          expect(response.status).toBe(200)
          expect(response.data.products).toHaveLength(1)
          expect(response.data.products[0].title).toBe("Product A")
        })
      })

      describe("POST /admin/products", () => {
        it("should create a new product", async () => {
          // Arrange
          const productData = {
            title: "New Product",
            handle: "new-product",
            description: "A new product",
          }

          // Act
          const response = await api.post("/admin/products", productData)

          // Assert
          expect(response.status).toBe(201)
          expect(response.data.product.title).toBe(productData.title)
          expect(response.data.product.handle).toBe(productData.handle)
        })

        it("should return validation error for invalid data", async () => {
          // Arrange
          const invalidData = {
            title: "", // Empty title should fail validation
          }

          // Act
          const response = await api.post("/admin/products", invalidData)

          // Assert
          expect(response.status).toBe(400)
          expect(response.data.errors).toBeDefined()
        })
      })
    })
  },
})
```

### Database Integration Testing

```typescript
// modules/__tests__/UserModule.integration.test.ts
import { createMedusaContainer } from "@medusajs/framework/utils"
import { DataSource } from "typeorm"

describe("User Module Integration", () => {
  let container: MedusaContainer
  let dataSource: DataSource

  beforeAll(async () => {
    container = createMedusaContainer()
    dataSource = container.resolve("dataSource")
    await dataSource.initialize()
  })

  afterAll(async () => {
    await dataSource.destroy()
  })

  beforeEach(async () => {
    // Clean database before each test
    await dataSource.query("TRUNCATE TABLE users CASCADE")
  })

  it("should persist user data correctly", async () => {
    // Arrange
    const userService = container.resolve("userService")
    const userData = {
      name: "John Doe",
      email: "john@example.com",
    }

    // Act
    const createdUser = await userService.create(userData)
    const retrievedUser = await userService.findById(createdUser.id)

    // Assert
    expect(retrievedUser).toBeDefined()
    expect(retrievedUser!.name).toBe(userData.name)
    expect(retrievedUser!.email).toBe(userData.email)
    expect(retrievedUser!.createdAt).toBeInstanceOf(Date)
  })

  it("should handle database constraints", async () => {
    // Arrange
    const userService = container.resolve("userService")
    const userData = {
      name: "John Doe",
      email: "john@example.com",
    }

    // Act - create first user
    await userService.create(userData)

    // Assert - creating user with same email should fail
    await expect(userService.create(userData))
      .rejects
      .toThrow("Email already exists")
  })
})
```

## End-to-End Testing

### User Workflow Testing

E2E tests verify complete user workflows using real browsers. Focus on:
- Critical user paths (checkout, registration, etc.)
- Cross-browser compatibility
- Real user interactions
- Complete system behavior

### Test Organization

```
apps/medusa/
├── integration-tests/
│   ├── http/              # API integration tests
│   │   └── [feature].spec.ts
│   └── modules/           # Module integration tests
│       └── [module].test.ts
└── src/
    └── [feature]/
        └── __tests__/     # Unit tests
            └── [unit].test.ts
```

## Best Practices

### Test Naming

```typescript
// Good: Describes behavior
it("should create user when valid data is provided", () => {})
it("should throw error when email is invalid", () => {})

// Bad: Describes implementation
it("should call createUser method", () => {})
it("should return 200", () => {})
```

### Test Data

```typescript
// Use factories for test data
function createMockProduct(overrides?: Partial<Product>): Product {
  return {
    id: "prod_123",
    title: "Test Product",
    handle: "test-product",
    ...overrides,
  }
}

// Usage
const product = createMockProduct({ title: "Custom Title" })
```

### Mocking

```typescript
// Mock external dependencies
jest.mock("@medusajs/js-sdk", () => ({
  Medusa: jest.fn().mockImplementation(() => ({
    store: {
      product: {
        list: jest.fn().mockResolvedValue({ products: [] }),
      },
    },
  })),
}))
```

### Cleanup

```typescript
// Always clean up after tests
afterEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  await cleanup()
})
```

## Testing Tools

- **Jest**: Test runner and assertion library
- **@testing-library/react**: React component testing
- **@testing-library/react-hooks**: Hook testing
- **@medusajs/test-utils**: Medusa integration testing utilities
- **supertest**: HTTP assertion library (for API tests)

## Common Patterns to Avoid

- Don't test implementation details
- Avoid testing third-party libraries
- Don't write tests that depend on other tests
- Avoid hardcoded test data when factories can be used
- Don't skip cleanup in afterEach/afterAll
- Avoid testing multiple behaviors in one test
- Don't use real external services in tests
