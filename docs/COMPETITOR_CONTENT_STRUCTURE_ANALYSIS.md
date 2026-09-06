# Competitor Content Structure Analysis — Medical Tours India (TechDr)

> **Source URLs analyzed:**
> - `https://www.medicaltoursindia.com/treatments/hematology-bone-marrow-india` (treatment category page)
> - `https://www.medicaltoursindia.com/treatments/hematology-bone-marrow-india/allogeneic-stem-cell-transplant-india` (procedure detail page)
>
> **Purpose:** Document the competitor's content structure so the Khan Meditour team can learn from it and identify gaps in our own pages.
>
> **Last updated:** 2026-09-05

---

## Executive Summary

Medical Tours India (a brand of TechDr) uses a **two-tier hierarchical treatment structure**:

1. **Treatment Category Page** — broad specialty landing page (e.g., "Hematology & Bone Marrow") that lists all procedures under that category with cost ranges and links to procedure detail pages
2. **Procedure Detail Page** — deep-dive page for a specific procedure (e.g., "Allogeneic Stem Cell Transplant") with full clinical content, cost comparison, FAQs, hospital listings, and country cross-links

This is a **hub-and-spoke content model** — the category page is the hub that links to procedure spokes. This is excellent for SEO because it creates topical authority clusters.

### Key takeaway for Khan Meditour
Our current treatment pages are **flat** — each treatment is a single page with no sub-procedure breakdown. The competitor's nested structure captures more long-tail keywords (e.g., "allogeneic stem cell transplant cost in India" vs. just "bone marrow transplant cost in India") and provides more granular cost data.

---

## 1. Treatment Category Page Structure

**URL pattern:** `/treatments/{category-slug}-india`
**Example:** `/treatments/hematology-bone-marrow-india`

### Content sections (in order)

| # | Section | Content | SEO/AEO Purpose |
|---|---------|---------|-----------------|
| 1 | **Breadcrumb** | Home → Treatments → Hematology & Bone Marrow | Navigation + BreadcrumbList schema |
| 2 | **Hero** | H1: "Hematology & Bone Marrow Transplant in India for International Patients" + description paragraph + 2 CTAs (Get free quote, Free second opinion) + hero image | Primary keyword targeting |
| 3 | **"In short" summary block** | 2-3 sentence summary with cost range, cities, and service description | **AEO critical** — AI engines extract this as the page summary |
| 4 | **Procedures grid** | 10 procedure cards, each with: title, 1-sentence description with cost range, "Cost $X–$Y USD" chip, "Est. stay" chip, and link to procedure detail page | Captures long-tail procedure-level keywords; internal linking to spokes |
| 5 | **CTA band** | "Planning hematology & bone marrow in India?" + 3 CTAs (Get free quote, Contact us, WhatsApp us) | Conversion |
| 6 | **Footer** | Standard footer with treatments, countries, patient resources, company links | Internal linking |

### Key observations

**Procedures listed (10 sub-procedures):**
1. Bone Marrow Transplant ($18,000–$45,000)
2. Leukemia Treatment ($8,000–$35,000)
3. Lymphoma Treatment ($6,000–$28,000)
4. Thalassemia Treatment ($5,000–$45,000)
5. Sickle Cell Disease Treatment ($3,000–$40,000)
6. Aplastic Anemia Treatment ($10,000–$45,000)
7. Multiple Myeloma Treatment ($12,000–$40,000)
8. CAR-T Cell Therapy ($40,000–$80,000)
9. Autologous Stem Cell Transplant ($15,000–$30,000)
10. Allogeneic Stem Cell Transplant ($25,000–$55,000)

**Each procedure card includes:**
- Procedure name as H3
- 1-2 sentence description with cost comparison to USA
- Cost range chip (USD)
- Estimated stay chip
- Arrow link to detail page

