import { SearchProvider } from '@app/providers/search-provider';
import { StorefrontProvider, storefrontInitialState } from '@app/providers/storefront-provider';
import { useRootLoaderData } from '@app/hooks/useRootLoaderData';
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
 *   - Always uses hybrid search (keyword + semantic) - transparent to users
 *   - Connects to Medusa backend for AI-powered search
 *   - Region-aware pricing based on user's selected region
 */
export const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  const data = useRootLoaderData();
  const env = data?.env;
  const backendUrl = env?.PUBLIC_MEDUSA_API_URL || 'http://localhost:9000';
  const publishableApiKey = env?.MEDUSA_PUBLISHABLE_KEY || '';
  const regionId = data?.region?.id;

  return (
    <StorefrontProvider data={storefrontInitialState}>
      <SearchProvider backendUrl={backendUrl} publishableApiKey={publishableApiKey} regionId={regionId}>
        {children}
      </SearchProvider>
    </StorefrontProvider>
  );
};
