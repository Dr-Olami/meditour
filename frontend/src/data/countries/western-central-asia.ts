import type { CountryMetadata } from './types';
import { baseTreatmentCosts, standardVisaSteps, visaOnArrivalSteps } from './shared';

// ─── United States ───────────────────────────────────────────────────────────

const usa: CountryMetadata = {
  code: 'US',
  name: 'United States',
  slug: 'usa',
  nationality: 'American',
  region: 'western',

  primaryKeywords: [
    'medical tourism India from USA',
    'USA to India treatment cost',
    'best hospital in India for American patients',
    'India medical tourism Americans',
  ],

  longTailKeywords: [
    'hip replacement cost India vs USA',
    'dental implants in India for Americans',
    'cosmetic surgery India vs USA prices',
    'how much can I save on surgery in India from USA',
    'best cardiology hospital in India for Americans',
    'medical tourism India from USA',
    'JCI accredited hospitals in India',
    'knee replacement cost India vs United States',
    'IVF treatment cost India vs USA',
    'cancer treatment India vs America cost',
  ],

  topConcerns: [
    'Cost savings vs US healthcare (50–90%)',
    'JCI accreditation and quality assurance',
    'Insurance coverage and reimbursement',
    'Travel time and jet lag',
    'English-speaking staff',
    'Follow-up care back in the US',
  ],

  majorCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'],
  flightTime: '15–18 hours (1–2 stops)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '4–6 business days',
  majorAirports: ['New York (JFK)', 'Los Angeles (LAX)', 'Chicago (ORD)', 'Houston (IAH)', 'San Francisco (SFO)'],

  costSavingsVsLocal: '70–90%',
  costComparisonCountries: ['USA', 'Singapore', 'Thailand'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Western cuisine available', 'Christian chapel access', 'Private rooms', 'International patient lounges'],

  patientsTreated: 800,
  establishedYear: 2018,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '18 hours from NYC (1 stop)', directFlights: false, airlines: ['Emirates (via Dubai)', 'Qatar Airways (via Doha)', 'Lufthansa (via Frankfurt)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '16 hours from NYC (1 stop)', directFlights: false, airlines: ['Emirates (via Dubai)', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '15 hours from NYC (1 stop)', directFlights: false, airlines: ['Emirates (via Dubai)', 'Lufthansa (via Frankfurt)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'World-Class Healthcare in India for American Patients',
  heroSubtitle: 'Save 70–90% vs US healthcare. JCI-accredited hospitals. English-speaking doctors. Premium international patient services.',
  metaDescription: 'Affordable medical treatment in India for American patients. Save 70–90% on cardiac, orthopedic, cancer, IVF care at JCI-accredited hospitals. English-speaking staff. Free consultation.',
  introParagraph: 'American patients choose India for cardiac surgery, orthopedics, cancer treatment, IVF, and cosmetic procedures — saving 70–90% compared to US healthcare costs while receiving care at JCI-accredited hospitals with English-speaking doctors and premium international patient services.',

  currency: { code: 'USD', symbol: '$', exchangeRate: 1, name: 'US Dollar' },
};

// ─── United Kingdom ──────────────────────────────────────────────────────────

const uk: CountryMetadata = {
  code: 'GB',
  name: 'United Kingdom',
  slug: 'uk',
  nationality: 'British',
  region: 'western',

  primaryKeywords: [
    'medical tourism India from UK',
    'UK to India treatment cost',
    'best hospital in India for British patients',
    'India medical tourism UK',
  ],

  longTailKeywords: [
    'hip replacement cost India vs UK',
    'knee replacement cost India vs UK NHS',
    'cosmetic surgery India vs UK prices',
    'how much can I save on surgery in India from UK',
    'best cardiology hospital in India for British patients',
    'medical tourism India from United Kingdom',
    'JCI accredited hospitals in India',
    'IVF treatment cost India vs UK',
    'cancer treatment India vs UK cost',
    'dental implants in India for UK residents',
  ],

  topConcerns: [
    'Cost savings vs UK private healthcare',
    'NHS waiting list alternatives',
    'JCI accreditation and quality assurance',
    'Travel time from London',
    'English-speaking staff',
    'Follow-up care back in the UK',
  ],

  majorCities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  flightTime: '8–9 hours from London',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['London (LHR)', 'Manchester (MAN)', 'Birmingham (BHX)', 'Edinburgh (EDI)'],

  costSavingsVsLocal: '60–80%',
  costComparisonCountries: ['UK', 'Germany', 'Turkey'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Western cuisine available', 'Christian chapel access', 'Private rooms', 'International patient lounges', 'Vegetarian options'],

  patientsTreated: 600,
  establishedYear: 2018,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '9.5 hours from London (1 stop)', directFlights: false, airlines: ['British Airways (via Mumbai)', 'Emirates (via Dubai)', 'Lufthansa (via Frankfurt)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '8.5 hours from London', directFlights: true, airlines: ['British Airways', 'Air India', 'Virgin Atlantic'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '8 hours from London', directFlights: true, airlines: ['British Airways', 'Air India', 'Virgin Atlantic'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'World-Class Healthcare in India for British Patients',
  heroSubtitle: 'Save 60–80% vs UK private healthcare. Skip NHS waiting lists. JCI-accredited hospitals. Direct flights from London.',
  metaDescription: 'Affordable medical treatment in India for UK patients. Save 60–80% on cardiac, orthopedic, cancer, IVF care. Skip NHS waiting lists. JCI hospitals, English-speaking staff. Free consultation.',
  introParagraph: 'British patients choose India for cardiac surgery, orthopedics, cancer treatment, IVF, and cosmetic procedures — saving 60–80% compared to UK private healthcare while avoiding NHS waiting lists, with direct flights from London and JCI-accredited hospitals.',

  currency: { code: 'GBP', symbol: '£', exchangeRate: 0.79, name: 'British Pound' },
};

// ─── Canada ──────────────────────────────────────────────────────────────────

const canada: CountryMetadata = {
  code: 'CA',
  name: 'Canada',
  slug: 'canada',
  nationality: 'Canadian',
  region: 'western',

  primaryKeywords: [
    'medical tourism India from Canada',
    'Canada to India treatment cost',
    'best hospital in India for Canadian patients',
    'India medical tourism Canada',
  ],

  longTailKeywords: [
    'hip replacement cost India vs Canada',
    'knee replacement cost India vs Canada',
    'cosmetic surgery India vs Canada prices',
    'how much can I save on surgery in India from Canada',
    'best cardiology hospital in India for Canadian patients',
    'medical tourism India from Canada',
    'JCI accredited hospitals in India',
    'IVF treatment cost India vs Canada',
    'cancer treatment India vs Canada cost',
    'dental implants in India for Canadians',
  ],

  topConcerns: [
    'Cost savings vs Canadian private healthcare',
    'Wait time alternatives (provincial healthcare)',
    'JCI accreditation and quality assurance',
    'Travel time from Toronto/Vancouver',
    'English-speaking staff',
    'Follow-up care back in Canada',
  ],

  majorCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  flightTime: '14–18 hours (1–2 stops)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Toronto (YYZ)', 'Vancouver (YVR)', 'Montreal (YUL)', 'Calgary (YYC)'],

  costSavingsVsLocal: '60–80%',
  costComparisonCountries: ['Canada', 'USA', 'Thailand'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English', 'French'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Western cuisine available', 'Christian chapel access', 'Private rooms', 'International patient lounges', 'French interpreters'],

  patientsTreated: 400,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '18 hours from Toronto (1–2 stops)', directFlights: false, airlines: ['Emirates (via Dubai)', 'Lufthansa (via Frankfurt)', 'Air India (via London)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '16 hours from Toronto (1 stop)', directFlights: false, airlines: ['Emirates (via Dubai)', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '15 hours from Toronto (1 stop)', directFlights: false, airlines: ['Emirates (via Dubai)', 'Lufthansa (via Frankfurt)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'World-Class Healthcare in India for Canadian Patients',
  heroSubtitle: 'Save 60–80% vs Canadian private healthcare. Skip provincial wait times. JCI-accredited hospitals. English and French support.',
  metaDescription: 'Affordable medical treatment in India for Canadian patients. Save 60–80% on cardiac, orthopedic, cancer, IVF care. Skip wait times. JCI hospitals, English/French staff. Free consultation.',
  introParagraph: 'Canadian patients choose India for cardiac surgery, orthopedics, cancer treatment, IVF, and cosmetic procedures — saving 60–80% compared to Canadian private healthcare while avoiding provincial wait times, with JCI-accredited hospitals and English/French language support.',

  currency: { code: 'CAD', symbol: 'C$', exchangeRate: 1.36, name: 'Canadian Dollar' },
};

// ─── Australia ───────────────────────────────────────────────────────────────

const australia: CountryMetadata = {
  code: 'AU',
  name: 'Australia',
  slug: 'australia',
  nationality: 'Australian',
  region: 'western',

  primaryKeywords: [
    'medical tourism India from Australia',
    'Australia to India treatment cost',
    'best hospital in India for Australian patients',
    'India medical tourism Australia',
  ],

  longTailKeywords: [
    'hip replacement cost India vs Australia',
    'knee replacement cost India vs Australia',
    'cosmetic surgery India vs Australia prices',
    'how much can I save on surgery in India from Australia',
    'best cardiology hospital in India for Australian patients',
    'medical tourism India from Australia',
    'JCI accredited hospitals in India',
    'IVF treatment cost India vs Australia',
    'cancer treatment India vs Australia cost',
    'dental implants in India for Australians',
  ],

  topConcerns: [
    'Cost savings vs Australian private healthcare',
    'Medicare waiting list alternatives',
    'JCI accreditation and quality assurance',
    'Travel time from Sydney/Melbourne',
    'English-speaking staff',
    'Follow-up care back in Australia',
  ],

  majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  flightTime: '12–15 hours (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '3–5 business days',
  majorAirports: ['Sydney (SYD)', 'Melbourne (MEL)', 'Brisbane (BNE)', 'Perth (PER)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Australia', 'Thailand', 'Singapore'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Western cuisine available', 'Christian chapel access', 'Private rooms', 'International patient lounges', 'Vegetarian options'],

  patientsTreated: 300,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '13 hours from Sydney (1 stop)', directFlights: false, airlines: ['Singapore Airlines (via Singapore)', 'Malaysia Airlines (via KL)', 'Qatar Airways (via Doha)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '12 hours from Sydney (1 stop)', directFlights: false, airlines: ['Singapore Airlines (via Singapore)', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Chennai', flightTime: '12 hours from Sydney (1 stop)', directFlights: false, airlines: ['Singapore Airlines (via Singapore)', 'Malaysia Airlines (via KL)'], specialties: ['Cardiac', 'Orthopedics', 'Cancer'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'World-Class Healthcare in India for Australian Patients',
  heroSubtitle: 'Save 50–70% vs Australian private healthcare. Skip Medicare wait times. JCI-accredited hospitals. English-speaking staff.',
  metaDescription: 'Affordable medical treatment in India for Australian patients. Save 50–70% on cardiac, orthopedic, cancer, IVF care. Skip wait times. JCI hospitals, English-speaking staff. Free consultation.',
  introParagraph: 'Australian patients choose India for cardiac surgery, orthopedics, cancer treatment, IVF, and cosmetic procedures — saving 50–70% compared to Australian private healthcare while avoiding Medicare wait times, with JCI-accredited hospitals and English-speaking staff.',

  currency: { code: 'AUD', symbol: 'A$', exchangeRate: 1.52, name: 'Australian Dollar' },
};

// ─── Kazakhstan ──────────────────────────────────────────────────────────────

const kazakhstan: CountryMetadata = {
  code: 'KZ',
  name: 'Kazakhstan',
  slug: 'kazakhstan',
  nationality: 'Kazakh',
  region: 'central-asia',

  primaryKeywords: [
    'medical tourism India from Kazakhstan',
    'Kazakhstan to India treatment cost',
    'best hospital in India for Kazakh patients',
    'India medical visa Kazakhstan',
  ],

  longTailKeywords: [
    'cardiac surgery cost India vs Kazakhstan',
    'orthopedic treatment in India for Kazakh patients',
    'cancer care in India from Kazakhstan',
    'best JCI hospital in India for Kazakh patients',
    'Russian speaking hospital in Bangalore',
    'medical visa India from Kazakhstan',
    'India vs Turkey medical cost for Kazakh',
    'how to travel from Almaty to India for treatment',
    'IVF treatment in India from Kazakhstan cost',
    'liver transplant cost India for Kazakh patients',
  ],

  topConcerns: [
    'Cost savings vs Almaty private hospitals',
    'Russian and Kazakh language support',
    'Visa application process',
    'Travel logistics from Almaty/Astana',
    'Hospital quality and accreditation',
    'Payment methods and currency',
  ],

  majorCities: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'],
  flightTime: '5–6 hours from Almaty (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Almaty (ALA)', 'Astana (NQZ)'],

  costSavingsVsLocal: '40–60%',
  costComparisonCountries: ['Turkey', 'South Korea', 'Germany'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Kazakh', 'Russian', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food available', 'Prayer rooms', 'Russian interpreters', 'Female doctors on request'],

  patientsTreated: 300,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '6.5 hours from Almaty (1 stop)', directFlights: false, airlines: ['Air Astana (via Delhi)', 'IndiGo (via Delhi)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Delhi', flightTime: '5 hours from Almaty (1 stop)', directFlights: false, airlines: ['Air Astana', 'IndiGo'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
    { name: 'Mumbai', flightTime: '6 hours from Almaty (1 stop)', directFlights: false, airlines: ['Air Astana (via Delhi)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Kazakh Patients',
  heroSubtitle: 'Flights from Almaty and Astana. Russian and Kazakh support. Halal facilities. Save 40–60% vs Turkey and South Korea.',
  metaDescription: 'Affordable medical treatment in India for Kazakh patients. Russian/Kazakh support, halal food, save 40–60% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Almaty, Astana, and Shymkent travel to India for cardiac surgery, cancer treatment, orthopedics, transplants, and IVF — with Russian and Kazakh language support, halal food, and JCI-accredited hospitals.',

  currency: { code: 'KZT', symbol: '₸', exchangeRate: 470, name: 'Kazakhstani Tenge' },
};

export const westernAndCentralAsiaCountries: CountryMetadata[] = [
  australia,
  canada,
  kazakhstan,
  uk,
  usa,
];
