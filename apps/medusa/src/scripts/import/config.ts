import { z } from 'zod';
import type { ImportConfig } from './types';

const ConfigSchema = z.object({
  maxProducts: z.number().positive().default(40),
  apiBaseUrl: z.string().url(),
  sitemapUrl: z.string().url(),
  concurrency: z.number().min(1).max(10).default(5),
  region: z.enum(['sg', 'us', 'au']).default('sg'),
  retryAttempts: z.number().min(0).max(5).default(3),
  retryDelay: z.number().positive().default(1000),
  dryRun: z.boolean().default(false),
  verbose: z.boolean().default(false),
  specificSlugs: z.array(z.string()).optional(),
});

export function loadConfig(): ImportConfig {
  return ConfigSchema.parse({
    maxProducts: parseInt(process.env.MAX_PRODUCTS || '40'),
    apiBaseUrl: process.env.API_BASE_URL || 'https://apigw-sg-prod.castlery.com/v2/products',
    sitemapUrl: process.env.SITEMAP_URL || 'https://www.castlery.com/sg/sitemap.xml',
    concurrency: parseInt(process.env.CONCURRENCY || '5'),
    region: process.env.REGION || 'sg',
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(process.env.RETRY_DELAY || '1000'),
    dryRun: process.argv.includes('--dry-run'),
    verbose: process.argv.includes('--verbose'),
    specificSlugs: process.env.SPECIFIC_SLUGS?.split(','),
  });
}
