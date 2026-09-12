import { defineCollection, z } from 'astro:content';

const LOCALES = ['en', 'bn'] as const;

const localeSchema = z.enum(LOCALES);

/**
 * Country slugs matching the keys in `src/data/countries/`.
 * Used to tag testimonials and blog posts for country-specific landing pages.
 * 'global' indicates content relevant to all countries.
 */
const COUNTRY_SLUGS = [
  'afghanistan',
  'australia',
  'bahrain',
  'bangladesh',
  'cameroon',
  'canada',
  'egypt',
  'ethiopia',
  'ghana',
  'iran',
  'iraq',
  'jordan',
  'kazakhstan',
  'kenya',
  'kuwait',
  'maldives',
  'nepal',
  'nigeria',
  'oman',
  'qatar',
  'rwanda',
  'saudi-arabia',
  'sri-lanka',
  'sudan',
  'tanzania',
  'uae',
  'uganda',
  'uk',
  'usa',
  'yemen',
  'zimbabwe',
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
    faqs: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })
      )
      .optional(),
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
    /** Grouped amenities with optional highlighted features for scannable,
     *  hospital-specific differentiation. Replaces the flat `amenities` chip
     *  dump with categorized sub-sections (International Patient Services,
     *  Clinical Facilities, Patient & Family Comfort) where the top 2-3
     *  hospital-differentiating amenities get a short one-line description. */
    structuredAmenities: z
      .array(
        z.object({
          /** Category label key — maps to i18n `hospitals.amenityCategories.{key}`. */
          category: z.string().min(1),
          /** Highlighted amenities with a short descriptive line explaining
           *  why this amenity matters at this specific hospital. Rendered as
           *  feature cards above the chip cloud for the category. */
          highlights: z
            .array(
              z.object({
                name: z.string().min(1),
                description: z.string().min(1),
              })
            )
            .optional(),
          /** Remaining amenities in this category rendered as chips. */
          items: z.array(z.string().min(1)).optional(),
        })
      )
      .optional(),
    establishedYear: z.number().int().positive().optional(),
    bedCount: z.number().int().positive().optional(),
    specialities: z.array(z.string()).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    /** Google Maps embed URL for the hospital location.
     *  Format: https://www.google.com/maps?q=<query>&output=embed
     *  Use the hospital name + city for accurate geocoding. */
    mapEmbedUrl: z.string().url().optional(),
    /** Latitude / longitude for static map thumbnail generation.
     *  Used by the MapEmbed facade to show a real map image without
     *  loading the full Google Maps iframe. */
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    /** Verified volume/outcome metrics rendered as a distinct "By the numbers" box.
     *  Each entry has a big value, a short label, and an optional qualifier
     *  (e.g. "as of 2024", "network-wide", "cumulative"). */
    outcomes: z
      .array(
        z.object({
          value: z.string().min(1),
          label: z.string().min(1),
          qualifier: z.string().optional(),
        })
      )
      .optional(),
    /** Estimated procedure costs for international patients, shown as a
     *  transparent cost table. Prices are USD ranges and include hospital
     *  stay, surgeon fees, and standard implants where applicable.
     *  Actual costs vary by case complexity and individual patient needs. */
    procedureCosts: z
      .array(
        z.object({
          procedure: z.string().min(1),
          fromPrice: z.string().min(1),
          toPrice: z.string().min(1),
          /** Optional note (e.g. "excluding implants", "per cycle"). */
          note: z.string().optional(),
          /** Link to the full procedure cost page. */
          href: z.string().optional(),
        })
      )
      .optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })
      )
      .optional(),
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
    recoveryTimeline: z
      .array(
        z.object({
          phase: z.string().min(1),
          duration: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .optional(),
    /** Procedure-specific risks for the safety section. */
    risks: z.array(z.string()).optional(),
    /** Slugs of related treatments for cross-linking. */
    relatedTreatmentSlugs: z.array(z.string()).optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })
      )
      .optional(),
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
    /** Hospital slug to associate the testimonial with a specific hospital page. */
    hospitalId: z.string().optional(),
    /** Patient star rating 1-5, used for AggregateRating JSON-LD and review cards. */
    rating: z.number().min(1).max(5).optional(),
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
    recoveryTimeline: z
      .array(
        z.object({
          phase: z.string().min(1),
          duration: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .optional(),
    /** Procedure-specific risks for the safety section. */
    risks: z.array(z.string()).optional(),
    relatedDoctorSlugs: z.array(z.string()).optional(),
    relatedHospitalSlugs: z.array(z.string()).optional(),
    /** Slugs of related procedures (within the same category) for cross-linking. */
    relatedProcedureSlugs: z.array(z.string()).optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })
      )
      .optional(),
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