**"In short" block content:**
> "Hematology & Bone Marrow for international patients is available at accredited Indian hospitals in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore, with typical package ranges from $3,000–$80,000 USD depending on the procedure. TechdrHealth coordinates written estimates, visa support, and travel logistics."

This is a **concise AI-extractable summary** — exactly what Google AI Overviews and Perplexity look for.

---

## 2. Procedure Detail Page Structure

**URL pattern:** `/treatments/{category-slug}-india/{procedure-slug}-india`
**Example:** `/treatments/hematology-bone-marrow-india/allogeneic-stem-cell-transplant-india`

### Content sections (in order)

| # | Section | Content | SEO/AEO Purpose |
|---|---------|---------|-----------------|
| 1 | **Breadcrumb** | Home → Treatments → Hematology & Bone Marrow → Allogeneic Stem Cell Transplant | 4-level breadcrumb hierarchy + BreadcrumbList schema |
| 2 | **Hero with cost badge** | Category label, H1: "Allogeneic Stem Cell Transplant Cost in India", large cost badge ($25,000–$55,000), recovery summary, 2 CTAs (WhatsApp, Get free written estimate), 3 bullet points (visa support, hospital matching, travel coordination) | Primary keyword + immediate cost answer |
| 3 | **"In short" summary block** | 2-3 sentence summary with cost range and clinical description | **AEO critical** — AI extraction target |
| 4 | **"What {procedure} involves"** | Clinical description of the procedure, donor types, conditions treated | Informational search intent |
| 5 | **"Who {procedure} in India is for"** | Eligibility criteria as bulleted list (reports available, medical optimization, understanding of stay, attendant plan, willingness to follow instructions) | Informational — "am I a candidate?" search intent |
| 6 | **"Process for international patients"** | Step-by-step process description (share records → hospital plan → arrival → pre-assessment → admission → discharge) | Informational — process search intent |
| 7 | **"Risks, complications, and mitigation"** | Honest risk discussion with bulleted list of specific risks (bleeding, infection, ICU, complications, clot risk) + mitigation note | Trust building — "is it safe?" search intent |
| 8 | **"Recovery timeline and fit-to-fly planning"** | Recovery description + typical timeline + fit-to-fly clearance note | Informational — "how long?" search intent |
| 9 | **"Cost of {procedure} in India for foreign patients"** | Detailed cost breakdown with inclusions and exclusions + note about final quotes following medical review | Transactional — "how much?" search intent |
| 10 | **"Doctor credentials and hospital standards"** | What to look for in a doctor/hospital + cities covered | Commercial — "best doctor/hospital" search intent |
| 11 | **"How to read a {procedure} package without surprises"** | Consumer advice on reading package quotes, what to ask, what to reject | Trust + informational |
| 12 | **"Building a travel calendar around treatment"** | Step-by-step travel planning (remote review → visa → arrival → treatment → recovery → fit-to-fly) | Informational — logistics search intent |
| 13 | **"Decision framework for foreign patients"** | Editorial summary advising clinical fit over price | Trust + commercial |
| 14 | **"Where to get {procedure} in India"** | List of cities (Hyderabad, Delhi NCR, Mumbai, Chennai, Bangalore) with links to city pages | Local SEO + internal linking |
| 15 | **Cost comparison table** | India vs USA vs UK vs UAE with USD ranges and "X× higher" multiplier | Transactional — comparison search intent |
| 16 | **Partner hospitals** | 5+ hospital cards with name, city, accreditation badge, description, and "View hospital" link | Commercial + internal linking |
| 17 | **Medical visa process steps** | 4-step process (share reports → invitation letter → apply & attendant visas → travel & admission) with link to full visa guide | Informational — visa search intent |
| 18 | **FAQ section** | 4 questions with expandable answers (cost, recovery, availability, written estimate) | AEO — FAQ schema + PAA targeting |
| 19 | **Related procedures** | 3 links to related procedures with cost chips | Internal linking — keeps users in the hub |
| 20 | **Country cross-links** | Links to country-specific pages (Nigeria, Kenya, UAE, Saudi Arabia, Bangladesh, UK, USA) | Internal linking — country-level search intent |
| 21 | **Sticky cost badge (repeated)** | Cost range + recovery summary + CTAs (repeated from hero) | Conversion — persistent CTA |
| 22 | **Final CTA band** | "Get a free {procedure} estimate" + 3 CTAs (Get free quote, Contact us, WhatsApp us) | Conversion |

