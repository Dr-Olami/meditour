/**
 * Convert a human-readable price string such as "$1,500" or "$2500" into a
 * numeric value. Returns 0 when the value cannot be parsed.
 *
 * @param price - Price string from content.
 * @returns Parsed number or 0.
 */
export function parsePrice(price: string | undefined): number {
  if (!price) return 0;
  const cleaned = price.replace(/[^\d.]/g, '');
  const value = Number.parseFloat(cleaned);
  return Number.isNaN(value) ? 0 : value;
}
