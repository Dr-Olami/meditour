# SEO / AEO / GEO Implementation Plan

> Created: 2026-08-02
> Updated: 2026-08-02 — switched to hybrid auto-generation approach
> Goal: Upgrade Khan Meditour pages for 2025/2026 SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) search strategies.
> Audit summary: SEO 7.5/10 | AEO 4/10 | GEO 4.5/10

## Architecture Decision: Hybrid FAQ System

FAQs are generated **automatically** from existing frontmatter data, with **optional manual overrides** per page.

**How it works:**
1. `generateFaqs()` utility functions build default Q&A pairs from structured frontmatter fields
2. Page templates call the generator, then **merge** with any manual `faqs` from frontmatter
3. Manual FAQs supplement or override auto-generated ones (by question match)
4. `FAQPage` JSON-LD schema is built from the merged set

**Result for workflow:**
- **New doctor/treatment/hospital** → fill in existing frontmatter fields → FAQs appear automatically, no extra work
- **Want custom/specific FAQs** → optionally add a `faqs` array in frontmatter for questions that can't be auto-generated
- **No manual work required** for the standard FAQ set

### Auto-Generation Source Mapping

**Treatments** — generated from frontmatter (9 FAQs, meets 6-8 target):
| Frontmatter Field | Auto-FAQ Question |
|---|---|
| `fromPrice` + `toPrice` | What is the cost of [treatment] in Bangalore? (answer shows price range) |
| `hospitalStay` | How long is the hospital stay for [treatment]? |
| `recoveryTime` | What is the recovery time for [treatment]? |
| `duration` | How long does the [treatment] procedure take? |
| `procedures` | What procedures are included in [treatment]? |
| `relatedDoctorSlugs` | Which doctors perform [treatment] at your partner hospitals? |
| `relatedHospitalSlugs` | Which hospitals offer [treatment] in Bangalore? |
| (static) | Are the hospitals JCI-accredited? |
| (static) | How can I book [treatment] through Khan Meditour? |

> Note: Treatments with empty `relatedDoctorSlugs` (e.g. cosmetic-surgery) get 8 FAQs — still meets minimum.

**Doctors** — generated from frontmatter (6 FAQs, meets 5-6 target):
| Frontmatter Field | Auto-FAQ Question |
|---|---|
| `specialty` | What conditions does Dr. [name] treat? |
| `experienceYears` | How many years of experience does Dr. [name] have? |
| `qualification` | What are Dr. [name]'s qualifications? |
| `hospitalId` | What hospital is Dr. [name] affiliated with? |
| `languages` | What languages does Dr. [name] speak? (skipped if field absent) |
| (static) | How can I book a consultation with Dr. [name]? |

> Note: Doctors without `languages` field get 5 FAQs — still meets minimum.

**Hospitals** — generated from frontmatter (7 FAQs, meets 5-6 target):
| Frontmatter Field | Auto-FAQ Question |
|---|---|
| `accreditations` | What accreditations does [hospital] have? |
| `specialities` | What treatments are available at [hospital]? |
| `city` + `country` | Where is [hospital] located? |
| `bedCount` | How many beds does [hospital] have? |
| `establishedYear` | When was [hospital] established? |
| `amenities` | Does [hospital] have international patient services? (checked for international-patient-related amenities) |
| (static) | How can I book an appointment at [hospital] through Khan Meditour? |

## Scope Summary

| Entity   | EN files | BN files | Total |
|----------|----------|----------|-------|
| Treatments | 12       | 12       | 24    |
| Doctors    | 17       | 17       | 34    |
| Hospitals  | 5        | 5        | 10    |
| **Total**  | **34**   | **34**   | **68** |

Plus 6 page templates (en + bn × 3 entity types), 2 shared library files, and 1 new FAQ generation module.

---

## Phase 1: Schema & Infrastructure (code changes)

### Step 1.1: Add optional `faqs` field to content collection schemas

**File:** `frontend/src/content/config.ts`

Add an optional `faqs` array to each collection schema (doctors, hospitals, treatments).
This is for **manual override/supplement FAQs** only — auto-generated FAQs don't need this field.

```ts
faqs: z.array(
  z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
  })
).optional(),
```

Also add a `toPrice` field to the treatments schema for realistic price ranges:

