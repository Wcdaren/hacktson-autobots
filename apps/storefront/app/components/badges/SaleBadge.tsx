import { type FC } from 'react';
import { StoreProductVariant } from '@medusajs/types';
import { getVariantPrices } from '@libs/util/prices';
import isNumber from 'lodash/isNumber';

export interface SaleBadgeProps {
  variant?: StoreProductVariant;
  className?: string;
}

/**
 * Displays a sale badge when a variant has a discount
 * Calculates and shows the percentage discount
 */
export const SaleBadge: FC<SaleBadgeProps> = ({ variant, className = '' }) => {
  if (!variant) return null;

  const { original, calculated } = getVariantPrices(variant);
  const hasSale = isNumber(calculated) && isNumber(original) && calculated < original;

  if (!hasSale || !original || !calculated) return null;

  const discountPercentage = Math.round(((original - calculated) / original) * 100);

  return (
    <span
      className={`inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800 ${className}`}
    >
      Save {discountPercentage}%
    </span>
  );
};
