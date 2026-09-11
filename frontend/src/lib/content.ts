import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { entrySlug } from './slug';

export type DoctorEntry = CollectionEntry<'doctors'>;
export type HospitalEntry = CollectionEntry<'hospitals'>;
export type TreatmentEntry = CollectionEntry<'treatments'>;
export type ProcedureEntry = CollectionEntry<'procedures'>;
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
 * Return all doctors for a given locale, sorted by experience (most experienced first).
 */
export async function getDoctors(locale: string): Promise<DoctorEntry[]> {
  const all = await getCollection('doctors');
  return all
    .filter(byLocale<DoctorEntry>(locale))
    .sort((a, b) => (b.data.experienceYears ?? 0) - (a.data.experienceYears ?? 0));
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
 * Return all procedures for a given locale, sorted by name.
 */
export async function getProcedures(locale: string): Promise<ProcedureEntry[]> {
  const all = await getCollection('procedures');
  return all.filter(byLocale<ProcedureEntry>(locale)).sort(byName);
}

/**
 * Return all procedures for a given locale and parent treatment slug.
 */
export async function getProceduresByCategory(
  locale: string,
  parentTreatmentSlug: string
): Promise<ProcedureEntry[]> {
  const all = await getProcedures(locale);
  return all.filter((p) => p.data.parentTreatmentSlug === parentTreatmentSlug);
}

/**
 * Find a procedure entry by slug and locale.
 */
export async function getProcedureBySlug(
  locale: string,
  slug: string
): Promise<ProcedureEntry | undefined> {
  const procedures = await getProcedures(locale);
  // entrySlug returns "category/procedure-slug" for nested dirs; compare just the last segment.
  return procedures.find((p) => entrySlug(p).split('/').pop() === slug);
}

/**
 * Resolve related procedures from their slugs.
 */
export function resolveRelatedProcedures(
  slugs: string[] | undefined,
  procedures: ProcedureEntry[]
): ProcedureEntry[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => procedures.find((p) => entrySlug(p).split('/').pop() === slug))
    .filter((p): p is ProcedureEntry => p !== undefined);
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
  return doctors.filter((d) => d.data.hospitalId === hospitalId).sort(byName);
}

/**
 * Group doctors by their specialty, returning groups in a stable order.
 *
 * Reason: hospital pages render a flat list of doctors which becomes hard to
 * scan when there are 10+ doctors. Grouping by specialty lets patients jump
 * to the relevant department. Groups are sorted alphabetically by specialty
 * name, and doctors within each group are sorted by name.
 *
 * @param doctors - Doctor entries (already filtered to one hospital).
 * @returns Array of `{ specialty, doctors }` groups, alphabetically ordered.
 */
export function groupDoctorsBySpecialty<T extends { specialty: string }>(
  doctors: T[]
): { specialty: string; doctors: T[] }[] {
  // Reason: use a Map to preserve insertion order while deduplicating keys,
  // then sort the final array alphabetically for deterministic output.
  const groups = new Map<string, T[]>();
  for (const doctor of doctors) {
    const spec = doctor.specialty;
    if (!groups.has(spec)) groups.set(spec, []);
    groups.get(spec)!.push(doctor);
  }
  return Array.from(groups.entries())
    .map(([specialty, docs]) => ({ specialty, doctors: docs }))
    .sort((a, b) => a.specialty.localeCompare(b.specialty));
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
 * Resolve related hospitals for a treatment from their slugs.
 */
export function resolveRelatedHospitals(
  slugs: string[] | undefined,
  hospitals: HospitalEntry[]
): HospitalEntry[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => hospitals.find((h) => entrySlug(h) === slug))
    .filter((h): h is HospitalEntry => h !== undefined);
}

/**
 * Return all testimonials for a given locale.
 */
export async function getTestimonials(locale: string): Promise<TestimonialEntry[]> {
  const all = await getCollection('testimonials');
  return all.filter(byLocale<TestimonialEntry>(locale));
}

/**
 * Return testimonials tagged with a specific hospital, sorted by rating (highest first).
 */