```ts
toPrice: z.string().optional(),  // e.g. '$12,000' — used with fromPrice for cost range
```

- [ ] Add `faqs` to `doctors` schema
- [ ] Add `faqs` to `hospitals` schema
- [ ] Add `faqs` to `treatments` schema
- [ ] Add `toPrice` to `treatments` schema

### Step 1.2: Add `FAQPage` JSON-LD schema helper

**File:** `frontend/src/lib/schema.ts`

Add a new `faqPage` export:

```ts
interface FAQInput {
  entries: { question: string; answer: string }[];
}

export function faqPage(data: FAQInput): WithContext<Record<string, unknown>> {
  return thing('FAQPage', {
    mainEntity: data.entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  });
}
```

- [ ] Implement `faqPage` schema helper
- [ ] Export from `schema.ts`

### Step 1.3: Enrich `Physician` schema for GEO

**File:** `frontend/src/lib/schema.ts`

Extend `PhysicianInput` and `physician()` function with optional GEO-relevant fields:

```ts
interface PhysicianInput {
  name: string;
  specialty: string;
  url: string;
  image?: string;
  hospitalName: string;
  hospitalUrl?: string;
  // New GEO fields:
  knowsAbout?: string[];      // areas of expertise
  alumniOf?: string;          // medical school / education
  award?: string[];           // awards and honors
  qualification?: string;     // credentials string
  yearsExperience?: number;   // experience
  languages?: string[];       // spoken languages
}
```

- [ ] Extend `PhysicianInput` interface
- [ ] Update `physician()` function to emit new fields
- [ ] Update doctor page templates to pass new fields

### Step 1.4: Add `MedicalCondition` schema for treatment pages (GEO)

**File:** `frontend/src/lib/schema.ts`

Add a `medicalCondition` helper for conditions treated on treatment pages:

```ts
interface MedicalConditionInput {
  name: string;
  description?: string;
  possibleTreatment?: string;
}

export function medicalCondition(data: MedicalConditionInput): WithContext<Record<string, unknown>> {
  return thing('MedicalCondition', {
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    ...(data.possibleTreatment ? { possibleTreatment: data.possibleTreatment } : {}),
  });
}
```

- [ ] Implement `medicalCondition` schema helper
- [ ] Export from `schema.ts`

### Step 1.5: Build auto-FAQ generation utilities

**File (new):** `frontend/src/lib/faq-generator.ts`

Create three generator functions that build default FAQ Q&A pairs from existing frontmatter data. These use i18n translation strings for locale-aware question/answer templates.

```ts
// Core types
export interface FAQItem {
  question: string;
  answer: string;
}

// Merge function: auto-generated FAQs + manual overrides
// Manual FAQs with matching questions override auto-generated answers
// Manual FAQs with new questions are appended
export function mergeFaqs(auto: FAQItem[], manual: FAQItem[]): FAQItem[]

// Treatment FAQ generator
// Uses: name, fromPrice, toPrice, hospitalStay, recoveryTime, duration, procedures,
//       relatedDoctorSlugs (resolved to names), relatedHospitalSlugs (resolved to names)
export function generateTreatmentFaqs(
  treatment: TreatmentData,
  relatedDoctorNames: string[],
  relatedHospitalNames: string[],
  locale: 'en' | 'bn'
): FAQItem[]

// Doctor FAQ generator
// Uses: name, specialty, experienceYears, qualification, hospitalId (resolved to name), languages
export function generateDoctorFaqs(
  doctor: DoctorData,
  hospitalName: string,
  locale: 'en' | 'bn'
): FAQItem[]

// Hospital FAQ generator
// Uses: name, accreditations, specialities, city, country, bedCount, establishedYear
export function generateHospitalFaqs(
  hospital: HospitalData,
  locale: 'en' | 'bn'
): FAQItem[]
```

**i18n integration:** Add FAQ question/answer templates to `en.json` and `bn.json` under a `faq.templates` namespace:

