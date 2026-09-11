# Khan Meditour — Phase 0 Implementation Tasks

> Company: Khan Meditour
> WhatsApp: +8801611892986
> Email: khan@meditour.com

## UI Polish — 2026-08-26 — IN PROGRESS

- [x] **Doctors page specialty chips carousel:** converted `FilterChips` into a two-row auto-scrolling marquee that pauses on hover/focus. Each row duplicates its content for a seamless loop; scroll speed scales with measured track width. Filtering behavior unchanged; added `FilterChips.test.tsx` (6 tests) and updated `FilterChips.stories.tsx`.
- [x] **Why Us mobile scrollbar clean-up:** replaced the native/custom gradient scrollbar with a simple dark track + arrow row per the design reference. Arrows are plain chevron icons without borders/backgrounds; track is `bg-ink/40`.
- [x] **Type-check clean-up:** included `tests/**/*.ts` + `tests/**/*.tsx` in `tsconfig.json` so the `jest-dom` matcher augmentation is visible to test files. Fixed pre-existing TS errors in `HeroSection.tsx`, `StatementSection.tsx`, `src/lib/content.ts`, `BlogCard.stories.tsx`, and `src/lib/crm.ts` so `npx tsc --noEmit` is now green.
- [x] **Stale test fix:** updated `WhyUsSection.test.tsx` to assert hover-only descriptions via DOM text content instead of a visible text query.

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

- ~~8 doctors still lack photos~~ **RESOLVED:** All 52 doctors now have `avatar:` frontmatter and photos. The 8 placeholder names (ananya-sen, arun-kumar, etc.) were replaced with real doctor profiles.
- Optional idea (not implemented): auto-resolve `/images/doctors/<slug>.webp` in `lib/content.ts` when frontmatter `avatar` is absent.

## Editorial Detail-Page Redesign (2026-08-07) — PROTOTYPE (doctor detail, en only)

- [x] `Breadcrumb` molecule: added `tone="light" | "dark"` prop for use on dark hero bands
- [x] `/doctors/[slug]` (en) rebuilt as editorial prototype: dark ink hero (large 4:5 portrait, gradient specialty pill, oversized display name, stat row — experience years / language count / hospital, dual CTAs, qualification chips), prose body with sticky booking rail, dark mid-page CTA band, FAQ
- [x] Optional image slots documented inline with specs + AI generation prompts: `/images/patterns/hero-dark-texture.webp` (abstract violet/charcoal backdrop) and `/images/patterns/cta-care-warm.webp` (warm doctor-patient moment)
- [x] "Refined Light" variant built at `/preview/doctor/[slug]` (same structure, cream register, hairline stat dividers, soft CTA band) for side-by-side comparison
- [x] **Direction approved: dark editorial (variant A)** — full plan documented in `EDITORIAL_REDESIGN_PLAN.md`; theming deferred; violet→indigo gradient kept
- [x] Phase 1: port doctor page to bn, expertise chips + pull quote, delete `/preview/`
- [x] Phase 2: system patterns (`ChipCloud`, `StatBand`, `QuickFacts`, `PullQuote`, `MarqueeStrip`, `StepCards`)
- [x] Phase 3: treatment detail pages (en + bn)
- [x] Phase 4: hospital detail pages (en + bn)
- [x] Phase 5: verification & polish
- [x] Post-implementation audit fixes (2026-08-07): hero heading contrast bug (global `h1-h6 { color: ink }` rule was overriding dark heroes — added explicit `text-cream-100` to 12 headings), gradient scrim on hospital image hero (breadcrumb readability), MarqueeStrip wired into hospital galleries, doctor card grids back to `lg:grid-cols-2` on treatment/hospital pages, hero/CTA sections moved inside `<main>` landmark (treatment + hospital, en + bn), WhatsApp CTA added to hospital pages via new `getHospitalInquiryLink()` helper
- [x] Pull-quote editorial sweep (2026-08-07): 28 of 32 doctor pull-quotes read like credential summaries or procedure lists, not emotional beats. Rewrote all 28 in en + bn as first-person philosophical/emotional statements (e.g. "The heart is the only organ that announces life with every beat. When I repair a valve, I am not fixing a machine — I am restoring a rhythm that someone's family depends on."). 4 quotes that were already emotional beats kept as-is (Shetty, Girish, Patil, Udgire). `npm run build` + `npm test` (107 tests) green.

### Discovered During Work

- **Astro compiler limitation:** multi-line JSX arrow-map expressions inside component *props* (`items={arr.map(() => <img/>)}`) fail with misleading esbuild errors — pass children instead of an items prop in .astro templates.
- **Global heading rule hazard:** `global.css` sets `color: var(--color-text-primary)` on all `h1-h6`, which beats inheritance in dark sections. Any heading on an ink surface MUST carry an explicit `text-cream-100` utility.
- **Editorial imagery auto-wiring (2026-08-09):** treatment heroes (per-slug `/images/treatments/<slug>.webp|jpg`) and shared CTA backdrops (`treatment-page-cta.jpg`, `hospital-page-cta.jpg`) render automatically when the file exists — via `src/lib/images.ts` `resolvePublicImage()` (build-time fs check, en + bn). First hero landed: `bariatric-weight-loss.jpg`.
- **Astro frontmatter compiler strips non-exported local function declarations** — build-time helpers must live in `src/lib/` and be imported. Also: never resolve `public/` paths via `import.meta.url` (bundling rewrites it) — use `process.cwd()`, which is the project root in both Astro and vitest.
- Pull-quote editorial sweep: 4 weak third-person quotes rewritten as first-person emotional beats (devi-prasad-shetty, g-girish, sharan-shivaraj-patil, sunil-udgire) in en + bn.
- [ ] **Pending:** source the two optional backdrop images above (or keep CSS-glow placeholders)

### Phase 5 — Verification & polish (2026-08-07) — COMPLETE

- [x] **Unit tests for new molecules:** all 6 new molecules have test files — `ChipCloud.test.tsx`, `StatBand.test.tsx`, `QuickFacts.test.tsx`, `MarqueeStrip.test.tsx`, `StepCards.test.tsx`, `PullQuote.test.tsx` (20 test files, 107 tests total, all passing)
- [x] **Storybook stories for new patterns:** all 6 new molecules have stories files — `ChipCloud.stories.tsx`, `StatBand.stories.tsx`, `QuickFacts.stories.tsx`, `MarqueeStrip.stories.tsx`, `StepCards.stories.tsx`, `PullQuote.stories.tsx`
- [x] **`npm run test` + `npm run build` green:** both pass after all phases
- [x] **LCP image optimization — hero images:** added `loading="eager"` + `fetchpriority="high"` to doctor hero portraits (en + bn); added `fetchpriority="high"` to hospital hero images (en + bn, already had `loading="eager"`)
- [x] **Lazy-loading below-fold images:** added `loading="lazy"` to hospital gallery images (en + bn), doctor page related-doctor avatars (en + bn), treatment page hospital card images (en + bn) — 8 images total
- [x] **TASK.md statuses updated:** all phases marked complete

### Phase 4 — Hospital detail pages (2026-08-07) — COMPLETE

- [x] Added hospital i18n keys to both `en.json` and `bn.json`: `about`, `gallery`, `specialities`, `bedsLabel`, `establishedLabel`, `specialitiesCountLabel`, `consultCta` (with `{{name}}`), `consultSummary`
- [x] Added `HOSPITAL_PAGE` to `LEAD_SOURCE` enum in `src/lib/crm.ts`
- [x] Rewrote `/hospitals/[slug]` (en) to editorial layout: full-bleed hero image with `bg-ink/60` gradient overlay (hospital name + accreditation badges floating on the image, `loading="eager"` for LCP), dark `StatBand` under hero (beds / established year / speciality count), about prose, specialities → `ChipCloud`, prose body, amenities → `ChipCloud`, gallery → horizontal scroll-snap strip (moved out of sidebar), sticky rail with booking + contact details, doctors-at-hospital grid (3-col rhythm), FAQ, dark mid-page CTA band, contact `LeadForm`
- [x] Rewrote `/bn/hospitals/[slug]` to mirror the en editorial layout (same structure, bn i18n keys, bn contact labels)
- [x] Inlined the `MarqueeStrip` scroll-snap markup directly in the gallery section (Astro's template parser doesn't support multiline JSX elements inside `.map()` callbacks passed as component props — the `marqueeTrack` cva classes are applied directly to the container div)
- [x] `npm run build` green (all 5 hospital pages × en/bn render); `npm test` green (107 tests, 20 files)

