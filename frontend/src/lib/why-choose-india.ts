/**
 * Data-driven "Why {nationality} patients choose India" content generator.
 *
 * Reason: The strategy (Section 10.3) requires this section to be
 * country-specific, not generic. Rather than writing 2,108 manual sections,
 * this template injects country metadata (costSavingsVsLocal, flightTime,
 * majorCities, culturalConsiderations, languages, etc.) to produce
 * country-specific content at scale.
 *
 * The output is a structured object with sub-headings and paragraphs that
 * the route template renders into the "Why choose India" section.
 */

import type { CountryMetadata } from '../data/countries/types';

export interface WhyChooseSection {
  /** Main intro paragraph (2-3 sentences). */
  intro: string;
  /** Sub-sections with heading + paragraph. */
  subsections: { heading: string; body: string }[];
}

/**
 * Generate the "Why {nationality} patients choose India" content for a
 * procedure × country page, using country metadata for specificity.
 *
 * @param procedureName - Full procedure name (e.g. "Heart Bypass Surgery (CABG)").
 * @param fromPrice - USD starting price (e.g. "$4,500").
 * @param toPrice - USD ending price (e.g. "$12,000").
 * @param country - Country metadata with cost, travel, and cultural data.
 * @returns Structured content for the "Why choose India" section.
 */
export function generateWhyChooseIndia(
  procedureName: string,
  fromPrice: string,
  toPrice: string,
  country: CountryMetadata,
): WhyChooseSection {
  const nat = country.nationality;
  const natLower = nat.toLowerCase();
  const procLower = procedureName.toLowerCase();
  const savings = country.costSavingsVsLocal;
  const comparison = country.costComparisonCountries.join(', ');
  const cities = country.majorCities.slice(0, 2).join(' or ');
  const flightTime = country.flightTime;
  const directFlights = country.directFlights;
  const cultural = country.culturalConsiderations;
  const languages = country.languages;
  const priceRange = toPrice ? `${fromPrice}–${toPrice}` : fromPrice;

  // ── Intro paragraph ──────────────────────────────────────────────────────
  // Reason: The intro must explain WHY this specific country's patients
  // travel to India, referencing their local situation and cost savings.
  const intro = `${nat} patients choose India for ${procLower} because of the significant cost savings — ${savings} compared to ${comparison} — combined with JCI-accredited hospitals and internationally trained specialists. In India, ${procLower} typically costs ${priceRange} USD, making world-class treatment accessible for patients travelling from ${cities}.`;

  // ── Sub-sections ─────────────────────────────────────────────────────────
  const subsections: { heading: string; body: string }[] = [];

  // 1. High-quality medical care
  subsections.push({
    heading: 'High-quality medical care',
    body: `Indian hospitals performing ${procLower} are accredited by international bodies like JCI and NABH, with advanced surgical technology, modern ICU facilities, and experienced specialists. Many surgeons have trained or practised in the UK, USA, or Europe, bringing global expertise to ${natLower} patients at a fraction of the cost.`,
  });

  // 2. Cost-effectiveness
  subsections.push({
    heading: 'Cost-effectiveness',
    body: `${procedureName} in India costs ${priceRange} USD — a saving of ${savings} compared to ${comparison}. This includes surgeon fees, hospital stay, and standard medical supplies. Khan Meditour provides transparent, all-inclusive quotes with no hidden charges, so ${natLower} patients know the full cost upfront.`,
  });

  // 3. Travel and accessibility
  // Reason: Use country-specific flight data to make this section unique.
  const flightDesc = directFlights
    ? `Direct flights from ${cities} take ${flightTime}, making travel straightforward.`
    : `Flights from ${cities} take ${flightTime}, with connections through major hubs.`;
  subsections.push({
    heading: 'Easy travel and accessibility',
    body: `${flightDesc} Khan Meditour assists with medical visa documentation, airport pickup, and local transportation. Most ${natLower} patients plan a stay of 2–4 weeks in India, depending on the procedure and recovery timeline.`,
  });

  // 4. Communication and cultural comfort
  // Reason: Use country-specific language and cultural data.
  const langList = languages.length > 0 ? languages.join(', ') : 'English';
  const culturalList = cultural.length > 0
    ? cultural.slice(0, 3).join(', ').toLowerCase()
    : 'international patient services';
  subsections.push({
    heading: 'Communication and cultural comfort',
    body: `Indian hospitals serve patients from diverse backgrounds. Staff commonly speak ${langList}, and hospitals provide ${culturalList}. International patient coordinators guide ${natLower} patients through every step — from registration to discharge — ensuring clear communication and cultural sensitivity throughout your ${procLower} journey.`,
  });

  // 5. Comprehensive support (always included)
  subsections.push({
    heading: 'Comprehensive patient support',
    body: `Khan Meditour coordinates the entire process for ${natLower} patients: medical visa invitation letters, hospital appointments, accommodation near the hospital, interpreter services if needed, and follow-up coordination after you return home. Our goal is to make your ${procLower} journey as stress-free as possible.`,
  });

  return { intro, subsections };
}

/**
 * Generate Bengali "Why {nationality} patients choose India" content.
 *
 * Reason: Bengali content must be native-fluent, not a literal translation.
 * This produces natural Bengali medical content using the same data-driven
 * approach, with Bengali medical terminology where appropriate.
 *
 * @param procedureName - Procedure name in Bengali.
 * @param fromPrice - USD starting price.
 * @param toPrice - USD ending price.
 * @param country - Bengali country metadata.
 * @returns Structured content for the Bengali "Why choose India" section.
 */
