# Phase 0 — Foundation Build Order (Platform Team)

> Medical Tourism Website · Astro single-app · Tailwind + CVA · GSAP · i18n (EN + Bangla) · Custom CRM + WhatsApp deep link
>
> **Project root:** `frontend/` (existing folder — use this, do not create another)
>
> **Goal of Phase 0:** the platform trio (Frontend Architect, UI/UX Designer, UI Engineer) build the foundation — tokens, styles, atoms, motion, tooling, CRM plumbing — that feature developers consume in later phases.
>
> **Visual direction:** minimalist, editorial, "tech-first hospital-second" (see *Visual Design Language* below).

---

## Visual Design Language

The reference system is near-monochrome with a single gradient accent used only for conversion moments.

### Color
| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Section background | `--color-cream-100` | `#F3F1EC` | Warm off-white (not cool gray) |
| Surface / cards | `--color-white` / `--color-cream-200` | `#FFFFFF` / `#EDEAE3` | Equipment (white), testimonials/nav pill (cream) |
| Ink (text + primary CTA) | `--color-ink` | `#111111` | Near-black text and solid pill buttons |
| Accent (conversion only) | `--gradient-accent` | `linear-gradient(90deg,#7C3AED,#4F46E5)` | "Book Now", active carousel dot |
| Footer | `--color-ink` | `#0A0A0A` | Black bg + giant white wordmark |

Teal (current primary) and gold/red are **demoted** to secondary/status only.

### Typography
- **Display font:** `General Sans` / `Clash Grotesk` (Fontshare, free) — heavy ~800 weight, tight tracking, oversized centered headlines.
- **Body:** `Noto Sans`; **Bangla:** `Noto Sans Bengali`.
- **Scale additions:** `--text-7xl` (4.5rem), `--text-8xl` (6rem), `--tracking-display` (-0.04em), `--font-weight-display` (800).

### Shape, spacing & motion
- **Radius:** `--radius-card` 1.25rem (rounded-2xl cards) · `--radius-pill` for nav + CTAs.
- **Whitespace:** generous; statement sections are mostly empty space around one bold line.
- **Motion:** smooth section reveals + fast (150ms / `--ease-out-expo`) transitions; nav condenses on scroll; hover-reveal cards (keyboard + touch accessible).

### New components (this direction)
`HeroSection` (full-bleed image + centered overlay + pill CTA) · `StatementSection` · `RevealImageCard` ("Hover for more details") · `EquipmentCarousel` · `TestimonialCarousel` (+ audio variant, gradient dots) · `DoctorCard` (gradient "Book Now" + circular arrow) · `FilterChips` (with scroll arrows) · `FloatingConsultCTA` (persistent black pill) · `Footer` (giant wordmark) · `Navbar` (floating rounded pill, condense-on-scroll).

---

## Team Ownership

| Role | Owns in Phase 0 |
|------|-----------------|
| **Frontend Architect** | Repo scaffold, Astro/Tailwind/i18n config, CI, lint/format, quality gates, folder boundaries |
| **UI/UX Designer** | Design tokens, base/global styles, brand palette, type scale, motion spec, accessibility |
| **UI Engineer** | Atoms → molecules → organisms (CVA), GSAP presets, Storybook, CRM/WhatsApp components |

---

## Build Order (sequential)

### Step 1 — Scaffold the project
- Initialize Astro in `frontend/` with `output: 'hybrid'`.
- Add integrations: React, Tailwind, MDX, Sitemap.
- Configure i18n in `astro.config.mjs` (`locales: ['en', 'bn']`, `defaultLocale: 'en'`).
- Set up TypeScript (`strict: true`), path aliases (`@ds/*`, `@features/*`, `@lib/*`).

### Step 2 — Design tokens + Tailwind preset
- `src/design-system/tokens/tokens.css` — CSS custom properties (color, type, spacing, radius, shadow, motion, z-index).
- `src/design-system/tokens/tailwind.preset.ts` — map tokens into the Tailwind theme.
- `tailwind.config.ts` extends the preset.

### Step 3 — Base / global styles + helper classes
- `src/design-system/styles/base.css` — modern reset, box-sizing, focus-visible, selection.
- `src/design-system/styles/global.css` — body typography, heading rhythm, link states, skip-to-content, `prefers-reduced-motion` base.
- Helper layout classes via `@layer components`: `.container`, `.stack`, `.cluster`, `.grid-auto`, `.center`, `.section-y`, `.visually-hidden`.
- Fonts: `Noto Sans` (Latin) + `Noto Sans Bengali` (Bangla), `font-display: swap`, preloaded.

