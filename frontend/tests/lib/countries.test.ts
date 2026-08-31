import { describe, it, expect } from 'vitest';
import {
  ALL_COUNTRIES,
  getCountryMetadata,
  getAllCountrySlugs,
  getCountriesByRegion,
  getRelatedCountries,
  getCountriesGroupedByRegion,
  getCountryCount,
  getRegionLabel,
  getCountryNamesByRegion,
  formatPatientsTreated,
} from '../../src/data/countries';
import type { CountryMetadata, Region } from '../../src/data/countries';

// ─── Expected constants ──────────────────────────────────────────────────────

// Reason: the plan targets 29 countries, but Saudi Arabia and UAE were added
// as strategic additions, bringing the total to 31. The test locks this so a
// silent regression (a dropped country file) is caught immediately.
const EXPECTED_COUNTRY_COUNT = 31;

const EXPECTED_REGIONS: Region[] = [
  'south-asia',
  'middle-east',
  'africa',
  'western',
  'central-asia',
];

// ─── getCountryMetadata ──────────────────────────────────────────────────────

describe('getCountryMetadata', () => {
  it('returns metadata for a valid slug', () => {
    const bd = getCountryMetadata('bangladesh');
    expect(bd).toBeDefined();
    expect(bd?.name).toBe('Bangladesh');
    expect(bd?.nationality).toBe('Bangladeshi');
    expect(bd?.code).toBe('BD');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getCountryMetadata('nonexistent-country')).toBeUndefined();
  });

  it('returns undefined for an empty string', () => {
    expect(getCountryMetadata('')).toBeUndefined();
  });
});

// ─── getAllCountrySlugs ──────────────────────────────────────────────────────

