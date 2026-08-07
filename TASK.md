# Khan Meditour — Phase 0 Implementation Tasks

> Company: Khan Meditour
> WhatsApp: +8801611892986
> Email: khan@meditour.com

## Foundation Scaffold (initial pass complete — pending visual retune)

- [x] Step 1: Scaffold the Astro project in `frontend/` — `astro.config.mjs`, `tsconfig.json`, aliases
- [x] Step 2: Design tokens + Tailwind preset — `tokens.css`, `tailwind.preset.ts` (⚠ palette/type need retune, see Step 12)
- [x] Step 3: Base / global styles + helper classes — `styles/base.css`, `styles/global.css`
- [x] Step 4: Atomic components (CVA) — 17 atoms in `design-system/components/atoms/`
- [x] Step 5: Molecules & organisms — `FormField`, `SearchBar`, `Navbar`, `Footer`, `StepTimeline`, `LeadForm`, etc.
- [x] Step 6: GSAP motion system — `motion/presets.ts`, `motion/use-animations.ts`
- [x] Step 7: CRM + WhatsApp plumbing — `lib/crm.ts`, `lib/whatsapp.ts`, `pages/api/lead.ts`, `.env.example`
- [x] Step 8: i18n wiring — `i18n/en.json`, `i18n/bn.json`, `lib/i18n.ts`, `/bn/` route
- [ ] Step 9: Storybook — only `Button.stories.tsx` exists; stories needed for all atoms/molecules/organisms
- [~] Step 10: Quality gates & CI — `.eslintrc.cjs`, `.prettierrc`, `vitest.config.ts`, `playwright.config.ts`, `ci.yml` present; a11y/Lighthouse budgets + DS-import lint rule pending
- [x] Step 11: Home page — restyled to new visual language (`HeroSection`, `StatementSection`, `FloatingConsultCTA`, `TestimonialCarousel`, cream/ink tokens)

## Step 12: Visual Design Language Alignment — COMPLETE

- [x] Retune tokens (live `main.css` + authoritative `tokens.css`): warm cream surfaces, `--color-ink`, single `--gradient-accent` (violet→indigo); teal/gold demoted, status colors now functional-only
- [x] Add display font (`General Sans`, Fontshare) + extend scale (`--text-7xl`/`--text-8xl`, `--tracking-display`, `--font-weight-*`)
- [x] Add `--radius-card` (1.25rem) and `--radius-pill`; expose all new tokens in `tailwind.preset.ts`
- [x] `Button`: pill radius, monochrome variants + new `gradient` (Book Now); violet focus ring
- [x] Wire General Sans in `Layout.astro` (Fontshare CDN) + Bangla heading override
- [x] Build organisms: `HeroSection`, `StatementSection`, `RevealImageCard`, `EquipmentCarousel`, `TestimonialCarousel` (Emotional image grid), `FloatingConsultCTA`
- [x] Restyle `Navbar` → floating rounded pill, sticky, condense-on-scroll
- [x] Restyle `Footer` → black bg + giant wordmark
- [x] Migrate existing organisms (StepTimeline, TreatmentCard, StatCounter) off teal `primary-*`/gold `secondary-*` utilities to monochrome/ink tokens

## Step 13: Doctors Page — COMPLETE

- [x] `DoctorCard` (avatar/initial, specialty badge, name, qualification, experience, appointment CTA)
- [x] `FilterChips` row (All + dynamic specialties) — controlled, active state ink pill
- [x] `/doctors` + `/bn/doctors` routes, responsive 3-col grid, EN + BN translations
- [x] `FilterChips` scroll arrows for mobile overflow (ResizeObserver + smooth scroll)
- [x] `DoctorCard` gradient "Book Now" button + circular arrow badge

## Doctor Trust Cards Redesign (2026-08-07) — COMPLETE

- [x] Doctor photos structured as `public/images/doctors/<slug>.webp` (flat, filename = markdown slug); 13 Manipal doctor photos added
- [x] `avatar:` frontmatter wired into 26 doctor markdown files (13 en + 13 bn)
- [x] `DoctorCard` redesigned to horizontal split: full-height portrait left (`object-cover object-top`), specialty/name/qualification/hospital/experience right, "Book Now" gradient + WhatsApp outline CTAs
- [x] Card is no longer one full-surface link (invalid nesting with dual CTAs): portrait, name and Book Now link to profile; WhatsApp opens wa.me in new tab
- [x] `Doctor.whatsappHref` added; all 8 page mappings (doctors, index, hospitals/[slug], treatments/[slug] × en/bn) pass `getDoctorInquiryLink(name)`; `whatsappLabel` localized via `t.doctors.detail.whatsappCta`
- [x] Grids rebalanced for wider cards: listing + hospital pages `lg:grid-cols-2`, home featured `lg:grid-cols-2`
- [x] Doctor detail hero (en + bn): 96px circle → `aspect-[4/5]` portrait (w-36/md:w-44, rounded-card, shadow) with matching initials fallback
- [x] Stories + 8 unit tests updated; full build green

