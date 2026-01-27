import { IconButton } from '@app/components/common/buttons';
import { Container } from '@app/components/common/container/Container';
import { useCart } from '@app/hooks/useCart';
import { useRootLoaderData } from '@app/hooks/useRootLoaderData';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon';
import clsx from 'clsx';
import { type FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { HeaderSideNav } from './HeaderSideNav';

export type HeaderProps = {};

// 构建分类树结构
interface CategoryWithChildren {
  id: string;
  name: string;
  handle: string;
  parent_category_id: string | null;
  children: CategoryWithChildren[];
}

function buildCategoryTree(categories: any[]): CategoryWithChildren[] {
  const categoryMap = new Map<string, CategoryWithChildren>();

  // 先创建所有分类的映射
  categories.forEach((cat) => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  const rootCategories: CategoryWithChildren[] = [];

  // 构建树结构
  categories.forEach((cat) => {
    const category = categoryMap.get(cat.id)!;
    if (cat.parent_category_id) {
      const parent = categoryMap.get(cat.parent_category_id);
      if (parent) {
        parent.children.push(category);
      }
    } else {
      rootCategories.push(category);
    }
  });

  return rootCategories;
}

export const Header: FC<HeaderProps> = () => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { cart, toggleCartDrawer } = useCart();
  const rootLoader = useRootLoaderData();
  const hasProducts = rootLoader?.hasPublishedProducts;
  const categories = rootLoader?.categories || [];
  const location = useLocation();

  // 构建分类树
  const categoryTree = buildCategoryTree(categories);

  // Close dropdown on route change
  useEffect(() => {
    setActiveCategory(null);
  }, [location.pathname]);

  // 获取当前激活分类的子分类
  const activeCategoryData = categoryTree.find((cat) => cat.id === activeCategory);

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="bg-white border-b border-gray-100">
          <Container>
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Left: Mobile menu button */}
              <div className="flex items-center md:hidden">
                <IconButton
                  aria-label="open navigation menu"
                  onClick={() => setSideNavOpen(true)}
                  className="text-gray-700 hover:text-gray-900"
                  icon={Bars3Icon}
                />
              </div>

              {/* Logo */}
              <div className="flex-1 flex justify-center md:justify-start md:flex-none">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900">FURNISH</span>
                </Link>
              </div>

              {/* Desktop Navigation - 直接显示顶级分类 */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <div className="flex items-center gap-1">
                  {categoryTree.slice(0, 6).map((category) => (
                    <div
                      key={category.id}
                      className="relative"
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <Link
                        to={`/categories/${category.handle}`}
                        className={clsx(
                          'px-4 py-2 text-sm tracking-wide transition-colors',
                          activeCategory === category.id ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
                        )}
                      >
                        {category.name}
                      </Link>

                      {/* 子分类下拉菜单 */}
                      {category.children.length > 0 && activeCategory === category.id && (
                        <div className="absolute top-full left-0 pt-2 z-50">
                          <div className="bg-white border border-gray-100 rounded-lg shadow-lg py-2 min-w-[200px]">
                            <Link
                              to={`/categories/${category.handle}`}
                              className="block px-4 py-2 text-sm text-gray-900 font-medium hover:bg-gray-50"
                            >
                              All {category.name}
                            </Link>
                            <div className="border-t border-gray-100 my-1" />
                            {category.children.map((child) => (
                              <Link
                                key={child.id}
                                to={`/categories/${child.handle}`}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* 如果分类太多，显示更多链接 */}
                  {categoryTree.length > 6 && (
                    <Link
                      to="/products"
                      className="px-4 py-2 text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      More
                    </Link>
                  )}
                </div>
              </div>

              {/* Right: Cart */}
              <div className="flex items-center justify-end flex-1 md:flex-none">
                {!!cart && hasProducts && (
                  <button
                    aria-label="open shopping cart"
                    className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => toggleCartDrawer(true)}
                  >
                    <ShoppingBagIcon className="w-6 h-6" />
                    {cart.items && cart.items.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                        {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </Container>
        </nav>
      </header>

      <HeaderSideNav open={sideNavOpen} setOpen={setSideNavOpen} categoryTree={categoryTree} />
    </>
  );
};
