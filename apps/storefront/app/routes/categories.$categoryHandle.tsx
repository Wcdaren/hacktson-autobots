import { Container } from '@app/components/common/container';
import { ProductListWithPagination } from '@app/components/product/ProductListWithPagination';
import { listCategories } from '@libs/util/server/data/categories.server';
import { fetchProducts } from '@libs/util/server/products.server';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { Link, useLoaderData } from 'react-router';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const handle = params.categoryHandle as string;

  const categories = await listCategories();

  const category = categories.find((c) => c.handle === handle);

  if (!category) {
    throw redirect('/products');
  }

  // 找到当前分类的子分类
  const childCategories = categories.filter((c) => c.parent_category_id === category.id);

  // 找到父分类（如果有）
  const parentCategory = category.parent_category_id
    ? categories.find((c) => c.id === category.parent_category_id)
    : null;

  const { products, count, limit, offset } = await fetchProducts(request, {
    category_id: category.id,
  });

  return {
    products,
    count,
    limit,
    offset,
    category,
    childCategories,
    parentCategory,
  };
};

export type ProductCategoryRouteLoader = typeof loader;

export default function ProductCategoryRoute() {
  const data = useLoaderData<ProductCategoryRouteLoader>();

  if (!data) return null;

  const { products, count, limit, offset, category, childCategories, parentCategory } = data;

  return (
    <Container className="pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-8 mb-6">
        <Link to="/products" className="hover:text-gray-900 transition-colors">
          All Products
        </Link>
        {parentCategory && (
          <>
            <span className="text-gray-300">/</span>
            <Link to={`/categories/${parentCategory.handle}`} className="hover:text-gray-900 transition-colors">
              {parentCategory.name}
            </Link>
          </>
        )}
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">{category.name}</h1>
        {category.description && <p className="text-gray-600 max-w-2xl">{category.description}</p>}
      </div>

      {/* 子分类 - 只在有子分类时显示 */}
      {childCategories.length > 0 && (
        <div className="mb-10">
          <div className="flex flex-wrap gap-3">
            {childCategories.map((child) => (
              <Link
                key={child.id}
                to={`/categories/${child.handle}`}
                className="px-5 py-2.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          {count} {count === 1 ? 'product' : 'products'}
        </p>
        <ProductListWithPagination products={products} paginationConfig={{ count, offset, limit }} context="products" />
      </div>
    </Container>
  );
}
