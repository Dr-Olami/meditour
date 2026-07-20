import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { entrySlug } from './slug';

export type DoctorEntry = CollectionEntry<'doctors'>;
export type HospitalEntry = CollectionEntry<'hospitals'>;
export type TreatmentEntry = CollectionEntry<'treatments'>;
export type TestimonialEntry = CollectionEntry<'testimonials'>;
export type BlogEntry = CollectionEntry<'blog'>;

function byLocale<T extends { data: { locale: string } }>(locale: string) {
  return (entry: T) => entry.data.locale === locale;
}

function byName<T extends { data: { name: string } }>(a: T, b: T) {
  return a.data.name.localeCompare(b.data.name);
}

export { entrySlug } from './slug';

/**
 * Return all doctors for a given locale, sorted by name.
 */
export async function getDoctors(locale: string): Promise<DoctorEntry[]> {
  const all = await getCollection('doctors');
  return all.filter(byLocale<DoctorEntry>(locale)).sort(byName);
}

/**
 * Return all hospitals for a given locale, sorted by name.
 */
export async function getHospitals(locale: string): Promise<HospitalEntry[]> {
  const all = await getCollection('hospitals');
  return all.filter(byLocale<HospitalEntry>(locale)).sort(byName);
}

/**
 * Return all treatments for a given locale, sorted by name.
 */
export async function getTreatments(locale: string): Promise<TreatmentEntry[]> {
  const all = await getCollection('treatments');
  return all.filter(byLocale<TreatmentEntry>(locale)).sort(byName);
}

/**
 * Find a doctor entry by slug and locale.
 */
export async function getDoctorBySlug(
  locale: string,
  slug: string
): Promise<DoctorEntry | undefined> {
  const doctors = await getDoctors(locale);
  return doctors.find((d) => entrySlug(d) === slug);
}

/**
 * Find a hospital entry by slug and locale.
 */
export async function getHospitalBySlug(
  locale: string,
  slug: string
): Promise<HospitalEntry | undefined> {
  const hospitals = await getHospitals(locale);
  return hospitals.find((h) => entrySlug(h) === slug);
}

/**
 * Find a treatment entry by slug and locale.
 */
export async function getTreatmentBySlug(
  locale: string,
  slug: string
): Promise<TreatmentEntry | undefined> {
  const treatments = await getTreatments(locale);
  return treatments.find((t) => entrySlug(t) === slug);
}

/**
 * Resolve a hospital name and detail link from a doctor's hospitalId.
 */
export function resolveHospital(
  hospitalId: string,
  hospitals: HospitalEntry[]
): { name: string; href: string; entry?: HospitalEntry } | undefined {
  const entry = hospitals.find((h) => entrySlug(h) === hospitalId);
  if (!entry) return undefined;
  const slug = entrySlug(entry);
  return {
    name: entry.data.name,
    href: `/${entry.data.locale === 'bn' ? 'bn/' : ''}hospitals/${slug}`,
    entry,
  };
}

/**
 * Return all doctors attached to a specific hospital.
 */
export function getDoctorsAtHospital(
  hospitalId: string,
  doctors: DoctorEntry[]
): DoctorEntry[] {
  return doctors.filter((d) => entrySlug(d) === hospitalId).sort(byName);
}

/**
 * Resolve related doctors for a treatment from their slugs.
 */
export function resolveRelatedDoctors(
  slugs: string[] | undefined,
  doctors: DoctorEntry[]
): DoctorEntry[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => doctors.find((d) => entrySlug(d) === slug))
    .filter((d): d is DoctorEntry => d !== undefined);
}

/**
 * Return all testimonials for a given locale.
 */
export async function getTestimonials(locale: string): Promise<TestimonialEntry[]> {
  const all = await getCollection('testimonials');
  return all.filter(byLocale<TestimonialEntry>(locale));
}

/**
 * Return all blog posts for a given locale, sorted newest first.
 */
export async function getBlogPosts(locale: string): Promise<BlogEntry[]> {
  const all = await getCollection('blog');
  return all
    .filter(byLocale<BlogEntry>(locale))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

/**
 * Find a blog post by slug and locale.
 */
export async function getBlogPostBySlug(
  locale: string,
  slug: string
): Promise<BlogEntry | undefined> {
  const posts = await getBlogPosts(locale);
  return posts.find((p) => entrySlug(p) === slug);
}
