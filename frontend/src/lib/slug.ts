/**
 * Derive a URL slug from a content entry id.
 *
 * Astro content entry ids now include a locale subfolder and may keep the
 * original file extension (e.g. `en/dr-rajesh-sharma.md`). This helper strips
 * both the locale prefix and the extension so the slug can be used in URLs.
 */
export function entrySlug(entry: { id: string }): string {
  return entry.id.replace(/\.(md|mdx)$/, '').replace(/^(en|bn)\//, '');
}
