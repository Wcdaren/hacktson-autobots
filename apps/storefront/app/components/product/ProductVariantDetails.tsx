import { type FC } from 'react';
import { StoreProductVariant } from '@medusajs/types';

export interface ProductVariantDetailsProps {
  variant: StoreProductVariant | undefined;
}

/**
 * Displays variant-specific information inline with product details
 * Following Castlery's pattern: variant info is shown directly in the product area,
 * NOT as a separate tab. Updates automatically when user changes SKU.
 *
 * Examples:
 * - Fabric composition for sofas
 * - Wood finish for furniture
 * - Material details specific to this variant
 */
export const ProductVariantDetails: FC<ProductVariantDetailsProps> = ({ variant }) => {
  if (!variant || !variant.metadata) return null;

  const metadata = variant.metadata as Record<string, any>;
  const details: Array<{ label: string; value: string }> = [];

  // Extract variant-specific properties
  if (metadata.fabric_composition) {
    details.push({ label: 'Fabric', value: metadata.fabric_composition as string });
  }
  if (metadata.material) {
    details.push({ label: 'Material', value: metadata.material as string });
  }
  if (metadata.finish) {
    details.push({ label: 'Finish', value: metadata.finish as string });
  }
  if (metadata.color) {
    details.push({ label: 'Color', value: metadata.color as string });
  }

  if (details.length === 0) return null;

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <dl className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <dt className="font-medium text-gray-600">{detail.label}:</dt>
            <dd className="text-gray-900">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
