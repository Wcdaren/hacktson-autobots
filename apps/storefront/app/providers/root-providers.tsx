import { SearchProvider } from '@app/providers/search-provider';
import { StorefrontProvider, storefrontInitialState } from '@app/providers/storefront-provider';
import type { FC, PropsWithChildren } from 'react';

/**
 * Root Providers
 *
 * Wraps the application with all necessary context providers.
 * Provider order matters - outer providers are available to inner providers.
 *
 * Current providers:
 * - StorefrontProvider: Core storefront state (regions, cart, customer)
 * - SearchProvider: Elastic Search UI context for product search
 */
export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <StorefrontProvider data={storefrontInitialState}>
    <SearchProvider>{children}</SearchProvider>
  </StorefrontProvider>
);
