import type { CountryMetadata } from './types';
import { baseTreatmentCosts, standardVisaSteps, visaOnArrivalSteps } from './shared';

/**
 * Shared treatment costs for GCC/Middle East countries.
 * GCC patients typically compare against Dubai, Europe, and USA.
 */
const gccTreatmentCosts = baseTreatmentCosts;

// ─── United Arab Emirates ────────────────────────────────────────────────────

const uae: CountryMetadata = {
  code: 'AE',
  name: 'United Arab Emirates',
  slug: 'uae',
  nationality: 'Emirati',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from UAE',
    'UAE to India treatment cost',
    'best hospital in India for UAE patients',
    'India medical visa UAE',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Dubai',
    'orthopedic treatment in India for UAE patients',
    'cancer care in India from UAE',
    'cosmetic surgery India vs Dubai cost',
    'dental implants in India for UAE residents',
    'best JCI hospital in India for UAE patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India UAE patients',
    'medical visa on arrival India from UAE',
    'India vs Europe medical cost for UAE',
  ],

  topConcerns: [
    'Premium quality and JCI accreditation',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Family accommodation',
    'Cost savings vs Western destinations',
    'Medical visa on arrival',
  ],

  majorCities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
  flightTime: '3.5 hours from Dubai',
  directFlights: true,
  visaType: 'on-arrival',
  visaProcessingTime: 'On arrival',
  majorAirports: ['Dubai (DXB)', 'Abu Dhabi (AUH)'],

  costSavingsVsLocal: '40–60%',
  costComparisonCountries: ['Dubai', 'USA', 'UK', 'Germany'],
  treatmentCosts: gccTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Family suites', 'Arabic interpreters'],

  patientsTreated: 3500,
  establishedYear: 2017,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '3.5 hours from Dubai', directFlights: true, airlines: ['Emirates', 'IndiGo', 'Air India'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '3 hours from Dubai', directFlights: true, airlines: ['Emirates', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Chennai', flightTime: '4 hours from Dubai', directFlights: true, airlines: ['Emirates', 'IndiGo'], specialties: ['Cardiac', 'Orthopedics', 'Cancer'] },
  ],

  visaSteps: visaOnArrivalSteps,

  heroTitle: 'Premium Healthcare in India for UAE Patients',
  heroSubtitle: 'Direct flights from Dubai. JCI-accredited hospitals. Arabic support. Halal facilities. Save 40–60% vs Western destinations.',
  metaDescription: 'Premium medical treatment in India for UAE patients. JCI hospitals, Arabic-speaking staff, halal food, prayer facilities. Save on cardiac, orthopedic, cosmetic procedures.',
  introParagraph: 'Patients from Dubai, Abu Dhabi, and Sharjah choose India for cardiac surgery, orthopedics, cancer care, and cosmetic procedures — with JCI-accredited hospitals, Arabic-speaking coordinators, halal food, and prayer facilities.',

  currency: { code: 'AED', symbol: 'د.إ', exchangeRate: 3.67, name: 'UAE Dirham' },
};

// ─── Saudi Arabia ────────────────────────────────────────────────────────────