### Discovered During Work

- 8 doctors still lack photos (ananya-sen, arun-kumar, kavita-iyer, priya-nair, rajesh-sharma, sameer-khan, sunita-rao, vikram-patel) — they render the initials fallback panel. **TODO:** add `/images/doctors/<slug>.webp` + `avatar:` frontmatter when photos are available.
- Optional idea (not implemented): auto-resolve `/images/doctors/<slug>.webp` in `lib/content.ts` when frontmatter `avatar` is absent.

## Discovered During Work

- ~~**CSS single-source-of-truth debt:**~~ **RESOLVED** — `main.css` now uses `@import` for the three partials (`tokens.css`, `base.css`, `global.css`) via `postcss-import`. Inline duplication removed. Imports placed before `@tailwind` directives (CSS spec requirement).
- Typeface: proceeding with **General Sans** (Fontshare) as closest free match to Aeonik/Söhne.
- Decision: **fully monochrome + gradient-only**. Teal/gold primitives stay defined but removed from brand usage.
- ~~Editor lint: JSX `IntrinsicElements` errors~~ **FIXED** — added `include` array to `tsconfig.json` and `src/env.d.ts` React type references so the TS language server resolves React JSX types for `.tsx` files. `@tailwind` unknown-at-rule warnings in `main.css` are VS Code CSS plugin noise — non-breaking.
- **Testimonial grid refactor:** created `TestimonialCard` molecule with image/video media slot, emotional warm styling, and attribution brand label. Refactored `TestimonialCarousel` into a responsive multi-card carousel (1/2/3 visible). Removed redundant `TestimonialSlider`.

## Phase 1 — Core Pages

- [x] Step 1: Content collections (`doctors`, `hospitals`, `treatments`) with Zod schemas and real seed data
- [x] Step 2: Update `steps.items` i18n copy + add `duration` support to `StepTimeline`
- [x] Step 3: `/treatments` + `/treatments/[slug]` + BN equivalents
- [x] Step 4: `/doctors/[slug]` detail; migrate `/doctors` grid to content collections
- [x] Step 5: `/hospitals` + `/hospitals/[slug]` + BN equivalents with `HospitalCard`
- [x] Step 6: `/how-it-works` dedicated page while keeping Home condensed section
- [x] Step 7: Home integration: real treatments collection, doctor/hospital teasers, consistent nav/footer
- [x] Step 8: SEO titles/descriptions + hreflang alternates on new pages
- [x] Step 9: Storybook story for `HospitalCard`; unit tests for new components/helpers

## Discovered During Work

- `doctors.astro` placeholder array uses Bangladesh-flavored hospital names — replacing with real Indian hospitals/doctors in content collections.
- Decision: keep content in one collection per entity and add a `locale` field for EN/BN entries; this matches the current static-site model and is easy to migrate to a CMS later.
- **Duplicate slug fix:** reorganised content into locale subfolders (e.g., `src/content/doctors/en/...` and `.../bn/...`), removed explicit `slug` fields from Zod schemas, and derive URLs with `entrySlug()` from `src/lib/slug.ts`.
- **Clean URLs:** `entrySlug()` strips the file extension (`.md`/`.mdx`) so published URLs never show `.md`.
- **Underline cleanup:** removed default underlines from `Link` component and global anchor styles; buttons, cards, nav CTAs now render cleanly.

## Phase 2 — Conversion (current)

- [ ] Step 1: Extend `lib/crm.ts` lead schema with `doctorSlug`, `hospitalSlug`, `estimatedTotal`, `hasReports`, `reportsSharedVia`, `preferredContactMethod`, and per-entry-point `source` values
- [ ] Step 2: Extend `lib/whatsapp.ts` with contextual message builders (`getDoctorInquiryLink`, `getTreatmentInquiryLink`, `getEstimateInquiryLink`)
- [ ] Step 3: Wire `CostEstimator` to real treatment pricing + new accommodation tiers config; add disclaimer and WhatsApp-first CTA
- [ ] Step 4: Extend `LeadForm` with pre-fill props, `country`, `preferredContactMethod`, "no reports yet" toggle + symptoms textarea, and report-sharing success instructions
- [ ] Step 5: Wire contextual CTAs across doctor, treatment, and home pages
- [ ] Step 6: Add/update unit tests and Storybook stories; run lint/test/build and manual funnel QA

