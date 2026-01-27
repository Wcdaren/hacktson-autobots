import ProductList from '@app/components/sections/ProductList';
import { ProductTemplate } from '@app/templates/ProductTemplate';
import { getMergedProductMeta } from '@libs/util/products';
import { fetchProducts } from '@libs/util/server/products.server';
import { type LoaderFunctionArgs, type MetaFunction, redirect } from 'react-router';
import { useLoaderData } from 'react-router';

export const loader = async (args: LoaderFunctionArgs) => {
  const { products } = await fetchProducts(args.request, {
    handle: args.params.productHandle,
    fields: '*categories',
  });

  if (!products.length) throw redirect('/404');

  const product = products[0];

  return { product };
};

export type ProductPageLoaderData = typeof loader;

export const meta: MetaFunction<ProductPageLoaderData> = getMergedProductMeta;

export default function ProductDetailRoute() {
  const { product } = useLoaderData<ProductPageLoaderData>();

  return (
    <>
      <ProductTemplate product={product} />
      <ProductList className="!pb-[100px] xl:px-9" heading="You may also like" />
    </>
  );
}
