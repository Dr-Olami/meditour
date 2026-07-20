# Phase 2 — Conversion (Feature Team)

> Medical Tourism Website · Astro (static) + serverless-style external CRM · Tailwind + CVA · react-hook-form + zod
>
> **Project root:** `frontend/` (existing folder)
>
> **Goal of Phase 2:** turn the browsing experience from Phase 1 into actual leads — real cost estimates, a clear medical-report handoff, and a smooth path into the 5-step journey (Step 1: "Share Your Medical Reports" → Step 3: "Get Treatment Plan & Cost Breakdown"). This phase wires the **already-scaffolded** `CostEstimator`, `LeadForm`, and WhatsApp plumbing from Phase 0 to real data. **Report intake v1 is WhatsApp/email handoff, not in-app file upload** — storage infra is intentionally deferred to a future phase (see 2.2).
>
> **Depends on:** Phase 0 (`lib/crm.ts`, `lib/whatsapp.ts`, `CostEstimator`, `LeadForm`, `FormField` molecules) and Phase 1 (treatments content collection, doctor/hospital data for pre-fill context).

---

## Business Context (for reference)

Conversion in this business is **not e-commerce checkout** — it's lead qualification. The funnel is:

1. Patient shares medical reports (or answers "I don't have reports yet") → **Report Intake**
2. Team gives a free expert opinion within 24–48h (human-driven, off-platform)
3. Patient receives a treatment plan + cost estimate within 3–5 days → **Cost Estimator** gives a ballpark up front; the real breakdown is manual/human
4. Patient is guided through visa, flights, hotel, airport pickup → **Logistics Assistance** (mostly informational + WhatsApp handoff in this phase; full booking automation is out of scope)
5. Ongoing coordinator support

So Phase 2's job is: **make it effortless to go from "browsing a treatment/doctor" to "a qualified lead in the CRM with reports attached and a WhatsApp thread started."**

---

## Feature Breakdown

### 2.1 Cost Estimator — wire to real data
Current `CostEstimator` (`@/design-system/components/organisms/CostEstimator.tsx`) takes `treatments: CostEstimatorOption[]` and `accommodations: CostEstimatorOption[]` as props with a `cost: number` field — it's UI-complete but fed by nothing real.

- Source `treatments` options from the Phase 1 `treatments` content collection (`fromPrice` field), not a hardcoded array.
- Add an `accommodations` content source (new small content collection or a simple config file — 3–4 tiers: e.g. "Budget guesthouse", "3-star hotel", "5-star hotel"), each with an estimated per-stay cost.
- Add a **disclaimer** below the total: "This is an estimate only. Your final cost breakdown is confirmed by our medical team within 3–5 days." (ties directly to Step 3 of the journey — must not imply this is a final price).
- On "Get a detailed quote" click: instead of `window.location.assign('/contact')`, either:
  - (a) scroll/route to the Lead Form pre-filled with `treatment` + `estimatedTotal` fields, or
  - (b) open the WhatsApp deep link pre-filled with treatment + estimated total (`getInquiryLink`-style helper, parameterized).
- **Decision needed:** which of (a)/(b) is primary — see Open Questions.

### 2.2 Medical Report Intake (new) — v1: WhatsApp/Email handoff, no in-app storage
Maps directly to Step 1 ("Share Your Medical Reports... via WhatsApp or email... Don't have reports yet? No problem").

- **Decided:** no file-upload/storage infra this phase. `LeadForm` submission surfaces a clear next step instead: "Please send your reports via WhatsApp or email — we'll confirm receipt within a few hours." with both a `mailto:khan@meditour.com` link and a contextual WhatsApp deep link (see 2.4) pre-filled with the patient's name/treatment so the coordinator has context when the files arrive.
- Add a **"I don't have my reports yet"** toggle/checkbox on `LeadForm` that reveals a short "tell us your symptoms/condition" textarea — so patients without paperwork aren't blocked (explicitly promised in the business copy). This does not require storage — it's just an additional text field on the existing form.
- Extend `leadSchema` in `lib/crm.ts` with `hasReports: boolean` and `reportsSharedVia?: 'whatsapp' | 'email' | 'not_yet'` so the CRM/coordinator knows whether to expect an incoming WhatsApp/email attachment.
- **Deferred to a future phase** (not Phase 2, not yet scheduled): direct in-app file upload with presigned storage (S3/Cloudflare R2/Supabase Storage) + `reportUrls?: string[]` on the lead payload. Revisit once WhatsApp/email volume becomes an operational bottleneck for the team.

### 2.3 Lead Form enhancements
`LeadForm` (`@/design-system/components/organisms/LeadForm.tsx`) already has name/email/phone/treatment/message + zod validation + CRM submit. Extend for this phase:

- Add optional pre-fill props: `defaultTreatment?: string`, `defaultDoctor?: string`, `defaultMessage?: string` — so the form can be launched from a Doctor page ("Request appointment with Dr. X"), a Treatment page, or the Cost Estimator with context already filled in.
- Add the "I don't have my reports yet" toggle from 2.2 (reveals a symptoms/condition textarea, sets `hasReports: false`).
- Add a `country`/`preferredContactMethod` (WhatsApp/Email/Call) field — relevant since patients are international and the business explicitly supports WhatsApp-first contact.
- Success state should set clear expectations tied to Step 2, **and** repeat the report-sharing instruction from 2.2 (WhatsApp/email links) so patients know exactly what to do next: "We'll review your case and connect you with a specialist within 24–48 hours. Please send your reports via WhatsApp or email if you haven't already."

### 2.4 WhatsApp Integration — beyond static deep links
Current `lib/whatsapp.ts` only builds a single generic inquiry link. Extend:

