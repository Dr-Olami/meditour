/**
 * Country metadata index — aggregates all 29 country definitions and exposes
 * helper functions for use in Astro pages and content filtering.
 *
 * File structure:
 *   countries/
 *   ├── types.ts                    — TypeScript interfaces
 *   ├── shared.ts                   — Shared cost data, visa step templates
 *   ├── south-asia.ts               — 5 countries (Afghanistan, Bangladesh, Maldives, Nepal, Sri Lanka)
 *   ├── middle-east-1.ts            — 6 countries (Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, UAE)
 *   ├── middle-east-2.ts            — 5 countries (Egypt, Iran, Iraq, Jordan, Yemen)
 *   ├── africa-1.ts                 — 5 countries (Ethiopia, Ghana, Kenya, Nigeria, Tanzania)
 *   ├── africa-2.ts                 — 5 countries (Cameroon, Rwanda, Sudan, Uganda, Zimbabwe)
 *   └── western-central-asia.ts     — 5 countries (Australia, Canada, Kazakhstan, UK, USA)
 */

import type { CountryMetadata, Region } from './types';
import { southAsiaCountries } from './south-asia';
import { middleEastCountriesPart1 } from './middle-east-1';
import { middleEastCountriesPart2 } from './middle-east-2';
import { africaCountriesPart1 } from './africa-1';
import { africaCountriesPart2 } from './africa-2';
import { westernAndCentralAsiaCountries } from './western-central-asia';

export type { CountryMetadata, Region } from './types';
export type {
  CurrencyInfo,
  CityRecommendation,
  TreatmentCost,
  VisaStep,
  CountryFAQItem,
} from './types';

/** All 29 country metadata records, aggregated from regional files. */
export const ALL_COUNTRIES: CountryMetadata[] = [
  ...southAsiaCountries,
  ...middleEastCountriesPart1,
  ...middleEastCountriesPart2,
  ...africaCountriesPart1,
  ...africaCountriesPart2,
  ...westernAndCentralAsiaCountries,
];

/** Country metadata keyed by slug for O(1) lookup. */
const COUNTRIES_BY_SLUG: Record<string, CountryMetadata> = Object.fromEntries(
  ALL_COUNTRIES.map((country) => [country.slug, country]),
);

/**
 * Retrieve country metadata by URL slug.
 *
 * @param slug - Country slug (e.g. 'bangladesh', 'uae', 'nigeria').
 * @returns Country metadata, or undefined if the slug is not recognized.
 */
export function getCountryMetadata(slug: string): CountryMetadata | undefined {
  return COUNTRIES_BY_SLUG[slug];
}

/**
 * Retrieve all country slugs — used by Astro `getStaticPaths()`.
 *
 * @returns Array of all 29 country slugs.
 */
export function getAllCountrySlugs(): string[] {
  return ALL_COUNTRIES.map((country) => country.slug);
}

/**
 * Retrieve all countries in a given region.
 *
 * @param region - Geographic region ('south-asia', 'middle-east', 'africa', 'western', 'central-asia').
 * @returns Array of country metadata in that region.
 */
export function getCountriesByRegion(region: Region): CountryMetadata[] {
  return ALL_COUNTRIES.filter((country) => country.region === region);
}

/**
 * Retrieve related countries from the same region (excluding the given country).
 * Used for "Related countries" linking on country landing pages.
 *
 * @param slug - Country slug to find related countries for.
 * @param limit - Maximum number of related countries to return (default 4).
 * @returns Array of related country metadata.
 */
export function getRelatedCountries(slug: string, limit = 4): CountryMetadata[] {
  const country = getCountryMetadata(slug);
  if (!country) return [];
  return getCountriesByRegion(country.region)
    .filter((c) => c.slug !== slug)
    .slice(0, limit);
}

/**
 * Get all countries grouped by region.
 * Useful for rendering a country directory page.
 *
 * @returns Object mapping region names to arrays of country metadata.
 */
export function getCountriesGroupedByRegion(): Record<Region, CountryMetadata[]> {
  return {
    'south-asia': getCountriesByRegion('south-asia'),
    'middle-east': getCountriesByRegion('middle-east'),
    africa: getCountriesByRegion('africa'),
    western: getCountriesByRegion('western'),
    'central-asia': getCountriesByRegion('central-asia'),
  };
}

