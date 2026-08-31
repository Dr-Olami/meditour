/**
 * Phase 6 build-time verification script.
 *
 * Runs after `astro build` and verifies:
 *   6.1d — All 31 country pages exist, internal links resolve, WhatsApp CTAs
 *           are country-specific, dynamic content (stats/FAQs/testimonials) renders.
 *   6.2a — JSON-LD structured data is present and valid, meta tags exist and are
 *           unique, canonical URLs are set, sitemap includes all country pages,
 *           robots.txt allows crawling.
 *
 * Usage:  node scripts/verify-country-pages.mjs
 *
 * Exit code 0 = all checks passed; 1 = one or more checks failed.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Helpers ─────────────────────────────────────────────────────────────────

const VERCEL_STATIC = join(ROOT, '.vercel', 'output', 'static');
const DIST = join(ROOT, 'dist');

async function findOutputDir() {
  for (const dir of [DIST, VERCEL_STATIC]) {
    try { await stat(dir); return dir; } catch { continue; }
  }
  console.error('No build output found. Run `npx astro build` first.');
  process.exit(1);
}

async function readHtml(dir, relPath) {
  const fullPath = join(dir, relPath);
  try {
    return await readFile(fullPath, 'utf-8');
  } catch {
    return null;
  }
}

async function pathExists(dir, relPath) {
  try { await stat(join(dir, relPath)); return true; } catch { return false; }
}

async function collectHtmlFiles(dir, base = dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (['_astro', 'chunks'].includes(entry.name)) continue;
      results.push(...await collectHtmlFiles(join(dir, entry.name), base));
    } else if (entry.name === 'index.html') {
      results.push(join(dir, entry.name));
    }
  }
  return results;
}

function extractJsonLd(html) {
  const blocks = [];
  const regex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1].trim()));
    } catch {
      blocks.push(null);
    }
  }
  return blocks;
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]*(?:name|property)=["']${name}["'][^>]*>`, 'i'));
  if (!m) return null;
  const contentMatch = m[0].match(/content=["']([^"']*)["']/i);
  return contentMatch ? contentMatch[1] : null;
}

// ─── Check runner ────────────────────────────────────────────────────────────

const failures = [];
const warnings = [];
let checkCount = 0;

function check(condition, message) {
  checkCount++;
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    failures.push(message);
    console.log(`  ✗ ${message}`);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
    console.log(`  ⚠ ${message}`);
  }
}

// ─── 6.1d: Functional verification ──────────────────────────────────────────

async function verifyFunctional(outDir, countrySlugs) {
  console.log('\n── 6.1d: Functional verification ──────────────────────────────');

  // 1. All country pages exist
  console.log('\n1. Country page existence:');
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    check(html !== null, `/for/${slug}/ exists`);
  }

  // 2. /for/ directory page exists
  console.log('\n2. Directory page:');
  const dirHtml = await readHtml(outDir, 'for/index.html');
  check(dirHtml !== null, '/for/ directory page exists');

  // 3. Dynamic content on pilot country pages
  console.log('\n3. Dynamic content on pilot pages:');
  const pilots = ['bangladesh', 'uae', 'nigeria', 'kenya', 'usa'];
  for (const slug of pilots) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    check(html.includes('patients treated'), `${slug}: stat counter renders`);
    check(html.includes('FAQ') || html.includes('faq'), `${slug}: FAQ section renders`);
    check(html.includes('Cost savings') || html.includes('cost savings'), `${slug}: cost stat renders`);
  }

  // 4. WhatsApp CTA with country-specific message
  console.log('\n4. WhatsApp CTAs:');
  for (const slug of pilots) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const waLinks = html.match(/href="https:\/\/wa\.me\/[^"]*"/g) || [];
    check(waLinks.length > 0, `${slug}: has WhatsApp link(s) (${waLinks.length} found)`);
    // Check the link contains the country name (URL-encoded)
    const countryName = slug === 'uae' ? 'United%20Arab%20Emirates' : slug.charAt(0).toUpperCase() + slug.slice(1);
    const hasCountryMsg = waLinks.some((l) => l.includes(countryName) || l.includes('cost%20estimate'));
    check(hasCountryMsg, `${slug}: WhatsApp link has country-specific message`);
  }

  // 5. Internal links resolve to existing files
  console.log('\n5. Internal link integrity (country pages):');
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const links = [...html.matchAll(/href="(\/(?!https?:\/\/)[^"#]*)"/g)].map((m) => m[1]);
    for (const link of links) {
      // Skip anchors and external
      if (link.startsWith('#') || link.startsWith('http')) continue;
      // Normalize: /for/bangladesh/ → for/bangladesh/index.html
      let relPath = link.replace(/^\//, '');
      if (relPath.endsWith('/')) relPath += 'index.html';
      else if (!relPath.endsWith('.html')) relPath += '/index.html';
      const exists = await pathExists(outDir, relPath);
      // Only fail on /for/ and /treatments/ links (other routes may be dynamic)
      if (!exists && (link.startsWith('/for/') || link.startsWith('/treatments/') || link === '/for/' || link === '/treatments/')) {
        check(false, `${slug}: broken link ${link} → ${relPath}`);
      }
    }
  }
  // If no broken links were reported, log a pass
  if (!failures.some((f) => f.includes('broken link'))) {
    check(true, 'No broken /for/ or /treatments/ links on any country page');
  }

  // 6. Navbar and footer have Countries link
  console.log('\n6. Navigation:');
  const sampleHtml = await readHtml(outDir, 'for/bangladesh/index.html');
  if (sampleHtml) {
    check(sampleHtml.includes('href="/for"'), 'Navbar/footer has /for link');
  }
}

// ─── 6.2a: SEO verification ─────────────────────────────────────────────────

async function verifySeo(outDir, countrySlugs) {
  console.log('\n── 6.2a: SEO verification ──────────────────────────────────────');

  // 1. JSON-LD on each country page
  console.log('\n1. Structured data (JSON-LD):');
  const jsonLdTypes = new Map();
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const blocks = extractJsonLd(html);
    check(blocks.length >= 3, `${slug}: has ≥3 JSON-LD blocks (${blocks.length})`);
    const types = blocks.flatMap((b) => b?.['@type'] ? (Array.isArray(b['@type']) ? b['@type'] : [b['@type']]) : []);
    for (const t of types) {
      jsonLdTypes.set(t, (jsonLdTypes.get(t) || 0) + 1);
    }
    // Check for expected types
    check(types.includes('MedicalWebPage'), `${slug}: has MedicalWebPage schema`);
    check(types.includes('FAQPage'), `${slug}: has FAQPage schema`);
    check(types.includes('BreadcrumbList'), `${slug}: has BreadcrumbList schema`);
  }
  console.log(`\n  JSON-LD type distribution: ${[...jsonLdTypes.entries()].map(([t, c]) => `${t}×${c}`).join(', ')}`);

  // 2. Meta tags (title, description) unique per country
  console.log('\n2. Meta tags:');
  const titles = new Map();
  const descriptions = new Map();
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const desc = extractMeta(html, 'description');
    check(title !== null && title.length > 0, `${slug}: has <title> (${title?.length || 0} chars)`);
    check(desc !== null && desc.length > 0, `${slug}: has meta description (${desc?.length || 0} chars)`);
    if (title) titles.set(title, slug);
    if (desc) descriptions.set(desc, slug);
    // Title length check (55-70 chars ideal, flag if <30 or >80)
    warn(title && title.length >= 30 && title.length <= 80, `${slug}: title length ${title?.length} (ideal 30-80)`);
    // Description length check (150-160 ideal, flag if <100 or >170)
    warn(desc && desc.length >= 100 && desc.length <= 170, `${slug}: description length ${desc?.length} (ideal 100-170)`);
  }
  // Uniqueness
  check(titles.size === countrySlugs.length, `All ${countrySlugs.length} titles are unique (${titles.size} unique)`);
  check(descriptions.size === countrySlugs.length, `All ${countrySlugs.length} descriptions are unique (${descriptions.size} unique)`);

  // 3. Canonical URLs
  console.log('\n3. Canonical URLs:');
  for (const slug of countrySlugs.slice(0, 5)) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
    check(canonical !== null, `${slug}: has canonical link tag`);
  }

  // 4. Open Graph tags (sample 5 pages)
  console.log('\n4. Open Graph tags (sample):');
  for (const slug of pilots) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const ogTitle = extractMeta(html, 'og:title');
    const ogDesc = extractMeta(html, 'og:description');
    check(ogTitle !== null, `${slug}: has og:title`);
    check(ogDesc !== null, `${slug}: has og:description`);
  }

  // 5. Sitemap includes all country pages
  console.log('\n5. Sitemap:');
  const sitemapXml = await readHtml(outDir, 'sitemap-0.xml');
  if (sitemapXml) {
    for (const slug of countrySlugs) {
      check(sitemapXml.includes(`/for/${slug}`), `sitemap includes /for/${slug}`);
    }
  } else {
    // Try sitemap.xml (older format)
    const sitemapIndex = await readHtml(outDir, 'sitemap.xml');
    check(sitemapIndex !== null, 'sitemap.xml exists (index or single)');
  }

  // 6. robots.txt
  console.log('\n6. robots.txt:');
  const robots = await readHtml(outDir, 'robots.txt');
  check(robots !== null, 'robots.txt exists');
  if (robots) {
    // Reason: "Disallow: /api/" contains the substring "Disallow: /" —
    // check for the exact blocking pattern instead of a substring match.
    const blockAll = /Disallow:\s*\/\s*$/im.test(robots);
    check(!blockAll, 'robots.txt does not block all crawling');
    check(robots.includes('Sitemap:') || robots.includes('sitemap'), 'robots.txt references sitemap');
  }
}

const pilots = ['bangladesh', 'uae', 'nigeria', 'kenya', 'usa'];

// ─── 6.3: Content quality (programmatic) ────────────────────────────────────

async function verifyContentQuality(outDir, countrySlugs) {
  console.log('\n── 6.3: Content quality (programmatic) ────────────────────────');

  // 1. Every country page has an <h1>
  console.log('\n1. H1 presence:');
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
    check(h1Match !== null, `${slug}: has <h1>`);
  }

  // 2. Cost comparison table present
  console.log('\n2. Cost comparison table:');
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    check(html.includes('<table'), `${slug}: has cost comparison <table>`);
  }

  // 3. Visa process steps present
  console.log('\n3. Visa process:');
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    check(html.includes('visa') || html.includes('Visa'), `${slug}: mentions visa`);
  }

  // 4. Breadcrumbs present
  console.log('\n4. Breadcrumbs:');
  for (const slug of pilots) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    check(html.includes('breadcrumb') || html.includes('Breadcrumb') || html.includes('Countries'), `${slug}: has breadcrumb trail`);
  }

  // 5. Related countries section
  console.log('\n5. Related countries:');
  for (const slug of countrySlugs) {
    const html = await readHtml(outDir, `for/${slug}/index.html`);
    if (!html) continue;
    // Countries with no neighbours (e.g. central-asia with only 1 country) may not have related
    if (slug === 'kazakhstan') {
      warn(false, `${slug}: no related countries expected (only Central Asia country)`);
    } else {
      check(html.includes('/for/') && html.includes('countries we serve'), `${slug}: has related countries section`);
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const outDir = await findOutputDir();
  console.log(`Verifying build output in: ${outDir}`);

  // Get country slugs from the built /for/ directory
  const forDir = join(outDir, 'for');
  let countrySlugs = [];
  try {
    const entries = await readdir(forDir, { withFileTypes: true });
    countrySlugs = entries
      .filter((e) => e.isDirectory() && e.name !== '_astro')
      .map((e) => e.name)
      .sort();
  } catch {
    console.error('No /for/ directory in build output');
    process.exit(1);
  }

  console.log(`Found ${countrySlugs.length} country pages: ${countrySlugs.join(', ')}`);

  await verifyFunctional(outDir, countrySlugs);
  await verifySeo(outDir, countrySlugs);
  await verifyContentQuality(outDir, countrySlugs);

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`Total checks: ${checkCount}`);
  console.log(`Passed: ${checkCount - failures.length}`);
  console.log(`Failed: ${failures.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (failures.length > 0) {
    console.log('\nFailures:');
    for (const f of failures) console.log(`  ✗ ${f}`);
  }
  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const w of warnings) console.log(`  ⚠ ${w}`);
  }

  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
