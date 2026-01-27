import { type FC, useState } from 'react';
import { StoreProduct } from '@medusajs/types';
import { ProductSpecifications } from './ProductSpecifications';
import { ProductComfortRatings } from './ProductComfortRatings';

export interface ProductDetailsTabsProps {
  product: StoreProduct;
}

type TabId = 'description' | 'details' | 'comfort';

interface Tab {
  id: TabId;
  label: string;
  show: boolean;
}

/**
 * Tabbed interface for product information
 * Following Castlery's design pattern:
 * - Description: Product description
 * - Product Details: Specifications, materials, dimensions
 * - Comfort: Comfort ratings (for furniture)
 *
 * Note: Variant-specific info is NOT in tabs - it's displayed in the main product area
 */
export const ProductDetailsTabs: FC<ProductDetailsTabsProps> = ({ product }) => {
  const metadata = product.metadata as Record<string, any> | null;

  const hasSpecifications =
    metadata && (metadata.material || metadata.dimensions || metadata.care || metadata.warranty);
  const hasComfortRatings = metadata?.comfort_ratings && Object.keys(metadata.comfort_ratings).length > 0;

  const tabs: Tab[] = [
    { id: 'description', label: 'Description', show: !!product.description },
    { id: 'details', label: 'Product Details', show: !!hasSpecifications },
    { id: 'comfort', label: 'Comfort', show: !!hasComfortRatings },
  ].filter((tab) => tab.show);

  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id || 'description');

  if (tabs.length === 0) return null;

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Product information">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && product.description && (
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-base text-gray-700">{product.description}</div>
          </div>
        )}

        {activeTab === 'details' && hasSpecifications && <ProductSpecifications product={product} />}

        {activeTab === 'comfort' && hasComfortRatings && <ProductComfortRatings product={product} />}
      </div>
    </div>
  );
};
