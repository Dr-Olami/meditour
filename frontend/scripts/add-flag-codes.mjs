#!/usr/bin/env node
/**
 * Add flagCode field to all country metadata definitions.
 * 
 * Reason: Phase 5.3 requires ISO 3166-1 alpha-2 flag codes for Flagpack integration.
 * This script adds the `flagCode` field after the `region` field in each country definition.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const countriesDir = join(__dirname, '../src/data/countries');

// Map of country slugs to ISO 3166-1 alpha-2 codes
const flagCodes = {
  // South Asia
  'bangladesh': 'BD',
  'afghanistan': 'AF',
  'nepal': 'NP',
  'sri-lanka': 'LK',
  'maldives': 'MV',
  
  // Middle East Part 1
  'bahrain': 'BH',
  'kuwait': 'KW',
  'oman': 'OM',
  'qatar': 'QA',
  'saudi-arabia': 'SA',
  'uae': 'AE',
  
  // Middle East Part 2
  'egypt': 'EG',
  'iran': 'IR',
  'iraq': 'IQ',
  'jordan': 'JO',
  'yemen': 'YE',
  
  // Africa Part 1
  'ethiopia': 'ET',
  'ghana': 'GH',
  'kenya': 'KE',
  'nigeria': 'NG',
  'tanzania': 'TZ',
  
  // Africa Part 2
  'cameroon': 'CM',
  'rwanda': 'RW',
  'sudan': 'SD',
  'uganda': 'UG',
  'zimbabwe': 'ZW',
  
  // Western & Central Asia
  'australia': 'AU',
  'canada': 'CA',
  'kazakhstan': 'KZ',
  'uk': 'GB',
  'usa': 'US',
};

const files = [
  'south-asia.ts',
  'middle-east-1.ts',
  'middle-east-2.ts',
  'africa-1.ts',
  'africa-2.ts',
  'western-central-asia.ts',
];

let totalAdded = 0;

for (const file of files) {
  const filePath = join(countriesDir, file);
  let content = readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [slug, code] of Object.entries(flagCodes)) {
    // Pattern: match "region: 'xxx'," followed by optional whitespace and newline,
    // but NOT already followed by flagCode
    const regionPattern = new RegExp(
      `(slug: '${slug}',\\s+nationality: '[^']+',\\s+region: '[^']+',)(?!\\s*flagCode:)`,
      'g'
    );

    if (regionPattern.test(content)) {
      content = content.replace(
        regionPattern,
        `$1\n  flagCode: '${code}',`
      );
      console.log(`✓ Added flagCode '${code}' for ${slug} in ${file}`);
      modified = true;
      totalAdded++;
    }
  }

  if (modified) {
    writeFileSync(filePath, content, 'utf8');
  }
}

console.log(`\n✅ Added ${totalAdded} flag codes across ${files.length} files.`);