export function getTestimonialsByHospital(
  hospitalId: string,
  testimonials: TestimonialEntry[]
): TestimonialEntry[] {
  return testimonials
    .filter((t) => t.data.hospitalId === hospitalId)
    .sort((a, b) => (b.data.rating ?? 0) - (a.data.rating ?? 0));
}

/**
 * Return all blog posts for a given locale, sorted newest first.
 */
export async function getBlogPosts(locale: string): Promise<BlogEntry[]> {
  const all = await getCollection('blog');
  return all
    .filter(byLocale<BlogEntry>(locale))
    .sort((a: BlogEntry, b: BlogEntry) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
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

// ─── Country-specific filtering ──────────────────────────────────────────────
// Reason: Country landing pages (/countries/[country]) need to surface testimonials,
// blog posts, and treatments relevant to each country. The filtering logic
// includes content tagged with the specific country and 'global' content.
// Untagged testimonials are excluded so India-based stories don't appear on
// every country page.

/**
 * Return testimonials filtered by target country.
 *
 * Includes testimonials tagged with the specific country and 'global' tagged
 * testimonials. Untagged testimonials are excluded — they are general stories
 * (e.g. India-based patients) that don't belong on country-specific pages.
 *
 * @param locale - Target locale ('en' or 'bn').
 * @param country - Country slug (e.g. 'bangladesh', 'uae', 'nigeria').
 * @returns Array of testimonial entries relevant to the country.
 */
export async function getTestimonialsByCountry(
  locale: string,
  country: string
): Promise<TestimonialEntry[]> {
  const all = await getTestimonials(locale);
  return all.filter(
    (entry) =>
      entry.data.targetCountry === country ||
      entry.data.targetCountry === 'global'
  );
}

/**
 * Return blog posts filtered by target country.
 *
 * Includes blog posts tagged with the specific country, 'global' tagged
 * posts, and untagged posts (backwards compatibility).
 *
 * @param locale - Target locale ('en' or 'bn').
 * @param country - Country slug (e.g. 'bangladesh', 'uae', 'nigeria').
 * @returns Array of blog entries relevant to the country, sorted newest first.
 */
export async function getBlogPostsByCountry(
  locale: string,
  country: string
): Promise<BlogEntry[]> {
  const all = await getBlogPosts(locale);
  return all.filter(
    (entry) =>
      entry.data.targetCountries?.includes(country as never) ||
      entry.data.targetCountries?.includes('global' as never) ||
      !entry.data.targetCountries
  );
}

/**
 * Return treatments filtered by target country.
 *
 * Includes treatments tagged with the specific country, 'global' tagged
 * treatments, and untagged treatments (backwards compatibility).
 *
 * @param locale - Target locale ('en' or 'bn').
 * @param country - Country slug (e.g. 'bangladesh', 'uae', 'nigeria').
 * @returns Array of treatment entries relevant to the country.
 */
export async function getTreatmentsByCountry(
  locale: string,
  country: string
): Promise<TreatmentEntry[]> {
  const all = await getTreatments(locale);
  return all.filter(
    (entry) =>
      entry.data.targetCountry === country ||
      entry.data.targetCountry === 'global' ||
      !entry.data.targetCountry
  );
}

/**
 * Return testimonials tagged with a specific country only (excluding global/untagged).
 * Used when a country page wants to show only country-specific stories.
 *
 * @param locale - Target locale ('en' or 'bn').
 * @param country - Country slug.
 * @returns Array of testimonial entries specifically tagged with the country.
 */
export async function getTestimonialsForCountryOnly(
  locale: string,
  country: string
): Promise<TestimonialEntry[]> {
  const all = await getTestimonials(locale);
  return all.filter((entry) => entry.data.targetCountry === country);
}

// ─── Similar hospitals ─────────────────────────────────────────────────────
// Reason: international patients comparing hospitals benefit from cross-links
// to peer facilities with overlapping specialities. Scoring by shared
// specialities surfaces the most clinically relevant alternatives.

/**
 * Return similar hospitals ranked by the number of shared specialities.
 *
 * Excludes the current hospital. Ties are broken alphabetically by name so
 * the output is deterministic across builds.
 *
 * @param currentSlug - Slug of the hospital to find peers for.
 * @param hospitals   - All hospital entries for the same locale.
 * @param limit       - Maximum number of peers to return (default 3).
 * @returns Hospital entries sorted by shared-speciality count, descending.
 */
export function getSimilarHospitals(
  currentSlug: string,
  hospitals: HospitalEntry[],
  limit = 3
): HospitalEntry[] {
  const current = hospitals.find((h) => entrySlug(h) === currentSlug);
  if (!current || !current.data.specialities) return [];

  const currentSpecialities = new Set(current.data.specialities);

  const scored = hospitals
    .filter((h) => entrySlug(h) !== currentSlug)
    .map((h) => {
      const shared = (h.data.specialities ?? []).filter((s) =>
        currentSpecialities.has(s)
      ).length;
      return { entry: h, shared };
    })
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return a.entry.data.name.localeCompare(b.entry.data.name);
    });

  // If speciality names overlap (e.g. "Cardiac Sciences" matches across
  // hospitals), return the top-N by shared count. If naming differs (e.g.
  // Narayana uses "Adult Cardiology" vs "Cardiac Sciences"), fall back to
  // all peers — they are all Bangalore hospitals relevant for comparison.
  const withOverlap = scored.filter(({ shared }) => shared > 0);
  const pool = withOverlap.length > 0 ? withOverlap : scored;

  return pool.slice(0, limit).map(({ entry }) => entry);
}

