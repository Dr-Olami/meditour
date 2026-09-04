import type { Locale } from './i18n';
import { getTranslations } from './i18n';

export interface FooterLegalLink {
  label: string;
  href: string;
}

/**
 * Build the canonical footer legal links (Terms & Conditions, Policies) for
 * a given locale so every page renders the same footer, mirroring
 * `getNavLinks` for the navbar.
 *
 * @param locale - Active locale ('en' or 'bn').
 * @returns Ordered list of footer legal links.
 */
export function getFooterLegalLinks(locale: Locale): FooterLegalLink[] {
  const t = getTranslations(locale);
  const prefix = locale === 'bn' ? '/bn' : '';

  return [
    // Reason: /bn/countries now has a real Bengali directory page, so the
    // countries link uses the locale prefix like other footer links.
    { label: t.nav.countries, href: `${prefix}/countries` },
    { label: t.nav.howItWorks, href: `${prefix}/how-it-works` },
    { label: t.nav.visaAssistance, href: `${prefix}/medical-visa-assistance` },
    { label: t.nav.travelAccommodation, href: `${prefix}/travel-accommodation-assistance` },
    { label: t.nav.emergency, href: `${prefix}/emergency-urgent-cases` },
    { label: t.nav.whyIndia, href: `${prefix}/why-india-for-medical-treatment` },
    { label: t.nav.costCalculator, href: `${prefix}/cost-calculator` },
    { label: t.nav.accreditations, href: `${prefix}/accreditations-certifications` },
    { label: t.nav.contact, href: `${prefix}/contact` },
    { label: t.footer.secondOpinion, href: `${prefix}/second-opinion` },
    { label: t.footer.terms, href: `${prefix}/terms` },
    { label: t.footer.policies, href: `${prefix}/privacy` },
  ];
}
