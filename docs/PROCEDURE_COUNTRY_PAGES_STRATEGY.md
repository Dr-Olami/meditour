# Procedure × Country Pages — Strategy & Implementation Guide

> **Decision:** Create dedicated landing pages for every `{procedure} in India for {nationality} patients` keyword combination.
>
> **URL pattern:** `/countries/{country-slug}/{procedure-slug}-in-india`
> **Bengali pattern:** `/bn/countries/{country-slug}/{procedure-slug}-in-india`
>
> **Last updated:** 2026-09-08

---

## Table of Contents

1. [Why This Matters](#1-why-this-matters)
2. [Competitor Research](#2-competitor-research)
3. [Target Keywords](#3-target-keywords)
4. [URL Architecture](#4-url-architecture)
5. [Page Structure — Section by Section](#5-page-structure--section-by-section)
6. [Data Sources — What We Already Have](#6-data-sources--what-we-already-have)
7. [Implementation Plan — Phased Rollout](#7-implementation-plan--phased-rollout)
8. [Developer Guide](#8-developer-guide)
9. [SEO Specialist Guide](#9-seo-specialist-guide)
10. [Content Writer Guide](#10-content-writer-guide)
11. [Quality Checklist](#11-quality-checklist)
12. [Risks & Guardrails](#12-risks--guardrails)

---

## 1. Why This Matters

### The gap we are closing

Today our site has:

- **68 procedure pages** targeting `{procedure} cost in India for international patients`
- **29 country pages** targeting `medical treatment in India for {nationality} patients`

But we have **zero pages** targeting the keyword pattern that competitors rank #1 for:

```
{procedure} in India for {nationality} patients
```

Examples of keywords we currently do NOT rank for:

- "heart bypass surgery in India for Nigerian patients"
- "IVF treatment in India for Bangladeshi patients"
- "bone marrow transplant in India for Nigerian patients"
- "knee replacement in India for Omani patients"

A Nigerian patient searching for heart bypass surgery in India lands on a competitor page (Afiya India), not ours.

### Why dedicated pages beat enhanced existing pages

| Approach | SEO | AEO | GEO | AIO |
|----------|-----|-----|-----|-----|
| **Dedicated pages** (recommended) | Exact-match URL, targeted H1, focused content | AI extracts from a page that directly answers the question | Country name in URL signals geographic relevance | Clear hierarchy, structured data, actionable CTAs |
| Enhance country pages only | No keyword-targeted URL; page becomes too broad | AI may extract category-level data but not procedure-specific | Country signal exists but procedure signal is weak | Mixed intent confuses AI extraction |
| Enhance procedure pages only | No country in URL; country links are generic | AI cannot extract country-specific cost or visa info | No geographic signal in URL | Same content for all nationalities |
| Both (no new pages) | Better internal linking but still no keyword-targeted URLs | Same limitations | Same limitations | Same limitations |

**Bottom line:** Google and AI engines rank dedicated pages higher than sections within broader pages for specific search queries. This is why Afiya India ranks #1 for `"heart bypass surgery in India for Nigerian patients"` — they have a dedicated page at that exact URL.

---

## 2. Competitor Research

### 2.1 Afiya India (afiyaindia.com) — The leader

**URL pattern:**
```
/en/{procedure-slug}-in-india-for-{nationality-slug}-patients
```

**Examples:**
- `/en/heart-bypass-surgery-in-india-for-nigerian-patients`
- `/en/heart-valve-replacement-in-india-for-nigerian-patients`
- `/en/bone-marrow-transplant-in-india-for-nigerian-patients`

**What they do right:**
- Procedure-specific cost range for that nationality (e.g. "From US$5,000; competitive India range US$5,000–US$9,000")
- Country-specific cost comparison table (India vs Nigeria vs USA vs UK vs Gulf)
- Procedure-specific hospital stay, recovery time, success rates
- Visa process specific to that country (e.g. Nigeria requires paper visa, not e-visa)
- Country-specific FAQs
- Clean URL with exact keyword match

**What they do wrong (our opportunity):**
- No Bengali translations
- No structured recovery timeline table
- No risks/mitigation section
- No "how to read a package quote" guidance
- No decision framework checklist
- Limited internal linking between procedure-country pages

### 2.2 Arodya — Country-level guides

**URL pattern:**
```
/blog/medical-tourism-{country-slug}-patients-{year}
```

**Examples:**
- `/blog/medical-tourism-india-nigerian-patients-2026`
- `/blog/medical-tourism-uganda-patients-2026`

**What they do right:**
- Procedure cost comparison tables within country guides
- Hospital-by-hospital pricing (Apollo, Fortis, Max, Medanta)
- Visa cost and processing time tables
- Flight route details with airline names and ticket prices

**What they do wrong:**
- No procedure-specific country pages
- Blog format (not evergreen landing pages)
- No structured data for procedure costs

### 2.3 Forerunners Healthcare — Country-level pages

**URL pattern:**
```
/medical-treatment-and-surgery-planning-in-india-from-{country}.html
```

**What they do right:**
- Detailed cost comparison tables (Nigeria private vs India)
- Savings percentage calculations
- Visa and flight logistics

**What they do wrong:**
- No procedure-specific country pages
- Outdated `.html` extension
- No mobile optimization

### 2.4 Niche IVF competitors

Multiple competitors (Divinheal, Curebridge, GetWellGo, KIC Delhi, Crysta IVF) specifically target `"IVF treatment in India for Bangladeshi patients"` with dedicated pages.

**This confirms the keyword pattern works** for specific procedure-country combinations and has measurable search volume.

### 2.5 SEO industry consensus

From published medical tourism SEO guides:

> "Country-Specific Landing Pages: Develop dedicated landing pages for each country, optimized for local search trends and digital advertising to enhance trust and relevance."
> — AHMP India

> "Geo-targeted keywords like 'orthopedic surgery India for UK patients'"
> — Humm Digital

> "Bangladesh-to-Mumbai for cancer is a different campaign than Nigeria-to-Bangalore for heart care. Different ways of paying, different languages, different family dynamics, different visa logistics."
> — Branding Pioneers

> "A programme that doesn't build for each specific route is competing against the entire world's medical-tourism marketing at once — and losing."
> — Branding Pioneers

---

## 3. Target Keywords

### 3.1 Primary keyword (every page)

```
{procedure name} in India for {nationality} patients
```

Examples:
- `Heart Bypass Surgery (CABG) in India for Nigerian patients`
- `IVF Treatment in India for Bangladeshi patients`
- `Bone Marrow Transplant in India for Nigerian patients`
- `Knee Replacement in India for Omani patients`

### 3.2 Secondary keywords (every page)

| Keyword pattern | Search intent | Example |
|----------------|---------------|---------|
| `{procedure} cost in India for {nationality}` | Transactional | "heart bypass cost in India for Nigerians" |
| `{procedure} India vs {country}` | Comparison | "heart bypass India vs Nigeria cost" |
| `{procedure} in Bangalore from {origin city}` | Local + logistics | "heart bypass in Bangalore from Lagos" |
| `best hospital in India for {procedure} {nationality}` | Commercial | "best hospital for heart bypass for Nigerians" |
| `{procedure} medical visa {country}` | Informational | "heart bypass medical visa Nigeria" |
| `is {procedure} in India safe for {nationality}` | Trust | "is heart bypass in India safe for Nigerians" |
| `how to travel from {origin city} for {procedure}` | Logistics | "how to travel from Lagos for heart bypass" |
| `{procedure} cost in {local currency}` | Transactional | "heart bypass cost in Naira" |

### 3.3 Long-tail keywords (per country data)

Each country's `longTailKeywords` array in `data/countries/` already contains procedure-specific long-tail keywords. Examples from Nigeria:

```
'orthopedic surgery in India for Nigerian patients'
'heart surgery cost India vs Nigeria'
'cancer treatment in India from Nigeria'
'kidney transplant cost India for Nigerians'
'spine surgery in Bangalore from Lagos'
'IVF treatment in India from Nigeria cost'
```

These should be referenced when writing page content and FAQs.

### 3.4 Keyword priority by category

Based on search volume research (from `PROCEDURE_URL_STRUCTURE_MAPPING.md`):

| Priority | Category | Search volume | Countries to target first |
|----------|----------|---------------|--------------------------|
| 1 | Cardiology | Highest | Nigeria, Bangladesh, UAE, Saudi Arabia, Iraq |
| 2 | Hematology & Bone Marrow | High-value, high-volume | Nigeria, Bangladesh, Sudan, Uganda |
| 3 | Cancer Treatment | High | Nigeria, Bangladesh, Kenya, Ethiopia |
| 4 | Orthopedics | High | Nigeria, UAE, Saudi Arabia, Oman |
| 5 | Organ Transplant | Medium-high | Nigeria, Bangladesh, Kenya |
| 6 | Infertility & IVF | Medium | Bangladesh, UAE, Saudi Arabia, Kuwait |
| 7 | Neuro & Spine Surgery | Medium | Nigeria, Bangladesh, Iraq |
| 8 | Cosmetic Surgery | Medium | UAE, Saudi Arabia, Kuwait, Qatar |

---

## 4. URL Architecture

### 4.1 URL pattern

```
English:  /countries/{country-slug}/{procedure-slug}-in-india
Bengali:  /bn/countries/{country-slug}/{procedure-slug}-in-india
```

### 4.2 Examples

```text
/countries/nigeria/heart-bypass-surgery-cabg-in-india
/countries/nigeria/ivf-treatment-in-india
/countries/bangladesh/ivf-treatment-in-india
/countries/bangladesh/bone-marrow-transplant-in-india
/countries/uae/knee-replacement-in-india
/countries/saudi-arabia/angioplasty-stent-placement-in-india
/countries/kenya/cancer-surgery-in-india
/countries/iraq/spine-surgery-in-india
```

### 4.3 Why this URL structure

| Decision | Rationale |
|----------|-----------|
| `/countries/{country}/` prefix | Groups all country-specific content under one path. Search engines see a country hub with procedure spokes. |
| `{procedure-slug}-in-india` suffix | Exact-match keyword in URL. Matches what patients type: "{procedure} in India for {nationality} patients". |
| Same slug for EN and BN | Consistent with our existing `/bn/` prefix pattern. No need for separate Bengali slugs. |
| No `cost-india` suffix | The procedure detail page already uses `-cost-india`. These pages use `-in-india` to target a different intent (treatment + nationality, not just cost). |

### 4.4 Breadcrumb hierarchy

```text
Home → Countries → {Country} → {Procedure} in India for {Nationality} Patients
```

Example:
```text
Home → Countries → Nigeria → Heart Bypass Surgery in India for Nigerian Patients
```

### 4.5 Relationship to existing pages

```text
Procedure detail page:
  /treatments/{category}/{procedure-slug}-cost-india
  → Targets: "{procedure} cost in India for international patients"
  → Audience: All international patients

Country page:
  /countries/{country-slug}
  → Targets: "medical treatment in India for {nationality} patients"
  → Audience: All patients from that country

Procedure × Country page (NEW):
  /countries/{country-slug}/{procedure-slug}-in-india
  → Targets: "{procedure} in India for {nationality} patients"
  → Audience: Patients from that country researching that procedure
```

### 4.6 Internal linking map

```text
Country page ──links to──→ All procedure × country pages for that country
Procedure × Country page ──links to──→ Parent country page
Procedure × Country page ──links to──→ Parent procedure detail page
Procedure × Country page ──links to──→ Related procedure × country pages
Procedure detail page ──links to──→ All 29 country pages (existing, keep)
```

---

## 5. Page Structure — Section by Section

Every procedure × country page contains these sections in this order. Each section is mapped to the patient problem it solves and the search intent it targets.

### 5.1 Section inventory

| # | Section | Source data | Patient problem | Search intent |
|---|---------|-------------|-----------------|---------------|
| 1 | Hero with H1, cost badge, quick facts | Procedure + Country | "How much does this cost for someone from my country?" | Transactional |
| 2 | "In Short" summary callout | Procedure `summary` | "Give me the TL;DR" | AEO |
| 3 | Cost in your currency | Procedure `fromPrice/toPrice` + Country `currency` | "What does this cost in Naira/Taka/Riyal?" | Transactional |
| 4 | Cost comparison table | Procedure + Country `treatmentCosts` | "Is India cheaper than my country? By how much?" | Transactional + comparison |
| 5 | Who Is This Procedure For? | Procedure `eligibility` | "Am I a candidate?" | Informational |
| 6 | Procedure overview | Procedure markdown body (Overview section) | "What is this procedure in plain language?" | Informational |
| 7 | What happens during the procedure | Procedure markdown body (Procedure Details section) | "What will I experience?" | Informational |
| 8 | Recovery & fit-to-fly | Procedure `recoveryTimeline` + Country `flightTime` | "How long until I can fly home?" | Informational |
| 9 | Risks & mitigation | Procedure `risks` | "Is this safe?" | Trust |
| 10 | Why {nationality} patients choose India | Country `topConcerns` + `costSavingsVsLocal` | "Why should I trust India for this?" | Trust + commercial |
| 11 | Visa process for {nationality} patients | Country `visaSteps` + `visaType` + `visaProcessingTime` | "How do I get a visa?" | Informational + logistics |
| 12 | Travel & logistics | Country `flightTime` + `recommendedCities` + `majorAirports` | "How do I get there? Which city? Which airline?" | Informational + logistics |
| 13 | Cultural considerations | Country `culturalConsiderations` + `languages` | "Will my dietary/religious/language needs be met?" | Trust |
| 14 | Recommended hospitals | Procedure `relatedHospitalSlugs` + Country hospital scoring | "Which hospital is best for this procedure?" | Commercial |
| 15 | Recommended doctors | Procedure `relatedDoctorSlugs` + Country doctor scoring | "Who is the best doctor for this?" | Commercial |
| 16 | What's included in the cost | Procedure `costInclusions` + `costExclusions` | "What am I paying for? Any hidden charges?" | Transactional + trust |
| 17 | How to read your package quote | i18n keys (existing) | "How do I avoid hidden charges?" | Trust |
| 18 | Decision framework | i18n keys (existing) | "How do I compare hospitals objectively?" | Commercial + trust |
| 19 | FAQs | Generated from Procedure + Country data | "I have specific questions" | AEO — PAA targeting |
| 20 | Related procedures for {nationality} patients | Procedure `relatedProcedureSlugs` | "Are there alternative procedures?" | Comparison |
| 21 | CTA (WhatsApp + lead form) | i18n + Country `whatsapp` | "I'm ready to take action" | Conversion |

### 5.2 H1 pattern

```text
{Procedure Name} in India for {Nationality} Patients
```

Examples:
- `Heart Bypass Surgery (CABG) in India for Nigerian Patients`
- `IVF Treatment in India for Bangladeshi Patients`
- `Bone Marrow Transplant in India for Nigerian Patients`

### 5.3 Meta title pattern

```text
{Procedure Name} in India for {Nationality} Patients | Cost from {fromPrice}
```

Example:
```text
Heart Bypass Surgery in India for Nigerian Patients | Cost from $4,500
```

Keep under 60 characters. If too long, shorten procedure name.

### 5.4 Meta description pattern

```text
{Procedure name} in India for {nationality} patients from {fromPrice}. Save {costSavingsVsLocal} vs {country}. {hospitalStay} hospital stay. Visa support for {nationality} patients. Free quote.
```

Example:
```text
Heart bypass surgery in India for Nigerian patients from $4,500. Save 50-70% vs Nigeria. 5-7 day hospital stay. Visa support for Nigerian patients. Free quote.
```

Keep under 160 characters.

### 5.5 Section content depth guide

| Section | Minimum word count | Key data points to include |
|---------|-------------------|---------------------------|
| Hero | 20-40 words (H1 + subtitle) | Procedure name, nationality, cost range, savings % |
| In Short | 40-60 words | Summary, cost range, time in India |
| Cost in your currency | 30-50 words + table | USD range, local currency range, exchange rate |
| Cost comparison | 50-80 words + table | India vs {country} vs USA vs UK, savings % |
| Who Is This For? | 80-120 words | 4-6 eligibility criteria as bullet list |
| Procedure overview | 150-250 words | What it is, why it's done, conditions treated |
| What happens during | 150-250 words | Step-by-step process, anesthesia, duration |
| Recovery & fit-to-fly | 150-250 words + table | Timeline phases, when can fly, DVT precautions |
| Risks & mitigation | 100-150 words | 4-6 risks as bullet list + mitigation note |
| Why {nationality} choose India | 100-150 words | 3-4 country-specific benefits |
| Visa process | 150-200 words | 4-step process, processing time, documents needed |
| Travel & logistics | 100-150 words | Flight time, airlines, airports, recommended city |
| Cultural considerations | 50-80 words | Halal food, language, prayer facilities, family accommodation |
| Recommended hospitals | 80-120 words | 2-3 hospitals with accreditation badges |
| Recommended doctors | 80-120 words | 2-4 doctors with specialty and experience |
| What's included | 80-120 words | Inclusions + exclusions as bullet lists |
| Package quote guide | (template-rendered, no manual content) | 6 items from i18n |
| Decision framework | (template-rendered, no manual content) | 8 items from i18n |
| FAQs | 200-400 words | 6-8 Q&A pairs |
| Related procedures | 30-50 words | 3-4 related procedure links with cost |
| **Total target** | **1,500–2,200 words** | |

---

## 6. Data Sources — What We Already Have

### 6.1 Procedure data (from markdown frontmatter)

Every procedure page already has structured frontmatter that we can reuse:

**File location:**
```
frontend/src/content/procedures/en/{category}/{procedure-slug}-cost-india.md
frontend/src/content/procedures/bn/{category}/{procedure-slug}-cost-india.md
```

**Available fields:**

| Field | Type | Used for section |
|-------|------|-----------------|
| `name` | string | H1, meta title |
| `seoHeadline` | string | Fallback H1 |
| `summary` | string | "In Short" callout |
| `description` | string | Meta description |
| `fromPrice` | string | Cost badge |
| `toPrice` | string | Cost badge |
| `duration` | string | Quick facts |
| `hospitalStay` | string | Quick facts |
| `recoveryTime` | string | Quick facts |
| `eligibility` | string[] | "Who Is This For?" section |
| `costInclusions` | string[] | "What's included" section |
| `costExclusions` | string[] | "What's included" section |
| `recoveryTimeline` | object[] | Recovery table |
| `risks` | string[] | Risks section |
| `relatedDoctorSlugs` | string[] | Doctors section |
| `relatedHospitalSlugs` | string[] | Hospitals section |
| `relatedProcedureSlugs` | string[] | Related procedures section |
| `faqs` | object[] | FAQ section |
| Markdown body | text | Overview, procedure details |

### 6.2 Country data (from TypeScript data files)

**File location:**
```
frontend/src/data/countries/{region}.ts
```

**Available fields:**

| Field | Type | Used for section |
|-------|------|-----------------|
| `name` | string | H1, breadcrumbs |
| `nationality` | string | H1, meta title |
| `slug` | string | URL |
| `primaryKeywords` | string[] | SEO reference |
| `longTailKeywords` | string[] | SEO reference, FAQ generation |
| `topConcerns` | string[] | "Why choose India" section |
| `majorCities` | string[] | Travel section |
| `flightTime` | string | Quick facts, travel section |
| `directFlights` | boolean | Travel section |
| `visaType` | enum | Visa section |
| `visaProcessingTime` | string | Visa section |
| `majorAirports` | string[] | Travel section |
| `costSavingsVsLocal` | string | Cost comparison, hero |
| `costComparisonCountries` | string[] | Cost comparison table |
| `treatmentCosts` | Record<string, TreatmentCost> | Cost comparison table |
| `languages` | string[] | Cultural considerations |
| `religiousMajority` | enum | Cultural considerations |
| `culturalConsiderations` | string[] | Cultural considerations |
| `patientsTreated` | number | Trust signal |
| `recommendedCities` | CityRecommendation[] | Travel section |
| `visaSteps` | VisaStep[] | Visa section |
| `currency` | CurrencyInfo | Cost in local currency |
| `manualFaqs` | CountryFAQItem[] | FAQ section |

### 6.3 What we do NOT have (and need to generate)

| Data gap | How to fill it |
|----------|---------------|
| Procedure-specific cost for each country | Use procedure `fromPrice/toPrice` + country `currency.exchangeRate` to convert. This is a calculation, not new data. |
| Procedure-specific cost in the patient's home country | Use country `treatmentCosts[category].usaCost` as a reference. For the patient's home country, research or estimate based on `costComparisonCountries`. |
| Procedure-specific FAQs for each country | Generate from procedure FAQs + country visa/travel FAQs. See FAQ generation rules in section 10.4. |
| Procedure-specific success rates for each country | Use procedure-level data (same for all countries). Success rates don't vary by nationality. |

---

## 7. Implementation Plan — Phased Rollout

### 7.1 Phase 1 — Top 10 procedures × Top 10 countries (Month 1)

**Target:** 100 pages × 2 locales = 200 content files

**Top 10 procedures** (highest search volume):

| # | Procedure | Category | Cost range |
|---|-----------|----------|------------|
| 1 | Heart Bypass Surgery (CABG) | Cardiology | $4,500–$12,000 |
| 2 | Angioplasty & Stent Placement | Cardiology | $2,500–$6,000 |
| 3 | Total Knee Replacement | Orthopedics | $3,500–$7,000 |
| 4 | Total Hip Replacement | Orthopedics | $4,000–$8,000 |
| 5 | IVF Treatment | Infertility | $1,500–$4,000 |
| 6 | Chemotherapy | Cancer | $500–$2,500/cycle |
| 7 | Cancer Surgery | Cancer | $4,000–$15,000 |
| 8 | Kidney Transplant | Organ Transplant | $15,000–$40,000 |
| 9 | Liver Transplant | Organ Transplant | $25,000–$60,000 |
| 10 | Bone Marrow Transplant | Hematology | $18,000–$45,000 |

**Top 10 countries** (highest patient volume + search volume):

| # | Country | Nationality | Region | Why |
|---|---------|-------------|--------|-----|
| 1 | Nigeria | Nigerian | Africa | Largest African medical tourism market |
| 2 | Bangladesh | Bangladeshi | South Asia | Largest South Asian market (after India); Bengali content available |
| 3 | UAE | Emirati / UAE resident | Middle East | High-value patients; GCC hub |
| 4 | Saudi Arabia | Saudi | Middle East | Largest GCC market |
| 5 | Kenya | Kenyan | Africa | East Africa hub |
| 6 | Iraq | Iraqi | Middle East | High medical tourism outflow |
| 7 | Sudan | Sudanese | Africa | Limited local advanced care |
| 8 | Uganda | Ugandan | Africa | East Africa; English-speaking |
| 9 | Oman | Omani | Middle East | GCC; high outbound medical tourism |
| 10 | Yemen | Yemeni | Middle East | Limited local advanced care |

### 7.2 Phase 2 — All 68 procedures × Top 10 countries (Month 2)

**Target:** 680 pages × 2 locales = 1,360 content files

Extend to all 68 procedures for the same top 10 countries.

### 7.3 Phase 3 — All 68 procedures × All 29 countries (Month 3)

**Target:** 1,972 pages × 2 locales = 3,944 content files

Extend to all 29 countries. Many of these will be largely auto-generated from existing data with minimal manual content.

### 7.4 Bengali translations

Bengali translations are only needed for countries where Bengali-speaking patients are the primary audience:

| Country | Bengali translation needed? | Reason |
|---------|---------------------------|--------|
| Bangladesh | Yes | Primary Bengali-speaking market |
| All others | Optional | Bengali speakers in other countries are a small minority |

**Recommendation:** Generate Bengali pages only for Bangladesh in Phase 1. Other countries get English-only pages initially. Add Bengali for other countries only if analytics shows Bengali search traffic.

---

## 8. Developer Guide

### 8.1 Route file

**File:** `frontend/src/pages/countries/[country]/[procedure].astro`

**Bengali route:** `frontend/src/pages/bn/countries/[country]/[procedure].astro`

### 8.2 getStaticPaths

```typescript
export async function getStaticPaths() {
  const countries = getAllCountrySlugs();
  const procedures = await getProcedures('en');

  const paths = [];
  for (const countrySlug of countries) {
    for (const procedure of procedures) {
      const procedureSlug = entrySlug(procedure).split('/').pop();
      // Strip the "-cost-india" suffix and add "-in-india"
      const pageSlug = procedureSlug.replace(/-cost-india$/, '') + '-in-india';
      paths.push({
        params: { country: countrySlug, procedure: pageSlug },
        props: { countrySlug, procedureSlug },
      });
    }
  }
  return paths;
}
```

### 8.3 Data loading in the page

```typescript
const { countrySlug, procedureSlug } = Astro.props;
const countryData = getCountryMetadata(countrySlug);
const procedure = await getProcedureBySlug('en', procedureSlug);

if (!countryData || !procedure) {
  return Astro.redirect('/404');
}

// Load related data
const allHospitals = await getHospitals('en');
const allDoctors = await getDoctors('en');
const allProcedures = await getProcedures('en');

// Resolve related hospitals and doctors (reuse existing functions)
const relatedHospitals = resolveRelatedHospitals(
  procedure.data.relatedHospitalSlugs,
  allHospitals
);
const relatedDoctors = resolveRelatedDoctors(
  procedure.data.relatedDoctorSlugs,
  allDoctors
);
const relatedProcedures = resolveRelatedProcedures(
  procedure.data.relatedProcedureSlugs,
  allProcedures
);

// Calculate local currency cost
const fromPriceUsd = procedure.data.fromPrice;
const toPriceUsd = procedure.data.toPrice;
const exchangeRate = countryData.currency.exchangeRate;
const currencySymbol = countryData.currency.symbol;
// Convert: "$4,500" → "৳495,000"
```

### 8.4 Currency conversion helper

Add to `lib/currency.ts` (new file):

```typescript
/**
 * Convert a USD price string to local currency.
 *
 * @param usdPrice - Price string like "$4,500" or "$4,500–$12,000"
 * @param exchangeRate - USD to local currency rate
 * @param symbol - Local currency symbol
 * @returns Converted price string like "৳495,000" or "৳495,000–৳1,320,000"
 */
export function convertUsdToLocal(
  usdPrice: string,
  exchangeRate: number,
  symbol: string
): string {
  // Handle ranges: "$4,500–$12,000"
  if (usdPrice.includes('–')) {
    const [low, high] = usdPrice.split('–').map(s => convertSingle(s, exchangeRate, symbol));
    return `${low}–${high}`;
  }
  return convertSingle(usdPrice, exchangeRate, symbol);
}

function convertSingle(usd: string, rate: number, symbol: string): string {
  const num = Number(usd.replace(/[$,]/g, ''));
  if (isNaN(num)) return usd;
  const converted = Math.round(num * rate);
  return `${symbol}${converted.toLocaleString()}`;
}
```

### 8.5 FAQ generation

Add to `lib/country-procedure-faq.ts` (new file):

```typescript
import type { ProcedureEntry } from './content';
import type { CountryMetadata } from '../data/countries/types';

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate procedure × country specific FAQs by combining
 * procedure FAQs with country-specific travel/visa questions.
 */
export function generateProcedureCountryFaqs(
  procedure: ProcedureEntry,
  country: CountryMetadata
): FAQItem[] {
  const faqs: FAQItem[] = [];

  // 1. Cost question (procedure + country specific)
  faqs.push({
    question: `How much does ${procedure.data.name} cost in India for ${country.nationality.toLowerCase()} patients?`,
    answer: `${procedure.data.name} in India typically costs ${procedure.data.fromPrice}–${procedure.data.toPrice} USD. For ${country.nationality.toLowerCase()} patients, this is approximately ${convertUsdToLocal(procedure.data.fromPrice, country.currency.exchangeRate, country.currency.symbol)}–${convertUsdToLocal(procedure.data.toPrice, country.currency.exchangeRate, country.currency.symbol)} ${country.currency.code}. Final quotes follow medical review of your reports.`,
  });

  // 2. Visa question (country specific)
  faqs.push({
    question: `Do ${country.nationality.toLowerCase()} patients need a medical visa for ${procedure.data.name} in India?`,
    answer: `Yes. ${country.nationality} patients need a medical visa. ${country.visaType === 'e-visa' ? 'An e-medical visa can be applied for online and is typically processed in ' + country.visaProcessingTime + '.' : 'A regular medical visa must be submitted at the Indian mission in ' + country.majorCities[0] + ' and typically takes ' + country.visaProcessingTime + ' to process.'} Khan Meditour provides the hospital invitation letter required for your application.`,
  });

  // 3. Travel question (country specific)
  faqs.push({
    question: `How long do I need to stay in India for ${procedure.data.name}?`,
    answer: `Most ${country.nationality.toLowerCase()} patients stay ${procedure.data.hospitalStay} in the hospital plus recovery time. Plan for ${procedure.data.recoveryTime} total, including time in India before flying home. Flight time from ${country.majorCities[0]} is ${country.flightTime}.`,
  });

  // 4. Safety question (procedure specific)
  if (procedure.data.risks && procedure.data.risks.length > 0) {
    faqs.push({
      question: `Is ${procedure.data.name} in India safe for ${country.nationality.toLowerCase()} patients?`,
      answer: `${procedure.data.name} is performed at JCI and NABH accredited hospitals with experienced surgical teams. As with any procedure, there are risks including ${procedure.data.risks.slice(0, 2).join(' and ').toLowerCase()}. Our partner hospitals mitigate these through safety protocols, ICU backup, and personalized consent discussions.`,
    });
  }

  // 5. Include procedure's own FAQs (up to 4)
  if (procedure.data.faqs) {
    faqs.push(...procedure.data.faqs.slice(0, 4));
  }

  // 6. Country-specific manual FAQs (if any)
  if (country.manualFaqs) {
    faqs.push(...country.manualFaqs.slice(0, 2));
  }

  return faqs.slice(0, 8); // Cap at 8 FAQs
}
```

### 8.6 Structured data (JSON-LD)

Each page should include:

```typescript
const jsonLd = [
  // 1. MedicalWebPage — signals this is a medical content page
  medicalWebPage({
    name: `${procedure.data.name} in India for ${countryData.nationality} Patients`,
    url: pageUrl,
    description: seoDescription,
    inLanguage: locale,
    audience: `${countryData.nationality} patients seeking ${procedure.data.name} in India`,
  }),

  // 2. FAQPage — enables rich results for FAQs
  faqPage({ entries: procedureCountryFaqs }),

  // 3. BreadcrumbList — navigation hierarchy
  breadcrumbs([
    { name: t.nav.home, url: baseUrl },
    { name: 'Countries', url: `${baseUrl}/countries/` },
    { name: countryData.name, url: `${baseUrl}/countries/${countryData.slug}` },
    { name: `${procedure.data.name} in India`, url: pageUrl },
  ]),
];
```

### 8.7 Hreflang

```html
<link rel="alternate" hreflang="en" href="https://khanmeditour.com/countries/{country}/{procedure}-in-india" />
<link rel="alternate" hreflang="bn" href="https://khanmeditour.com/bn/countries/{country}/{procedure}-in-india" />
```

Only add Bengali hreflang for Bangladesh country pages. For other countries, English is the primary language.

### 8.8 File structure overview

```text
frontend/src/
├── pages/
│   ├── countries/
│   │   ├── [country]/
│   │   │   ├── [procedure].astro          ← NEW: procedure × country route (EN)
│   │   │   └── index.astro                ← existing country page
│   │   └── index.astro                    ← existing countries directory
│   └── bn/
│       └── countries/
│           └── [country]/
│               ├── [procedure].astro       ← NEW: procedure × country route (BN)
│               └── index.astro
├── lib/
│   ├── currency.ts                         ← NEW: currency conversion helper
│   ├── country-procedure-faq.ts            ← NEW: FAQ generation
│   └── content.ts                          ← existing: add getProcedureByCountry helper
├── data/
│   └── countries/
│       └── (existing files, no changes)
└── i18n/
    ├── en.json                             ← add procedureCountry section
    └── bn.json                             ← add procedureCountry section
```

---

## 9. SEO Specialist Guide

### 9.1 Keyword mapping checklist

For each procedure × country page, verify:

- [ ] Primary keyword in URL: `{procedure-slug}-in-india` under `/countries/{country-slug}/`
- [ ] Primary keyword in H1: `{Procedure Name} in India for {Nationality} Patients`
- [ ] Primary keyword in meta title (first 60 chars)
- [ ] Primary keyword in meta description (first 160 chars)
- [ ] Primary keyword in first paragraph of body content
- [ ] Secondary keywords in H2 headings (cost comparison, visa, recovery, hospitals, doctors)
- [ ] Long-tail keywords from country `longTailKeywords` array referenced in content
- [ ] Country name appears in at least 3 H2 headings
- [ ] Procedure name appears in at least 5 H2 headings

### 9.2 Internal linking checklist

- [ ] Country page links to all procedure × country pages for that country
- [ ] Each procedure × country page links back to parent country page
- [ ] Each procedure × country page links to parent procedure detail page
- [ ] Each procedure × country page links to 3-4 related procedure × country pages
- [ ] Procedure detail page country cross-links now point to procedure × country pages (not just country pages)

### 9.3 Schema markup checklist

- [ ] `MedicalWebPage` schema with `audience` field set to `{nationality} patients`
- [ ] `FAQPage` schema with 6-8 Q&A pairs
- [ ] `BreadcrumbList` schema with 4 levels (Home → Countries → {Country} → {Procedure})
- [ ] `hreflang` tags for EN + BN (BN only for Bangladesh)
- [ ] `og:title` matches meta title
- [ ] `og:description` matches meta description
- [ ] `og:url` matches canonical URL

### 9.4 Canonical URL rules

- EN page canonical: `https://khanmeditour.com/countries/{country}/{procedure}-in-india`
- BN page canonical: `https://khanmeditour.com/bn/countries/{country}/{procedure}-in-india`
- Never canonical to the procedure detail page or country page

### 9.5 XML sitemap

Add all procedure × country URLs to the sitemap. Group them under a `<url>` set with `<priority>0.8</priority>` (higher than country pages at 0.7, lower than procedure detail pages at 0.9).

### 9.6 Monitoring and KPIs

Track these metrics per page in Google Search Console:

| Metric | Target | Tool |
|--------|--------|------|
| Impressions for primary keyword | > 100/month after 3 months | GSC |
| Average position for primary keyword | < 20 after 3 months | GSC |
| Click-through rate | > 3% | GSC |
| Organic traffic per page | > 10 sessions/month after 3 months | GA4 |
| Conversion rate (WhatsApp clicks + form submissions) | > 5% | GA4 events |

---

## 10. Content Writer Guide

### 10.1 Voice and tone

- **Medically cautious:** Never promise outcomes. Use "typically," "commonly," "your surgeon will confirm."
- **Patient-focused:** Address the reader as "you." Acknowledge their anxiety.
- **Specific, not generic:** Use the procedure name and country name frequently. Don't write content that could apply to any procedure or any country.
- **Native fluency for Bengali:** Bengali content must read as if written by a native speaker, not a translation. Use natural Bengali medical terminology where it exists; keep English medical terms where Bengali speakers use them (e.g., "IVF," "CABG," "ICU").

### 10.2 What to write vs. what is auto-generated

| Section | Written by content writer | Auto-generated from data |
|---------|--------------------------|--------------------------|
| Hero H1 + subtitle | No (auto from procedure + country name) | Yes |
| In Short | No (auto from `summary` field) | Yes |
| Cost in your currency | No (auto from `fromPrice/toPrice` + `currency`) | Yes |
| Cost comparison table | No (auto from `treatmentCosts` + `costComparisonCountries`) | Yes |
| Who Is This For? | No (auto from `eligibility` field) | Yes |
| Procedure overview | **Yes** — adapt from procedure markdown, add country context | No |
| What happens during | **Yes** — adapt from procedure markdown, simplify for lay audience | No |
| Recovery & fit-to-fly | **Partially** — recovery table is auto; fit-to-fly paragraph is written | Mixed |
| Risks & mitigation | No (auto from `risks` field + mitigation note) | Yes |
| Why {nationality} choose India | **Yes** — write 100-150 words specific to this country | No |
| Visa process | No (auto from `visaSteps` + `visaType`) | Yes |
| Travel & logistics | No (auto from `flightTime` + `recommendedCities` + `majorAirports`) | Yes |
| Cultural considerations | No (auto from `culturalConsiderations` + `languages`) | Yes |
| Recommended hospitals | No (auto from `relatedHospitalSlugs`) | Yes |
| Recommended doctors | No (auto from `relatedDoctorSlugs`) | Yes |
| What's included | No (auto from `costInclusions` + `costExclusions`) | Yes |
| Package quote guide | No (template-rendered from i18n) | Yes |
| Decision framework | No (template-rendered from i18n) | Yes |
| FAQs | **Partially** — 3-4 auto-generated; 2-4 manually written | Mixed |
| Related procedures | No (auto from `relatedProcedureSlugs`) | Yes |

**Content writer effort per page:** ~400-600 words of original content (overview, procedure details, why choose India, fit-to-fly, 2-4 custom FAQs). The rest is auto-generated from existing data.

### 10.3 Writing the "Why {nationality} patients choose India" section

This is the most important manually-written section. It must be specific to the country, not generic.

**Template:**
```markdown
## Why {Nationality} Patients Choose India for {Procedure Name}

{Nationality} patients travel to India for {procedure name} because {reason 1 specific to this country}. 

In {country name}, {procedure name} typically costs {local cost reference} at private hospitals — when it is available at all. In India, the same procedure at a JCI-accredited hospital costs {India cost range}, a saving of {savings %}.

{Country-specific reason 2 — e.g., "Direct flights from Dhaka make Bangalore accessible in under 3 hours."}

{Country-specific reason 3 — e.g., "Bengali-speaking coordinators ensure clear communication throughout your treatment."}
```

**Example (Nigeria + CABG):**
```markdown
## Why Nigerian Patients Choose India for Heart Bypass Surgery

Nigerian patients travel to India for heart bypass surgery because access to advanced cardiac surgery is limited in Nigeria, with most complex cases referred abroad. India offers experienced cardiac surgeons, JCI-accredited hospitals, and costs 50-70% lower than private options in South Africa or Europe.

In Nigeria, heart bypass surgery at a private hospital can cost $20,000-$35,000 — when it is available. In India, the same procedure costs $4,500-$12,000 at accredited hospitals in Bangalore.

Most Nigerian patients fly from Lagos or Abuja with one stop (typically via Doha, Dubai, or Addis Ababa), with total travel time of 8-12 hours. English-speaking coordinators ensure clear communication throughout your treatment.
```

### 10.4 Writing custom FAQs

Write 2-4 custom FAQs per page that are specific to the procedure × country combination. These should answer questions that the auto-generated FAQs don't cover.

**Good custom FAQ examples:**

**Q: Can I pay for heart bypass surgery in Naira?**
A: Most Indian hospitals accept payment in USD via bank transfer or credit card. Some partner hospitals accept Naira through designated exchange channels. Khan Meditour can advise on the most cost-effective payment method for Nigerian patients.

**Q: How soon after heart bypass can I fly back to Lagos?**
A: Most cardiac surgeons recommend waiting 10-14 days after uncomplicated CABG before long-haul flights. Your surgical team will issue a fitness-to-fly certificate. The flight from Bangalore to Lagos (with one stop) takes 8-12 hours, so compression stockings and regular movement are important.

**Q: Are there Bengali-speaking staff at hospitals in Bangalore?**
A: Yes. Our partner hospitals in Bangalore have Bengali-speaking international patient coordinators who assist with registration, doctor consultations, and discharge. This is particularly helpful for patients from Dhaka who are more comfortable in Bengali.

**Bad custom FAQ examples (too generic):**
- Q: Is India safe for medical treatment? (Too broad — answered on country page)
- Q: How much does heart bypass cost? (Already answered in auto-generated FAQ)
- Q: How do I get a visa? (Already answered in auto-generated FAQ)

### 10.5 Medical caution rules

**Always include these disclaimers:**

1. In the cost section:
   > "Final quotes follow medical review of your reports. Costs vary based on case complexity, hospital category, implant choice, and length of stay."

2. In the recovery section:
   > "Recovery timelines vary by individual. Your surgical team will provide personalized guidance based on your condition and progress."

3. In the risks section:
   > "No surgical outcome is guaranteed. Risks listed are common to this procedure but do not represent all possible complications. Discuss your individual risk profile with your surgeon."

4. In the success rates section (if included):
   > "Success rates are population-level statistics. Your individual outcome depends on your health status, age, and case complexity."

**Never:**
- Promise specific outcomes ("you will recover in 2 weeks")
- Give individualized medical advice ("you should have this surgery")
- Compare specific hospitals by quality ("Hospital A is better than Hospital B")
- Use definitive language for uncertain outcomes ("this will cure your condition")

### 10.6 Bengali content guidelines

For Bangladesh procedure × country pages:

1. **Use native Bengali medical terminology** where it exists:
   - হার্ট বাইপাস সার্জারি (heart bypass surgery)
   - এনজিওগ্রাফি (angiography)
   - হাসপাতালে ভর্তি (hospital admission)

2. **Keep English medical terms** where Bengali speakers use them:
   - IVF, ICSI, CABG, ICU, MRI, CT scan, PET scan

3. **Use Bengali numerals** (১, ২, ৩) for prices and durations in body text, but use Western numerals (1, 2, 3) in tables and cost badges for clarity.

4. **Currency:** Show both USD and BDT: "$4,500 (≈ ৳495,000)"

5. **Cultural references:** Mention halal food availability, prayer facilities, and Bengali-speaking coordinators naturally in the content.

---

## 11. Quality Checklist

Before publishing any procedure × country page, verify:

### 11.1 Content quality

- [ ] H1 matches the primary keyword pattern exactly
- [ ] Meta title is under 60 characters
- [ ] Meta description is under 160 characters
- [ ] Body content is 1,500-2,200 words
- [ ] At least 3 H2 headings include the country name
- [ ] At least 5 H2 headings include the procedure name
- [ ] Cost appears in both USD and local currency
- [ ] Visa section is specific to the country (not generic)
- [ ] Travel section mentions the country's origin cities and flight times
- [ ] Cultural considerations are specific to the country (not generic)
- [ ] "Why {nationality} choose India" section is country-specific (not copy-pasted)
- [ ] 6-8 FAQs total (mix of auto-generated and custom)
- [ ] Medical disclaimers are present

### 11.2 Technical quality

- [ ] URL matches the pattern `/countries/{country}/{procedure}-in-india`
- [ ] Canonical URL is set correctly
- [ ] Hreflang tags are present (EN always; BN only for Bangladesh)
- [ ] JSON-LD schema includes MedicalWebPage, FAQPage, BreadcrumbList
- [ ] Breadcrumb hierarchy is: Home → Countries → {Country} → {Procedure}
- [ ] Internal links to parent country page and parent procedure page are present
- [ ] Internal links to 3-4 related procedure × country pages are present
- [ ] WhatsApp CTA includes country and procedure context in the message
- [ ] Lead form passes procedure and country as hidden fields
- [ ] Page loads in under 3 seconds (LCP)
- [ ] Mobile layout is tested

### 11.3 SEO quality

- [ ] Primary keyword appears in URL, H1, meta title, meta description, and first paragraph
- [ ] Secondary keywords appear in H2 headings
- [ ] Long-tail keywords from country `longTailKeywords` are referenced in content
- [ ] Image alt text includes procedure name and country name
- [ ] No duplicate content with the procedure detail page (content should be adapted, not copied)
- [ ] No duplicate content with the country page (content should be procedure-specific, not country-generic)

---

## 12. Risks & Guardrails

### 12.1 Thin content risk

**Risk:** Auto-generating 1,972 pages with minimal manual content could trigger Google's thin content penalty.

**Mitigation:**
- Phase 1 (100 pages) should have the most manual content (400-600 words per page)
- Phase 2 and 3 pages can be more auto-generated but must still have:
  - A unique "Why {nationality} choose India" section (100+ words)
  - 2+ custom FAQs
  - Country-specific cost data in local currency
- Monitor Google Search Console for "indexed but not served" or manual actions
- If thin content warnings appear, pause auto-generation and add more manual content

### 12.2 Duplicate content risk

**Risk:** Procedure × country pages may share too much content with procedure detail pages.

**Mitigation:**
- Never copy the procedure markdown body verbatim. Adapt it:
  - Shorten the overview (150-250 words vs. 500+ on the detail page)
  - Remove sections that are already on the detail page (e.g., alternatives, long-term outcomes)
  - Add country-specific context that the detail page doesn't have
- Use `rel="canonical"` pointing to the procedure × country page itself (NOT to the procedure detail page)
- The procedure detail page should link to the procedure × country page with country-specific anchor text

### 12.3 URL bloat risk

**Risk:** 1,972 new URLs could dilute crawl budget and site quality signals.

**Mitigation:**
- Phase the rollout (100 → 680 → 1,972)
- Monitor crawl stats in Google Search Console after each phase
- If crawl budget is an issue, prioritize high-traffic procedure × country combinations
- Consider adding a `<priority>` tag in the sitemap for high-value pages
- Low-value combinations (e.g., "cataract surgery for Australian patients") can be excluded if they have no search volume

### 12.4 Medical accuracy risk

**Risk:** Auto-generated content could contain medically inaccurate statements.

**Mitigation:**
- All medical content (procedure overview, risks, recovery) comes from the procedure markdown files, which were written by medical content writers
- Country-specific content (visa, travel, cultural) comes from country data files, which are logistical (not medical)
- The FAQ generator uses templates with medically cautious language
- A medical reviewer should review the FAQ generator templates before deployment
- Never auto-generate medical advice — only auto-generate logistical and cost information

### 12.5 Currency accuracy risk

**Risk:** Exchange rates change; auto-converted prices could be inaccurate.

**Mitigation:**
- Add a disclaimer: "Prices in {local currency} are approximate based on current exchange rates. Request a written quote for the current price."
- Update exchange rates in `data/countries/{region}.ts` quarterly
- Consider fetching live exchange rates in the future (not for Phase 1)

---

## Appendix A — Complete URL List for Phase 1

All 100 procedure × country URLs for Phase 1 (English only; add `/bn/` prefix for Bengali Bangladesh pages):

### Nigeria × Top 10 Procedures

```text
/countries/nigeria/heart-bypass-surgery-cabg-in-india
/countries/nigeria/angioplasty-stent-placement-in-india
/countries/nigeria/total-knee-replacement-in-india
/countries/nigeria/total-hip-replacement-in-india
/countries/nigeria/ivf-treatment-in-india
/countries/nigeria/chemotherapy-in-india
/countries/nigeria/cancer-surgery-in-india
/countries/nigeria/kidney-transplant-in-india
/countries/nigeria/liver-transplant-in-india
/countries/nigeria/bone-marrow-transplant-in-india
```

### Bangladesh × Top 10 Procedures

```text
/countries/bangladesh/heart-bypass-surgery-cabg-in-india
/countries/bangladesh/angioplasty-stent-placement-in-india
/countries/bangladesh/total-knee-replacement-in-india
/countries/bangladesh/total-hip-replacement-in-india
/countries/bangladesh/ivf-treatment-in-india
/countries/bangladesh/chemotherapy-in-india
/countries/bangladesh/cancer-surgery-in-india
/countries/bangladesh/kidney-transplant-in-india
/countries/bangladesh/liver-transplant-in-india
/countries/bangladesh/bone-marrow-transplant-in-india
```

### UAE × Top 10 Procedures

```text
/countries/uae/heart-bypass-surgery-cabg-in-india
/countries/uae/angioplasty-stent-placement-in-india
/countries/uae/total-knee-replacement-in-india
/countries/uae/total-hip-replacement-in-india
/countries/uae/ivf-treatment-in-india
/countries/uae/chemotherapy-in-india
/countries/uae/cancer-surgery-in-india
/countries/uae/kidney-transplant-in-india
/countries/uae/liver-transplant-in-india
/countries/uae/bone-marrow-transplant-in-india
```

### Saudi Arabia × Top 10 Procedures

```text
/countries/saudi-arabia/heart-bypass-surgery-cabg-in-india
/countries/saudi-arabia/angioplasty-stent-placement-in-india
/countries/saudi-arabia/total-knee-replacement-in-india
/countries/saudi-arabia/total-hip-replacement-in-india
/countries/saudi-arabia/ivf-treatment-in-india
/countries/saudi-arabia/chemotherapy-in-india
/countries/saudi-arabia/cancer-surgery-in-india
/countries/saudi-arabia/kidney-transplant-in-india
/countries/saudi-arabia/liver-transplant-in-india
/countries/saudi-arabia/bone-marrow-transplant-in-india
```

### Kenya × Top 10 Procedures

```text
/countries/kenya/heart-bypass-surgery-cabg-in-india
/countries/kenya/angioplasty-stent-placement-in-india
/countries/kenya/total-knee-replacement-in-india
/countries/kenya/total-hip-replacement-in-india
/countries/kenya/ivf-treatment-in-india
/countries/kenya/chemotherapy-in-india
/countries/kenya/cancer-surgery-in-india
/countries/kenya/kidney-transplant-in-india
/countries/kenya/liver-transplant-in-india
/countries/kenya/bone-marrow-transplant-in-india
```

### Iraq × Top 10 Procedures

```text
/countries/iraq/heart-bypass-surgery-cabg-in-india
/countries/iraq/angioplasty-stent-placement-in-india
/countries/iraq/total-knee-replacement-in-india
/countries/iraq/total-hip-replacement-in-india
/countries/iraq/ivf-treatment-in-india
/countries/iraq/chemotherapy-in-india
/countries/iraq/cancer-surgery-in-india
/countries/iraq/kidney-transplant-in-india
/countries/iraq/liver-transplant-in-india
/countries/iraq/bone-marrow-transplant-in-india
```

### Sudan × Top 10 Procedures

```text
/countries/sudan/heart-bypass-surgery-cabg-in-india
/countries/sudan/angioplasty-stent-placement-in-india
/countries/sudan/total-knee-replacement-in-india
/countries/sudan/total-hip-replacement-in-india
/countries/sudan/ivf-treatment-in-india
/countries/sudan/chemotherapy-in-india
/countries/sudan/cancer-surgery-in-india
/countries/sudan/kidney-transplant-in-india
/countries/sudan/liver-transplant-in-india
/countries/sudan/bone-marrow-transplant-in-india
```

### Uganda × Top 10 Procedures

```text
/countries/uganda/heart-bypass-surgery-cabg-in-india
/countries/uganda/angioplasty-stent-placement-in-india
/countries/uganda/total-knee-replacement-in-india
/countries/uganda/total-hip-replacement-in-india
/countries/uganda/ivf-treatment-in-india
/countries/uganda/chemotherapy-in-india
/countries/uganda/cancer-surgery-in-india
/countries/uganda/kidney-transplant-in-india
/countries/uganda/liver-transplant-in-india
/countries/uganda/bone-marrow-transplant-in-india
```

### Oman × Top 10 Procedures

```text
/countries/oman/heart-bypass-surgery-cabg-in-india
/countries/oman/angioplasty-stent-placement-in-india
/countries/oman/total-knee-replacement-in-india
/countries/oman/total-hip-replacement-in-india
/countries/oman/ivf-treatment-in-india
/countries/oman/chemotherapy-in-india
/countries/oman/cancer-surgery-in-india
/countries/oman/kidney-transplant-in-india
/countries/oman/liver-transplant-in-india
/countries/oman/bone-marrow-transplant-in-india
```

### Yemen × Top 10 Procedures

```text
/countries/yemen/heart-bypass-surgery-cabg-in-india
/countries/yemen/angioplasty-stent-placement-in-india
/countries/yemen/total-knee-replacement-in-india
/countries/yemen/total-hip-replacement-in-india
/countries/yemen/ivf-treatment-in-india
/countries/yemen/chemotherapy-in-india
/countries/yemen/cancer-surgery-in-india
/countries/yemen/kidney-transplant-in-india
/countries/yemen/liver-transplant-in-india
/countries/yemen/bone-marrow-transplant-in-india
```

---

## Appendix B — Slug Conversion Reference

The procedure × country page slug is derived from the procedure detail page slug by replacing `-cost-india` with `-in-india`:

| Procedure detail page slug | Procedure × country page slug |
|---------------------------|-------------------------------|
| `heart-bypass-surgery-cabg-cost-india` | `heart-bypass-surgery-cabg-in-india` |
| `angioplasty-stent-placement-cost-india` | `angioplasty-stent-placement-in-india` |
| `total-knee-replacement-cost-india` | `total-knee-replacement-in-india` |
| `ivf-treatment-cost-india` | `ivf-treatment-in-india` |
| `bone-marrow-transplant-cost-india` | `bone-marrow-transplant-in-india` |
| `cancer-surgery-cost-india` | `cancer-surgery-in-india` |
| `kidney-transplant-cost-india` | `kidney-transplant-in-india` |
| `liver-transplant-cost-india` | `liver-transplant-in-india` |
| `chemotherapy-cost-india` | `chemotherapy-in-india` |
| `total-hip-replacement-cost-india` | `total-hip-replacement-in-india` |

**Conversion rule:**
```text
{procedure-slug}-cost-india  →  {procedure-slug}-in-india
```

This ensures:
- No URL collision with the existing procedure detail page
- Different keyword targeting (`-cost-india` for cost intent, `-in-india` for treatment + nationality intent)
- Clean, readable URLs
