# Our Treatment Pages — Current Structure Analysis & Improvement Plan

> **Purpose:** Document our current treatment page architecture, compare it against the competitor's two-tier structure, and plan a concrete improvement roadmap for our URL structure and content.
>
> **Audience:** Developers, content writers, and SEO specialists on the Khan Meditour team.
>
> **Last updated:** 2026-09-05

---

## 1. Current Architecture

### 1.1 URL Structure (Flat — Single Tier)

| Route | Page | Example |
|-------|------|---------|
| `/treatments` | Treatment listing page (all 18 treatments) | `khanmeditour.com/treatments` |
| `/treatments/{slug}` | Treatment detail page | `khanmeditour.com/treatments/hematology-bone-marrow` |
| `/bn/treatments` | Bengali treatment listing | `khanmeditour.com/bn/treatments` |
| `/bn/treatments/{slug}` | Bengali treatment detail | `khanmeditour.com/bn/treatments/hematology-bone-marrow` |

**Total treatment content files:** 18 EN + 18 BN = 36 markdown files in `src/content/treatments/`

**Current treatment slugs (18):**
```
bariatric-weight-loss
cancer-treatment
cardiology
cosmetic-surgery
ear-nose-throat
gastroenterology-gi-surgery
hematology-bone-marrow
infertility-treatment
nephrology-kidney-care
neuro-and-spine-surgery
neurology
ophthalmology
organ-treatment
orthopedics-surgery
paediatric-neurology
pulmonology-lung-care
stem-cell-treatment
urology
```

### 1.2 Content Schema (`src/content/config.ts`)

```typescript
treatments = defineCollection({
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    category: z.string().optional(),
    description: z.string().min(1),
    fromPrice: z.string().optional(),
    toPrice: z.string().optional(),
    procedures: z.array(z.string()).optional(),       // list of procedure names
    relatedDoctorSlugs: z.array(z.string()).optional(),
    relatedHospitalSlugs: z.array(z.string()).optional(),
    duration: z.string().optional(),
    hospitalStay: z.string().optional(),
    recoveryTime: z.string().optional(),
    image: z.string().optional(),
    seoHeadline: z.string().optional(),                // long-tail SEO H1
    targetCountry: targetCountrySchema.optional(),
    faqs: z.array(z.object({ question, answer })).optional(),
  }),
})
```

### 1.3 Treatment Detail Page Sections (Current)

**Template:** `src/pages/treatments/[slug].astro` (429 lines)

| # | Section | Component | Content Source |
|---|---------|-----------|----------------|
| 1 | **Navbar** | `Navbar` | Static nav links + WhatsApp + Call |
| 2 | **Dark Hero** | Inline section | `treatment.image` as bg + gradient overlay |
| 2a | Breadcrumb | `Breadcrumb` | Home → Treatments → {name} |
| 2b | Category chip | Inline | `treatment.category` |
| 2c | H1 | Inline | `seoHeadline ?? name` |
| 2d | Description | Inline | `treatment.description` |
| 2e | QuickFacts | `QuickFacts` | duration, hospitalStay, recoveryTime, price |
| 2f | CTAs | `LeadModalTrigger` + WhatsApp link | Book + WhatsApp |
| 3 | **Related Doctors** | `DoctorCard` grid | `relatedDoctorSlugs` → doctors |
| 4 | **Procedures** | `StepCards` | `treatment.procedures` as numbered cards |
| 5 | **Markdown Body** | `<Content />` | Markdown content (Overview, Conditions, Procedures, Technology, Cost, Why Bangalore, Considerations) |
| 6 | **Patient Journey** | `StepTimeline` | Fixed 4-step journey (i18n strings) |
| 7 | **Treating Hospitals** | Inline card grid | `relatedHospitalSlugs` → hospitals |
| 8 | **Sticky Rail** | Inline aside | Lead form trigger + WhatsApp |
| 9 | **FAQ** | `FAQAccordion` | Manual `faqs` + auto-generated FAQs |
| 10 | **Mid-page CTA** | Inline dark band | Consult CTA + WhatsApp |
| 11 | **Contact / Lead Form** | `LeadForm` | Full lead form |
| 12 | **Footer** | `Footer` | Standard footer |

### 1.4 Treatment Listing Page (Current)

**Template:** `src/pages/treatments.astro` (69 lines)
**Component:** `src/components/TreatmentsPage.tsx` (58 lines)

Sections:
1. Navbar
2. H1 + subtitle
3. FilterChips (by category)
4. TreatmentCard grid (3 columns)
5. CTA section
6. Footer

**Each TreatmentCard shows:** name, description, fromPrice, category tag, image, link to `/treatments/{slug}`

### 1.5 JSON-LD Schema (Current)

