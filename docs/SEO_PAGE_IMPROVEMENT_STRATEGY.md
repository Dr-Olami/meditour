# Page Improvement Strategy — Treatment, Country, Hospital & Doctor Pages

> **Purpose:** Specific, actionable improvements for each existing page type based on real patient search behavior. Organized by audience segment and search intent so the team can prioritize by impact.
>
> **Audience:** Content writers, SEO specialists, developers, and UX designers on the Khan Meditour team.
>
> **Last updated:** 2026-09-05

---

## How This Helps SEO / AEO / GEO / AIO

### SEO (Search Engine Optimization)
Each improvement below targets specific search queries that patients actually type. The improvements focus on:
- **Adding missing content** that patients search for but our pages don't currently answer
- **Structuring existing content** so search engines can parse and rank it
- **Adding schema markup** for rich results (cost tables, FAQs, reviews, breadcrumbs)
- **Improving internal linking** to distribute authority across related pages

### AEO (Answer Engine Optimization)
AI engines extract answers from pages that:
- Directly address common questions in plain language
- Provide specific, citable data (numbers, names, dates)
- Structure content with clear headings and lists
- Include comparison tables that AI can parse and reformat

### GEO (Generative Engine Optimization)
Generative engines favor pages that:
- Cover a topic comprehensively (the "hub" page concept)
- Link to and from related pages (topical authority)
- Include unique data or perspectives not found on competitor sites
- Are updated regularly with current information

### AIO (AI-Optimized Content)
AI search assistants recommend pages that:
- Load fast and are mobile-friendly
- Have clear content hierarchy (H1 → H2 → H3)
- Include structured data (JSON-LD schema)
- Provide actionable next steps (CTAs)

---

## 1. Treatment Pages (18 treatments × EN + BN)

### Current State
- H1 with long-tail SEO headline ✓
- Description paragraph in hero ✓
- Card image as hero background with gradient overlay ✓
- QuickFacts chips (duration, hospital stay, recovery, cost range) ✓
- Related doctors section ✓
- Related hospitals section ✓
- Procedure step cards ✓
- Markdown body with overview, conditions, procedures, technology, cost comparison table ✓
- FAQ accordion with 3 manual + auto-generated FAQs ✓
- Cost comparison table (styled) ✓
- JSON-LD: MedicalProcedure, MedicalWebPage, FAQPage, BreadcrumbList ✓
- WhatsApp CTA + lead form ✓

### Improvements Needed

#### 1.1 Add "Cost in Local Currency" to Cost Comparison Tables

**Search intent:** Transactional — patients want to know costs in their own currency
**Audience:** All segments

Currently, cost tables show USD and GBP. Add columns or a toggle for:
- BDT (Bangladeshi Taka) for Bangladesh patients
- AED/SAR for GCC patients
- NGN (Nigerian Naira) / KES (Kenyan Shilling) for African patients

**Implementation:**
```markdown
## Cost Comparison

| Country | Cost (Cardiac Procedures) |
|---------|--------------------------|
| India (Bangalore) | $1,500 – $7,000 (≈ ৳165,000 – ৳770,000) |
| Bangladesh (private) | $8,000 – $20,000 (≈ ৳880,000 – ৳2,200,000) |
| USA | $25,000 – $60,000 |
| UK | £15,000 – £40,000 |
| Singapore | $18,000 – $45,000 |
| Thailand | $12,000 – $30,000 |
```

**Files to update:** All 18 EN + 18 BN treatment markdown files, in the `## Cost Comparison` / `## খরচ তুলনা` section.

#### 1.2 Add "Who Is This Treatment For?" Section

**Search intent:** Informational — patients researching if the treatment is right for them
**Audience:** All segments

Add a section after the Overview that lists eligibility criteria and common symptoms.