export function generateWhyChooseIndiaBn(
  procedureName: string,
  fromPrice: string,
  toPrice: string,
  country: CountryMetadata,
): WhyChooseSection {
  const nat = country.nationality;
  const savings = country.costSavingsVsLocal;
  const comparison = country.costComparisonCountries.join(', ');
  const cities = country.majorCities.slice(0, 2).join(' বা ');
  const flightTime = country.flightTime;
  const directFlights = country.directFlights;
  const cultural = country.culturalConsiderations;
  const languages = country.languages;
  const priceRange = toPrice ? `${fromPrice}–${toPrice}` : fromPrice;

  // ── Intro paragraph ──────────────────────────────────────────────────────
  const intro = `${nat} রোগীরা ভারতে ${procedureName} বেছে নেন কারণ খরচ ${savings} সাশ্রয় — ${comparison}-এর তুলনায় — এবং JCI-স্বীকৃত হাসপাতাল ও আন্তর্জাতিকভাবে প্রশিক্ষিত বিশেষজ্ঞ চিকিৎসক রয়েছেন। ভারতে ${procedureName} সাধারণত ${priceRange} ডলারে হয়, যা ${cities} থেকে আসা রোগীদের জন্য বিশ্বমানের চিকিৎসা সাশ্রয়ী করে তোলে।`;

  const subsections: { heading: string; body: string }[] = [];

  // 1. উচ্চমানের চিকিৎসা
  subsections.push({
    heading: 'উচ্চমানের চিকিৎসা',
    body: `ভারতের হাসপাতালগুলি JCI এবং NABH দ্বারা স্বীকৃত, যেখানে আধুনিক সার্জিক্যাল প্রযুক্তি, আধুনিক ICU সুবিধা এবং অভিজ্ঞ বিশেষজ্ঞ রয়েছেন। অনেক সার্জন যুক্তরাজ্য, যুক্তরাষ্ট্র বা ইউরোপে প্রশিক্ষণ নিয়েছেন, যা ${nat} রোগীদের বিশ্বমানের চিকিৎসা সাশ্রয়ী মূল্যে দেয়।`,
  });

  // 2. খরচ সাশ্রয়
  subsections.push({
    heading: 'খরচ সাশ্রয়',
    body: `ভারতে ${procedureName} খরচ ${priceRange} ডলার — ${comparison}-এর তুলনায় ${savings} সাশ্রয়। এতে সার্জন ফি, হাসপাতালে অবস্থান এবং প্রয়োজনীয় চিকিৎসা সামগ্রী অন্তর্ভুক্ত। Khan Meditour স্বচ্ছ, সর্ব-অন্তর্ভুক্ত কোটেশন দেয় যাতে কোনো লুকানো খরচ নেই।`,
  });

  // 3. ভ্রমণ সুবিধা
  const flightDesc = directFlights
    ? `${cities} থেকে সরাসরি ফ্লাইট ${flightTime} সময় নেয়, যা ভ্রমণকে সহজ করে।`
    : `${cities} থেকে ফ্লাইট ${flightTime} সময় নেয়, প্রধান হাবের মাধ্যমে সংযোগসহ।`;
  subsections.push({
    heading: 'সহজ ভ্রমণ ও অ্যাক্সেসিবিলিটি',
    body: `${flightDesc} Khan Meditour মেডিকেল ভিসা ডকুমেন্টেশন, এয়ারপোর্ট পিকআপ এবং স্থানীয় পরিবহনে সহায়তা করে। বেশিরভাগ ${nat} রোগী প্রক্রিয়া ও পুনরুদ্ধারের উপর নির্ভর করে ভারতে ২-৪ সপ্তাহ থাকার পরিকল্পনা করেন।`,
  });

  // 4. যোগাযোগ ও সাংস্কৃতিক স্বাচ্ছন্দ্য
  const langList = languages.length > 0 ? languages.join(', ') : 'ইংরেজি';
  const culturalList = cultural.length > 0
    ? cultural.slice(0, 3).join(', ')
    : 'আন্তর্জাতিক রোগী সেবা';
  subsections.push({
    heading: 'যোগাযোগ ও সাংস্কৃতিক স্বাচ্ছন্দ্য',
    body: `ভারতের হাসপাতালগুলি বিভিন্ন পটভূমির রোগীদের সেবা দেয়। স্টাফরা সাধারণত ${langList} বলেন এবং হাসপাতালে ${culturalList} সুবিধা রয়েছে। আন্তর্জাতিক রোগী কো-অর্ডিনেটর প্রতিটি ধাপে ${nat} রোগীদের গাইড করেন — ভর্তি থেকে ছাড়পত্র পর্যন্ত — যাতে আপনার ${procedureName} যাত্রা সহজ ও নির্ঝঞ্ঝাট হয়।`,
  });

  // 5. সমন্বিত সহায়তা
  subsections.push({
    heading: 'সমন্বিত রোগী সহায়তা',
    body: `Khan Meditour ${nat} রোগীদের জন্য সম্পূর্ণ প্রক্রিয়া সমন্বয় করে: মেডিকেল ভিসা আমন্ত্রণপত্র, হাসপাতাল অ্যাপয়েন্টমেন্ট, হাসপাতালের কাছে থাকার ব্যবস্থা, প্রয়োজনে দোভাষী সেবা, এবং দেশে ফেরার পর ফলো-আপ সমন্বয়। আমাদের লক্ষ্য আপনার ${procedureName} যাত্রাকে যতটা সম্ভব নির্ঝঞ্ঝাটমুক্ত করা।`,
  });

  return { intro, subsections };
}
