# Competitor Hospital Page Analysis — Medijourney vs Khan Meditour

> **Competitor URLs analyzed:**
> - `https://www.medijourney.co.in/hospital/apollo-hospital-bangalore-bannerghatta-road` (Apollo Hospitals Bannerghatta)
> - `https://www.medijourney.co.in/hospital/fortis-hospital-bg-road-bangalore` (Fortis Hospital Bannerghatta Road)
>
> **Our pages:**
> - Apollo: `/hospitals/apollo-hospitals-bannerghatta` (EN) + `/bn/hospitals/apollo-hospitals-bannerghatta` (BN)
> - Fortis: `/hospitals/fortis-hospital-bannerghatta` (EN) + `/bn/hospitals/fortis-hospital-bannerghatta` (BN)
>
> **Our files:**
> - Template: `frontend/src/pages/hospitals/[slug].astro`
> - Apollo content (EN): `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md`
> - Apollo content (BN): `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md`
> - Fortis content (EN): `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md`
> - Fortis content (BN): `frontend/src/content/hospitals/bn/fortis-hospital-bannerghatta.md`
>
> **Purpose:** Document where Medijourney wins, where Khan Meditour wins, and the specific implementation steps to beat them on every gap. Covers two competitor hospital pages to identify consistent patterns and hospital-specific gaps.
>
> **Last updated:** 2026-09-10

---

## Executive Summary

Medijourney's Apollo Bannerghatta page is **content-richer** but **technically weaker** than ours. They win on content depth (procedure cost table, patient reviews, achievements, medical staff breakdown, similar hospitals, multi-language UI) but lose on technical SEO (no visible JSON-LD), data integrity (broken stats band showing all zeros), and doctor coverage (only 1 doctor listed vs our full CMS-driven grid).

**The opportunity:** Every content gap they expose is closeable with markdown additions + small template changes. Our technical foundation (JSON-LD schema, working StatBand, populated doctor grid, bilingual EN+BN, sticky booking rail, gallery marquee) is already stronger. Closing the content gaps makes us the clear winner on both content and technical SEO.

### Scorecard

| Category | Medijourney | Khan Meditour | Winner |
|---|---|---|---|
| Technical SEO (JSON-LD) | None visible | Hospital + FAQPage + BreadcrumbList | **Us** |
| Stats band | Broken (all zeros) | Working (250 beds, 2007, speciality count) | **Us** |
| Doctors at hospital | 1 doctor | Full CMS-driven grid | **Us** |
| Bilingual support | 7 UI languages | EN + BN | **Them** (breadth) |
| Procedure cost table | 12 procedures, INR+USD | Missing | **Them** |
| Patient reviews | 6 testimonials | Missing | **Them** |
| Similar hospitals | 7 linked | Missing | **Them** |
| How to reach | Airport + metro + distance | Address only | **Them** |
| Sticky booking rail | No | Yes | **Us** |
| Gallery | 2 images | 1 image (repeated) | Tie (both weak) |

---

## Part A — Apollo Hospitals Bannerghatta Road

## 1. Where Medijourney Wins (Content Gaps)

### 1.1 Procedure Cost Table — 🔴 HIGH IMPACT

**What they have:** A 12-row table with INR + USD cost ranges for major procedures:

| Procedure | Approx. Cost (INR) | Approx. Cost (USD) |
|---|---|---|
| Coronary Angiography | INR 18,000 – 30,000 | USD 220 – 360 |
| Coronary Angioplasty (PTCA) | INR 2,00,000 – 3,80,000 | USD 2,400 – 4,600 |
| CABG (Heart Bypass Surgery) | INR 3,80,000 – 5,80,000 | USD 4,600 – 7,000 |
| Heart Valve Replacement | INR 4,50,000 – 7,50,000 | USD 5,400 – 9,000 |
| Liver Transplant | INR 22,00,000 – 30,00,000 | USD 26,400 – 36,000 |
| Kidney Transplant | INR 7,00,000 – 10,00,000 | USD 8,400 – 12,000 |
| Total Knee Replacement (Single) | INR 2,80,000 – 4,00,000 | USD 3,400 – 4,800 |
| Total Hip Replacement (Single) | INR 3,00,000 – 4,50,000 | USD 3,600 – 5,400 |
| CyberKnife Radiation Therapy | INR 4,50,000 – 7,50,000 | USD 5,400 – 9,000 |
| Bone Marrow Transplant (Allogeneic) | INR 18,00,000 – 25,00,000 | USD 21,600 – 30,000 |
| Robotic Prostatectomy | INR 3,50,000 – 5,50,000 | USD 4,200 – 6,600 |
| Brain Tumor Surgery | INR 3,00,000 – 5,50,000 | USD 3,600 – 6,600 |

**Why they win:** This is the #1 transactional search intent for medical tourists — "cost of [procedure] at [hospital]". Their table captures both INR (domestic) and USD (international) searchers.