**Implementation:**
```markdown
## Who Is This Treatment For?

This treatment is recommended for patients who:
- Have been diagnosed with {{condition}}
- Have tried conservative treatments without success
- Meet the health criteria for {{procedure}}
- Are medically fit for surgery/travel

**Common symptoms that prompt this treatment:**
- {{symptom1}}
- {{symptom2}}
- {{symptom3}}
```

**Files to update:** All 18 EN + 18 BN treatment markdown files, after the Overview section.

#### 1.3 Add "Recovery Timeline" Section

**Search intent:** Informational — patients planning time off work and travel duration
**Audience:** All segments

Add a visual timeline showing what to expect week by week.

**Implementation:**
```markdown
## Recovery Timeline

| Phase | Duration | What to Expect |
|-------|----------|----------------|
| Hospital stay | 5-7 days | Monitoring, pain management, initial mobilization |
| Bangalore recovery | 1-2 weeks | Follow-up appointments, physiotherapy, wound healing |
| Return home | Week 3-4 | Gradual return to daily activities |
| Full recovery | 6-12 weeks | Complete healing, resumption of normal activities |
```

**Files to update:** All 18 EN + 18 BN treatment markdown files, after the cost comparison section.

#### 1.4 Add "What's Included in the Cost" Section

**Search intent:** Transactional — patients want transparency about what they're paying for
**Audience:** All segments

**Implementation:**
```markdown
## What's Included in the Cost

**Included:**
- Surgeon and anesthesiologist fees
- Hospital room charges ({{duration}} days)
- Surgery/procedure costs
- Implants and medications (where applicable)
- Pre-operative diagnostics and tests
- Post-operative care during hospital stay
- Airport pickup and drop

**Not included:**
- International flights
- Accommodation outside hospital stay
- Post-discharge physiotherapy (if needed)
- Personal expenses and meals for attendants
```

**Files to update:** All 18 EN + 18 BN treatment markdown files, after the cost comparison section.

#### 1.5 Add "Patient Journey" Infographic Section

**Search intent:** Informational — patients want to understand the process
**Audience:** All segments

This already exists as StepCards in the template. Improve by adding a visual infographic image:
- `/images/treatments/patient-journey-infographic.jpg`
- Shows: Contact → Reports → Second Opinion → Visa → Travel → Treatment → Recovery → Follow-up

**Files to update:** Template `[slug].astro` (EN + BN) — add an `<img>` tag in the patient journey section.

#### 1.6 Add Treatment-Specific "Success Stories" Section

**Search intent:** Commercial — patients look for social proof from similar cases
**Audience:** All segments

Add a section that pulls testimonials tagged with the treatment category.

**Implementation:**
- Filter `getTestimonials()` by treatment category
- Render 2-3 testimonials with patient name, country, treatment, and outcome
- Link to the full stories page

**Files to update:** Template `[slug].astro` (EN + BN) — add a testimonials section after the hospital section.

#### 1.7 Add "Related Treatments" Cross-Linking Section

**Search intent:** Informational — patients often need multiple related treatments
**Audience:** All segments

Add a section at the bottom linking to 3-4 related treatments.

**Implementation:**
- Cardiology → link to Cardiac Surgery, Organ Transplant
- Cancer Treatment → link to Hematology & BMT, Stem Cell Treatment
- Orthopedics → link to Neuro & Spine Surgery, Pain Management

**Files to update:** Template `[slug].astro` (EN + BN) — add a related treatments grid before the CTA.

#### 1.8 Add "Download Treatment Guide" CTA

**Search intent:** Transactional — patients want a printable summary
**Audience:** All segments

Add a CTA button: "Download Free {{Treatment}} Guide" that generates a PDF with cost, timeline, hospitals, and doctors.

**Files to update:** Template `[slug].astro` (EN + BN) — add a download CTA in the sticky sidebar or after the cost section. Requires a PDF generation endpoint.

---

## 2. Country Pages (currently: Bangladesh, Saudi Arabia, UAE, Nigeria, Kenya)

