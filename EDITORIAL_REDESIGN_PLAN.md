# Editorial Detail-Page Redesign — Reasoning, Solution & Implementation Plan

> Date: 2026-08-07
> Direction approved: **Dark editorial** (variant A), theming (dark/light mode) deferred
> Reference implementation: `frontend/src/pages/doctors/[slug].astro` (en) — already live

---

## 1. Why (the reasoning)

The detail pages (doctor / treatment / hospital) felt "dead" for five structural reasons:

1. **Monotone surfaces** — every section was the same cream card with the same border, radius, and alignment. No contrast = no hierarchy of importance = wandering attention.
2. **No hero moment** — the first viewport was spent on a breadcrumb and small type, while the home page had all the drama.
3. **Walls of prose** — long unbroken markdown with no pull quotes, stats, or media breaks.
4. **Trust signals underweighted** — "25 years experience", "500 beds", "JCI accredited" rendered as `dt/dd` sidebar rows — the weakest visual pattern holding the strongest conversion assets.
5. **Metronome motion** — everything animated with the same `fade-in-up`, making motion invisible.

The fix is a shift from **form layout** to **editorial layout**: one focal point per viewport, cream ↔ ink contrast rhythm, data rendered as objects, faces everywhere, choreographed (varied) motion.

### Constraints (sophistication through restraint)

- No new colors, no new fonts, no new heavy libraries.
- Everything built from existing tokens (`ink`, `cream-*`, gradient accent) and the existing GSAP preset system.
- Reusable section patterns live in the **design system once**, not copy-pasted per page.
- i18n parity: every change ships for **en + bn**.
- SEO/schema (JSON-LD physician, procedure, hospital) must remain intact — redesign is presentational only.

---

## 2. Color strategy — keep or change the violet→indigo gradient?

**Recommendation: KEEP `violet-600 (#7c3aed) → indigo-600 (#4f46e5)`.**

Reasoning:

1. **It is ideal for the dark editorial direction we just chose.** Violet/indigo *glows* on ink backgrounds (hero glows, gradient pills, stat numerals). Teal/green gets murky on dark; amber fights the warm cream base.
2. **Differentiation.** Every hospital and medical-tourism competitor uses clinical blue or teal. Warm cream + ink + one violet accent is distinctive and premium-editorial.
3. **Discipline beats hue.** The system's rule — "gradient is the ONLY color, reserved for conversion moments" — is what makes it feel designed. Changing hue is lateral movement; keeping restraint is the win.
4. **Cost.** The accent is tokenized (`--color-accent-violet`, `--gradient-accent`), so a future re-hue is a ~3-line change. No need to decide under pressure.

If a change is ever made, the only candidate worth considering is a **jewel teal** (`#0f766e → #14b8a6`) for its healthcare/healing semantics — accept the trade-off that it underperforms on dark heroes.

---

## 3. System-level work (build once in the design system)

| Pattern | Where | Purpose |
|---|---|---|
| `StatBand` / stat block | doctor, hospital | Big counted numerals (years, beds, languages) on dark or light |
| `ChipCloud` | doctor (expertise, qualifications, languages), hospital (specialities) | Credentials as scannable objects |
| `QuickFacts` icon chips | treatment hero | Duration / hospital stay / recovery / price pulled out of the sidebar `dl` |
| `PullQuote` | doctor, treatment | Breaks prose walls with an emotional beat |
| `MarqueeStrip` (horizontal scroll) | hospital gallery, accreditations | Replaces sidebar 2-col gallery grid |
| `StepCards` (numbered) | treatment procedures | "What happens" as numbered steps |
| `prose-editorial` styles | all `<Content />` blocks | Larger headings, pull-quote blockquotes, media breaks |
| Motion preset variety | global | Add mask-reveal + image scale-in; reserve `fade-in-up` for secondary content |

---

## 4. Per-page solutions

### 4.1 Doctor detail (en done; bn pending)