```json
{
  "faq": {
    "templates": {
      "treatment": {
        "costQ": "What is the cost of {{treatment}} in Bangalore?",
        "costA": "The cost of {{treatment}} in Bangalore ranges from {{fromPrice}} to {{toPrice}} depending on the complexity of the procedure, choice of hospital, and surgeon's experience. This is typically 60-80% lower than equivalent procedures in the USA or UK.",
        "costAFromOnly": "The estimated cost for {{treatment}} starts from {{fromPrice}}. This may vary based on the complexity of the procedure, choice of hospital, and surgeon's experience. This is typically 60-80% lower than equivalent procedures in the USA or UK.",
        "hospitalStayQ": "How long is the hospital stay for {{treatment}}?",
        "hospitalStayA": "The typical hospital stay is {{stay}}. This may vary depending on the specific procedure and patient condition.",
        ...
      },
      "doctor": { ... },
      "hospital": { ... }
    }
  }
}
```

- [ ] Create `frontend/src/lib/faq-generator.ts` with types, `mergeFaqs`, and 3 generator functions
- [ ] Add FAQ template strings to `frontend/src/i18n/en.json`
- [ ] Add FAQ template strings to `frontend/src/i18n/bn.json`
- [ ] Add `faqTitle` translation keys for each entity type (treatments, doctors, hospitals) in both locales

### Step 1.6: Add realistic `toPrice` values to all treatment content files

**Files to modify:** All 24 treatment files (12 EN + 12 BN)

Add a `toPrice` field to each treatment's frontmatter to enable price range display in FAQs. Values should reflect realistic upper-bound costs in Bangalore for complex cases.

**Price range reference table (Bangalore, USD):**

| Treatment | fromPrice (existing) | toPrice (new) | Notes |
|---|---|---|---|
| Neuro and Spine Surgery | $4,000 | $12,000 | Complex brain tumour surgery at upper end |
| Cardiology | $1,500 | $7,000 | CABG and valve replacement at upper end |
| Cancer Treatment | $3,000 | $15,000 | Immunotherapy and complex surgical oncology at upper end |
| Orthopedics Surgery | $2,500 | $8,000 | Joint replacement and complex spine at upper end |
| Bariatric (Weight Loss) | $4,500 | $9,000 | Revisional surgery at upper end |
| Cosmetic Surgery | $2,000 | $10,000 | Full body contouring and multiple procedures at upper end |
| Organ Treatment | $20,000 | $40,000 | Liver transplant at upper end, kidney at lower |
| Infertility Treatment | $3,500 | $7,000 | Multiple IVF cycles and donor programmes at upper end |
| Stem Cell Treatment | $5,000 | $15,000 | Multiple sessions and complex conditions at upper end |
| Urology | $1,800 | $6,000 | Robotic surgery at upper end |
| Ophthalmology | $800 | $4,000 | Corneal transplant and complex retinal surgery at upper end |
| Ear Nose Throat | $1,200 | $5,000 | Cochlear implant and skull base surgery at upper end |

- [ ] Add `toPrice` to all 12 EN treatment files
- [ ] Add `toPrice` to all 12 BN treatment files (match EN values, keep currency in USD)

### Step 1.7: Verify `FAQAccordion` component readiness

**File:** `frontend/src/design-system/components/organisms/FAQAccordion.tsx`