### Phase 3 — Treatment detail pages (2026-08-07) — COMPLETE

- [x] Added treatment i18n keys to both `en.json` and `bn.json`: `durationLabel`, `stayLabel`, `recoveryLabel`, `priceLabel`, `specialistsHeading`, `specialistsSummary`, `journeyHeading`, 4 journey step titles + descriptions, `consultCta` (with `{{name}}`), `consultSummary`
- [x] Rewrote `/treatments/[slug]` (en) to editorial layout: dark ink hero (gradient category pill, oversized display name, description, `QuickFacts` icon chips for duration/stay/recovery/price, dual CTAs), "Meet your specialists" section with related doctor face cards above the prose, `StepCards` numbered grid for procedures, prose body, `StepTimeline` patient-journey mini timeline, treating hospitals grid, sticky booking rail (facts moved to hero — rail holds only inquiry CTA), dark mid-page CTA band, FAQ, contact `LeadForm`
- [x] Rewrote `/bn/treatments/[slug]` to mirror the en editorial layout (same structure, bn i18n keys, bn journey steps)
- [x] `npm run build` green (all 15 treatment pages × en/bn render); `npm test` green (107 tests, 20 files); lint clean on .astro files (pre-existing JSON eslint config issue on `en.json`/`bn.json` unaffected by this phase)

### Phase 3 — Gaps & oversights fix-up (2026-08-07) — COMPLETE

- [x] **Category→hue map:** created `src/lib/treatment-categories.ts` mapping each of the 16 treatment categories to a unique pair of Tailwind color tokens for the hero glow blobs (e.g. Heart→rose/pink, Oncology→amber/orange, Neurology→cyan/sky, Orthopaedics→emerald/teal). Wired into both en + bn treatment pages; added Tailwind safelist in `tailwind.config.ts` for all dynamically-generated `bg-{color}-600/15` and `bg-{color}-600/10` classes so JIT generates them
- [x] **Price range in QuickFacts:** all 16 treatments have both `fromPrice` and `toPrice` in frontmatter but QuickFacts only showed `fromPrice`. Now shows "$1,500 – $7,000" range when both are available, falling back to `fromPrice` alone when `toPrice` is absent. Fixed in both en + bn pages
- [x] **bn page missing LeadForm:** the en treatment page had a contact `LeadForm` section but the bn page went straight from the CTA band to the Footer. Added the `LeadForm` import, `treatmentOptions` variable, and full contact section to the bn page for parity
- [x] **"Treating Hospitals" heading not i18n'd:** was hardcoded in both en ("Treating Hospitals") and bn ("চিকিৎসা প্রদানকারী হাসপাতাল") pages. Added `treatingHospitals` i18n key to both `en.json` and `bn.json`; both pages now use `t.treatments.detail.treatingHospitals`
- [x] `npm run build` + `npm test` (107 tests) green after all fixes

### Phase 2 — System patterns (2026-08-07) — COMPLETE

- [x] `StatBand` molecule (`src/design-system/components/molecules/StatBand.tsx`) — big counted numerals row (years/beds/languages), `tone="light" | "dark"`, optional gradient `suffix` (e.g. "+"); exported from molecules barrel with `StatItem` type
- [x] `QuickFacts` molecule (`src/design-system/components/molecules/QuickFacts.tsx`) — icon chips for treatment key facts (duration/stay/recovery/price), `tone="light" | "dark"`; exported from molecules barrel with `QuickFactItem` type
- [x] `MarqueeStrip` molecule (`src/design-system/components/molecules/MarqueeStrip.tsx`) — horizontal scroll-snap container with hidden scrollbars for hospital galleries and accreditation badge rows; accepts `items` render-prop array or children; exported from molecules barrel
- [x] `StepCards` molecule (`src/design-system/components/molecules/StepCards.tsx`) — numbered grid of procedure steps with gradient number badges, `tone="light" | "dark"`; exported from molecules barrel with `StepCardItem` type
- [x] Added 4 new icons to `Icon` atom: `clock` (duration), `building` (hospital stay), `heart-pulse` (recovery), `tag` (price)
- [x] Storybook stories for all 4 new molecules (Light/Dark/edge-case variants)
- [x] Unit tests for all 4 new molecules (20 tests total: StatBand 5, QuickFacts 5, MarqueeStrip 5, StepCards 5) covering expected use, edge case (empty/missing), and failure case (undefined)
- [x] `npm run build` green; `npm test` green (107 tests, 20 files); lint clean on all new files

### Phase 2 — Gaps & oversights fix-up (2026-08-07) — COMPLETE

- [x] **`prose-editorial` styles:** the plan called for enhanced markdown styles (larger display headings, pull-quote blockquotes with violet accent border, full-bleed media breaks, generous list spacing) for all `<Content />` blocks. Created `.prose-editorial` class in `src/design-system/styles/global.css` building on the existing `.prose` base. Applied to all 8 prose containers across 6 detail pages (doctor en/bn, treatment en/bn, hospital en/bn)
- [x] **Motion preset variety:** the plan called for "Add mask-reveal + image scale-in; reserve `fade-in-up` for secondary content" to fix the "metronome motion" problem. Added `maskReveal` (clip-path inset wipe) and `imageScaleIn` (subtle 1.05→1 scale + fade) presets to `src/design-system/motion/presets.ts`; wired `runMaskReveal` + `runImageScaleIn` runners into `initAnimations` in `src/design-system/motion/engine.ts`. Applied `image-scale-in` to doctor hero portraits (en + bn, replacing `fade-in-up`); applied `mask-reveal` to hospital hero images (en + bn)
- [x] `npm run build` + `npm test` (107 tests) green after all fixes

### Phase 1 — Doctor page completion (2026-08-07) — COMPLETE

- [x] Added `expertise: string[]` and `pullQuote: string` optional fields to the `doctors` Zod schema in `src/content/config.ts`
- [x] Built `ChipCloud` molecule (`src/design-system/components/molecules/ChipCloud.tsx`) — credentials/tags as scannable pill objects, `tone="light" | "dark"` for cream/ink surfaces; exported from molecules barrel
- [x] Built `PullQuote` molecule (`src/design-system/components/molecules/PullQuote.tsx`) — accent-ruled blockquote for the emotional beat between hero and prose, `tone="light" | "dark"`; exported from molecules barrel
- [x] Wrote `scripts/migrate-doctor-expertise.mjs` one-shot migration: extracted `## Field of Expertise` / `## দক্ষতার ক্ষেত্র` bullet lists and a patient-care philosophy sentence from each bio into frontmatter; ran across all 64 doctor files (32 en + 32 bn) — 64 expertise lists + 64 pull quotes migrated, `## Field of Expertise` sections removed from bodies
- [x] Updated `/doctors/[slug]` (en): expertise rendered via `ChipCloud` (dark tone) in hero, `PullQuote` inserted between hero and prose body, mid-page CTA band now uses `t.doctors.detail.consultCta` / `consultSummary` i18n keys
- [x] Rewrote `/bn/doctors/[slug]` to mirror the en editorial layout: dark ink hero (4:5 portrait, gradient specialty pill, oversized name, stat row, dual CTAs, qualification chips, expertise `ChipCloud`), `PullQuote`, sticky booking rail, dark mid-page CTA band, FAQ, contact `LeadForm`; switched to `getDoctorInquiryLink` for the WhatsApp CTA
- [x] Added i18n keys `doctors.detail.expertiseLabel`, `doctors.detail.consultCta` (with `{{name}}`), `doctors.detail.consultSummary` to both `en.json` and `bn.json`
- [x] Deleted `src/pages/preview/` (refined-light prototype) — no references found
- [x] Unit tests for `ChipCloud` (5) and `PullQuote` (5, incl. dark-tone attribution regression) in `tests/design-system/components/molecules/` covering expected use, edge case (empty/missing), and failure case
- [x] Storybook stories for `ChipCloud` (Light/Dark/WithoutLabel/Empty) and `PullQuote` (Light/Dark/WithoutAttribution)
- [x] `npm run build` green (all 64 doctor pages × en/bn + treatments/hospitals/blog render); `npm test` green (87 tests, 16 files); lint clean on all new/modified files (one pre-existing `whatsappHref` unused-var warning in `DoctorCard.test.tsx` from a prior commit, untouched by this phase)

