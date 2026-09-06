# FAQ Content Strategy — Questions to Add to Every Page Type

> **Purpose:** Comprehensive list of questions that real patients search for, organized by page type and audience segment. Each FAQ should be added to the relevant page's content collection frontmatter so it renders in the FAQAccordion and generates FAQPage JSON-LD schema.
>
> **Audience:** Content writers, SEO specialists, and developers on the Khan Meditour team.
>
> **Last updated:** 2026-09-05

---

## How This Helps SEO / AEO / GEO / AIO

### SEO (Search Engine Optimization)
- FAQ pages target **question-based queries** which are among the fastest-growing search segments
- Google's "People Also Ask" feature pulls directly from FAQ schema — pages with FAQPage JSON-LD are more likely to appear in PAA boxes
- Long-tail question queries have lower competition and higher click-through rates
- Each FAQ answer is a natural place to include target keywords and internal links

### AEO (Answer Engine Optimization)
- AI engines (Google AI Overviews, ChatGPT, Perplexity) extract answers from FAQ sections more than any other content format
- The Q&A format maps directly to how users phrase queries to AI assistants
- FAQPage JSON-LD schema gives AI engines structured, machine-readable answers they can cite with confidence
- Concise, factual answers (50-150 words) are ideal for AI extraction

### GEO (Generative Engine Optimization)
- Generative engines prioritize content that answers questions comprehensively but concisely
- FAQs with specific numbers (costs, durations, success rates) are more likely to be cited than vague answers
- Multi-question coverage on a single page increases the probability of being referenced for related queries
- Cross-linked FAQs (treatment page FAQ links to country page FAQ) create a knowledge graph that generative engines can traverse

### AIO (AI-Optimized Content)
- AI search assistants recommend pages that answer questions directly and authoritatively
- FAQ sections with clear question headings allow AI to parse and retrieve answers efficiently
- Bilingual FAQs (EN + BN) double the coverage for AI engines serving different language queries
- Regularly updated FAQs signal freshness to AI crawlers

---

## Implementation Guide

### How FAQs are currently rendered
Each treatment, doctor, and hospital markdown file has an optional `faqs` frontmatter field:
```yaml
faqs:
  - question: "How much does heart bypass surgery cost in India?"
    answer: "Heart bypass surgery (CABG) in India costs approximately $4,500-$12,000..."
  - question: "How long is the hospital stay?"
    answer: "Patients typically stay 5-7 days..."
```

The `[slug].astro` templates merge auto-generated FAQs (from `faq-generator.ts`) with manual FAQs from frontmatter, then render them in a `FAQAccordion` component with `FAQPage` JSON-LD schema.

### Rules for writing FAQ answers
1. **Be specific** — Use real numbers, not vague ranges ("$4,500-$12,000" not "affordable")
2. **Be concise** — 50-150 words per answer (ideal for AI extraction)
3. **Be honest** — Never invent medical claims, success rates, or prices
4. **Include internal links** — Reference relevant pages naturally in the answer text
5. **Address real concerns** — Every question should come from actual patient search behavior
6. **Bilingual** — Every FAQ must be written in both EN and BN
7. **No duplication** — Don't repeat the same question across page types; instead, link to the page that answers it

### Where to add FAQs
| Page Type | Current FAQ Count | Target FAQ Count | Location |
|---|---|---|---|
| Treatment pages | 3 manual + auto-generated | 6-8 manual | `src/content/treatments/en/[slug].md` + `bn/[slug].md` |
| Doctor pages | 2 manual (8 doctors) | 4-5 manual (all doctors) | `src/content/doctors/en/[slug].md` + `bn/[slug].md` |
| Hospital pages | 3 manual | 5-6 manual | `src/content/hospitals/en/[slug].md` + `bn/[slug].md` |
| Country pages | 0 | 6-8 manual | `src/content/countries/en/[slug].md` + `bn/[slug].md` |
| Service pages | 0 | 5-6 manual | Inline in `.astro` pages or via a content collection |
| Blog articles | 0 | 5-6 per article | `src/content/blog/en/[slug].md` + `bn/[slug].md` |

