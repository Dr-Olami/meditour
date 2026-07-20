# Meditour

> Medical tourism facilitator platform connecting Bangladeshi patients with healthcare providers in India.

**Meditour** is a bilingual (English + Bangla) medical tourism website built with [Astro](https://astro.build/) and [React](https://react.dev/). It helps patients discover treatments, doctors, and hospitals, estimate costs, and start their care journey through WhatsApp or a lead form.

## Features

- Bilingual content routing (`/en` default + `/bn` locale)
- Content collections for doctors, hospitals, treatments, testimonials, and blog posts
- GSAP-powered scroll animations, parallax, and micro-interactions
- Lead capture form with server-side validation and CRM forwarding
- WhatsApp deep-link CTAs with contextual message builders
- SEO meta, Open Graph, hreflang, and schema.org structured data
- Sitemap generation and Lighthouse budgets

## Tech Stack

- **Framework:** Astro 4 (hybrid output)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3 + custom design tokens
- **Animation:** GSAP + ScrollTrigger
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel (`@astrojs/vercel/serverless`)
- **Testing:** Vitest + React Testing Library

## Project Structure

```
khan/
├── frontend/          # Astro + React application
│   ├── src/
│   │   ├── components/      # Astro page components
│   │   ├── content/         # Content collections (doctors, hospitals, etc.)
│   │   ├── design-system/   # Atoms, molecules, organisms, motion engine
│   │   ├── i18n/            # EN + BN translations
│   │   ├── layouts/         # Root Astro layout
│   │   ├── lib/             # Utilities, schema, CRM, WhatsApp helpers
│   │   └── pages/           # Astro routes
│   ├── tests/               # Unit tests
│   ├── scripts/             # Sitemap generator
│   └── vercel.json          # Vercel build settings
└── README.md
```

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:4321`.

## Build & Test

```bash
cd frontend
npm run lint      # ESLint
npm test          # Vitest unit tests
npm run build     # Astro build + sitemap
```

## Deployment

### Vercel CLI

```bash
cd frontend
vercel login
vercel
```

### Environment Variables

Add these in the Vercel dashboard:

- `CRM_API_URL` — endpoint for lead forwarding
- `CRM_API_KEY` — server-only CRM API key
- `PUBLIC_WHATSAPP_NUMBER` — WhatsApp number for deep links
- `PUBLIC_CONTACT_EMAIL` — contact email displayed on the site

See `frontend/.env.example` for details.

### GitHub Actions

A deployment workflow is provided at `frontend/.github/workflows/deploy.yml`. Add these repository secrets to enable auto-deploy on push:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## License

Private — Khan Meditour.
