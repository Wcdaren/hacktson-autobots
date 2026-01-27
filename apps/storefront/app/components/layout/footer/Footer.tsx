import { Container } from '@app/components/common/container/Container';
import { Select } from '@app/components/common/forms/inputs/Select';
import { useRegion } from '@app/hooks/useRegion';
import { useRegions } from '@app/hooks/useRegions';
import { useRootLoaderData } from '@app/hooks/useRootLoaderData';
import { useSiteDetails } from '@app/hooks/useSiteDetails';
import { convertToFormData } from '@libs/util/forms/objectToFormData';
import { useMemo } from 'react';
import { Link, useFetcher } from 'react-router';
import { StripeSecurityImage } from '../../images/StripeSecurityImage';

export const Footer = () => {
  const { settings } = useSiteDetails();
  const rootData = useRootLoaderData();
  const hasProducts = rootData?.hasPublishedProducts;
  const categories = rootData?.categories || [];
  const fetcher = useFetcher();
  const { regions } = useRegions();
  const { region } = useRegion();

  // Filter to only show top-level categories
  const topLevelCategories = categories.filter((cat) => !cat.parent_category_id);

  const regionOptions = useMemo(() => {
    return (regions || []).map((region) => ({
      label: `${region.name} (${region.currency_code?.toUpperCase()})`,
      value: region.id,
    }));
  }, [regions]);

  const onRegionChange = (regionId: string) => {
    fetcher.submit(
      convertToFormData({
        regionId,
      }),
      { method: 'post', action: '/api/region' },
    );
  };

  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-light tracking-[0.2em] mb-6 block">
              FURNISH
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Quality furniture for modern living. Thoughtfully designed, expertly crafted.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Shop</p>
            <nav className="space-y-3">
              <Link to="/products" className="block text-sm text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
              {topLevelCategories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.handle}`}
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Company</p>
            <nav className="space-y-3">
              <Link to="/about-us" className="block text-sm text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <span className="block text-sm text-gray-300">Contact</span>
              <span className="block text-sm text-gray-300">FAQ</span>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Contact</p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>support@furnish.com</p>
              <p>Mon - Fri: 9AM - 6PM</p>
            </div>

            {regionOptions.length > 1 && (
              <div className="mt-6">
                <Select
                  className="!text-sm bg-gray-800 border-gray-700 text-white !shadow-none"
                  options={regionOptions}
                  defaultValue={region?.id}
                  onChange={(e) => onRegionChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Furnish. All rights reserved.</p>
          {hasProducts && <StripeSecurityImage className="opacity-50" />}
        </div>
      </Container>
    </footer>
  );
};