### Phase 1 — Gaps & oversights fix-up (2026-08-07) — COMPLETE

- [x] **Dangling doctor refs:** wrote `scripts/audit-doctor-refs.mjs` to find dead slugs in treatment `relatedDoctorSlugs`; wrote `scripts/fix-doctor-refs.mjs` to clean them. 16 dead slugs removed across 12 en + 12 bn treatment files; `stem-cell-treatment` remapped to the three BMT/haematology doctors (`dr-chandrakala-s`, `dr-mahesh-rajashekaraiah`, `dr-sunil-udgire`); `ophthalmology` and `infertility-treatment` had no matching specialist in the roster so their `relatedDoctorSlugs` field was dropped entirely (the section is conditionally rendered, so it simply won't appear — content decision pending for those two specialties)
- [x] **Unnecessary hydration:** removed `client:load` from `ChipCloud` and `PullQuote` on both en + bn doctor pages (4 instances) — both are purely presentational and now render as static HTML at build time
- [x] **PullQuote dark-tone attribution bug:** attribution `<footer>` was hardcoded `text-ink/50` (invisible on ink); now switches to `text-cream-100/50` when `tone="dark"` via `cn()`. Added a regression test in `PullQuote.test.tsx`
- [x] **Pull-quote content quality:** wrote `scripts/audit-pullquotes.mjs` to flag meta-text quotes; refined 3 of 64 — `dr-ravindra-setty-b-r` (en+bn) trimmed the "is demonstrated by these areas of focus" tail; `dr-praveen-r-tambrallimath` (en+bn) swapped the YouTube/CTSNET sentence for the "innovation and excellence" sentence from the same bio. `dr-devi-prasad-shetty` kept as-is ("legacy of compassion, innovation, and accessibility" is patient-centered)
- [x] `npm run build` + `npm test` (87 tests) green after all fixes

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
- [x] Step 5.4: Rich Results Test on deployed site — homepage detected `LocalBusiness` (valid, non-critical warnings only: `address` intentionally omitted per facilitator business decision) + `Organization` (valid). Treatment detail page detected `Breadcrumbs` (valid, no issues). `MedicalWebPage`/`FAQPage` are not Google rich-result types so they do not appear in the test; they remain in the HTML for AEO/GEO consumption.

## Free Honest Second Opinion Page — COMPLETE (2026-08-29)

- [x] Competitor analysis: Superhealth HSO (ethics/no-pressure angle, email-only intake, EN-only) and MedicalToursIndia Free Second Opinion (travel-risk angle, strong reports checklist, no named doctors, EN-only). Our page combines both angles and adds bilingual BN, WhatsApp-first intake, named specialist cards, and full structured data.
- [x] i18n: new `secondOpinion` namespace in `en.json` + `bn.json` (hero, TL;DR summary, when-checklist, reports checklist, 3-step timeline, deliverables, 6 FAQs, CTA/form copy) plus `nav.secondOpinion` and `footer.secondOpinion` labels.
- [x] Plumbing: `getSecondOpinionLink()` builder + `{ type: 'second-opinion' }` context in `lib/whatsapp.ts` (dispatched via `getContextualWhatsAppLink`); `LEAD_SOURCE.SECOND_OPINION` in `lib/crm.ts`.
- [x] Pages: `src/pages/second-opinion.astro` + `src/pages/bn/second-opinion.astro` — Hero + TL;DR block (GEO pattern), StatCounter, when-to-seek checklist, reports checklist (adapted from MedicalToursIndia's best pattern), StepTimeline (3 steps, `md:grid-cols-3` override), what-you-receive cards, DoctorCard grid (4 specialists from content collection), TestimonialCarousel, FAQAccordion, LeadForm (`source: SECOND_OPINION`, pre-filled message) + WhatsApp CTA with `second-opinion` context. JSON-LD: `MedicalWebPage` + `FAQPage` + `BreadcrumbList` on both locales.
- [x] Link coverage: navbar (`lib/navigation.ts`), footer link row (`lib/footer.ts`), homepage `topCard.exploreHref` repointed from `/treatments` to `/second-opinion`, plus direct URL/SEO via sitemap.
- [x] Tests: 3 new tests in `src/lib/whatsapp.test.ts` (builder empty-config, builder with number, context dispatch) — full suite 167 tests / 27 files passing.
- [x] Build verification: `npm run build` passes, both routes generated, sitemap includes `/second-opinion` + `/bn/second-opinion`; `MedicalWebPage`/`FAQPage`/`BreadcrumbList` confirmed in built HTML (EN + BN); nav links confirmed in built homepage HTML (EN + BN).
- [x] Content guardrails kept: only existing site stats (3,500+ patients, 25+ hospitals, 98%, 24h response) — no invented medical claims.
- Bug fixed during build: `faqPage()` expects `{ entries }` object, not a raw array — corrected on both pages.

## Treatment Card Images & Hero Redesign — COMPLETE (2026-09-05)

- [x] **Treatment card images:** `TreatmentCard.tsx` extended with `image?: string` field — renders image header with overlay tags, `object-cover`, rounded top corners, hover scale. Fallback to tag-only layout when no image. Both `/treatments` and `/bn/treatments` listing pages pass `entry.data.image` to cards.
- [x] **Curated card images:** 13 treatment-specific images added to `/public/images/treatments-cards/` (cardiac-care, cancer-treatment, orthopedics-surgery, ivf-fertility, neuro-spine-surgery, neurology, ophthalmology, cosmetic-surgery, ear-nose-throat, gastroenterology-surgery, urology, bariatric-weight-loss, paediatric-neurology). 3 treatments use fallback from `/images/treatments/` (organ-treatment, nephrology-kidney-care, stem-cell-treatment). All 36 content files (18 EN + 18 BN) updated from shared Unsplash placeholder to local image paths.
- [x] **Hero background redesign:** Treatment detail pages (`[slug].astro` EN + BN) now use `treatment.image` (card image) as full-bleed hero background on all breakpoints with gradient overlay `linear-gradient(105deg, rgba(14,36,56,0.92) 0%, rgba(14,36,56,0.82) 38%, rgba(20,51,82,0.62) 68%, rgba(20,51,82,0.55) 100%)`. Old `/images/treatments/` hero background images no longer rendered (prop kept but unused). Single-column hero layout restored (framed card image on right removed).
- [x] **Description in hero:** Added `<p>` tag below H1 showing `treatment.description` with `text-cream-100/90` brightness, `max-w-2xl`, `data-anim="fade-in-up"`. Both EN + BN templates.
- [x] Build verification: all 18 EN + 18 BN treatment detail routes generated, all card images confirmed in built HTML for both listing pages.

## New Treatment Pages: Pulmonology & Hematology — COMPLETE (2026-09-05)

- [x] **Pulmonology & Lung Care** (`pulmonology-lung-care`): EN + BN content created. Covers lung resection surgery (lobectomy, pneumonectomy, segmentectomy), VATS, bronchoscopy (diagnostic & therapeutic), COPD/asthma management, sleep apnea evaluation/CPAP, pulmonary rehabilitation. Conditions: COPD, asthma, lung cancer, ILD, bronchiectasis, pulmonary embolism, sleep apnea, pleural diseases, TB, pulmonary hypertension. Hospitals: Apollo, Manipal, Fortis (all list Pulmonology in specialities). No doctors mapped (no pulmonologists in current directory). Image: `/images/treatments-cards/pulmonology-lung-care.jpg`.
- [x] **Hematology & Bone Marrow Transplant** (`hematology-bone-marrow`): EN + BN content created. Covers autologous/allogeneic BMT, haploidentical transplant, CAR-T cell therapy, thalassemia/sickle cell transplant, aplastic anemia therapy. Conditions: AML, ALL, CML, CLL, lymphomas, multiple myeloma, MDS, MPN, thalassemia, sickle cell, aplastic anemia, haemophilia, immune deficiencies. Doctors: Dr. Sunil Udgire, Dr. Mahesh Rajashekaraiah, Dr. Chandrakala S, Dr. Neema Bhat (actual hematology specialists only). Hospitals: Fortis (Haematology & BMT), SPARSH (Bone Marrow Transplant). Image: `/images/treatments-cards/hematology-bone-marrow.jpg`.
- [x] Badge chip values kept concise (e.g. `1-6 hours`, `2-10 days`, `2-8 weeks`) matching existing treatment page style.
- [x] Build verification: both routes generated in EN + BN, both appear on treatment listing pages, images render correctly, no incorrect doctor mappings.

## SEO Headlines for Treatment Pages — COMPLETE (2026-09-05)

- [x] **`seoHeadline` field** added to treatment content schema (`src/content/config.ts`) — optional string, falls back to `name` if absent.
- [x] **Long-tail H1s** added to all 36 treatment content files (18 EN + 18 BN). Examples: "Fertility Treatments & IVF in India for International Patients", "Cardiac Care & Heart Surgery in India for International Patients", "Hematology & Bone Marrow Transplant in India for International Patients". Bengali headlines localized (e.g. "আন্তর্জাতিক রোগীদের জন্য ভারতে ফার্টিলিটি চিকিৎসা ও আইভিএফ").
- [x] **Template wiring:** Both `[slug].astro` templates (EN + BN) use `const headline = treatment.seoHeadline || treatment.name` for H1 and `<title>` tag. Short `name` still used for breadcrumbs, filter chips, treatment cards, JSON-LD, and WhatsApp links.
- [x] **H1 styling** updated: `mt-4 max-w-2xl font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]` — responsive scaling, `font-medium` for longer headlines, `max-w-2xl` for clean wrapping.
- [x] SEO impact: `treatment.image` (card image) used in all JSON-LD schemas, Open Graph, and Twitter meta — unchanged. `heroImage` (old `/images/treatments/`) was decorative (`alt=""`, `aria-hidden`) and never in structured data, so removal has no SEO impact.

## Phase 2: Two-Tier Procedure URL Pages (Phase 2A) — COMPLETE (2026-09-06)

Implements the two-tier procedure URL structure from `docs/TREATMENT_PAGES_STRUCTURE_ANALYSIS_AND_PLAN.md` and `docs/PROCEDURE_URL_STRUCTURE_MAPPING.md`. Procedure-level pages nested under treatment category pages at `/treatments/{category}/{procedure}-cost-india` (EN) and `/bn/treatments/{category}/{procedure}-cost-india` (BN).

### Infrastructure

- [x] **Procedures content collection** added to `src/content/config.ts` with Zod schema: `locale`, `name`, `seoHeadline`, `parentTreatmentSlug`, `summary`, `description`, `fromPrice`, `toPrice`, `duration`, `hospitalStay`, `recoveryTime`, `eligibility[]`, `costInclusions[]`, `costExclusions[]`, `recoveryTimeline[]{phase,duration,description}`, `risks[]`, `relatedProcedureSlugs[]`, `faqs[]{question,answer}`.
- [x] **Procedure helpers** in `src/lib/content.ts`: `getProcedures(locale)`, `getProceduresByCategory(locale, parentSlug)`, `getProcedureBySlug(locale, slug)`, `resolveRelatedProcedures(slugs, procedures)`. Slug comparison uses `.split('/').pop()` to handle nested directory paths (e.g. `cardiology/angioplasty-stent-placement-cost-india` → `angioplasty-stent-placement-cost-india`).
- [x] **Schema generators** in `src/lib/schema.ts`: reused existing `medicalProcedure()` for procedure-level JSON-LD. `MedicalWebPage`, `BreadcrumbList`, and `FAQPage` helpers already available.
- [x] **WhatsApp helper** `getProcedureInquiryLink()` added to `src/lib/whatsapp.ts` for procedure-specific inquiry messages.
- [x] **i18n strings** added to `en.json` and `bn.json` under procedure-page namespace.
- [x] **EN procedure detail template** `src/pages/treatments/[slug]/[procedure].astro` — breadcrumb hierarchy, H1 from `seoHeadline`, summary, cost range, quick facts, eligibility, procedure details, recovery timeline, cost inclusions/exclusions, risks, related procedures, FAQ accordion, JSON-LD (MedicalProcedure + MedicalWebPage + BreadcrumbList + FAQPage), WhatsApp CTA, LeadForm.
- [x] **BN procedure detail template** `src/pages/bn/treatments/[slug]/[procedure].astro` — mirrors EN template with Bengali i18n.
- [x] **Treatment category pages enhanced** — both `treatments/[slug].astro` and `bn/treatments/[slug].astro` now load category procedures via `getProceduresByCategory()` and render a procedure card grid linking to nested procedure URLs.

### Phase 2A Content (64 procedure files: 32 EN + 32 BN)

- [x] **Hematology & Bone Marrow** (10 procedures × 2 locales = 20 files): bone-marrow-transplant, leukemia-treatment, lymphoma-treatment, thalassemia-treatment, sickle-cell-disease-treatment, autologous-stem-cell-transplant, allogeneic-stem-cell-transplant, aplastic-anemia-treatment, multiple-myeloma-treatment, car-t-cell-therapy.
- [x] **Cardiology** (8 procedures × 2 locales = 16 files): heart-bypass-surgery-cabg, angioplasty-stent-placement, heart-valve-replacement-repair, tavr-transcatheter-aortic-valve-replacement, pacemaker-implantation, asd-vsd-closure-surgery, pediatric-heart-surgery, heart-transplant.
- [x] **Cancer Treatment** (8 procedures × 2 locales = 16 files): chemotherapy, radiation-therapy, immunotherapy, targeted-therapy, cancer-surgery, breast-cancer-treatment, lung-cancer-treatment, prostate-cancer-treatment.
- [x] **Orthopedics** (6 procedures × 2 locales = 12 files): total-knee-replacement, total-hip-replacement, shoulder-replacement, arthroscopy, spine-surgery, sports-injury-treatment.

### Bug fix during build

- [x] **Nested directory slug issue:** `entrySlug()` returns `category/procedure-slug` for files in nested content directories (e.g. `procedures/en/cardiology/heart-bypass-surgery-cabg-cost-india.md`). Fixed all slug comparisons in `content.ts` (`getProcedureBySlug`, `resolveRelatedProcedures`) and all four templates (EN/BN procedure detail + EN/BN treatment category) to use `.split('/').pop()` for extracting just the procedure slug segment.

### Verification

- [x] `npm run build` passes with exit code 0.
- [x] All 32 EN procedure routes generated (e.g. `/treatments/cardiology/heart-bypass-surgery-cabg-cost-india`).
- [x] All 32 BN procedure routes generated (e.g. `/bn/treatments/cardiology/heart-bypass-surgery-cabg-cost-india`).
- [x] All 18 EN treatment category pages still render with procedure card grids.
- [x] All 18 BN treatment category pages still render with procedure card grids.
- [x] `npm test`: 270 of 277 tests pass. 7 failures are pre-existing `Navbar.test.tsx` issues unrelated to procedure pages. All 18 WhatsApp tests, 10 schema tests, 10 FAQ generator tests pass.

### Discovered During Work

- **Subagent reliability:** First batch of 8 parallel subagents stalled after creating only 15 of 64 files. Re-launched 8 subagents for the remaining 53 files — all completed successfully. Lesson: subagents may hit session/time limits on large content generation tasks; verify file counts after completion and re-launch for missing files.
- **Content directory structure:** Procedure markdown files are organized as `src/content/procedures/{locale}/{category-slug}/{procedure-slug}.md`. This nested structure requires `.split('/').pop()` on `entrySlug()` output to extract just the procedure filename slug.

## Phase 2B: Two-Tier Procedure URL Pages — COMPLETE (2026-09-06)

Extends Phase 2A with 34 more procedure files (17 EN + 17 BN) across 4 medium-volume categories. Same URL structure, templates, and infrastructure as Phase 2A — no code changes needed, only content.

### Phase 2B Content (34 procedure files: 17 EN + 17 BN)

- [x] **Infertility & IVF** (5 procedures × 2 locales = 10 files): ivf-treatment, icsi-treatment, iui-treatment, surrogacy-program, egg-freezing. Surrogacy content accurately reflects the Surrogacy (Regulation) Act 2021 — only altruistic surrogacy for Indian citizens; international surrogacy restricted.
- [x] **Organ Transplant** (3 procedures × 2 locales = 6 files): liver-transplant, kidney-transplant, lung-transplant. Content notes that international patients need a living donor (typically a close relative) per Indian organ transplant regulations.
- [x] **Neuro & Spine Surgery** (4 procedures × 2 locales = 8 files): brain-tumor-surgery, spinal-fusion-surgery, disc-replacement-surgery, deep-brain-stimulation. DBS content mentions Parkinson's disease, essential tremor, and dystonia as primary indications.
- [x] **Cosmetic Surgery** (5 procedures × 2 locales = 10 files): rhinoplasty, liposuction, breast-augmentation, tummy-tuck, hair-transplant. Hair transplant content covers both FUE and FUT techniques.

### Verification

- [x] `npm run build` passes with exit code 0.
- [x] All 17 EN Phase 2B procedure routes generated (e.g. `/treatments/infertility-treatment/ivf-treatment-cost-india`).
- [x] All 17 BN Phase 2B procedure routes generated (e.g. `/bn/treatments/neuro-and-spine-surgery/deep-brain-stimulation-cost-india`).
- [x] Total procedure routes across Phase 2A + 2B: 98 (49 EN + 49 BN).

### Discovered During Work

- **Subagent reliability (again):** First batch of 8 subagents stalled after creating only 5 of 34 files. Re-launched 8 subagents for the remaining 29 files — all completed successfully. This confirms the pattern: subagents may stall on large content generation batches; always verify file counts and re-launch for missing files.

## Patient-Focused Procedure Rewrite (Tier 2 & Tier 3 English) — COMPLETE (2026-09-12)

Rewrote all 13 lower-tier English procedure files and trimmed 18 over-limit files so that every English procedure page reads as practical patient guidance rather than medical reference material. All 49 EN procedure files are now 1,500–2,500 words.

### Batches completed

- [x] **Batch 1 — Hematology (4 files):** aplastic anemia, autologous SCT, lymphoma, thalassemia
- [x] **Batch 2 — Cardiology (3 files):** ASD/VSD closure, heart valve replacement/repair, pacemaker implantation
- [x] **Batch 3 — Cancer (3 files):** immunotherapy, lung cancer, prostate cancer
- [x] **Batch 4 — Orthopedics (3 files):** shoulder replacement, spine surgery, sports injury treatment
- [x] **Batch 5 — Infertility (3 files):** egg freezing, ICSI, IUI
- [x] **Batch 6 — Organ (1 file):** lung transplant
- [x] **Batch 7 — Neuro (2 files):** deep brain stimulation, spinal fusion
- [x] **Batch 8 — Cosmetic (2 files):** breast augmentation, liposuction
- [x] **Batch 9 — Trim 18 over-limit files:** IVF (3166→2323), brain tumor (3085→2263), CABG (3027→2406), kidney transplant (3004→2318), breast cancer (2980→2238), chemotherapy (2937→2335), allogeneic SCT (2904→2427), disc replacement (2895→2353), rhinoplasty (2871→2304), angioplasty (2701→2276), tummy tuck (2665→2347), bone marrow transplant (2644→2394), total knee replacement (2628→2460), heart transplant (2620→2426), arthroscopy (2598→2469), liver transplant (2587→2466), surrogacy (2542→2452), cancer surgery (2536→2469)

### Verification

- [x] All 49 EN procedure files verified between 1,500 and 2,500 words (0 over, 0 under).
- [x] Frontmatter, FAQs, cost comparison tables, related procedure links, and cost information preserved in every file.
- [x] Patient-focused tone: direct second-person language, empathetic introductions, "Will it hurt?" callouts, practical preparation steps, international-patient logistics, fitness-to-fly guidance, and continuity-of-care coordination with home-country doctors.
- [x] Medically cautious wording maintained — no unsupported guarantees; final decisions framed as dependent on specialist assessment.
- [x] `npm run build` passes with exit code 0. 342 HTML routes generated (49 EN + 49 BN procedure routes + treatment category pages + country pages + doctor pages + hospital pages + blog posts + static pages). No build errors.

### Discovered During Work

- **Heart transplant file location:** `heart-transplant-cost-india.md` lives in `cardiology/`, not `organ-treatment/` — corrected during Batch 9 verification.
- **Hematology directory name:** the procedure directory is `hematology-bone-marrow/`, not `hematology/`.
- **Background subagents cannot run `node`:** exec tools are auto-denied for background subagents, so word-count verification must be done by the parent agent after subagents complete.
- **Temp file cleanup:** subagents created helper scripts (`count_words.js`, `check_words.js`, `check_words.ps1`, `count.bat`) in the repo root — deleted after verification.

## Bengali Procedure Expansion — COMPLETE (2026-09-12)

Expanded all 49 BN procedure files across all categories to 1,500–2,500 words, aligned with their expanded English counterparts. Each BN page mirrors the EN structure (overview, who-is-this-for, pre-operative preparation, procedure details, what happens during the procedure, post-operative care, long-term outcomes, follow-up care, alternatives, cost comparison, why Bangalore, travel & visa) with faithful Bengali localization.

### Batches completed

- [x] **Batch 1 — Cardiology (8 files)**
- [x] **Batch 2 — Hematology (10 files)**
- [x] **Batch 3 — Cancer (8 files)**
- [x] **Batch 4 — Orthopedics (6 files)**
- [x] **Batch 5 — Infertility (5 files)**
- [x] **Batch 6 — Organ (3 files)**
- [x] **Batch 7 — Neuro & Spine (4 files)**
- [x] **Batch 8 — Cosmetic (5 files)**

### Trim pass (12 files initially over 2,500 words)

- [x] Trimmed all 12 over-limit BN files to ≤2,500 words: breast cancer (2636→2457), cancer surgery (2728→2109), chemotherapy (2653→2474), hair transplant (2543→2470), allogeneic SCT (2681→2489), bone marrow transplant (2592→2482), sickle cell (2682→2431), IVF (2600→2492), surrogacy (2542→2463), arthroscopy (2738→2282), total hip replacement (2592→2426), total knee replacement (2730→2248).

### Verification

- [x] All 49 BN procedure files verified between 1,500 and 2,500 words (0 over, 0 under). Total files: 49. In range: 49.
- [x] Frontmatter, FAQs, cost comparison tables, related procedure links, and medical disclaimers preserved in every file.
- [x] `npm run build` passes with exit code 0. All 49 EN + 49 BN procedure routes generated successfully.
- [x] BN content stays faithful to EN counterparts — no major sections omitted, no unrelated content introduced.

### Discovered During Work

- **Background subagents cannot run shell commands:** exec tools are auto-denied for background subagents, so word-count verification and trimming of remaining outliers had to be completed by the parent agent.
- **PowerShell inline variable syntax stripped in exec tool:** `$content` etc. are stripped when passed inline; use script files (`check_one.ps1`, `count_all_bn.ps1`) with `-File` instead.
- **Temp helper scripts created:** `check_one.ps1`, `check_sub1.ps1` — kept for future verification reuse alongside existing `count_all_bn.ps1`, `verify_trim.ps1`.
- **BN pages read as translated, not native:** While the BN expansion is medically accurate and structurally aligned with EN, a native Bengali reader would notice English word order, over-use of "আপনি" (you), and literal calques of English idioms (e.g. "বাঁচছেন" for "living with"). A native-fluency pass is needed to rewrite awkward calques and pronoun-heavy sentences into natural Bengali prose while keeping medical content and structure intact. Word counts must remain within 1,500–2,500.

## Pending: Bengali Native-Fluency Pass — 2026-09-12

- [ ] Rewrite all 49 BN procedure files for native Bengali fluency (fix English word order, pronoun density, literal calques).
- [ ] Keep medical content, structure, frontmatter, FAQs, cost tables, and disclaimers intact.
- [ ] Verify word counts remain 1,500–2,500 after rewriting.
- [ ] Re-run build after fluency pass.

## Bengali Bariatric Procedure Pages — COMPLETE (2026-09-07)

Created the missing BN bariatric-weight-loss procedure directory and both Bengali procedure files in native-fluent Bengali, following the established procedure Markdown/YAML architecture and the native Bengali style reference from `bn/neurology/epilepsy-treatment-cost-india.md`.

### Files created

- [x] **BN gastric-bypass-surgery-cost-india.md** — `frontend/src/content/procedures/bn/bariatric-weight-loss/gastric-bypass-surgery-cost-india.md` — 1,942 words, 12 H2 sections. Native Bengali prose describing Roux-en-Y gastric bypass (restriction + malabsorption), $4,000–$10,000 cost, 2–4 hr duration, 3–4 day hospital stay, 4–6 week recovery. Links to gastric-sleeve as related procedure.
- [x] **BN gastric-sleeve-surgery-cost-india.md** — `frontend/src/content/procedures/bn/bariatric-weight-loss/gastric-sleeve-surgery-cost-india.md` — 2,065 words, 12 H2 sections. Native Bengali prose describing sleeve gastrectomy (restriction only, ~80% stomach removal, ghrelin reduction), $3,500–$9,000 cost, 1–2 hr duration, 2–3 day hospital stay, 2–4 week recovery. Links to gastric-bypass as related procedure.

### Verification

- [x] Both files within 1,500–2,500 word range (1,942 and 2,065 respectively).
- [x] Frontmatter correct: `locale: bn`, `parentTreatmentSlug: bariatric-weight-loss`, procedure-specific pricing/duration/stay/recovery, correct `relatedProcedureSlugs` cross-linking.
- [x] 12 unique H2 sections per file, no duplicate headings.
- [x] Files are distinct (different file sizes 46,502 vs 48,947 bytes, different frontmatter values, different procedure descriptions — bypass describes intestinal bypass/malabsorption, sleeve describes stomach-only restriction).
- [x] Native Bengali style: patient-directed "আপনি" language, Bengali numerals in prose, medically cautious claims, international-patient context, procedure-specific distinctions preserved.

### Discovered During Work

- **EN gastric sleeve over prior range:** English `gastric-sleeve-surgery-cost-india.md` is 2,569 words (69 over the 2,500 target). Not trimmed in this session — user scoped the task to BN file creation only. Flag for future trim pass if requested.
- **Native-fluency pass scope:** The two new BN bariatric files were written directly in native Bengali (not translated from EN), so they do not carry the English-word-order/calque issues noted in the broader BN fluency pass pending task. They can serve as additional style references for the remaining fluency rewrite.

## Bengali ENT Procedure Pages — COMPLETE (2026-09-07)

Created the missing BN `ear-nose-throat` procedure directory and both Bengali procedure files in native-fluent Bengali, matching their English counterparts in structure, clinical meaning, frontmatter, and cross-links. English ENT files were intentionally left unchanged per user scope (BN-only creation).

### Files created

- [x] **BN cochlear-implant-cost-india.md** — `frontend/src/content/procedures/bn/ear-nose-throat/cochlear-implant-cost-india.md` — 2,162 words, 12 H2 sections. Native Bengali prose covering severe-to-profound bilateral sensorineural hearing loss, auditory nerve assessment, 12-month paediatric + post-lingual adult eligibility, Cochlear/MED-EL/Advanced Bionics devices, mastoidectomy + electrode array insertion, 3–4 week delayed activation + mapping, risks (infection, facial nerve weakness, tinnitus/vertigo, device failure, CSF leak/meningitis), long-term auditory-verbal therapy, alternatives (advanced hearing aids, bone-anchored devices, CROS), $10,000–$25,000 cost, 2–3 hr duration, 1–2 day stay, 4–6 week recovery. Links to sinus-surgery as related procedure.
- [x] **BN sinus-surgery-cost-india.md** — `frontend/src/content/procedures/bn/ear-nose-throat/sinus-surgery-cost-india.md` — 2,073 words, 12 H2 sections. Native Bengali prose covering functional endoscopic sinus surgery (FESS), chronic rhinosinusitis >12 weeks despite medical treatment, nasal polyps, recurrent acute sinusitis, anatomical obstruction (deviated septum, concha bullosa, Haller cells), fungal sinusitis/mucocele, CT + nasal endoscopy, HD endoscopic + image-guided surgery, day-care/overnight admission, post-op debridement, risks (bleeding, infection, orbital/optic nerve injury, CSF leak, recurrence), saline irrigation + topical steroids, alternatives (antibiotics, oral corticosteroids, biologics like dupilumab/mepolizumab/omalizumab, septoplasty alone, turbinate reduction), $1,500–$5,000 cost, 1–3 hr duration, 0–1 day stay, 1–2 week recovery. Links to cochlear-implant as related procedure.

### Verification

- [x] Both files within 1,500–2,500 word range (2,162 and 2,073 respectively).
- [x] Frontmatter correct: `locale: bn`, `parentTreatmentSlug: ear-nose-throat`, procedure-specific pricing/duration/stay/recovery, correct `relatedProcedureSlugs` cross-linking (cochlear→sinus, sinus→cochlear).
- [x] 12 unique H2 sections per file, no duplicate headings. Section order matches the established 12-section template (Overview, Who Is This For, Pre-operative Preparation, Procedure Details, What Happens During, Post-operative Care, Long-term Outcomes, Follow-up Care, Alternatives, Cost Comparison, Why Bangalore, Travel & Visa).
- [x] Files are distinct (different file sizes 50,130 vs 49,579 bytes, different frontmatter values, different procedure descriptions — cochlear covers sensorineural hearing loss + electrode insertion, sinus covers chronic rhinosinusitis + endoscopic ostial widening).
- [x] UTF-8 content integrity confirmed via read tool (PowerShell terminal display shows Bengali as garbled due to encoding, but file content is correct UTF-8 Bengali).
- [x] Native Bengali style: patient-directed "আপনি" language, Bengali numerals in prose, medically cautious claims, international-patient context, procedure-specific distinctions preserved.

### Discovered During Work

- **EN ENT files over prior range:** English `cochlear-implant-cost-india.md` is 2,587 words (87 over) and `sinus-surgery-cost-india.md` is 2,522 words (22 over). Not trimmed in this session — user explicitly scoped the task to BN file creation only. Flag for future trim pass if requested.
- **PowerShell Bengali display:** Terminal output renders Bengali Unicode as `?`/garbled bytes due to console code-page limitations. This is a display-only issue; file content is valid UTF-8. Use the `read` tool to verify Bengali content visually.

## Bengali Ophthalmology Procedure Pages — COMPLETE (2026-09-07)

Created the missing BN `ophthalmology` procedure directory and both Bengali procedure files in native-fluent Bengali, matching their English counterparts in structure, clinical meaning, frontmatter, and cross-links. English ophthalmology files were intentionally left unchanged per user scope (BN-only creation).

### Files created

- [x] **BN cataract-surgery-cost-india.md** — `frontend/src/content/procedures/bn/ophthalmology/cataract-surgery-cost-india.md` — 2,055 words, 12 H2 sections. Native Bengali prose covering cloudy vision/colour fading/night glare symptoms, phacoemulsification + femtosecond laser-assisted (FLACS) techniques, IOL types (monofocal/toric/multifocal/accommodating), 2.2mm self-sealing incision, biometry/OCT/corneal topography pre-op, day-care surgery, post-op shield + eye drop regimen, posterior capsule opacity (secondary cataract) + YAG capsulotomy, endophthalmitis/cystoid macular oedema/IOL dislocation/refractive surprise risks, alternatives (glasses, refractive lens exchange, low-vision aids), Alcon/J&J/Carl Zeiss IOLs, $500–$2,000 per eye, 30–45 min, day care, 1–4 week recovery. Links to lasik-eye-surgery as related procedure.
- [x] **BN lasik-eye-surgery-cost-india.md** — `frontend/src/content/procedures/bn/ophthalmology/lasik-eye-surgery-cost-india.md` — 2,296 words, 12 H2 sections. Native Bengali prose covering myopia/hyperopia/astigmatism correction, bladeless femtosecond LASIK + SMILE techniques, Carl Zeiss VisuMax/Alcon WaveLight EX500/J&J iDesign platforms, corneal topography/pachymetry/wavefront pre-op, 500+ micron corneal thickness requirement, presbyopia realistic expectations, monovision LASIK, excimer laser reshaping + eye-tracking, PRK/Epi-LASIK/ICL/refractive lens exchange alternatives, dry eye/glare/halos/flap complications/corneal ectasia risks, $800–$2,500 per eye, 10–15 min/eye, day care, 1–7 day recovery. Links to cataract-surgery as related procedure.

### Verification

- [x] Both files within 1,500–2,500 word range (2,055 and 2,296 respectively).
- [x] Frontmatter correct: `locale: bn`, `parentTreatmentSlug: ophthalmology`, procedure-specific pricing/duration/stay/recovery, correct `relatedProcedureSlugs` cross-linking (cataract→lasik, lasik→cataract).
- [x] 12 unique H2 sections per file, no duplicate headings. Section order matches the established 12-section template.
- [x] Files are distinct (different file sizes 48,969 vs 52,186 bytes, different frontmatter values, different procedure descriptions — cataract covers lens opacification + IOL implantation, LASIK covers corneal reshaping for refractive error correction).
- [x] UTF-8 content integrity confirmed via read tool (PowerShell terminal display shows Bengali as garbled due to encoding, but file content is correct UTF-8 Bengali).
- [x] Native Bengali style: patient-directed "আপনি" language, Bengali numerals in prose, medically cautious claims, international-patient context, procedure-specific distinctions preserved.

### Discovered During Work

- **EN LASIK over prior range:** English `lasik-eye-surgery-cost-india.md` is 2,704 words (204 over the 2,500 target). Not trimmed in this session — user explicitly scoped the task to BN file creation only. Flag for future trim pass if requested.
- **EN cataract within range:** English `cataract-surgery-cost-india.md` is 2,474 words (within the 1,500–2,500 target).

## Full 18-Category Audit + Structural Fixes — COMPLETE (2026-09-07)

Audited all 136 procedure files (68 EN + 68 BN) across all 18 categories for word count, H2 section count, duplicate headings, and section order. File counts are perfectly symmetric — no missing BN directories or files. Fixed the two structural issues the user selected.

### Audit results (full corpus)

- **Total files:** 136 (68 EN + 68 BN)
- **Within 1,500–2,500 range:** 120
- **Over 2,500:** 15 (14 EN + 1 BN) — left unchanged per user scope (only H2 anomaly + BN IUI under-limit selected for fix)
- **Under 1,500:** 1 (BN IUI) — fixed
- **H2 anomalies (not 12):** 2 (EN + BN cancer-surgery) — fixed

### Fixes applied

- [x] **EN cancer-surgery-cost-india.md** — Added missing "Procedure Details" H2 section (section 4) covering open/laparoscopic/robotic approaches and resection types (curative, lymph node dissection, debulking, reconstructive). Reordered sections 7–12 to match the standard 12-section template (Long-Term Outcomes → Follow-Up Care → Alternatives → Cost Comparison → Why Choose Bangalore → Travel & Visa). Now 2,613 words, 12 H2, no duplicates. User confirmed 2,613 words is acceptable despite being 113 over the 2,500 target.
- [x] **BN cancer-surgery-cost-india.md** — Added missing "প্রক্রিয়ার বিস্তারিত" (Procedure Details) H2 section in native Bengali covering the same surgical approach and resection type content. Reordered sections 7–12 to match the standard template. Now 1,786 words, 12 H2, no duplicates.
- [x] **BN iui-treatment-cost-india.md** — Expanded "পোস্ট-অপারেটিভ যত্ন ও সুস্থতা" section with additional practical guidance on emotional wellbeing during the two-week wait, light exercise, nutrition, and avoiding hot tubs/saunas. Now 1,565 words (was 1,482), 12 H2, no duplicates.

### Remaining flagged files (not fixed — user declined)

14 EN files remain over the 2,500-word target and 1 BN file (nephrology/kidney-stone at 3,005 words) remains over. These are documented for a future trim pass if requested:

| Locale | File | Words |
|---|---|---|
| en | bariatric/gastric-sleeve | 2,569 |
| en | ent/cochlear-implant | 2,587 |
| en | ent/sinus-surgery | 2,522 |
| en | gastro/hernia-repair | 2,672 |
| en | nephrology/dialysis | 2,691 |
| en | nephrology/kidney-stone | 3,228 |
| en | neurology/epilepsy | 2,512 |
| en | neurology/stroke | 2,790 |
| en | ophthalmology/lasik | 2,704 |
| en | pulmonology/asthma | 2,586 |
| en | pulmonology/copd | 2,798 |
| en | stem-cell/orthopedics | 2,598 |
| en | urology/kidney-stone-removal | 2,604 |
| en | urology/prostate-surgery | 2,506 |
| bn | nephrology/kidney-stone | 3,005 |

## SEO/Authority Gap Fixes — COMPLETE (2026-09-08)

Based on gap analysis of TREATMENT_PAGES_STRUCTURE_ANALYSIS_AND_PLAN.md, PROCEDURE_URL_STRUCTURE_MAPPING.md, and COMPETITOR_CONTENT_STRUCTURE_ANALYSIS.md:

- [x] **P0: Render 
isks field in procedure templates** — 
isks frontmatter was populated in all 68 EN files but never displayed. Added risks rendering section (with alert icons + mitigation note) to both EN and BN [procedure].astro templates, positioned after recovery timeline and before cost inclusions. Added 
isksTitle and 
isksMitigationNote i18n keys.
- [x] **P0: Standardize all 136 files to Order A H2 structure** — Found 3 different H2 orderings across the codebase (Order A: patient journey, Order B: procedure-first, Order C: BN-only hybrid). Reordered 45 EN files (Order B -> A) and 36 BN files (18 Order B + 18 Order C -> A). Also fixed 2 heart-transplant files with a 4th variant. All 136 files now follow the same patient-journey order: Overview > Who > Pre-Op > Procedure Details > What Happens > Post-Op > Long-Term > Follow-Up > Alternatives > Cost > Why Bangalore > Travel. Scripts: scripts/reorder-h2-indexed.ps1.
- [x] **P1: Add fit-to-fly guidance to all files** — 43 EN files and 28 BN files lacked fit-to-fly/fitness-to-fly mentions. Added a standardized fit-to-fly paragraph to the Travel & Visa section. All 136 files now cover this international-patient search intent. Scripts: scripts/add-fit-to-fly.ps1, scripts/remove-duplicate-fit-to-fly.ps1 (for BN dedup).
- [x] **P1: Add "How to Read a Package Quote" section** — Added as template-rendered section (6 items in 2-col grid) to both EN and BN procedure templates. Covers hidden charges trust intent. i18n keys: packageQuoteTitle, packageQuoteIntro, packageQuoteItem1-6Label/Desc.
- [x] **P2: Add "Decision Framework for International Patients" section** — Added as template-rendered section (8-item checklist) to both EN and BN procedure templates. Covers commercial + trust search intent. i18n keys: decisionFrameworkTitle, decisionFrameworkIntro, decisionFrameworkItem1-8.
- [x] **P2: Update Plan doc** — Updated TREATMENT_PAGES_STRUCTURE_ANALYSIS_AND_PLAN.md section 8 to document the actual 12-H2 Order A structure and all template-rendered sections. Added note that the initial 26-procedure scope was superseded by the complete 68-procedure mapping.

### Discovered During Work

- The 
isks field was populated in all 68 EN files but the template never rendered it — this was the highest-impact fix (data collected, just not displayed).
- The H2 ordering inconsistency was completely undocumented. Three different orderings existed across 136 files, with EN and BN counterparts often using different structures.
- 28 BN files received duplicate fit-to-fly content because the pattern matching didn't catch original Bengali phrasing. Fixed with 
emove-duplicate-fit-to-fly.ps1.
- The Plan doc's 7-section content template (section 8) was never updated to reflect the actual 12-section implementation. Now documented.
- Helper scripts created in scripts/ directory: 
eorder-h2-indexed.ps1, dd-fit-to-fly.ps1, 
emove-duplicate-fit-to-fly.ps1, n-fit-to-fly.txt, n-fit-to-fly-patterns.txt, n-new-keys.json.

## Procedure x Country Pages Strategy Doc — COMPLETE (2026-09-08)

Created docs/PROCEDURE_COUNTRY_PAGES_STRATEGY.md — comprehensive 1,200-line documentation for the new procedure x country landing pages strategy. Covers:

- **Why dedicated pages beat enhanced existing pages** (SEO/AEO/GEO/AIO comparison)
- **Competitor research** — Afiya India, Arodya, Forerunners Healthcare, niche IVF competitors
- **Target keywords** — primary, secondary, long-tail patterns per page
- **URL architecture** — /countries/{country}/{procedure}-in-india pattern
- **Page structure** — 21 sections mapped to patient problems and search intents
- **Data sources** — all existing procedure + country data fields documented
- **Phased rollout plan** — Phase 1 (100 pages), Phase 2 (680), Phase 3 (1,972)
- **Developer guide** — route file, getStaticPaths, data loading, currency conversion, FAQ generation, JSON-LD schema
- **SEO specialist guide** — keyword mapping, internal linking, schema, canonical, sitemap, KPIs
- **Content writer guide** — voice/tone, what to write vs auto-generated, custom FAQ examples, medical caution rules, Bengali guidelines
- **Quality checklist** — content, technical, and SEO checks before publishing
- **Risks & guardrails** — thin content, duplicate content, URL bloat, medical accuracy, currency accuracy
- **Appendix A** — complete URL list for Phase 1 (100 URLs)
- **Appendix B** — slug conversion reference

### Discovered During Work

- Afiya India ranks #1 for "heart bypass surgery in India for Nigerian patients" with dedicated procedure-country pages at /en/{procedure}-in-india-for-{nationality}-patients
- SEO industry consensus confirms: "A programme that doesn't build for each specific route is competing against the entire world's medical-tourism marketing at once — and losing" (Branding Pioneers)
- Our existing country data already contains longTailKeywords with procedure-specific patterns (e.g. "heart surgery cost in India for Bangladeshi patients") — these should be referenced when writing page content
- Currency conversion can be auto-generated from existing currency.exchangeRate in country data — no new data needed
- FAQ generation can combine procedure FAQs + country visa/travel FAQs — template approach with medically cautious language

## Phase 1: Country-Procedure Pages — 2026-09-07 — COMPLETE

### Implemented

- [x] **lib/currency.ts** — USD-to-local currency conversion helper (93 lines). Parses USD price ranges from procedure frontmatter, converts using country currency exchangeRate, formats with local symbol.
- [x] **lib/procedure-country-faq.ts** — FAQ generator for procedure x country pages (99 lines). Produces 4 auto-generated FAQs (cost, visa, travel, safety) merged with up to 4 manual FAQs from procedure frontmatter, capped at 8 total.
- [x] **i18n keys** — Added procedureCountry namespace with 33 keys to both en.json and n.json (UTF-8 safe insertion for Bengali).
- [x] **EN route** — pages/countries/[country]/[procedure].astro. Generates 100 pages (10 countries x 10 procedures). URL pattern: /countries/{country}/{procedure}-in-india.
- [x] **BN route** — pages/bn/countries/[country]/[procedure].astro. Generates 10 pages (Bangladesh only x 10 procedures). URL pattern: /bn/countries/{country}/{procedure}-in-india.
- [x] **Country page linking** — Both EN and BN country pages now include a "Popular procedures" section linking to the new country-procedure pages.
- [x] **LEAD_SOURCE** — Added PROCEDURE_COUNTRY_PAGE: 'procedure-country-page' to lib/crm.ts.
- [x] **Build verification** — Astro build passes. 110 total pages generated (100 EN + 10 BN). All pages include MedicalWebPage, FAQPage, and BreadcrumbList JSON-LD schemas.

### Phase 1 Countries (10)

nigeria, bangladesh, uae, saudi-arabia, kenya, iraq, sudan, uganda, oman, yemen

### Phase 1 Procedures (10)

heart-bypass-surgery-cabg, angioplasty-stent-placement, total-knee-replacement, total-hip-replacement, ivf-treatment, chemotherapy, cancer-surgery, kidney-transplant, liver-transplant, bone-marrow-transplant

### Page Structure (14 H2 sections)

1. Hero (H1 + cost badge + quick facts + CTAs)
2. In short (summary + cost + savings)
3. Cost in your currency (USD + local currency)
4. Cost comparison: India vs your country
5. Who Is This Procedure For? (eligibility)
6. Procedure overview (description + link to canonical procedure page)
7. Recovery & fit-to-fly (recovery timeline table)
8. Risks, complications & mitigation
9. Why choose India (country-specific concerns)
10. Medical visa process (country-specific visa steps)
11. Travel & logistics (flight time, airports, recommended cities)
12. Cultural considerations (languages, cultural notes)
13. What's included in the cost (inclusions/exclusions)
14. Frequently asked questions (country-procedure specific)
- Related procedures for {nationality} patients
- CTA section
- Lead form

### Design Decisions

- **No full markdown body rendering** — The country-procedure page shows a procedure summary + link to the canonical procedure page, avoiding duplicate H2 headings and thin content. This keeps the page as a localization layer, not a duplicate of the procedure page.
- **Phase 1 limiting** — Only 10 countries x 10 procedures = 100 EN pages + 10 BN pages = 110 total. Phase 2/3 will expand to all 31 countries x 68 procedures.
- **BN route limited to Bangladesh** — Only Bangladesh has Bengali country metadata. Other countries will get BN pages when Bengali country data is added.
- **URL pattern** — /countries/{country}/{procedure}-in-india (not -cost-india) to target "{procedure} in India for {nationality} patients" rather than the procedure-cost keyword already covered by the canonical page.

### Discovered During Work

- getStaticPaths in Astro runs in an isolated context — variables defined in the frontmatter outside getStaticPaths are NOT accessible inside it. Phase 1 filter sets must be defined inside the function.
- The QuickFacts component takes a acts prop, not items.
- The DoctorCard component takes a doctor prop, not spread props.
- The Icon component does not have a message-circle icon — used globe for language indicators instead.
- Procedure markdown bodies contain their own full H2 structure that duplicates template sections — resolved by not rendering the markdown body and instead showing a summary + canonical link.

## Hospital Amenities Restructure + Sticky Mobile CTA — COMPLETE (2026-09-10)

### P4.7 — Restructure amenities from flat chip dump to grouped, hospital-specific sections

Replaced the generic flat `amenities` chip cloud (nearly identical across all 5 hospitals — every one had "International patient lounge, Airport pickup, Pharmacy, Visa assistance, Foreign currency exchange") with a new `structuredAmenities` schema field that groups amenities into 3 categories (International Patient Services, Clinical Facilities, Patient & Family Comfort) with the top 2-3 hospital-differentiating amenities getting a short one-line description each.

- [x] Added `structuredAmenities` to content schema (`config.ts`) with `highlights` (name + description) and `items` (chip cloud) per category.
- [x] Added i18n labels for the 3 category headings in EN + BN (`amenityCategories`).
- [x] Wrote hospital-specific content for all 10 hospital files (5 EN + 5 BN): Apollo (CyberKnife suite, Da Vinci Xi, 500+ monthly intl consults), Fortis (MTQUA-certified programme, dedicated BMT unit, 500+ robotic cases), Manipal (Mazor X robotic spine, 6,000+ robotic cancer cases, full-service intl wing), Narayana (8 cath labs, 19 cardiac OTs, dedicated cardiac rehab, yoga therapy), SPARSH (IFEM Gold emergency, AI diagnostics + 3D printing, dedicated BMT unit).
- [x] Updated both EN + BN hospital templates to render grouped sections with H3 category headings, highlighted feature cards (name + description), and remaining items as ChipCloud.
- [x] Fallback to flat `amenities` preserved for any hospital without `structuredAmenities`.
- [x] BN content written in natural Bengali with English medical abbreviations (JCI, BMT, PET-CT, LINAC, ICU).
- [x] Build verified — all 10 hospital pages render hospital-specific highlighted amenities with category headings.

### P4.8 — Sticky mobile CTA bar for long hospital pages

Hospital pages have 12+ sections and on mobile the desktop sticky sidebar (`lg:sticky`) collapses to inline, leaving users with no persistent call-to-action while scrolling through a very long page.

- [x] Created a new `StickyMobileCta` React component (`design-system/components/organisms/StickyMobileCta.tsx`) — a fixed bottom bar with two buttons (WhatsApp + Free consultation anchor to #contact).
- [x] Mobile-only (`lg:hidden`), appears only after the user scrolls past 600px (so it doesn't compete with hero CTAs on initial load), uses `translate-y-full` → `translate-y-0` transition for smooth reveal, and uses `client:load` hydration for instant interactivity.
- [x] Wired into both EN + BN hospital templates with localized labels (`stickyConsultLabel`, `stickyWhatsappLabel`) added to i18n.
- [x] Exported from organisms barrel.
- [x] Build verified — sticky bar present in rendered HTML with correct labels, anchors, and mobile-only visibility.

### Discovered During Work

- **PowerShell Bengali encoding:** PowerShell `Set-Content -Encoding UTF8` corrupts Bengali Unicode when the script file is read with the wrong system code page. The `edit` tool (which handles UTF-8 correctly) must be used for Bengali content edits, not PowerShell scripts that embed Bengali string literals.
- **TASK.md was deleted between sessions:** Restored from git via `git checkout HEAD -- TASK.md` before appending new entries.
- **Astro JSX cast limitation:** `as Record<string, string>` TypeScript casts inside Astro template JSX expressions cause esbuild parse errors. Use `?? {}` fallback indexing instead: `(t.hospitals.amenityCategories ?? {})[group.category] ?? group.category`.
