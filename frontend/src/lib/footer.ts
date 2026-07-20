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
    { label: t.footer.terms, href: `${prefix}/terms` },
    { label: t.footer.policies, href: `${prefix}/privacy` },
  ];
}
