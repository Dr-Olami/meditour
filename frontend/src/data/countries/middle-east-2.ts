import type { CountryMetadata } from './types';
import { baseTreatmentCosts, standardVisaSteps } from './shared';

// ─── Egypt ───────────────────────────────────────────────────────────────────

const egypt: CountryMetadata = {
  code: 'EG',
  name: 'Egypt',
  slug: 'egypt',
  nationality: 'Egyptian',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Egypt',
    'Egypt to India treatment cost',
    'best hospital in India for Egyptian patients',
    'India medical visa Egypt',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Egypt',
    'orthopedic treatment in India for Egyptian patients',
    'cancer care in India from Egypt',
    'best JCI hospital in India for Egyptian patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Egyptian patients',
    'medical visa India from Egypt',
    'India vs Turkey medical cost for Egyptian',
    'IVF treatment in India from Egypt cost',
    'how to travel from Cairo to India for treatment',
  ],

  topConcerns: [
    'Cost savings vs Cairo private hospitals',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Visa application process',
    'Hospital quality and accreditation',
    'Travel logistics from Cairo',
  ],

  majorCities: ['Cairo', 'Alexandria', 'Giza'],
  flightTime: '6 hours from Cairo',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Cairo (CAI)', 'Alexandria (HBE)'],

  costSavingsVsLocal: '40–60%',
  costComparisonCountries: ['Turkey', 'Germany', 'Jordan'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Arabic interpreters'],

  patientsTreated: 600,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '6.5 hours from Cairo', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '6 hours from Cairo', directFlights: true, airlines: ['EgyptAir', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '6 hours from Cairo', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Egyptian Patients',
  heroSubtitle: 'Flights from Cairo. Arabic-speaking coordinators. Halal facilities. Save 40–60% vs Turkey and Germany.',
  metaDescription: 'Affordable medical treatment in India for Egyptian patients. Arabic support, halal food, save 40–60% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Cairo and Alexandria travel to India for cardiac surgery, cancer treatment, orthopedics, and transplants — with Arabic-speaking coordinators, halal food, and JCI-accredited hospitals.',

  currency: { code: 'EGP', symbol: '£', exchangeRate: 48, name: 'Egyptian Pound' },
};

// ─── Iran ────────────────────────────────────────────────────────────────────

const iran: CountryMetadata = {
  code: 'IR',
  name: 'Iran',
  slug: 'iran',
  nationality: 'Iranian',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Iran',
    'Iran to India treatment cost',
    'best hospital in India for Iranian patients',
    'India medical visa Iran',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Iran',
    'orthopedic treatment in India for Iranian patients',
    'cancer care in India from Iran',
    'best JCI hospital in India for Iranian patients',
    'Persian Farsi speaking hospital in India',
    'halal hospital India Iranian patients',
    'medical visa India from Iran',
    'India vs Turkey medical cost for Iranian',
    'IVF treatment in India from Iran cost',
    'how to travel from Tehran to India for treatment',
  ],

  topConcerns: [
    'Cost savings vs Tehran private hospitals',
    'Persian/Farsi language support',
    'Halal food and prayer facilities',
    'Visa application process',
    'Hospital quality and accreditation',
    'Travel logistics from Tehran',
  ],

  majorCities: ['Tehran', 'Mashhad', 'Isfahan', 'Shiraz'],
  flightTime: '4 hours from Tehran',
  directFlights: false,
  visaType: 'embassy',
  visaProcessingTime: '7–10 business days',
  majorAirports: ['Tehran (IKA)', 'Mashhad (MHD)'],

  costSavingsVsLocal: '30–50%',
  costComparisonCountries: ['Turkey', 'UAE', 'Germany'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Persian', 'Farsi', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Persian interpreters', 'Female doctors on request'],

  patientsTreated: 400,
  establishedYear: 2021,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '6 hours from Tehran', directFlights: false, airlines: ['Connecting via Dubai or Sharjah'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '5 hours from Tehran', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '4 hours from Tehran', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Iranian Patients',
  heroSubtitle: 'Flights from Tehran. Persian-speaking coordinators. Halal facilities. Save 30–50% vs Turkey and UAE.',
  metaDescription: 'Affordable medical treatment in India for Iranian patients. Persian/Farsi support, halal food, save 30–50% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Tehran, Mashhad, and Isfahan travel to India for cardiac surgery, cancer treatment, orthopedics, and transplants — with Persian-speaking coordinators, halal food, and JCI-accredited hospitals.',

  currency: { code: 'IRR', symbol: '﷼', exchangeRate: 42000, name: 'Iranian Rial' },
};

// ─── Iraq ────────────────────────────────────────────────────────────────────

const iraq: CountryMetadata = {
  code: 'IQ',
  name: 'Iraq',
  slug: 'iraq',
  nationality: 'Iraqi',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Iraq',
    'Iraq to India treatment cost',
    'best hospital in India for Iraqi patients',
    'India medical visa Iraq',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Iraq',
    'orthopedic treatment in India for Iraqi patients',
    'cancer care in India from Iraq',
    'best JCI hospital in India for Iraqi patients',
    'Arabic Kurdish speaking hospital in India',
    'halal hospital India Iraqi patients',
    'medical visa India from Iraq',
    'India vs Turkey medical cost for Iraqi',
    'IVF treatment in India from Iraq cost',
    'how to travel from Baghdad to India for treatment',
  ],

  topConcerns: [
    'Cost savings vs Baghdad private hospitals',
    'Arabic and Kurdish language support',
    'Halal food and prayer facilities',
    'Visa application process',
    'Hospital quality and accreditation',
    'Travel logistics from Baghdad',
  ],

  majorCities: ['Baghdad', 'Basra', 'Erbil', 'Mosul'],
  flightTime: '5 hours from Baghdad',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Baghdad (BGW)', 'Erbil (EBL)', 'Basra (BSR)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Turkey', 'Jordan', 'Iran'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Arabic', 'Kurdish', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Arabic interpreters', 'Female doctors on request'],

  patientsTreated: 900,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '6 hours from Baghdad', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Delhi', flightTime: '5 hours from Baghdad', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
    { name: 'Mumbai', flightTime: '5.5 hours from Baghdad', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Iraqi Patients',
  heroSubtitle: 'Flights from Baghdad and Erbil. Arabic and Kurdish support. Halal facilities. Save 50–70% vs Turkey.',
  metaDescription: 'Affordable medical treatment in India for Iraqi patients. Arabic/Kurdish support, halal food, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Baghdad, Basra, and Erbil travel to India for cardiac surgery, cancer treatment, orthopedics, and transplants — with Arabic and Kurdish language support, halal food, and JCI-accredited hospitals.',

  currency: { code: 'IQD', symbol: 'ع.د', exchangeRate: 1310, name: 'Iraqi Dinar' },
};

// ─── Jordan ──────────────────────────────────────────────────────────────────

const jordan: CountryMetadata = {
  code: 'JO',
  name: 'Jordan',
  slug: 'jordan',
  nationality: 'Jordanian',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Jordan',
    'Jordan to India treatment cost',
    'best hospital in India for Jordanian patients',
    'India medical visa Jordan',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Jordan',
    'orthopedic treatment in India for Jordanian patients',
    'cancer care in India from Jordan',
    'best JCI hospital in India for Jordanian patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Jordanian patients',
    'medical visa India from Jordan',
    'India vs Turkey medical cost for Jordanian',
    'IVF treatment in India from Jordan cost',
    'how to travel from Amman to India for treatment',
  ],

  topConcerns: [
    'Cost savings vs Amman private hospitals',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Visa application process',
    'Hospital quality and accreditation',
    'Travel logistics from Amman',
  ],

  majorCities: ['Amman', 'Zarqa', 'Irbid'],
  flightTime: '5.5 hours from Amman',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Amman (AMM)'],

  costSavingsVsLocal: '40–60%',
  costComparisonCountries: ['Turkey', 'Germany', 'Jordan'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Arabic interpreters'],

  patientsTreated: 500,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '7 hours from Amman', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '6 hours from Amman', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '5.5 hours from Amman', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Jordanian Patients',
  heroSubtitle: 'Flights from Amman. Arabic-speaking coordinators. Halal facilities. Save 40–60% vs Turkey.',
  metaDescription: 'Affordable medical treatment in India for Jordanian patients. Arabic support, halal food, save 40–60% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Amman travel to India for cardiac surgery, cancer treatment, orthopedics, and transplants — with Arabic-speaking coordinators, halal food, and JCI-accredited hospitals.',

  currency: { code: 'JOD', symbol: 'د.ا', exchangeRate: 0.71, name: 'Jordanian Dinar' },
};

// ─── Yemen ───────────────────────────────────────────────────────────────────

const yemen: CountryMetadata = {
  code: 'YE',
  name: 'Yemen',
  slug: 'yemen',
  nationality: 'Yemeni',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Yemen',
    'Yemen to India treatment cost',
    'best hospital in India for Yemeni patients',
    'India medical visa Yemen',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Yemen',
    'orthopedic treatment in India for Yemeni patients',
    'cancer care in India from Yemen',
    'best JCI hospital in India for Yemeni patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Yemeni patients',
    'medical visa India from Yemen',
    'India vs Jordan medical cost for Yemeni',
    'IVF treatment in India from Yemen cost',
    'how to travel from Sanaa to India for treatment',
  ],

  topConcerns: [
    'Cost savings vs local healthcare',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Visa application process',
    'Hospital quality and accreditation',
    'Travel logistics (limited direct flights)',
  ],

  majorCities: ['Sanaa', 'Aden', 'Taiz'],
  flightTime: '6 hours from Sanaa',
  directFlights: false,
  visaType: 'embassy',
  visaProcessingTime: '7–10 business days',
  majorAirports: ['Sanaa (SAH)', 'Aden (ADE)'],

  costSavingsVsLocal: '60–80%',
  costComparisonCountries: ['Jordan', 'Egypt', 'India'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Arabic interpreters', 'Female doctors on request'],

  patientsTreated: 300,
  establishedYear: 2021,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '7 hours from Sanaa', directFlights: false, airlines: ['Connecting via Dubai or Cairo'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '6 hours from Sanaa', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '6.5 hours from Sanaa', directFlights: false, airlines: ['Connecting via Dubai'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Yemeni Patients',
  heroSubtitle: 'Flights from Sanaa and Aden. Arabic-speaking coordinators. Halal facilities. Save 60–80% vs local options.',
  metaDescription: 'Affordable medical treatment in India for Yemeni patients. Arabic support, halal food, save 60–80% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Sanaa and Aden travel to India for cardiac surgery, cancer treatment, orthopedics, and transplants — with Arabic-speaking coordinators, halal food, and JCI-accredited hospitals.',

  currency: { code: 'YER', symbol: '﷼', exchangeRate: 250, name: 'Yemeni Rial' },
};

export const middleEastCountriesPart2: CountryMetadata[] = [
  egypt,
  iran,
  iraq,
  jordan,
  yemen,
];
