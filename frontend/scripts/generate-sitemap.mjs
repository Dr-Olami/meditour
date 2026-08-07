import { readdir, stat, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative, dirname } from 'node:path';

const SITE_URL = 'https://khanmeditour.com';

const LOCAL_DIST = fileURLToPath(new URL('../dist', import.meta.url));
const VERCEL_STATIC = fileURLToPath(new URL('../.vercel/output/static', import.meta.url));

async function findOutputDir() {
  for (const dir of [LOCAL_DIST, VERCEL_STATIC]) {
    try {
      await access(dir);
      return dir;
    } catch {
      continue;
    }
  }
  return LOCAL_DIST;
}

const EXCLUDED_SEGMENTS = new Set(['_astro', 'chunks', 'pages', 'api']);

/**
 * Recursively collect URL paths for every index.html inside the output folder.
 */
async function collectIndexHtml(dir, rootDir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const urls = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDED_SEGMENTS.has(entry.name)) continue;
      const subUrls = await collectIndexHtml(join(dir, entry.name), rootDir);
      urls.push(...subUrls);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const fullPath = join(dir, entry.name);
      const rel = relative(String(rootDir), fullPath).replace(/\\/g, '/');
      const path = rel.replace(/index\.html$/, '').replace(/\/$/, '');
      const fileStat = await stat(fullPath);
      urls.push({ path: path === '' ? '' : `/${path}`, lastmod: fileStat.mtime });
    }
  }
  return urls;
}

/**
 * Generate a sitemap file from the collected routes.
 */
async function main() {
  const outputDir = await findOutputDir();
  const sitemapPath = join(outputDir, 'sitemap-0.xml');
  const indexPath = join(outputDir, 'sitemap-index.xml');

  let paths = await collectIndexHtml(String(outputDir), String(outputDir));
  paths.sort((a, b) => a.path.localeCompare(b.path));
  paths = paths.filter((p, i, arr) => arr.findIndex((q) => q.path === p.path) === i);

  const urlEntries = paths
    .map((entry) => {
      const loc = `${SITE_URL}${entry.path || '/'}`;
      const lastmod = entry.lastmod.toISOString().split('T')[0];
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  await mkdir(String(outputDir), { recursive: true });
  await writeFile(String(sitemapPath), sitemap);

  const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-0.xml</loc>\n  </sitemap>\n</sitemapindex>\n`;
  await writeFile(String(indexPath), index);

  console.log(`Generated sitemap with ${paths.length} URLs in ${outputDir}:`);
  paths.forEach((p) => console.log(`  ${p.path || '/'}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