**How to beat them:**
- Add the same 12-procedure table to our hospital markdown body
- **Add a third column for BDT** (Bangladeshi Taka) — our primary international market. They don't have this.
- Add a `procedureCosts` field to the hospital Zod schema so the table is structured data, not just markdown prose
- Inject the cost table as a `MedicalProcedure` JSON-LD array (we already have the `medicalProcedure()` schema helper) — they have zero schema, so we win on rich results
- Cross-link each procedure name to our treatment detail page (they don't link out — internal linking wins)

**Files to update:**
- `frontend/src/content/config.ts` — add `procedureCosts` field to hospital schema
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — add `## Treatment Costs at Apollo Hospitals Bannerghatta` section
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent
- `frontend/src/pages/hospitals/[slug].astro` — render cost table from structured data + inject MedicalProcedure JSON-LD
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent

**Already specced in:** `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 3.2

---

### 1.2 "Important Considerations Regarding Cost" — 🔴 HIGH IMPACT

**What they have:** 7 bullets explaining what affects final pricing:
1. Diagnosis, comorbidities, and procedure complexity
2. Hospital stay, ICU duration, and recovery time
3. Surgeon seniority and specialty
4. Room category (general ward, twin-sharing, single private, deluxe suite)
5. Implants, prosthetics, stents, valves billed separately
6. Pre-op diagnostics, post-op imaging, medications not always included
7. Currency exchange rates and add-on services for international patients

**Why they win:** Builds trust and transparency. Patients who understand cost variables are more likely to inquire (they know the estimate is a range, not a fixed price).

**How to beat them:**
- Add the same 7 bullets to our hospital markdown body, directly under the cost table
- **Add a "What's Included in the Cost" section** (included vs not included) — they don't have this. This is already specced in `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 1.4 for treatment pages; apply the same pattern to hospital pages.
- Add a CTA after the cost considerations: "Get a personalized cost estimate based on your diagnosis" → WhatsApp deep link with hospital context

**Files to update:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md`
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md`

---

### 1.3 Patient Reviews / Testimonials — 🔴 HIGH IMPACT

**What they have:** 6 detailed testimonials with patient name + city/country:
1. Anand Subramanian, Coimbatore, India — knee replacement
2. Tahmina Rahman, Dhaka, Bangladesh — CyberKnife for brain lesion
3. Karthik Reddy, Hyderabad, India — vascular surgery (emergency)
4. Fatima Al Habsi, Muscat, Oman — kidney transplant
5. Rajesh Iyer, Chennai, India — robotic prostatectomy
6. Chinwe Okafor, Lagos, Nigeria — pediatric cardiac surgery

**Why they win:** Social proof is a top decision factor for medical tourists. Reviews with name + country + specific treatment are the most persuasive format.

**How to beat them:**
- Add a `reviews` field to the hospital Zod schema: `{ patientName: string, country: string, treatment: string, quote: string, rating: number }[]`
- Source 6+ reviews (we already have a `testimonials` content collection — filter by hospital or tag with hospital slug)
- Render reviews as a dedicated section with patient name, country flag, treatment badge, and star rating
- **Inject `AggregateRating` into the Hospital JSON-LD schema** — they have zero schema, so we win on rich results (star ratings in search results)
- **Add a "Read more patient stories" link** to our testimonials page — they don't have this cross-link
- Add review schema (`Review` + `AggregateRating`) to JSON-LD for rich snippet eligibility

**Files to update:**
- `frontend/src/content/config.ts` — add `reviews` field to hospital schema
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — add reviews to frontmatter
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent
- `frontend/src/lib/schema.ts` — add `aggregateRating()` helper, extend `hospitalSchema()` to include `aggregateRating`
- `frontend/src/pages/hospitals/[slug].astro` — render reviews section + inject Review/AggregateRating JSON-LD
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent

**Already specced in:** `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 3.4

---

### 1.4 Similar Hospitals Section — 🟠 MEDIUM IMPACT

**What they have:** 7 similar hospitals linked with Book + WhatsApp CTAs:
1. Fortis Hospital Bannerghatta Road
2. Fortis Hospital Rajajinagar
3. Fortis Hospital Cunningham Road
4. Fortis Nagarbhavi
5. Fortis Hospital Richmond Road
6. Manipal Hospital Old Airport Road
7. Manipal Hospital Doddaballapur

**Why they win:** Internal linking for topical authority. Patients comparing hospitals stay on their site instead of bouncing to Google. This creates a "hospital comparison" hub.

**How to beat them:**
- Add a "Similar Hospitals" section at the bottom of the hospital page
- Filter by `city` (Bangalore) and/or overlapping `specialities` — show 4-6 hospitals
- Render as `HospitalCard` components (we already have this component)
- **Add a comparison angle they don't have:** show 1-2 key differentiators per hospital (e.g., "Specializes in cardiac", "JCI + NABH accredited") so patients can compare at a glance
- Cross-link bidirectionally (Apollo page links to Fortis, Fortis page links to Apollo)

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — add "Similar Hospitals" section after doctors grid
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent
- `frontend/src/lib/content.ts` — add `getSimilarHospitals(slug, hospitals)` helper (filter by city + shared specialities)
- `frontend/src/i18n/en.json` + `bn.json` — add `hospitals.similarHospitals` key

**Already specced in:** `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 5.1

---

### 1.5 How to Reach Section — 🟠 MEDIUM IMPACT

**What they have:**
- **Address:** Full postal address
- **Airport:** Kempegowda International Airport, approximately 75 minutes by car (around 45 km)
- **Metro Station:** Jayadeva Hospital Metro Station (Pink Line), approximately 10 minutes by auto

**Why they win:** Informational search intent — patients planning travel need logistics. "How to reach Apollo Hospital Bannerghatta from airport" is a real search query.

**How to beat them:**
- Add a `## How to Reach Apollo Hospitals Bannerghatta` section to the markdown body
- Include airport distance, drive time, metro station, and nearest landmarks
- **Add an embedded Google Map** (iframe) — they have one, we don't
- **Add a "Complimentary airport pickup" note** tied to our coordination service — they list it as a hospital service, but we can frame it as our value-add
- Add `hasMap` to the Hospital JSON-LD schema

**Files to update:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — add `## How to Reach` section
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent
- `frontend/src/pages/hospitals/[slug].astro` — add map embed (optional, can be a static iframe with hospital address)
- `frontend/src/lib/schema.ts` — add `geo` + `hasMap` to `hospitalSchema()`

**Already specced in:** `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 3.5

---

### 1.6 Awards & Recognitions (Specific) — 🟠 MEDIUM IMPACT

**What they have:** 4 specific named awards with years:
1. Best Hospital in India for Medical Tourism, FICCI (2017)
2. Best Single-Specialty Hospital in India for Oncology, India Healthcare Awards (2016)
3. Ranked among the top multi-specialty hospitals in Bangalore, THE WEEK AC Nielsen Best Hospital Survey
4. NABH Accreditation renewal recognition (2018)

**Why they win:** Specific, citable awards with awarding body + year are more trustworthy than generic claims. AI engines extract these as citations.

**How to beat them:**
- Replace our generic "Awards & Recognition" prose with a structured list of named awards + years
- Add an `awards` field to the hospital Zod schema: `{ name: string, body: string, year: number }[]`
- Render as a styled list with award body logos where available
- **Inject `award` into the Hospital JSON-LD schema** (already done for Physician schema; extend to Hospital)

**Files to update:**
- `frontend/src/content/config.ts` — add `awards` field to hospital schema
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — add structured awards
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent
- `frontend/src/lib/schema.ts` — add `award` to `hospitalSchema()`

---

### 1.7 Achievements / Clinical Firsts — 🟠 MEDIUM IMPACT

**What they have:** 9 specific clinical firsts:
1. First hospital in India to perform a simultaneous pancreas-kidney transplant
2. First hospital in India to introduce the Thallium Laser
3. First in South India to introduce the Holmium Laser
4. First Y-shaped stent for tracheoesophageal fistula in the region
5. First Digital X-Ray system in Karnataka
6. Largest series of airway stents performed in India
7. Pioneer of total knee replacement in India, with a 99% success rate
8. Performed four autologous chondrocyte implantations, spinal angiolipoma excision, and tibial tuberosity shift cases
9. One of the early adopters of the Da Vinci Robotic Surgical System and CyberKnife radiation therapy in Bangalore

**Why they win:** Clinical firsts are unique differentiator content. These are specific, verifiable, and citable — exactly what AI engines extract.

**How to beat them:**
- Add a `## Achievements & Clinical Firsts` section to the markdown body
- List all 9 firsts as a bulleted list
- **Add a "Verified" badge** to each achievement where we can cite the source — they don't do this
- Link achievements to relevant treatment pages (e.g., "first SPK transplant" → organ transplant treatment page)

**Files to update:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — add `## Achievements & Clinical Firsts` section
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent

---

### 1.8 Medical Staff Breakdown — 🟠 MEDIUM IMPACT

**What they have:** 6 bullets describing team composition by specialty:
1. Senior interventional cardiologists, cardiothoracic surgeons, electrophysiologists (20-40+ years)
2. Apollo Cancer Center — medical, surgical, radiation oncology with sub-specialty leads
3. Orthopedic surgeons — joint replacement, spine, arthroscopy (high-volume)
4. Multidisciplinary transplant team — hepatologists, nephrologists, transplant surgeons
5. Senior intensivists — 90+ bed ICU complex
6. Neurosciences — neurologists, neurosurgeons, rehabilitation specialists

**Why they win:** Patients researching serious procedures want to know the team depth, not just the hospital name.

**How to beat them:**
- Add a `## Medical Team` section to the markdown body
- **Cross-link each team description to our doctor profiles** at that hospital — they don't do this. "Senior interventional cardiologists" → link to our cardiologist DoctorCards.
- This creates a hospital → doctors content cluster that boosts topical authority

**Files to update:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — add `## Medical Team` section
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent

---

### 1.9 Research & Innovation (ARI) — 🟡 LOW IMPACT

**What they have:** A section on Apollo Research and Innovations (ARI) — 7 bullets about their research division, clinical trials (1250+ managed), 22 years, 10 locations, 22 sites.

**Why they win:** Niche but unique content. Research credibility is a trust signal for complex cases (transplants, oncology).

**How to beat them:**
- Add a `## Research & Innovation` section to the markdown body
- Summarize ARI's key stats (1250+ clinical trials, 22 years, 10 locations)
- **Add a link to clinical trial information** for patients who may be eligible — they don't do this

**Files to update:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md`
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md`

---

### 1.10 Patient-Centric Approach — 🟡 LOW IMPACT

**What they have:** 3 sub-sections:
1. **Patient Care Philosophy** — commitment to clinical excellence, standardized protocols
2. **Quality and Safety Measures** — NABH, NABL, ISO certification
3. **Patient Satisfaction Initiatives** — latest medical technology investment

**Why they win:** Trust signals for patients evaluating hospital quality.

**How to beat them:**
- Add a `## Patient-Centric Approach` section to the markdown body
- **Add our own angle:** frame this around our coordination service — "Khan Meditour ensures you benefit from these quality protocols by coordinating directly with the hospital's quality team"
- This turns their hospital content into our service differentiator

**Files to update:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md`
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md`

---

### 1.11 Multi-Language UI — 🟠 MEDIUM IMPACT (STRATEGIC)

**What they have:** 7 UI languages — EN, AR, FR, HI, RU, ES, BN

**Why they win:** Apollo Bannerghatta explicitly serves South Asia, Africa, Middle East, and CIS. Arabic (GCC) and Russian (CIS) are critical source markets. We only have EN + BN.

**How to beat them:**
- This is a longer-term roadmap item, not a quick fix
- **Priority languages to add:** Arabic (GCC market), Russian (CIS market), French (Africa market)
- Our i18n architecture (`i18n/*.json` + `lib/i18n.ts`) already supports adding locales — it's a content translation effort, not a re-architecture
- Start with Arabic — highest-value market for Apollo Bannerghatta (Oman, UAE, Saudi patients)

**Files to update:**
- `frontend/src/i18n/ar.json` (new)
- `frontend/src/lib/i18n.ts` — add `ar` locale
- `frontend/src/pages/ar/` — mirror EN route structure
- All content collections — add `ar/` subfolders

**Note:** Flag this in `TASK.md` as a roadmap item, not a current sprint task.

---

### 1.12 Sticky In-Page Navigation Tabs — 🟡 LOW IMPACT

**What they have:** Sticky anchor tabs: About Hospital, Specialities, Top Doctors, Similar Hospitals

**Why they win:** UX — patients scan long pages and jump to sections.

**How to beat them:**
- Add a sticky table of contents auto-generated from H2 headings
- Highlight current section on scroll (scroll spy)
- Already specced in `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 5.4

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — add sticky TOC component
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent
- New component: `frontend/src/design-system/components/molecules/TableOfContents.tsx`

**Already specced in:** `SEO_PAGE_IMPROVEMENT_STRATEGY.md` section 5.4

---

### 1.13 Footer Global Trust Stats — 🟡 LOW IMPACT

**What they have:** Footer shows: 100,000+ Patients Assisted, 125+ Countries, 11+ Language Support

**Why they win:** Global brand-level trust signals on every page.

**How to beat them:**
- Add aggregate trust stats to our Footer component
- Use our real numbers (patients assisted, countries served, languages)
- If we don't have exact numbers, use conservative verified claims

**Files to update:**
- `frontend/src/design-system/components/organisms/Footer.tsx` — add trust stats row
- `frontend/src/i18n/en.json` + `bn.json` — add footer trust stat labels

---

### 1.14 Treatment Cost Cross-Links (Mega Menu) — 🟠 MEDIUM IMPACT (STRATEGIC)

**What they have:** Mega-menu links to hundreds of individual treatment cost pages (e.g., `/cost/cyberknife-surgery/india`, `/cost/heart-bypass-surgery-cabg/india`).

**Why they win:** Deep topical authority for "treatment cost in India" searches. Each page is a landing page for a specific procedure + cost query.

**How to beat them:**
- Our treatment pages already exist and have cost comparison tables
- **Cross-link from the hospital page's procedure cost table to our treatment detail pages** — each procedure name in the cost table links to `/treatments/[slug]`
- This creates a hospital → treatment content cluster
- We don't need hundreds of separate cost pages — our treatment pages already serve this purpose

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — link procedure names in cost table to treatment pages
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent

---

## 2. Where Khan Meditour Wins (Our Advantages)

### 2.1 Technical SEO — JSON-LD Schema ✅

**What we have:** Hospital + FAQPage + BreadcrumbList JSON-LD injected on every hospital page.

**Why we win:** Medijourney has zero visible structured data. Our schema makes us eligible for rich results (FAQ rich results, breadcrumb display, hospital knowledge panel).

**Maintain this advantage:** Ensure schema stays valid as we add fields (reviews, awards, cost data).

<ref_snippet file="C:\Users\abdul\Downloads\khan\frontend\src\pages\hospitals\[slug].astro" lines="67-94" />

---

### 2.2 Working Stats Band ✅

**What we have:** StatBand renders real values from frontmatter — 250 beds, 2007 established, speciality count.

**Why we win:** Medijourney's stats band is broken — all values render as `0` (confirmed on live page, lines 908-922). This is a visible CMS integration bug on their site.

**Maintain this advantage:** As we add more stats (doctors count, international patients), ensure they pull from frontmatter, not hardcoded.

<ref_snippet file="C:\Users\abdul\Downloads\khan\frontend\src\pages\hospitals\[slug].astro" lines="99-103" />

---

### 2.3 Populated Doctor Grid ✅

**What we have:** Full `DoctorCard` grid populated from `getDoctorsAtHospital()` — CMS-driven, automatic.

**Why we win:** Medijourney only lists 1 doctor (Dr. Kirankumar Sajjanshetty, Medical Oncologist). Our grid shows all doctors at the hospital with photos, specialties, qualifications, and booking CTAs.

**Maintain this advantage:** Keep doctor content rich and photos current.

<ref_snippet file="C:\Users\abdul\Downloads\khan\frontend\src\pages\hospitals\[slug].astro" lines="304-314" />

---

### 2.4 Sticky Booking Rail ✅

**What we have:** Sticky sidebar with booking CTA + full contact details (address, phone, email).

**Why we win:** Medijourney has no persistent booking rail — their CTAs are scattered and not sticky. Our rail converts at any scroll position.

**Maintain this advantage:** Ensure the rail stays visible on mobile (collapsible or sticky bottom bar).

<ref_snippet file="C:\Users\abdul\Downloads\khan\frontend\src\pages\hospitals\[slug].astro" lines="252-301" />

---

### 2.5 Bilingual EN + BN ✅

**What we have:** Full EN + BN content for every hospital page.

**Why we win on quality:** Our BN content is complete and translated. Medijourney has 7 languages but quality/depth per language is unclear.

**Where they beat us:** Breadth — 7 languages vs 2. See section 1.11 for the roadmap to close this.

---

### 2.6 Auto-Generated + Manual FAQs ✅

**What we have:** `generateHospitalFaqs()` auto-generates FAQs from hospital data + merges with manual overrides. FAQPage JSON-LD injected.

**Why we win:** Medijourney has 5 static FAQs with no schema. Our auto-generation ensures every hospital page has FAQs even if manual content is missing, and the FAQPage schema makes us eligible for FAQ rich results.

<ref_snippet file="C:\Users\abdul\Downloads\khan\frontend\src\pages\hospitals\[slug].astro" lines="90-94" />

---

## 3. Implementation Priority

### Tier 1 — High Impact (close biggest gaps first)

| # | Task | Effort | Impact | Specced in |
|---|---|---|---|---|
| 1 | Procedure Cost table (12 procedures, INR + USD + BDT) | Medium | 🔴 High | Strategy 3.2 |
| 2 | Patient Reviews (6+ testimonials + AggregateRating schema) | Medium | 🔴 High | Strategy 3.4 |
| 3 | Similar Hospitals section (4-6 cards, filtered by city) | Medium | 🟠 Medium | Strategy 5.1 |
| 4 | How to Reach section (airport, metro, distance + map) | Low | 🟠 Medium | Strategy 3.5 |

### Tier 2 — Medium Impact (content depth)

| # | Task | Effort | Impact |
|---|---|---|---|
| 5 | "Important Considerations Regarding Cost" (7 bullets) | Low | 🔴 High |
| 6 | Achievements / Clinical Firsts (9 firsts as section) | Low | 🟠 Medium |
| 7 | Awards enriched (4 named awards + years, structured) | Low | 🟠 Medium |
| 8 | Medical Staff breakdown (6 bullets, cross-link to doctors) | Low | 🟠 Medium |
| 9 | Dedicated coordination pitch ("Plan with Khan Meditour") | Low | 🟠 Medium |
| 10 | Sticky in-page nav tabs / table of contents | Medium | 🟡 Low |

### Tier 3 — Lower Priority (polish)

| # | Task | Effort | Impact |
|---|---|---|---|
| 11 | Embedded Google Map | Low | 🟡 Low |
| 12 | Specialities grid with icons (expand to 25) | Low | 🟡 Low |
| 13 | Research & Innovation (ARI) section | Low | 🟡 Low |
| 14 | Patient-Centric Approach section | Low | 🟡 Low |
| 15 | Footer global trust stats | Low | 🟡 Low |
| 16 | More gallery images (both sites weak here) | Low | 🟡 Low |

### Strategic Roadmap (longer-term)

| # | Task | Effort | Impact |
|---|---|---|---|
| 17 | Add Arabic UI locale (GCC market) | High | 🟠 Medium |
| 18 | Add Russian UI locale (CIS market) | High | 🟠 Medium |
| 19 | Add French UI locale (Africa market) | High | 🟡 Low |
| 20 | Treatment cost cross-links from hospital page to treatment pages | Low | 🟠 Medium |

---

## 4. Schema Changes Summary

The following Zod schema additions to `frontend/src/content/config.ts` are needed to support the structured content above:

```typescript
// Hospital schema additions
awards: z.array(
  z.object({
    name: z.string(),
    body: z.string(),        // awarding body
    year: z.number().optional(),
  })
).optional(),

reviews: z.array(
  z.object({
    patientName: z.string(),
    country: z.string(),
    treatment: z.string(),
    quote: z.string(),
    rating: z.number().min(1).max(5),
  })
).optional(),

procedureCosts: z.array(
  z.object({
    procedure: z.string(),
    costInrMin: z.number(),
    costInrMax: z.number(),
    costUsdMin: z.number(),
    costUsdMax: z.number(),
    treatmentSlug: z.string().optional(),  // for cross-linking to treatment pages
  })
).optional(),

// Location data for "How to Reach" + map
airportDistance: z.string().optional(),    // e.g., "45 km, 75 minutes by car"
metroStation: z.string().optional(),       // e.g., "Jayadeva Hospital Metro Station (Pink Line)"
mapEmbedUrl: z.string().optional(),        // Google Maps embed URL
```

The following `frontend/src/lib/schema.ts` additions are needed:

```typescript
// Extend hospitalSchema() to include:
aggregateRating: { ratingValue: number; reviewCount: number }  // from reviews
award: string[]                                                 // from awards
geo: { latitude: number; longitude: number }                   // for map
hasMap: string                                                  // map URL
```

---

## 5. Template Changes Summary

### `frontend/src/pages/hospitals/[slug].astro` (EN)

Add these sections to the template (in order):

1. **Procedure Cost table** — after the markdown `<Content />` block, before amenities. Render from `hospital.procedureCosts` if present. Link procedure names to `/treatments/[treatmentSlug]`.
2. **Cost Considerations** — part of the markdown body (no template change needed).
3. **Patient Reviews** — after amenities, before gallery. Render from `hospital.reviews` if present. Include star ratings + country flags.
4. **How to Reach** — part of the markdown body (no template change needed). Map embed can be a template addition if `hospital.mapEmbedUrl` is present.
5. **Similar Hospitals** — after the doctors grid, before FAQ. Render from `getSimilarHospitals()`.
6. **Sticky TOC** — in the sticky rail, auto-generated from H2 headings.

### `frontend/src/pages/bn/hospitals/[slug].astro` (BN)

Mirror all EN template changes with BN i18n keys.

---

## 6. Verification Checklist

After implementation, verify:

- [ ] `npm run build` passes — all hospital pages render (EN + BN)
- [ ] `npm run test` passes — new schema fields have unit tests
- [ ] Procedure cost table renders with INR + USD (+ BDT) columns
- [ ] Patient reviews render with name, country, treatment, rating
- [ ] Similar Hospitals section shows 4-6 hospitals filtered by city
- [ ] How to Reach section shows airport, metro, distance
- [ ] JSON-LD validates — Hospital schema includes `aggregateRating`, `award`, `geo`, `hasMap`
- [ ] FAQPage JSON-LD still valid (no regression)
- [ ] BreadcrumbList JSON-LD still valid (no regression)
- [ ] BN page has full parity with EN page
- [ ] No file exceeds 500 lines (refactor if needed per project rules)

---

## Part B — Fortis Hospital Bannerghatta Road

> **Competitor URL:** `https://www.medijourney.co.in/hospital/fortis-hospital-bg-road-bangalore`
> **Our page:** `/hospitals/fortis-hospital-bannerghatta` (EN + BN)
> **Our content file:** `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md`

## 7. Fortis Page — Verified Findings from Live Fetch

### 7.1 Competitor Section Inventory (in order)

| # | Section | Content | Notes |
|---|---------|---------|-------|
| 1 | Hero | Name, full address, established 2006, multi-speciality, NABH + JCI badges | Same pattern as Apollo |
| 2 | Sticky nav tabs | About, Specialities, Top Doctors, Blogs, Similar Hospitals, FAQ's | More tabs than Apollo (added Blogs + FAQ's) |
| 3 | About Hospital | 5-paragraph prose (276 beds, JCI/NABH, 40+ specialties, Middle East/Africa/SE Asia) | Says 276 beds here |
| 4 | CTA card | "Ask anything about your health" | Same as Apollo |
| 5 | Accreditations | JCI (first in Karnataka 2008), NABH, MTQUA | **MTQUA is new** — not on Apollo page |
| 6 | Awards & Recognitions | 4 bullets (MTQUA, Outlook survey, first JCI Karnataka, Best Multi-Specialty) | |
| 7 | Centres of Excellence | Cardiac, Cancer Institute (BMT, robotic, HIFU), Neurosciences, Ortho (custom-fit knee), GI, Urology, Transplant, MAS | Mentions HIFU for prostate cancer |
| 8 | International Patient Services | Pre-arrival teleconsult, treatment packages, visa, airport pickup, currency, translation, discharge, follow-up, accommodation | |
| 9 | CTA form | "Looking for the Best Doctors at?" | Same as Apollo |
| 10 | Procedure Cost table | 10 procedures, INR + USD | Fewer than Apollo (12) but includes HIFU + chemotherapy per cycle |
| 11 | Cost Considerations | 7 bullets | Same pattern as Apollo |
| 12 | Patient Feedback | 6 testimonials with name + city/country | Same as Apollo |
| 13 | Plan Your Treatment with Medijourney | Coordination pitch | Same as Apollo |
| 14 | FAQs (set 1) | 5 FAQs (booking, BMT cost, accreditation, languages, airport distance) | |
| 15 | CTA card | "Speak with a Medical Coordinator" | Same as Apollo |
| 16 | Stats band | **ALL ZEROS (broken again)** | Same bug as Apollo page |
| 17 | Address + Airport + Metro | Airport 45 km / 90-120 min, Jayadeva Hospital Metro Pink Line 10-15 min | |
| 18 | CTA card | "Could not find what you are looking for?" | Same as Apollo |
| 19 | Specialized in | 25 specialties grid with icons | Same as Apollo |
| 20 | Top Doctors | **7 doctors listed** (vs 1 on Apollo page) | Dr. Rajanna Sreedhara, Dr. Aashish Parekh, Dr. Vivek Belathur, Dr. Sudheendra Udbalker, Dr. Sudarshan G T, Dr. Srinivasa Prasad, Dr. Vivek Jawali |
| 21 | Achievements | 6 bullets (first JCI Karnataka, MTQUA, HIFU, custom-fit knee, Cancer Institute, NABH/JCI cycles) | |
| 22 | Medical Staff | 5 bullets (cardiac, oncology, neurosurgery, orthopedic, tumor boards) | Fewer than Apollo (6) |
| 23 | Infrastructure | Prose paragraph (276 beds, modular OTs, cath labs, robotic, cancer wing, ICUs, imaging, NABL lab, blood bank, pharmacy) | Less structured than Apollo (which used bullets) |
| 24 | Facilities | 9 bullets | Fewer than Apollo (16) |
| 25 | **Reviews section** | 1 review (Ali from Dhaka, Bangladesh — cardiac surgery) | **New** — separate from Patient Feedback; Apollo page didn't have this |
| 26 | Images | 3 images (OT room, outside, patient room) | More than Apollo (2) |
| 27 | **Blogs section** | 4 blog posts linked (Oman patients, Kazakhstan patients, Bangladeshi patients, Ethiopian patients) | **New** — Apollo page didn't have this |
| 28 | Similar Hospitals | 7 hospitals — **but mostly Delhi/NCR, not Bangalore!** (Indraprastha Apollo Delhi, Artemis Gurugram, BLK-Max Delhi, Medanta Gurgaon, FMRI Gurgaon, Manipal Dwarka Delhi, Apollo Greams Road Chennai) | **Weakness** — poor geographic filtering |
| 29 | FAQs (set 2) | **15+ FAQs** — very detailed (established, accreditations, location, accommodation, facilities, specialties, top procedures by specialty, latest techniques, diagnostic technologies, top doctors, scheduling, success rates 86-95%, postoperative care, international insurance/payment options with currencies, video consultation, patient countries, international services, infection control, achievements) | **Much more comprehensive** than set 1 |

