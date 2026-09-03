import type { CountryMetadata, CountryFAQItem } from '../data/countries';
import type { FAQItem } from './faq-generator';

/**
 * Generate country-specific FAQs in Bengali from country metadata.
 *
 * Reason: the English `country-faq-generator.ts` produces English FAQ strings.
 * Bengali country pages need Bengali FAQs, so this parallel module mirrors
 * the structure with Bengali templates. Manual FAQs from `country.manualFaqs`
 * are merged in via `mergeCountryFaqsBn()`.
 *
 * @param country - Bengali country metadata from `src/data/countries/bn/`.
 * @returns Array of FAQ items with Bengali question and answer strings.
 */
export function generateCountryFaqsBn(country: CountryMetadata): FAQItem[] {
  const faqs: FAQItem[] = [];
  const { name, nationality, currency } = country;

  // 1. Cost savings FAQ
  faqs.push({
    question: `${name} এর তুলনায় ভারতে চিকিৎসায় কত সাশ্রয় হয়?`,
    answer: `${nationality} রোগীরা ভারতে চিকিৎসায় সাধারণত ${country.costSavingsVsLocal} সাশ্রয় করেন, ${country.costComparisonCountries.join(', ')} এর তুলনায়। উদাহরণস্বরূপ, মার্কিন যুক্তরাষ্ট্রে কার্ডিয়াক সার্জারির খরচ $70,000–150,000, ভারতে JCI-স্বীকৃত হাসপাতালে তা ${country.treatmentCosts.cardiology?.indiaUSD ?? '$4,500–12,000'}। সব মূল্য আগে থেকেই জানানো হয়, কোনো লুকানো খরচ নেই।`,
  });

  // 2. Visa process FAQ
  const visaDesc =
    country.visaType === 'on-arrival'
      ? `${nationality} নাগরিকরা ভারতে আগমনে ভিসা পান`
      : country.visaType === 'visa-free'
        ? `${nationality} নাগরিকরা দ্বিপাক্ষিক চুক্তির অধীনে ভিসা ছাড়া ভারতে ভ্রমণ করতে পারেন`
        : `${nationality} নাগরিকরা ${country.visaType === 'e-visa' ? 'ই-ভিসা পোর্টালের মাধ্যমে অনলাইনে' : 'ভারতীয় দূতাবাসের মাধ্যমে'} মেডিকেল ভিসার আবেদন করতে পারেন`;
  faqs.push({
    question: `${nationality} রোগীদের জন্য ভারতে ভিসার প্রক্রিয়া কী?`,
    answer: `${visaDesc}। সাধারণত প্রক্রিয়াকরণে সময় লাগে ${country.visaProcessingTime}। আমরা সম্পূর্ণ ভিসা সহায়তা প্রদান করি — অংশীদার হাসপাতালের আমন্ত্রণপত্র থেকে আবেদন প্রক্রিয়া পর্যন্ত। পরিবারের সদস্যদের জন্য অ্যাটেন্ড্যান্ট ভিসা আবেদন করা যায়।`,
  });

  // 3. Language support FAQ
  if (country.languages.length > 1) {
    faqs.push({
      question: `ভারতের হাসপাতালে কি ${country.languages[0]} ভাষাভাষী কর্মী আছে?`,
      answer: `হ্যাঁ, আমাদের সব অংশীদার হাসপাতালে ${country.languages.join(' ও ')} ভাষাভাষী কোঅর্ডিনেটর ও দোভাষী আছেন। খান মেডিট্যুর টিমও আপনার সম্পূর্ণ চিকিৎসা যাত্রায় ${country.languages.join(', ')} ভাষায় ২৪/৭ সহায়তা দেয়।`,
    });
  }

  // 4. Travel logistics FAQ
  const flightDesc = country.directFlights
    ? `${country.majorCities.join(', ')} থেকে ভারতে নিয়মিত সরাসরি ফ্লাইট আছে (প্রায় ${country.flightTime})।`
    : `${country.majorCities[0]} থেকে ভারতে ফ্লাইটে সাধারণত ${country.flightTime} সময় লাগে, একটি সংযোগসহ।`;
  faqs.push({
    question: `${country.majorCities[0]} থেকে ভারতে চিকিৎসার জন্য কীভাবে যাব?`,
    answer: `${flightDesc} আমরা ফ্লাইট বুকিং, এয়ারপোর্ট পিকআপ এবং হাসপাতাল ও থাকার জায়গায় পরিবহন সহায়তা দিতে পারি। আমাদের টিম আপনার সম্পূর্ণ যাত্রা প্রস্থান থেকে ফেরার পর্যন্ত সমন্বয় করে।`,
  });

  // 5. Hospital quality FAQ
  faqs.push({
    question: `ভারতের হাসপাতাল কি ${nationality} রোগীদের জন্য নিরাপদ ও স্বীকৃত?`,
    answer: `হ্যাঁ, আমাদের সব অংশীদার হাসপাতাল JCI (Joint Commission International) স্বীকৃত বা NABH প্রত্যয়িত, ${country.costComparisonCountries[0]} এর হাসপাতালের মতো একই আন্তর্জাতিক মান বজায় রাখে। এগুলোতে আন্তর্জাতিক রোগী বিভাগ আছে, হাজার হাজার ${nationality} রোগীর সেবার অভিজ্ঞতা সহ।`,
  });

  // 6. Cultural considerations FAQ
  if (country.culturalConsiderations.length > 0) {
    faqs.push({
      question: `ভারতের হাসপাতাল কি ${nationality} সাংস্কৃতিক ও ধর্মীয় প্রয়োজন মেনে চলে?`,
      answer: `হ্যাঁ, আমাদের অংশীদার হাসপাতালে ${country.culturalConsiderations.join(', ')} পাওয়া যায়। আমরা নিশ্চিত করি যে আপনার সাংস্কৃতিক ও ধর্মীয় প্রয়োজন চিকিৎসা ও সুস্থতার সময় সম্মানিত হয়।`,
    });
  }

  // 7. Payment methods FAQ
  faqs.push({
    question: `${name} থেকে কোন পেমেন্ট পদ্ধতি গ্রহণযোগ্য?`,
    answer: `আমরা আন্তর্জাতিক ব্যাংক ট্রান্সফার, ক্রেডিট কার্ড (Visa, Mastercard, American Express) গ্রহণ করি এবং ${name} এর ব্যাংকের সাথে মেডিকেল লোনের সমন্বয় করতে পারি। বড় প্রক্রিয়ার জন্য পেমেন্ট প্ল্যান পাওয়া যায়। সব খরচ USD-এ প্রদান করা হয়, পরিকল্পনার জন্য আনুমানিক ${currency.code} রেফারেন্স সহ।`,
  });

  // 8. Family accommodation FAQ
  faqs.push({
    question: `আমার পরিবার কি ${name} থেকে আমার সাথে যেতে পারবে?`,
    answer: `হ্যাঁ, পরিবারের সদস্যরা অ্যাটেন্ড্যান্ট ভিসার জন্য আবেদন করতে পারেন। আমরা হাসপাতালের কাছে পরিবার-বান্ধব থাকার ব্যবস্থা করি, ${country.languages[0]} খাবারের অপশন সহ, এবং চিকিৎসা ও সুস্থতার সময় আপনার সম্পূর্ণ পরিবারের সহায়তা দেই।`,
  });

  // 9. City recommendation FAQ
  if (country.recommendedCities.length > 0) {
    const cityList = country.recommendedCities.map((c) => c.name).join(', ');
    faqs.push({
      question: `${nationality} রোগীদের জন্য ভারতের কোন শহরগুলো সেরা?`,
      answer: `${nationality} রোগীদের জন্য আমরা ${cityList} সুপারিশ করি। ${country.recommendedCities[0].name} ${country.recommendedCities[0].flightTime} দূরে এবং ${country.recommendedCities[0].specialties.join(', ')} এ বিশেষজ্ঞ। আমরা আপনার নির্দিষ্ট চিকিৎসা প্রয়োজন ও ভ্রমণ পছন্দ অনুযায়ী সঠিক শহর বেছে নিতে সাহায্য করি।`,
    });
  }

  // 10. Treatment cost FAQ
  faqs.push({
    question: `${name} থেকে আসা রোগীদের জন্য ভারতে চিকিৎসার খরচ কত?`,
    answer: `ভারতে চিকিৎসার খরচ USD-এ উদ্ধৃত হয়, পরিকল্পনার জন্য আনুমানিক ${currency.code} (${currency.symbol}) রেফারেন্স সহ। উদাহরণস্বরূপ, কার্ডিয়াক সার্জারির খরচ ভারতে ${country.treatmentCosts.cardiology?.indiaUSD ?? '$4,500–12,000'}, মার্কিন যুক্তরাষ্ট্রে $70,000–150,000। চূড়ান্ত মূল্য আপনার রিপোর্ট পর্যালোচনার পরে নির্ধারিত হয় — আপনার কেসের জন্য লিখিত কোট চান।`,
  });

  return faqs;
}

/**
 * Merge auto-generated Bengali country FAQs with manual overrides.
 *
 * @param auto - Auto-generated FAQ items from `generateCountryFaqsBn()`.
 * @param manual - Manual FAQ items from `country.manualFaqs`.
 * @returns Merged FAQ array.
 */
export function mergeCountryFaqsBn(
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