### Step 4 — Atomic components (CVA master components)
- **Atoms:** `Button`, `IconButton`, `Link`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `FileUpload`, `Badge`, `Tag`, `Avatar`, `Icon`, `Divider`, `Spinner`, `Label`.
- Each uses `class-variance-authority` with variant props (`variant`, `size`, `state`, `full`) mapped 1:1 to Figma variants.
- `cn()` util (`clsx` + `tailwind-merge`) for class composition.

### Step 5 — Molecules & organisms
- **Molecules:** `FormField`, `SearchBar`, `Rating`, `Breadcrumb`, `Stat`.
- **Organisms (journey/lead):** `Navbar`, `Footer`, `StepTimeline` (5-step journey), `TreatmentCard`, `TestimonialSlider`, `FAQAccordion`, `TrustBadges`, `StatCounter`, `CostEstimator`, `LeadForm`, `WhatsAppCTA`, `LanguageSwitcher`.
- **Organisms (visual direction — see Step 12):** `HeroSection`, `StatementSection`, `RevealImageCard`, `EquipmentCarousel`, `TestimonialCarousel`, `FloatingConsultCTA`, `DoctorCard`, `FilterChips`.

### Step 6 — GSAP motion system
- `src/design-system/motion/` — presets: `fadeInUp`, `staggerChildren`, `scrollReveal`, `counterUp`, `heroParallax`, `timelineDraw`, `cardHoverLift`.
- Single `ScrollTrigger` initializer wired via `data-anim="…"` attributes (feature devs write no GSAP code).
- Wrap all motion in `gsap.matchMedia()` respecting `prefers-reduced-motion`.
- Animate only `transform`/`opacity`; `ScrollTrigger` reveals use `once: true`.

### Step 7 — CRM + WhatsApp plumbing
- `src/lib/whatsapp.ts` — builds `https://wa.me/<number>?text=<prefilled>` deep links.
- `src/lib/crm.ts` — `submitLead(payload)` interface abstracting the custom CRM API.
- `src/pages/api/lead.ts` — server endpoint: validate with `zod`, forward to CRM using server-only `CRM_API_KEY`.
- `.env.example` documenting `CRM_API_URL`, `CRM_API_KEY`, `PUBLIC_WHATSAPP_NUMBER`.

### Step 8 — i18n wiring
- `src/i18n/en.json`, `src/i18n/bn.json` string catalogs.
- Locale-aware routing + `LanguageSwitcher` that preserves the current path.
- Content collections split per locale (`content/en/…`, `content/bn/…`).

### Step 9 — Storybook (design ↔ code contract)
- Configure Storybook for Astro/React.
- Story per atom/molecule/organism with full variant matrices.

### Step 10 — Quality gates & CI
- ESLint + Prettier; lint rule enforcing `design-system/*` never imports `features/*`.
- Vitest (unit), Playwright (E2E: `LeadForm` + estimator), Lighthouse-CI + axe (perf/a11y budgets).
- GitHub Actions: install → lint → test → build → preview deploy (Vercel/Netlify).

### Step 11 — Home page (foundation validation)
- Assemble hero, 5-step `StepTimeline`, featured treatments, testimonials, FAQ, and CTAs using only design-system components — proves the foundation works end-to-end.

### Step 12 — Visual Design Language Alignment
- Retune `tokens.css` + `tailwind.preset.ts`: cream surfaces, `--color-ink`, `--gradient-accent`, `--radius-card`/`--radius-pill`; demote teal/gold.
- Add display font + `--text-7xl`/`--text-8xl` + `--tracking-display` + `--font-weight-display`.
- `Button`: add `ink` and `gradient` variants.
- Build/ restyle organisms: `HeroSection`, `StatementSection`, `RevealImageCard`, `EquipmentCarousel`, `TestimonialCarousel` (+ audio, gradient dots), `FloatingConsultCTA`, `Navbar` (pill/condense), `Footer` (wordmark).

### Step 13 — Doctors page
- `DoctorCard` (photo, specialty, name, years, degrees, gradient "Book Now", circular arrow badge).
- `FilterChips` row with scroll arrows.
- `/doctors` + `/bn/doctors` routes; responsive 3→1 col grid via `.grid-auto`.

---

## Dependencies / Packages to Install

### Runtime
```bash
# Astro core + integrations
npm install astro @astrojs/react @astrojs/tailwind @astrojs/mdx @astrojs/sitemap

# React
npm install react react-dom

# Styling (Tailwind + CVA)
npm install tailwindcss postcss autoprefixer class-variance-authority tailwind-merge clsx

# Animation
npm install gsap @gsap/react

# Forms, validation, state
npm install react-hook-form zod @hookform/resolvers nanostores @nanostores/react
```

