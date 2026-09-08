/**
 * Top country-procedure links for footer and navigation entry points.
 *
 * Returns country x procedure combinations as { label, href } pairs.
 * Links are interleaved across countries (2 procedures per country) so
 * the footer shows breadth across countries rather than depth on 2.
 *
 * @param locale - 'en' or 'bn'. BN links are only generated for Bangladesh.
 * @param limit - Maximum number of links to return (default 24).
 */

// Reason: these show the most popular combinations in the footer. The full
// set of 2,108 EN + 68 BN pages is accessible via country pages.
const TOP_COUNTRIES_EN = [
  { slug: 'nigeria', name: 'Nigeria', nationality: 'Nigerian' },
  { slug: 'bangladesh', name: 'Bangladesh', nationality: 'Bangladeshi' },
  { slug: 'uae', name: 'UAE', nationality: 'Emirati' },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', nationality: 'Saudi' },
  { slug: 'kenya', name: 'Kenya', nationality: 'Kenyan' },
  { slug: 'iraq', name: 'Iraq', nationality: 'Iraqi' },
  { slug: 'oman', name: 'Oman', nationality: 'Omani' },
  { slug: 'sudan', name: 'Sudan', nationality: 'Sudanese' },
  { slug: 'uganda', name: 'Uganda', nationality: 'Ugandan' },
  { slug: 'yemen', name: 'Yemen', nationality: 'Yemeni' },
  { slug: 'ghana', name: 'Ghana', nationality: 'Ghanaian' },
  { slug: 'ethiopia', name: 'Ethiopia', nationality: 'Ethiopian' },
];

const TOP_COUNTRIES_BN = [
  { slug: 'bangladesh', name: 'বাংলাদেশ', nationality: 'বাংলাদেশি' },
];

const TOP_PROCEDURES = [
  { slug: 'heart-bypass-surgery-cabg-cost-india', name: 'Heart Bypass Surgery (CABG)', nameBn: 'হার্ট বাইপাস সার্জারি' },
  { slug: 'ivf-treatment-cost-india', name: 'IVF Treatment', nameBn: 'আইভিএফ ট্রিটমেন্ট' },
  { slug: 'total-knee-replacement-cost-india', name: 'Knee Replacement', nameBn: 'হাঁটু প্রতিস্থাপন' },
  { slug: 'bone-marrow-transplant-cost-india', name: 'Bone Marrow Transplant', nameBn: 'বোন ম্যারো ট্রান্সপ্লান্ট' },
  { slug: 'kidney-transplant-cost-india', name: 'Kidney Transplant', nameBn: 'কিডনি ট্রান্সপ্লান্ট' },
  { slug: 'chemotherapy-cost-india', name: 'Chemotherapy', nameBn: 'কেমোথেরাপি' },
];

export interface PopularLink {
  label: string;
  href: string;
}

/**
 * Generate interleaved country-procedure links for the footer.
 *
 * Reason: Instead of generating all procedures for the first country, then
 * all for the second, etc., this interleaves — first procedure for each
 * country, then second procedure for each country. This gives the footer
 * broad country coverage within the link limit.
 *
 * @param locale - 'en' or 'bn'.
 * @param limit - Maximum links to return.
 * @returns Array of { label, href } pairs.
 */
export function getTopCountryProcedureLinks(
  locale: 'en' | 'bn' = 'en',
  limit: number = 24,
): PopularLink[] {
  const countries = locale === 'bn' ? TOP_COUNTRIES_BN : TOP_COUNTRIES_EN;
  const prefix = locale === 'bn' ? '/bn' : '';
  const links: PopularLink[] = [];

  // Reason: Interleave — iterate procedures in the outer loop and countries
  // in the inner loop, so the first 12 links cover 1 procedure × 12 countries
  // instead of 6 procedures × 2 countries.
  for (const proc of TOP_PROCEDURES) {
    for (const country of countries) {
      const pageSlug = proc.slug.replace(/-cost-india$/, '-in-india');
      const name = locale === 'bn' ? proc.nameBn : proc.name;
      const nationality = country.nationality;
      links.push({
        label: `${name} for ${nationality} patients`,
        href: `${prefix}/countries/${country.slug}/${pageSlug}`,
      });
      if (links.length >= limit) return links;
    }
  }

  return links;
}
