# Procedure Pages — Complete URL Structure & Mapping

> **Decision:** Nested under category + "Cost-India" suffix in URL slug
>
> **URL pattern:** `/treatments/{category-slug}/{procedure-slug}-cost-india`
> **Bengali pattern:** `/bn/treatments/{category-slug}/{procedure-slug}-cost-india`
>
> **Last updated:** 2026-09-05

---

## URL Structure Decision

| Decision | Choice |
|----------|--------|
| Hierarchy | Nested under category: `/treatments/{category}/{procedure}` |
| Slug format | Includes "cost-india" suffix: `{procedure-slug}-cost-india` |
| Bengali | Same slug, under `/bn/treatments/{category}/{procedure}-cost-india` |

### Why this works for SEO/AEO

- **"cost-india" in URL** targets the highest-intent transactional search pattern: `"{procedure} cost in India"`
- **Category nesting** creates topical authority clusters (hematology → all blood disorder procedures)
- **Breadcrumb hierarchy** maps to URL hierarchy: Home → Treatments → {Category} → {Procedure}
- **Internal linking** from category page to all procedure pages strengthens the cluster

---

## Complete URL Mapping

### Hematology & Bone Marrow Transplant

**Category page:** `/treatments/hematology-bone-marrow`
**Content dir:** `src/content/procedures/en/hematology-bone-marrow/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 1 | Bone Marrow Transplant | `bone-marrow-transplant-cost-india` | `/treatments/hematology-bone-marrow/bone-marrow-transplant-cost-india` | $18,000 – $45,000 |
| 2 | Leukemia Treatment | `leukemia-treatment-cost-india` | `/treatments/hematology-bone-marrow/leukemia-treatment-cost-india` | $8,000 – $35,000 |
| 3 | Lymphoma Treatment | `lymphoma-treatment-cost-india` | `/treatments/hematology-bone-marrow/lymphoma-treatment-cost-india` | $6,000 – $28,000 |
| 4 | Thalassemia Treatment | `thalassemia-treatment-cost-india` | `/treatments/hematology-bone-marrow/thalassemia-treatment-cost-india` | $5,000 – $45,000 |
| 5 | Sickle Cell Disease Treatment | `sickle-cell-disease-treatment-cost-india` | `/treatments/hematology-bone-marrow/sickle-cell-disease-treatment-cost-india` | $3,000 – $40,000 |
| 6 | Autologous Stem Cell Transplant | `autologous-stem-cell-transplant-cost-india` | `/treatments/hematology-bone-marrow/autologous-stem-cell-transplant-cost-india` | $15,000 – $30,000 |
| 7 | Allogeneic Stem Cell Transplant | `allogeneic-stem-cell-transplant-cost-india` | `/treatments/hematology-bone-marrow/allogeneic-stem-cell-transplant-cost-india` | $25,000 – $55,000 |
| 8 | Aplastic Anemia Treatment | `aplastic-anemia-treatment-cost-india` | `/treatments/hematology-bone-marrow/aplastic-anemia-treatment-cost-india` | $10,000 – $45,000 |
| 9 | Multiple Myeloma Treatment | `multiple-myeloma-treatment-cost-india` | `/treatments/hematology-bone-marrow/multiple-myeloma-treatment-cost-india` | $12,000 – $40,000 |
| 10 | CAR-T Cell Therapy | `car-t-cell-therapy-cost-india` | `/treatments/hematology-bone-marrow/car-t-cell-therapy-cost-india` | $40,000 – $80,000 |

**Total: 10 procedures**

---

### Cardiology & Cardiac Surgery

**Category page:** `/treatments/cardiology`
**Content dir:** `src/content/procedures/en/cardiology/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 11 | Heart Bypass Surgery (CABG) | `heart-bypass-surgery-cabg-cost-india` | `/treatments/cardiology/heart-bypass-surgery-cabg-cost-india` | $4,500 – $12,000 |
| 12 | Angioplasty & Stent Placement | `angioplasty-stent-placement-cost-india` | `/treatments/cardiology/angioplasty-stent-placement-cost-india` | $2,500 – $6,000 |
| 13 | Heart Valve Replacement / Repair | `heart-valve-replacement-repair-cost-india` | `/treatments/cardiology/heart-valve-replacement-repair-cost-india` | $6,000 – $15,000 |
| 14 | TAVR (Transcatheter Aortic Valve Replacement) | `tavr-transcatheter-aortic-valve-replacement-cost-india` | `/treatments/cardiology/tavr-transcatheter-aortic-valve-replacement-cost-india` | $8,000 – $20,000 |
| 15 | Pacemaker Implantation | `pacemaker-implantation-cost-india` | `/treatments/cardiology/pacemaker-implantation-cost-india` | $3,000 – $7,000 |
| 16 | ASD / VSD Closure Surgery | `asd-vsd-closure-surgery-cost-india` | `/treatments/cardiology/asd-vsd-closure-surgery-cost-india` | $4,000 – $10,000 |
| 17 | Pediatric Heart Surgery | `pediatric-heart-surgery-cost-india` | `/treatments/cardiology/pediatric-heart-surgery-cost-india` | $8,000 – $20,000 |
| 18 | Heart Transplant | `heart-transplant-cost-india` | `/treatments/cardiology/heart-transplant-cost-india` | $50,000 – $100,000 |