---

## FAQ Questions — Organized by Page Type

### 1. Treatment Pages (18 treatments × EN + BN = 36 files)

#### Universal Treatment FAQs (add to ALL treatment pages)

These questions apply to every treatment page. Customize the answer with the specific treatment name, cost range, and duration.

| # | Question | Answer Template |
|---|---|---|
| T1 | How much does {{treatment}} cost in India for international patients? | {{treatment}} in India costs approximately {{fromPrice}} to {{toPrice}} at JCI-accredited hospitals in Bangalore. This is typically 60-80% lower than equivalent procedures in the USA, UK, or GCC countries. The final cost depends on hospital choice, surgeon experience, and case complexity. |
| T2 | Is {{treatment}} safe in India? | Yes. Our partner hospitals are JCI and NABH accredited, meeting international patient safety standards. Surgeons performing {{treatment}} are internationally trained and perform high volumes of these procedures annually. Infection control protocols, ICU monitoring, and post-operative care follow international guidelines. |
| T3 | How long do I need to stay in India for {{treatment}}? | The typical stay for {{treatment}} is {{duration}} for the procedure plus {{hospitalStay}} in the hospital and {{recovery}} for recovery. Most international patients spend 1-3 weeks total in Bangalore, depending on the complexity of the case. |
| T4 | What is included in the cost estimate for {{treatment}}? | Our cost estimates typically include surgeon fees, hospital charges, anesthesia, implants/medications, room charges, and pre-operative diagnostics. They exclude flights, accommodation outside the hospital, and post-discharge physiotherapy (if needed). Request a detailed quote via WhatsApp for a complete breakdown. |
| T5 | Can I get a free second opinion before traveling for {{treatment}}? | Yes. Khan Meditour offers a free honest second opinion — send your medical reports via WhatsApp and a specialist will review your diagnosis and treatment plan within 24 hours, with no obligation to travel. |
| T6 | What happens if there are complications after {{treatment}}? | Our partner hospitals have 24/7 emergency care, ICU monitoring, and dedicated international patient departments. If complications arise after discharge, our coordinators arrange immediate follow-up with your surgeon. Telemedicine follow-up is available after you return home. |
| T7 | How soon can I start {{treatment}} after arriving in India? | Treatment typically begins within 1-3 days of arrival, depending on pre-operative tests and consultations. Urgent cases are prioritized. We coordinate your appointment schedule before you travel so there are no delays. |
| T8 | Will I need a medical visa for {{treatment}} in India? | Yes. International patients need a Medical Visa (M Visa) or e-Medical Visa. We provide the hospital invitation letter required for your visa application. Processing typically takes 3-5 business days for most countries. See our medical visa assistance page for details. |

#### Treatment-Specific FAQs (add to specific treatment pages only)

**Cardiology:**
| # | Question | Answer |
|---|---|---|
| C1 | Can angiogram and angioplasty be done in the same session? | Yes, in many cases if a treatable blockage is identified during diagnostic angiogram, angioplasty (PCI) can be performed in the same session. This is determined by the cardiologist based on findings and clinical guidelines. |
| C2 | What is the success rate of bypass surgery in India? | Our partner hospitals report in-hospital survival rates exceeding 98% for coronary artery bypass grafting (CABG). Success rates depend on patient health, age, and case complexity. Your cardiac surgeon will discuss your specific risk profile. |

**Cancer Treatment:**
| # | Question | Answer |
|---|---|---|
| CT1 | Is chemotherapy available for international patients in India? | Yes. Our partner hospitals offer full chemotherapy protocols with internationally sourced medications. Treatment plans are customized by medical oncologists based on your cancer type, stage, and biomarker profile. |
| CT2 | Can I get immunotherapy or targeted therapy in India? | Yes. Indian hospitals offer FDA-approved immunotherapy and targeted therapy drugs, often at 60-80% lower cost than in Western countries. Availability of specific drugs can be confirmed before travel. |

