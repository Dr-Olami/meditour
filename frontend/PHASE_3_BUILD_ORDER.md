# Phase 3 — Content & Scale (Feature Team)

> Medical Tourism Website · Astro (static, content collections / optional headless CMS) · i18n (EN + Bangla) · SEO/schema.org
>
> **Project root:** `frontend/` (existing folder)
>
> **Goal of Phase 3:** move from "site with static pages" to "site that scales content and search visibility without a redeploy for every content change" — blog/CMS for SEO and trust content, full i18n coverage, and structured data so Google understands this is a medical business with real doctors, hospitals, and treatments.
>
> **Depends on:** Phase 1 (`doctors`, `hospitals`, `treatments` content collections) and Phase 2 (lead funnel live, so blog CTAs have somewhere real to send traffic).

---

## Business Context (for reference)

This phase doesn't add new patient-facing funnel steps — it compounds the existing ones by (a) bringing in organic search traffic via content (blog posts like "Cost of [procedure] in India vs. [home country]", doctor/hospital spotlight posts) and (b) making sure Google's rich results correctly represent the doctors, hospitals, and treatments already modeled in Phase 1 (`MedicalBusiness`, `Physician`, `MedicalProcedure` schema.org types).

Testimonials already shipped visually in Phase 0/Step 12 (`TestimonialCarousel` + `TestimonialCard` — see `@c:\Users\abdul\Downloads\khan\TASK.md:47`) with hardcoded data in `HomePage.astro`. **Phase 3's testimonial scope is the content pipeline, not the UI** — moving from a hardcoded array to a manageable, translatable content source.

---

## Feature Breakdown

