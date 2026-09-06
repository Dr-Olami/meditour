import { defineCollection, z } from 'astro:content';

const LOCALES = ['en', 'bn'] as const;

const localeSchema = z.enum(LOCALES);

/**
 * Country slugs matching the keys in `src/data/countries/`.
 * Used to tag testimonials and blog posts for country-specific landing pages.
 * 'global' indicates content relevant to all countries.
 */
const COUNTRY_SLUGS = [
  'afghanistan', 'australia', 'bahrain', 'bangladesh', 'cameroon',
  'canada', 'egypt', 'ethiopia', 'ghana', 'iran', 'iraq', 'jordan',
  'kazakhstan', 'kenya', 'kuwait', 'maldives', 'nepal', 'nigeria',
  'oman', 'qatar', 'rwanda', 'saudi-arabia', 'sri-lanka', 'sudan',
  'tanzania', 'uae', 'uganda', 'uk', 'usa', 'yemen', 'zimbabwe',
  'global',
] as const;

const targetCountrySchema = z.enum(COUNTRY_SLUGS);

const doctors = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    specialty: z.string().min(1),
    hospitalId: z.string().min(1),
    qualification: z.string().min(1),
    experienceYears: z.number().int().nonnegative(),
    avatar: z.string().optional(),
    bio: z.string().min(1),
    languages: z.array(z.string()).optional(),
    /** Areas of expertise rendered as a scannable chip cloud. */
    expertise: z.array(z.string()).optional(),
    /** Patient-care philosophy sentence lifted from the bio; rendered as a pull quote. */
    pullQuote: z.string().optional(),
    faqs: z.array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    ).optional(),
  }),
});

const hospitals = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    description: z.string().min(1),
    accreditations: z.array(z.string()).optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    establishedYear: z.number().int().positive().optional(),
    bedCount: z.number().int().positive().optional(),
    specialities: z.array(z.string()).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    faqs: z.array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    ).optional(),
  }),
});

const treatments = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    category: z.string().optional(),
    description: z.string().min(1),
    fromPrice: z.string().optional(),
    toPrice: z.string().optional(),
    procedures: z.array(z.string()).optional(),
    relatedDoctorSlugs: z.array(z.string()).optional(),
    relatedHospitalSlugs: z.array(z.string()).optional(),
    duration: z.string().optional(),
    hospitalStay: z.string().optional(),
    recoveryTime: z.string().optional(),
    image: z.string().optional(),
    /** Long-tail SEO H1 for the treatment detail page; falls back to `name` if absent. */
    seoHeadline: z.string().optional(),
    /** Country slug for country-specific treatment variations; untagged treatments show for all countries. */
    targetCountry: targetCountrySchema.optional(),
    /** Concise AI-extractable summary shown in the "In short" callout after the hero. */
    summary: z.string().optional(),
    /** Eligibility criteria for the "Who is this treatment for?" section. */
    eligibility: z.array(z.string()).optional(),
    /** Items included in the cost estimate. */
    costInclusions: z.array(z.string()).optional(),
    /** Items not included in the cost estimate. */
    costExclusions: z.array(z.string()).optional(),
    /** Structured recovery timeline phases for the recovery table. */
    recoveryTimeline: z.array(
      z.object({
        phase: z.string().min(1),
        duration: z.string().min(1),
        description: z.string().min(1),
      })
    ).optional(),
    /** Procedure-specific risks for the safety section. */
    risks: z.array(z.string()).optional(),
    /** Slugs of related treatments for cross-linking. */
    relatedTreatmentSlugs: z.array(z.string()).optional(),
    faqs: z.array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    ).optional(),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    location: z.string().optional(),
    /** Country slug for filtering testimonials on country landing pages. */
    targetCountry: targetCountrySchema.optional(),
    quote: z.string().min(1),
    image: z.string().optional(),
    video: z.string().optional(),
    videoDuration: z.string().optional(),
    brandLabel: z.string().optional(),
    relatedTreatmentSlugs: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    title: z.string().min(1),
    excerpt: z.string().min(1),
    coverImage: z.string().optional(),
    author: z.string().min(1).default('Khan Meditour Team'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    relatedTreatmentSlugs: z.array(z.string()).optional(),
    /** Country slugs for filtering blog posts on country landing pages. */
    targetCountries: z.array(targetCountrySchema).optional(),
  }),
});

const procedures = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    /** Long-tail SEO H1 for the procedure detail page; falls back to `name` if absent. */
    seoHeadline: z.string().optional(),
    /** Parent treatment slug — e.g. "hematology-bone-marrow". */
    parentTreatmentSlug: z.string().min(1),
    /** Concise AI-extractable summary shown in the "In short" callout after the hero. */
    summary: z.string().min(1),
    description: z.string().min(1),
    fromPrice: z.string().optional(),
    toPrice: z.string().optional(),
    duration: z.string().optional(),
    hospitalStay: z.string().optional(),
    recoveryTime: z.string().optional(),
    image: z.string().optional(),
    /** Who is this procedure for — eligibility criteria. */
    eligibility: z.array(z.string()).optional(),
    /** Items included in the cost estimate. */
    costInclusions: z.array(z.string()).optional(),
    /** Items not included in the cost estimate. */
    costExclusions: z.array(z.string()).optional(),
    /** Structured recovery timeline phases for the recovery table. */
    recoveryTimeline: z.array(
      z.object({
        phase: z.string().min(1),
        duration: z.string().min(1),
        description: z.string().min(1),
      })
    ).optional(),
    /** Procedure-specific risks for the safety section. */
    risks: z.array(z.string()).optional(),
    relatedDoctorSlugs: z.array(z.string()).optional(),
    relatedHospitalSlugs: z.array(z.string()).optional(),
    /** Slugs of related procedures (within the same category) for cross-linking. */
    relatedProcedureSlugs: z.array(z.string()).optional(),
    faqs: z.array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    ).optional(),
  }),
});

export const collections = {
  doctors,
  hospitals,
  treatments,
  procedures,
  testimonials,
  blog,
};
