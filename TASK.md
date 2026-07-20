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

## Vercel Deployment Setup — IN PROGRESS

- [x] Installed `@astrojs/vercel@7` and switched `astro.config.mjs` to `output: 'hybrid'` with `@astrojs/vercel/serverless` adapter.
- [x] Marked `src/pages/api/lead.ts` as `prerender = false` so the lead API route runs server-side.
- [x] Replaced `@astrojs/sitemap` integration with the existing `scripts/generate-sitemap.mjs` via a `postbuild` npm hook (avoids adapter/sitemap conflict).
- [x] Added `vercel.json` (framework: astro, Node 18 runtime, sitemap rewrite) and `.vercelignore`.
- [x] Added `.github/workflows/deploy.yml` for automated Vercel deployments (requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets).
- [ ] Run `vercel login` and `vercel` from `frontend/` to authenticate and deploy manually, or import the repo in the Vercel dashboard.
- [ ] Add environment variables in Vercel project settings: `CRM_API_URL`, `CRM_API_KEY`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_CONTACT_EMAIL`.