### Key observations

**Cost comparison table format:**
```
Country   | Typical cost (USD)    | vs India
India     | $25,000–$55,000       | Baseline
USA       | $200,000–$450,000     | ~8.1× higher
UK        | $100,000–$280,000     | ~4.8× higher
UAE       | $80,000–$220,000      | ~3.8× higher
```

The "X× higher" multiplier is a **brilliant AEO touch** — AI engines can extract and cite "India is 8.1× cheaper than the USA for allogeneic stem cell transplant."

**FAQ questions (4):**
1. How much does allogeneic stem cell transplant cost in India?
2. How long is recovery after allogeneic stem cell transplant?
3. Is allogeneic stem cell transplant available for foreign patients in India?
4. Can I get a written estimate before I travel?

**Hospital cards include:**
- Hospital name
- City + accreditation badge (NABH)
- 1-2 sentence description
- "View hospital" link

**Country cross-links:**
The procedure page links to country-specific pages, creating a **bidirectional content network** — country pages link to treatments, treatment pages link to countries. This is excellent for topical authority.

**WhatsApp deep links:**
Every WhatsApp CTA includes a pre-filled message specific to the procedure:
```
https://wa.me/916303225006?text=Hello%2C%20I%20am%20interested%20in%20Allogeneic%20Stem%20Cell%20Transplant%20in%20India...
```

---

## 3. Content Patterns We Should Adopt

### 3.1 Two-Tier Treatment Structure (Hub + Spokes)

**What they do:** Category page (hub) → Procedure detail pages (spokes)
**Why it works:** Captures both broad and long-tail keywords; creates topical authority clusters

**Recommendation for Khan Meditour:**
Consider adding sub-procedure pages for treatments that have multiple distinct procedures. For example:
- `/treatments/hematology-bone-marrow` (category — already exists)
  - `/treatments/hematology-bone-marrow/allogeneic-stem-cell-transplant`
  - `/treatments/hematology-bone-marrow/autologous-stem-cell-transplant`
  - `/treatments/hematology-bone-marrow/leukemia-treatment`
  - `/treatments/hematology-bone-marrow/car-t-cell-therapy`

This would require:
- New content collection for sub-procedures
- New route: `src/pages/treatments/[category]/[procedure].astro`
- Updated category page to list sub-procedures as cards

### 3.2 "In Short" Summary Block

**What they do:** Every page starts with a 2-3 sentence summary block labeled "In short"
**Why it works:** AI engines extract this as the page's TL;DR; users get instant answers

**Recommendation:** Add a `summary` field to all content frontmatter and render it in a styled "In short" callout box immediately after the H1.

### 3.3 Cost Badge in Hero

**What they do:** Large cost range displayed prominently in the hero section
**Why it works:** Patients searching for cost get the answer immediately without scrolling

**Recommendation:** Add a cost badge component to treatment page heroes, showing the USD range from frontmatter.

### 3.4 "X× Higher" Cost Comparison Multiplier

**What they do:** Cost comparison table includes a "vs India" column with multipliers (e.g., "8.1× higher")
**Why it works:** AI engines can extract "India is 8.1× cheaper" as a citable fact

**Recommendation:** Add a "vs India" column to our cost comparison tables with calculated multipliers.

### 3.5 Procedure-Specific WhatsApp Deep Links

**What they do:** Every WhatsApp CTA has a pre-filled message mentioning the specific procedure
**Why it works:** Reduces friction for the patient; the facilitator immediately knows what they're asking about