**Orthopedics Surgery:**
| # | Question | Answer |
|---|---|---|
| O1 | Which implant brand is used for joint replacement in India? | Our partner hospitals use FDA-approved implants from global manufacturers including Zimmer Biomet, Stryker, and Smith & Nephew. The specific implant is chosen based on your anatomy, age, and activity level. |
| O2 | How soon can I walk after knee replacement surgery? | Most patients begin walking with assistance within 24 hours of surgery. Full weight-bearing typically begins within 1-2 weeks. Complete recovery takes 6-12 weeks with physiotherapy. |

**Infertility Treatment / IVF:**
| # | Question | Answer |
|---|---|---|
| IV1 | What is the IVF success rate in India for international patients? | IVF success rates in India range from 40-65% per cycle depending on age, cause of infertility, and clinic. Our partner fertility centers report success rates comparable to top US and UK clinics. |
| IV2 | Is donor IVF available for international patients in India? | Yes, donor egg, donor sperm, and donor embryo programs are available. Indian regulations allow anonymous donation with strict screening protocols. Your fertility specialist will discuss options based on your medical needs. |

**Hematology & Bone Marrow Transplant:**
| # | Question | Answer |
|---|---|---|
| H1 | What is the cost of bone marrow transplant in India? | Bone marrow transplant in India costs approximately $15,000-$40,000 depending on the type (autologous vs. allogeneic), donor matching, and hospital. This is 60-80% lower than in Western countries. |
| H2 | How long is the hospital stay after bone marrow transplant? | Patients typically stay 4-6 weeks in the hospital after a bone marrow transplant for monitoring and infection prevention. Full recovery takes 3-12 months. |

**Organ Transplant:**
| # | Question | Answer |
|---|---|---|
| OT1 | What are the legal requirements for organ transplant in India for foreigners? | Foreign patients must comply with the Transplantation of Human Organs Act. Donors must be close relatives (parents, siblings, children, spouse) with documented proof of relationship. All transplants require government committee approval. Khan Meditour assists with documentation. |

**Cosmetic Surgery:**
| # | Question | Answer |
|---|---|---|
| CS1 | Will I have visible scars after cosmetic surgery in India? | Our plastic surgeons use advanced techniques to minimize scarring, placing incisions in natural creases where possible. Scar appearance continues to improve over 6-12 months. Your surgeon will discuss expected scarring during consultation. |

---

### 2. Country Pages (add to each country landing page)

#### Universal Country FAQs (add to ALL country pages)

Customize answers with the specific country name, currency, visa processing time, and flight duration.

| # | Question | Answer Template |
|---|---|---|
| CO1 | How do {{nationality}} patients get a medical visa for India? | {{Nationality}} patients can apply for an Indian e-Medical Visa online at indianvisaonline.gov.in. The visa costs approximately {{visaFee}} and is processed in {{visaProcessingTime}}. Khan Meditour provides the hospital invitation letter required for your application. |
| CO2 | How much does treatment in India cost for {{nationality}} patients? | {{Nationality}} patients typically save 60-80% on medical treatment in India compared to private hospitals in {{country}}. For example, heart bypass surgery that costs {{homeCost}} in {{country}} costs approximately {{indiaCost}} in India. See our treatment pages for detailed cost comparisons. |
| CO3 | Are there direct flights from {{country}} to India? | {{flightInfo}}. Flight time is approximately {{flightDuration}}. We assist with flight booking and airport pickup in Bangalore. |
| CO4 | Do {{country}} patients need any vaccinations before traveling to India? | {{vaccinationInfo}}. Check with your local travel clinic and the Indian embassy website for current requirements. |
| CO5 | Will I have language support as a {{nationality}} patient? | English is widely spoken at our partner hospitals. {{languageSupportNote}} Our coordinators can arrange interpreter services if needed. |
| CO6 | Can my family member travel with me for treatment in India? | Yes. Medical Attendant Visas (MX Visa) allow up to 2 family members to accompany the patient. {{countrySpecificAttendantRule}} We assist with attendant visa applications. |
| CO7 | What is the best hospital in India for {{nationality}} patients? | Our partner hospitals in Bangalore include JCI-accredited facilities with dedicated international patient departments experienced in treating {{nationality}} patients. See our hospitals page for details, or send your reports via WhatsApp for a personalized recommendation. |
| CO8 | How long does the full medical trip to India take for {{nationality}} patients? | The total trip duration depends on your treatment, but most {{nationality}} patients spend 1-3 weeks in India. This includes pre-operative tests, the procedure, hospital stay, and initial recovery. We coordinate your schedule to minimize time away from home. |

