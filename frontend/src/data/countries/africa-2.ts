import type { CountryMetadata } from './types';
import { baseTreatmentCosts, standardVisaSteps } from './shared';

// ─── Cameroon ────────────────────────────────────────────────────────────────

const cameroon: CountryMetadata = {
  code: 'CM',
  name: 'Cameroon',
  slug: 'cameroon',
  nationality: 'Cameroonian',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Cameroon',
    'Cameroon to India treatment cost',
    'best hospital in India for Cameroonian patients',
    'India medical visa Cameroon',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Cameroon',
    'orthopedic treatment in India for Cameroonian patients',
    'cancer care in India from Cameroon',
    'kidney transplant India for Cameroonians',
    'best hospital in India for Cameroonian patients',
    'medical visa India from Cameroon requirements',
    'how to travel from Douala to India for treatment',
    'India vs South Africa medical cost for Cameroonians',
    'French English speaking hospital in India',
    'IVF treatment in India for Cameroonian couples',
  ],

  topConcerns: [
    'Cost savings vs local healthcare',
    'Visa process and documentation',
    'Travel logistics from Douala/Yaoundé',
    'Hospital quality assurance',
    'French and English support',
    'Insurance coverage',
  ],

  majorCities: ['Douala', 'Yaoundé', 'Bamenda', 'Bafoussam'],
  flightTime: '10–12 hours from Douala (1–2 stops)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Douala (DLA)', 'Yaoundé (NSI)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'France', 'Turkey'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['French', 'English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'French interpreters'],

  patientsTreated: 250,
  establishedYear: 2021,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '11 hours from Douala (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '10 hours from Douala (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '12 hours from Douala (1–2 stops)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Cameroonian Patients',
  heroSubtitle: 'Flights from Douala and Yaoundé. French and English support. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Cameroonian patients. French/English support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Douala, Yaoundé, and Bamenda travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with French and English language support, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'XAF', symbol: 'FCFA', exchangeRate: 600, name: 'Central African CFA Franc' },
};

// ─── Rwanda ──────────────────────────────────────────────────────────────────

const rwanda: CountryMetadata = {
  code: 'RW',
  name: 'Rwanda',
  slug: 'rwanda',
  nationality: 'Rwandan',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Rwanda',
    'Rwanda to India treatment cost',
    'best hospital in India for Rwandan patients',
    'India medical visa Rwanda',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Rwanda',
    'orthopedic treatment in India for Rwandan patients',
    'cancer care in India from Rwanda',
    'kidney transplant India for Rwandans',
    'best hospital in India for Rwandan patients',
    'medical visa India from Rwanda requirements',
    'how to travel from Kigali to India for treatment',
    'India vs Kenya medical cost for Rwandans',
    'Kinyarwanda French English speaking hospital in India',
    'IVF treatment in India for Rwandan couples',
  ],

  topConcerns: [
    'Cost savings vs Kigali hospitals',
    'Visa process and documentation',
    'Travel logistics from Kigali',
    'Hospital quality assurance',
    'Kinyarwanda, French, and English support',
    'Insurance coverage',
  ],

  majorCities: ['Kigali', 'Butare', 'Gisenyi', 'Musanze'],
  flightTime: '7–8 hours from Kigali (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Kigali (KGL)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Kenya', 'South Africa', 'Turkey'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Kinyarwanda', 'French', 'English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'French interpreters'],

  patientsTreated: 200,
  establishedYear: 2021,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '8 hours from Kigali (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Kenya Airways (via Nairobi)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '7 hours from Kigali (1 stop)', directFlights: false, airlines: ['Kenya Airways (via Nairobi)', 'RwandAir (via Dubai)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '8 hours from Kigali (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'RwandAir (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Rwandan Patients',
  heroSubtitle: 'Flights from Kigali. Kinyarwanda, French, and English support. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Rwandan patients. Kinyarwanda/French/English support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Kigali and across Rwanda travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with Kinyarwanda, French, and English language support, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'RWF', symbol: 'FRw', exchangeRate: 1380, name: 'Rwandan Franc' },
};

// ─── Sudan ───────────────────────────────────────────────────────────────────