**Recommendation:** We already have country-specific WhatsApp messages. Add procedure-specific messages too:
```
https://wa.me/8801611892986?text=Hello%2C%20I%20am%20interested%20in%20{procedure}%20in%20India.%20Please%20help%20me%20with%20hospital%20options%2C%20costs%2C%20and%20visa%20support.
```

### 3.6 Honest Risk Section

**What they do:** Dedicated "Risks, complications, and mitigation" section with specific risks listed
**Why it works:** Builds trust; addresses "is it safe?" search intent; differentiates from competitors who hide risks

**Recommendation:** Add a "Risks & Safety" section to each treatment page with:
- Common procedure-specific risks
- Mitigation measures (accredited hospitals, experienced teams, ICU backup)
- Note that consent discussions are personalized

### 3.7 "How to Read a Package Without Surprises" Section

**What they do:** Consumer advice on reading medical tourism package quotes
**Why it works:** Positions the brand as transparent and trustworthy; addresses "hidden charges" concern

**Recommendation:** Add a "What to Ask Before Booking" section to treatment pages or as a standalone service page.

### 3.8 City-Level Pages

**What they do:** Links to city pages (Hyderabad, Delhi NCR, Mumbai, Chennai, Bangalore)
**Why it works:** Captures "treatment in {city} India" search intent; provides local SEO

**Recommendation:** Consider adding city pages for Bangalore (our primary city) with hospital listings, accommodation, and travel info.

### 3.9 Bidirectional Country ↔ Treatment Cross-Linking

**What they do:** Treatment pages link to country pages; country pages link to treatment pages
**Why it works:** Creates a content network that search engines and AI engines can traverse; captures "{treatment} in India for {nationality}" long-tail keywords

**Recommendation:** Add country cross-links to the bottom of every treatment page and ensure country pages link back to relevant treatments.

### 3.10 Recovery Timeline with Fit-to-Fly Note

**What they do:** Recovery section includes "fit-to-fly clearance" guidance
**Why it works:** Addresses a specific concern of international patients — when can they fly home?

**Recommendation:** Add fit-to-fly guidance to the recovery timeline section of treatment pages.

---

## 4. Content Patterns We Already Have (and they don't)

| Feature | Khan Meditour | Medical Tours India |
|---------|--------------|-------------------|
| Bengali language support | ✓ (full BN site) | ✗ (English only) |
| Doctor profile pages | ✓ (52 doctors) | ✗ (no individual doctor pages) |
| `seoHeadline` for long-tail H1s | ✓ | Partial (H1s are keyword-optimized but not separated from name) |
| Treatment card images | ✓ | ✗ (no images on procedure cards) |
| Hero image with gradient overlay | ✓ | ✓ (but simpler) |
| Cost comparison tables | ✓ (markdown) | ✓ (styled component with multipliers) |
| FAQ accordion with JSON-LD | ✓ | ✓ |
| Related doctors section | ✓ | ✗ |
| Related hospitals section | ✓ | ✓ (partner hospitals) |
| Country pages | ✓ (5 countries) | ✓ (12 countries) |
| Free second opinion | ✓ | ✓ |
| Cost calculator | ✓ | ✓ |
| Blog | ✓ | ✓ |
| Patient stories | ✓ | ✓ |
| Bilingual content | ✓ | ✗ |
| Mobile-responsive hero with image | ✓ | ✓ |

---

## 5. Gap Analysis — What They Have That We Don't