**Total: 8 procedures**

> **Note:** Heart Transplant is listed under Cardiology per your list. It could also cross-link from the Organ Transplant category page. Consider adding it to both categories via cross-linking.

---

### Cancer Treatment (Oncology)

**Category page:** `/treatments/cancer-treatment`
**Content dir:** `src/content/procedures/en/cancer-treatment/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 19 | Chemotherapy | `chemotherapy-cost-india` | `/treatments/cancer-treatment/chemotherapy-cost-india` | $500 – $2,500 / cycle |
| 20 | Radiation Therapy (Radiotherapy) | `radiation-therapy-cost-india` | `/treatments/cancer-treatment/radiation-therapy-cost-india` | $3,000 – $8,000 |
| 21 | Immunotherapy | `immunotherapy-cost-india` | `/treatments/cancer-treatment/immunotherapy-cost-india` | $5,000 – $15,000 |
| 22 | Targeted Therapy | `targeted-therapy-cost-india` | `/treatments/cancer-treatment/targeted-therapy-cost-india` | $3,000 – $12,000 |
| 23 | Surgical Oncology (Cancer Surgery) | `cancer-surgery-cost-india` | `/treatments/cancer-treatment/cancer-surgery-cost-india` | $4,000 – $15,000 |
| 24 | Breast Cancer Treatment | `breast-cancer-treatment-cost-india` | `/treatments/cancer-treatment/breast-cancer-treatment-cost-india` | $5,000 – $20,000 |
| 25 | Lung Cancer Treatment | `lung-cancer-treatment-cost-india` | `/treatments/cancer-treatment/lung-cancer-treatment-cost-india` | $6,000 – $25,000 |
| 26 | Prostate Cancer Treatment | `prostate-cancer-treatment-cost-india` | `/treatments/cancer-treatment/prostate-cancer-treatment-cost-india` | $5,000 – $18,000 |

**Total: 8 procedures**

---

### Orthopedics & Joint Replacement

**Category page:** `/treatments/orthopedics-surgery`
**Content dir:** `src/content/procedures/en/orthopedics-surgery/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 27 | Total Knee Replacement | `total-knee-replacement-cost-india` | `/treatments/orthopedics-surgery/total-knee-replacement-cost-india` | $3,500 – $7,000 |
| 28 | Total Hip Replacement | `total-hip-replacement-cost-india` | `/treatments/orthopedics-surgery/total-hip-replacement-cost-india` | $4,000 – $8,000 |
| 29 | Shoulder Replacement | `shoulder-replacement-cost-india` | `/treatments/orthopedics-surgery/shoulder-replacement-cost-india` | $5,000 – $10,000 |
| 30 | Arthroscopy (Keyhole Surgery) | `arthroscopy-cost-india` | `/treatments/orthopedics-surgery/arthroscopy-cost-india` | $2,000 – $5,000 |
| 31 | Spine Surgery | `spine-surgery-cost-india` | `/treatments/orthopedics-surgery/spine-surgery-cost-india` | $5,000 – $15,000 |
| 32 | Sports Injury Treatment | `sports-injury-treatment-cost-india` | `/treatments/orthopedics-surgery/sports-injury-treatment-cost-india` | $2,000 – $8,000 |

