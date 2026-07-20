/**
 * Format a date for display in a given locale.
 *
 * @param date - Date to format.
 * @param locale - Target locale (`en` or `bn`).
 * @returns Localised date string.
 */
export function formatDate(date: Date, locale: string): string {
  const tag = locale === 'bn' ? 'bn-BD' : 'en-US';
  return new Intl.DateTimeFormat(tag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