| Gap | Impact | Effort | Priority |
|------|--------|--------|----------|
| Two-tier treatment structure (category → procedure) | High | High | P1 |
| "In short" summary block on every page | High | Low | P0 |
| Cost badge in hero | Medium | Low | P1 |
| "X× higher" multiplier in cost tables | Medium | Low | P1 |
| Honest risk/complications section | Medium | Medium | P1 |
| "How to read a package" consumer advice section | Medium | Low | P2 |
| City-level pages | Medium | High | P2 |
| Procedure-specific WhatsApp deep links | Low | Low | P1 |
| Recovery timeline with fit-to-fly note | Medium | Low | P1 |
| Bidirectional country ↔ treatment cross-linking | Medium | Low | P1 |
| Insurance & TPA page | Low | Medium | P3 |
| Interpreter/language support page | Low | Low | P2 |
| Hospital empanelment page (B2B) | Low | Medium | P3 |
| "Indian patients" local page | Low | Medium | P3 |

---

## 6. Recommended Action Items

### Immediate (P0)
1. **Add "In short" summary blocks** to all treatment, country, hospital, and doctor pages — this is the single highest-impact AEO improvement
2. **Add a `summary` field** to all content schemas

### Short-term (P1)
3. **Add cost badges** to treatment page heroes
4. **Add "X× higher" multipliers** to cost comparison tables
5. **Add procedure-specific WhatsApp deep links** to all CTAs
6. **Add bidirectional country ↔ treatment cross-linking** to all pages
7. **Add honest risk/complications sections** to treatment pages
8. **Add recovery timeline with fit-to-fly note** to treatment pages

### Medium-term (P2)
9. **Plan two-tier treatment structure** for treatments with multiple sub-procedures (hematology, cardiology, cancer, orthopedics)
10. **Add "What to Ask Before Booking" section** to treatment pages
11. **Create city pages** for Bangalore (and potentially other cities)
12. **Create interpreter/language support page**

### Long-term (P3)
13. **Add insurance & TPA page**
14. **Add hospital empanelment (B2B) page**
15. **Add Indian patients local page** (if targeting domestic patients)

---

## 7. URL Structure Comparison

| Page Type | Khan Meditour | Medical Tours India |
|-----------|--------------|-------------------|
| Treatment category | `/treatments/{slug}` | `/treatments/{category}-india` |
| Procedure detail | (not implemented) | `/treatments/{category}-india/{procedure}-india` |
| Country | `/countries/{country}` | `/countries/medical-tourism-india-for-{nationality}` |
| Hospital | `/hospitals/{slug}` | `/hospital-network/{slug}` |
| Doctor | `/doctors/{slug}` | (not implemented) |
| City | (not implemented) | `/cities/{city}` |
| Cost comparison | (in treatment page) | `/cost-comparison/{procedure}-india` |
| Blog | `/blog/{slug}` | `/blog/{slug}` |
| Second opinion | `/second-opinion` | `/free-second-opinion` |
| Visa | `/medical-visa-assistance` | `/medical-visa-assistance` |
| Travel | `/travel-accommodation-assistance` | `/travel-accommodation-assistance` |

**Note:** Their country URLs are more keyword-rich (`medical-tourism-india-for-nigerians` vs. our `nigeria`). Consider updating our country URL slugs to include "medical-tourism-india-for-" prefix for better keyword targeting. This would require redirects from old URLs.

---

## 8. Summary

Medical Tours India's content structure is **more granular and more AEO-optimized** than ours in several ways:

1. **Two-tier treatment hierarchy** captures more long-tail keywords
2. **"In short" blocks** are perfectly formatted for AI extraction
3. **Cost badges and multipliers** provide instant, citable answers
4. **Honest risk sections** build trust and address safety concerns
5. **Bidirectional cross-linking** creates a content network
6. **Procedure-specific WhatsApp links** reduce conversion friction

However, our site has **key advantages** they lack:
1. **Full Bengali language support** (they are English-only)
2. **Individual doctor profile pages** (they have none)
3. **Treatment card images** (they have none)
4. **`seoHeadline` separation** for long-tail H1s without breaking schema names

The best strategy is to **adopt their structural improvements** (summary blocks, cost badges, risk sections, two-tier hierarchy) while **maintaining our unique advantages** (bilingual content, doctor pages, images).