Each treatment detail page generates:
- `MedicalProcedure` — name, url, description, image, procedureType
- `MedicalWebPage` — name, url, description, image, inLanguage, specialty, about, audience
- `BreadcrumbList` — Home → Treatments → {name}
- `FAQPage` — manual + auto-generated FAQs

### 1.6 Markdown Body Content Structure (Current)

Each treatment `.md` file contains these sections (varies slightly):

```markdown
## Overview
> **Summary:** ... (block-quote summary)

## Conditions Treated
### {Subcategory 1}
- bullet list
### {Subcategory 2}
- bullet list

## Procedures & Interventions
### {Procedure 1}
description
### {Procedure 2}
description

## Advanced Technology
- bullet list

## Cost Comparison
| Country | Cost |
|---------|------|
| India   | $X   |
| USA     | $Y   |

## Why Choose Bangalore for {Treatment}?
- bullet list

## Important Considerations
- bullet list
```

### 1.7 WhatsApp Links (Current)

`getTreatmentInquiryLink(treatmentName)` generates:
```
https://wa.me/{number}?text=Hi Khan Meditour, I am interested in {treatmentName} and would like to know more.
```

---

## 2. Gap Analysis — Our Structure vs Competitor

| Feature | Khan Meditour (Current) | Medical Tours India (Competitor) | Gap |
|---------|------------------------|----------------------------------|-----|
| **URL hierarchy** | Flat: `/treatments/{slug}` | Two-tier: `/treatments/{category}/{procedure}` | **Major** |
| **Sub-procedure pages** | None — procedures are listed as StepCards or markdown H3s | Each procedure has its own detail page | **Major** |
| **"In short" summary block** | Block-quote in markdown body | Dedicated styled callout after hero | Medium |
| **Cost badge in hero** | QuickFacts chip with price range | Large prominent cost badge | Medium |
| **Cost comparison "X× higher" multiplier** | Raw cost table | Table with "vs India" multiplier column | Medium |
| **Risk/complications section** | "Important Considerations" (bullet list) | Dedicated "Risks, complications, and mitigation" section | Medium |
| **Recovery timeline with fit-to-fly** | `recoveryTime` QuickFacts chip + markdown mention | Dedicated "Recovery timeline and fit-to-fly planning" section | Medium |
| **"What's included in cost" section** | Not present | Dedicated section with inclusions/exclusions | **Major** |
| **"Who is this for" eligibility section** | Not present | Dedicated section with bullet-list criteria | Medium |
| **Country cross-links on treatment pages** | Not present | Links to 7+ country pages | **Major** |
| **Related procedures cross-links** | Not present | Links to 3 related procedures with cost chips | Medium |
| **City pages** | Not present | `/cities/{city}` pages | Low |
| **Procedure-specific WhatsApp message** | Generic treatment message | Procedure-specific pre-filled message | Low |
| **Bilingual content** | ✓ EN + BN | ✗ English only | **Our advantage** |
| **Doctor profile pages** | ✓ 52 doctors | ✗ None | **Our advantage** |
| **Treatment card images** | ✓ | ✗ | **Our advantage** |
| **`seoHeadline` for long-tail H1** | ✓ | Partial | **Our advantage** |

---

## 3. Improvement Plan

### Phase 1: Content Enhancements (No URL changes — low risk)

These improvements can be made to existing pages without changing the URL structure.

#### 1.1 Add "In Short" Summary Callout

**What:** Add a styled "In short" callout box immediately after the hero, before the related doctors section.

**Schema change:** Add `summary` field to treatment schema:
```typescript
summary: z.string().optional(),
```

**Template change:** Add after hero section in `[slug].astro`:
```astro
{treatment.summary && (
  <section class="container py-8">
    <div class="rounded-card border border-cream-300 bg-cream-100 p-6">
      <p class="text-sm font-semibold uppercase tracking-wide text-violet-600">In short</p>
      <p class="mt-2 text-lg text-ink/80">{treatment.summary}</p>
    </div>
  </section>
)}
```

**Content change:** Add `summary` to all 18 EN + 18 BN treatment files. Example for hematology:
```yaml
summary: "Hematology & bone marrow transplant in Bangalore is available at JCI-accredited hospitals with packages from $15,000–$55,000. Khan Meditour coordinates written estimates, visa support, and travel logistics — usually within 24-48 hours."
```

**Files to modify:**
- `src/content/config.ts` — add `summary` field
- `src/pages/treatments/[slug].astro` — add summary section
- `src/pages/bn/treatments/[slug].astro` — add summary section
- All 36 treatment `.md` files — add `summary` frontmatter

#### 1.2 Add Cost Badge to Hero

**What:** Display a prominent cost badge in the hero alongside the QuickFacts.