## Discovered During Work (Phase 2)

- Open question resolutions from `PHASE_2_BUILD_ORDER.md`:
  - **Cost Estimator CTA target:** WhatsApp-first deep link pre-filled with treatment + estimate; LeadForm remains as secondary route via `/contact#contact`.
  - **Accommodation cost data:** using clearly-labeled placeholder per-night tiers in `src/content/accommodations.ts` until real estimates are provided.
  - **CRM payload shape:** extended schema is sent as-is; CRM owner should confirm field acceptance outside this repo.
- No in-app file upload this phase; report intake v1 is WhatsApp/email handoff only.
- **Bug fix (2025-07-19):** `LeadForm` submission silently failed — the hidden `estimatedTotal` input submits `""` when unset, and `leadSchema.estimatedTotal` (`z.number().optional()`) rejected the empty string, blocking `handleSubmit` with no visible error. Fixed via `z.preprocess` in `lib/crm.ts` to coerce `''`/`null` → `undefined` before the number check. Also fixed two stale assertions in `CostEstimator.test.tsx`.
- **WhatsApp CTA contextualization (2025-07-19):** `WhatsAppCTA` and `FloatingConsultCTA` now accept an optional `context: WhatsAppContext` prop (new type in `lib/whatsapp.ts`, dispatched via `getContextualWhatsAppLink`) so they can build a contextual message (`general`/`doctor`/`treatment`/`estimate`) instead of a static generic string. Backward compatible; unit tests added (`whatsapp.test.ts`, `WhatsAppCTA.test.tsx`, `FloatingConsultCTA.test.tsx`).
- **Deferred task (see `PHASE_2_BUILD_ORDER.md` 2.4):** retrofit doctor/treatment detail pages to render their WhatsApp CTA via the shared `WhatsAppCTA` component instead of a raw `<a>` — deliberately not done yet since it changes the current black-outline button to `WhatsAppCTA`'s solid-green style; needs a design decision (accept new look, or add an outline variant first).

## Phase 3 — Content & Scale (in review)

- [x] Step 1: Testimonials content migration — `src/content/testimonials/` collection, migrated existing home-page data into EN + BN JSON files, updated `src/components/HomePage.astro` and both `pages/index.astro`/`pages/bn/index.astro` to fetch and pass testimonials.
- [x] Step 2: Blog content model + routes — `src/content/config.ts` `blog` collection, seeded 4 bilingual posts, built `BlogCard`, `BlogFilterList`, and `BlogPostLayout` organisms with Storybook stories, added `/blog`, `/blog/[slug]`, `/bn/blog`, `/bn/blog/[slug]` routes.
- [x] Step 3: i18n audit & reconciliation — `blog` namespace added to `en.json` and `bn.json` with full parity; blog nav added to homepage navLinks.
- [x] Step 4: SEO / schema.org structured data — `src/lib/schema.ts` helpers for `MedicalBusiness`, `Physician`, `Hospital`, `MedicalProcedure`, `BlogPosting`, `BreadcrumbList`; injected on home, doctor, hospital, treatment, and blog detail pages; `Layout.astro` now emits Open Graph / Twitter Card meta, canonical links, hreflang alternates, and a default `MedicalBusiness` JSON-LD fallback.
- [x] Step 5: Performance / build pass — `robots.txt` created, `site` URL added to `astro.config.mjs`. Static routes all generated successfully. The final cleanup step occasionally hits a Windows `EBUSY: resource busy or locked` error while unlinking temporary `.mjs` chunks; this is a local file-lock issue and does not occur on Linux/CI. A fallback `scripts/generate-sitemap.mjs` was added to guarantee sitemap creation: `npm run build && npm run sitemap:manual`. Verified `dist/sitemap-0.xml` contains 72 URLs covering every page and dynamic slug.
- [x] Step 6: Payload CMS hosting proposal — written in `frontend/PAYLOAD_CMS_HOSTING_PROPOSAL.md` with architecture, hosting options, migration path, and open questions.

### Discovered During Work (Phase 3)