const sudan: CountryMetadata = {
  code: 'SD',
  name: 'Sudan',
  slug: 'sudan',
  nationality: 'Sudanese',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Sudan',
    'Sudan to India treatment cost',
    'best hospital in India for Sudanese patients',
    'India medical visa Sudan',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Sudan',
    'orthopedic treatment in India for Sudanese patients',
    'cancer care in India from Sudan',
    'kidney transplant India for Sudanese',
    'best hospital in India for Sudanese patients',
    'medical visa India from Sudan requirements',
    'how to travel from Khartoum to India for treatment',
    'India vs Egypt medical cost for Sudanese',
    'Arabic English speaking hospital in India',
    'IVF treatment in India for Sudanese couples',
  ],

  topConcerns: [
    'Cost savings vs Khartoum hospitals',
    'Visa process and documentation',
    'Travel logistics from Khartoum',
    'Hospital quality assurance',
    'Arabic and English support',
    'Halal food and prayer facilities',
  ],

  majorCities: ['Khartoum', 'Omdurman', 'Port Sudan', 'Kassala'],
  flightTime: '6–7 hours from Khartoum (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Khartoum (KRT)'],

  costSavingsVsLocal: '60–80%',
  costComparisonCountries: ['Egypt', 'Jordan', 'Turkey'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Arabic', 'English'],
  religiousMajority: 'muslim',
  culturalConsiderations: ['Halal food', 'Prayer rooms', 'Arabic interpreters', 'Female doctors on request'],

  patientsTreated: 400,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '7 hours from Khartoum (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '6 hours from Khartoum (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '7 hours from Khartoum (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Sudanese Patients',
  heroSubtitle: 'Flights from Khartoum. Arabic and English support. Halal facilities. Save 60–80% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Sudanese patients. Arabic/English support, halal food, save 60–80% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Khartoum and Omdurman travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with Arabic and English language support, halal food, prayer facilities, and JCI-accredited hospitals.',

  currency: { code: 'SDG', symbol: '£', exchangeRate: 600, name: 'Sudanese Pound' },
};

// ─── Uganda ──────────────────────────────────────────────────────────────────

const uganda: CountryMetadata = {
  code: 'UG',
  name: 'Uganda',
  slug: 'uganda',
  nationality: 'Ugandan',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Uganda',
    'Uganda to India treatment cost',
    'best hospital in India for Ugandan patients',
    'India medical visa Uganda',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Uganda',
    'orthopedic treatment in India for Ugandan patients',
    'cancer care in India from Uganda',
    'kidney transplant India for Ugandans',
    'best hospital in India for Ugandan patients',
    'medical visa India from Uganda requirements',
    'how to travel from Kampala to India for treatment',
    'India vs Kenya medical cost for Ugandans',
    'Swahili English speaking hospital in India',
    'IVF treatment in India for Ugandan couples',
  ],

  topConcerns: [
    'Cost savings vs Kampala hospitals',
    'Visa process and documentation',
    'Travel logistics from Kampala',
    'Hospital quality assurance',
    'English and Swahili support',
    'Insurance coverage',
  ],

  majorCities: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara'],
  flightTime: '7–8 hours from Kampala (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Entebbe (EBB)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['Kenya', 'South Africa', 'India'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English', 'Swahili'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'African cuisine options'],

  patientsTreated: 300,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '8 hours from Entebbe (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Kenya Airways (via Nairobi)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '7 hours from Entebbe (1 stop)', directFlights: false, airlines: ['Kenya Airways (via Nairobi)', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '8 hours from Entebbe (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Ugandan Patients',
  heroSubtitle: 'Flights from Entebbe. English and Swahili support. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Ugandan patients. English/Swahili support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Kampala and Entebbe travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with English and Swahili language support, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'UGX', symbol: 'USh', exchangeRate: 3800, name: 'Ugandan Shilling' },
};

// ─── Zimbabwe ────────────────────────────────────────────────────────────────

const zimbabwe: CountryMetadata = {
  code: 'ZW',
  name: 'Zimbabwe',
  slug: 'zimbabwe',
  nationality: 'Zimbabwean',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Zimbabwe',
    'Zimbabwe to India treatment cost',
    'best hospital in India for Zimbabwean patients',
    'India medical visa Zimbabwe',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Zimbabwe',
    'orthopedic treatment in India for Zimbabwean patients',
    'cancer care in India from Zimbabwe',
    'kidney transplant India for Zimbabweans',
    'best hospital in India for Zimbabwean patients',
    'medical visa India from Zimbabwe requirements',
    'how to travel from Harare to India for treatment',
    'India vs South Africa medical cost for Zimbabweans',
    'Shona English speaking hospital in India',
    'IVF treatment in India for Zimbabwean couples',
  ],

  topConcerns: [
    'Cost savings vs Harare hospitals',
    'Visa process and documentation',
    'Travel logistics from Harare',
    'Hospital quality assurance',
    'English support',
    'Insurance coverage and payment',
  ],

  majorCities: ['Harare', 'Bulawayo', 'Mutare', 'Gweru'],
  flightTime: '9–10 hours from Harare (1–2 stops)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Harare (HRE)', 'Bulawayo (BUQ)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'India', 'Zambia'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English', 'Shona', 'Ndebele'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'African cuisine options'],

  patientsTreated: 200,
  establishedYear: 2021,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '10 hours from Harare (1–2 stops)', directFlights: false, airlines: ['Ethiopian Airlines', 'Kenya Airways (via Nairobi)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '9 hours from Harare (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '10 hours from Harare (1–2 stops)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Zimbabwean Patients',
  heroSubtitle: 'Flights from Harare and Bulawayo. English-speaking coordinators. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Zimbabwean patients. English support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Harare, Bulawayo, and Mutare travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with English-speaking coordinators, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'ZWL', symbol: 'Z$', exchangeRate: 13, name: 'Zimbabwean Gold (ZiG)' },
};

export const africaCountriesPart2: CountryMetadata[] = [
  cameroon,
  rwanda,
  sudan,
  uganda,
  zimbabwe,
];