**Template change:** Add to hero section, after the H1/description:
```astro
{priceValue && (
  <div class="mt-6 inline-flex items-baseline gap-2 rounded-card bg-white/10 px-5 py-3 backdrop-blur-sm">
    <span class="text-sm text-cream-100/70">Typical India cost</span>
    <span class="font-display text-2xl font-bold text-white">{priceValue}</span>
  </div>
)}
```

**Files to modify:**
- `src/pages/treatments/[slug].astro` — add cost badge
- `src/pages/bn/treatments/[slug].astro` — add cost badge

#### 1.3 Add "X× Higher" Multiplier to Cost Tables

**What:** Add a "vs India" column to cost comparison tables in markdown content.

**Content change:** Update cost tables in all 36 treatment files:
```markdown
| Country | Cost | vs India |
|---------|------|----------|
| India (Bangalore) | $15,000 – $55,000 | Baseline |
| USA | $200,000 – $500,000 | ~8× higher |
| UK | £150,000 – £300,000 | ~5× higher |
| Singapore | $120,000 – $250,000 | ~3× higher |
```

**CSS change:** Update `.prose-editorial table` styles in `global.css` to handle 3-column tables.

#### 1.4 Add "What's Included in the Cost" Section

**What:** Add a standardized section to each treatment page showing inclusions and exclusions.

**Schema change:** Add structured fields:
```typescript
costInclusions: z.array(z.string()).optional(),
costExclusions: z.array(z.string()).optional(),
```

**Template change:** Add a section after the markdown body:
```astro
{(treatment.costInclusions || treatment.costExclusions) && (
  <section class="mt-12">
    <h2 class="mb-6 font-display text-2xl font-bold text-ink md:text-3xl">What's Included in the Cost</h2>
    <div class="grid gap-6 md:grid-cols-2">
      {treatment.costInclusions && (
        <div class="rounded-card border border-cream-300 bg-cream-100 p-6">
          <h3 class="mb-4 font-semibold text-ink">Included</h3>
          <ul class="space-y-2">
            {treatment.costInclusions.map((item) => (
              <li class="flex items-start gap-2 text-sm text-ink/70">
                <Icon name="check" size={16} class="mt-0.5 text-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {treatment.costExclusions && (
        <div class="rounded-card border border-cream-300 bg-cream-100 p-6">
          <h3 class="mb-4 font-semibold text-ink">Not Included</h3>
          <ul class="space-y-2">
            {treatment.costExclusions.map((item) => (
              <li class="flex items-start gap-2 text-sm text-ink/70">
                <Icon name="x" size={16} class="mt-0.5 text-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </section>
)}
```

#### 1.5 Add "Who Is This Treatment For?" Section

**What:** Add an eligibility/candidate section after the overview.

**Schema change:**
```typescript
eligibility: z.array(z.string()).optional(),
```

**Template change:** Add after the summary callout:
```astro
{treatment.eligibility && treatment.eligibility.length > 0 && (
  <section class="container py-8">
    <h2 class="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">Who Is This Treatment For?</h2>
    <ul class="grid gap-3 md:grid-cols-2">
      {treatment.eligibility.map((item) => (
        <li class="flex items-start gap-2 text-ink/70">
          <Icon name="check-circle" size={20} class="mt-0.5 text-violet-600" />
          {item}
        </li>
      ))}
    </ul>
  </section>
)}
```

#### 1.6 Add Recovery Timeline Section

**What:** Add a structured recovery timeline table.

**Schema change:**
```typescript
recoveryTimeline: z.array(z.object({
  phase: z.string(),
  duration: z.string(),
  description: z.string(),
})).optional(),
```

**Template change:** Add after the markdown body:
```astro
{treatment.recoveryTimeline && treatment.recoveryTimeline.length > 0 && (
  <section class="mt-12">
    <h2 class="mb-6 font-display text-2xl font-bold text-ink md:text-3xl">Recovery Timeline</h2>
    <div class="overflow-hidden rounded-card border border-cream-300">
      <table class="w-full text-left text-sm">
        <thead class="bg-ink text-white">
          <tr><th class="px-4 py-3">Phase</th><th class="px-4 py-3">Duration</th><th class="px-4 py-3">What to Expect</th></tr>
        </thead>
        <tbody>
          {treatment.recoveryTimeline.map((row) => (
            <tr class="border-t border-cream-300">
              <td class="px-4 py-3 font-semibold text-ink">{row.phase}</td>
              <td class="px-4 py-3 text-ink/70">{row.duration}</td>
              <td class="px-4 py-3 text-ink/70">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
```

#### 1.7 Add Country Cross-Links to Treatment Pages

**What:** Add a "Treatment for {Nationality} Patients" section at the bottom linking to country pages.

