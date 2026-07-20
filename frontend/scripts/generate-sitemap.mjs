import { readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative, dirname } from 'node:path';

const SITE_URL = 'https://khanmeditour.com';
const DIST_DIR = fileURLToPath(new URL('../dist', import.meta.url));
const SITEMAP_PATH = fileURLToPath(new URL('../dist/sitemap-0.xml', import.meta.url));
const INDEX_PATH = fileURLToPath(new URL('../dist/sitemap-index.xml', import.meta.url));

const EXCLUDED_SEGMENTS = new Set(['_astro', 'chunks', 'pages', 'api']);

/**
 * Recursively collect URL paths for every index.html inside the dist folder.
 */
async function collectIndexHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const urls = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDED_SEGMENTS.has(entry.name)) continue;
      const subUrls = await collectIndexHtml(join(dir, entry.name));
      urls.push(...subUrls);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const rel = relative(String(DIST_DIR), join(dir, entry.name)).replace(/\\/g, '/');
      const path = rel.replace(/index\.html$/, '').replace(/\/$/, '');
      urls.push(path === '' ? '' : `/${path}`);
    }
  }
  return urls;
}

/**
 * Generate a sitemap file from the collected routes.
 */
async function main() {
  let paths = await collectIndexHtml(String(DIST_DIR));
  paths = paths.sort();
  paths = paths.filter((p, i, arr) => arr.indexOf(p) === i);

  const urlEntries = paths
    .map((path) => {
      const loc = `${SITE_URL}${path || '/'}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  await mkdir(String(DIST_DIR), { recursive: true });
  await writeFile(String(SITEMAP_PATH), sitemap);

  const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-0.xml</loc>\n  </sitemap>\n</sitemapindex>\n`;
  await writeFile(String(INDEX_PATH), index);

  console.log(`Generated sitemap with ${paths.length} URLs:`);
  paths.forEach((p) => console.log(`  ${p || '/'}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