const saudiArabia: CountryMetadata = {
  code: 'SA',
  name: 'Saudi Arabia',
  slug: 'saudi-arabia',
  nationality: 'Saudi',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Saudi Arabia',
    'Saudi Arabia to India treatment cost',
    'best hospital in India for Saudi patients',
    'India medical visa Saudi Arabia',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Saudi Arabia',
    'orthopedic treatment in India for Saudi patients',
    'cancer care in India from Saudi Arabia',
    'cosmetic surgery India vs Riyadh cost',
    'best JCI hospital in India for Saudi patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Saudi patients',
    'medical visa India from Saudi Arabia',
    'India vs Germany medical cost for Saudi',
    'IVF treatment in India from Saudi Arabia cost',
  ],

  topConcerns: [
    'Premium quality and JCI accreditation',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Family accommodation (large families)',
    'Cost savings vs Europe and USA',
    'Visa process',
  ],

  majorCities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca'],
  flightTime: '4.5 hours from Riyadh',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Riyadh (RUH)', 'Jeddah (JED)', 'Dammam (DMM)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Germany', 'USA', 'UK'],
  treatmentCosts: gccTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Family suites', 'Arabic interpreters', 'Gender-segregated waiting areas'],

  patientsTreated: 2800,
  establishedYear: 2017,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '5 hours from Riyadh', directFlights: true, airlines: ['Saudia', 'IndiGo', 'Air India'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '4.5 hours from Riyadh', directFlights: true, airlines: ['Saudia', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Hyderabad', flightTime: '4.5 hours from Riyadh', directFlights: true, airlines: ['Saudia', 'IndiGo'], specialties: ['Cardiac', 'Orthopedics', 'General surgery'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'World-Class Healthcare in India for Saudi Patients',
  heroSubtitle: 'Direct flights from Riyadh. JCI-accredited hospitals. Arabic support. Halal facilities. Save 50–70% vs Germany and USA.',
  metaDescription: 'Premium medical treatment in India for Saudi patients. JCI hospitals, Arabic-speaking staff, halal food, prayer facilities. Save on cardiac, orthopedic, cancer care.',
  introParagraph: 'Patients from Riyadh, Jeddah, and Dammam choose India for cardiac surgery, orthopedics, cancer care, and transplants — with JCI-accredited hospitals, Arabic-speaking coordinators, halal food, and prayer facilities.',

  currency: { code: 'SAR', symbol: 'ر.س', exchangeRate: 3.75, name: 'Saudi Riyal' },
};

// ─── Kuwait ──────────────────────────────────────────────────────────────────

const kuwait: CountryMetadata = {
  code: 'KW',
  name: 'Kuwait',
  slug: 'kuwait',
  nationality: 'Kuwaiti',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Kuwait',
    'Kuwait to India treatment cost',
    'best hospital in India for Kuwaiti patients',
    'India medical visa Kuwait',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Kuwait',
    'orthopedic treatment in India for Kuwaiti patients',
    'cancer care in India from Kuwait',
    'best JCI hospital in India for Kuwaiti patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Kuwait patients',
    'medical visa India from Kuwait',
    'India vs Germany medical cost for Kuwaiti',
    'IVF treatment in India from Kuwait cost',
    'how to travel from Kuwait to India for treatment',
  ],

  topConcerns: [
    'Premium quality and JCI accreditation',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Cost savings vs Europe',
    'Visa process',
    'Family accommodation',
  ],

  majorCities: ['Kuwait City', 'Hawalli', 'Salmiya'],
  flightTime: '4 hours from Kuwait City',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Kuwait City (KWI)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Germany', 'USA', 'UK'],
  treatmentCosts: gccTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Family suites', 'Arabic interpreters'],

  patientsTreated: 1500,
  establishedYear: 2018,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '4.5 hours from Kuwait City', directFlights: true, airlines: ['Kuwait Airways', 'IndiGo'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '4 hours from Kuwait City', directFlights: true, airlines: ['Kuwait Airways', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Chennai', flightTime: '5 hours from Kuwait City', directFlights: true, airlines: ['Kuwait Airways', 'IndiGo'], specialties: ['Cardiac', 'Orthopedics', 'Cancer'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Premium Healthcare in India for Kuwaiti Patients',
  heroSubtitle: 'Direct flights from Kuwait City. JCI-accredited hospitals. Arabic support. Halal facilities. Save 50–70% vs Europe.',
  metaDescription: 'Premium medical treatment in India for Kuwaiti patients. JCI hospitals, Arabic-speaking staff, halal food, prayer facilities. Save on cardiac, orthopedic, cancer care.',
  introParagraph: 'Patients from Kuwait City choose India for cardiac surgery, orthopedics, cancer care, and transplants — with JCI-accredited hospitals, Arabic-speaking coordinators, and halal facilities.',

  currency: { code: 'KWD', symbol: 'د.ك', exchangeRate: 0.31, name: 'Kuwaiti Dinar' },
};

// ─── Qatar ───────────────────────────────────────────────────────────────────

const qatar: CountryMetadata = {
  code: 'QA',
  name: 'Qatar',
  slug: 'qatar',
  nationality: 'Qatari',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Qatar',
    'Qatar to India treatment cost',
    'best hospital in India for Qatari patients',
    'India medical visa Qatar',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Qatar',
    'orthopedic treatment in India for Qatari patients',
    'cancer care in India from Qatar',
    'best JCI hospital in India for Qatari patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Qatari patients',
    'medical visa India from Qatar',
    'India vs Europe medical cost for Qatari',
    'IVF treatment in India from Qatar cost',
    'how to travel from Doha to India for treatment',
  ],

  topConcerns: [
    'Premium quality and JCI accreditation',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Cost savings vs Europe',
    'Visa process',
    'Family accommodation',
  ],

  majorCities: ['Doha', 'Al Rayyan', 'Al Wakrah'],
  flightTime: '4 hours from Doha',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Doha (DOH)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Germany', 'USA', 'UK'],
  treatmentCosts: gccTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Family suites', 'Arabic interpreters'],

  patientsTreated: 1200,
  establishedYear: 2018,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '4 hours from Doha', directFlights: true, airlines: ['Qatar Airways', 'IndiGo'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '3.5 hours from Doha', directFlights: true, airlines: ['Qatar Airways', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Kochi', flightTime: '4 hours from Doha', directFlights: true, airlines: ['Qatar Airways', 'IndiGo'], specialties: ['Cardiac', 'General surgery', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Premium Healthcare in India for Qatari Patients',
  heroSubtitle: 'Direct flights from Doha. JCI-accredited hospitals. Arabic support. Halal facilities. Save 50–70% vs Europe.',
  metaDescription: 'Premium medical treatment in India for Qatari patients. JCI hospitals, Arabic-speaking staff, halal food, prayer facilities. Save on cardiac, orthopedic, cancer care.',
  introParagraph: 'Patients from Doha choose India for cardiac surgery, orthopedics, cancer care, and transplants — with JCI-accredited hospitals, Arabic-speaking coordinators, and halal facilities.',

  currency: { code: 'QAR', symbol: 'ر.ق', exchangeRate: 3.64, name: 'Qatari Riyal' },
};

// ─── Oman ────────────────────────────────────────────────────────────────────

const oman: CountryMetadata = {
  code: 'OM',
  name: 'Oman',
  slug: 'oman',
  nationality: 'Omani',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Oman',
    'Oman to India treatment cost',
    'best hospital in India for Omani patients',
    'India medical visa Oman',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Oman',
    'orthopedic treatment in India for Omani patients',
    'cancer care in India from Oman',
    'best JCI hospital in India for Omani patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Omani patients',
    'medical visa India from Oman',
    'India vs UAE medical cost for Omani',
    'IVF treatment in India from Oman cost',
    'how to travel from Muscat to India for treatment',
  ],

  topConcerns: [
    'Premium quality and JCI accreditation',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Cost savings vs UAE and Europe',
    'Visa process',
    'Family accommodation',
  ],

  majorCities: ['Muscat', 'Salalah', 'Sohar'],
  flightTime: '3 hours from Muscat',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Muscat (MCT)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['UAE', 'Germany', 'USA'],
  treatmentCosts: gccTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Family suites', 'Arabic interpreters'],

  patientsTreated: 1000,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '3.5 hours from Muscat', directFlights: true, airlines: ['Oman Air', 'IndiGo'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '3 hours from Muscat', directFlights: true, airlines: ['Oman Air', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Kochi', flightTime: '3.5 hours from Muscat', directFlights: true, airlines: ['Oman Air', 'IndiGo'], specialties: ['Cardiac', 'General surgery', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Premium Healthcare in India for Omani Patients',
  heroSubtitle: 'Direct flights from Muscat. JCI-accredited hospitals. Arabic support. Halal facilities. Save 50–70% vs UAE and Europe.',
  metaDescription: 'Premium medical treatment in India for Omani patients. JCI hospitals, Arabic-speaking staff, halal food, prayer facilities. Save on cardiac, orthopedic, cancer care.',
  introParagraph: 'Patients from Muscat and Salalah choose India for cardiac surgery, orthopedics, cancer care, and transplants — with JCI-accredited hospitals, Arabic-speaking coordinators, and halal facilities.',

  currency: { code: 'OMR', symbol: 'ر.ع.', exchangeRate: 0.39, name: 'Omani Rial' },
};

// ─── Bahrain ─────────────────────────────────────────────────────────────────

const bahrain: CountryMetadata = {
  code: 'BH',
  name: 'Bahrain',
  slug: 'bahrain',
  nationality: 'Bahraini',
  region: 'middle-east',

  primaryKeywords: [
    'medical tourism India from Bahrain',
    'Bahrain to India treatment cost',
    'best hospital in India for Bahraini patients',
    'India medical visa Bahrain',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Bahrain',
    'orthopedic treatment in India for Bahraini patients',
    'cancer care in India from Bahrain',
    'best JCI hospital in India for Bahraini patients',
    'Arabic speaking hospital in Bangalore',
    'halal hospital India Bahraini patients',
    'medical visa India from Bahrain',
    'India vs UAE medical cost for Bahraini',
    'IVF treatment in India from Bahrain cost',
    'how to travel from Manama to India for treatment',
  ],

  topConcerns: [
    'Premium quality and JCI accreditation',
    'Arabic language support',
    'Halal food and prayer facilities',
    'Cost savings vs UAE and Europe',
    'Visa process',
    'Family accommodation',
  ],

  majorCities: ['Manama', 'Riffa', 'Muharraq'],
  flightTime: '3.5 hours from Manama',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Manama (BAH)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['UAE', 'Germany', 'USA'],
  treatmentCosts: gccTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Family suites', 'Arabic interpreters'],

  patientsTreated: 800,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '4 hours from Manama', directFlights: true, airlines: ['Gulf Air', 'IndiGo'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '3.5 hours from Manama', directFlights: true, airlines: ['Gulf Air', 'Air India'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Kochi', flightTime: '4 hours from Manama', directFlights: true, airlines: ['Gulf Air', 'IndiGo'], specialties: ['Cardiac', 'General surgery', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Premium Healthcare in India for Bahraini Patients',
  heroSubtitle: 'Direct flights from Manama. JCI-accredited hospitals. Arabic support. Halal facilities. Save 50–70% vs UAE and Europe.',
  metaDescription: 'Premium medical treatment in India for Bahraini patients. JCI hospitals, Arabic-speaking staff, halal food, prayer facilities. Save on cardiac, orthopedic, cancer care.',
  introParagraph: 'Patients from Manama choose India for cardiac surgery, orthopedics, cancer care, and transplants — with JCI-accredited hospitals, Arabic-speaking coordinators, and halal facilities.',

  currency: { code: 'BHD', symbol: '.د.ب', exchangeRate: 0.38, name: 'Bahraini Dinar' },
};

export const middleEastCountriesPart1: CountryMetadata[] = [
  bahrain,
  kuwait,
  oman,
  qatar,
  saudiArabia,
  uae,
];