### Current State
- Country-specific hero with flag imagery ✓
- Cost savings summary ✓
- Visa process overview ✓
- Flight and travel logistics ✓
- Language and cultural considerations ✓
- Country-specific testimonials ✓
- Country-specific WhatsApp message ✓
- JSON-LD schema ✓

### Improvements Needed

#### 2.1 Add "Visa Processing Time & Cost" Table

**Search intent:** Informational — patients need to know visa logistics before planning
**Audience:** All segments

**Implementation:**
```markdown
## Visa Information for {{Nationality}} Patients

| Visa Type | Cost | Processing Time | Validity | Entries |
|-----------|------|-----------------|----------|---------|
| e-Medical Visa | {{cost}} | {{processingTime}} | 60 days | Triple |
| Medical Attendant (MX) | {{cost}} | {{processingTime}} | 60 days | Triple |
| Emergency Medical | {{cost}} | 24-48 hours | 60 days | Triple |
```

**Files to update:** All country markdown files (EN + BN).

#### 2.2 Add "Cost Comparison in Local Currency" Table

**Search intent:** Transactional — patients want costs in their own currency
**Audience:** All segments

**Implementation:**
```markdown
## Treatment Costs: India vs {{Country}}

| Procedure | India (Bangalore) | {{Country}} (private) | Savings |
|-----------|-------------------|----------------------|---------|
| Heart Bypass | $4,500-$12,000 ({{localCurrency}}) | $25,000-$60,000 ({{localCurrency}}) | 70-80% |
| Knee Replacement | $3,000-$7,000 ({{localCurrency}}) | $15,000-$30,000 ({{localCurrency}}) | 60-75% |
| Cancer Treatment | $3,000-$15,000 ({{localCurrency}}) | $20,000-$100,000 ({{localCurrency}}) | 70-85% |
| IVF (per cycle) | $1,500-$4,000 ({{localCurrency}}) | $8,000-$15,000 ({{localCurrency}}) | 60-75% |
```

**Files to update:** All country markdown files (EN + BN).

#### 2.3 Add "Direct Flights" Information Table

**Search intent:** Informational — patients need to plan travel logistics
**Audience:** All segments

**Implementation:**
```markdown
## Flight Information

| From | To | Airline | Duration | Frequency |
|------|----|---------|----------|-----------|
| {{homeCity}} | Bangalore | {{airline}} | {{duration}} | {{frequency}} |
| {{homeCity}} | Mumbai | {{airline}} | {{duration}} | {{frequency}} |
| {{homeCity}} | Delhi | {{airline}} | {{duration}} | {{frequency}} |
```

**Files to update:** All country markdown files (EN + BN).

#### 2.4 Add "Cultural & Religious Considerations" Section

**Search intent:** Informational — patients want reassurance about cultural comfort
**Audience:** GCC, Bangladesh, Africa

**Implementation:**
```markdown
## Cultural & Religious Support

- **Halal food:** Available at all partner hospitals
- **Prayer rooms:** Available at all partner hospitals
- **Qibla direction:** Marked in patient rooms
- **Ramadan scheduling:** Treatment can be adjusted for fasting hours
- **Language support:** {{language}} interpreters available
- {{countrySpecificNote}}
```

**Files to update:** All country markdown files (EN + BN). Especially important for Saudi Arabia, UAE, and Bangladesh pages.

#### 2.5 Add "Vaccination Requirements" Section

**Search intent:** Informational — patients from Africa need to know vaccination rules
**Audience:** African patients

**Implementation:**
```markdown
## Vaccination Requirements

- **Yellow Fever:** Required for travelers from endemic countries. Bring your yellow card.
- **Oral Polio:** May be required depending on current Indian health regulations.
- **COVID-19:** Check current requirements before travel.
- **Recommended:** Hepatitis A and B, typhoid, tetanus.

Consult your local travel clinic 4-6 weeks before travel.
```

**Files to update:** Nigeria, Kenya, and other African country pages.

#### 2.6 Add Country-Specific FAQs (8 questions)