#### Country-Specific FAQs

**Bangladesh:**
| # | Question | Answer |
|---|---|---|
| BD1 | What is the current medical visa processing status for Bangladeshi citizens? | India issues medical visas for Bangladeshi patients on humanitarian and urgent grounds. e-Medical visa applications are processed faster than paper applications. Emergency cases can be processed within 24-48 hours. Contact us for current processing times. |
| BD2 | How many attendants can travel with a patient from Bangladesh? | Bangladesh has a bilateral provision allowing up to 3 attendants per patient on Medical Attendant (MX) visas — more generous than most other countries. |
| BD3 | Are there Bengali-speaking doctors in Bangalore hospitals? | Yes. Several doctors and hospital staff at our partner hospitals speak Bengali. Our coordinators also provide Bengali language support throughout your stay. |

**Saudi Arabia:**
| # | Question | Answer |
|---|---|---|
| SA1 | Is the e-Medical visa free for Saudi citizens? | Yes. The Indian e-Medical Visa is free for Saudi citizens and is processed within 48-72 hours. Apply at indianvisaonline.gov.in. |
| SA2 | Are there Arabic-speaking doctors and staff in Bangalore hospitals? | Yes. Our partner hospitals have Arabic-speaking patient coordinators and some Arabic-speaking medical staff. Interpreter services can also be arranged. |
| SA3 | Is halal food available in Bangalore hospitals? | Yes. All major hospitals in Bangalore provide halal food for international patients. Prayer rooms (musallas) are available, and Qibla direction is marked in patient rooms. Ramadan-friendly scheduling can be arranged. |

**Nigeria:**
| # | Question | Answer |
|---|---|---|
| NG1 | How much does the Indian medical e-visa cost for Nigerian citizens? | The Indian e-Medical Visa costs approximately $25 USD (≈ ₦40,000 NGN) for Nigerian citizens. It is processed in 3-5 business days. Apply at indianvisaonline.gov.in — no embassy visit required. |
| NG2 | Do Nigerian patients need yellow fever vaccination for India? | Yes. Nigerian citizens must show proof of yellow fever vaccination when traveling to India. You may also need oral polio vaccination depending on current Indian health regulations. Check with your travel clinic. |
| NG3 | How long is the flight from Lagos to Bangalore? | There are no direct flights from Lagos to Bangalore. Connecting flights via Dubai or Addis Ababa take approximately 10-14 hours total. We assist with flight booking and airport pickup. |

**Kenya:**
| # | Question | Answer |
|---|---|---|
| KE1 | How do Kenyan patients apply for an Indian medical visa? | Kenyan citizens qualify for the Indian e-Medical Visa, applied online at indianvisaonline.gov.in. The visa costs approximately $25 USD (≈ KES 3,200) and is processed in 72 hours. No embassy visit is required. |
| KE2 | Are there direct flights from Nairobi to India? | Kenya Airways operates direct flights from Nairobi (NBO) to Mumbai (~6.5 hours) and Delhi (~7.5 hours). Connecting flights to Bangalore are available via IndiGo and SpiceJet. |

