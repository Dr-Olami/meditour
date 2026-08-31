# Testimonial Templates — Pilot Markets

Ready-to-fill templates for the 5 pilot markets (Phase 7.1): **Bangladesh, UAE, Nigeria, Kenya, USA**.

These files live OUTSIDE the content collection on purpose. Astro collects everything under
`src/content/testimonials/`, so files with TODO placeholders would render on the live site.
Fill one in, then move it into the collection to publish it.

## How to publish a testimonial

1. Fill in every `TODO` field below (name, location, quote, and optional media fields).
2. Verify the patient has consented to publishing their name and story publicly.
3. Move the file into the collection:

   ```powershell
   Move-Item .\templates\testimonials\bangladesh-story-1.json .\src\content\testimonials\en\
   ```

4. If a Bengali translation exists, add a mirror file under `src\content\testimonials\bn\`
   with `"locale": "bn"` and the same `targetCountry`.
5. Run `npx astro build` — the story appears automatically:
   - On the matching country page (`/for/{targetCountry}/`) via `getTestimonialsByCountry()`
   - On any page that renders the general testimonial carousel

## Field reference (matches `src/content/config.ts` testimonials schema)

| Field | Required | Notes |
| --- | --- | --- |
| `locale` | yes | `en` here; use `bn` for Bengali mirrors |
| `name` | yes | Patient name as they consented to publish |
| `location` | no | e.g. `Dhaka, Bangladesh` |
| `targetCountry` | no | One of the slugs in `COUNTRY_SLUGS` (config.ts). Controls which country page shows the story |
| `quote` | yes | The patient's own words, as shared |
| `image` | no | Photo URL (only with consent) |
| `video` | no | Video URL |
| `videoDuration` | no | e.g. `1:42` |
| `brandLabel` | no | Campaign label, e.g. `SUPERBIRTH` |
| `relatedTreatmentSlugs` | no | Treatment slugs this story relates to |

## Consent checklist (before moving any file into the collection)

- [ ] Patient (or guardian) has agreed in writing to publish their story
- [ ] Name/photo/video usage is explicitly approved
- [ ] Medical details quoted are accurate to the patient's account
- [ ] No identifying details the patient asked to keep private