### 7.2 New Patterns Not Seen on Apollo Page

These patterns appeared on the Fortis page but not the Apollo page:

#### 7.2.1 Two FAQ Sets — 🟠 MEDIUM IMPACT

**What they have:** A short curated FAQ set (5 questions) mid-page + a long comprehensive FAQ set (15+ questions) at the bottom. The long set covers:
- Top procedures performed (listed by specialty — cardiac, neurology, GI, ortho, OB/GYN, dermatology)
- Latest treatment techniques (HIFU, robotic, VATS, RATS, proton therapy, TACE, EVAR)
- Advanced diagnostic technologies (MRI, PET-CT, EEG, genetic testing, EMG, etc.)
- Success rates (86-95%)
- International insurance + payment options (lists accepted currencies: USD, GBP, EUR, OMR, SAR, AED, SGD, KWD)
- Video consultation and telemedicine
- Patient source countries
- Infection control and patient safety policies

**Why they win:** The long FAQ set captures a huge range of long-tail search queries ("what currencies does Fortis Bannerghatta accept", "success rate of Fortis Bannerghatta", "diagnostic technologies at Fortis Bannerghatta").

**How to beat them:**
- Expand our auto-generated hospital FAQs to cover these topics
- Add a `detailedFaqs` field for hospital-specific comprehensive FAQs
- **Add a "Payment & Insurance" FAQ** with accepted currencies — this is unique content we don't have
- **Add a "Success Rates" FAQ** where data is publicly available
- **Add a "Top Procedures" FAQ** listing procedures by specialty with links to treatment pages
- Inject all FAQs into FAQPage JSON-LD (we already do this; they don't have schema)

**Files to update:**
- `frontend/src/lib/faq-generator.ts` — expand `generateHospitalFaqs()` with new question templates
- `frontend/src/i18n/en.json` + `bn.json` — add new FAQ template strings
- `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md` — add manual detailed FAQs
- `frontend/src/content/hospitals/bn/fortis-hospital-bannerghatta.md` — BN equivalent

#### 7.2.2 Blogs Section on Hospital Page — 🟡 LOW IMPACT

**What they have:** 4 blog posts linked at the bottom of the hospital page, targeted at international patient source markets (Oman, Kazakhstan, Bangladesh, Ethiopia).

**Why they win:** Cross-links hospital pages to blog content, keeping patients on-site. The blog posts are country-specific, matching the hospital's international patient demographics.

**How to beat them:**
- Add a "Related Articles" section at the bottom of hospital pages
- Filter our blog content collection by hospital or specialty relevance
- We already have a blog content collection (`src/content/blog/`) — wire it up
- **Add country-specific blog posts** for our target markets (Bangladesh, Oman, Nigeria, Kenya) if we don't have them

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — add "Related Articles" section
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent
- `frontend/src/lib/content.ts` — add `getRelatedBlogPosts(hospitalSlug)` helper
- `frontend/src/i18n/en.json` + `bn.json` — add `hospitals.relatedArticles` key

#### 7.2.3 Separate Reviews Section — 🟡 LOW IMPACT

**What they have:** A separate "Reviews" section (in addition to "Patient Feedback") with 1 review (Ali from Dhaka, Bangladesh — cardiac surgery). This appears to be a different review widget/system than the Patient Feedback section.

**Why they win:** Additional social proof, though with only 1 review it's thin.

**How to beat them:**
- We don't need two separate review sections — one well-structured reviews section (from section 1.3 above) is better than two thin ones
- Consolidate all reviews into a single `reviews` schema field with `AggregateRating` JSON-LD

#### 7.2.4 MTQUA Accreditation — 🟠 MEDIUM IMPACT

**What they have:** MTQUA (Medical Travel Quality Alliance) accreditation listed as a third accreditation alongside JCI and NABH. The Fortis page emphasizes: "only Indian hospital listed by MTQUA as one of the top five global destinations for medical tourism."

**Why they win:** MTQUA is a medical-tourism-specific accreditation that directly validates international patient quality. JCI and NABH are general healthcare accreditations; MTQUA specifically signals "good for medical tourists."

**How to beat them:**
- Our frontmatter already mentions MTQUA in the FAQ answer and body prose, but it's not listed as a separate accreditation badge in the hero
- Add MTQUA to the `accreditations` array in Fortis frontmatter so it renders as a badge
- **Verify whether our other hospitals have MTQUA** and add it where applicable

**Files to update:**
- `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md` — add MTQUA to `accreditations` array
- `frontend/src/content/hospitals/bn/fortis-hospital-bannerghatta.md` — BN equivalent

### 7.3 Competitor Weaknesses on Fortis Page (Our Opportunities)

#### 7.3.1 Broken Stats Band (Again) — ✅ Our Advantage

Lines 884-898 of the fetched page show all stats as `0` — same bug as the Apollo page. This is a **site-wide CMS integration failure** on Medijourney. Our StatBand works correctly on every hospital page.

#### 7.3.2 Data Inconsistency in Bed Count — ✅ Our Opportunity

The competitor's Fortis page has **three different bed counts**:
- About section: "276-bed"
- Stats band: "0" (broken)
- FAQ section: "284-bed"

Our frontmatter says `bedCount: 284` which matches their FAQ number. **But our description field says "400-bed"** which is wrong — this is a data inconsistency in OUR content that we need to fix.

**Action item:** Fix `description` in `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md` — change "400-bed" to "284-bed". Also fix the BN equivalent.

#### 7.3.3 Poor Similar Hospitals Filtering — ✅ Our Opportunity

Their "Similar Hospitals" for a **Bangalore** hospital page lists mostly **Delhi/NCR** hospitals (Indraprastha Apollo Delhi, Artemis Gurugram, BLK-Max Delhi, Medanta Gurgaon, FMRI Gurgaon, Manipal Dwarka Delhi) and only one other Bangalore-area hospital (Apollo Greams Road Chennai — which isn't even Bangalore).

**Why this is weak:** A patient researching Fortis Bannerghatta (Bangalore) wants to compare with other Bangalore hospitals, not Delhi hospitals. This shows their similar hospitals are not filtered by city.

**How to beat them:**
- Filter similar hospitals by `city` first, then by overlapping `specialities`
- For Fortis Bannerghatta, show: Apollo Bannerghatta, Manipal Old Airport Road, Manipal Doddaballapur, Fortis Cunningham Road, Fortis Rajajinagar, Aster CMI
- This is a clear UX win — our similar hospitals will be geographically relevant

#### 7.3.4 More Doctors Listed (7 vs Apollo's 1) — 🟡 Note

The Fortis page lists 7 doctors vs only 1 on the Apollo page. This suggests their doctor data is inconsistently populated across hospitals. Our CMS-driven grid automatically shows all doctors at each hospital, so we have consistent coverage.

### 7.4 Fortis-Specific Scorecard

| Section | Medijourney (live) | Khan Meditour | Winner |
|---|---|---|---|
| Stats band | All zeros (broken) | 284 beds, 2006, speciality count | **Us** |
| Doctors at hospital | 7 doctors | Full CMS-driven grid | **Us** (consistency) |
| Procedure Cost table | 10 procedures, INR+USD | Missing | **Them** |
| Patient reviews | 6 testimonials + 1 separate review | Missing | **Them** |
| Similar hospitals | 7 (but mostly Delhi — poor filtering) | Missing | **Them** (content) / **Us** (relevance opportunity) |
| How to reach | Airport + metro | Address only | **Them** |
| FAQs | 5 + 15+ detailed FAQs | 3 manual + auto-generated | **Them** (depth) |
| Blogs section | 4 posts linked | Missing | **Them** |
| MTQUA accreditation | Listed as badge | Mentioned in prose/FAQ only | **Them** (visibility) |
| Gallery | 3 images | 1 image (repeated) | **Them** |
| JSON-LD schema | None visible | Hospital + FAQPage + BreadcrumbList | **Us** |
| Sticky booking rail | No | Yes | **Us** |
| Bilingual | 7 UI languages | EN + BN | **Them** (breadth) |
| Data consistency | 276/284/0 beds (inconsistent) | 284/400 (needs fix) | Tie (both have issues) |

### 7.5 Fortis-Specific Action Items

In addition to the universal gaps in Part A (sections 1.1–1.14), the Fortis page requires these specific fixes:

| # | Task | Priority | Files |
|---|---|---|---|
| F1 | **Fix bed count inconsistency** — description says "400-bed", frontmatter says 284. Change to 284. | 🔴 High | `en/fortis-hospital-bannerghatta.md`, `bn/fortis-hospital-bannerghatta.md` |
| F2 | **Add MTQUA to accreditations array** — currently only in prose/FAQ | 🟠 Medium | `en/fortis-hospital-bannerghatta.md`, `bn/fortis-hospital-bannerghatta.md` |
| F3 | **Add HIFU to procedure cost table** — unique to Fortis (prostate cancer treatment) | 🟠 Medium | Hospital markdown + schema |
| F4 | **Add chemotherapy per cycle to cost table** — unique pricing unit | 🟡 Low | Hospital markdown + schema |
| F5 | **Expand FAQs** — add payment/currencies, success rates, top procedures, diagnostic tech, infection control | 🟠 Medium | `faq-generator.ts`, hospital markdown |
| F6 | **Add "Related Articles" section** — link country-specific blog posts | 🟡 Low | `[slug].astro`, `content.ts` |

---

## Part C — Cross-Hospital Patterns & Strategic Recommendations

## 8. Consistent Competitor Patterns (Across Both Pages)

After analyzing both the Apollo and Fortis pages, these patterns are **consistent across Medijourney's hospital pages**:

### 8.1 Consistent Content Structure (Both Pages)

Every Medijourney hospital page includes:
1. Hero with name + full address + established year + multi-speciality tag + accreditation badges
2. Sticky in-page nav tabs
3. About Hospital (detailed prose)
4. CTA card ("Ask anything about your health")
5. Accreditations (verified list)
6. Awards & Recognitions (specific, named)
7. Centres of Excellence (detailed per-center)
8. International Patient Services (bullet list)
9. CTA form ("Looking for the Best Doctors")
10. **Procedure Cost table** (INR + USD) — consistent across both
11. **Cost Considerations** (7 bullets) — consistent across both
12. **Patient Feedback** (6 testimonials) — consistent across both
13. **Plan Your Treatment with Medijourney** (coordination pitch) — consistent across both
14. FAQs (5 curated)
15. CTA card ("Speak with a Medical Coordinator")
16. **Stats band (BROKEN — all zeros)** — consistent bug across both
17. Address + Airport + Metro + CTAs
18. CTA card ("Could not find what you are looking for?")
19. Specialized in (25 specialties grid with icons)
20. Top Doctors (variable count — 1 on Apollo, 7 on Fortis)
21. Achievements
22. Medical Staff
23. Infrastructure
24. Facilities
25. Similar Hospitals
26. Images

### 8.2 Consistent Technical Failures (Both Pages)

1. **Stats band always shows 0** — site-wide CMS integration bug
2. **No JSON-LD structured data** — no Hospital, FAQPage, BreadcrumbList, or Review schema on either page
3. **No visible breadcrumb UI** — only nav tabs
4. **Inconsistent doctor coverage** — 1 doctor on Apollo, 7 on Fortis (data population gap)
5. **Poor similar hospitals filtering** — Delhi hospitals shown on Bangalore pages

### 8.3 Our Consistent Advantages (Both Pages)

1. **Working StatBand** — pulls real data from frontmatter on every hospital page
2. **JSON-LD schema** — Hospital + FAQPage + BreadcrumbList on every hospital page
3. **CMS-driven doctor grid** — automatically populated, consistent across all hospitals
4. **Sticky booking rail** — persistent conversion touchpoint
5. **Bilingual EN + BN** — full content parity
6. **Auto-generated + manual FAQs** — every hospital page has FAQs even without manual content

## 9. Updated Universal Implementation Plan

The implementation plan in sections 3–6 above applies to **all hospital pages**, not just Apollo. Based on the Fortis analysis, here are the additions:

### 9.1 Additional Universal Tasks (From Fortis Findings)

| # | Task | Priority | Applies to |
|---|---|---|---|
| U1 | Expand `generateHospitalFaqs()` with payment/insurance, success rates, top procedures, diagnostic tech, infection control templates | 🟠 Medium | All hospitals |
| U2 | Add "Related Articles" section (blog cross-linking) | 🟡 Low | All hospitals |
| U3 | Audit all hospital frontmatter for data inconsistencies (bed count, description) | 🔴 High | All hospitals |
| U4 | Verify all accreditations are in the `accreditations` array (not just prose) | 🟠 Medium | All hospitals |
| U5 | Filter similar hospitals by city first, then specialities | 🟠 Medium | Template + `content.ts` |

### 9.2 Data Audit Checklist (All 5 Hospitals)

Before implementing new sections, audit existing hospital content for data accuracy:

- [ ] **Apollo Bannerghatta:** bedCount 250 ✓, description matches ✓
- [ ] **Fortis Bannerghatta:** bedCount 284, description says "400-bed" ✗ — **FIX**
- [ ] **Manipal Old Airport Road:** verify bed count + description
- [ ] **Manipal Doddaballapur:** verify bed count + description
- [ ] **Aster CMI:** verify bed count + description
- [ ] Check all `accreditations` arrays include all verified accreditations (JCI, NABH, NABL, MTQUA where applicable)
- [ ] Check all `establishedYear` values against verified sources
- [ ] Check all `specialities` arrays are complete (compare against competitor's 25-specialty grid)

---

## Part D — Cross-Hospital Content Audit (All 5 Hospitals)

> **Source:** External audit findings reviewed and verified against our actual content files on 2026-09-10.
> **Hospitals covered:** Apollo Bannerghatta, Fortis Bannerghatta, Manipal Old Airport Road, Narayana Institute of Cardiac Sciences, SPARSH Hennur

## 10. Priority 1 — Factual Errors & Inconsistencies (VERIFIED)

Each finding below has been verified against our actual content files.

### 10.1 Fortis: 284 vs 400 Beds — 🔴 CONFIRMED BUG

**Finding:** Bed count inconsistency between description and frontmatter.

**Verified status:**
- `bedCount: 284` in frontmatter ✓ (correct — matches competitor's FAQ section)
- EN `description:` says "400-bed" ✗ — **WRONG**
- BN `description:` says "২৮৪-শয্যাবিশিষ্ট" (284-bed) ✓ — correct
- Body prose (line 91): "284 beds" ✓ — correct

**Fix:** Change EN description from "400-bed" to "284-bed". BN is already correct.

**File:** `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md` line 6

---

### 10.2 Manipal vs Fortis: First JCI in Karnataka — 🔴 CONFIRMED CONFLICT

**Finding:** Both Manipal and Fortis claim to be "the first JCI-accredited hospital in Karnataka."

**Verified status:**
- **Fortis** claims "first JCI-accredited hospital in Karnataka" in:
  - FAQ answer (line 48)
  - Body prose (line 59)
  - Awards section (line 115)
- **Manipal** claims "first JCI-accredited hospital in Karnataka" in:
  - FAQ answer (line 49)
  - Body prose (line 60)
  - Awards section (line 127)
- Competitor's Fortis page says: "first hospital in Karnataka to be JCI accredited (2008)" — gives a year (2008)
- Our content gives no year for either hospital's JCI accreditation

**Resolution needed:** Both cannot be first. External research needed to determine which hospital actually received JCI accreditation first and in which year. Possibilities:
1. Fortis was first (2008 per competitor) and Manipal's claim is wrong
2. Manipal was first (earlier than 2008) and Fortis's claim is wrong
3. One claim refers to "first in Karnataka" and the other to "first in South India" or another scope

**Action:** Research and verify. Soften or remove the incorrect claim. Add the year to the correct claim. Apply fix to both EN and BN files.

**Files to update:**
- `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md` — FAQ, body, awards
- `frontend/src/content/hospitals/bn/fortis-hospital-bannerghatta.md` — BN equivalent
- `frontend/src/content/hospitals/en/manipal-hospital-old-airport-road.md` — FAQ, body, awards
- `frontend/src/content/hospitals/bn/manipal-hospital-old-airport-road.md` — BN equivalent

---

### 10.3 SPARSH: NABH Only, Very New (2025) — 🟠 VERIFIED, NEEDS SOFTENING

**Finding:** SPARSH is NABH-only and opened in 2025; content should not over-claim maturity.

**Verified status:**
- `accreditations: [NABH]` ✓ — only NABH, no JCI, no NABL
- `establishedYear: 2025` ✓ — very new
- Body prose (line 55): "Inaugurated in 2025" ✓ — transparent
- Body prose (line 55): "one of Karnataka's most respected healthcare networks" — this refers to the SPARSH Group (parent), not the Hennur campus specifically. Could be misread.
- Description (line 6): "quaternary care multi-speciality centre excelling in..." — this is a strong claim for a hospital that opened in 2025. "Excels in" implies track record.
- Awards section (lines 112-116): "Newest quaternary care facility in North Bangalore" + "50+ speciality departments" — these are factual but the awards list is thin (no external awards yet, which is expected for a 2025 hospital)

**Fix:**
- Soften description: change "excelling in" to "offering" or "specialising in"
- Add transparency: "SPARSH Hospital Hennur opened in 2025 as the newest campus of the SPARSH Group" in the first sentence of the body
- Clarify that the "respected healthcare network" claim refers to the parent group, not the Hennur campus
- Do not remove NABH accreditation — it's accurate. But don't imply JCI or international accreditation.

**Files to update:**
- `frontend/src/content/hospitals/en/sparsh-hospital-hennur.md` — description + body
- `frontend/src/content/hospitals/bn/sparsh-hospital-hennur.md` — BN equivalent

---

### 10.4 Undated Big Numbers — 🟠 VERIFIED, NEEDS DATING

**Finding:** Large statistics across all 5 hospitals are stated without "as of [year]" or verification date.

**Verified undated claims:**

| Hospital | Claim | Location | Issue |
|---|---|---|---|
| Apollo | "70,000 international patients" | Body line 61 | No date |
| Apollo | "500+ international patient consultations every month" | Body line 61 | No date |
| Apollo | "over 120 countries" | Body line 99 | No date |
| Fortis | "175 countries" | FAQ line 48, body line 59, 102 | No date; 175 is very high for a single hospital |
| Fortis | "150 senior doctors" | Body line 61 | No date |
| Fortis | "800 para-medical staff" | Body line 61 | No date |
| Manipal | "3 million patients annually" | Body line 62, awards 130 | No date; likely network-wide, not hospital-specific |
| Manipal | "1,700 doctors across 60+ specialities" | Body line 62 | No date; likely network-wide |
| Manipal | "30 countries" | Body line 123 | No date |
| Narayana | "60 heart surgeries per day" | Body line 54 | No date |
| Narayana | "thousands of heart surgeries annually" | Description + body | No date |
| Narayana | "283 highly qualified doctors" | Body line 54 | No date |
| SPARSH | "2,500 direct and indirect employment" | Body line 59 | No date |
| SPARSH | "scale to nine hospitals with over 1,700 beds by end of 2025" | Body line 59 | Forward-looking, not current |

**Fix:** For each claim, either:
1. Add "as of [year]" if the source is verifiable
2. Clarify if the number is hospital-specific vs network-wide (especially Manipal's "3 million" and "1,700 doctors" which are likely Manipal Health Enterprises network numbers, not Old Airport Road campus numbers)
3. Remove if unverifiable

**Priority claims to fix first:**
- Fortis "175 countries" — this is an extraordinary claim for a single hospital; verify or soften
- Manipal "3 million patients annually" — clarify if this is the hospital or the network
- Narayana "60 heart surgeries per day" — add "as of [year]"

**Files to update:** All 10 hospital content files (5 EN + 5 BN)

---

## 11. Priority 2 — Missing Trust & Decision Elements (VERIFIED)

### 11.1 Google Maps Embed — 🟠 VERIFIED MISSING

**Finding:** No hospital page has an embedded Google Map.

**Verified status:** Our template (`[slug].astro`) has no map iframe. Address is shown in the sticky sidebar as text only.

**Fix:** Add a Google Maps embed iframe using the hospital address. Can use a simple embed URL: `https://www.google.com/maps/embed/v1/place?key=API_KEY&q={hospital.address}` or the free embed format without API key.

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — add map embed section
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent
- Optionally add `mapEmbedUrl` to hospital schema for per-hospital map control

---

### 11.2 Image Gallery (6-8 Real Photos) — 🟠 VERIFIED MISSING

**Finding:** All 5 hospitals have only 1 gallery image (the same as the hero image).

**Verified status:**

| Hospital | Gallery images | Hero image |
|---|---|---|
| Apollo | 1 (same as hero) | 1 |
| Fortis | 1 (same as hero) | 1 |
| Manipal | 1 (same as hero) | 1 |
| Narayana | 1 (same as hero) | 1 |
| SPARSH | 1 (same as hero) | 1 |

Competitor's Fortis page has 3 images (OT room, outside, patient room). Their Apollo page has 2 (Help Desk, Ward). Both are still weak but better than ours.

**Fix:** Source 6-8 real photos per hospital: exterior, lobby/international desk, patient rooms, ICU/OT (if available), cafeteria, prayer room (if relevant). Add to `gallery` array in frontmatter.

**Files to update:** All 10 hospital content files (5 EN + 5 BN) — add images to `gallery` array

---

### 11.3 Sample Package Cost Ranges — 🔴 VERIFIED MISSING

**Finding:** No hospital page has procedure cost ranges.

**Verified status:** Already documented in Part A section 1.1 and Part B section 7.1. Confirmed across all 5 hospitals — none have a procedure cost table.

**Fix:** Already specced in section 1.1 above. Add `procedureCosts` schema field + cost table to each hospital markdown body.

---

### 11.4 "Why Patients From [Market] Choose This Hospital" — 🟠 VERIFIED MISSING

**Finding:** No hospital page has a market-specific section explaining why patients from Bangladesh, Middle East, or Africa should choose that hospital.

**Verified status:** All 5 hospitals have a generic "International Patient Services" section with bullet lists of services. None have a market-specific "Why patients from [region] choose this hospital" section.

**Fix:** Add a `## Why International Patients Choose [Hospital]` section to each hospital markdown body with 3-4 market-specific bullets:

**Apollo example:**
```markdown
## Why International Patients Choose Apollo Hospitals Bannerghatta

- **Bangladesh patients:** Arabic and Bengali coordinators on staff; direct visa invitation letters; 500+ international consultations monthly
- **Middle East patients:** Arabic interpreter services, halal meal options, prayer room, cashless billing with major GCC insurance providers
- **Africa patients:** Experience treating patients from Nigeria, Kenya, and East Africa; English-speaking clinical team; post-discharge teleconsultation for remote follow-up
```

**Files to update:** All 10 hospital content files (5 EN + 5 BN)

---

### 11.5 Fortis Doctors Section Missing — 🔴 CONFIRMED BUG

**Finding:** Fortis Hospital page has no doctors section because no doctors are tagged with `hospitalId: fortis-hospital-bannerghatta`.

**Verified status:** Searched all 52 doctor files in `frontend/src/content/doctors/en/`. Doctor-to-hospital mapping:

| Hospital | Doctor count |
|---|---|
| Apollo Bannerghatta | 15 doctors |
| Manipal Old Airport Road | 14 doctors |
| SPARSH Hennur | 14 doctors |
| Narayana Institute of Cardiac Sciences | 6 doctors |
| **Fortis Bannerghatta** | **0 doctors** |

The template's `getDoctorsAtHospital()` returns an empty array for Fortis, so the doctors grid section is conditionally hidden (`{doctors.length > 0 && ...}`). The section doesn't render at all.

**Fix:** Add doctor profiles for Fortis Bannerghatta. The competitor lists 7 doctors:
1. Dr. Rajanna Sreedhara — Senior Consultant, Nephrologist
2. Dr. Aashish Parekh — Consultant, Nephrologist
3. Dr. Vivek Belathur — Senior Consultant, Medical Oncologist
4. Dr. Sudheendra G Udbalker — Senior Consultant, Dermatologist
5. Dr. Sudarshan G T — Senior Consultant, Cardiothoracic and Vascular Surgeon
6. Dr. Srinivasa Prasad B V — Senior Consultant, Interventional Cardiologist
7. Dr. Vivek Jawali — Chairman, Cardiac Surgeon

Create doctor markdown files for each, with `hospitalId: fortis-hospital-bannerghatta`, in both EN and BN content folders.

**Files to create:**
- `frontend/src/content/doctors/en/dr-rajanna-sreedhara.md` (and 6 more)
- `frontend/src/content/doctors/bn/dr-rajanna-sreedhara.md` (and 6 more)
- Doctor photos in `frontend/public/images/doctors/`

---

## 12. Priority 3 — Structural & Content Upgrades (VERIFIED)

### 12.1 Standardize Stats Bar — 🟠 VERIFIED

**Finding:** Our StatBand shows beds, established year, speciality count. The audit recommends adding accreditations.

**Verified status:** Our StatBand in `[slug].astro` (lines 99-103) builds stats from:
1. `hospital.bedCount` → beds label
2. `hospital.establishedYear` → established label
3. `hospital.specialities.length` → specialities count label

Accreditations are shown as badges in the hero, not in the StatBand.

**Fix:** Add a 4th stat for accreditation count or accreditation names. Either:
- Add `{ value: hospital.accreditations.length, label: "Accreditations" }` to the stats array
- Or show accreditation names as a combined stat: `{ value: hospital.accreditations.join(", "), label: "Accreditations" }`

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — add accreditation stat
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent
- `frontend/src/i18n/en.json` + `bn.json` — add `hospitals.accreditationsLabel` key

---

### 12.2 Centres of Excellence — More Scannable — 🟡 VERIFIED

**Finding:** Our CoE sections are prose paragraphs. The audit recommends shorter paragraphs + bullet key procedures/volumes.

**Verified status:** All 5 hospitals use the same pattern — `### Specialty Name` followed by a 3-5 sentence paragraph. No bullets, no procedure lists, no volume numbers.

**Fix:** Add a "Key procedures" bullet list under each CoE heading:

```markdown
### Cardiac Sciences

The cardiac sciences department offers comprehensive heart care...

**Key procedures:**
- Coronary artery bypass grafting (CABG)
- Heart valve repair and replacement
- Angioplasty and stenting
- Electrophysiology and ablation
- Paediatric cardiac surgery
```

**Files to update:** All 10 hospital content files (5 EN + 5 BN)

---

### 12.3 Outcomes & Volume Box — 🟡 VERIFIED MISSING

**Finding:** No hospital page has an outcomes or volume data box.

**Verified status:** Confirmed — no hospital page has a structured "Outcomes & Volume" section. Narayana would benefit most (cardiac surgery volume) and SPARSH (orthopaedic volume).

**Fix:** Add a `## Outcomes & Volume` section where data exists. Only include publicly verifiable data:

**Narayana example:**
```markdown
## Outcomes & Volume

| Metric | Value |
|--------|-------|
| Heart surgeries per day | ~60 (as of [year]) |
| Paediatric cardiac ICU beds | 80 (largest in the world) |
| Total cardiac beds | 606 |
| Cath labs | 6 (including 1 hybrid) |
```

**Files to update:** Hospital markdown files where data is publicly available (Narayana, SPARSH especially)

---

### 12.4 Patient-Focused FAQs — 🟠 VERIFIED MISSING

**Finding:** The audit recommends 3 specific patient-focused FAQs that we don't have.

**Verified status:** Our 3 manual FAQs per hospital cover accreditation, specialties, and international services. We're missing:

1. "How long is the typical stay for [top procedure]?"
2. "Is there Arabic / Bengali / Swahili support at this hospital?"
3. "What is included in the international patient package?"

**Fix:** Add these 3 FAQs to each hospital's manual `faqs` array in frontmatter. Customize per hospital based on actual language support and top procedures.

**Files to update:** All 10 hospital content files (5 EN + 5 BN)

---

### 12.5 WhatsApp Pre-Filled Message — ✅ ALREADY DONE

**Finding:** The audit recommends hospital-specific WhatsApp pre-filled messages.

**Verified status:** We already do this. `getHospitalInquiryLink(hospital.name)` in `lib/whatsapp.ts` builds a contextual WhatsApp message with the hospital name. The audit even acknowledges: "you already do this well."

**No action needed.** ✅

---

## 13. Priority 4 — Differentiation Strategy (VERIFIED)

**Finding:** The five hospital pages risk feeling copy-paste. Each needs a clear positioning.

**Verified status:** Our content has some differentiation but the descriptions and structure are similar across all 5 hospitals. The positioning is present in the content but not sharp enough — especially in the hero description and the "About" section.

### Recommended Positioning Per Hospital

| Hospital | Current positioning | Recommended sharp positioning |
|---|---|---|
| **Narayana** | "one of the world's largest cardiac care facilities" | **"World's largest dedicated cardiac hospital + paediatric cardiac ICU"** — make it the default recommendation for complex heart cases. Lead with Dr. Devi Shetty founding story + 80-bed paediatric cardiac ICU (world's largest) |
| **Apollo** | "flagship multi-speciality JCI-accredited facility" | **"Multi-speciality flagship + CyberKnife oncology + international desk with Arabic/Russian/Bengali"** — lead with CyberKnife (unique tech) + multilingual international desk |
| **Manipal** | "flagship quaternary-care centre" | **"Urology/Nephrology excellence + transplant + longest history (1991)"** — lead with 1991 establishment (oldest in our network) + robotic urological surgery + kidney transplant programme |
| **Fortis** | "renowned for cardiac sciences, oncology, neurology" | **"MTQUA-ranked + broad transplant programme + first JCI in Karnataka (verify year)"** — lead with MTQUA (only Indian hospital in top 5) + transplant breadth |
| **SPARSH** | "quaternary care multi-speciality centre" | **"Modern 2025 infrastructure + orthopaedics heritage + BMT"** — be transparent about being new (2025), position as strong alternative for ortho and selected oncology, note NABH-only accreditation |

**Fix:** Rewrite each hospital's `description` frontmatter and the first paragraph of the body to lead with the differentiator. The hero description is the first thing patients read — it should immediately communicate why this hospital is the right choice for their specific need.

**Files to update:** All 10 hospital content files (5 EN + 5 BN) — `description` field + first body paragraph

---

## 14. Priority 5 — SEO & Schema (VERIFIED)

### 14.1 Hospital Schema — ✅ ALREADY DONE

**Verified status:** We already inject `hospitalSchema()` JSON-LD on every hospital page. The audit recommends adding Hospital/MedicalOrganization schema — we already have this.

**No action needed.** ✅

---

### 14.2 Unique Title Tags & Meta Descriptions — 🟠 VERIFIED GAP

**Finding:** Title tags should include hospital name + "Bangalore" + "international patients".

**Verified status:** Our title template (line 63 of `[slug].astro`):
```javascript
const title = `${hospital.name} — ${t.hospitals.title} | ${t.site.name}`;
```
This produces: "Apollo Hospitals, Bannerghatta Road, Bangalore — Hospitals | Khan Meditour"

**Issues:**
1. "Bangalore" is in the hospital name for some hospitals but not all (Narayana says "Bommasandra, Bangalore", SPARSH says "Hennur, Bangalore")
2. "international patients" is not in the title
3. The meta description uses `hospital.description` which is good but doesn't consistently include "international patients"

**Fix:** Update the title template to include "Bangalore" and "international patients":
```javascript
const title = `${hospital.name}, Bangalore — International Patient Care | ${t.site.name}`;
```
Or add a per-hospital `seoTitle` field in frontmatter for full control.

**Files to update:**
- `frontend/src/pages/hospitals/[slug].astro` — update title template (line 63)
- `frontend/src/pages/bn/hospitals/[slug].astro` — BN equivalent
- Optionally add `seoTitle` and `seoDescription` to hospital schema

---

### 14.3 Internal Links From Treatment & Country Pages — 🟡 NEEDS VERIFICATION

**Finding:** Treatment pages and country pages should link to the most relevant hospital for that procedure/market.

**Verified status:** Not fully verified in this audit. Our treatment pages have a "Treating Hospitals" section that links to hospital pages. Country pages may not have hospital-specific links.

**Fix:** Audit treatment and country page templates to ensure they link to relevant hospitals. This is a broader SEO task beyond hospital pages.

---

## 15. Consolidated Action Plan (All Priorities)

### Immediate (This Week) — Priority 1

| # | Task | Severity | Files |
|---|---|---|---|
| P1.1 | Fix Fortis EN description: "400-bed" → "284-bed" | 🔴 Bug | `en/fortis-hospital-bannerghatta.md` |
| P1.2 | Resolve JCI conflict: research which hospital was first in Karnataka, fix the wrong claim, add year | 🔴 Factual error | 4 files (Fortis + Manipal, EN + BN) |
| P1.3 | Soften SPARSH claims: "excelling in" → "offering"; clarify "respected network" = parent group | 🟠 Over-claim | `en/sparsh-hospital-hennur.md`, `bn/sparsh-hospital-hennur.md` |
| P1.4 | Date or remove all big numbers across all 5 hospitals | 🟠 Unverified | All 10 hospital files |

### Short-Term (Next Sprint) — Priority 2

| # | Task | Impact | Files |
|---|---|---|---|
| P2.1 | Add Google Maps embed to hospital template | 🟠 Medium | `[slug].astro` (EN + BN) |
| P2.2 | Source 6-8 gallery photos per hospital | 🟠 Medium | All 10 hospital files |
| P2.3 | Add procedure cost table (already specced in section 1.1) | 🔴 High | All 10 hospital files + schema |
| P2.4 | Add "Why International Patients Choose [Hospital]" section | 🟠 Medium | All 10 hospital files |
| P2.5 | Add Fortis doctors (7 profiles, EN + BN) | 🔴 High | 14 new doctor files + photos |

### Medium-Term — Priority 3

| # | Task | Impact | Files |
|---|---|---|---|
| P3.1 | Add accreditations to StatBand | 🟠 Medium | `[slug].astro` (EN + BN) + i18n |
| P3.2 | Add "Key procedures" bullets under each CoE | 🟡 Low | All 10 hospital files |
| P3.3 | Add "Outcomes & Volume" box where data exists | 🟡 Low | Narayana, SPARSH files |
| P3.4 | Add 3 patient-focused FAQs (stay duration, language support, package inclusions) | 🟠 Medium | All 10 hospital files |
| P3.5 | Update title tags to include "Bangalore" + "international patients" | 🟠 Medium | `[slug].astro` (EN + BN) |

### Ongoing — Priority 4

| # | Task | Impact | Files |
|---|---|---|---|
| P4.1 | Sharpen each hospital's positioning in description + first paragraph | 🟠 Medium | All 10 hospital files |
| P4.2 | Audit treatment/country page links to hospitals | 🟡 Low | Treatment + country templates |

---

## Part E — Verified Facts & Corrections (Web-Researched)

> **Sources:** Official hospital websites, JCI/Apollo press releases, Religare Health Trust annual reports, MTQUA press releases, NABH accreditation certificates, Wikipedia, and third-party medical tourism sites.
> **Date researched:** 2026-09-10
> **Purpose:** Verify every major factual claim in our hospital content against authoritative sources before we publish. Only verified facts should appear in our content; unverified claims must be softened, dated, or removed.

## 16. JCI Accreditation in Karnataka — RESOLVED

**Question:** Who was the first JCI hospital in Karnataka and in which year?

**Verified answer:**

| Hospital | JCI year | Source | Claim status |
|---|---|---|---|
| **Manipal Hospital, Old Airport Road** | **2006** | The Citizenship Desk (hospital profile), shifamhealth.com (lists Manipal as #1 JCI in Karnataka) | **First in Karnataka** ✓ |
| **Fortis Hospital, Bannerghatta Road** | **February 2008** | Religare Health Trust Annual Report 2013 (primary financial document): "Awarded the JCI accreditation in February 2008, 20 months after its inception" | Second in Karnataka |
| **Apollo Hospitals, Bannerghatta Road** | **2008** | Apollo Hospitals press release (April 2024): "In Bangalore, the JCI journey commenced in 2008" | Third in Karnataka |

**Our content corrections needed:**

| Hospital | Our current claim | Correct claim | Action |
|---|---|---|---|
| Manipal | "first JCI-accredited hospital in Karnataka" | ✓ **CORRECT** — first in Karnataka, JCI since 2006 | No change needed. Add year: "JCI accredited since 2006 — the first hospital in Karnataka to achieve this" |
| Fortis | "first JCI-accredited hospital in Karnataka" | ✗ **WRONG** — Fortis was second (Feb 2008), after Manipal (2006) | **FIX:** Remove "first in Karnataka" claim. Replace with: "JCI accredited since February 2008 — six consecutive accreditations" |
| Apollo | (doesn't claim "first") | ✓ **CORRECT** — Apollo doesn't claim first | No change needed. Can add: "JCI accredited since 2008 — six consecutive accreditations as of October 2023" |

**Files to fix:**
- `frontend/src/content/hospitals/en/fortis-hospital-bannerghatta.md` — FAQ line 47-48, body line 59, awards line 115
- `frontend/src/content/hospitals/bn/fortis-hospital-bannerghatta.md` — BN equivalents
- `frontend/src/content/hospitals/en/manipal-hospital-old-airport-road.md` — add year 2006 to JCI claims
- `frontend/src/content/hospitals/bn/manipal-hospital-old-airport-road.md` — BN equivalent

---

## 17. Bed Count Verification — All 5 Hospitals

| Hospital | Our content | Official source | Third-party sources | Verified value | Action |
|---|---|---|---|---|---|
| **Apollo Bannerghatta** | 250 | **350** (apollohospitals.com) | 295 (Practo), 250 (Medijourney, Hospidio — older) | **350** | **FIX:** Update `bedCount: 250` → `bedCount: 350` |
| **Fortis Bannerghatta** | 284 (frontmatter) / "400-bed" (EN description) | **284** (fortishealthcare.com specialities page) | 284 (Vaidam, Doctar, Bangla Health Connect) | **284** | **FIX:** Change EN description "400-bed" → "284-bed". Frontmatter already correct. |
| **Manipal Old Airport Road** | 600 | **600** (manipalhospitals.com, Practo) | 600 (airomedical) | **600** ✓ | No change needed |
| **Narayana NICS** | 606 | **"600+ Advanced Care Beds"** (narayanahealth.org) | 606 (Nile Wellness, HexaHealth) | **606** (likely; official says "600+") ✓ | No change needed; can note "600+" |
| **SPARSH Hennur** | 300 | **300** (sparshhospital.com, news) but **200** (NABH certificate H-2025-1569) | 300 (all news sources) | **Conflict** | **INVESTIGATE:** NABH certificate says "Total Number of Sanctioned Beds: 200" but hospital announces 300. Likely 200 NABH-accredited + 100 non-accredited or planned. Note discrepancy in content. |

### 17.1 Apollo Bed Count — 🔴 CRITICAL FIX

Apollo's official website (apollohospitals.com/hospitals/apollo-hospitals-bannerghatta-road) clearly states: "The Apollo Hospitals at Bannerghatta is a **350 bedded hospital**." Multiple older sources say 250, which was likely the original count before expansion. Our content says 250 — this is outdated.

**Fix:**
- `frontend/src/content/hospitals/en/apollo-hospitals-bannerghatta.md` — `bedCount: 250` → `bedCount: 350`
- `frontend/src/content/hospitals/bn/apollo-hospitals-bannerghatta.md` — BN equivalent
- Update body prose if it mentions "250 beds"

### 17.2 Fortis Bed Count — 🔴 FIX DESCRIPTION ONLY

Fortis's official specialities page says "284-bed hospital." The location page says "400+ beds" in one section but "284-bed" in another — the 400+ is likely an error or includes affiliated capacity. All third-party sites (Vaidam, Doctar, Bangla Health Connect) consistently say 284.

Our frontmatter already says 284 ✓. Only the EN description says "400-bed" — fix to "284-bed".

### 17.3 SPARSH Bed Count — 🟠 INVESTIGATE

The NABH accreditation certificate (H-2025-1569, valid May 15, 2025 – May 14, 2029) states: "Total Number of Sanctioned Beds: **200**." However, the hospital's own announcement and all news sources say "300-bed quaternary care hospital."

**Likely explanation:** 200 beds are NABH-accredited; 100 additional beds are either planned, under a different license, or not yet accredited.

**Recommendation:** State "300-bed hospital (200 NABH-accredited beds)" or simply "300 beds" with a note that NABH accreditation covers 200 sanctioned beds. Do not over-claim — be transparent.

---

## 18. Verified Facts Per Hospital (With Sources)

### 18.1 Apollo Hospitals, Bannerghatta Road

| Claim | Our content | Verified value | Source | Status |
|---|---|---|---|---|
| Bed count | 250 | **350** | apollohospitals.com (official) | ✗ **FIX** |
| Established year | 2007 | 2007 | apollohospitals.com, Medijourney, Clinicspots | ✓ |
| JCI accredited | Yes | Yes, since 2008, 6th reaccreditation Oct 2023 | Apollo press release April 2024 | ✓ (add year) |
| NABH accredited | Yes | Yes | Multiple sources | ✓ |
| Daily OPD visits | Not stated | **700+** | apollohospitals.com (official) | **ADD** |
| International consultations/month | "500+" | **500+** | apollohospitals.com (official) | ✓ |
| International patients (cumulative) | "70,000+" | "70k+ Foreigners Treated" | hospidio.com (no date) | 🟠 **DATE OR SOFTEN** |
| Countries served | "120+" | **40+** (Bannerghatta specific) / 150+ (Apollo network) | karetrip.com (40+), apollohospitals.com/international (150+ network) | ✗ **FIX: 40+ for hospital, 150+ for network** |
| Campus size | "2,12,000 sq ft" | "2,12,000-square-foot campus" | Medijourney (competitor) | 🟠 Verify with Apollo official |
| Consultants | "100+" | "over a hundred consultants" | Practo (older Apollo text) | ✓ |

### 18.2 Fortis Hospital, Bannerghatta Road

| Claim | Our content | Verified value | Source | Status |
|---|---|---|---|---|
| Bed count (frontmatter) | 284 | **284** | fortishealthcare.com (official specialities page) | ✓ |
| Bed count (EN description) | "400-bed" | **284** | fortishealthcare.com | ✗ **FIX** |
| Established year | 2006 | 2006 | fortishealthcare.com, Religare AR | ✓ |
| JCI accredited | Yes | Yes, since **February 2008**, **6 times** | Religare AR 2013, fortishealthcare.com specialities page | ✓ (add year + count) |
| NABH accredited | Yes | Yes, **4 times** | fortishealthcare.com specialities page | ✓ (add count) |
| MTQUA accredited | Mentioned in prose | Yes, **October 2014**, **first in India** | mtqua.org press release | **ADD date + "first in India"** |
| "First JCI in Karnataka" | Claimed | ✗ **WRONG** — Manipal was first (2006) | The Citizenship Desk, shifamhealth.com | ✗ **REMOVE CLAIM** |
| Senior doctors | "150+" | "over 150 senior doctors" | fortishealthcare.com (official) | ✓ |
| Para-medical staff | "800+" | "800 para-medical staff" | fortishealthcare.com (official) | ✓ |
| Specialities | "40+" | "about 40 specialities" | fortishealthcare.com (official) | ✓ |
| Countries served | "175+" | "175+ countries" | Multiple third-party sites (Nile Wellness, Medserg, The Medi Global) | 🟠 **UNVERIFIED by official Fortis page** — soften to "patients from over 175 countries" with attribution, or verify with Fortis directly |
| International patients | Not stated | **3,000+** | nilewellness.com | **ADD** (if verified) |

### 18.3 Manipal Hospital, Old Airport Road

| Claim | Our content | Verified value | Source | Status |
|---|---|---|---|---|
| Bed count | 600 | **600** | manipalhospitals.com (official), Practo | ✓ |
| Established year | 1991 | 1991 | manipalhospitals.com (official) | ✓ |
| JCI accredited | Yes | Yes, since **2006** | thecitizenshipdesk.com | ✓ **ADD YEAR** |
| "First JCI in Karnataka" | Claimed | ✓ **CORRECT** — first in Karnataka (2006) | The Citizenship Desk, shifamhealth.com (#1 ranking) | ✓ |
| NABH accredited | Yes | Yes | Multiple sources | ✓ |
| NABL accredited | Yes | Yes | nilewellness.com | ✓ |
| AAHRPP accredited | Not mentioned | Yes | airomedical.com, nilewellness.com | **ADD** |
| ISO certified | Not mentioned | Yes — "first Indian multi-superspeciality hospital to attain ISO 9001:2000" | indiahospitaltour.com | **ADD** |
| "3 million patients annually" | Claimed | Likely **network-wide** (12,600 beds, 49 hospitals) | manipalhospitals.com says "12,600 beds across 49 hospitals" | ✗ **CLARIFY: network vs hospital** |
| "1,700 doctors" | Claimed | Likely **network-wide** | manipalhospitals.com network stats | ✗ **CLARIFY: network vs hospital** |
| "60+ specialities" | Claimed | "over sixty medical and surgical disciplines" | airomedical.com | ✓ |
| ICU beds | Not stated | **144** | Practo | **ADD** |
| Operation theatres | Not stated | **20** | Practo | **ADD** |
| Countries served | "30+" | Not verified by official Manipal page | — | 🟠 **VERIFY** |

### 18.4 Narayana Institute of Cardiac Sciences

| Claim | Our content | Verified value | Source | Status |
|---|---|---|---|---|
| Bed count | 606 | **"600+ Advanced Care Beds"** | narayanahealth.org (official) | ✓ (use "600+" to match official) |
| ICU beds | "200 critical care beds" | **"240+ ICU Beds"** | narayanahealth.org (official) | ✗ **FIX: 200 → 240+** |
| Established year | 2000 | 2000 | narayanahealth.org, Wikipedia | ✓ |
| JCI accredited | Yes | Yes | narayanahealth.org (official) | ✓ |
| NABH accredited | Yes | Yes | narayanahealth.org (official) | ✓ |
| Operation theatres | 16 | **19** (including 2 robotic) | narayanahealth.org (official) | ✗ **FIX: 16 → 19** |
| Cath labs | 6 (including 1 hybrid) | **8** (including 1 hybrid) | narayanahealth.org (official) | ✗ **FIX: 6 → 8** |
| Paediatric cardiac ICU | "80 beds — largest in the world" | "80-bed Paediatric Intensive Care Unit – largest in the world" | hexahealth.com, nilewellness.com | ✓ |
| Heart surgeries per day | "60" | "capacity of 60 heart surgeries per day" | Wikipedia (cited) | ✓ |
| Doctors | "283" | "1500+ Healthcare Professionals" | narayanahealth.org (official) | 🟠 **CLARIFY: 283 doctors vs 1500+ healthcare professionals** |
| Founded by | "Dr. Devi Shetty" | "commissioned in 2000 by Devi Shetty" | Wikipedia, narayanahealth.org | ✓ |

### 18.5 SPARSH Hospital, Hennur

| Claim | Our content | Verified value | Source | Status |
|---|---|---|---|---|
| Bed count | 300 | **300** (hospital announcement) / **200** (NABH certificate) | sparshhospital.com, NABH certificate H-2025-1569 | 🟠 **NOTE DISCREPANCY** |
| Established year | 2025 | **May 18, 2025** (inaugurated by Health Minister Dinesh Gundu Rao) | sparshhospital.com, newindianexpress.com | ✓ **ADD exact date** |
| NABH accredited | Yes | Yes, cert H-2025-1569, valid May 15 2025 – May 14 2029 | NABH portal | ✓ **ADD certificate details** |
| JCI accredited | No | No | — | ✓ (correctly not claimed) |
| IFEM certification | Not mentioned | **"First in India to Earn IFEM Gold Level Certification for Emergency Care"** | sparshhospital.com | **ADD** |
| Specialities | Listed | "orthopaedics, neurosciences, cardiac sciences, oncology, organ transplants, women and children" | expresshealthcare.in, hospitalmanagement.net | ✓ |
| Technology | Listed | "AI-powered diagnostics, 3D printing, robotic-assisted surgeries, real-time analytics" | expresshealthcare.in | **ADD: AI diagnostics, 3D printing** |
| Part of SPARSH Group | Yes | Yes — "one of Karnataka's most respected healthcare networks" | Multiple sources | ✓ |
| "Scale to 9 hospitals, 1,700 beds by end of 2025" | Claimed | Forward-looking statement from SPARSH Group | Our content only | 🟠 **MARK AS FORWARD-LOOKING** |

---

## 19. Consolidated Corrections Table

All corrections needed, sorted by severity:

### 🔴 Critical (Factual Errors)

| # | Hospital | Current | Correct | Source | File |
|---|---|---|---|---|---|
| C1 | **Apollo** | bedCount: 250 | bedCount: **350** | apollohospitals.com | `en/apollo-hospitals-bannerghatta.md` + BN |
| C2 | **Fortis** | "first JCI in Karnataka" (FAQ + body + awards) | **Remove claim** — Manipal was first (2006). Fortis JCI since Feb 2008 | Religare AR, The Citizenship Desk | `en/fortis-hospital-bannerghatta.md` + BN |
| C3 | **Fortis** | EN description: "400-bed" | "284-bed" | fortishealthcare.com | `en/fortis-hospital-bannerghatta.md` |
| C4 | **Narayana** | "200 critical care beds" | "**240+ ICU beds**" | narayanahealth.org | `en/narayana-institute-cardiac-sciences.md` + BN |
| C5 | **Narayana** | "16 operation theatres" | "**19 operation theatres** (including 2 robotic)" | narayanahealth.org | `en/narayana-institute-cardiac-sciences.md` + BN |
| C6 | **Narayana** | "6 cath labs" | "**8 cath labs** (including 1 hybrid)" | narayanahealth.org | `en/narayana-institute-cardiac-sciences.md` + BN |

### 🟠 Important (Missing Verified Facts or Misleading Claims)

| # | Hospital | Issue | Fix | Source | File |
|---|---|---|---|---|---|
| I1 | **Apollo** | "120+ countries" | Change to **"40+ countries" (hospital) / "150+ countries" (Apollo network)** | karetrip.com, apollohospitals.com | `en/apollo-hospitals-bannerghatta.md` + BN |
| I2 | **Apollo** | Missing "700+ daily OPD visits" | **ADD** | apollohospitals.com | `en/apollo-hospitals-bannerghatta.md` + BN |
| I3 | **Apollo** | "70,000+ international patients" undated | **DATE or SOFTEN**: "Over 70,000 international patients treated (cumulative, as of [year])" | hospidio.com | `en/apollo-hospitals-bannerghatta.md` + BN |
| I4 | **Fortis** | MTQUA mentioned but no date | **ADD**: "MTQUA certified October 2014 — first hospital in India to receive this" | mtqua.org press release | `en/fortis-hospital-bannerghatta.md` + BN |
| I5 | **Fortis** | "175+ countries" unverified by official source | **SOFTEN**: "Patients from over 175 countries (per Fortis and partner sources)" or verify with Fortis | Third-party sites only | `en/fortis-hospital-bannerghatta.md` + BN |
| I6 | **Manipal** | JCI year not stated | **ADD**: "JCI accredited since 2006 — the first hospital in Karnataka to achieve this" | thecitizenshipdesk.com | `en/manipal-hospital-old-airport-road.md` + BN |
| I7 | **Manipal** | "3 million patients annually" | **CLARIFY**: "Over 3 million patients annually across the Manipal Hospitals network" | manipalhospitals.com | `en/manipal-hospital-old-airport-road.md` + BN |
| I8 | **Manipal** | "1,700 doctors" | **CLARIFY**: "Over 1,700 doctors across the Manipal Hospitals network" | manipalhospitals.com | `en/manipal-hospital-old-airport-road.md` + BN |
| I9 | **Manipal** | Missing AAHRPP + ISO | **ADD**: "Also holds AAHRPP accreditation and was the first Indian multi-superspeciality hospital to attain ISO 9001:2000 certification" | airomedical.com, indiahospitaltour.com | `en/manipal-hospital-old-airport-road.md` + BN |
| I10 | **Manipal** | Missing ICU beds + OTs | **ADD**: "144 ICU beds, 20 operation theatres" | Practo | `en/manipal-hospital-old-airport-road.md` + BN |
| I11 | **SPARSH** | "300 beds" without NABH context | **NOTE**: "300-bed hospital (200 NABH-accredited sanctioned beds)" | NABH certificate | `en/sparsh-hospital-hennur.md` + BN |
| I12 | **SPARSH** | Missing IFEM certification | **ADD**: "First in India to earn IFEM Gold Level Certification for Emergency Care" | sparshhospital.com | `en/sparsh-hospital-hennur.md` + BN |
| I13 | **SPARSH** | Missing exact opening date | **ADD**: "Inaugurated May 18, 2025" | sparshhospital.com | `en/sparsh-hospital-hennur.md` + BN |
| I14 | **Narayana** | "283 doctors" vs "1500+ healthcare professionals" | **CLARIFY**: "283 doctors (1,500+ total healthcare professionals)" | narayanahealth.org | `en/narayana-institute-cardiac-sciences.md` + BN |

### 🟡 Nice-to-Have (Enhancements)

| # | Hospital | Issue | Fix | Source |
|---|---|---|---|---|
| N1 | Apollo | JCI year not stated | Add "JCI accredited since 2008 — 6th reaccreditation October 2023" | Apollo press release |
| N2 | Fortis | JCI/NABH count not stated | Add "JCI accredited 6 times, NABH accredited 4 times" | fortishealthcare.com |
| N3 | SPARSH | "Scale to 9 hospitals" is forward-looking | Mark as "SPARSH Group plans to scale to..." | Our content only |
| N4 | Narayana | "606 beds" vs official "600+" | Use "600+ beds" to match official wording | narayanahealth.org |

---

## 20. Source Authority Hierarchy

When facts conflict, use this hierarchy:

1. **Official hospital website** (apollohospitals.com, fortishealthcare.com, manipalhospitals.com, narayanahealth.org, sparshhospital.com) — highest authority for that hospital's own facts
2. **Accreditation body records** (JCI official, NABH portal, MTQUA press releases) — highest authority for accreditation claims
3. **Regulatory filings** (Religare Health Trust annual reports, company filings) — primary financial documents
4. **Hospital press releases** (Apollo press release April 2024) — official but may be promotional
5. **Wikipedia** (with citations) — good for established facts, verify citations
6. **Third-party medical tourism sites** (Vaidam, Nile Wellness, Karetrip, Medserg) — useful for cross-referencing but may copy from each other
7. **Competitor sites** (Medijourney) — useful for competitive analysis, not for fact verification

**Rule:** Never publish a bed count, accreditation year, or patient volume number that isn't backed by at least one source from tiers 1-4. If only tier 5-7 sources are available, mark the claim as "per [source]" or soften with "reported" / "approximately."
