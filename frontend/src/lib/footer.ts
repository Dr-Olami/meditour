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
    // Reason: country landing pages are English-only for MVP, so this link
    // stays unprefixed even in bn locale to avoid a /bn/for 404.
    { label: t.nav.countries, href: '/for' },
    { label: t.footer.secondOpinion, href: `${prefix}/second-opinion` },
    { label: t.footer.terms, href: `${prefix}/terms` },
    { label: t.footer.policies, href: `${prefix}/privacy` },
  ];
}