**Template change:** Add before the FAQ section:
```astro
<section class="mt-12">
  <h2 class="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
    {t.treatments.detail.countryLinksTitle}
  </h2>
  <div class="flex flex-wrap gap-3">
    {countryLinks.map((c) => (
      <a href={c.href} class="rounded-card border border-cream-300 bg-cream-100 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white">
        {c.label}
      </a>
    ))}
  </div>
</section>
```

**Data source:** Import country list from `src/data/countries/index.ts` and filter to active countries.

#### 1.8 Add Related Treatments Cross-Links

**What:** Add a "Related Treatments" section linking to 3-4 related treatment pages.

**Schema change:**
```typescript
relatedTreatmentSlugs: z.array(z.string()).optional(),
```

**Template change:** Add after the treating hospitals section:
```astro
{relatedTreatments.length > 0 && (
  <section class="mt-12">
    <h2 class="mb-4 font-display text-xl font-semibold text-ink">Related Treatments</h2>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {relatedTreatments.map((rt) => (
        <a href={`/treatments/${rt.slug}`} class="rounded-card border border-cream-300 bg-cream-100 p-4 transition-colors hover:border-violet-300 hover:bg-cream-200">
          <p class="text-sm font-semibold text-ink">{rt.name}</p>
          {rt.fromPrice && <p class="mt-1 text-xs text-ink/50">From {rt.fromPrice}</p>}
        </a>
      ))}
    </div>
  </section>
)}
```

#### 1.9 Enhance WhatsApp Deep Links

**What:** Make WhatsApp messages more specific with cost and recovery info.

**Library change:** Update `getTreatmentInquiryLink` in `src/lib/whatsapp.ts`:
```typescript
export function getTreatmentInquiryLink(
  treatmentName: string,
  options?: { costRange?: string; recoveryTime?: string }
): string {
  const number = getWhatsAppNumber();
  if (!number) return '';
  let message = `Hi Khan Meditour, I am interested in ${treatmentName} in India.`;
  if (options?.costRange) message += ` I see the cost is around ${options.costRange}.`;
  message += ' Please help me with hospital options, costs, and visa support.';
  return buildWhatsAppLink(number, message);
}
```

---

### Phase 2: Two-Tier URL Structure (Major change — higher risk)

This is the biggest structural change. It introduces sub-procedure detail pages.

#### 2.1 New URL Structure

| Route | Page | Example |
|-------|------|---------|
| `/treatments` | Treatment listing (unchanged) | `/treatments` |
| `/treatments/{slug}` | Treatment category page (enhanced) | `/treatments/hematology-bone-marrow` |
| `/treatments/{slug}/{procedure-slug}` | Procedure detail page (NEW) | `/treatments/hematology-bone-marrow/allogeneic-stem-cell-transplant` |
| `/bn/treatments/{slug}/{procedure-slug}` | Bengali procedure detail (NEW) | `/bn/treatments/hematology-bone-marrow/allogeneic-stem-cell-transplant` |

#### 2.2 New Content Collection: Procedures

**Schema (`src/content/config.ts`):**
```typescript
const procedures = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    seoHeadline: z.string().optional(),
    /** Parent treatment slug — e.g., "hematology-bone-marrow" */
    parentTreatmentSlug: z.string().min(1),
    summary: z.string().min(1),
    description: z.string().min(1),
    fromPrice: z.string().optional(),
    toPrice: z.string().optional(),
    duration: z.string().optional(),
    hospitalStay: z.string().optional(),
    recoveryTime: z.string().optional(),
    image: z.string().optional(),
    /** Who is this procedure for — eligibility criteria */
    eligibility: z.array(z.string()).optional(),
    /** What's included in the cost */
    costInclusions: z.array(z.string()).optional(),
    costExclusions: z.array(z.string()).optional(),
    /** Recovery timeline phases */
    recoveryTimeline: z.array(z.object({
      phase: z.string(),
      duration: z.string(),
      description: z.string(),
    })).optional(),
    /** Risks and mitigation */
    risks: z.array(z.string()).optional(),
    relatedDoctorSlugs: z.array(z.string()).optional(),
    relatedHospitalSlugs: z.array(z.string()).optional(),
    relatedProcedureSlugs: z.array(z.string()).optional(),
    faqs: z.array(z.object({ question, answer })).optional(),
  }),
})
```

**Directory structure:**
```
src/content/procedures/
  en/
    hematology-bone-marrow/
      allogeneic-stem-cell-transplant.md
      autologous-stem-cell-transplant.md
      car-t-cell-therapy.md
      leukemia-treatment.md
      ...
    cardiology/
      coronary-bypass-surgery.md
      angioplasty.md
      valve-replacement.md
      ...
  bn/
    hematology-bone-marrow/
      allogeneic-stem-cell-transplant.md
      ...
```

