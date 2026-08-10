import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Resolve an optional image under `public/` at build time.
 *
 * Astro's frontmatter compiler can strip non-exported local helpers, and
 * optional editorial imagery (treatment heroes, CTA backdrops) should never
 * break a page when the file has not been generated yet — so resolution
 * lives here as a shared, testable helper.
 *
 * @param publicPath - Path under `public/` without extension, e.g.
 *   `'images/treatments/cardiology'`.
 * @param extensions - Extensions to probe, in priority order.
 * @returns The public URL (leading slash) or `null` when no file exists.
 */
export function resolvePublicImage(
  publicPath: string,
  extensions: string[] = ['webp', 'jpg']
): string | null {
  // process.cwd() is the project root in both Astro builds and vitest;
  // import.meta.url is unreliable here because bundling rewrites it.
  for (const ext of extensions) {
    if (existsSync(join(process.cwd(), 'public', `${publicPath}.${ext}`))) {
      return `/${publicPath}.${ext}`;
    }
  }
  return null;
}
