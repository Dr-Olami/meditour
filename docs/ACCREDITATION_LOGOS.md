# Accreditation Logos — Sourcing & Usage Guide

## Context

Hospital pages render accreditation badges in the hero section. The template (`frontend/src/pages/hospitals/[slug].astro` and `frontend/src/pages/bn/hospitals/[slug].astro`) maps accreditation names to logo images via an `accreditationLogos` record. Accreditations without a logo fall back to a text pill.

## Logos currently in `/public/images/accreditations/`

| File | Used by | Status |
|---|---|---|
| `JCI.webp` | Apollo, Fortis, Manipal, Narayana | In use |
| `NABH.webp` | All 5 hospitals | In use |
| `NABL.png` | Fortis, Manipal | In use |

## Accreditations referenced in hospital frontmatter (no logo yet)

| Accreditation | Used by | Logo source | Notes |
|---|---|---|---|
| MTQUA Certified | Fortis | `https://mtqua.org/wp-content/themes/bhavana/images/logo_m.png` | Official MTQUA site logo. Contact MTQUA for permission/brand-quality version. |
| AAHRPP | Manipal | `https://www.aahrpp.org/` — "AAHRPP Accreditation Seal" | Seal shown on AAHRPP site for accredited organisations. Request brand kit from AAHRPP. |
| ISO 9001:2015 | Manipal | **NO LOGO AVAILABLE** | ISO does NOT permit use of its logo for certification publicity. There is no "ISO 9001:2015 logo". Must use the **certification body's** mark (the body that issued Manipal's certificate), not ISO's. Keep as text pill. |
| IFEM Gold Level Certified | SPARSH | `https://assets.nationbuilder.com/ifem/sites/1/meta_images/original/IFEM_Logo_Wording-lockup_RGB-600.png` | Official IFEM logo. IFEM requires logo endorsement application for promotional use — see `https://www.ifem.cc/event_endorsement`. |

## Sourcing action items

1. **MTQUA** — Download `logo_m.png` from mtqua.org, convert to `.webp`, save as `MTQUA.webp`. Email MTQUA to confirm permission for use on a hospital directory page.
2. **AAHRPP** — Visit `https://www.aahrpp.org/`, locate the "AAHRPP Accreditation Seal", request brand-usage permission. Save as `AAHRPP.webp`.
3. **IFEM** — Download the IFEM logo PNG, convert to `.webp`, save as `IFEM.webp`. Submit the IFEM logo endorsement application if required for promotional use.
4. **ISO 9001:2015** — Do NOT source an ISO logo. Keep as text pill. If a logo is desired, identify Manipal's certification body (e.g., BSI, TÜV, DNV) and request permission to use their certification mark.

## After sourcing logos

Update the `accreditationLogos` record in both templates:

```ts
const accreditationLogos: Record<string, string> = {
  'JCI Accredited': '/images/accreditations/JCI.webp',
  NABH: '/images/accreditations/NABH.webp',
  NABL: '/images/accreditations/NABL.png',
  'MTQUA Certified': '/images/accreditations/MTQUA.webp',   // after sourcing
  AAHRPP: '/images/accreditations/AAHRPP.webp',               // after sourcing
  'IFEM Gold Level Certified': '/images/accreditations/IFEM.webp', // after sourcing
};
```

## Image format guidance

- Prefer `.webp` for smaller file size (matches existing JCI/NABH).
- Target height ~40px when rendered (template uses `h-10` = 2.5rem).
- White or light background (`bg-cream-100/95` is applied in template) — source logos with transparent or light-friendly backgrounds.
- Keep file size under ~15 KB per logo.

## Legal note

Accreditation logos are trademarks of their respective organisations. Display on a third-party hospital directory page (Khan Meditour) may require permission. The current text-pill fallback is the safe default until permission is confirmed. JCI, NABH, and NABL logos already in the repo are presumed licensed for use; verify if uncertain.
