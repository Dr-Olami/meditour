import type { CountryMetadata } from './types';

/**
 * Shared treatment cost comparison data, keyed by region.
 *
 * Prices reflect Bangalore hospital package ranges (USD) as of 2026.
 * The `localCurrency` field is left empty here and populated per-country
 * since each country has its own currency conversion.
 */
export const baseTreatmentCosts: CountryMetadata['treatmentCosts'] = {
  cardiology: {
    indiaUSD: '$4,500–12,000',
    localCurrency: '',
    usaCost: '$70,000–150,000',
    savingsPercent: '~93% less',
    alternatives: { Singapore: '$35,000–50,000', Thailand: '$15,000–25,000' },
  },
  'cancer-treatment': {
    indiaUSD: '$3,000–25,000',
    localCurrency: '',
    usaCost: '$50,000–200,000',
    savingsPercent: '~89% less',
    alternatives: { Singapore: '$40,000–120,000', Thailand: '$12,000–60,000' },
  },
  'orthopedics-surgery': {
    indiaUSD: '$2,500–8,000',
    localCurrency: '',
    usaCost: '$30,000–60,000',
    savingsPercent: '~85% less',
    alternatives: { Singapore: '$18,000–35,000', Thailand: '$8,000–18,000' },
  },
  'organ-treatment': {
    indiaUSD: '$25,000–40,000',
    localCurrency: '',
    usaCost: '$300,000–500,000',
    savingsPercent: '~92% less',
    alternatives: { Singapore: '$200,000–350,000', Turkey: '$80,000–140,000' },
  },
  'infertility-treatment': {
    indiaUSD: '$3,500–7,000',
    localCurrency: '',
    usaCost: '$15,000–30,000',
    savingsPercent: '~75% less',
    alternatives: { Singapore: '$12,000–20,000', Thailand: '$6,000–12,000' },
  },
  'neuro-and-spine-surgery': {
    indiaUSD: '$4,000–12,000',
    localCurrency: '',
    usaCost: '$50,000–150,000',
    savingsPercent: '~90% less',
    alternatives: { Singapore: '$30,000–80,000', Thailand: '$12,000–30,000' },
  },
  'cosmetic-surgery': {
    indiaUSD: '$2,000–10,000',
    localCurrency: '',
    usaCost: '$10,000–40,000',
    savingsPercent: '~75% less',
    alternatives: { Thailand: '$3,000–15,000', Turkey: '$2,500–12,000' },
  },
  'ophthalmology': {
    indiaUSD: '$300–2,500',
    localCurrency: '',
    usaCost: '$2,000–6,000',
    savingsPercent: '~65% less',
    alternatives: { Thailand: '$500–3,000', Turkey: '$400–2,500' },
  },
};

/**
 * Standard 4-step visa process for e-visa countries.
 * Used by most South Asian and African countries.
 */
export const standardVisaSteps: CountryMetadata['visaSteps'] = [
  {
    title: 'Share medical reports',
    description:
      'Send your medical reports via WhatsApp so we can obtain a hospital invitation letter for your visa application.',
  },
  {
    title: 'Receive invitation letter',
    description:
      'A partner hospital issues an appointment/invitation letter required by the Indian mission or e-visa channel.',
  },
  {
    title: 'Apply at Indian mission / e-visa',
    description:
      'Submit your passport, photos, medical documents, and the invitation letter. Attendant visas can be filed for family members.',
  },
  {
    title: 'Travel & admission',
    description:
      'Once the visa is issued, we coordinate flight guidance, airport pickup, and hospital admission in India.',
  },
];

/**
 * Visa steps for visa-on-arrival countries (e.g. Maldives, GCC nationals).
 */
export const visaOnArrivalSteps: CountryMetadata['visaSteps'] = [
  {
    title: 'Share medical reports',
    description:
      'Send your medical reports via WhatsApp so we can match you with the right hospital and obtain an appointment letter.',
  },
  {
    title: 'Receive hospital appointment',
    description:
      'A partner hospital issues an appointment letter confirming your consultation and treatment plan.',
  },
  {
    title: 'Travel to India (visa on arrival)',
    description:
      'Citizens receive visa on arrival in India. Carry your passport, medical reports, and appointment letter.',
  },
  {
    title: 'Travel & admission',
    description:
      'We coordinate flight guidance, airport pickup, and hospital admission in India.',
  },
];

/**
 * Visa steps for visa-free countries (e.g. Nepal).
 */
export const visaFreeSteps: CountryMetadata['visaSteps'] = [
  {
    title: 'Travel to India (visa-free)',
    description:
      'Citizens can travel to India without a visa under bilateral treaties. Carry your citizenship card and medical reports.',
  },
  {
    title: 'Share medical reports',
    description:
      'Send your medical reports via WhatsApp so we can match you with the right hospital and obtain an appointment letter.',
  },
  {
    title: 'Receive hospital appointment',
    description:
      'A partner hospital issues an appointment letter confirming your consultation and treatment plan.',
  },
  {
    title: 'Travel & admission',
    description:
      'We coordinate flight guidance, airport pickup, and hospital admission in India.',
  },
];

/**
 * Apply local currency conversion to base treatment costs.
 * Returns a new object with `localCurrency` populated using the given formatter.
 *
 * @param costs - Base treatment costs (from baseTreatmentCosts).
 * @param formatPrice - Function that converts a USD price string to local currency.
 * @returns Treatment costs with local currency values filled in.
 */
export function withLocalCurrency(
  costs: CountryMetadata['treatmentCosts'],
  formatPrice: (usdRange: string) => string,
): CountryMetadata['treatmentCosts'] {
  const result: CountryMetadata['treatmentCosts'] = {};
  for (const [key, value] of Object.entries(costs)) {
    result[key] = {
      ...value,
      localCurrency: formatPrice(value.indiaUSD),
    };
  }
  return result;
}
