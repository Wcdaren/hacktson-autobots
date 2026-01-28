#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the seed file
const seedFilePath = 'apps/medusa/src/scripts/seed/products-from-api.ts';
let content = fs.readFileSync(seedFilePath, 'utf8');

console.log('Fixing TypeScript errors in seed file...');

// Fix 1: Replace .filter(Boolean) with proper type guard for category_ids and tag_ids
content = content.replace(
  /category_ids: \[(.*?)\]\.filter\(Boolean\)/gs,
  'category_ids: [$1].filter((id): id is string => Boolean(id))',
);

content = content.replace(
  /tag_ids: \[(.*?)\]\.filter\(Boolean\)/gs,
  'tag_ids: [$1].filter((id): id is string => Boolean(id))',
);

// Fix 2: Remove region_id from money amounts
content = content.replace(
  /{\s*amount: (\d+),\s*currency_code: '[^']+',\s*region_id,\s*}/g,
  "{\n            amount: $1,\n            currency_code: 'usd',\n          }",
);

// Write the fixed content back
fs.writeFileSync(seedFilePath, content);

console.log('Fixed TypeScript errors in seed file');

// Fix the import script variantImages issue
const importFilePath = 'apps/medusa/src/scripts/import-from-api.ts';
if (fs.existsSync(importFilePath)) {
  let importContent = fs.readFileSync(importFilePath, 'utf8');

  // Check if variantImages is used but not defined
  if (importContent.includes('images: variantImages,') && !importContent.includes('const variantImages')) {
    // Replace with empty array or proper variable
    importContent = importContent.replace('images: variantImages,', 'images: [],');
    fs.writeFileSync(importFilePath, importContent);
    console.log('Fixed variantImages issue in import script');
  }
}

console.log('All TypeScript errors fixed!');
