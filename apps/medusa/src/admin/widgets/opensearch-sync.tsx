/**
 * OpenSearch Sync Widget
 *
 * Admin widget that provides a button to manually trigger
 * product synchronization to OpenSearch.
 *
 * Displayed in the Products list page header.
 */

import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Button, Container, Heading, Text, toast } from '@medusajs/ui';
import { useState } from 'react';

const OpenSearchSyncWidget = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<{ count: number; time: Date } | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);

    try {
      const response = await fetch('/admin/opensearch/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ limit: 1000, offset: 0 }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Sync failed');
      }

      const result = await response.json();

      setLastSync({
        count: result.data?.synced_count || 0,
        time: new Date(),
      });

      toast.success('Sync Complete', {
        description: `Successfully synced ${result.data?.synced_count || 0} products to OpenSearch`,
      });
    } catch (error) {
      toast.error('Sync Failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">OpenSearch Sync</Heading>
          <Text className="text-ui-fg-subtle" size="small">
            Sync products to OpenSearch for search functionality
          </Text>
          {lastSync && (
            <Text className="text-ui-fg-muted" size="xsmall">
              Last sync: {lastSync.count} products at {lastSync.time.toLocaleTimeString()}
            </Text>
          )}
        </div>
        <Button variant="secondary" onClick={handleSync} isLoading={isSyncing} disabled={isSyncing}>
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </Button>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: 'product.list.before',
});

export default OpenSearchSyncWidget;