- [x] Dark ink hero: large 4:5 portrait, gradient specialty pill, oversized display name, stat row (years / languages / hospital), dual CTAs, qualification chip cloud
- [x] Sticky booking rail (mini portrait + CTAs) beside prose
- [x] Dark mid-page CTA band after the "About" emotional peak
- [ ] Port to `bn/doctors/[slug].astro` (add any missing bn i18n keys)
- [ ] Add optional `expertise: string[]` to doctor schema; migrate `## Field of Expertise` bullet lists from markdown bodies to frontmatter; render as `ChipCloud`
- [ ] Add `PullQuote`: lift the patient-care philosophy sentence from each bio into a styled blockquote between hero and prose
- [ ] Delete `src/pages/preview/` (refined-light prototype)

### 4.2 Treatment detail (en + bn)

- [ ] Category-tinted hero band (keep ink-dark, tint glows per category via a category→hue map on existing tokens)
- [ ] `QuickFacts` chips in hero: duration, hospital stay, recovery, price range — removed from sidebar `dl` (sidebar then holds only related doctors + booking)
- [ ] Procedures list → `StepCards` numbered grid
- [ ] "Meet your specialists" — related doctor face cards moved directly below the hero, above the prose
- [ ] Patient-journey mini timeline (reuse `StepTimeline` molecule)
- [ ] Dark mid-page CTA band (same pattern as doctor page)

### 4.3 Hospital detail (en + bn)

- [ ] Full-bleed hero image with `bg-ink/60` gradient overlay; hospital name + accreditation badges floating on the image
- [ ] Dark `StatBand` under hero: beds / established year / speciality count
- [ ] Gallery → `MarqueeStrip` horizontal scroll (moved out of sidebar)
- [ ] Amenities → `ChipCloud`
- [ ] Doctors-at-hospital grid already uses the new face cards — verify 2-col rhythm on the new page structure

### 4.4 Verification & hygiene

- [ ] Unit tests for new molecules (`ChipCloud`, `StatBand`, `QuickFacts`)
- [ ] Storybook stories for new patterns
- [ ] `npm run test` + `npm run build` green
- [ ] Lighthouse spot-check on one page per type (LCP: hero images need `loading="eager"` + dimensions)
- [ ] Update `TASK.md` statuses

---

## 5. Image assets to source (with generation prompts)

All exports: WebP, quality ~80, strip metadata.

| Slot | File | Spec | Prompt |
|---|---|---|---|
| Doctor hero backdrop ✅ DONE | `/images/patterns/doctor-page-hero.jpg` | 1920×1080, <150KB | "Minimal premium abstract background, deep charcoal black canvas with soft diffused violet and indigo gradient light streaks flowing diagonally, faint fine-line geometric pattern suggesting precision and care, cinematic soft studio lighting, luxury healthcare brand aesthetic, ultra clean, no text, no people, 21:9" |
| Doctor mid-page CTA ✅ DONE | `/images/patterns/doctor-page-cta.jpg` | 1920×800, <150KB | "Warm cinematic photograph, compassionate doctor in white coat gently reassuring a smiling patient, soft golden window light, shallow depth of field, modern premium hospital interior, hopeful calm mood, muted warm tones, editorial healthcare photography, no text, 21:9" |
| Treatment mid-page CTA ✅ DONE | `/images/patterns/treatment-page-cta.jpg` | 1920×800, <150KB | "Cinematic editorial photograph, specialist doctor and patient reviewing a medical scan together on a screen, doctor pointing and explaining with calm confidence, patient listening with visible relief, warm neutral tones with subtle violet accent light, modern premium clinic interior, shallow depth of field, hopeful reassuring mood, no text, faces not looking at camera, 21:9" |
| Hospital mid-page CTA ✅ DONE | `/images/patterns/hospital-page-cta.jpg` | 1920×800, <150KB | "Cinematic editorial photograph, warm hospital care coordinator in smart uniform welcoming an international patient and family at a premium modern hospital reception, genuine smiles, soft golden ambient light, elegant lobby with warm wood and glass, shallow depth of field, reassuring five-star hospitality mood, muted warm tones, no text, faces not looking at camera, 21:9" |
| Treatment heroes (per treatment) ✅ DONE | `/images/treatments/<slug>.webp` (or `.jpg`) | 1600×900, <150KB | Base prompt below + per-slug scene from the table underneath. Auto-detected at build time (wired in both en + bn templates) |

