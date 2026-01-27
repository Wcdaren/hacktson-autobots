import { type FC } from 'react';
import { StoreProduct } from '@medusajs/types';

export interface ProductSpecificationsProps {
  product: StoreProduct;
}

interface SpecificationItem {
  label: string;
  value: string;
}

/**
 * Displays product specifications from metadata
 * Shows material, care instructions, dimensions, and other product details
 */
export const ProductSpecifications: FC<ProductSpecificationsProps> = ({ product }) => {
  const metadata = product.metadata as Record<string, any> | null;

  if (!metadata) return null;

  const specifications: SpecificationItem[] = [];

  // Material & Construction
  if (metadata.material) {
    specifications.push({ label: 'Material', value: metadata.material as string });
  }
  if (metadata.filling) {
    specifications.push({ label: 'Filling', value: metadata.filling as string });
  }
  if (metadata.cover_type) {
    specifications.push({ label: 'Cover Type', value: metadata.cover_type as string });
  }

  // Dimensions
  if (metadata.dimensions) {
    specifications.push({ label: 'Dimensions', value: metadata.dimensions as string });
  }
  if (metadata.weight) {
    specifications.push({ label: 'Weight', value: metadata.weight as string });
  }
  if (metadata.seating_depth) {
    specifications.push({ label: 'Seating Depth', value: metadata.seating_depth as string });
  }
  if (metadata.seating_height) {
    specifications.push({ label: 'Seating Height', value: metadata.seating_height as string });
  }

  // Care & Warranty
  if (metadata.care) {
    specifications.push({ label: 'Care Instructions', value: metadata.care as string });
  }
  if (metadata.warranty) {
    specifications.push({ label: 'Warranty', value: metadata.warranty as string });
  }
  if (metadata.assembly) {
    specifications.push({ label: 'Assembly', value: metadata.assembly as string });
  }

  if (specifications.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        {specifications.map((spec, index) => (
          <div key={index} className="border-b border-gray-200 pb-3">
            <dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