### 3.1 Blog / CMS
- **Decided:** ship Phase 3 on Astro Content Collections (Markdown/MDX in-repo, same pattern as Phase 1's `doctors`/`hospitals`/`treatments`) so the site isn't blocked on a CMS integration. **Payload CMS migration is the confirmed near-term follow-up** — see the dedicated subsection below for compatibility notes and how to keep the migration path clean.
- Content model (`src/content/blog/` collection, whichever backing store):
  ```ts
  {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    author: string;
    publishedAt: Date;
    updatedAt?: Date;
    tags?: string[];           // e.g. "cardiology", "cost-guide", "patient-story"
    relatedTreatmentSlugs?: string[]; // links back to Phase 1 treatments
    locale: 'en' | 'bn';
    body: string;              // MDX/rich text
  }
  ```
- Routes: `/blog` (paginated list, filterable by tag), `/blog/[slug]`, `/bn/blog`, `/bn/blog/[slug]`.
- New organisms: `BlogCard` (list item — image, title, excerpt, tag, date), `BlogPostLayout` (article shell — header, body, author, related treatments/CTA to `LeadForm`).
- Every post ends with a contextual CTA back into the Phase 2 funnel (e.g. "Considering [treatment]? Get a free cost estimate").

### 3.1a Payload CMS migration path (confirmed near-term follow-up)
Payload CMS (self-hosted, TypeScript, Node/MongoDB or Postgres) is a strong fit for this content mapping — its **Collections** concept maps almost directly onto what's already built:

| Current (Content Collections) | Payload equivalent | Notes |
|---|---|---|
| `doctors` collection, `hospitalId: string` FK | `doctors` collection, `hospital` field of type `relationship` → `hospitals` | Payload relationship fields enforce referential integrity in the admin UI — a good fit for the doctor↔hospital 1:1 rule from Phase 1 |
| `hospitals` collection | `hospitals` collection | Direct mapping; `gallery`/`amenities` array fields map to Payload `array` field type |
| `treatments` collection, `relatedDoctorSlugs?: string[]` | `treatments` collection, `relatedDoctors` field of type `relationship` (`hasMany`) | |
| `blog` collection, `locale: 'en' \| 'bn'` | Payload's built-in **Localization** feature (per-field or per-document locales) | Preferable to a manual `locale` enum field — replaces the ad-hoc EN/BN duplication pattern used in `src/i18n/*.json` for structured content (not UI strings) |
| `testimonials` collection | `testimonials` collection | Direct mapping; `image`/`video` map to Payload's `upload` field type (built-in media library — also solves the Phase 2 report-storage deferral if reused for that later) |

- Astro consumes Payload via its REST or GraphQL API (Payload runs as its own Node app/admin panel; Astro fetches at build time for SSG or on-demand if a page's `output` mode is switched to server-rendered).
- **Recommendation to ease the migration:** keep Phase 1/3 Zod schemas flat (explicit `*Id`/`*Slug` relationship fields, not nested objects) — this was already called out as a recommendation in `PHASE_1_BUILD_ORDER.md`'s Open Questions. Flat, relationship-explicit schemas translate to a straightforward Payload `collections.config.ts` definition and a scriptable one-time data migration (export current Markdown/YAML → POST into Payload's REST API) rather than a schema redesign.
- **Not resolved yet:** hosting/infra for Payload itself (needs a persistent Node server + database, unlike the current fully-static Astro deploy) and exact migration trigger/timing — flag as a follow-up decision once Phase 3 content volume or editorial-workflow pain justifies the infra investment.

### 3.2 Testimonials — content pipeline (not new UI)
- Move testimonial data (`name`, `location`, `quote`, `image`, `video?`, `brandLabel?`) out of the hardcoded array in `@c:\Users\abdul\Downloads\khan\frontend\src\components\HomePage.astro` into a `src/content/testimonials/` collection — same shape as the existing `TestimonialItem` type in `@c:\Users\abdul\Downloads\khan\frontend\src\design-system\components\molecules\TestimonialCard.tsx`.
- Add `locale` field so EN and BN testimonials can differ (currently only EN copy exists on Home).
- Optionally tag testimonials with `relatedTreatmentSlugs` so a Treatment detail page (Phase 1) can show only relevant testimonials instead of the generic Home carousel.
- **No changes needed** to `TestimonialCarousel`/`TestimonialCard` components themselves — they already accept a generic `items` array; this is purely a data-source swap.

### 3.3 Full i18n Coverage
- Audit every string introduced in Phase 1 and Phase 2 (treatments, hospitals, doctor detail copy, cost estimator disclaimer, report upload labels, lead form new fields) and ensure `bn.json` has parity with `en.json` — currently `bn.json` is larger than `en.json` (4325 vs 2257 bytes per file listing), suggesting drift already exists and should be reconciled, not just extended.
- Blog content: decide whether every post needs a Bangla translation at publish time, or whether Bangla posts are a curated subset (recommend the latter to avoid blocking content velocity — see Open Questions).
- Add a `locale` fallback strategy: if a blog post has no `bn` version, `/bn/blog/[slug]` should either 404 gracefully or redirect to the EN version with a "not yet translated" notice — decide and implement consistently.

### 3.4 SEO / schema.org Structured Data
- `MedicalBusiness` JSON-LD on the homepage / global layout (name, address if applicable, medical specialties, `sameAs` social links).
- `Physician` JSON-LD on each `/doctors/[slug]` page (name, medical specialty, affiliated hospital via `worksFor`).
- `MedicalProcedure` JSON-LD on each `/treatments/[slug]` page.
- `Hospital` (schema.org type, extends `MedicalOrganization`) JSON-LD on each `/hospitals/[slug]` page.
- `BlogPosting`/`Article` JSON-LD on each blog post.
- `BreadcrumbList` JSON-LD site-wide for detail pages (Doctor/Hospital/Treatment/Blog).
- Sitemap: confirm `@astrojs/sitemap` (already in Phase 0 deps) picks up all new dynamic routes (`[slug]` pages) — verify `getStaticPaths` coverage, not just top-level routes.
- Open Graph + Twitter Card meta on every page type (blog posts especially need `og:image` from `coverImage`).
- `robots.txt` review — ensure `/bn/` locale routes aren't accidentally excluded.

### 3.5 Performance/Scale considerations
- With blog + doctors + hospitals + treatments all as content collections, confirm static build time stays reasonable (Astro SSG rebuilds on every content change unless moved to on-demand rendering for the blog specifically — worth reconsidering `output` mode for `/blog/*` only if content volume grows large).
- Image optimization: ensure blog cover images and doctor/hospital photos go through Astro's `<Image />` component (if not already) for responsive sizing — audit current `<img>` usage in `DoctorCard`, `HospitalCard`, `TestimonialCard` for opportunities.

---

## Build Order (sequential)

### Step 1 — Testimonials content migration
- Create `src/content/testimonials/` collection, migrate existing Home data, update `HomePage.astro` to read from collection instead of inline array. (Lowest-risk, do first to validate the content-collection pattern before blog.)

### Step 2 — Blog content model + routes
- `src/content/config.ts` blog schema, `BlogCard`/`BlogPostLayout` organisms + Storybook stories, `/blog`, `/blog/[slug]`, `/bn/blog*` routes.
- Keep schemas flat/relationship-explicit per the Payload migration recommendation (3.1a).
- Seed 3–5 real posts (at least one cost-guide, one treatment spotlight, one patient-story style) to validate the template before scaling content production.

### Step 3 — i18n audit & reconciliation
- Diff `en.json`/`bn.json` key-by-key; fill gaps introduced by Phase 1/2; document the locale-fallback strategy for blog (3.3) in `TASK.md`.

### Step 4 — Structured data
- Add JSON-LD per page type (3.4), verify with Google's Rich Results Test tool per page type.
- Verify sitemap includes all dynamic slugs; verify `robots.txt`.

### Step 5 — Performance pass
- Audit build times, image handling; adjust rendering mode for blog only if needed (3.5).

### Step 6 — Payload CMS scoping (not a build step yet)
- Once Step 1–5 content is live, produce a short infra/hosting proposal for Payload (per 3.1a's open hosting question) before committing to a migration timeline. This step produces a decision doc, not code.

---

## Open Questions (resolve before/at start of Phase 3)

1. **Bangla content velocity:** Should every blog post launch bilingually, or is Bangla a curated subset published on a delay? This affects both the content schema's fallback logic and the team's ongoing workload.
2. **Address/schema data:** Does the business have a physical office address to expose in `MedicalBusiness` JSON-LD, or is it purely a facilitator with no public physical location (common for medical tourism brokers)? Affects whether `address` is included or omitted from structured data.
3. **Blog authorship:** Single "Khan Meditour Team" byline, or named authors (doctors themselves contributing posts)? Affects the `author` field design and whether an `Author`/`Physician` schema link-up is worth building.
4. **Payload hosting/infra:** Payload requires a persistent Node server + database (MongoDB or Postgres) — a departure from the current fully-static Astro deploy. Needs a hosting decision (e.g. Railway/Render for Payload + keep Astro static, or move Astro to hybrid/server rendering) before the migration in 3.1a can be scheduled.

---

## Definition of Done (Phase 3)
- [ ] Testimonials sourced from `src/content/testimonials/` collection, no hardcoded array remaining in `HomePage.astro`.
- [ ] Blog live at `/blog` + `/blog/[slug]` (+ `/bn/blog*` per the resolved translation strategy) with `BlogCard`/`BlogPostLayout` organisms and Storybook stories.
- [ ] `en.json`/`bn.json` reconciled — no missing keys either direction; locale-fallback behavior for untranslated blog posts implemented and documented.
- [ ] JSON-LD structured data present and validated (Rich Results Test) for: `MedicalBusiness` (site-wide), `Physician` (doctor pages), `Hospital` (hospital pages), `MedicalProcedure` (treatment pages), `Article`/`BlogPosting` (blog posts), `BreadcrumbList` (all detail pages).
- [ ] Sitemap covers all dynamic `[slug]` routes; `robots.txt` doesn't block `/bn/`.
- [ ] Open Graph/Twitter Card meta present on every page type, blog posts include `og:image`.
- [ ] Build time and image delivery audited; any necessary rendering-mode changes for the blog documented and applied.
- [ ] Payload CMS hosting/infra proposal written (per Open Question #4) so the migration in 3.1a can be scheduled as a follow-up phase.