**Treatment hero base prompt:** `"Editorial healthcare photograph for [TREATMENT NAME], [SCENE], shallow depth of field, warm neutral tones with subtle violet accent light, premium hospital environment, calm confident mood, no text, no faces looking at camera, 16:9"`

Per-treatment `[SCENE]` refinements (swap the scene, keep the base):

| Slug | Scene |
|---|---|
| bariatric-weight-loss ✅ | modern consultation room, bariatric surgeon reviewing a report with a patient, operating theatre visible through glass |
| cancer-treatment ✅ | bright infusion therapy suite, comfortable recliner chairs, nurse adjusting IV line, warm window light |
| cardiology ✅ | cardiologist reviewing echocardiogram on a large monitor with a patient, cath lab equipment softly blurred behind |
| cosmetic-surgery ✅ | elegant aesthetic clinic consultation, surgeon discussing treatment plan, soft beauty lighting |
| ear-nose-throat ✅ | ENT examination room, specialist with endoscope examining a patient, modern diagnostic equipment |
| gastroenterology-gi-surgery ✅ | modern endoscopy suite, specialist reviewing scope imagery on monitor |
| infertility-treatment ✅ | hopeful couple in warm consultation with fertility specialist, embryology lab softly blurred behind glass |
| nephrology-kidney-care ✅ | calm dialysis suite, nephrologist checking on a comfortable patient, clean modern equipment |
| neuro-and-spine-surgery ✅ | neurosurgeon reviewing spinal MRI on large screens, navigation equipment in background |
| neurology ✅ | neurologist discussing brain MRI scans with a patient in a warm office |
| ophthalmology ✅ | ophthalmologist performing a slit-lamp eye examination, laser suite softly blurred |
| organ-treatment ✅ | transplant coordinator talking with a patient family in a calm modern hospital lounge |
| orthopedics-surgery ✅ | orthopaedic surgeon showing a joint implant model to a patient, robotic arm blurred behind |
| paediatric-neurology ✅ | child-friendly consultation room, paediatric neurologist gently interacting with a child and parent, warm colours |
| stem-cell-treatment ✅ | scientist in a clean laboratory handling cell culture equipment, soft clinical light |
| urology ✅ | urologist at a robotic surgery console, OR softly blurred through glass |
| Hospital galleries | `/images/hospitals/<slug>-<n>.webp` | 1200×800 each, <120KB | "Architectural photograph, premium hospital [lobby / patient suite / corridor], warm natural light, clean modern design, empty of people, editorial real-estate style, muted warm palette, 3:2" |

Doctor portraits (already in place): `/images/doctors/<slug>.webp` — 4:5 portrait, head-and-shoulders, face in upper third, <100KB.

---

## 6. Execution order

1. **Phase 1 — Doctor page completion** (bn port, expertise chips, pull quote, delete `/preview/`)
2. **Phase 2 — System patterns** (`ChipCloud`, `StatBand`, `QuickFacts`, `PullQuote`, `MarqueeStrip`, `StepCards` + stories/tests)
3. **Phase 3 — Treatment pages** (en + bn)
4. **Phase 4 — Hospital pages** (en + bn)
5. **Phase 5 — Verification & polish**

Out of scope (deferred): dark/light theme switching — the token layer is theme-ready (`darkMode: 'class'` + CSS vars); revisit after this rollout.

---

## 7. Acceptance criteria

- Every detail page type opens with a hero that has exactly one focal point (face / image / name).
- Scrolling any detail page alternates at least once cream → ink → cream.
- No trust signal (years, beds, accreditations, qualifications) is rendered as a `dl` row.
- EN/BN parity on every changed page; JSON-LD unchanged in shape; build + tests green.
