import type { CountryMetadata } from '../types';
import { baseTreatmentCosts, standardVisaSteps, withLocalCurrency } from '../shared';

// Reason: parallel Bengali country data file (per user's chosen content model).
// Only Bangladesh has a Bengali translation; other countries remain English-only
// and the /bn/countries directory links to their English pages. Non-display
// fields (costs, currency code, flag code, patientsTreated, establishedYear)
// are reused from the same source data as the English page so numbers stay
// in sync. All user-facing strings (hero, concerns, visa steps, cities,
// keywords, FAQs) are translated into Bengali.

const bangladeshBn: CountryMetadata = {
  code: 'BD',
  name: 'বাংলাদেশ',
  slug: 'bangladesh',
  nationality: 'বাংলাদেশি',
  region: 'south-asia',
  flagCode: 'BD',

  primaryKeywords: [
    'ভারতে চিকিৎসা বাংলাদেশ থেকে',
    'বাংলাদেশ থেকে ভারতে চিকিৎসার খরচ',
    'বাংলাদেশি রোগীদের জন্য ভারতের সেরা হাসপাতাল',
    'ভারতে মেডিকেল ভিসা বাংলাদেশ',
  ],

  longTailKeywords: [
    'বাংলাদেশি রোগীদের জন্য ভারতে হার্ট সার্জারির খরচ',
    'বাংলাদেশ থেকে ব্যাঙ্গালোরে হাঁটু প্রতিস্থাপন',
    'ভারত বনাম বাংলাদেশ চিকিৎসার খরচ',
    'বাংলাদেশ থেকে ভারতে IVF খরচ কত',
    'বাংলাদেশি রোগীদের জন্য লিভার ট্রান্সপ্লান্ট খরচ ভারত',
    'ঢাকা থেকে ভারতে মেরুদণ্ড সার্জারি',
    'বাংলাদেশি রোগীদের জন্য ভারতের সেরা কার্ডিয়াক হাসপাতাল',
    'বাংলাদেশ থেকে ভারতে মেডিকেল ভিসার শর্ত',
    'ব্যাঙ্গালোরে বাংলাভাষী হাসপাতাল',
    'বাংলাদেশি রোগীদের জন্য ভারত বনাম সিঙ্গাপুর চিকিৎসা খরচ',
  ],

  topConcerns: [
    'দেশের বেসরকারি হাসপাতালের তুলনায় খরচ সাশ্রয়',
    'ভিসা আবেদন প্রক্রিয়া',
    'বাংলা ভাষায় সহায়তা',
    'ঢাকা থেকে ভ্রমণের ব্যবস্থা',
    'হাসপাতালের মান ও স্বীকৃতি',
    'পেমেন্ট পদ্ধতি ও মুদ্রা',
  ],

  majorCities: ['ঢাকা', 'চট্টগ্রাম', 'সিলেট'],
  flightTime: 'ঢাকা থেকে ৩ ঘণ্টা',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '৩–৫ কর্মদিবস',
  majorAirports: ['ঢাকা (DAC)', 'চট্টগ্রাম (CGP)', 'সিলেট (ZYL)'],

  costSavingsVsLocal: '৬০–৮০%',
  costComparisonCountries: ['সিঙ্গাপুর', 'থাইল্যান্ড', 'মালয়েশিয়া'],
  treatmentCosts: withLocalCurrency(baseTreatmentCosts, (usd) =>
    usd.replace(/\$([\d,]+)–\$?([\d,]+)/g, (_, lo, hi) => `৳${(Number(lo.replace(/,/g, '')) * 110).toLocaleString()}–${(Number(hi.replace(/,/g, '')) * 110).toLocaleString()}`),
  ),

  languages: ['বাংলা', 'ইংরেজি'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['হালাল খাবার পাওয়া যায়', 'নামাজের ব্যবস্থা', 'পরিবারের থাকার ব্যবস্থা'],

  patientsTreated: 5000,
  establishedYear: 2018,

  recommendedCities: [
    { name: 'কলকাতা', flightTime: 'ঢাকা থেকে ১ ঘণ্টা', directFlights: true, airlines: ['বিমান বাংলাদেশ', 'IndiGo', 'Air India'], specialties: ['কার্ডিয়াক', 'অনকোলজি', 'নিউরোসার্জারি'] },
    { name: 'ব্যাঙ্গালোর', flightTime: 'ঢাকা থেকে ৩ ঘণ্টা', directFlights: true, airlines: ['বিমান বাংলাদেশ', 'IndiGo'], specialties: ['ট্রান্সপ্লান্ট', 'কার্ডিয়াক', 'অর্থোপেডিক্স', 'ক্যান্সার'] },
    { name: 'চেন্নাই', flightTime: 'ঢাকা থেকে ৩ ঘণ্টা', directFlights: true, airlines: ['IndiGo', 'SriLankan Airlines'], specialties: ['কার্ডিয়াক', 'অনকোলজি', 'অর্থোপেডিক্স'] },
  ],

  // Reason: visa step titles/descriptions are translated; the process itself
  // is identical to the English version.
  visaSteps: [
    {
      title: 'মেডিকেল রিপোর্ট পাঠান',
      description:
        'আপনার মেডিকেল রিপোর্ট WhatsApp-এ পাঠান, যাতে আমরা ভিসা আবেদনের জন্য হাসপাতালের আমন্ত্রণপত্র সংগ্রহ করতে পারি।',
    },
    {
      title: 'আমন্ত্রণপত্র গ্রহণ করুন',
      description:
        'অংশীদার হাসপাতাল ভারতীয় মিশন বা ই-ভিসা চ্যানেলের জন্য প্রয়োজনীয় অ্যাপয়েন্টমেন্ট/আমন্ত্রণপত্র প্রদান করে।',
    },
    {
      title: 'ভারতীয় মিশন / ই-ভিসায় আবেদন',
      description:
        'আপনার পাসপোর্ট, ছবি, মেডিকেল নথি এবং আমন্ত্রণপত্র জমা দিন। পরিবারের সদস্যদের জন্য অ্যাটেন্ড্যান্ট ভিসা আবেদন করা যায়।',
    },
    {
      title: 'ভ্রমণ ও ভর্তি',
      description:
        'ভিসা ইস্যু হওয়ার পর আমরা ফ্লাইট পরামর্শ, এয়ারপোর্ট পিকআপ এবং ভারতে হাসপাতালে ভর্তি সমন্বয় করি।',
    },
  ],

  heroTitle: 'বাংলাদেশি রোগীদের জন্য ভারতে বিশ্বমানের চিকিৎসা',
  heroSubtitle: 'ঢাকা থেকে সরাসরি ফ্লাইট। বাংলাভাষী কোঅর্ডিনেটর। চিকিৎসায় ৬০–৮০% সাশ্রয়। ৫,০০০+ পরিবারের আস্থা।',
  metaDescription: 'বাংলাদেশি রোগীদের জন্য ভারতে সাশ্রয়ী চিকিৎসা। কার্ডিয়াক, অর্থোপেডিক, ক্যান্সার চিকিৎসায় ৬০–৮০% সাশ্রয়, ভিসা সহায়তা, বাংলাভাষী কর্মী ও JCI হাসপাতাল। বিনামূল্যে পরামর্শ।',
  introParagraph: 'ঢাকা, চট্টগ্রাম ও সিলেট থেকে রোগীরা ভারতে ক্যান্সার চিকিৎসা, কার্ডিয়াক সার্জারি, ট্রান্সপ্লান্ট ও অর্থোপেডিক্সের জন্য যান — বাংলা বা ইংরেজি সহায়তা, কাছের মেট্রো অপশন, মেডিকেল ভিসা সহায়তা এবং প্রতিযোগিতামূলক প্যাকেজ মূল্যে।',

  currency: { code: 'BDT', symbol: '৳', exchangeRate: 110, name: 'বাংলাদেশি টাকা' },
};

export { bangladeshBn };