**Total: 6 procedures**

---

### Infertility Treatment & IVF

**Category page:** `/treatments/infertility-treatment`
**Content dir:** `src/content/procedures/en/infertility-treatment/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 33 | IVF Treatment (In Vitro Fertilization) | `ivf-treatment-cost-india` | `/treatments/infertility-treatment/ivf-treatment-cost-india` | $1,500 – $4,000 |
| 34 | ICSI Treatment | `icsi-treatment-cost-india` | `/treatments/infertility-treatment/icsi-treatment-cost-india` | $2,000 – $5,000 |
| 35 | IUI Treatment | `iui-treatment-cost-india` | `/treatments/infertility-treatment/iui-treatment-cost-india` | $300 – $800 |
| 36 | Surrogacy Program | `surrogacy-program-cost-india` | `/treatments/infertility-treatment/surrogacy-program-cost-india` | $10,000 – $25,000 |
| 37 | Egg Freezing | `egg-freezing-cost-india` | `/treatments/infertility-treatment/egg-freezing-cost-india` | $1,500 – $3,500 |

**Total: 5 procedures**

---

### Organ Transplant

**Category page:** `/treatments/organ-treatment`
**Content dir:** `src/content/procedures/en/organ-treatment/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 38 | Liver Transplant | `liver-transplant-cost-india` | `/treatments/organ-treatment/liver-transplant-cost-india` | $25,000 – $60,000 |
| 39 | Kidney Transplant | `kidney-transplant-cost-india` | `/treatments/organ-treatment/kidney-transplant-cost-india` | $15,000 – $40,000 |
| 40 | Lung Transplant | `lung-transplant-cost-india` | `/treatments/organ-treatment/lung-transplant-cost-india` | $40,000 – $90,000 |

**Total: 3 procedures**

