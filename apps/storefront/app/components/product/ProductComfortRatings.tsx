import { type FC } from 'react';
import { StoreProduct } from '@medusajs/types';

export interface ProductComfortRatingsProps {
  product: StoreProduct;
}

/**
 * Displays comfort ratings for furniture products
 * Shows visual rating bars for firmness, support, etc.
 */
export const ProductComfortRatings: FC<ProductComfortRatingsProps> = ({ product }) => {
  const metadata = product.metadata as Record<string, any> | null;
  const comfortRatings = metadata?.comfort_ratings as Record<string, string> | undefined;

  if (!comfortRatings || Object.keys(comfortRatings).length === 0) return null;

  const parseRating = (value: string): number => {
    // Try to extract numeric value from strings like "4/5", "4 out of 5", "80%"
    const match = value.match(/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      // Normalize to 0-5 scale
      if (value.includes('%')) return (num / 100) * 5;
      if (value.includes('/')) return num;
      return Math.min(num, 5);
    }
    return 0;
  };

  const formatLabel = (key: string): string => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const ratings = Object.entries(comfortRatings).map(([key, value]) => ({
    label: formatLabel(key),
    value: parseRating(value),
    rawValue: value,
  }));

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comfort Ratings</h3>
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{rating.label}</span>
              <span className="text-sm text-gray-500">{rating.rawValue}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${(rating.value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
