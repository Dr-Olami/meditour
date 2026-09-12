/**
 * Currency conversion helpers for procedure × country pages.
 *
 * Converts USD price strings (from procedure frontmatter) to local currency
 * using exchange rates from country metadata.
 */

/**
 * Extract the numeric value from a USD price string.
 *
 * @param usd - Price string like "$4,500" or "$12,000".
 * @returns Numeric value, or NaN if parsing fails.
 */
function parseUsd(usd: string): number {
  return Number(usd.replace(/[$,\s]/g, ''));
}

/**
 * Format a number as a local currency string.
 *
 * @param value - Numeric amount.
 * @param symbol - Currency symbol (e.g. '৳', '₦', 'د.إ').
 * @returns Formatted string like '৳495,000'.
 */
function formatLocal(value: number, symbol: string): string {
  return `${symbol}${Math.round(value).toLocaleString('en-US')}`;
}

/**
 * Convert a single USD price string to local currency.
 *
 * @param usd - Single price string like '$4,500'.
 * @param exchangeRate - USD-to-local exchange rate.
 * @param symbol - Local currency symbol.
 * @returns Converted string like '৳495,000', or the original if parsing fails.
 */
function convertSingle(usd: string, exchangeRate: number, symbol: string): string {
  const num = parseUsd(usd);
  if (isNaN(num)) return usd;
  return formatLocal(num * exchangeRate, symbol);
}

/**
 * Convert a USD price string (possibly a range) to local currency.
 *
 * Handles both single prices ("$4,500") and ranges ("$4,500–$12,000" or
 * "$4,500 - $12,000"). Uses en-dash (–) as the range separator in output
 * to match the existing country data format.
 *
 * @param usdPrice - Price string like '$4,500' or '$4,500–$12,000'.
 * @param exchangeRate - USD-to-local exchange rate from country metadata.
 * @param symbol - Local currency symbol from country metadata.
 * @returns Converted price string like '৳495,000' or '৳495,000–৳1,320,000'.
 *
 * @example
 * convertUsdToLocal('$4,500', 110, '৳')  // '৳495,000'
 * convertUsdToLocal('$4,500–$12,000', 110, '৳')  // '৳495,000–৳1,320,000'
 */
export function convertUsdToLocal(usdPrice: string, exchangeRate: number, symbol: string): string {
  // Reason: country data uses en-dash (–) but some procedure files may use
  // hyphen (-) or em-dash (—). Normalize all dash variants before splitting.
  const normalized = usdPrice.replace(/—|–|-/g, '–');
  if (normalized.includes('–')) {
    const [low, high] = normalized
      .split('–')
      .map((s) => convertSingle(s.trim(), exchangeRate, symbol));
    return `${low}–${high}`;
  }
  return convertSingle(normalized.trim(), exchangeRate, symbol);
}

/**
 * Build a combined price string showing both USD and local currency.
 *
 * @param usdPrice - USD price string from procedure frontmatter.
 * @param exchangeRate - USD-to-local exchange rate.
 * @param symbol - Local currency symbol.
 * @param currencyCode - ISO currency code (e.g. 'BDT', 'NGN').
 * @returns Combined string like '$4,500 (≈ ৳495,000)'.
 */
export function formatWithLocal(
  usdPrice: string,
  exchangeRate: number,
  symbol: string,
  currencyCode: string
): string {
  const local = convertUsdToLocal(usdPrice, exchangeRate, symbol);
  return `${usdPrice} (≈ ${local} ${currencyCode})`;
}