- **Open questions resolved:** all blog posts launch bilingually; business is a facilitator with no public physical address (so `MedicalBusiness` schema intentionally omits `address`); blog authorship is the single "Khan Meditour Team" byline.
- **Blog detail rendering:** the first `.astro` wrapper for `BlogPostLayout` failed because it imported a named React export as a default export. Replaced the wrapper with a native Astro layout that accepts a `<slot />` for the Markdown body; the React version remains for Storybook.
- **Image optimization note:** blog covers currently use plain `<img>` with Unsplash URLs. A future pass can swap these for `astro:assets` `<Image />` once dimensions or `inferSize` remote config is confirmed.
- **Build / sitemap verification:** completed. `npm run build` generates all static routes; the occasional Windows `EBUSY` cleanup error is bypassed with `npm run sitemap:manual`, which produced `dist/sitemap-0.xml` with 72 URLs covering every route.
- **Color clean-up / button standardization:** removed remaining teal `primary-*`/gold `secondary-*` usage from `Stat`, `Link`, `CostEstimator`, `TrustBadges`, `LanguageSwitcher`, `FAQAccordion`, `Tag`, `Radio`, `Checkbox`, `FileUpload`, `Input`, `IconButton`, and `Badge`; converted non-doctor CTA buttons (Hero, FloatingConsultCTA, HowItWorks, treatment detail, HospitalCard, BlogPostLayout) to solid `bg-ink`/`text-white`; preserved the violet→indigo gradient only for the doctor-booking CTAs; fixed global anchor hover overriding white button text by adding explicit `hover:text-white` on solid CTAs and on the `Button` primary variant.

## GSAP Motion System Refactor — COMPLETE (2026-07-21)

- [x] Centralized GSAP engine in `frontend/src/design-system/motion/engine.ts` with declarative `data-anim` attribute support.
- [x] Refactored `motion/presets.ts` to pure animation definitions (no ScrollTrigger duplication).
- [x] Wired React components via `useAnimations` hook; created Astro client initializer in `motion/astro.ts` and invoked it in `Layout.astro`.
- [x] Added hero headline word reveal, fade-in-up, hero parallax, and navbar scroll-direction hide/show.
- [x] Added card hover lift (`card-hover`), 3D tilt (`tilt-card`), magnetic buttons, press-button effects, and staggered card/children reveals.
- [x] Added StatCounter `counter-up` and FAQ accordion height/opacity animations.
- [x] Removed duplicated inline GSAP script from `HomePage.astro`; wired `data-anim` attributes across sections.
- [x] Lint, tests, and build pass (`npm run lint`, `npm test`, `npm run build`).

## Vercel Deployment Setup — COMPLETE