See the FAQ Content Strategy document for the full list of country-specific FAQs.

**Files to update:** All country markdown files (EN + BN).

#### 2.7 Add "Popular Treatments for {{Nationality}} Patients" Section

**Search intent:** Commercial — patients want to know what others from their country choose
**Audience:** All segments

**Implementation:**
- List 4-6 most popular treatments for that country
- Link to each treatment page
- Include cost range and typical duration

**Files to update:** All country markdown files (EN + BN).

---

## 3. Hospital Pages (5 hospitals × EN + BN)

### Current State
- Hospital hero with image ✓
- Accreditation badges ✓
- Specialties grid ✓
- Related doctors ✓
- Amenities list ✓
- Markdown body content ✓
- FAQ accordion ✓
- JSON-LD: Hospital, FAQPage, BreadcrumbList ✓

### Improvements Needed

#### 3.1 Add "International Patient Services" Section

**Search intent:** Informational — patients want to know what support is available
**Audience:** All segments

**Implementation:**
```markdown
## International Patient Services at {{Hospital}}

- **Visa assistance:** We provide the hospital invitation letter for your medical visa
- **Airport pickup:** Complimentary pickup from Bangalore airport
- **Language support:** English-speaking staff; interpreters for {{languages}}
- **Accommodation coordination:** Serviced apartments and hotels near the hospital
- **Dedicated coordinator:** A personal care coordinator throughout your stay
- **Telemedicine follow-up:** Post-discharge video consultations after you return home
- **Insurance coordination:** Assistance with insurance claims and documentation
```

**Files to update:** All hospital markdown files (EN + BN).

#### 3.2 Add "Treatment Costs at {{Hospital}}" Table

**Search intent:** Transactional — patients compare costs across hospitals
**Audience:** All segments

**Implementation:**
```markdown
## Treatment Costs at {{Hospital}}

| Procedure | Estimated Cost | Hospital Stay |
|-----------|---------------|---------------|
| Cardiac Bypass (CABG) | $4,500-$12,000 | 5-7 days |
| Knee Replacement | $3,500-$7,000 | 3-5 days |
| Cancer Chemotherapy (per cycle) | $500-$2,500 | 1-2 days |
| IVF (per cycle) | $1,500-$4,000 | Outpatient |
```

**Files to update:** All hospital markdown files (EN + BN).

#### 3.3 Add "Hospital Statistics" Section

**Search intent:** Commercial — patients look for volume and success metrics
**Audience:** All segments

**Implementation:**
```markdown
## {{Hospital}} at a Glance

| Metric | Value |
|--------|-------|
| Established | {{year}} |
| Accreditation | {{JCI/NABH}} |
| Beds | {{number}} |
| International patients/year | {{number}} |
| Specialties | {{count}} |
| Languages supported | {{list}} |
```

**Files to update:** All hospital markdown files (EN + BN).

#### 3.4 Add "Patient Reviews" Section

**Search intent:** Commercial — social proof is a top decision factor
**Audience:** All segments

**Implementation:**
- Add a `reviews` field to the hospital content schema
- Render 3-5 reviews with patient name, country, rating, and comment
- Include `AggregateRating` in the JSON-LD schema

**Files to update:** Hospital content schema (`config.ts`), all hospital markdown files, hospital template `[slug].astro` (EN + BN).

#### 3.5 Add "How to Reach {{Hospital}}" Section

**Search intent:** Informational — patients planning travel
**Audience:** All segments

**Implementation:**
```markdown
## How to Reach {{Hospital}}

- **From Bangalore Airport (BLR):** {{distance}} km, approximately {{time}} by car
- **Airport pickup:** Complimentary — our coordinator meets you at arrivals
- **Nearest metro:** {{station}}
- **Address:** {{address}}
```

**Files to update:** All hospital markdown files (EN + BN).

---

## 4. Doctor Pages (52 doctors × EN + BN)