---

### 3. Hospital Pages (add to each hospital page)

#### Universal Hospital FAQs (add to ALL hospital pages)

| # | Question | Answer Template |
|---|---|---|
| H1 | Is {{hospital}} JCI or NABH accredited? | {{accreditationAnswer — state whether JCI, NABH, or both, and when last certified}} |
| H2 | Does {{hospital}} have an international patient department? | Yes. {{hospital}} has a dedicated international patient department that provides visa assistance letters, airport pickup, interpreter services, accommodation coordination, and dedicated care coordinators for foreign patients. |
| H3 | What treatments is {{hospital}} best known for? | {{hospital}} is best known for {{specialties}}. The hospital performs {{volume}} procedures annually with success rates of {{successRate}}. |
| H4 | How much does treatment cost at {{hospital}} compared to other hospitals? | Treatment costs at {{hospital}} are competitive with other JCI-accredited hospitals in Bangalore. Costs vary by procedure — contact us via WhatsApp with your medical reports for a personalized quote from {{hospital}}. |
| H5 | Can I get a second opinion from a doctor at {{hospital}}? | Yes. Khan Meditour coordinates free second opinions from specialists at {{hospital}}. Send your medical reports via WhatsApp and we will arrange a review within 24 hours. |
| H6 | What languages are spoken at {{hospital}}'s international patient department? | English is the primary language at {{hospital}}. Interpreter services for {{languages}} can be arranged with advance notice. Our coordinators provide additional language support. |

---

### 4. Doctor Pages (add to each doctor page)

#### Universal Doctor FAQs (add to ALL doctor pages)

| # | Question | Answer Template |
|---|---|---|
| D1 | How many years of experience does {{doctor}} have? | {{doctor}} has {{years}} years of experience in {{specialty}}. {{additionalQualifications}} |
| D2 | What procedures does {{doctor}} specialize in? | {{doctor}} specializes in {{procedures}}. {{procedureVolume}} procedures are performed annually. |
| D3 | Which hospital does {{doctor}} practice at? | {{doctor}} practices at {{hospital}} in Bangalore, a {{accreditationStatus}} accredited facility. |
| D4 | What languages does {{doctor}} speak? | {{doctor}} speaks {{languages}}. Interpreter services can be arranged for other languages. |
| D5 | How can I book an appointment with {{doctor}}? | You can book an appointment with {{doctor}} by sending your medical reports via WhatsApp or through our contact form. We coordinate the appointment and provide a cost estimate before you travel. |

---

### 5. Service Pages (How It Works, Visa, Travel, Second Opinion, etc.)

#### How It Works Page
| # | Question | Answer |
|---|---|---|
| HW1 | How long does the entire medical tourism process take? | The process typically takes 2-4 weeks from initial contact to treatment, depending on visa processing time and treatment urgency. Emergency cases can be expedited to within 1 week. |
| HW2 | Do I need to pay anything before traveling? | No. Initial consultation and second opinion are free. You pay the hospital directly after arriving in India and confirming the treatment plan. |
| HW3 | What if I don't have all my medical reports? | Send what you have. Our care team will tell you exactly which tests or reports the specialist needs before giving a reliable opinion. |

#### Medical Visa Assistance Page
| # | Question | Answer |
|---|---|---|
| MV1 | What documents do I need for an Indian medical visa? | You need: a valid passport (6+ months validity), passport-size photos, a hospital invitation letter (we provide this), medical reports/prescriptions, and the visa application form. Some countries require additional vaccinations. |
| MV2 | How long does medical visa processing take? | e-Medical visas are typically processed in 72 hours for most countries. Paper applications at embassies take 5-10 business days. Emergency cases can be expedited to 24-48 hours. |
| MV3 | Can my family member get a visa to travel with me? | Yes. Up to 2 family members can apply for a Medical Attendant (MX) Visa. Bangladesh has a special provision allowing up to 3 attendants. |