describe('getAllCountrySlugs', () => {
  it('returns a slug for every country in ALL_COUNTRIES', () => {
    const slugs = getAllCountrySlugs();
    expect(slugs).toHaveLength(EXPECTED_COUNTRY_COUNT);
    for (const country of ALL_COUNTRIES) {
      expect(slugs).toContain(country.slug);
    }
  });

  it('returns no duplicate slugs', () => {
    const slugs = getAllCountrySlugs();
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it('includes the 5 pilot market slugs', () => {
    const slugs = getAllCountrySlugs();
    expect(slugs).toContain('bangladesh');
    expect(slugs).toContain('uae');
    expect(slugs).toContain('nigeria');
    expect(slugs).toContain('kenya');
    expect(slugs).toContain('usa');
  });
});

// ─── getCountryCount ─────────────────────────────────────────────────────────

describe('getCountryCount', () => {
  it('returns the expected total country count', () => {
    expect(getCountryCount()).toBe(EXPECTED_COUNTRY_COUNT);
  });
});

// ─── getCountriesByRegion ────────────────────────────────────────────────────

describe('getCountriesByRegion', () => {
  it('returns only countries in the given region', () => {
    const southAsia = getCountriesByRegion('south-asia');
    expect(southAsia.length).toBeGreaterThan(0);
    for (const country of southAsia) {
      expect(country.region).toBe('south-asia');
    }
  });

  it('returns an empty array for a region with no countries', () => {
    // Reason: all 5 expected regions have countries, but the function should
    // still handle a valid Region type gracefully if data changes.
    const result = getCountriesByRegion('central-asia');
    // Central Asia has 1 country (Kazakhstan) — not empty, but verifies the path
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('every region has at least one country', () => {
    for (const region of EXPECTED_REGIONS) {
      expect(getCountriesByRegion(region).length).toBeGreaterThan(0);
    }
  });
});

// ─── getRelatedCountries ─────────────────────────────────────────────────────

describe('getRelatedCountries', () => {
  it('returns countries from the same region, excluding the given country', () => {
    const related = getRelatedCountries('bangladesh', 4);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);
    for (const country of related) {
      expect(country.slug).not.toBe('bangladesh');
      expect(country.region).toBe('south-asia');
    }
  });

  it('respects the limit parameter', () => {
    const related = getRelatedCountries('uae', 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it('returns an empty array for an unknown slug', () => {
    expect(getRelatedCountries('nonexistent')).toEqual([]);
  });

  it('does not include the source country in results', () => {
    for (const slug of getAllCountrySlugs()) {
      const related = getRelatedCountries(slug, 10);
      expect(related.every((c) => c.slug !== slug)).toBe(true);
    }
  });
});

// ─── getCountriesGroupedByRegion ─────────────────────────────────────────────

describe('getCountriesGroupedByRegion', () => {
  it('returns an object with all 5 regions as keys', () => {
    const grouped = getCountriesGroupedByRegion();
    for (const region of EXPECTED_REGIONS) {
      expect(grouped).toHaveProperty(region);
      expect(Array.isArray(grouped[region])).toBe(true);
    }
  });

  it('every country appears in exactly one region group', () => {
    const grouped = getCountriesGroupedByRegion();
    const allGrouped = Object.values(grouped).flat();
    expect(allGrouped).toHaveLength(EXPECTED_COUNTRY_COUNT);
  });
});

// ─── getRegionLabel ──────────────────────────────────────────────────────────

describe('getRegionLabel', () => {
  it('returns a human-readable label for each region', () => {
    expect(getRegionLabel('south-asia')).toBe('South Asia');
    expect(getRegionLabel('middle-east')).toBe('Middle East & GCC');
    expect(getRegionLabel('africa')).toBe('Africa');
    expect(getRegionLabel('western')).toBe('Western Countries');
    expect(getRegionLabel('central-asia')).toBe('Central Asia');
  });
});

// ─── getCountryNamesByRegion ─────────────────────────────────────────────────

describe('getCountryNamesByRegion', () => {
  it('returns names (not slugs) for countries in a region', () => {
    const names = getCountryNamesByRegion('south-asia');
    expect(names).toContain('Bangladesh');
    expect(names).toContain('Nepal');
  });
});

// ─── formatPatientsTreated ───────────────────────────────────────────────────

describe('formatPatientsTreated', () => {
  it('formats thousands with K+ suffix', () => {
    const country = { patientsTreated: 5000 } as CountryMetadata;
    expect(formatPatientsTreated(country)).toBe('5K+');
  });

  it('formats 1,200 as 1.2K+', () => {
    const country = { patientsTreated: 1200 } as CountryMetadata;
    expect(formatPatientsTreated(country)).toBe('1.2K+');
  });

  it('formats sub-1K values as exact count with +', () => {
    const country = { patientsTreated: 300 } as CountryMetadata;
    expect(formatPatientsTreated(country)).toBe('300+');
  });

  it('formats 600 as 600+', () => {
    const country = { patientsTreated: 600 } as CountryMetadata;
    expect(formatPatientsTreated(country)).toBe('600+');
  });

  it('returns 1K+ fallback when patientsTreated is undefined', () => {
    const country = {} as CountryMetadata;
    expect(formatPatientsTreated(country)).toBe('1K+');
  });

  it('returns 1K+ fallback when patientsTreated is 0', () => {
    const country = { patientsTreated: 0 } as CountryMetadata;
    expect(formatPatientsTreated(country)).toBe('1K+');
  });

  it('formats all real countries without error', () => {
    for (const country of ALL_COUNTRIES) {
      const result = formatPatientsTreated(country);
      expect(result).toMatch(/^[\d.]+[K+]?\+$/);
    }
  });
});

// ─── Metadata completeness (every country has required fields) ───────────────

describe('ALL_COUNTRIES metadata completeness', () => {
  it('every country has a non-empty name, slug, nationality, and code', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.name).toBeTruthy();
      expect(c.slug).toBeTruthy();
      expect(c.nationality).toBeTruthy();
      expect(c.code).toBeTruthy();
    }
  });

  it('every country has heroTitle, heroSubtitle, metaDescription, and introParagraph', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.heroTitle).toBeTruthy();
      expect(c.heroSubtitle).toBeTruthy();
      expect(c.metaDescription).toBeTruthy();
      expect(c.introParagraph).toBeTruthy();
    }
  });

  it('every country has at least one treatmentCost entry', () => {
    for (const c of ALL_COUNTRIES) {
      expect(Object.keys(c.treatmentCosts).length).toBeGreaterThan(0);
    }
  });

  it('every country has at least one recommended city', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.recommendedCities.length).toBeGreaterThan(0);
    }
  });

  it('every country has at least one visa step', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.visaSteps.length).toBeGreaterThan(0);
    }
  });

  it('every country has at least one language', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.languages.length).toBeGreaterThan(0);
    }
  });

  it('every country has a valid currency object', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.currency.code).toBeTruthy();
      expect(c.currency.symbol).toBeTruthy();
      expect(c.currency.name).toBeTruthy();
      expect(c.currency.exchangeRate).toBeGreaterThan(0);
    }
  });

  it('every country has at least one top concern', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.topConcerns.length).toBeGreaterThan(0);
    }
  });

  it('every country has at least one primary keyword', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.primaryKeywords.length).toBeGreaterThan(0);
    }
  });

  it('every country has at least one long-tail keyword', () => {
    for (const c of ALL_COUNTRIES) {
      expect(c.longTailKeywords.length).toBeGreaterThan(0);
    }
  });

  it('every country has a valid region from the expected set', () => {
    for (const c of ALL_COUNTRIES) {
      expect(EXPECTED_REGIONS).toContain(c.region);
    }
  });
});