### Current State
- Doctor hero with portrait ✓
- Specialty, qualifications, experience ✓
- Hospital affiliation ✓
- Languages spoken ✓
- Markdown body content ✓
- FAQ accordion (8 doctors have manual FAQs) ✓
- JSON-LD: Physician, FAQPage, BreadcrumbList ✓

### Improvements Needed

#### 4.1 Add "Procedures Performed" Section

**Search intent:** Commercial — patients want to know what the doctor can treat
**Audience:** All segments

**Implementation:**
```markdown
## Procedures Performed by {{Doctor}}

- {{procedure1}} — {{volume}} per year
- {{procedure2}} — {{volume}} per year
- {{procedure3}} — {{volume}} per year
```

**Files to update:** All doctor markdown files (EN + BN). Requires adding a `procedures` field to the doctor schema.

#### 4.2 Add "Success Rates & Outcomes" Section

**Search intent:** Commercial — patients look for outcome data
**Audience:** All segments

**Implementation:**
```markdown
## Outcomes & Success Rates

- {{procedure1}}: {{successRate}}% success rate ({{hospital}} data, {{year}})
- Overall patient satisfaction: {{rating}}/5
- Complication rate: {{rate}}% (below national average)
```

**Files to update:** All doctor markdown files (EN + BN). Only include data that is publicly available or provided by the hospital.

#### 4.3 Add "Patient Testimonials for {{Doctor}}" Section

**Search intent:** Commercial — social proof from patients treated by this doctor
**Audience:** All segments

**Implementation:**
- Filter testimonials by doctor name (if tagged)
- Render 2-3 testimonials with patient name, country, treatment, outcome
- Link to full stories page

**Files to update:** Doctor template `[slug].astro` (EN + BN). Requires tagging testimonials with doctor names in the testimonial content collection.

#### 4.4 Add "Book a Video Consultation" CTA

**Search intent:** Transactional — patients want to consult before traveling
**Audience:** All segments

**Implementation:**
- Add a "Book Video Consultation" button alongside the existing WhatsApp CTA
- Link to a consultation booking form or Calendly integration
- Price: Free first consultation (or nominal fee)

**Files to update:** Doctor template `[slug].astro` (EN + BN).

#### 4.5 Add Doctor FAQs to All 52 Doctors

Currently only 8 doctors have manual FAQs. Add the universal doctor FAQs (D1-D5 from the FAQ strategy doc) to all 52 doctors.

**Files to update:** All 52 EN + 52 BN doctor markdown files.

---

## 5. Cross-Page Improvements (All Page Types)

### 5.1 Add "Related Pages" Cross-Linking

**Search intent:** Informational — patients browse related content
**Audience:** All segments

Every page should link to 3-5 related pages:
- Treatment pages → related treatments, country pages, hospitals, doctors
- Country pages → treatment pages, visa page, travel page, testimonials
- Hospital pages → doctors at that hospital, treatments offered, country pages
- Doctor pages → hospital page, treatment page, related doctors

**Files to update:** All templates (`[slug].astro` files).

### 5.2 Add "Last Updated" Date to All Pages

**Search intent:** Trust signal — patients (and search engines) prefer current info
**Audience:** All segments

**Implementation:**
- Add `dateModified` to all content frontmatter
- Display "Last updated: {{date}}" near the top of each page
- Include in JSON-LD `dateModified` field

**Files to update:** All content markdown files, all templates.

### 5.3 Add Breadcrumb Schema to All Pages

Already implemented for treatment, doctor, and hospital pages. Verify it's also on:
- Country pages ✓
- Service pages (How It Works, Visa, Travel, etc.)
- Blog pages ✓
- Second Opinion page ✓

### 5.4 Add "Table of Contents" to Long Pages

**Search intent:** User experience — patients scan long pages
**Audience:** All segments

**Implementation:**
- Auto-generate a sticky table of contents from H2 headings
- Highlight the current section as the user scrolls
- Place in the sidebar on desktop, collapsible on mobile

