import type { Locale } from './i18n';
import { getTranslations } from './i18n';

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Build the canonical, site-wide navbar links for a given locale.
 *
 * This is the single source of truth for navbar contents so that every
 * page (home, treatments, doctors, hospitals, blog, etc.) renders the
 * exact same set of links, each pointing to a real route rather than a
 * page-specific in-page anchor (avoids "Treatments" only scrolling on
 * the homepage while other pages omit it entirely).
 *
 * @param locale - Active locale ('en' or 'bn').
 * @returns Ordered list of navbar links.
 */
export function getNavLinks(locale: Locale): NavLink[] {
  const t = getTranslations(locale);
  const prefix = locale === 'bn' ? '/bn' : '';

  return [
    { label: t.nav.treatments, href: `${prefix}/treatments` },
    { label: t.nav.doctors, href: `${prefix}/doctors` },
    { label: t.nav.hospitals, href: `${prefix}/hospitals` },
    // Reason: /bn/countries now has a real Bengali directory page, so the
    // countries link uses the locale prefix like other nav links.
    { label: t.nav.countries, href: `${prefix}/countries` },
    { label: t.nav.secondOpinion, href: `${prefix}/second-opinion` },
    { label: t.nav.blog, href: `${prefix}/blog` },
    { label: t.nav.contact, href: `${prefix}/contact` },
  ];
}
