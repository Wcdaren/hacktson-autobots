import { ScrollArrowButtons } from '@app/components/common/buttons/ScrollArrowButtons';
import { Image } from '@app/components/common/images/Image';
import { LightboxGallery } from '@app/components/common/images/LightboxGallery';
import { useScrollArrows } from '@app/hooks/useScrollArrows';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import { StoreProduct, StoreProductVariant } from '@medusajs/types';
import clsx from 'clsx';
import { FC, memo, useMemo, useState } from 'react';

export interface ProductGalleryImage {
  id: string;
  url: string;
  alt?: string;
  name?: string;
}

// Extended variant type to include images (available when +variants.images is requested)
interface VariantWithImages extends StoreProductVariant {
  images?: Array<{ id: string; url: string }>;
}

export interface ProductImageGalleryProps {
  product: StoreProduct;
  selectedVariant?: VariantWithImages;
}

const GalleryImagesRow: FC<{ galleryImages: ProductGalleryImage[] }> = memo(({ galleryImages }) => {
  return (
    <>
      {galleryImages.map((image) => (
        <Tab
          key={image.id}
          className={
            'relative mb-0 mr-2 inline-block h-16 w-16 cursor-pointer snap-start whitespace-nowrap rounded-md bg-white text-sm font-bold uppercase text-gray-900 last:mb-0 last:mr-0 hover:bg-gray-50 focus:outline-none focus:ring-0 lg:mb-2 lg:mr-0 lg:whitespace-normal'
          }
        >
          {({ selected }) => (
            <>
              <span className="sr-only">{image.name}</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  key={image.id}
                  src={image.url}
                  alt={image.alt || 'tab for image gallery'}
                  className={'h-full w-full object-cover object-center'}
                />
              </span>
              <span
                className={clsx('pointer-events-none absolute inset-0 rounded-md border border-gray-200', {
                  '!border-primary-500 border-2': selected,
                })}
                aria-hidden="true"
              />
            </>
          )}
        </Tab>
      ))}
    </>
  );
});

export const ProductImageGallery: FC<ProductImageGalleryProps> = ({ product, selectedVariant }) => {
  const { images: productImages = [], thumbnail } = product;
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Get images for the selected variant, fallback to product images
  const gallery: ProductGalleryImage[] = useMemo(() => {
    // Check for variant images (from Medusa's native variant-image association)
    if (selectedVariant?.images && selectedVariant.images.length > 0) {
      return selectedVariant.images.map((img, idx) => ({
        id: img.id || `variant-img-${idx}`,
        name: `${selectedVariant.title} - Image ${idx + 1}`,
        url: img.url,
        alt: `${selectedVariant.title} - ${product.title}`,
      }));
    }

    // Fallback: Check variant metadata for images (legacy support)
    const variantMetadata = selectedVariant?.metadata as Record<string, unknown> | undefined;
    if (variantMetadata?.images && Array.isArray(variantMetadata.images) && variantMetadata.images.length > 0) {
      return (variantMetadata.images as string[]).map((url, idx) => ({
        id: `variant-meta-img-${idx}`,
        name: `${selectedVariant?.title} - Image ${idx + 1}`,
        url,
        alt: `${selectedVariant?.title} - ${product.title}`,
      }));
    }

    // Otherwise use product images
    if (productImages && productImages.length > 0) {
      return productImages.map((img, idx) => ({
        id: img.id || `product-img-${idx}`,
        name: `${product.title} - Image ${idx + 1}`,
        url: img.url,
        alt: product.description || product.title,
      }));
    }

    // Fallback to thumbnail
    if (thumbnail) {
      return [
        {
          id: 'thumbnail',
          name: `Thumbnail for ${product.title}`,
          url: thumbnail,
          alt: product.description || product.title,
        },
      ];
    }

    return [];
  }, [selectedVariant, productImages, thumbnail, product.title, product.description]);

  const { scrollableDivRef, showStartArrow, showEndArrow, handleArrowClick } = useScrollArrows({
    buffer: 50,
    resetOnDepChange: [product, selectedVariant?.id],
  });

  return (
    <TabGroup as="div" className="flex flex-col-reverse gap-4 lg:flex-row" key={selectedVariant?.id || 'no-variant'}>
      <h2 className="sr-only">Images</h2>
      {gallery.length > 1 && (
        <div className="flex-grow-1 relative mx-auto mb-12 block h-8 w-full lg:mb-0 lg:h-auto lg:max-w-[68px]">
          <TabList
            ref={scrollableDivRef}
            className="absolute bottom-0 left-0 right-0 top-0 h-20 snap-both snap-proximity overflow-x-auto whitespace-nowrap pb-3 lg:-right-4 lg:bottom-0 lg:h-auto lg:overflow-y-auto lg:overflow-x-hidden lg:whitespace-normal lg:px-0 lg:py-0"
          >
            <GalleryImagesRow galleryImages={gallery} />
          </TabList>

          <ScrollArrowButtons
            className="hidden lg:-ml-[18px] lg:flex"
            orientation="vertical"
            showStartArrow={showStartArrow}
            showEndArrow={showEndArrow}
            handleArrowClick={handleArrowClick}
          />
          <ScrollArrowButtons
            className="flex lg:-ml-4 lg:hidden"
            showStartArrow={showStartArrow}
            showEndArrow={showEndArrow}
            handleArrowClick={handleArrowClick}
          />
        </div>
      )}

      <TabPanels className="flex-grow-1 w-full">
        <div className="aspect-1 relative">
          {gallery.length > 0 ? (
            gallery.map((image) => (
              <TabPanel
                key={image.id}
                className="group relative h-full w-full cursor-pointer overflow-hidden sm:rounded-md"
                onClick={() => setLightboxIndex(gallery.indexOf(image))}
              >
                <Image
                  key={image.id}
                  style={{
                    viewTransitionName: 'product-thumbnail',
                  }}
                  src={image.url}
                  alt={image.alt || 'selected image for product'}
                  className="absolute h-full w-full border-b border-b-gray-200 object-contain object-center sm:rounded-md sm:border sm:border-gray-200"
                />
                <div className="absolute right-2 top-2 flex items-center justify-center rounded-xl bg-gray-800 p-2 opacity-0 transition-all hover:!opacity-75 active:!opacity-95 group-hover:opacity-50">
                  <MagnifyingGlassPlusIcon className="h-6 w-6 text-white" />
                </div>
              </TabPanel>
            ))
          ) : (
            <div className="absolute flex h-full w-full items-center justify-center border-b border-b-gray-200 object-cover object-center sm:rounded-md sm:border sm:border-gray-200">
              No Image
            </div>
          )}
        </div>
      </TabPanels>
      <LightboxGallery
        images={gallery.map((image) => ({
          src: image.url,
          alt: image.alt || 'Product image',
        }))}
        lightBoxIndex={lightboxIndex}
        setLightBoxIndex={setLightboxIndex}
      />
    </TabGroup>
  );
};
