/**
 * FAQ generator for procedure × country landing pages.
 *
 * Combines procedure-level data (cost, recovery, risks) with country-level
 * data (visa, travel, currency) to produce FAQs that target the keyword
 * pattern: "{procedure} in India for {nationality} patients".
 */

import type { CountryMetadata } from '../data/countries/types';
import type { FAQItem } from './faq-generator';
import { convertUsdToLocal } from './currency';

/**
 * Minimal procedure data shape needed for FAQ generation.
 * Matches the frontmatter schema in content/config.ts.
 */
interface ProcedureData {
  name: string;
  fromPrice?: string;
  toPrice?: string;
  hospitalStay?: string;
  recoveryTime?: string;
  risks?: string[];
  faqs?: FAQItem[];
}

/**
 * Generate procedure × country specific FAQs.
 *
 * Produces 4 auto-generated FAQs (cost, visa, travel, safety) and merges
 * them with up to 4 manual FAQs from the procedure frontmatter, capping
 * at 8 total. The auto-generated FAQs target the primary keyword pattern
 * and the most common search intents for this page type.
 *
 * @param procedure - Procedure frontmatter data.
 * @param country - Country metadata from data/countries/.
 * @returns Array of FAQ items (max 8).
 */
export function generateProcedureCountryFaqs(
  procedure: ProcedureData,
  country: CountryMetadata,
): FAQItem[] {
  const faqs: FAQItem[] = [];
  const { name: _name, nationality, currency, visaType, visaProcessingTime, majorCities, flightTime } =
    country;

  // 1. Cost question — procedure + country specific (highest search intent)
  if (procedure.fromPrice) {
    const priceRange = procedure.toPrice
      ? `${procedure.fromPrice}–${procedure.toPrice}`
      : procedure.fromPrice;
    const localPrice = procedure.toPrice
      ? `${convertUsdToLocal(procedure.fromPrice!, currency.exchangeRate, currency.symbol)}–${convertUsdToLocal(procedure.toPrice, currency.exchangeRate, currency.symbol)}`
      : convertUsdToLocal(procedure.fromPrice!, currency.exchangeRate, currency.symbol);
    faqs.push({
      question: `How much does ${procedure.name} cost in India for ${nationality.toLowerCase()} patients?`,
      answer: `${procedure.name} in India typically costs ${priceRange} USD. For ${nationality.toLowerCase()} patients, this is approximately ${localPrice} ${currency.code}. This is ${country.costSavingsVsLocal} less than private options in ${country.costComparisonCountries.join(', ')}. Final quotes follow medical review of your reports.`,
    });
  }

  // 2. Visa question — country specific
  const visaDesc =
    visaType === 'e-visa'
      ? `An e-medical visa can be applied for online and is typically processed in ${visaProcessingTime}`
      : visaType === 'on-arrival'
        ? `${nationality} citizens receive visa on arrival in India`
        : visaType === 'visa-free'
          ? `${nationality} citizens can travel to India without a visa under bilateral treaties`
          : `A regular medical visa must be submitted at the Indian mission and typically takes ${visaProcessingTime} to process`;
  faqs.push({
    question: `Do ${nationality.toLowerCase()} patients need a medical visa for ${procedure.name} in India?`,
    answer: `Yes. ${visaDesc}. Khan Meditour provides the hospital invitation letter required for your application. Attendant visas can be filed for family members travelling with you.`,
  });

  // 3. Travel/stay question — country + procedure specific
  const stayInfo = procedure.hospitalStay ? `${procedure.hospitalStay} in the hospital` : 'a hospital stay';
  const recoveryInfo = procedure.recoveryTime ? ` plus ${procedure.recoveryTime} of recovery` : '';
  faqs.push({
    question: `How long do I need to stay in India for ${procedure.name}?`,
    answer: `Most ${nationality.toLowerCase()} patients plan for ${stayInfo}${recoveryInfo}. Flight time from ${majorCities[0]} is ${flightTime}. Your surgical team will issue a fitness-to-fly certificate before you travel home.`,
  });

  // 4. Safety question — procedure specific
  if (procedure.risks && procedure.risks.length > 0) {
    const topRisks = procedure.risks.slice(0, 2).join(' and ').toLowerCase();
    faqs.push({
      question: `Is ${procedure.name} in India safe for ${nationality.toLowerCase()} patients?`,
      answer: `${procedure.name} is performed at JCI and NABH accredited hospitals with experienced surgical teams. As with any procedure, there are risks including ${topRisks}. Our partner hospitals mitigate these through safety protocols, ICU backup, and personalized consent discussions. No surgical outcome is guaranteed — discuss your individual risk profile with your surgeon.`,
    });
  }

  // 5-8. Include procedure's own manual FAQs (up to 4)
  if (procedure.faqs && procedure.faqs.length > 0) {
    faqs.push(...procedure.faqs.slice(0, 4));
  }

  // Cap at 8 FAQs total
  return faqs.slice(0, 8);
}