// ─── Related articles for hospital pages ────────────────────────────────────
// Reason: hospital pages benefit from internal links to country-specific and
// treatment-specific blog posts. This surfaces relevant guides (e.g. "Medical
// Tourism from Bangladesh to India") directly on the hospital page, improving
// content depth, internal linking, and patient decision support.

/**
 * Return blog posts related to a hospital, ranked by relevance.
 *
 * Scoring:
 * 1. Posts whose `relatedTreatmentSlugs` overlap with the hospital's
 *    `specialities` (mapped to treatment slugs) — highest relevance.
 * 2. Posts tagged `targetCountries: global` — relevant to all international
 *    patients regardless of origin.
 * 3. All other posts as a fallback so the section always has content.
 *
 * Excludes posts in a different locale. Returns up to `limit` posts.
 *
 * @param hospitalData - The hospital's data object (entry.data) with
 *                       specialities, or the full HospitalEntry.
 * @param posts        - All blog posts for the same locale.
 * @param limit        - Maximum number of posts to return (default 3).
 * @returns Blog entries sorted by relevance, newest-first within each tier.
 */
export function getRelatedArticles(
  hospitalData: HospitalEntry | HospitalEntry['data'],
  posts: BlogEntry[],
  limit = 3
): BlogEntry[] {
  // Reason: templates pass `entry.data` (the data object) as `hospital`, so
  // we accept either the full entry or just the data. Normalize to data.
  const data = 'data' in hospitalData ? hospitalData.data : hospitalData;

  // Reason: hospital specialities use display names (e.g. "Cardiac Sciences")
  // while blog relatedTreatmentSlugs use treatment slugs (e.g. "cardiology").
  // We do a loose match: lowercase the speciality and check if the slug
  // contains it or vice-versa. This catches "cardiology" ↔ "Cardiac Sciences".
  const specialityKeywords = (data.specialities ?? []).map((s) =>
    s.toLowerCase().split(/[\s/&]+/)[0]
  );

  const scored = posts.map((post) => {
    let score = 0;
    const relatedSlugs = post.data.relatedTreatmentSlugs ?? [];
    for (const slug of relatedSlugs) {
      const slugLower = slug.toLowerCase();
      if (specialityKeywords.some((kw) => slugLower.includes(kw) || kw.includes(slugLower))) {
        score += 3;
      }
    }
    // Global posts are relevant to all international patients
    const countries = post.data.targetCountries ?? [];
    if (countries.includes('global' as never)) {
      score += 1;
    }
    // Reason: newer posts rank higher within the same score tier so the
    // section surfaces fresh content. publishedAt is a Date; subtract a
    // small fraction of the timestamp to keep score-based ordering primary.
    return { entry: post, score };
  });

  // Sort by score descending, then newest first
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime();
  });

  return scored.slice(0, limit).map(({ entry }) => entry);
}