- [x] Installed `@astrojs/vercel@7` and switched `astro.config.mjs` to `output: 'hybrid'` with `@astrojs/vercel/serverless` adapter.
- [x] Marked `src/pages/api/lead.ts` as `prerender = false` so the lead API route runs server-side.
- [x] Replaced `@astrojs/sitemap` integration with the existing `scripts/generate-sitemap.mjs` via a `postbuild` npm hook (avoids adapter/sitemap conflict).
- [x] Added `vercel.json` (framework: astro, sitemap rewrite) and `.vercelignore`.
- [x] Added `.github/workflows/deploy.yml` for automated Vercel deployments (requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets).
- [x] Created `scripts/patch-vercel-runtime.mjs` to patch `nodejs18.x` → `nodejs20.x` in postbuild (Vercel CLI 56.x rejects nodejs18.x).
- [x] Fixed `scripts/generate-sitemap.mjs` to detect both local `dist/` and Vercel `.vercel/output/static/` output directories.
- [x] Authenticated with Vercel CLI and deployed to production: https://meditour-zeta.vercel.app
- [ ] Add environment variables in Vercel project settings: `CRM_API_URL`, `CRM_API_KEY`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_CONTACT_EMAIL`.
- [ ] Connect GitHub repo for auto-deploy on push.

## Breadcrumb UI + Scroll Animations on Detail Pages — COMPLETE (2026-07-25)

- [x] Created `Breadcrumb.astro` component (accessible `nav[aria-label="Breadcrumb"]`, chevron separators, `aria-current="page"` on last item).
- [x] Replaced "back link" on all detail pages with visible `Breadcrumb` UI:
  - `src/pages/treatments/[slug].astro` (EN)
  - `src/pages/bn/treatments/[slug].astro` (BN)
  - `src/pages/hospitals/[slug].astro` (EN)
  - `src/pages/bn/hospitals/[slug].astro` (BN)
  - `src/pages/doctors/[slug].astro` (EN)
  - `src/pages/bn/doctors/[slug].astro` (BN)
  - `src/design-system/components/organisms/BlogPostLayout.astro` (EN + BN blog via `breadcrumbItems` prop)
- [x] Fixed import syntax: changed `import { Breadcrumb }` → `import Breadcrumb` (Astro components are default exports) across all 7 files.
- [x] Fixed corrupted `stagger-children` selector in `engine.ts` line 91 (`[data-animagger-children"]` → `[data-anim~="stagger-children"]`).
- [x] Added `data-anim` attributes to all detail pages for scroll-triggered reveal animations:
  - `data-anim="fade-in-up"` — breadcrumbs, description sections, CTAs, sidebars, related sections
  - `data-anim="headline-reveal"` — all `<h1>` headings (word-split stagger)
  - `data-anim="stagger-children"` — header areas, `<dl>` info lists, CTA sections (children stagger in sequence)
  - `data-anim="stagger-cards"` — procedure lists, hospital/doctor card grids, gallery images
  - `data-anim="scroll-reveal"` — markdown content sections, cover images
  - `data-anim="press-button"` — all CTA buttons (WhatsApp, book appointment, inquiry)
- [x] Fixed hospital page layout bug: `data-anim="stagger-children"` wrapper was replacing the left column `<div>`, pushing About/Specialities/Content/Amenities sections outside the grid. Added nested wrapper `<div data-anim="stagger-children">` inside the original left column `<div>` on both EN and BN hospital pages.

## SEO/AEO/GEO — Hybrid FAQ System Phase 1: Schema & Infrastructure (2026-08-02)

- [x] Step 1.1: Added optional `faqs` field to `doctors`, `hospitals`, `treatments` Zod schemas in `src/content/config.ts` for manual overrides. Added `toPrice` field to `treatments` schema.
- [x] Step 1.2: Added `faqPage()` JSON-LD schema helper in `src/lib/schema.ts` — builds `FAQPage` with `Question`/`Answer` entities.
- [x] Step 1.3: Enriched `Physician` schema in `src/lib/schema.ts` with GEO fields: `knowsAbout`, `alumniOf`, `award`, `qualification`, `yearsExperience` (as `hasCredential`), `languages` (as `knowsLanguage`).
- [x] Step 1.4: Added `medicalCondition()` schema helper in `src/lib/schema.ts` — builds `MedicalCondition` with `name`, `description`, `possibleTreatment`.
- [x] Step 1.5: Created `src/lib/faq-generator.ts` with `FAQItem` interface, `mergeFaqs()` function, and `generateTreatmentFaqs()`, `generateDoctorFaqs()`, `generateHospitalFaqs()` functions. Added bilingual FAQ template strings to `src/i18n/en.json` and `src/i18n/bn.json` with `faq.templates` namespace and `faqTitle` keys.
- [x] Step 1.6: Added realistic `toPrice` values to all 24 treatment content files (12 EN + 12 BN) based on Bangalore medical tourism price ranges.
- [x] Step 1.7: Verified `FAQAccordion` component readiness — accepts `items: { question: string; answer: string }[]`, already in use on homepage, compatible with `faq-generator.ts` output.
- [x] Build verification: `npm run build` passes with exit code 0, all 68 pages generated successfully with no schema validation errors.

## SEO/AEO/GEO — Hybrid FAQ System Phase 2: Page Template Integration (2026-08-02)

- [x] Step 2.1: EN treatment detail page (`treatments/[slug].astro`) — imports `FAQAccordion`, `faqPage`, `generateTreatmentFaqs`, `mergeFaqs`; generates FAQs from treatment data + related doctor/hospital names; merges with manual `faqs` if present; renders `FAQAccordion` with `client:visible`; injects `faqPage` JSON-LD into `jsonLd` array.
- [x] Step 2.2: BN treatment detail page (`bn/treatments/[slug].astro`) — same as EN, using `'bn'` locale for Bengali FAQ templates.
- [x] Step 2.3: EN doctor detail page (`doctors/[slug].astro`) — imports `FAQAccordion`, `faqPage`, `generateDoctorFaqs`, `mergeFaqs`; enriches `physician()` schema with `qualification`, `yearsExperience`, `languages`; generates FAQs from doctor data + hospital name; renders `FAQAccordion`; injects `faqPage` JSON-LD.
- [x] Step 2.4: BN doctor detail page (`bn/doctors/[slug].astro`) — added full JSON-LD (physician + breadcrumbs + faqPage) that was previously missing entirely; enriched `physician()` with GEO fields; renders `FAQAccordion`.
- [x] Step 2.5: EN hospital detail page (`hospitals/[slug].astro`) — imports `FAQAccordion`, `faqPage`, `generateHospitalFaqs`, `mergeFaqs`; generates FAQs from hospital data; renders `FAQAccordion`; injects `faqPage` JSON-LD.
- [x] Step 2.6: BN hospital detail page (`bn/hospitals/[slug].astro`) — same as EN, using `'bn'` locale for Bengali FAQ templates.
- [x] Build verification: `npm run build` passes with exit code 0, all 68 pages generated successfully.

## SEO/AEO/GEO — Hybrid FAQ System Phase 3: Manual FAQ Overrides (2026-08-03)

- [x] Step 3.1: Added 3 manual FAQs to all 12 EN treatment files + all 12 BN treatment files (24 files total). FAQs are entity-specific, covering topics like eligibility criteria, procedure-specific technology, recovery timelines, and cost factors that cannot be auto-generated from frontmatter.
- [x] Step 3.2: Added 2 manual FAQs to 8 selected doctor profiles (EN + BN = 16 files). Doctors chosen based on content richness: Dr. Ajit Kumar Roy (neurology), Dr. S Vidyadhara (spine surgery), Dr. Deepak Dubey (uro-oncology), Dr. Shabber Zaveri (surgical oncology), Dr. Sunil G Kini (orthopaedics), Dr. Vishwanath S (nephrology), Dr. Amit Rauthan (medical oncology), Dr. Sumit Talwar (bariatric surgery). FAQs cover specialty expertise, surgical techniques, languages, and unique qualifications.
- [x] Step 3.3: Added 3 manual FAQs to all 5 EN hospital files + all 5 BN hospital files (10 files total). FAQs cover accreditation status, international patient services, speciality strengths, and transplant programmes.
- [x] Step 3.4: Build verification — `npm run build` passes with exit code 0, all pages generated successfully with no schema validation errors. Sitemap generated with 72 URLs.

## SEO/AEO/GEO — Phase 4: GEO Enhancements (2026-08-02)

- [x] Step 4.1: Added summary/TL;DR blocks to all 12 EN + 12 BN treatment files (24 files). Concise 2-3 sentence summaries after the `## Overview` / `## পরিচিতি` heading for AI engine extraction.
- [x] Step 4.2: Added cost comparison tables to all 12 EN + 12 BN treatment files (24 files). Tables compare Bangalore costs with USA, UK, Singapore, Thailand, and Turkey where applicable.
- [x] Step 4.3: Added `medicalWebPage()` schema helper in `src/lib/schema.ts` with `name`, `url`, `description`, `image`, `dateModified`, `about`, `mainEntity`, `audience` (as `MedicalAudience`), `inLanguage`, and `specialty` fields. Injected on both EN and BN treatment detail pages with `about` referencing the `MedicalProcedure` schema. Added 2 unit tests (expected use + optional field omission) — all 10 schema tests pass.
- [x] Step 4.4: Updated `scripts/generate-sitemap.mjs` to collect file `mtime` via `stat()` and emit `<lastmod>YYYY-MM-DD</lastmod>` in each `<url>` entry. Fixed `sort()` and `filter()` to work with object entries instead of plain strings.

## SEO/AEO/GEO — Phase 5: Testing & Verification (2026-08-02)

- [x] Step 5.1: Full test suite passes — 14 test files, 74 tests, 0 failures. Includes `medicalWebPage()` tests, `faqPage()` tests, `medicalCondition()` tests, enriched `physician()` tests, `generateTreatmentFaqs()` / `generateDoctorFaqs()` / `generateHospitalFaqs()` tests, and `mergeFaqs()` tests.
- [x] Step 5.2: Build verification — `npm run build` passes with exit code 0. 88 pages generated (72 → 88, BN doctors expanded to 17). `MedicalWebPage` JSON-LD confirmed in both EN and BN treatment detail pages. `FAQPage` JSON-LD confirmed in treatment, doctor, and hospital detail pages. Sitemap generated with 88 URLs and `<lastmod>` dates.
- [x] Step 5.3: SEO validation — sitemap `<lastmod>` confirmed present. JSON-LD structured data verified in built HTML for all entity types. (Lighthouse audit and Google Rich Results Test are manual steps for the user to run against the deployed site.)