/**
 * Get the total count of countries.
 *
 * @returns Total number of countries (should be 29).
 */
export function getCountryCount(): number {
  return ALL_COUNTRIES.length;
}

/**
 * Get human-readable region label for display.
 *
 * @param region - Region identifier.
 * @returns Display label (e.g. 'South Asia', 'Middle East & GCC').
 */
export function getRegionLabel(region: Region): string {
  const labels: Record<Region, string> = {
    'south-asia': 'South Asia',
    'middle-east': 'Middle East & GCC',
    africa: 'Africa',
    western: 'Western Countries',
    'central-asia': 'Central Asia',
  };
  return labels[region];
}

/**
 * Get all country names for a given region (for navigation/footer).
 *
 * @param region - Region identifier.
 * @returns Array of country names.
 */
export function getCountryNamesByRegion(region: Region): string[] {
  return getCountriesByRegion(region).map((c) => c.name);
}

/**
 * Format the "patients treated" stat for a country page.
 *
 * Reason: computing this inline in the [country].astro frontmatter triggers
 * an esbuild parse error on optional-property ternaries; isolating the
 * computation here keeps the template clean and the logic testable.
 *
 * @param country - Country metadata.
 * @returns Display value like '1.2K+', or '1K+' when no volume is recorded.
 */
export function formatPatientsTreated(country: CountryMetadata): string {
  const count = country.patientsTreated;
  if (!count) return '1K+';
  // Sub-1K volumes read better as exact counts ("300+") than decimals ("0.3K+").
  if (count < 1000) return `${count}+`;
  return `${Math.round(count / 100) / 10}K+`;
}

/**
 * Shorten a flight time string for compact stat display.
 *
 * Reason: `flightTime` values like "6 hours from Cairo" or
 * "10–12 hours from Douala (1–2 stops)" are too long for the 4xl stat
 * counter and overflow on mobile. This extracts just the duration portion
 * (e.g. "6h", "15–18h", "2.5h") for the stat, while the full descriptive
 * string remains in the "Easy Travel" card where it has room to breathe.
 *
 * @param flightTime - Full flight time string from country metadata.
 * @returns Shortened duration like "6h" or "15–18h".
 */
export function formatFlightTimeShort(flightTime: string): string {
  // Match the leading duration: "6 hours", "15–18 hours", "2.5 hours", "8–10 hours"
  const match = flightTime.match(/^([\d.]+(?:–[\d.]+)?)\s*hours?/i);
  if (!match) return flightTime;
  return `${match[1]}h`;
}

/**
 * Map treatment slugs to display categories for cost cards.
 *
 * Reason: Treatment slugs like "cardiology" or "neuro-and-spine-surgery"
 * need human-readable category labels for the cost comparison cards.
 * This provides consistent naming across the site.
 *
 * @param slug - Treatment slug from country metadata.
 * @returns Display category name.
 */
export function getTreatmentCategory(slug: string): string {
  const categoryMap: Record<string, string> = {
    'cardiology': 'Cardiology',
    'cancer-treatment': 'Oncology',
    'orthopedics-surgery': 'Orthopedics',
    'organ-treatment': 'Transplant',
    'infertility-treatment': 'Fertility',
    'neuro-and-spine-surgery': 'Neurosurgery',
    'cosmetic-surgery': 'Cosmetic',
    'ophthalmology': 'Ophthalmology',
    'dental-treatment': 'Dental',
    'bariatric-surgery': 'Bariatric',
  };
  return categoryMap[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Format treatment slug to display name.
 *
 * @param slug - Treatment slug.
 * @returns Human-readable treatment name.
 */
export function getTreatmentName(slug: string): string {
  const nameMap: Record<string, string> = {
    'cardiology': 'Heart Surgery',
    'cancer-treatment': 'Cancer Treatment',
    'orthopedics-surgery': 'Knee/Hip Replacement',
    'organ-treatment': 'Kidney Transplant',
    'infertility-treatment': 'IVF Treatment',
    'neuro-and-spine-surgery': 'Spine Surgery',
    'cosmetic-surgery': 'Cosmetic Surgery',
    'ophthalmology': 'Eye Surgery',
    'dental-treatment': 'Dental Implants',
    'bariatric-surgery': 'Weight Loss Surgery',
  };
  return nameMap[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
