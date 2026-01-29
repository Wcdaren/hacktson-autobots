/**
 * IntentChips Component
 *
 * Displays extracted search intent as interactive chips.
 * Shows constraints like colors, price ranges, materials, categories, and styles.
 * Allows users to remove individual constraints.
 *
 * @module app/components/search/IntentChips
 */
import { type FC } from 'react';

/**
 * Search intent structure from backend
 */
export interface SearchIntent {
  original_query: string;
  detected_language: 'en' | 'zh' | 'mixed';
  visual_reference?: string;
  constraints: SearchConstraints;
  search_type: 'text_only' | 'image_only' | 'mixed_modal';
}

/**
 * Search constraints extracted from query
 */
export interface SearchConstraints {
  colors?: string[];
  price_min?: number;
  price_max?: number;
  materials?: string[];
  categories?: string[];
  styles?: string[];
  size_constraints?: string;
  custom_filters?: Record<string, unknown>;
}

/**
 * Props for the IntentChips component
 */
export interface IntentChipsProps {
  /** Extracted search intent */
  intent: SearchIntent;
  /** Callback when a constraint is removed */
  onConstraintRemove: (constraintType: string, value: string) => void;
  /** Callback to clear all constraints */
  onClearAll?: () => void;
  /** Custom class name for the container */
  className?: string;
}

/**
 * Chip component for individual constraints
 */
interface ChipProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onRemove: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'gray';
}

const Chip: FC<ChipProps> = ({ label, value, icon, onRemove, color = 'gray' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    green: 'bg-green-100 text-green-800 hover:bg-green-200',
    purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${colorClasses[color]}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>
        {label}: {value}
      </span>
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 ml-1 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded-full"
        aria-label={`Remove ${label} ${value}`}
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

/**
 * IntentChips Component
 *
 * Displays extracted search constraints as interactive chips.
 *
 * Features:
 * - Color chips with color indicator
 * - Price range display
 * - Material/style/category tags
 * - Remove individual constraints
 * - Clear all button
 * - Responsive layout
 *
 * @example
 * ```tsx
 * import { IntentChips } from "@app/components/search/IntentChips"
 *
 * function SearchResults() {
 *   const [intent, setIntent] = useState<SearchIntent>(...)
 *
 *   const handleRemove = (type: string, value: string) => {
 *     // Remove constraint and re-search
 *   }
 *
 *   return (
 *     <IntentChips
 *       intent={intent}
 *       onConstraintRemove={handleRemove}
 *       onClearAll={() => setIntent(null)}
 *     />
 *   )
 * }
 * ```
 */
export const IntentChips: FC<IntentChipsProps> = ({ intent, onConstraintRemove, onClearAll, className = '' }) => {
  const { constraints } = intent;

  // Check if there are any constraints to display
  const hasConstraints =
    (constraints.colors && constraints.colors.length > 0) ||
    constraints.price_min !== undefined ||
    constraints.price_max !== undefined ||
    (constraints.materials && constraints.materials.length > 0) ||
    (constraints.categories && constraints.categories.length > 0) ||
    (constraints.styles && constraints.styles.length > 0) ||
    constraints.size_constraints;

  if (!hasConstraints) {
    return null;
  }

  // Color icon
  const ColorIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Price icon
  const PriceIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Material icon
  const MaterialIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  );

  // Category icon
  const CategoryIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );

  // Style icon
  const StyleIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">
          {intent.detected_language === 'zh' ? '识别的搜索意图' : 'Extracted Intent'}
        </h3>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:underline"
          >
            {intent.detected_language === 'zh' ? '清除全部' : 'Clear all'}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Color chips */}
        {constraints.colors?.map((color) => (
          <Chip
            key={`color-${color}`}
            label={intent.detected_language === 'zh' ? '颜色' : 'Color'}
            value={color}
            icon={<ColorIcon />}
            onRemove={() => onConstraintRemove('colors', color)}
            color="blue"
          />
        ))}

        {/* Price range chip */}
        {(constraints.price_min !== undefined || constraints.price_max !== undefined) && (
          <Chip
            label={intent.detected_language === 'zh' ? '价格' : 'Price'}
            value={
              constraints.price_min !== undefined && constraints.price_max !== undefined
                ? `${constraints.price_min} - ${constraints.price_max}`
                : constraints.price_min !== undefined
                  ? `≥ ${constraints.price_min}`
                  : `≤ ${constraints.price_max}`
            }
            icon={<PriceIcon />}
            onRemove={() => onConstraintRemove('price', 'range')}
            color="green"
          />
        )}

        {/* Material chips */}
        {constraints.materials?.map((material) => (
          <Chip
            key={`material-${material}`}
            label={intent.detected_language === 'zh' ? '材质' : 'Material'}
            value={material}
            icon={<MaterialIcon />}
            onRemove={() => onConstraintRemove('materials', material)}
            color="purple"
          />
        ))}

        {/* Category chips */}
        {constraints.categories?.map((category) => (
          <Chip
            key={`category-${category}`}
            label={intent.detected_language === 'zh' ? '类别' : 'Category'}
            value={category}
            icon={<CategoryIcon />}
            onRemove={() => onConstraintRemove('categories', category)}
            color="orange"
          />
        ))}

        {/* Style chips */}
        {constraints.styles?.map((style) => (
          <Chip
            key={`style-${style}`}
            label={intent.detected_language === 'zh' ? '风格' : 'Style'}
            value={style}
            icon={<StyleIcon />}
            onRemove={() => onConstraintRemove('styles', style)}
            color="gray"
          />
        ))}

        {/* Size constraints chip */}
        {constraints.size_constraints && (
          <Chip
            label={intent.detected_language === 'zh' ? '尺寸' : 'Size'}
            value={constraints.size_constraints}
            onRemove={() => onConstraintRemove('size_constraints', constraints.size_constraints!)}
            color="gray"
          />
        )}
      </div>
    </div>
  );
};

export default IntentChips;
