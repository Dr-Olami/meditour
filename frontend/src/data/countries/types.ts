/**
 * Type definitions for country-specific landing page metadata.
 *
 * Each country has a `CountryMetadata` record that drives the dynamic
 * `/for/[country]` landing pages, including SEO keywords, cost comparisons,
 * visa guidance, city recommendations, and auto-generated FAQs.
 */

/** Geographic region grouping used for related-country linking. */
export type Region =
  | 'south-asia'
  | 'middle-east'
  | 'africa'
  | 'western'
  | 'central-asia';

/** Visa application pathway available to a country's citizens. */
export type VisaType = 'on-arrival' | 'e-visa' | 'embassy' | 'visa-free';

/** Religious majority, used to surface relevant cultural accommodations. */
export type ReligiousMajority = 'muslim' | 'christian' | 'hindu' | 'mixed' | 'other';

/** Local currency details for price conversion on cost tables. */
export interface CurrencyInfo {
  /** ISO 4217 code, e.g. 'BDT', 'NGN', 'AED'. */
  code: string;
  /** Display symbol, e.g. '৳', '₦', 'د.إ'. */
  symbol: string;
  /** Approximate USD-to-local exchange rate (e.g. 110 for BDT). */
  exchangeRate: number;
  /** Human-readable name, e.g. 'Bangladeshi Taka'. */
  name: string;
}

/** Recommended Indian city for patients from this country. */
export interface CityRecommendation {
  /** City name, e.g. 'Kolkata', 'Bangalore'. */
  name: string;
  /** Flight time from the patient's country, e.g. '3 hours from Dhaka'. */
  flightTime: string;
  /** Whether direct flights are available. */
  directFlights: boolean;
  /** Common airlines servicing this route. */
  airlines: string[];
  /** Hospital specialties this city is known for. */
  specialties: string[];
}

/** Cost comparison row for a single treatment. */
export interface TreatmentCost {
  /** India price in USD, e.g. '$8,000–12,000'. */
  indiaUSD: string;
  /** India price converted to local currency. */
  localCurrency: string;
  /** Typical USA price for comparison. */
  usaCost: string;
  /** Estimated savings percentage vs USA. */
  savingsPercent: string;
  /** Alternative destination prices, e.g. { Singapore: '$35,000' }. */
  alternatives?: Record<string, string>;
}

/** Step in the visa application process. */
export interface VisaStep {
  title: string;
  description: string;
}

/** Country-specific FAQ item (extends FAQItem with optional bullets). */
export interface CountryFAQItem {
  question: string;
  answer: string;
  bullets?: string[];
}

/** Complete metadata for a single country landing page. */
export interface CountryMetadata {
  /** ISO 3166-1 alpha-2 country code, e.g. 'BD', 'NG', 'AE'. */
  code: string;
  /** Full country name, e.g. 'Bangladesh'. */
  name: string;
  /** URL slug, e.g. 'bangladesh'. */
  slug: string;
  /** Demonym / nationality adjective, e.g. 'Bangladeshi'. */
  nationality: string;
  /** Geographic region grouping. */
  region: Region;

  // ── SEO ──────────────────────────────────────────────────────────────────
  /** Primary short-tail keywords for the page. */
  primaryKeywords: string[];
  /** Long-tail, high-intent keywords patients actually search. */
  longTailKeywords: string[];

  // ── Patient concerns ─────────────────────────────────────────────────────
  /** Top concerns patients from this country have (rendered as benefit cards). */
  topConcerns: string[];

  // ── Logistics ────────────────────────────────────────────────────────────
  /** Major origin cities patients travel from. */
  majorCities: string[];
  /** Human-readable flight time summary. */
  flightTime: string;
  /** Whether direct flights to India are available. */
  directFlights: boolean;
  /** Visa application pathway. */
  visaType: VisaType;
  /** Human-readable visa processing time. */
  visaProcessingTime: string;
  /** Major origin airports with IATA codes. */
  majorAirports: string[];

  // ── Cost ─────────────────────────────────────────────────────────────────
  /** Headline cost savings range vs the country's typical alternatives. */
  costSavingsVsLocal: string;
  /** Countries/destinations patients typically compare against. */
  costComparisonCountries: string[];
  /** Per-treatment cost comparison data (keyed by treatment slug). */
  treatmentCosts: Record<string, TreatmentCost>;

  // ── Language & culture ───────────────────────────────────────────────────
  /** Languages spoken by patients from this country. */
  languages: string[];
  /** Religious majority (drives cultural accommodation messaging). */
  religiousMajority: ReligiousMajority;
  /** Cultural accommodations offered, e.g. 'Halal food', 'Prayer facilities'. */
  culturalConsiderations: string[];

  // ── Trust signals ────────────────────────────────────────────────────────
  /** Approximate number of patients treated from this country. */
  patientsTreated?: number;
  /** Year Khan Meditour began serving this country. */
  establishedYear?: number;

  // ── City recommendations ─────────────────────────────────────────────────
  /** Recommended Indian cities for patients from this country. */
  recommendedCities: CityRecommendation[];

  // ── Visa process ─────────────────────────────────────────────────────────
  /** Step-by-step visa application guide. */
  visaSteps: VisaStep[];

  // ── Page content ─────────────────────────────────────────────────────────
  /** Hero section headline. */
  heroTitle: string;
  /** Hero section subheading. */
  heroSubtitle: string;
  /** Meta description for SEO (150–160 chars). */
  metaDescription: string;
  /** Intro paragraph below the hero. */
  introParagraph: string;

  // ── Currency ─────────────────────────────────────────────────────────────
  /** Local currency for price conversion. */
  currency: CurrencyInfo;

  // ── Optional overrides ───────────────────────────────────────────────────
  /** Manual FAQs that supplement or override auto-generated ones. */
  manualFaqs?: CountryFAQItem[];
}
