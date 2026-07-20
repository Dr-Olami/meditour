# Phase 1 — Core Pages (Feature Team)

> Medical Tourism Website · Astro single-app · Tailwind + CVA · GSAP · i18n (EN + Bangla)
>
> **Project root:** `frontend/` (existing folder)
>
> **Goal of Phase 1:** feature developers consume the Phase 0 design system to ship the core informational/browsing surface — Home, How It Works, Treatments, Doctors, and Hospitals — with real content models and detail pages. No payment or conversion logic yet (that's Phase 2); this phase is about **discovery and trust-building**.
>
> **Depends on:** Phase 0 foundation (tokens, atoms, `Navbar`, `Footer`, `DoctorCard`, `TreatmentCard`, `StepTimeline`, `FilterChips`, `TestimonialCarousel`, i18n plumbing). All new pages must be built **only** from `design-system/*` components — no one-off styling in page files.

---

## Business Context (for reference)

Khan Meditour is a medical tourism facilitator: patients abroad share reports, get matched with a doctor/hospital **in India** (confirmed), receive a treatment plan + cost estimate, and get help with visa, flights, hotel, and airport transfer. Coordinators support the patient through treatment, recovery, and follow-up.

- **Resolved:** destination is India. `src/i18n/en.json`/`bn.json` previously referenced Bangladesh (`site.tagline`, `site.description`, `hero.subtitle`) — already corrected. **Action for this phase:** seed `doctors`/`hospitals` content with real Indian hospital/doctor names (the placeholder seed data in `doctors.astro`, e.g. "Dhaka Heart Institute", is Bangladesh-flavored and must be replaced, not just re-shaped, when migrating to the content collection).

### The 5-Step Journey (canonical copy — replaces placeholder `steps.items` in `en.json`/`bn.json`)

| # | Step | What happens | Timeframe |
|---|------|--------------|-----------|
| 1 | Share Your Medical Reports | Patient sends diagnosis, test results, scans, or doctor's notes via WhatsApp or email. No reports yet? We help figure out what's needed. | ~5 minutes |
| 2 | Receive Expert Medical Opinion | Medical team reviews the case, connects patient with a specialist for consultation (video call or written report). Free, no obligation. | 24–48 hours |
| 3 | Get Treatment Plan & Cost Breakdown | Personalised plan: hospital, doctor/surgeon, procedure dates, full cost estimate, no hidden charges. | 3–5 days |
| 4 | Travel — We Handle Everything | Visa assistance, flight guidance, hotel booking, airport pickup, hospital admission. Coordinator with patient in-person + WhatsApp. | Prepared in advance |
| 5 | Treatment, Recovery & Follow-Up | Treatment at matched hospital; post-return video-call follow-up with coordinator + doctor. | Ongoing |

- **Action:** Replace `src/i18n/en.json` → `steps.items` (and `bn.json` equivalent) with these 5 steps (title + description + `duration` field — **new field**, `StepTimeline` needs a `duration?: string` prop added to render the "⏱" timeframe).

### Doctor ↔ Hospital Relationship
- **One doctor maps to exactly one hospital** (not many-to-many). Model doctors with a `hospitalId` foreign key, not a free-text `hospital` string.
- Doctor card → click → doctor detail page. Hospital card → click → hospital detail page. Hospital detail page lists its doctors (reverse lookup by `hospitalId`).

### Treatments (canonical list — replaces any ad-hoc treatment arrays)
Cardiology · Cancer Treatment · Bariatric (Weight Loss) · Organ Treatment · Neuro and Spine Surgery · Ophthalmology · Infertility Treatment · Orthopedics Surgery · Stem Cell Treatment · Urology · Ear Nose Throat · Cosmetic Surgery

---

## Content Model (Astro Content Collections)

Add `src/content/config.ts` collections (Zod-validated, per-locale where noted):

```ts
// doctors
{
  slug: string;            // url segment, e.g. "dr-anisur-rahman"
  name: string;
  specialty: string;       // must match one of the Treatments list above
  hospitalId: string;      // FK → hospitals collection, 1:1
  qualification: string;
  experienceYears: number;
  avatar?: string;
  bio: string;             // long-form, for detail page
  languages?: string[];    // spoken languages
}

// hospitals
{
  slug: string;
  name: string;
  city: string;
  country: string;
  description: string;     // long-form, for detail page
  accreditations?: string[]; // e.g. "JCI Accredited"
  image?: string;
  gallery?: string[];
  amenities?: string[];    // e.g. "24/7 pharmacy", "International patient lounge"
}

// treatments
{
  slug: string;
  name: string;             // one of the 12 canonical names above
  category?: string;
  description: string;
  fromPrice?: string;
  procedures?: string[];    // sub-procedures under this treatment
  relatedDoctorSlugs?: string[];
  image?: string;
}
```

- Existing `TreatmentCard`, `DoctorCard` components already match most of this shape — extend `Doctor` interface in `@/design-system/components/organisms/DoctorCard.tsx` to replace `hospital?: string` with `hospitalName: string` (resolved at page-build time from `hospitalId`) and keep `href` pointing at `/doctors/[slug]`.
- Seed content as Markdown/YAML frontmatter files initially (no CMS yet — that's Phase 3). One file per doctor/hospital/treatment under `src/content/doctors/`, `src/content/hospitals/`, `src/content/treatments/`.

---

## Build Order (sequential)

### Step 1 — Content collections & schema
- `src/content/config.ts` — define `doctors`, `hospitals`, `treatments` collections with Zod schemas above.
- Seed real content: 6+ doctors (reuse existing seed data in `doctors.astro`, add `hospitalId` + `slug` + `bio`), 3+ hospitals, all 12 treatments.
- Remove hardcoded `doctors` array from `src/pages/doctors.astro`; read from `getCollection('doctors')` instead.

### Step 2 — How It Works page/section
- Update `src/i18n/en.json` + `bn.json` → `steps.items` with the 5-step canonical copy (title, description, duration).
- Add `duration?: string` prop to `StepTimeline` (`@/design-system/components/organisms/StepTimeline.tsx`) rendering a small "⏱ {duration}" line under the description.
- Promote `/​#steps` section on Home into its own dedicated `/how-it-works` route for direct linking/SEO, while keeping a condensed version embedded in Home.

### Step 3 — Treatments page (`/treatments`, `/bn/treatments`)
- List all 12 canonical treatments as a responsive grid (`TreatmentCard`), sourced from the `treatments` collection.
- `FilterChips` for category grouping if categories are added later (optional this phase).
- `/treatments/[slug]` detail page: hero, long description, sub-procedures list, "related doctors" grid (via `relatedDoctorSlugs`), CTA to `LeadForm`/WhatsApp.

### Step 4 — Doctors page enhancements (`/doctors`, `/bn/doctors`)
- Already exists; migrate data source to `getCollection('doctors')` with `hospitalId` resolved to hospital `name`/`slug` for display.
- `DoctorCard` becomes a link wrapper (`href="/doctors/[slug]"`) — verify whole card is clickable, not just the CTA pill.
- `/doctors/[slug]` detail page: avatar, name, specialty, qualification, experience, bio, linked hospital card (photo + name + link to `/hospitals/[slug]`), booking CTA (`LeadForm` pre-filled with doctor name, or WhatsApp deep link).

### Step 5 — Hospitals page (new, `/hospitals`, `/bn/hospitals`)
- New `HospitalCard` organism (mirror `DoctorCard` visual style): image, name, city/country, accreditation badges, "View hospital" CTA.
- `/hospitals` — responsive grid of all hospitals.
- `/hospitals/[slug]` detail page: hero image/gallery, description, amenities list, accreditations, **list of doctors at this hospital** (reverse lookup by `hospitalId`, rendered with `DoctorCard`).

### Step 6 — Home page integration
- Ensure Home's treatments section pulls from the real `treatments` collection (not the placeholder array) and testimonials keep using the Phase-0 `TestimonialCarousel`.
- Add a "Meet our specialists" teaser (3–4 `DoctorCard`s) and/or "Our partner hospitals" teaser linking to the new pages.
- Update `Navbar`/`Footer` nav links across all pages to include `Doctors`, `Hospitals`, `Treatments`, `How it Works` consistently (currently only `doctors.astro` has the `Doctors` link).

### Step 7 — i18n parity
- Every new page (`/treatments`, `/hospitals`, `/how-it-works`, and all `[slug]` detail pages) must have a `/bn/...` equivalent route, following the existing `/bn/doctors` pattern.
- Add missing i18n keys: `treatments.detail.*`, `hospitals.*`, `doctors.detail.*`, `howItWorks.*` (dedicated page copy vs. the existing condensed `steps.*`).

### Step 8 — SEO basics for new pages
- `<Layout title description>` per page/detail page using real content (doctor name + specialty, hospital name + city, treatment name).
- Canonical URLs + `hreflang` alternates between `/en` and `/bn` variants (if not already handled globally in `Layout.astro` — verify).

---

## New/Extended Components

| Component | Type | Notes |
|-----------|------|-------|
| `HospitalCard` | organism (new) | Mirrors `DoctorCard` styling: image, name, location, accreditation tags, CTA |
| `StepTimeline` | organism (extend) | Add optional `duration` field per step |
| `DoctorCard` | organism (extend) | Replace free-text `hospital` with resolved `hospitalName` + `hospitalHref`; ensure full-card click-through |
| `TreatmentCard` | organism (reuse) | No changes expected — already supports `href` for detail navigation |

All new/extended components need Storybook stories per Phase-0 convention (Step 9 there).

---

## Open Questions (resolve before/at start of Phase 1)

1. **Content source of truth:** Phase 1 uses static Astro content collections (Markdown/YAML). Confirmed acceptable for now — Phase 3 plans a migration to Payload CMS (see `PHASE_3_BUILD_ORDER.md`). **Recommendation:** design the `doctors`/`hospitals`/`treatments` Zod schemas in this phase to mirror Payload's collection/field/relationship model closely (flat fields + explicit relationship IDs like `hospitalId`, not nested objects) so the Phase 3 migration is closer to a data export/import than a re-modeling exercise.
2. **Doctor "booking":** Is "book" a real appointment booking (calendar/slot selection) or just a lead-capture form that a human coordinator follows up on? Assumed the latter for Phase 1 (matches existing `LeadForm`/WhatsApp pattern); real-time slot booking would be a larger Phase 2+ feature.

---

## Definition of Done (Phase 1)
- [ ] `doctors`, `hospitals`, `treatments` content collections defined and seeded with real data (no placeholder arrays left in `.astro` files).
- [ ] `/treatments`, `/treatments/[slug]`, `/hospitals`, `/hospitals/[slug]`, `/doctors/[slug]`, `/how-it-works` routes live in EN + BN.
- [ ] Doctor ↔ Hospital 1:1 relationship enforced in content schema and rendered correctly both directions (doctor page shows its one hospital; hospital page lists all its doctors).
- [ ] `HospitalCard` built with Storybook story, matching visual language of `DoctorCard`.
- [ ] `StepTimeline` renders the 5 canonical steps with duration; Home's condensed "How it works" and the dedicated `/how-it-works` page both use the same i18n source.
- [ ] All new pages built exclusively from `design-system/*` components; DS-import lint rule still passes.
- [ ] `Navbar` links consistent across every page (Home, Treatments, Doctors, Hospitals, How it Works, FAQ).
- [ ] Lighthouse/a11y budgets from Phase 0 CI still pass on new pages.