### Dev / tooling
```bash
# TypeScript + types
npm install -D typescript @types/react @types/react-dom

# Lint / format
npm install -D eslint prettier eslint-plugin-astro eslint-plugin-jsx-a11y \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier-plugin-astro prettier-plugin-tailwindcss

# Testing
npm install -D vitest @testing-library/react @testing-library/jsdom jsdom \
  @playwright/test

# Quality budgets
npm install -D @lhci/cli axe-core

# Storybook (run its init after install)
npm install -D storybook @storybook/react @storybook/addon-essentials @storybook/addon-a11y
```

### Fonts
- **Body/Bangla:** `Noto Sans` + `Noto Sans Bengali` via `@fontsource` (self-hosted, recommended).
```bash
npm install @fontsource/noto-sans @fontsource/noto-sans-bengali
```
- **Display (headlines):** `General Sans` or `Clash Grotesk` from Fontshare (free). Self-host the woff2 in `public/fonts/` and load via `@font-face` (not on npm/@fontsource).

---

## Status (as of last sync)

| Step | Status | Notes |
|------|--------|-------|
| 1 Scaffold | ✅ Done | `astro.config.mjs`, aliases, TS strict; output switched to `static` |
| 2 Tokens/preset | ✅ Done | Retuned — cream/ink/gradient-accent, `--radius-card/pill`, 7xl/8xl type scale |
| 3 Base/global styles | ✅ Done | `base.css`, `global.css` |
| 4 Atoms (CVA) | ✅ Done | 17 atoms; `Button` has `ink` + `gradient` variants |
| 5 Molecules/organisms | ✅ Done | Journey set + all 8 visual-direction organisms built |
| 6 GSAP motion | ✅ Done | `presets.ts`, `use-animations.ts` |
| 7 CRM + WhatsApp | ✅ Done | Refactored to direct external API (`PUBLIC_CRM_SUBMIT_URL`), static-safe |
| 8 i18n | ✅ Done | EN + BN JSON (incl. `doctors` key), `/bn/` route, `LanguageSwitcher` |
| 9 Storybook | ✅ Done | All atoms + key organisms have `.stories.tsx` files |
| 10 Quality/CI | ✅ Done | DS-import lint rule scoped to `src/design-system/**`; `.lighthouserc.cjs` added; axe + lhci steps in `ci.yml` |
| 11 Home page | ✅ Done | Restyled to new visual language; uses `HeroSection`, `StatementSection`, `FloatingConsultCTA`, `TestimonialCarousel` |
| 12 Visual language | ✅ Done | Tokens retuned, 8 new organisms built, existing organisms migrated, Navbar + Footer restyled |
| 13 Doctors page | ✅ Done | `DoctorCard` gradient CTA + circular arrow badge; `FilterChips` scroll arrows on mobile |

---

## Environment Variables (`.env.example`)
```env
# Custom CRM
CRM_API_URL=
CRM_API_KEY=            # server-only — never exposed to the client

# WhatsApp (public, used for wa.me deep links)
PUBLIC_WHATSAPP_NUMBER= # e.g. 8801XXXXXXXXX (no + or spaces)
PUBLIC_CONTACT_EMAIL=
```

---

## Definition of Done (Phase 0)
- [x] Astro app builds and runs (`npm run dev` / `npm run build`). *(output: static, no adapter needed)*
- [x] Tokens drive all colors/spacing/type — no hardcoded values in components.
- [x] Tokens retuned to the SuperHealth visual language (cream + ink + gradient accent, display font, 7xl/8xl).
- [x] All atoms exist with CVA variants and Storybook stories.
- [x] `Button` has `ink` + `gradient` variants; `Navbar` (pill/condense) and `Footer` (wordmark) match the reference.
- [x] Visual-direction organisms built: `HeroSection`, `StatementSection`, `RevealImageCard`, `EquipmentCarousel`, `TestimonialCarousel`, `FloatingConsultCTA`.
- [x] Doctors page live with `DoctorCard` + `FilterChips` (EN + BN). `DoctorCard` has gradient CTA + circular arrow; `FilterChips` has mobile scroll arrows.
- [x] GSAP presets work and respect `prefers-reduced-motion`.
- [x] `api/lead.ts` validates and forwards to CRM; WhatsApp deep link works. *(static: direct external API via `PUBLIC_CRM_SUBMIT_URL`)*
- [x] EN + Bangla routing + `LanguageSwitcher` functional.
- [x] Lint, unit, E2E, and Lighthouse budgets pass in CI. DS-import rule scoped; `.lighthouserc.cjs` + axe + lhci steps added.
- [x] Home page renders using only design-system components, in the new visual language.