- `getDoctorInquiryLink(doctorName: string)`, `getTreatmentInquiryLink(treatmentName: string)`, `getEstimateInquiryLink(treatment, estimatedTotal)` — parameterized pre-filled messages so every CTA across Doctor/Hospital/Treatment/Estimator pages produces a contextual WhatsApp message instead of one generic string.
- Add a persistent, contextual `FloatingConsultCTA` behavior: currently generic — confirm whether it should adapt its WhatsApp message based on the current page (e.g. mentions the treatment/doctor being viewed).
- `WhatsAppCTA` component (`@/design-system/components/organisms/WhatsAppCTA.tsx`) — audit current implementation and standardize on the same message-builder helpers.
- **Done:** `WhatsAppCTA` and `FloatingConsultCTA` now accept an optional `context: WhatsAppContext` prop (`lib/whatsapp.ts`) so callers can request a contextual message (`general` | `doctor` | `treatment` | `estimate`) without building the href themselves. Backward compatible — existing `number`/`message`/`href` props still work when `context` is omitted.
- **Deferred (separate task, not yet scheduled):** retrofit `pages/doctors/[slug].astro` and `pages/treatments/[slug].astro` (+ `bn/` equivalents) to render their WhatsApp CTA via the shared `WhatsAppCTA` component (with `context={{ type: 'doctor'|'treatment', ... }}`) instead of a raw `<a>` styled to match the black-outline `Button` look. **Note:** `WhatsAppCTA`'s `button` variant is a fixed solid-green WhatsApp pill with icon — visually different from the current black-outline CTA on those pages, so this is a deliberate design decision, not a bug fix. Either accept the new look, or add an `outline` visual variant to `WhatsAppCTA` first so the swap is style-neutral.

### 2.5 CRM payload completeness
Extend `leadSchema`/`submitLead` (`lib/crm.ts`) to carry the richer context now available:
```ts
{
  name, email, phone, country, treatment, message, source, // existing
  doctorSlug?: string,
  hospitalSlug?: string,
  estimatedTotal?: number,
  hasReports: boolean,
  reportsSharedVia?: 'whatsapp' | 'email' | 'not_yet',
  preferredContactMethod?: 'whatsapp' | 'email' | 'call',
}
```
- `source` should be set automatically per entry point (`'cost-estimator'`, `'doctor-page'`, `'treatment-page'`, `'general-contact'`) instead of the current default `'website'` for all cases — needed for the team to know which funnel step generated the lead.

---

## Build Order (sequential)

### Step 1 — Extend `lib/crm.ts`
- Add new schema fields (2.5), update `submitLead` if payload shape changes, add per-entry-point `source` values.

### Step 2 — Extend `lib/whatsapp.ts`
- Add parameterized message builders (2.4).

### Step 3 — Wire `CostEstimator` to real data
- Treatments from content collection, accommodation tiers, disclaimer copy, CTA behavior decided in 2.1.

### Step 4 — Extend `LeadForm`
- Pre-fill props, `country`/`preferredContactMethod` fields, "no reports yet" toggle + symptoms textarea, updated success copy with WhatsApp/email report-sharing instructions.

### Step 5 — Wire contextual CTAs across pages
- Doctor detail page → `LeadForm` pre-filled with doctor + WhatsApp deep link mentioning the doctor.
- Treatment detail page → same pattern with treatment context.
- Cost Estimator → CTA per decision in 2.1.

### Step 6 — QA the full funnel
- Manual test: Treatment page → Estimator → Lead Form (pre-filled) → submit with/without reports → CRM receives full payload → WhatsApp/email report-sharing instructions display correctly → WhatsApp fallback works if CRM endpoint fails (existing `submitLead` catch already returns a WhatsApp-suggesting message — verify this still reads correctly with new fields).

---

## Open Questions (resolve before/at start of Phase 2)

1. **Cost Estimator CTA target:** Route to `LeadForm` in-page, or straight to WhatsApp? Business copy emphasizes WhatsApp ("Send us your... via WhatsApp or email") — leaning WhatsApp-first with `LeadForm` as a secondary/alternate option.
2. **CRM payload shape:** Is `PUBLIC_CRM_SUBMIT_URL` (current external CRM) able to accept the extended schema (2.5) as-is, or does the CRM-side schema need to be updated first? This is outside this repo's control — confirm with whoever owns the CRM.
3. **Accommodation cost data:** Who provides real per-night estimates for the 3–4 tiers? Needed before Step 3 can use real numbers instead of placeholders.

---

## Definition of Done (Phase 2)
- [ ] `CostEstimator` uses real treatment pricing from the Phase 1 content collection; accommodation tiers have real (or clearly-labeled placeholder) pricing; disclaimer copy present.
- [ ] `LeadForm` "no reports yet" toggle + symptoms textarea shipped; WhatsApp/email report-sharing instructions shown post-submit (no in-app storage this phase — deferred per 2.2).
- [ ] `LeadForm` accepts pre-fill context (doctor/treatment/estimate) and captures `country` + `preferredContactMethod`.
- [ ] `lib/whatsapp.ts` provides contextual message builders used consistently by `FloatingConsultCTA`, `WhatsAppCTA`, Doctor pages, Treatment pages, and the Estimator.
- [ ] `lib/crm.ts` schema extended and `source` correctly differentiates lead origin.
- [ ] Full funnel manually tested end-to-end (browse → estimate/report → lead submitted → CRM + WhatsApp fallback both verified).
- [ ] New/changed components have Storybook stories; CI (lint/unit/E2E/Lighthouse) still green.
