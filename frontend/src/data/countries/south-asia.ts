import type { CountryMetadata } from './types';
import { baseTreatmentCosts, standardVisaSteps, visaFreeSteps, visaOnArrivalSteps, withLocalCurrency } from './shared';

// ─── Bangladesh ──────────────────────────────────────────────────────────────

const bangladesh: CountryMetadata = {
  code: 'BD',
  name: 'Bangladesh',
  slug: 'bangladesh',
  nationality: 'Bangladeshi',
  region: 'south-asia',
  flagCode: 'BD',

  primaryKeywords: [
    'medical tourism India from Bangladesh',
    'Bangladesh to India treatment cost',
    'best hospital in India for Bangladeshi patients',
    'India medical visa Bangladesh',
  ],

  longTailKeywords: [
    'heart surgery cost in India for Bangladeshi patients',
    'knee replacement in Bangalore from Bangladesh',
    'cancer treatment India vs Bangladesh cost',
    'how much does IVF cost in India from Bangladesh',
    'liver transplant cost India for Bangladeshi',
    'spine surgery in India from Dhaka',
    'best cardiac hospital in India for Bangladesh patients',
    'medical visa India from Bangladesh requirements',
    'Bengali speaking hospital in Bangalore',
    'India vs Singapore medical cost for Bangladeshi',
  ],

  topConcerns: [
    'Cost savings vs local private hospitals',
    'Visa application process',
    'Bengali language support',
    'Travel logistics from Dhaka',
    'Hospital quality and accreditation',
    'Payment methods and currency',
  ],

  majorCities: ['Dhaka', 'Chittagong', 'Sylhet'],
  flightTime: '3 hours from Dhaka',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Dhaka (DAC)', 'Chittagong (CGP)', 'Sylhet (ZYL)'],

  costSavingsVsLocal: '60–80%',
  costComparisonCountries: ['Singapore', 'Thailand', 'Malaysia'],
  treatmentCosts: withLocalCurrency(baseTreatmentCosts, (usd) =>
    usd.replace(/\$([\d,]+)–\$?([\d,]+)/g, (_, lo, hi) => `৳${(Number(lo.replace(/,/g, '')) * 110).toLocaleString()}–${(Number(hi.replace(/,/g, '')) * 110).toLocaleString()}`),
  ),

  languages: ['Bengali', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food available', 'Prayer facilities', 'Family accommodation'],

  patientsTreated: 5000,
  establishedYear: 2018,

  recommendedCities: [
    { name: 'Kolkata', flightTime: '1 hour from Dhaka', directFlights: true, airlines: ['Biman Bangladesh', 'IndiGo', 'Air India'], specialties: ['Cardiac', 'Oncology', 'Neurosurgery'] },
    { name: 'Bangalore', flightTime: '3 hours from Dhaka', directFlights: true, airlines: ['Biman Bangladesh', 'IndiGo'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Chennai', flightTime: '3 hours from Dhaka', directFlights: true, airlines: ['IndiGo', 'SriLankan Airlines'], specialties: ['Cardiac', 'Oncology', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'World-Class Healthcare in India for Bangladeshi Patients',
  heroSubtitle: 'Direct flights from Dhaka. Bengali-speaking coordinators. Save 60–80% on treatments. Trusted by 5,000+ families.',
  metaDescription: 'Affordable medical treatment in India for Bangladeshi patients. Save 60–80% on cardiac, orthopedic, cancer care with visa support, Bengali staff, and JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Dhaka, Chittagong, and Sylhet travel to India for cancer care, cardiac surgery, transplants, and orthopedics — with Bengali or English support, nearby metro options, medical visa help, and competitive package pricing.',

  currency: { code: 'BDT', symbol: '৳', exchangeRate: 110, name: 'Bangladeshi Taka' },
};

// ─── Afghanistan ─────────────────────────────────────────────────────────────

const afghanistan: CountryMetadata = {
  code: 'AF',
  name: 'Afghanistan',
  slug: 'afghanistan',
  nationality: 'Afghan',
  region: 'south-asia',
  flagCode: 'AF',

  primaryKeywords: [
    'medical tourism India from Afghanistan',
    'Afghanistan to India treatment cost',
    'best hospital in India for Afghan patients',
    'India medical visa Afghanistan',
  ],

  longTailKeywords: [
    'heart surgery cost in India for Afghan patients',
    'cancer treatment in India from Afghanistan',
    'orthopedic surgery India for Afghan patients',
    'medical visa India from Kabul requirements',
    'best cardiac hospital in India for Afghan patients',
    'India vs Pakistan medical cost for Afghans',
    'Dari Pashto speaking hospital in India',
    'how to travel from Kabul to India for treatment',
    'liver transplant cost India for Afghan patients',
    'IVF treatment in India from Afghanistan cost',
  ],

  topConcerns: [
    'Cost savings vs local healthcare options',
    'Visa process and security clearance',
    'Dari and Pashto language support',
    'Travel logistics from Kabul',
    'Hospital quality and safety',
    'Payment methods and currency exchange',
  ],

  majorCities: ['Kabul', 'Herat', 'Kandahar', 'Mazar-i-Sharif'],
  flightTime: '2.5 hours from Kabul',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Kabul (KBL)', 'Herat (HEA)'],

  costSavingsVsLocal: '70–85%',
  costComparisonCountries: ['Pakistan', 'Turkey', 'Iran'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Dari', 'Pashto', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food available', 'Prayer facilities', 'Female doctors on request'],

  patientsTreated: 800,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Delhi', flightTime: '2 hours from Kabul', directFlights: true, airlines: ['Ariana Afghan Airlines', 'Kam Air', 'Air India'], specialties: ['Cardiac', 'Cancer', 'Trauma', 'Orthopedics'] },
    { name: 'Bangalore', flightTime: '4 hours from Kabul', directFlights: false, airlines: ['Connecting via Delhi'], specialties: ['Transplant', 'Cardiac', 'Cancer'] },
    { name: 'Mumbai', flightTime: '3 hours from Kabul', directFlights: true, airlines: ['Kam Air'], specialties: ['Cancer', 'Cardiac', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Medical Care in India for Afghan Patients',
  heroSubtitle: 'Direct flights from Kabul. Dari and Pashto interpreters. Save 70–85% on treatments. Trusted by 800+ Afghan families.',
  metaDescription: 'Affordable medical treatment in India for Afghan patients. Save 70–85% on cardiac, cancer, orthopedic care with visa support, Dari/Pashto interpreters, and JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Kabul, Herat, and Kandahar travel to India for cardiac surgery, cancer treatment, orthopedics, and trauma care — with Dari and Pashto language support, medical visa assistance, and culturally sensitive care.',

  currency: { code: 'AFN', symbol: '؋', exchangeRate: 71, name: 'Afghan Afghani' },
};

// ─── Nepal ───────────────────────────────────────────────────────────────────

const nepal: CountryMetadata = {
  code: 'NP',
  name: 'Nepal',
  slug: 'nepal',
  nationality: 'Nepali',
  region: 'south-asia',
  flagCode: 'NP',

  primaryKeywords: [
    'medical tourism India from Nepal',
    'Nepal to India treatment cost',
    'best hospital in India for Nepali patients',
    'India medical visa Nepal',
  ],

  longTailKeywords: [
    'heart surgery cost in India for Nepali patients',
    'knee replacement in Bangalore from Nepal',
    'cancer treatment India vs Nepal cost',
    'medical visa India from Nepal requirements',
    'best cardiac hospital in India for Nepali patients',
    'Nepali Hindi speaking hospital in India',
    'how to travel from Kathmandu to India for treatment',
    'kidney transplant cost India for Nepali patients',
    'IVF treatment in India from Nepal cost',
    'India vs Thailand medical cost for Nepali',
  ],

  topConcerns: [
    'Cost savings vs Kathmandu private hospitals',
    'Open border and visa-free travel',
    'Nepali and Hindi language support',
    'Travel logistics from Kathmandu',
    'Hospital quality and accreditation',
    'Insurance and payment methods',
  ],

  majorCities: ['Kathmandu', 'Pokhara', 'Biratnagar', 'Lalitpur'],
  flightTime: '1.5 hours from Kathmandu',
  directFlights: true,
  visaType: 'visa-free',
  visaProcessingTime: 'Visa-free for Indian border travel; e-visa for others',
  majorAirports: ['Kathmandu (KTM)', 'Pokhara (PKR)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Thailand', 'Singapore', 'Bangladesh'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Nepali', 'Hindi', 'English'],
  religiousMajority: 'hindu',
  culturalConsiderations: ['Vegetarian food available', 'Hindi-speaking staff', 'Family accommodation'],

  patientsTreated: 1500,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Delhi', flightTime: '1.5 hours from Kathmandu', directFlights: true, airlines: ['IndiGo', 'Air India', 'Nepal Airlines'], specialties: ['Cardiac', 'Cancer', 'Neurosurgery'] },
    { name: 'Bangalore', flightTime: '3 hours from Kathmandu', directFlights: true, airlines: ['IndiGo', 'Air India'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Varanasi', flightTime: '1 hour from Kathmandu', directFlights: false, airlines: ['Connecting via Delhi'], specialties: ['General surgery', 'Orthopedics'] },
  ],

  visaSteps: visaFreeSteps,

  heroTitle: 'World-Class Healthcare in India for Nepali Patients',
  heroSubtitle: 'Direct flights from Kathmandu. Visa-free travel. Nepali and Hindi-speaking coordinators. Save 50–70% on treatments.',
  metaDescription: 'Affordable medical treatment in India for Nepali patients. Visa-free travel, Nepali/Hindi support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Kathmandu, Pokhara, and across Nepal travel to India for cardiac surgery, cancer treatment, transplants, and orthopedics — benefiting from visa-free travel, Hindi/Nepali language support, and world-class hospitals at a fraction of the cost.',

  currency: { code: 'NPR', symbol: 'रू', exchangeRate: 133, name: 'Nepalese Rupee' },
};

// ─── Sri Lanka ───────────────────────────────────────────────────────────────

const sriLanka: CountryMetadata = {
  code: 'LK',
  name: 'Sri Lanka',
  slug: 'sri-lanka',
  nationality: 'Sri Lankan',
  region: 'south-asia',
  flagCode: 'LK',

  primaryKeywords: [
    'medical tourism India from Sri Lanka',
    'Sri Lanka to India treatment cost',
    'best hospital in India for Sri Lankan patients',
    'India medical visa Sri Lanka',
  ],

  longTailKeywords: [
    'heart surgery cost in India for Sri Lankan patients',
    'knee replacement in Bangalore from Sri Lanka',
    'cancer treatment India vs Sri Lanka cost',
    'medical visa India from Colombo requirements',
    'best cardiac hospital in India for Sri Lankan patients',
    'Sinhala Tamil speaking hospital in India',
    'how to travel from Colombo to India for treatment',
    'kidney transplant cost India for Sri Lankan patients',
    'IVF treatment in India from Sri Lanka cost',
    'India vs Singapore medical cost for Sri Lankan',
  ],

  topConcerns: [
    'Cost savings vs Colombo private hospitals',
    'Visa application process',
    'Sinhala and Tamil language support',
    'Travel logistics from Colombo',
    'Hospital quality and accreditation',
    'Insurance coverage and payment',
  ],

  majorCities: ['Colombo', 'Kandy', 'Galle', 'Jaffna'],
  flightTime: '1.5 hours from Colombo',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '2–3 business days',
  majorAirports: ['Colombo (CMB)'],

  costSavingsVsLocal: '40–60%',
  costComparisonCountries: ['Singapore', 'Thailand', 'Malaysia'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Sinhala', 'Tamil', 'English'],
  religiousMajority: 'mixed',
  culturalConsiderations: ['Vegetarian food available', 'Buddhist and Hindu facilities', 'Family accommodation'],

  patientsTreated: 1200,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Chennai', flightTime: '1.5 hours from Colombo', directFlights: true, airlines: ['IndiGo', 'SriLankan Airlines', 'Air India'], specialties: ['Cardiac', 'Cancer', 'Orthopedics', 'Transplant'] },
    { name: 'Bangalore', flightTime: '1.5 hours from Colombo', directFlights: true, airlines: ['IndiGo', 'SriLankan Airlines'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Kochi', flightTime: '1 hour from Colombo', directFlights: true, airlines: ['IndiGo', 'SriLankan Airlines'], specialties: ['Cardiac', 'General surgery', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Sri Lankan Patients',
  heroSubtitle: 'Direct flights from Colombo. Sinhala and Tamil support. Save 40–60% on treatments. Trusted by 1,200+ Sri Lankan families.',
  metaDescription: 'Affordable medical treatment in India for Sri Lankan patients. Save 40–60% on cardiac, cancer, orthopedic care with visa support, Sinhala/Tamil staff, and JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Colombo, Kandy, and across Sri Lanka travel to India for cardiac surgery, cancer treatment, transplants, and orthopedics — with Sinhala and Tamil language support, quick e-visa processing, and world-class hospitals in Chennai and Bangalore.',

  currency: { code: 'LKR', symbol: 'रू', exchangeRate: 298, name: 'Sri Lankan Rupee' },
};

// ─── Maldives ────────────────────────────────────────────────────────────────

const maldives: CountryMetadata = {
  code: 'MV',
  name: 'Maldives',
  slug: 'maldives',
  nationality: 'Maldivian',
  region: 'south-asia',
  flagCode: 'MV',

  primaryKeywords: [
    'medical tourism India from Maldives',
    'Maldives to India treatment cost',
    'best hospital in India for Maldivian patients',
    'India medical visa Maldives',
  ],

  longTailKeywords: [
    'heart surgery cost in India for Maldivian patients',
    'cancer treatment in India from Maldives',
    'orthopedic surgery India for Maldivian patients',
    'medical visa India from Male requirements',
    'best cardiac hospital in India for Maldivian patients',
    'Dhivehi English speaking hospital in India',
    'how to travel from Male to India for treatment',
    'kidney transplant cost India for Maldivian patients',
    'IVF treatment in India from Maldives cost',
    'India vs Sri Lanka medical cost for Maldivian',
  ],

  topConcerns: [
    'Cost savings vs traveling to Singapore',
    'Visa application process',
    'English and Dhivehi language support',
    'Travel logistics from Male',
    'Hospital quality and accreditation',
    'Island-to-city travel coordination',
  ],

  majorCities: ['Male', 'Addu City', 'Fuvahmulah'],
  flightTime: '2 hours from Male',
  directFlights: true,
  visaType: 'on-arrival',
  visaProcessingTime: 'Visa on arrival (30 days)',
  majorAirports: ['Male (MLE)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Singapore', 'Sri Lanka', 'Thailand'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Dhivehi', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food available', 'Prayer facilities', 'Family accommodation'],

  patientsTreated: 600,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '2 hours from Male', directFlights: true, airlines: ['IndiGo', 'Air India'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Chennai', flightTime: '2 hours from Male', directFlights: true, airlines: ['IndiGo', 'SriLankan Airlines'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
    { name: 'Kochi', flightTime: '1.5 hours from Male', directFlights: true, airlines: ['IndiGo'], specialties: ['Cardiac', 'General surgery', 'Orthopedics'] },
  ],

  visaSteps: visaOnArrivalSteps,

  heroTitle: 'World-Class Healthcare in India for Maldivian Patients',
  heroSubtitle: 'Direct flights from Male. Visa on arrival. English-speaking coordinators. Save 50–70% vs Singapore. Trusted by 600+ Maldivian families.',
  metaDescription: 'Affordable medical treatment in India for Maldivian patients. Visa on arrival, English support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Male and across the Maldives travel to India for cardiac surgery, cancer treatment, orthopedics, and transplants — benefiting from visa-on-arrival access, direct flights, and world-class hospitals at significantly lower costs than Singapore.',

  currency: { code: 'MVR', symbol: 'Rf', exchangeRate: 15, name: 'Maldivian Rufiyaa' },
};

export const southAsiaCountries: CountryMetadata[] = [
  afghanistan,
  bangladesh,
  maldives,
  nepal,
  sriLanka,
];
