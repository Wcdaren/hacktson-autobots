import { Image } from '@app/components/common/images/Image';
import { StoreProduct } from '@medusajs/types';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export interface ProductThumbnailProps extends HTMLAttributes<HTMLElement> {
  product: StoreProduct;
  isTransitioning?: boolean;
}

export const ProductThumbnail: FC<ProductThumbnailProps> = ({ product, className, isTransitioning, ...props }) => {
  const thumbnailImage = (product.images && product.images[0] && product.images[0].url) || product.thumbnail;
  const hoverImage = product.images && product.images[1] && product.images[1].url;

  return (
    <figure
      className={clsx(
        'product-thumbnail',
        'aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg border border-black border-opacity-5 bg-white',
        className,
      )}
      style={{
        viewTransitionName: isTransitioning ? 'product-thumbnail' : undefined,
      }}
      {...props}
    >
      {hoverImage && (
        <Image
          loading="lazy"
          src={hoverImage}
          alt={product.title}
          className="h-full w-full object-contain object-center opacity-0 transition-all duration-300 group-hover/product-card:scale-105 group-hover/product-card:opacity-100"
        />
      )}
      {thumbnailImage ? (
        <Image
          loading="lazy"
          src={thumbnailImage}
          alt={product.title}
          className={clsx('h-full w-full object-contain object-center transition-all duration-300', {
            'group-hover/product-card:opacity-0': hoverImage,
            'group-hover/product-card:opacity-75': !hoverImage,
          })}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400 group-hover/product-card:opacity-75">
          No Image
        </div>
      )}
    </figure>
  );
};