#### 2.3 New Route: Procedure Detail Page

**File:** `src/pages/treatments/[slug]/[procedure].astro`

**Sections (modeled on competitor + our improvements):**
1. Navbar
2. Dark hero with cost badge + recovery summary + CTAs
3. "In short" summary callout
4. "What {procedure} involves" — clinical description
5. "Who {procedure} is for" — eligibility criteria
6. "Process for international patients" — step-by-step
7. "Risks, complications, and mitigation" — honest risk section
8. "Recovery timeline and fit-to-fly" — structured timeline
9. "Cost of {procedure} in India" — cost breakdown with inclusions/exclusions
10. "Cost comparison: India vs other countries" — table with "X× higher" multiplier
11. Related doctors
12. Partner hospitals
13. Medical visa process steps (4-step)
14. FAQ accordion
15. Related procedures
16. Country cross-links
17. Mid-page CTA
18. Contact / Lead form
19. Footer

**JSON-LD schema:**
- `MedicalProcedure` (procedure-level)
- `MedicalWebPage`
- `BreadcrumbList` (4 levels: Home → Treatments → {Category} → {Procedure})
- `FAQPage`

#### 2.4 Enhanced Treatment Category Page

**What:** The existing `/treatments/{slug}` page becomes a category hub that lists procedure cards.

