/**
 * Audit script: dump all pullQuote frontmatter values for quality review.
 *
 * Flags quotes that look like meta-text (references to "these areas",
 * "this field", "the field", etc.) rather than patient-centered emotional
 * beats.
 */
import fs from 'node:fs';
import path from 'node:path';

const META_PATTERNS = [
  /\bthese areas\b/i,
  /\bthis field\b/i,
  /\bthe field\b/i,
  /\bareas of focus\b/i,
  /\bdemonstrated by\b/i,
  /\bis evident\b/i,
  /\bis shown\b/i,
  /\bhis dedication\b.*\bdemonstrated\b/i,
];

let total = 0;
let flagged = 0;

for (const loc of ['en', 'bn']) {
  const dir = path.join('src/content/doctors', loc);
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const m = content.match(/^pullQuote: (.*)$/m);
    if (!m) continue;
    total++;
    const quote = m[1].replace(/^"|"$/g, '');
    const isMeta = META_PATTERNS.some((p) => p.test(quote));
    if (isMeta) {
      flagged++;
      console.log(`[META] ${loc}/${file}:`);
      console.log(`  ${quote.slice(0, 150)}`);
    }
  }
}

console.log(`\n${flagged}/${total} quotes flagged as potential meta-text.`);
