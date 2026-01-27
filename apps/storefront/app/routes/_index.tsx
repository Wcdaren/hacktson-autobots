import { Container } from '@app/components/common/container';
import ProductList from '@app/components/sections/ProductList';
import { getMergedPageMeta } from '@libs/util/page';
import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Link } from 'react-router';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function IndexRoute() {
  return (
    <>
      {/* Hero - Minimal, typography-focused */}
      <section className="bg-[#F5F5F0] min-h-[70vh] flex items-center">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">Modern Living</p>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight mb-8">
              Furniture designed for the way you live
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl">
              Thoughtfully crafted pieces that bring comfort and style to every room.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Shop Collection
            </Link>
          </div>
        </Container>
      </section>

      {/* Value Props - Clean grid */}
      <section className="py-20 border-b border-gray-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Quality</p>
              <p className="text-gray-600">Premium materials built to last</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Design</p>
              <p className="text-gray-600">Timeless aesthetics for any space</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Delivery</p>
              <p className="text-gray-600">Free white-glove service</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <ProductList
        className="py-20"
        heading="New Arrivals"
        actions={[
          {
            label: 'View All',
            url: '/products',
          },
        ]}
      />

      {/* About Section */}
      <section className="bg-[#F5F5F0] py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-relaxed mb-8">
              We believe great design should be accessible. Every piece in our collection balances form, function, and
              affordability.
            </h2>
            <Link
              to="/about-us"
              className="inline-block text-sm uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Ready to transform your space?</h2>
            <Link
              to="/products"
              className="inline-block bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
