import { defineCollection, z } from 'astro:content';

const LOCALES = ['en', 'bn'] as const;

const localeSchema = z.enum(LOCALES);

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
    procedures: z.array(z.string()).optional(),
    relatedDoctorSlugs: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    locale: localeSchema,
    name: z.string().min(1),
    location: z.string().optional(),
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
  }),
});

export const collections = {
  doctors,
  hospitals,
  treatments,
  testimonials,
  blog,
};