The component already exists and is used on the homepage. Verify:
- [ ] Answers render as plain text (not markdown) — if markdown is needed in answers, update to use a lightweight renderer
- [ ] Component is importable from Astro pages (it's a React component, needs `client:load` or `client:visible`)
- [ ] Styling matches the cream/ink design system on detail pages

---

## Phase 2: Page Template Integration (code changes)

### Step 2.1: Treatment detail pages — render auto-generated FAQs + schema

**Files to modify:**
- `frontend/src/pages/treatments/[slug].astro` (EN)
- `frontend/src/pages/bn/treatments/[slug].astro` (BN)

Changes per file:
1. Import `FAQAccordion`, `faqPage` from schema, and `generateTreatmentFaqs` + `mergeFaqs` from `faq-generator`
2. Call `generateTreatmentFaqs()` with treatment data, resolved related doctor names, resolved related hospital names, and locale
3. Merge with `treatment.faqs` (manual overrides) via `mergeFaqs(autoFaqs, treatment.faqs || [])`
4. If merged FAQs array is non-empty, render `<FAQAccordion items={mergedFaqs} client:visible />` after the markdown content section, before the related hospitals section
5. Add a heading using `t.treatments.detail.faqTitle` above the accordion
6. If merged FAQs array is non-empty, add `faqPage({ entries: mergedFaqs })` to the `jsonLd` array

- [ ] Update EN treatment `[slug].astro`
- [ ] Update BN treatment `[slug].astro`

### Step 2.2: Doctor detail pages — render auto-generated FAQs + enriched schema

**Files to modify:**
- `frontend/src/pages/doctors/[slug].astro` (EN)
- `frontend/src/pages/bn/doctors/[slug].astro` (BN)

Changes per file:
1. Import `FAQAccordion`, `faqPage` from schema, and `generateDoctorFaqs` + `mergeFaqs` from `faq-generator`
2. Call `generateDoctorFaqs()` with doctor data, resolved hospital name, and locale
3. Merge with `doctor.faqs` (manual overrides) via `mergeFaqs(autoFaqs, doctor.faqs || [])`
4. If merged FAQs array is non-empty, render `<FAQAccordion items={mergedFaqs} client:visible />` after the languages section, before the CTAs
5. Add a heading using `t.doctors.detail.faqTitle` above the accordion
6. If merged FAQs array is non-empty, add `faqPage({ entries: mergedFaqs })` to the `jsonLd` array
7. Enrich the `physician()` schema call with new fields: `knowsAbout`, `qualification`, `yearsExperience`, `languages`

- [ ] Update EN doctor `[slug].astro`
- [ ] Update BN doctor `[slug].astro`

### Step 2.3: Hospital detail pages — render auto-generated FAQs + schema

**Files to modify:**
- `frontend/src/pages/hospitals/[slug].astro` (EN)
- `frontend/src/pages/bn/hospitals/[slug].astro` (BN)

Changes per file:
1. Import `FAQAccordion`, `faqPage` from schema, and `generateHospitalFaqs` + `mergeFaqs` from `faq-generator`
2. Call `generateHospitalFaqs()` with hospital data and locale
3. Merge with `hospital.faqs` (manual overrides) via `mergeFaqs(autoFaqs, hospital.faqs || [])`
4. If merged FAQs array is non-empty, render `<FAQAccordion items={mergedFaqs} client:visible />` after the amenities/content section, before the doctors list
5. Add a heading using `t.hospitals.detail.faqTitle` above the accordion
6. If merged FAQs array is non-empty, add `faqPage({ entries: mergedFaqs })` to the `jsonLd` array

- [ ] Update EN hospital `[slug].astro`
- [ ] Update BN hospital `[slug].astro`

---

## Phase 3: Manual FAQ Overrides (optional, content files)

> **With the hybrid approach, Phase 3 is now OPTIONAL.**
> Auto-generated FAQs from Phase 1-2 will cover the standard question set for all 68 pages automatically.
> This phase is only needed for entity-specific questions that can't be auto-generated from frontmatter.

### When to add manual FAQs

Add manual `faqs` frontmatter only when you want to:
- Include entity-specific questions (e.g. "What is Dr. Roy's success rate with epilepsy surgery?")
- Override an auto-generated answer with a more specific/customized one
- Add questions about awards, publications, or unique procedures

### How manual overrides work

Add a `faqs` array to the frontmatter of any content file:

```yaml
faqs:
  - question: "What is Dr. Roy's success rate with epilepsy surgery?"
    answer: "Dr. Roy has over 45 years of experience in epilepsy management..."
  - question: "Has Dr. Roy received any international awards?"
    answer: "Yes, Dr. Roy received the Health Professional of the Year award..."
```

The `mergeFaqs()` function will:
- Use the manual answer if the question matches an auto-generated one
- Append the manual question if it's new

### Guidelines for Manual FAQ Content

**AEO principles:**
- Questions should mirror natural search queries ("How much does...", "What is the recovery time for...", "Is [procedure] safe?")
- Answers should be concise (2-4 sentences), direct, and self-contained
- Use factual, specific data where possible (numbers, durations, prices)

**GEO principles:**
- Include verifiable claims (success rates, accreditation names, experience years)
- Write in conversational Q&A format
- Back claims with context (e.g. "JCI-accredited Apollo Hospitals" not just "accredited hospital")

### Step 3.1: Treatment-specific manual FAQs (optional)

Add manual FAQs only for treatments that have unique questions beyond the auto-generated set:

- [ ] `neuro-and-spine-surgery.md` (EN + BN) — add 2-4 treatment-specific FAQs (e.g. "What is the success rate of brain tumour surgery?", "Is minimally invasive spine surgery available?")
- [ ] `cardiology.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `cancer-treatment.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `orthopedics-surgery.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `organ-treatment.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `cosmetic-surgery.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `bariatric-weight-loss.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `infertility-treatment.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `ophthalmology.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `ear-nose-throat.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `stem-cell-treatment.md` (EN + BN) — add 2-4 treatment-specific FAQs
- [ ] `urology.md` (EN + BN) — add 2-4 treatment-specific FAQs

### Step 3.2: Doctor-specific manual FAQs (optional)

Add manual FAQs for doctors with notable awards, publications, or unique expertise:

- [ ] `dr-ajit-kumar-roy.md` (EN + BN) — awards, publications, specific procedures
- [ ] `dr-s-vidyadhara.md` (EN + BN) — spine-specific expertise
- [ ] `dr-deepak-dubey.md` (EN + BN) — specialty-specific
- [ ] `dr-shabber-zaveri.md` (EN + BN) — specialty-specific
- [ ] `dr-sumit-talwar.md` (EN + BN) — specialty-specific
- [ ] `dr-sunil-g-kini.md` (EN + BN) — specialty-specific
- [ ] `dr-vishwanath-s.md` (EN + BN) — specialty-specific
- [ ] `dr-amit-rauthan.md` (EN + BN) — specialty-specific
- [ ] Remaining doctors — add manual FAQs only if they have unique expertise to highlight

### Step 3.3: Hospital-specific manual FAQs (optional)

Add manual FAQs for hospitals with unique features:

- [ ] `apollo-hospitals-bannerghatta.md` (EN + BN) — specific accreditations, unique departments
- [ ] `fortis-hospital-bannerghatta.md` (EN + BN) — specific features
- [ ] `manipal-hospital-old-airport-road.md` (EN + BN) — specific features
- [ ] `narayana-institute-cardiac-sciences.md` (EN + BN) — cardiac-specific
- [ ] `sparsh-hospital-hennur.md` (EN + BN) — orthopedic-specific

---

## Phase 4: Additional GEO Enhancements (optional, higher effort)

### Step 4.1: Add summary/TL;DR blocks to treatment pages

Add a concise 2-3 sentence summary at the top of each treatment markdown body (after the first `## Overview` heading). This gives generative AI engines an extractable, self-contained answer block.

- [ ] Add summary blocks to all 12 EN treatment files
- [ ] Add summary blocks to all 12 BN treatment files

### Step 4.2: Add cost comparison tables to treatment pages

Add a markdown table comparing treatment costs (India vs US/UK) to each treatment page. This is a top GEO/AEO query pattern.

Example format:
```markdown
## Cost Comparison

| Country | Approximate Cost |
|---------|-----------------|
| India (Bangalore) | $4,000 |
| USA | $25,000-40,000 |
| UK | £18,000-30,000 |
```

- [ ] Add cost comparison tables to all 12 EN treatment files
- [ ] Add cost comparison tables to all 12 BN treatment files

### Step 4.3: Add `MedicalWebPage` schema type

Wrap the existing `MedicalProcedure` schema in a `MedicalWebPage` type that references the procedure, conditions, and about sections. This is Google's recommended schema for medical content pages.

- [ ] Implement `medicalWebPage` schema helper in `schema.ts`
- [ ] Inject on treatment detail pages

### Step 4.4: Add `lastmod` to sitemap

Update `scripts/generate-sitemap.mjs` to include `<lastmod>` dates based on file modification times. This signals content freshness to search engines.

- [ ] Update sitemap generator script

---

## Phase 5: Testing & Verification

### Step 5.1: Unit tests

- [ ] Test `faqPage()` schema helper — verify correct JSON-LD output
- [ ] Test `medicalCondition()` schema helper — verify correct JSON-LD output
- [ ] Test enriched `physician()` schema — verify new fields are emitted
- [ ] Test content schema validation — verify `faqs` field accepts valid input and rejects invalid
- [ ] Test `generateTreatmentFaqs()` — verify FAQs are generated from all available frontmatter fields
- [ ] Test `generateDoctorFaqs()` — verify FAQs are generated from all available frontmatter fields
- [ ] Test `generateHospitalFaqs()` — verify FAQs are generated from all available frontmatter fields
- [ ] Test `mergeFaqs()` — verify manual overrides replace auto-generated answers, new manual questions are appended
- [ ] Test generators with minimal frontmatter (missing optional fields) — verify only relevant FAQs are generated
- [ ] Test generators with both EN and BN locales — verify correct locale output

### Step 5.2: Build verification

- [ ] Run `npm run build` — verify no schema validation errors on any content file
- [ ] Verify all 68 content files build successfully with auto-generated FAQs
- [ ] Verify `FAQPage` JSON-LD appears in built HTML for all detail pages
- [ ] Verify `FAQAccordion` renders on all detail pages (manual check or Playwright)
- [ ] Verify auto-generated FAQs contain correct data from frontmatter (spot check 2-3 pages per entity)

### Step 5.3: SEO validation

- [ ] Run Lighthouse SEO audit on treatment, doctor, and hospital detail pages
- [ ] Validate JSON-LD with Google Rich Results Test (https://search.google.com/test/rich-results)
- [ ] Verify FAQ rich snippets eligibility (FAQPage schema present and valid)
- [ ] Check sitemap includes all pages with correct URLs

---

## Implementation Order

1. **Phase 1** (Steps 1.1-1.7) — Schema, infrastructure, FAQ generator & price range data
2. **Phase 2** (Steps 2.1-2.3) — Page template integration (code-only, auto-generates FAQs from existing data)
3. **Phase 5** (Steps 5.1-5.2) — Testing after Phase 1+2 — **all 68 pages now have FAQs without manual content authoring**
4. **Phase 3** (Steps 3.1-3.3) — Optional manual FAQ overrides (incremental, per entity as needed)
5. **Phase 4** (Steps 4.1-4.4) — Optional GEO enhancements (can be done after core FAQ system)

## Estimated Effort

| Phase | Effort | Notes |
|-------|--------|-------|
| Phase 1 | Medium (3-5 hrs) | Schema changes + FAQ generator module + i18n templates + toPrice data (24 files) |
| Phase 2 | Medium (2-3 hrs) | 6 page templates, merge logic, schema injection |
| Phase 3 | Small (2-4 hrs) | Optional, only for pages needing custom FAQs |
| Phase 4 | Medium (3-5 hrs) | Optional, can be deferred |
| Phase 5 | Small (1-2 hrs) | Tests + validation |

> **Key benefit of hybrid approach:** Phases 1+2 alone deliver auto-generated FAQs on all 68 pages.
> Phase 3 is optional enhancement, not a prerequisite for launch.

## Files Modified Summary

**Code files (new/modified):**
- `frontend/src/content/config.ts` — add optional `faqs` field to 3 schemas
- `frontend/src/lib/schema.ts` — add `faqPage`, `medicalCondition`, enrich `physician`
- `frontend/src/lib/faq-generator.ts` **(NEW)** — auto-FAQ generation utilities + `mergeFaqs`
- `frontend/src/pages/treatments/[slug].astro` — render auto-FAQs + schema
- `frontend/src/pages/bn/treatments/[slug].astro` — render auto-FAQs + schema
- `frontend/src/pages/doctors/[slug].astro` — render auto-FAQs + enriched schema
- `frontend/src/pages/bn/doctors/[slug].astro` — render auto-FAQs + enriched schema
- `frontend/src/pages/hospitals/[slug].astro` — render auto-FAQs + schema
- `frontend/src/pages/bn/hospitals/[slug].astro` — render auto-FAQs + schema
- `frontend/src/i18n/en.json` — add FAQ template strings + `faqTitle` keys
- `frontend/src/i18n/bn.json` — add FAQ template strings + `faqTitle` keys

**Content files (required for pricing, optional for manual FAQs):**
- 24 treatment files (12 EN + 12 BN) — add `toPrice` frontmatter (required for price range FAQs)
- Up to 24 treatment files (12 EN + 12 BN) — optional `faqs` frontmatter (manual overrides only)
- Up to 34 doctor files (17 EN + 17 BN) — optional `faqs` frontmatter (manual overrides only)
- Up to 10 hospital files (5 EN + 5 BN) — optional `faqs` frontmatter (manual overrides only)

**Test files (new):**
- `frontend/src/lib/__tests__/schema.test.ts` — schema helper tests
- `frontend/src/lib/__tests__/faq-generator.test.ts` — FAQ generator + merge logic tests
