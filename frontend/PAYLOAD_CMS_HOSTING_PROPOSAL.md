# Payload CMS Hosting Proposal — Khan Meditour

## Decision needed

Phase 3 is being shipped on Astro Content Collections (Markdown/JSON in-repo). This keeps the project unblocked while content volume is low. The next scale milestone is a real CMS so non-developers can publish posts, update doctor/hospital profiles, and manage translations without touching Git.

**Proposed CMS:** Payload CMS (self-hosted, TypeScript, collection/field model that maps cleanly to our existing content collections).

## Why Payload CMS

- **Schema fit:** Payload "Collections" map directly to our `doctors`, `hospitals`, `treatments`, `testimonials`, and `blog` collections.
- **Localization:** Built-in per-field/per-document localization replaces the manual `locale` enum we use in content files.
- **Media library:** Built-in upload collection solves cover images, doctor avatars, hospital galleries, and report storage later.
- **Editor experience:** Rich-text field for blog bodies; relationship fields for doctor↔hospital and treatment↔doctor links.
- **API access:** REST/GraphQL endpoints let Astro consume Payload at build time, preserving static-site performance.

## Recommended architecture

```text
┌──────────────────┐         ┌────────────────────┐         ┌──────────────┐
│  Astro static    │  build  │  Payload CMS       │  admin  │  PostgreSQL  │
│  (frontend)      │  fetch  │  (Node + Express)  │  ────▶  │  + S3/r2     │
└──────────────────┘         └────────────────────┘         └──────────────┘
```

1. **Astro stays static.** Keep `output: 'static'`. At build time, Astro fetches doctors/hospitals/treatments/blog/testimonials from Payload and generates the same routes we have today.
2. **Payload is a separate service.** Host Payload where a persistent Node process and database are supported (Railway, Render, Fly.io, or a VPS).
3. **Database:** PostgreSQL. Easier to host reliably than MongoDB on small/medium managed platforms.
4. **File storage:** Cloudflare R2 or AWS S3 for uploads (images, reports in a later phase).
5. **Preview/draft workflow (optional):** If needed later, switch only `/blog/*` to on-demand rendering or use a preview token; most medical content is publish-and-cache.

## Hosting options compared

| Platform | Payload hosting | Approx. monthly cost | Notes |
|---|---|---|---|
| **Railway** | 1–2 services + Postgres | $20–$60 | Easiest Git-based deploy; good DX; scales vertically |
| **Render** | Web service + Postgres | $20–$55 | Similar to Railway, slightly slower cold starts |
| **Fly.io** | 1 VM + 1 Postgres cluster | $10–$40 | More control, requires more infra knowledge |
| **DigitalOcean App Platform / Droplet** | Node app + managed Postgres | $25–$80 | Predictable pricing, more manual setup |
| **Vercel/Netlify (Payload serverless)** | Not recommended | — | Payload's admin panel and file uploads don't fit serverless constraints well |

**Recommendation:** Start with **Railway** for the lowest-friction path. Move to Fly.io or a DO droplet if cost or compliance (patient-data) requires more control later.

## Migration path from Astro Content Collections

1. **Freeze current schemas.** Keep the flat, relationship-explicit Zod shape used in Phase 1/3 (e.g., `hospitalId`, `relatedDoctorSlugs`, `relatedTreatmentSlugs`). This maps one-to-one to Payload relationship fields.
2. **Export existing Markdown.** Use a Node script to read `src/content/**/*.md` / `*.json` and POST each entry to Payload's REST API, creating media uploads for images.
3. **Update `src/lib/content.ts`.** Replace `getCollection()` calls with typed fetch helpers that call Payload's `/api/{collection}` endpoints. Keep the same return shapes so components/pages don't change.
4. **Switch build trigger.** Instead of rebuilding on every Markdown commit, rebuild when Payload webhooks fire (or on a schedule) and deploy the static site.
5. **Keep a staging Payload instance.** Mirror the production collections for safe content QA before publishing.

## Open questions for the client / team

1. Who will be creating/editing content? (One person vs. multiple editors affects RBAC needs.)
2. Is there a compliance requirement to keep patient-related data in a specific region? (Impacts host choice and whether R2/S3 bucket needs regional residency.)
3. Do we need draft/preview publishing, or is publish-live acceptable?
4. Budget ceiling for monthly infrastructure?
5. Should the migration happen immediately after Phase 3 ships, or after the blog reaches a specific post count?

## Suggested trigger/timing

Migrate to Payload once any of the following is true:

- More than 15–20 blog posts are needed (Markdown workflow becomes painful).
- A non-developer team member needs to publish or translate content.
- Doctor/hospital profiles need frequent updates.

Until then, the Astro Content Collections approach is simpler, cheaper, and easier to back up.
