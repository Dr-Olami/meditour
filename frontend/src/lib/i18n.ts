import en from '../i18n/en.json';
import bn from '../i18n/bn.json';

export const translations: Record<string, typeof en> = {
  en,
  bn,
};

export type Locale = 'en' | 'bn';

/**
 * Retrieve the translation catalog for a locale.
 *
 * @param locale - Target locale.
 * @returns Translation object.
 */
export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en;
}

/**
 * Get the alternative locale code.
 *
 * @param locale - Current locale.
 * @returns The other supported locale.
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'bn' ? 'en' : 'bn';
}