#### Travel & Accommodation Page
| # | Question | Answer |
|---|---|---|
| TA1 | Where will I stay during my treatment in Bangalore? | We arrange accommodation near the hospital — either serviced apartments or hotels with medical tourism rates. Costs range from $30-80/night depending on the type of accommodation. |
| TA2 | Is airport pickup included? | Yes. Our coordinators meet you at Bangalore airport and transport you to your hospital or accommodation. This is included in our service at no extra cost. |
| TA3 | Can I get halal food near the hospitals? | Yes. Bangalore has many halal restaurants near all major hospitals. Hospital cafeterias also provide halal meals for international patients. |

#### Second Opinion Page
| # | Question | Answer |
|---|---|---|
| SO1 | Is the second opinion really free? | Yes. Reviewing your reports and sharing an honest opinion is completely free, with no obligation to book treatment or travel with us. |
| SO2 | How long does it take to get a second opinion? | Most reports are reviewed within 24 hours. Complex cases may take up to 48 hours. |
| SO3 | What reports should I upload for a second opinion? | Upload: prescriptions, MRI/CT/X-ray reports, blood test results, discharge summaries, and previous consultation notes. You can upload multiple files. |

#### Emergency / Urgent Cases Page
| # | Question | Answer |
|---|---|---|
| EM1 | How quickly can emergency cases be handled? | Emergency cases are prioritized for visa processing (24-48 hours) and treatment scheduling (within 1-2 days of arrival). Contact us immediately via WhatsApp for urgent cases. |
| EM2 | What if I need urgent surgery but don't have a visa yet? | We coordinate with the hospital and embassy to expedite emergency medical visas. Life-threatening conditions, cancer treatments, and organ transplant cases receive priority processing. |

---

### 6. Blog Articles (add 5-6 FAQs per article)

Each blog article should include 5-6 FAQs specific to the article topic. Use the same frontmatter format as treatment pages. See the Blog Content Strategy document for article-specific FAQ suggestions.

**General blog FAQ pattern:**
| # | Question Pattern | Example |
|---|---|---|
| B1 | Cost question specific to the article topic | "How much does [topic] cost in India?" |
| B2 | Safety/quality question | "Is [topic] safe in India?" |
| B3 | Timeline question | "How long does [topic] take?" |
| B4 | Process question | "How do I [process step]?" |
| B5 | Comparison question | "[Topic] in India vs. [home country]?" |
| B6 | CTA question | "How can I get started with [topic]?" |

---

## Implementation Priority

### Phase 1 — Treatment Pages (Week 1-2)
Add universal treatment FAQs (T1-T8) to all 18 EN + 18 BN treatment files. Customize answers with treatment-specific data from frontmatter.

### Phase 2 — Country Pages (Week 3)
Add universal country FAQs (CO1-CO8) to all country pages. Customize with country-specific visa, flight, and cost data.

### Phase 3 — Hospital Pages (Week 4)
Add universal hospital FAQs (H1-H6) to all hospital pages. Customize with accreditation status and specialties.

### Phase 4 — Doctor Pages (Week 5)
Add universal doctor FAQs (D1-D5) to all doctor pages. Customize with experience, procedures, and languages.

### Phase 5 — Service Pages (Week 6)
Add service-specific FAQs to How It Works, Visa, Travel, Second Opinion, and Emergency pages. These may need to be added inline in the `.astro` files if no content collection exists.

### Phase 6 — Blog Articles (Ongoing)
Add 5-6 FAQs to each new blog article as it is published.

---

## Quality Checklist

For every FAQ added:
- [ ] Question phrased as a natural search query
- [ ] Answer is 50-150 words
- [ ] Answer includes specific numbers (not vague)
- [ ] No invented medical claims or prices
- [ ] Internal link to a relevant page included
- [ ] Written in both EN and BN
- [ ] No duplicate questions across page types
- [ ] FAQPage JSON-LD schema renders correctly (verify in build output)
