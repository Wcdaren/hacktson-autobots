import { Container } from '@app/components/common/container';
import { getMergedPageMeta } from '@libs/util/page';
import type { LoaderFunctionArgs, MetaFunction } from 'react-router';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function AboutUsRoute() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-accent-50 py-16 md:py-24">
        <Container>
          <div className="text-center w-full space-y-6 max-w-4xl mx-auto">
            <h4 className="text-lg md:text-xl font-italiana tracking-wider">ABOUT US</h4>
            <h1 className="text-4xl md:text-7xl font-italiana">Our Story</h1>
            <p className="mx-auto text-lg md:text-xl text-gray-700 max-w-3xl">
              At Furnish, we're more than just a furniture store—we're your partner in creating beautiful living spaces.
              We curate exceptional furniture that combines timeless design with modern comfort.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 justify-center">
              <a
                href="/products"
                className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition-colors"
              >
                Shop Our Collection
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <Container className="py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-italiana text-center mb-12">What We Believe</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We source materials responsibly and work with craftsmen who share our commitment to the environment.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3">Quality</h3>
            <p className="text-gray-600">
              Every piece is built to last, using premium materials and time-tested construction techniques.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold mb-3">Design</h3>
            <p className="text-gray-600">
              We believe great design should be accessible to everyone, blending form and function beautifully.
            </p>
          </div>
        </div>
      </Container>

      {/* Mission Section */}
      <section className="bg-accent-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-italiana mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              We started Furnish with a simple goal: to help people create homes they love. We believe that your living
              space should reflect who you are and support how you live.
            </p>
            <p className="text-lg text-gray-700">
              That's why we carefully curate each piece in our collection, ensuring it meets our high standards for
              quality, comfort, and design. From statement sofas to functional storage solutions, every item is chosen
              to help you build a space that's uniquely yours.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <Container className="py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-italiana mb-6">Ready to transform your space?</h2>
          <a
            href="/products"
            className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition-colors"
          >
            Browse Our Collection
          </a>
        </div>
      </Container>
    </>
  );
}
