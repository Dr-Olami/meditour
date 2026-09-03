/**
 * Bengali country metadata index.
 *
 * Reason: per the user's chosen content model, Bengali country data lives in
 * a separate `bn/` directory mirroring the English structure. Only countries
 * with a full Bengali translation are exported here; other countries remain
 * English-only and the /bn/countries directory links to their English pages.
 *
 * Currently translated: Bangladesh (the primary Bengali-speaking market).
 */
import type { CountryMetadata } from '../types';
import { bangladeshBn } from './bangladesh';

export type { CountryMetadata, Region } from '../types';

/** All Bengali-translated country metadata records. */
export const ALL_BN_COUNTRIES: CountryMetadata[] = [bangladeshBn];

/** Bengali country metadata keyed by slug for O(1) lookup. */
const BN_COUNTRIES_BY_SLUG: Record<string, CountryMetadata> = Object.fromEntries(
  ALL_BN_COUNTRIES.map((country) => [country.slug, country]),
);

/**
 * Retrieve Bengali country metadata by URL slug.
 *
 * @param slug - Country slug (e.g. 'bangladesh').
 * @returns Bengali country metadata, or undefined if no Bengali translation exists.
 */
export function getBnCountryMetadata(slug: string): CountryMetadata | undefined {
  return BN_COUNTRIES_BY_SLUG[slug];
}

/**
 * Retrieve all slugs that have a Bengali country page.
 * Used by the Bengali country template's `getStaticPaths()`.
 *
 * @returns Array of country slugs with Bengali translations.
 */
export function getAllBnCountrySlugs(): string[] {
  return ALL_BN_COUNTRIES.map((country) => country.slug);
}

/**
 * Check whether a country slug has a Bengali translation.
 *
 * @param slug - Country slug.
 * @returns True if a Bengali country page exists for this slug.
 */
export function hasBnCountryPage(slug: string): boolean {
  return slug in BN_COUNTRIES_BY_SLUG;
}