> **Note:** Heart Transplant is listed under Cardiology (procedure #18) per your list. It should cross-link from the Organ Transplant category page as well.

---

### Neuro & Spine Surgery

**Category page:** `/treatments/neuro-and-spine-surgery`
**Content dir:** `src/content/procedures/en/neuro-and-spine-surgery/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 41 | Brain Tumor Surgery | `brain-tumor-surgery-cost-india` | `/treatments/neuro-and-spine-surgery/brain-tumor-surgery-cost-india` | $6,000 – $20,000 |
| 42 | Spinal Fusion Surgery | `spinal-fusion-surgery-cost-india` | `/treatments/neuro-and-spine-surgery/spinal-fusion-surgery-cost-india` | $5,000 – $15,000 |
| 43 | Disc Replacement Surgery | `disc-replacement-surgery-cost-india` | `/treatments/neuro-and-spine-surgery/disc-replacement-surgery-cost-india` | $4,000 – $12,000 |
| 44 | Deep Brain Stimulation (DBS) | `deep-brain-stimulation-cost-india` | `/treatments/neuro-and-spine-surgery/deep-brain-stimulation-cost-india` | $15,000 – $35,000 |

**Total: 4 procedures**

---

### Cosmetic Surgery

**Category page:** `/treatments/cosmetic-surgery`
**Content dir:** `src/content/procedures/en/cosmetic-surgery/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 45 | Rhinoplasty (Nose Surgery) | `rhinoplasty-cost-india` | `/treatments/cosmetic-surgery/rhinoplasty-cost-india` | $1,500 – $5,000 |
| 46 | Liposuction | `liposuction-cost-india` | `/treatments/cosmetic-surgery/liposuction-cost-india` | $1,200 – $4,000 |
| 47 | Breast Augmentation | `breast-augmentation-cost-india` | `/treatments/cosmetic-surgery/breast-augmentation-cost-india` | $2,500 – $6,000 |
| 48 | Tummy Tuck (Abdominoplasty) | `tummy-tuck-cost-india` | `/treatments/cosmetic-surgery/tummy-tuck-cost-india` | $2,000 – $5,000 |
| 49 | Hair Transplant | `hair-transplant-cost-india` | `/treatments/cosmetic-surgery/hair-transplant-cost-india` | $1,000 – $4,000 |

**Total: 5 procedures**

---

### Gastroenterology & GI Surgery

**Category page:** `/treatments/gastroenterology-gi-surgery`
**Content dir:** `src/content/procedures/en/gastroenterology-gi-surgery/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 50 | Gallbladder Removal (Cholecystectomy) | `gallbladder-removal-cost-india` | `/treatments/gastroenterology-gi-surgery/gallbladder-removal-cost-india` | $2,000 – $5,000 |
| 51 | Hernia Repair Surgery | `hernia-repair-surgery-cost-india` | `/treatments/gastroenterology-gi-surgery/hernia-repair-surgery-cost-india` | $2,000 – $6,000 |
| 52 | Bariatric Surgery (Weight Loss) | `bariatric-surgery-cost-india` | `/treatments/gastroenterology-gi-surgery/bariatric-surgery-cost-india` | $4,000 – $12,000 |

**Total: 3 procedures**

---

### Nephrology & Kidney Care

**Category page:** `/treatments/nephrology-kidney-care`
**Content dir:** `src/content/procedures/en/nephrology-kidney-care/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 53 | Dialysis | `dialysis-cost-india` | `/treatments/nephrology-kidney-care/dialysis-cost-india` | $50 – $150 / session |
| 54 | Kidney Stone Treatment | `kidney-stone-treatment-cost-india` | `/treatments/nephrology-kidney-care/kidney-stone-treatment-cost-india` | $1,500 – $5,000 |

**Total: 2 procedures**

---

### Urology

**Category page:** `/treatments/urology`
**Content dir:** `src/content/procedures/en/urology/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 55 | Prostate Surgery (TURP) | `prostate-surgery-cost-india` | `/treatments/urology/prostate-surgery-cost-india` | $2,500 – $6,000 |
| 56 | Kidney Stone Removal (PCNL) | `kidney-stone-removal-cost-india` | `/treatments/urology/kidney-stone-removal-cost-india` | $2,000 – $5,000 |

**Total: 2 procedures**

---

### Ophthalmology (Eye Care)

**Category page:** `/treatments/ophthalmology`
**Content dir:** `src/content/procedures/en/ophthalmology/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 57 | Cataract Surgery | `cataract-surgery-cost-india` | `/treatments/ophthalmology/cataract-surgery-cost-india` | $500 – $2,000 |
| 58 | LASIK Eye Surgery | `lasik-eye-surgery-cost-india` | `/treatments/ophthalmology/lasik-eye-surgery-cost-india` | $800 – $2,500 |

**Total: 2 procedures**

---

### Ear, Nose & Throat (ENT)

**Category page:** `/treatments/ear-nose-throat`
**Content dir:** `src/content/procedures/en/ear-nose-throat/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 59 | Cochlear Implant | `cochlear-implant-cost-india` | `/treatments/ear-nose-throat/cochlear-implant-cost-india` | $10,000 – $25,000 |
| 60 | Sinus Surgery (FESS) | `sinus-surgery-cost-india` | `/treatments/ear-nose-throat/sinus-surgery-cost-india` | $1,500 – $5,000 |

**Total: 2 procedures**

---

### Pulmonology & Lung Care

**Category page:** `/treatments/pulmonology-lung-care`
**Content dir:** `src/content/procedures/en/pulmonology-lung-care/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 61 | Asthma Treatment | `asthma-treatment-cost-india` | `/treatments/pulmonology-lung-care/asthma-treatment-cost-india` | $500 – $3,000 |
| 62 | COPD Treatment | `copd-treatment-cost-india` | `/treatments/pulmonology-lung-care/copd-treatment-cost-india` | $800 – $4,000 |

**Total: 2 procedures**

---

### Stem Cell Treatment

**Category page:** `/treatments/stem-cell-treatment`
**Content dir:** `src/content/procedures/en/stem-cell-treatment/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 63 | Stem Cell Therapy for Neurological Conditions | `stem-cell-therapy-neurological-cost-india` | `/treatments/stem-cell-treatment/stem-cell-therapy-neurological-cost-india` | $8,000 – $25,000 |
| 64 | Stem Cell Therapy for Orthopedics | `stem-cell-therapy-orthopedics-cost-india` | `/treatments/stem-cell-treatment/stem-cell-therapy-orthopedics-cost-india` | $5,000 – $15,000 |

**Total: 2 procedures**

---

### Bariatric Weight Loss

**Category page:** `/treatments/bariatric-weight-loss`
**Content dir:** `src/content/procedures/en/bariatric-weight-loss/`

> **Note:** Bariatric Surgery is also listed under Gastroenterology (#52). If you prefer to keep it only under Bariatric Weight Loss, remove it from Gastroenterology and keep it here. Or keep it in both with cross-linking.

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 65 | Gastric Bypass Surgery | `gastric-bypass-surgery-cost-india` | `/treatments/bariatric-weight-loss/gastric-bypass-surgery-cost-india` | $4,000 – $10,000 |
| 66 | Gastric Sleeve Surgery | `gastric-sleeve-surgery-cost-india` | `/treatments/bariatric-weight-loss/gastric-sleeve-surgery-cost-india` | $3,500 – $9,000 |

**Total: 2 procedures**

---

### Neurology

**Category page:** `/treatments/neurology`
**Content dir:** `src/content/procedures/en/neurology/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 67 | Epilepsy Treatment | `epilepsy-treatment-cost-india` | `/treatments/neurology/epilepsy-treatment-cost-india` | $3,000 – $12,000 |
| 68 | Stroke Treatment | `stroke-treatment-cost-india` | `/treatments/neurology/stroke-treatment-cost-india` | $5,000 – $20,000 |

**Total: 2 procedures**

---

### Paediatric Neurology

**Category page:** `/treatments/paediatric-neurology`
**Content dir:** `src/content/procedures/en/paediatric-neurology/`

| # | Procedure Name | URL Slug | Full URL | Cost Range (USD) |
|---|---------------|----------|----------|------------------|
| 69 | Cerebral Palsy Treatment | `cerebral-palsy-treatment-cost-india` | `/treatments/paediatric-neurology/cerebral-palsy-treatment-cost-india` | $3,000 – $15,000 |

**Total: 1 procedure**

---

## Summary

| Category | Procedure Count |
|----------|----------------|
| Hematology & Bone Marrow | 10 |
| Cardiology & Cardiac Surgery | 8 |
| Cancer Treatment (Oncology) | 8 |
| Orthopedics & Joint Replacement | 6 |
| Infertility Treatment & IVF | 5 |
| Organ Transplant | 3 |
| Neuro & Spine Surgery | 4 |
| Cosmetic Surgery | 5 |
| Gastroenterology & GI Surgery | 3 |
| Nephrology & Kidney Care | 2 |
| Urology | 2 |
| Ophthalmology | 2 |
| Ear, Nose & Throat | 2 |
| Pulmonology & Lung Care | 2 |
| Stem Cell Treatment | 2 |
| Bariatric Weight Loss | 2 |
| Neurology | 2 |
| Paediatric Neurology | 1 |
| **TOTAL** | **69 procedures** |

### Content file count:
- 69 EN procedure files
- 69 BN procedure files
- **138 total new content files**

### Route count:
- 69 EN procedure routes
- 69 BN procedure routes
- **138 total new routes**

---

## File Structure

```
src/content/procedures/
  en/
    hematology-bone-marrow/
      bone-marrow-transplant-cost-india.md
      leukemia-treatment-cost-india.md
      lymphoma-treatment-cost-india.md
      thalassemia-treatment-cost-india.md
      sickle-cell-disease-treatment-cost-india.md
      autologous-stem-cell-transplant-cost-india.md
      allogeneic-stem-cell-transplant-cost-india.md
      aplastic-anemia-treatment-cost-india.md
      multiple-myeloma-treatment-cost-india.md
      car-t-cell-therapy-cost-india.md
    cardiology/
      heart-bypass-surgery-cabg-cost-india.md
      angioplasty-stent-placement-cost-india.md
      heart-valve-replacement-repair-cost-india.md
      tavr-transcatheter-aortic-valve-replacement-cost-india.md
      pacemaker-implantation-cost-india.md
      asd-vsd-closure-surgery-cost-india.md
      pediatric-heart-surgery-cost-india.md
      heart-transplant-cost-india.md
    cancer-treatment/
      chemotherapy-cost-india.md
      radiation-therapy-cost-india.md
      immunotherapy-cost-india.md
      targeted-therapy-cost-india.md
      cancer-surgery-cost-india.md
      breast-cancer-treatment-cost-india.md
      lung-cancer-treatment-cost-india.md
      prostate-cancer-treatment-cost-india.md
    orthopedics-surgery/
      total-knee-replacement-cost-india.md
      total-hip-replacement-cost-india.md
      shoulder-replacement-cost-india.md
      arthroscopy-cost-india.md
      spine-surgery-cost-india.md
      sports-injury-treatment-cost-india.md
    infertility-treatment/
      ivf-treatment-cost-india.md
      icsi-treatment-cost-india.md
      iui-treatment-cost-india.md
      surrogacy-program-cost-india.md
      egg-freezing-cost-india.md
    organ-treatment/
      liver-transplant-cost-india.md
      kidney-transplant-cost-india.md
      lung-transplant-cost-india.md
    neuro-and-spine-surgery/
      brain-tumor-surgery-cost-india.md
      spinal-fusion-surgery-cost-india.md
      disc-replacement-surgery-cost-india.md
      deep-brain-stimulation-cost-india.md
    cosmetic-surgery/
      rhinoplasty-cost-india.md
      liposuction-cost-india.md
      breast-augmentation-cost-india.md
      tummy-tuck-cost-india.md
      hair-transplant-cost-india.md
    gastroenterology-gi-surgery/
      gallbladder-removal-cost-india.md
      hernia-repair-surgery-cost-india.md
      bariatric-surgery-cost-india.md
    nephrology-kidney-care/
      dialysis-cost-india.md
      kidney-stone-treatment-cost-india.md
    urology/
      prostate-surgery-cost-india.md
      kidney-stone-removal-cost-india.md
    ophthalmology/
      cataract-surgery-cost-india.md
      lasik-eye-surgery-cost-india.md
    ear-nose-throat/
      cochlear-implant-cost-india.md
      sinus-surgery-cost-india.md
    pulmonology-lung-care/
      asthma-treatment-cost-india.md
      copd-treatment-cost-india.md
    stem-cell-treatment/
      stem-cell-therapy-neurological-cost-india.md
      stem-cell-therapy-orthopedics-cost-india.md
    bariatric-weight-loss/
      gastric-bypass-surgery-cost-india.md
      gastric-sleeve-surgery-cost-india.md
    neurology/
      epilepsy-treatment-cost-india.md
      stroke-treatment-cost-india.md
    paediatric-neurology/
      cerebral-palsy-treatment-cost-india.md
  bn/
    [same structure as EN]
```

---

## Route Templates

### English procedure detail page
**File:** `src/pages/treatments/[slug]/[procedure].astro`
**URL:** `/treatments/{category-slug}/{procedure-slug}-cost-india`

### Bengali procedure detail page
**File:** `src/pages/bn/treatments/[slug]/[procedure].astro`
**URL:** `/bn/treatments/{category-slug}/{procedure-slug}-cost-india`

### Astro `getStaticPaths` logic:
```typescript
export async function getStaticPaths() {
  const procedures = await getCollection('procedures', ({ data }) => data.locale === 'en');

  return procedures.map((entry) => {
    const slug = entrySlug(entry);
    const categorySlug = entry.data.parentTreatmentSlug;
    return {
      params: { slug: categorySlug, procedure: slug },
      props: { procedure: entry.data, entry, categorySlug },
    };
  });
}
```

---

## Breadcrumb Hierarchy

Each procedure page generates a 4-level breadcrumb:

```
Home → Treatments → {Category Name} → {Procedure Name}
/     → /treatments → /treatments/{category} → /treatments/{category}/{procedure}
```

**Example:**
```
Home → Treatments → Hematology & Bone Marrow → Allogeneic Stem Cell Transplant Cost in India
/     → /treatments → /treatments/hematology-bone-marrow → /treatments/hematology-bone-marrow/allogeneic-stem-cell-transplant-cost-india
```

**JSON-LD BreadcrumbList:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://khanmeditour.com/" },
    { "@type": "ListItem", "position": 2, "name": "Treatments", "item": "https://khanmeditour.com/treatments" },
    { "@type": "ListItem", "position": 3, "name": "Hematology & Bone Marrow", "item": "https://khanmeditour.com/treatments/hematology-bone-marrow" },
    { "@type": "ListItem", "position": 4, "name": "Allogeneic Stem Cell Transplant Cost in India", "item": "https://khanmeditour.com/treatments/hematology-bone-marrow/allogeneic-stem-cell-transplant-cost-india" }
  ]
}
```

---

## Cross-Linking Strategy

### From category page → procedure pages
Each treatment category page (`/treatments/{slug}`) gets a "Procedures" grid section linking to all its procedure pages.

### From procedure page → category page
Each procedure page's breadcrumb links back to the category page.

### From procedure page → related procedures
Each procedure page has a "Related Procedures" section linking to 3-4 related procedures (via `relatedProcedureSlugs` frontmatter).

### From procedure page → country pages
Each procedure page has a "Treatment for {Nationality} Patients" section linking to relevant country pages.

### From procedure page → doctor pages
Each procedure page shows related doctors (via `relatedDoctorSlugs`).

### From procedure page → hospital pages
Each procedure page shows partner hospitals (via `relatedHospitalSlugs`).

### From country page → procedure pages
Country pages should link to the most popular procedures for that nationality.

### From blog articles → procedure pages
Blog articles about specific procedures should link to the relevant procedure page.

---

## Implementation Phasing

### Phase 2A — High-volume categories (Month 1)
Start with the categories that have the most search volume:
1. **Hematology & Bone Marrow** (10 procedures) — high-value, high-search-volume
2. **Cardiology** (8 procedures) — highest search volume for "cost in India"
3. **Cancer Treatment** (8 procedures) — high search volume
4. **Orthopedics** (6 procedures) — high search volume

**Total: 32 procedures × 2 locales = 64 content files**

### Phase 2B — Medium-volume categories (Month 2)
5. **Infertility & IVF** (5 procedures)
6. **Organ Transplant** (3 procedures)
7. **Neuro & Spine Surgery** (4 procedures)
8. **Cosmetic Surgery** (5 procedures)

**Total: 17 procedures × 2 locales = 34 content files**

### Phase 2C — Lower-volume categories (Month 3)
9. **Gastroenterology** (3 procedures)
10. **Nephrology** (2 procedures)
11. **Urology** (2 procedures)
12. **Ophthalmology** (2 procedures)
13. **ENT** (2 procedures)
14. **Pulmonology** (2 procedures)
15. **Stem Cell** (2 procedures)
16. **Bariatric** (2 procedures)
17. **Neurology** (2 procedures)
18. **Paediatric Neurology** (1 procedure)

**Total: 20 procedures × 2 locales = 40 content files**
