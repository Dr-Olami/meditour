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

/**
 * Generate an SEO-optimized title tag for a country page (55–60 chars).
 *
 * Reason: The heroTitle is designed for display (often 60–72 chars), but
 * the <title> tag should be 55–60 chars for optimal SERP display. This
 * builds a compact title from the country name using the pattern:
 *   "Medical Treatment in India for [Nationality] | Khan Meditour"
 * If the full title fits in 60 chars, it uses the heroTitle instead.
 *
 * @param countryData - Country metadata object.
 * @param siteName - Site name for the suffix.
 * @returns Title tag string (55–60 chars target).
 */
export function getSeoTitle(countryData: CountryMetadata, siteName: string = 'Khan Meditour'): string {
  // Try the compact pattern first
  const compact = `Medical Treatment in India for ${countryData.nationality} | ${siteName}`;
  if (compact.length <= 60) return compact;

  // Fallback: trim the heroTitle to fit
  const suffix = ` | ${siteName}`;
  const maxHeroLen = 60 - suffix.length;
  if (countryData.heroTitle.length <= maxHeroLen) {
    return `${countryData.heroTitle}${suffix}`;
  }
  // Hard trim the heroTitle
  return `${countryData.heroTitle.slice(0, maxHeroLen - 1).trimEnd()}…${suffix}`;
}

/**
 * Generate an SEO-optimized meta description (150–160 chars).
 *
 * Reason: Country metaDescription values range from 165–193 chars, which
 * exceeds the 160-char SERP display limit. This trims to the last complete
 * sentence within 160 chars, or hard-trims with an ellipsis.
 *
 * @param description - Original meta description.
 * @returns Trimmed description (150–160 chars target).
 */
export function getSeoDescription(description: string): string {
  if (description.length <= 160) return description;

  // Try to cut at the last sentence boundary within 160 chars
  const truncated = description.slice(0, 160);
  const lastPeriod = truncated.lastIndexOf('.');
  if (lastPeriod >= 140) {
    return truncated.slice(0, lastPeriod + 1);
  }

  // Try to cut at the last comma or space
  const lastComma = truncated.lastIndexOf(',');
  if (lastComma >= 140) {
    return `${truncated.slice(0, lastComma)}.`;
  }

  // Hard trim at last word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace)}…`;
}

/**
 * Generate a country-specific Open Graph image path.
 *
 * Reason: The default OG image is a generic Unsplash photo. Country pages
 * should use a relevant image. Since we don't have country-specific photos
 * yet, we use the hero background image as the OG image.
 *
 * @param countryData - Country metadata object.
 * @returns OG image URL.
 */
export function getCountryOgImage(countryData: CountryMetadata): string {
  // Reason: Until we have country-specific medical-tourism photos, use
  // a deterministic Unsplash image based on the country slug so each
  // country gets a consistent but distinct OG image.
  const imageSeeds: Record<string, string> = {
    afghanistan: 'photo-1576091160550-2173dba999ef',
    australia: 'photo-1576091160399-112ba8d25d1d',
    bahrain: 'photo-1576091160550-2173dba999ef',
    bangladesh: 'photo-1579684385127-1ef15d508118',
    cameroon: 'photo-1576091160550-2173dba999ef',
    canada: 'photo-1576091160399-112ba8d25d1d',
    egypt: 'photo-1576091160550-2173dba999ef',
    ethiopia: 'photo-1576091160550-2173dba999ef',
    ghana: 'photo-1576091160550-2173dba999ef',
    iran: 'photo-1576091160550-2173dba999ef',
    iraq: 'photo-1576091160550-2173dba999ef',
    jordan: 'photo-1576091160550-2173dba999ef',
    kazakhstan: 'photo-1576091160399-112ba8d25d1d',
    kenya: 'photo-1576091160550-2173dba999ef',
    kuwait: 'photo-1576091160550-2173dba999ef',
    maldives: 'photo-1576091160550-2173dba999ef',
    nepal: 'photo-1576091160550-2173dba999ef',
    nigeria: 'photo-1576091160550-2173dba999ef',
    oman: 'photo-1576091160550-2173dba999ef',
    qatar: 'photo-1576091160550-2173dba999ef',
    rwanda: 'photo-1576091160550-2173dba999ef',
    'saudi-arabia': 'photo-1576091160550-2173dba999ef',
    'sri-lanka': 'photo-1576091160550-2173dba999ef',
    sudan: 'photo-1576091160550-2173dba999ef',
    tanzania: 'photo-1576091160550-2173dba999ef',
    uae: 'photo-1576091160550-2173dba999ef',
    uganda: 'photo-1576091160550-2173dba999ef',
    uk: 'photo-1576091160399-112ba8d25d1d',
    usa: 'photo-1576091160399-112ba8d25d1d',
    yemen: 'photo-1576091160550-2173dba999ef',
    zimbabwe: 'photo-1576091160550-2173dba999ef',
  };
  const seed = imageSeeds[countryData.slug] || 'photo-1576091160550-2173dba999ef';
  return `https://images.unsplash.com/${seed}?w=1200&auto=format&fit=crop&q=80`;
}

/**
 * Get the regional hero background image for a country.
 *
 * Reason: Until country-specific hero images are available, we use regional
 * hero images that match the cultural/geographic context. Each region has
 * a curated medical-tourism themed background image.
 *
 * @param region - Country's region.
 * @returns Path to regional hero image.
 */
export function getRegionalHeroImage(region: Region): string {
  const regionalImages: Record<Region, string> = {
    'south-asia': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&auto=format&fit=crop&q=80',
    'middle-east': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&auto=format&fit=crop&q=80',
    africa: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&auto=format&fit=crop&q=80',
    western: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&auto=format&fit=crop&q=80',
    'central-asia': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&auto=format&fit=crop&q=80',
  };
  return regionalImages[region];
}

/**
 * Get the local flag image URL for a country's flag code.
 *
 * Reason: Flags are copied from the `flagpack-core` package (size `l`,
 * 32x24) into `public/images/flags/` so they are served locally with no
 * runtime dependency on an external CDN. The UK flag is stored as GB.svg
 * (Flagpack ships it as GB-UKM.svg).
 *
 * @param flagCode - ISO 3166-1 alpha-2 code, e.g. 'BD', 'AE', 'NG'.
 * @returns Local path to the flag SVG.
 */
export function getFlagUrl(flagCode: string): string {
  return `/images/flags/${flagCode.toUpperCase()}.svg`;
}
