import { IconButton } from '@app/components/common/buttons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { type FC, useState } from 'react';
import { Link } from 'react-router';

interface CategoryWithChildren {
  id: string;
  name: string;
  handle: string;
  parent_category_id: string | null;
  children: CategoryWithChildren[];
}

export interface HeaderSideNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categoryTree: CategoryWithChildren[];
}

export const HeaderSideNav: FC<HeaderSideNavProps> = ({ open, setOpen, categoryTree }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <div className="flex grow flex-col overflow-y-auto bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <DialogTitle className="text-xl font-light tracking-[0.15em] text-gray-900">FURNISH</DialogTitle>
              <IconButton
                aria-label="close navigation menu"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                icon={XMarkIcon}
              />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <div className="space-y-1">
                {categoryTree.map((category) => (
                  <div key={category.id}>
                    {category.children.length > 0 ? (
                      <>
                        {/* 有子分类的父分类 */}
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center justify-between py-3 text-left text-gray-900 hover:text-gray-600 transition-colors"
                        >
                          <span className="text-base">{category.name}</span>
                          {expandedCategories.has(category.id) ? (
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        {/* 子分类列表 */}
                        <div
                          className={clsx(
                            'overflow-hidden transition-all duration-200',
                            expandedCategories.has(category.id) ? 'max-h-96' : 'max-h-0',
                          )}
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            <Link
                              to={`/categories/${category.handle}`}
                              onClick={handleLinkClick}
                              className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                            >
                              All {category.name}
                            </Link>
                            {category.children.map((child) => (
                              <Link
                                key={child.id}
                                to={`/categories/${child.handle}`}
                                onClick={handleLinkClick}
                                className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* 没有子分类的分类 */
                      <Link
                        to={`/categories/${category.handle}`}
                        onClick={handleLinkClick}
                        className="block py-3 text-base text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* 其他链接 */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link
                  to="/products"
                  onClick={handleLinkClick}
                  className="block py-3 text-base text-gray-900 hover:text-gray-600"
                >
                  All Products
                </Link>
                <Link
                  to="/about-us"
                  onClick={handleLinkClick}
                  className="block py-3 text-base text-gray-900 hover:text-gray-600"
                >
                  About Us
                </Link>
              </div>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