**Changes to `[slug].astro`:**
- Keep existing hero, QuickFacts, doctors, markdown body
- Add a "Procedures in {Treatment}" grid section (like competitor's procedure cards)
- Each procedure card shows: name, 1-sentence description, cost chip, stay chip, link to procedure page
- Add country cross-links
- Add related treatments

**New section to add (after the StepCards or replacing them):**
```astro
{procedures.length > 0 && (
  <section class="mt-12">
    <h2 class="mb-6 font-display text-2xl font-bold text-ink md:text-3xl">
      {t.treatments.detail.proceduresHeading}
    </h2>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {procedures.map((p) => (
        <a href={`/treatments/${slug}/${p.slug}`} class="group rounded-card border border-cream-300 bg-cream-100 p-6 transition-all hover:border-violet-300 hover:shadow-base">
          <h3 class="font-display text-lg font-semibold text-ink">{p.name}</h3>
          <p class="mt-2 text-sm text-ink/60 line-clamp-2">{p.summary}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            {p.fromPrice && (
              <span class="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                {p.fromPrice} – {p.toPrice}
              </span>
            )}
            {p.hospitalStay && (
              <span class="rounded-full bg-cream-200 px-3 py-1 text-xs text-ink/60">
                {p.hospitalStay}
              </span>
            )}
          </div>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 group-hover:gap-2">
            Learn more →
          </span>
        </a>
      ))}
    </div>
  </section>
)}
```

#### 2.5 Procedures to Create (Initial Set)

Based on the competitor's structure and our existing `procedures` frontmatter lists, here are the initial sub-procedures to create:

**Hematology & Bone Marrow (6 procedures):**
1. `allogeneic-stem-cell-transplant` — $25,000–$55,000
2. `autologous-stem-cell-transplant` — $15,000–$30,000
3. `car-t-cell-therapy` — $40,000–$80,000
4. `leukemia-treatment` — $8,000–$35,000
5. `thalassemia-transplant` — $18,000–$45,000
6. `aplastic-anemia-treatment` — $10,000–$45,000

**Cardiology (5 procedures):**
1. `coronary-bypass-surgery` — $4,500–$12,000
2. `angioplasty-stent` — $2,500–$6,000
3. `heart-valve-replacement` — $6,000–$15,000
4. `pacemaker-implantation` — $3,000–$7,000
5. `pediatric-cardiac-surgery` — $8,000–$20,000

**Cancer Treatment (5 procedures):**
1. `chemotherapy` — $500–$2,500/cycle
2. `radiation-therapy` — $3,000–$8,000
3. `immunotherapy` — $5,000–$15,000
4. `surgical-oncology` — $4,000–$15,000
5. `targeted-therapy` — $3,000–$12,000

**Orthopedics (4 procedures):**
1. `total-knee-replacement` — $3,500–$7,000
2. `total-hip-replacement` — $4,000–$8,000
3. `shoulder-replacement` — $5,000–$10,000
4. `arthroscopy` — $2,000–$5,000

**Infertility/IVF (3 procedures):**
1. `ivf-treatment` — $1,500–$4,000
2. `icsi-treatment` — $2,000–$5,000
3. `surrogacy-program` — $10,000–$25,000

**Organ Transplant (3 procedures):**
1. `liver-transplant` — $25,000–$60,000
2. `kidney-transplant` — $15,000–$40,000
3. `heart-transplant` — $50,000–$100,000

**Total initial procedures:** ~26 procedures × 2 locales = 52 new content files

> **Update:** The initial 26-procedure scope has been superseded by the complete 68-procedure mapping in `PROCEDURE_URL_STRUCTURE_MAPPING.md`. All 68 procedures × 2 locales = 136 content files have been created and standardized. See the URL mapping doc for the canonical category/procedure list and the actual file inventory.

---

### Phase 3: Treatment Listing Page Enhancement

#### 3.1 Add "In Short" Summaries to Treatment Cards

**What:** Show a 1-sentence summary on each treatment card in the listing page.

**Change:** Pass `summary` to the `TreatmentCard` component and render it below the description.

#### 3.2 Add Cost Range Chip to Treatment Cards

**What:** Show "From $X" on each card.

**Change:** Pass `fromPrice`/`toPrice` to the card and render as a chip.

#### 3.3 Add Category Descriptions

**What:** When a category filter is active, show a category description block at the top.

---

## 4. Implementation Priority

| Priority | Task | Phase | Effort | Impact |
|----------|------|-------|--------|--------|
| **P0** | Add `summary` field + "In short" callout | Phase 1.1 | Low | High |
| **P0** | Add cost badge to hero | Phase 1.2 | Low | High |
| **P0** | Add "X× higher" multiplier to cost tables | Phase 1.3 | Low | Medium |
| **P0** | Add "What's included in cost" section | Phase 1.4 | Medium | High |
| **P1** | Add "Who is this for" eligibility section | Phase 1.5 | Low | Medium |
| **P1** | Add recovery timeline section | Phase 1.6 | Medium | Medium |
| **P1** | Add country cross-links to treatment pages | Phase 1.7 | Low | High |
| **P1** | Add related treatments cross-links | Phase 1.8 | Low | Medium |
| **P1** | Enhance WhatsApp deep links | Phase 1.9 | Low | Low |
| **P2** | Create procedures content collection + schema | Phase 2.2 | Medium | High |
| **P2** | Create procedure detail page template | Phase 2.3 | High | High |
| **P2** | Enhance treatment category page with procedure cards | Phase 2.4 | Medium | High |
| **P2** | Write 26 EN procedure content files | Phase 2.5 | High | High |
| **P2** | Write 26 BN procedure content files | Phase 2.5 | High | High |
| **P3** | Enhance treatment listing page | Phase 3 | Low | Low |

---

## 5. Schema Changes Summary

### Phase 1 additions to `treatments` collection:
```typescript
// Add to existing treatments schema:
summary: z.string().optional(),
eligibility: z.array(z.string()).optional(),
costInclusions: z.array(z.string()).optional(),
costExclusions: z.array(z.string()).optional(),
recoveryTimeline: z.array(z.object({
  phase: z.string(),
  duration: z.string(),
  description: z.string(),
})).optional(),
risks: z.array(z.string()).optional(),
relatedTreatmentSlugs: z.array(z.string()).optional(),
```

### Phase 2 new `procedures` collection:
```typescript
const procedures = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    seoHeadline: z.string().optional(),
    parentTreatmentSlug: z.string().min(1),
    summary: z.string().min(1),
    description: z.string().min(1),
    fromPrice: z.string().optional(),
    toPrice: z.string().optional(),
    duration: z.string().optional(),
    hospitalStay: z.string().optional(),
    recoveryTime: z.string().optional(),
    image: z.string().optional(),
    eligibility: z.array(z.string()).optional(),
    costInclusions: z.array(z.string()).optional(),
    costExclusions: z.array(z.string()).optional(),
    recoveryTimeline: z.array(z.object({
      phase: z.string(),
      duration: z.string(),
      description: z.string(),
    })).optional(),
    risks: z.array(z.string()).optional(),
    relatedDoctorSlugs: z.array(z.string()).optional(),
    relatedHospitalSlugs: z.array(z.string()).optional(),
    relatedProcedureSlugs: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })).optional(),
  }),
});
```

---

## 6. File Impact Summary

### Phase 1 (content enhancements — no new routes):
| File | Change |
|------|--------|
| `src/content/config.ts` | Add 7 new optional fields to treatments schema |
| `src/pages/treatments/[slug].astro` | Add 5 new sections (summary, cost badge, eligibility, recovery timeline, cost inclusions, country links, related treatments) |
| `src/pages/bn/treatments/[slug].astro` | Same as EN template |
| `src/lib/whatsapp.ts` | Enhance `getTreatmentInquiryLink` with options |
| `src/i18n/en.json` | Add new i18n strings for new sections |
| `src/i18n/bn.json` | Add Bengali translations |
| `src/design-system/styles/global.css` | Update table styles for 3-column cost tables |
| 36 treatment `.md` files | Add `summary`, `eligibility`, `costInclusions`, `costExclusions`, `recoveryTimeline`, `risks`, `relatedTreatmentSlugs` frontmatter + update cost tables |

### Phase 2 (two-tier structure — new routes):
| File | Change |
|------|--------|
| `src/content/config.ts` | Add new `procedures` collection |
| `src/pages/treatments/[slug]/[procedure].astro` | NEW — procedure detail template |
| `src/pages/bn/treatments/[slug]/[procedure].astro` | NEW — Bengali procedure detail template |
| `src/pages/treatments/[slug].astro` | Add procedure cards grid section |
| `src/pages/bn/treatments/[slug].astro` | Add procedure cards grid section |
| `src/lib/content.ts` | Add `getProcedures()`, `resolveRelatedProcedures()` |
| `src/lib/schema.ts` | Add procedure-level schema generators |
| `src/lib/whatsapp.ts` | Add `getProcedureInquiryLink()` |
| `src/content/procedures/en/**` | NEW — 26 procedure content files |
| `src/content/procedures/bn/**` | NEW — 26 procedure content files |
| `src/i18n/en.json` | Add procedure page i18n strings |
| `src/i18n/bn.json` | Add Bengali translations |

---

## 7. Migration & Redirect Strategy

### Phase 1
No URL changes — no redirects needed.

### Phase 2
No existing URLs change — we're only adding new routes (`/treatments/{slug}/{procedure}`). The existing `/treatments/{slug}` pages remain as category hubs. No redirects needed.

### SEO considerations for Phase 2:
- Add `<link rel="canonical">` to procedure pages pointing to themselves
- Add hreflang tags between EN and BN procedure pages
- Add `BreadcrumbList` JSON-LD with 4 levels
- Internal link from category page to all procedure pages (and back)
- Submit new procedure URLs via sitemap.xml

---

## 8. Content Template for Procedure Pages

```markdown
---
locale: en
name: Allogeneic Stem Cell Transplant
seoHeadline: "Allogeneic Stem Cell Transplant Cost in India for International Patients"
parentTreatmentSlug: hematology-bone-marrow
summary: "Allogeneic stem cell transplant in India costs $25,000–$55,000 for international patients — 70-85% less than Western countries. Donor search, GVHD prophylaxis, and isolation care are included."
description: Allogeneic transplant from matched related, unrelated, or haploidentical donors treats leukemias, aplastic anemia, and hemoglobinopathies.
fromPrice: '$25,000'
toPrice: '$55,000'
duration: '3-6 hours'
hospitalStay: '4-6 weeks'
recoveryTime: '3-12 months'
image: /images/treatments-cards/hematology-bone-marrow.jpg
eligibility:
  - "Confirmed indication for allogeneic transplant after specialist review"
  - "Acceptable fitness for conditioning chemotherapy"
  - "Available donor (matched sibling, unrelated, or haploidentical)"
  - "Realistic expectations about recovery and follow-up"
costInclusions:
  - "Surgeon and transplant physician fees"
  - "Conditioning chemotherapy"
  - "Stem cell harvesting and infusion"
  - "HEPA-filtered isolation room (4-6 weeks)"
  - "Medications during hospital stay"
  - "Pre-transplant diagnostics and HLA typing"
costExclusions:
  - "International flights"
  - "Accommodation outside hospital"
  - "Post-discharge medications (3-12 months)"
  - "Donor search fees (for unrelated donor registries)"
recoveryTimeline:
  - phase: "Hospital stay (isolation)"
    duration: "4-6 weeks"
    description: "Conditioning, transplant, and engraftment monitoring in HEPA-filtered room"
  - phase: "Bangalore recovery"
    duration: "2-4 weeks"
    description: "Post-discharge monitoring, blood counts, immunosuppression management"
  - phase: "Return home"
    duration: "Month 2-3"
    description: "Gradual recovery, continued immunosuppression, infection precautions"
  - phase: "Full recovery"
    duration: "6-12 months"
    description: "Immune reconstitution, vaccination restart, return to normal activities"
risks:
  - "Graft-versus-host disease (GVHD)"
  - "Infection during neutropenia"
  - "Graft failure or rejection"
  - "Organ toxicity (liver, kidney, lung)"
  - "Cytokine release syndrome (if CAR-T bridge)"
relatedDoctorSlugs:
  - dr-sunil-udgire
  - dr-mahesh-rajashekaraiah
relatedHospitalSlugs:
  - fortis-hospital-bannerghatta
relatedProcedureSlugs:
  - autologous-stem-cell-transplant
  - car-t-cell-therapy
faqs:
  - question: "How much does allogeneic stem cell transplant cost in India?"
    answer: "Allogeneic stem cell transplant packages for international patients typically range from $25,000–$55,000 USD depending on donor type, conditioning regimen, and isolation length. Final quotes follow medical review of your reports."
  - question: "How long is recovery after allogeneic stem cell transplant?"
    answer: "Patients stay 4-6 weeks in the hospital in a HEPA-filtered isolation room, followed by 2-4 weeks of recovery in Bangalore. Full immune reconstitution takes 6-12 months. Fit-to-fly clearance is given by your transplant team after blood counts stabilize."
  - question: "Is allogeneic stem cell transplant available for foreign patients in India?"
    answer: "Yes. Our partner hospitals in Bangalore perform allogeneic transplants for international patients with matched sibling, unrelated, and haploidentical donors. HLA typing and donor search are coordinated before travel."
  - question: "Can I get a written estimate before I travel?"
    answer: "Yes. Send your medical reports via WhatsApp and we will coordinate a written package estimate from a partner hospital — usually within 24-48 hours."
---

## What Allogeneic Stem Cell Transplant Involves

[Clinical description...]

## Who Allogeneic Stem Cell Transplant in India Is For

[Eligibility criteria...]

## Process for International Patients

[Step-by-step process...]

## Risks, Complications, and Mitigation

[Honest risk discussion...]

## Recovery Timeline and Fit-to-Fly Planning

[Recovery timeline...]

## Cost of Allogeneic Stem Cell Transplant in India

[Cost breakdown...]

## Cost Comparison: India vs Other Countries

| Country | Cost (USD) | vs India |
|---------|-----------|----------|
| India (Bangalore) | $25,000 – $55,000 | Baseline |
| USA | $200,000 – $450,000 | ~8× higher |
| UK | $100,000 – $280,000 | ~5× higher |
| UAE | $80,000 – $220,000 | ~4× higher |
```

### 8a. Actual Implemented Markdown Body Structure (12 H2 — Order A)

The markdown body of every procedure file uses the following 12-H2 structure, in this exact order (the "patient journey" order). All 136 files (68 EN + 68 BN) have been standardized to this order:

1. **Overview** — what the procedure is, in plain language
2. **Who Is This Procedure For?** — eligibility criteria and patient profiles
3. **Pre-Operative Preparation** — tests, consultations, and logistics before travel
4. **Procedure Details** — clinical description of the treatment
5. **What Happens During the Procedure** — step-by-step surgical/medical process
6. **Post-Operative Care & Recovery** — immediate recovery, hospital stay, monitoring
7. **Long-Term Outcomes & Success Rates** — evidence-based outcomes and survival data
8. **Follow-Up Care After Returning Home** — post-return monitoring and telemedicine
9. **Alternatives to Consider** — comparable treatments and their trade-offs
10. **Cost Comparison** — India vs other countries table with "X× higher" multipliers
11. **Why Choose Bangalore?** — city-specific advantages for international patients
12. **Travel & Visa** — visa process, stay duration, packing, and fit-to-fly guidance

Bengali (BN) counterparts use the equivalent Bengali headings in the same order.

### 8b. Template-Rendered Sections (from frontmatter, not markdown body)

In addition to the 12 markdown H2 sections, the procedure page template (`[procedure].astro`) renders these sections from structured frontmatter fields, positioned around the markdown body:

| Template section | Source field | Position |
|---|---|---|
| Dark hero with cost badge, QuickFacts, CTAs | `fromPrice`, `toPrice`, `duration`, `hospitalStay`, `recoveryTime` | Top |
| "In Short" summary callout | `summary` | After hero |
| "Who Is This For?" eligibility list | `eligibility` | After summary |
| Related doctors | `relatedDoctorSlugs` | Before body |
| Markdown body (12 H2 sections) | `Content` | Main column |
| Patient journey timeline | i18n keys (4-step) | After body |
| Treating hospitals | `relatedHospitalSlugs` | After body |
| FAQ accordion | `faqs` + auto-generated | After body |
| Recovery timeline table | `recoveryTimeline` | After body |
| **Risks, complications & mitigation** | `risks` | After recovery |
| Cost inclusions/exclusions | `costInclusions`, `costExclusions` | After risks |
| **How to read your package quote** | i18n keys (6 items) | After cost |
| **Decision framework for international patients** | i18n keys (8 items) | After package quote |
| Related procedures | `relatedProcedureSlugs` | After decision |
| Country cross-links | `ALL_COUNTRIES` | After related |
| Mid-page CTA | i18n keys | Before contact |
| Contact/lead form | `LeadForm` | Bottom |

**Bold** entries are sections added based on competitor analysis to target trust and conversion search intents.
