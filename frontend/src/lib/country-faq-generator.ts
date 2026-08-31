import type { CountryMetadata, CountryFAQItem } from '../data/countries';
import type { FAQItem } from './faq-generator';

/**
 * Generate country-specific FAQs from country metadata.
 *
 * Produces 8–10 FAQs per country covering the most common search intents:
 * cost savings, visa process, language support, travel logistics, hospital
 * quality, cultural accommodations, payment methods, and family travel.
 *
 * Manual FAQs from `country.manualFaqs` are merged in via `mergeCountryFaqs()`.
 *
 * @param country - Country metadata from `src/data/countries/`.
 * @returns Array of FAQ items with question and answer strings.
 */
export function generateCountryFaqs(country: CountryMetadata): FAQItem[] {
  const faqs: FAQItem[] = [];
  const { name, nationality, currency } = country;

  // 1. Cost savings FAQ — highest search intent
  faqs.push({
    question: `How much can I save on medical treatment in India compared to ${name}?`,
    answer: `${nationality} patients typically save ${country.costSavingsVsLocal} on medical procedures in India compared to ${country.costComparisonCountries.join(', ')}. For example, cardiac surgery that costs $70,000–150,000 in the USA costs approximately ${country.treatmentCosts.cardiology?.indiaUSD ?? '$4,500–12,000'} in India at JCI-accredited hospitals. All prices are provided upfront with no hidden fees.`,
  });

  // 2. Visa process FAQ
  const visaDesc =
    country.visaType === 'on-arrival'
      ? `${nationality} citizens receive visa on arrival in India`
      : country.visaType === 'visa-free'
        ? `${nationality} citizens can travel to India without a visa under bilateral treaties`
        : `${nationality} citizens can apply for a medical visa ${country.visaType === 'e-visa' ? 'online through the e-visa portal' : 'through the Indian embassy'}`;
  faqs.push({
    question: `What is the visa process for ${nationality} patients traveling to India?`,
    answer: `${visaDesc}. The typical processing time is ${country.visaProcessingTime}. We provide complete visa assistance including invitation letters from partner hospitals and guidance through the application process. Attendant visas can be filed for family members.`,
  });

  // 3. Language support FAQ
  if (country.languages.length > 1) {
    faqs.push({
      question: `Do Indian hospitals have ${country.languages[0]}-speaking staff?`,
      answer: `Yes, all our partner hospitals in Bangalore have ${country.languages.join(' and ')}-speaking coordinators and interpreters. Our Khan Meditour team also provides 24/7 support in ${country.languages.join(', ')} throughout your medical journey.`,
    });
  } else if (country.languages[0] === 'English') {
    faqs.push({
      question: `Do Indian hospitals have English-speaking staff for ${nationality} patients?`,
      answer: `Yes, all our partner hospitals have English-speaking doctors, nurses, and coordinators. English is widely spoken in Indian healthcare, so ${nationality} patients will have no language barriers during their treatment and recovery.`,
    });
  }

  // 4. Travel logistics FAQ
  const flightDesc = country.directFlights
    ? `Direct flights operate regularly from ${country.majorCities.join(', ')} to India (approximately ${country.flightTime}).`
    : `Flights from ${country.majorCities[0]} to India typically take ${country.flightTime} with one connection.`;
  faqs.push({
    question: `How do I travel from ${country.majorCities[0]} to India for treatment?`,
    answer: `${flightDesc} We can assist with flight bookings, airport pickup, and ground transportation to your hospital and accommodation. Our team coordinates your entire journey from departure to return.`,
  });

  // 5. Hospital quality FAQ
  faqs.push({
    question: `Are Indian hospitals safe and accredited for ${nationality} patients?`,
    answer: `Yes, all our partner hospitals are JCI (Joint Commission International) accredited or NABH certified, meeting the same international standards as hospitals in ${country.costComparisonCountries[0]}. They have dedicated international patient departments with experience treating thousands of ${nationality} patients.`,
  });

  // 6. Cultural considerations FAQ (if applicable)
  if (country.culturalConsiderations.length > 0) {
    faqs.push({
      question: `Do hospitals in India accommodate ${nationality} cultural and religious needs?`,
      answer: `Yes, our partner hospitals provide ${country.culturalConsiderations.join(', ')}. We ensure your cultural and religious needs are respected throughout your treatment and recovery.`,
    });
  }

  // 7. Payment methods FAQ
  faqs.push({
    question: `What payment methods are accepted from ${name}?`,
    answer: `We accept international bank transfers, credit cards (Visa, Mastercard, American Express), and can coordinate with banks in ${name} for medical loan arrangements. Payment plans are available for major procedures. All costs are provided upfront in USD with approximate ${currency.code} references for planning.`,
  });

  // 8. Family accommodation FAQ
  faqs.push({
    question: `Can my family accompany me from ${name}?`,
    answer: `Yes, family members can apply for attendant visas. We arrange family-friendly accommodation near the hospital with ${country.languages[0]} food options and provide support for your entire family during your treatment and recovery period.`,
  });

  // 9. City recommendation FAQ
  if (country.recommendedCities.length > 0) {
    const cityList = country.recommendedCities.map((c) => c.name).join(', ');
    faqs.push({
      question: `Which Indian cities are best for ${nationality} patients?`,
      answer: `For ${nationality} patients, we recommend ${cityList}. ${country.recommendedCities[0].name} is ${country.recommendedCities[0].flightTime} and specializes in ${country.recommendedCities[0].specialties.join(', ')}. We help you choose the right city based on your specific treatment needs and travel preferences.`,
    });
  }

  // 10. Treatment cost FAQ (specific to currency)
  faqs.push({
    question: `How much does medical treatment in India cost for patients from ${name}?`,
    answer: `Treatment costs in India are quoted in USD with approximate ${currency.code} (${currency.symbol}) references for planning. For example, cardiac surgery costs ${country.treatmentCosts.cardiology?.indiaUSD ?? '$4,500–12,000'} in India vs $70,000–150,000 in the USA. Final quotes follow medical review of your reports — request a written quote for your specific case.`,
  });

  return faqs;
}

/**
 * Merge auto-generated country FAQs with manual overrides.
 *
 * Manual FAQs with matching questions override auto-generated answers.
 * Manual FAQs with new questions are appended to the end.
 *
 * @param auto - Auto-generated FAQ items from `generateCountryFaqs()`.
 * @param manual - Manual FAQ items from `country.manualFaqs`.
 * @returns Merged FAQ array.
 */
export function mergeCountryFaqs(
  auto: FAQItem[],
  manual?: CountryFAQItem[]
): FAQItem[] {
  if (!manual?.length) return auto;
  const manualQuestions = new Set(manual.map((m) => m.question.toLowerCase()));
  const filteredAuto = auto.filter(
    (a) => !manualQuestions.has(a.question.toLowerCase())
  );
  return [...filteredAuto, ...manual];
}