**Files to update:** Treatment and hospital templates (longest pages).

### 5.5 Add "Share This Page" Buttons

**Search intent:** Social signals — sharing generates backlinks
**Audience:** All segments

**Implementation:**
- Add WhatsApp, Facebook, Twitter/X, and copy-link buttons
- Place at the bottom of each page
- Include Open Graph meta tags (already present ✓)

**Files to update:** All templates.

### 5.6 Add "Print This Page" / "Save as PDF" Button

**Search intent:** Transactional — patients want to share with family
**Audience:** All segments

**Implementation:**
- Add a print button that triggers `window.print()` with print-optimized CSS
- Or generate a PDF version of the page

**Files to update:** All templates. Add print CSS to `global.css`.

---

## Implementation Priority Matrix

| Priority | Improvement | Page Type | Impact | Effort |
|----------|------------|-----------|--------|--------|
| **P0** | Cost in local currency tables | Treatment + Country | High | Low |
| **P0** | Universal FAQs (T1-T8) | Treatment | High | Medium |
| **P0** | Country-specific FAQs (CO1-CO8) | Country | High | Medium |
| **P0** | "What's Included in Cost" section | Treatment | High | Low |
| **P1** | Recovery timeline section | Treatment | Medium | Low |
| **P1** | International patient services section | Hospital | Medium | Low |
| **P1** | Hospital statistics section | Hospital | Medium | Low |
| **P1** | Doctor FAQs for all 52 doctors | Doctor | Medium | Medium |
| **P1** | Visa processing time & cost table | Country | High | Low |
| **P1** | Flight information table | Country | Medium | Low |
| **P2** | "Who Is This Treatment For?" section | Treatment | Medium | Low |
| **P2** | Cultural & religious considerations | Country | Medium | Low |
| **P2** | Vaccination requirements | Country (Africa) | Medium | Low |
| **P2** | Treatment costs at hospital table | Hospital | Medium | Low |
| **P2** | Related treatments cross-linking | Treatment | Medium | Medium |
| **P2** | "Popular Treatments for {{Nationality}}" | Country | Medium | Low |
| **P3** | Patient testimonials on treatment pages | Treatment | Medium | Medium |
| **P3** | Doctor testimonials | Doctor | Medium | High |
| **P3** | Patient reviews on hospital pages | Hospital | Medium | High |
| **P3** | "How to Reach" hospital section | Hospital | Low | Low |
| **P3** | Video consultation CTA | Doctor | Medium | High |
| **P3** | Table of contents on long pages | All | Low | Medium |
| **P3** | Share buttons | All | Low | Low |
| **P3** | Print/PDF button | All | Low | Medium |
| **P3** | "Last Updated" date | All | Low | Low |

---

## Audience Segment Quick Reference

### Bangladesh Patients — Top 5 Improvements
1. Cost in BDT on treatment and country pages
2. Bengali-speaking doctors section on country page
3. Visa processing status FAQ on country page
4. Attendant visa rules (up to 3 for Bangladesh)
5. Halal food and cultural familiarity notes

### GCC / Middle East Patients — Top 5 Improvements
1. Cost in AED/SAR on treatment and country pages
2. Arabic-speaking staff and interpreter availability
3. Halal food, prayer rooms, Qibla direction on hospital pages
4. Ramadan-friendly scheduling note
5. E-visa free for Saudi citizens (prominent callout)

### African Patients — Top 5 Improvements
1. Cost in NGN/KES on treatment and country pages
2. Yellow fever and polio vaccination requirements
3. e-Medical visa cost ($25) and processing time (72 hours)
4. Direct flight information (Lagos/Nairobi → India)
5. Hospital invitation letter process for visa

### Universal — Top 5 Improvements
1. "What's Included in the Cost" section on treatment pages
2. Recovery timeline on treatment pages
3. Universal FAQs on all page types
4. Related pages cross-linking
5. "Last Updated" date for trust signals
