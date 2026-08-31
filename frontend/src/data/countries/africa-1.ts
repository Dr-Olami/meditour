import type { CountryMetadata } from './types';
import { baseTreatmentCosts, standardVisaSteps } from './shared';

// ─── Nigeria ─────────────────────────────────────────────────────────────────

const nigeria: CountryMetadata = {
  code: 'NG',
  name: 'Nigeria',
  slug: 'nigeria',
  nationality: 'Nigerian',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Nigeria',
    'Nigeria to India treatment cost',
    'best hospital in India for Nigerian patients',
    'India medical visa Nigeria',
  ],

  longTailKeywords: [
    'orthopedic surgery in India for Nigerian patients',
    'heart surgery cost India vs Nigeria',
    'cancer treatment in India from Nigeria',
    'kidney transplant cost India for Nigerians',
    'spine surgery in Bangalore from Lagos',
    'best hospital in India for Nigerians',
    'medical visa India from Nigeria requirements',
    'how to travel from Lagos to India for treatment',
    'India vs South Africa medical cost for Nigerians',
    'IVF treatment in India from Nigeria cost',
  ],

  topConcerns: [
    'Cost savings vs South Africa or Europe',
    'Visa process and documentation',
    'Travel logistics from Lagos/Abuja',
    'Hospital quality assurance',
    'Payment methods (Naira conversion)',
    'English-speaking staff',
  ],

  majorCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'],
  flightTime: '8–10 hours from Lagos (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Lagos (LOS)', 'Abuja (ABV)', 'Port Harcourt (PHC)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'UK', 'USA'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English'],
  religiousMajority: 'mixed',
  culturalConsiderations: ['Halal food available', 'Christian chapel access', 'African cuisine options'],

  patientsTreated: 1200,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '9 hours from Lagos (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '8 hours from Lagos (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '10 hours from Lagos (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Medical Care in India for Nigerian Patients',
  heroSubtitle: 'Save 50–70% on world-class treatments. English-speaking staff. Comprehensive travel support from Lagos and Abuja.',
  metaDescription: 'Affordable advanced healthcare in India for Nigerian patients. Save on cardiac, orthopedic, cancer treatments with visa assistance, flight support, and English-speaking coordinators.',
  introParagraph: 'Patients from Lagos, Abuja, and Port Harcourt travel to India for cardiac surgery, orthopedics, cancer treatment, kidney transplants, and IVF — with English-speaking coordinators, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'NGN', symbol: '₦', exchangeRate: 1600, name: 'Nigerian Naira' },
};

// ─── Kenya ───────────────────────────────────────────────────────────────────

const kenya: CountryMetadata = {
  code: 'KE',
  name: 'Kenya',
  slug: 'kenya',
  nationality: 'Kenyan',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Kenya',
    'Kenya to India treatment cost',
    'best hospital in India for Kenyan patients',
    'India medical visa Kenya',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Kenya',
    'orthopedic treatment in India for Kenyan patients',
    'cancer care in India from Kenya',
    'kidney transplant India for Kenyans',
    'best hospital in India for Kenyan patients',
    'medical visa India from Kenya requirements',
    'how to travel from Nairobi to India for treatment',
    'India vs South Africa medical cost for Kenyans',
    'spine surgery in India from Kenya',
    'IVF treatment in India for Kenyan couples',
  ],

  topConcerns: [
    'Cost savings vs Nairobi private hospitals',
    'Visa process and documentation',
    'Travel logistics from Nairobi',
    'Hospital quality assurance',
    'English and Swahili support',
    'Insurance coverage',
  ],

  majorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'],
  flightTime: '6–7 hours from Nairobi (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Nairobi (NBO)', 'Mombasa (MBA)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'UK', 'India'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English', 'Swahili'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'African cuisine options'],

  patientsTreated: 900,
  establishedYear: 2019,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '7 hours from Nairobi (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Kenya Airways (via Mumbai)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '6 hours from Nairobi', directFlights: true, airlines: ['Kenya Airways'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '7 hours from Nairobi (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Kenya Airways (via Mumbai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Kenyan Patients',
  heroSubtitle: 'Direct flights from Nairobi. English and Swahili support. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Kenyan patients. Save 50–70% on cardiac, cancer, orthopedic care with visa support, English/Swahili staff, and JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Nairobi, Mombasa, and Kisumu travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with English and Swahili language support, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'KES', symbol: 'KSh', exchangeRate: 129, name: 'Kenyan Shilling' },
};

// ─── Ghana ───────────────────────────────────────────────────────────────────

const ghana: CountryMetadata = {
  code: 'GH',
  name: 'Ghana',
  slug: 'ghana',
  nationality: 'Ghanaian',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Ghana',
    'Ghana to India treatment cost',
    'best hospital in India for Ghanaian patients',
    'India medical visa Ghana',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Ghana',
    'orthopedic treatment in India for Ghanaian patients',
    'cancer care in India from Ghana',
    'kidney transplant India for Ghanaians',
    'best hospital in India for Ghanaian patients',
    'medical visa India from Ghana requirements',
    'how to travel from Accra to India for treatment',
    'India vs South Africa medical cost for Ghanaians',
    'spine surgery in India from Ghana',
    'IVF treatment in India for Ghanaian couples',
  ],

  topConcerns: [
    'Cost savings vs Accra private hospitals',
    'Visa process and documentation',
    'Travel logistics from Accra',
    'Hospital quality assurance',
    'English-speaking staff',
    'Insurance coverage',
  ],

  majorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi'],
  flightTime: '9–10 hours from Accra (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Accra (ACC)', 'Kumasi (KMS)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'UK', 'Turkey'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'African cuisine options'],

  patientsTreated: 500,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '10 hours from Accra (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '9 hours from Accra (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '10 hours from Accra (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Ghanaian Patients',
  heroSubtitle: 'Flights from Accra. English-speaking coordinators. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Ghanaian patients. Save 50–70% on cardiac, cancer, orthopedic care with visa support, English staff, and JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Accra, Kumasi, and Tamale travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with English-speaking coordinators, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'GHS', symbol: '₵', exchangeRate: 15, name: 'Ghanaian Cedi' },
};

// ─── Ethiopia ────────────────────────────────────────────────────────────────

const ethiopia: CountryMetadata = {
  code: 'ET',
  name: 'Ethiopia',
  slug: 'ethiopia',
  nationality: 'Ethiopian',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Ethiopia',
    'Ethiopia to India treatment cost',
    'best hospital in India for Ethiopian patients',
    'India medical visa Ethiopia',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Ethiopia',
    'orthopedic treatment in India for Ethiopian patients',
    'cancer care in India from Ethiopia',
    'kidney transplant India for Ethiopians',
    'best hospital in India for Ethiopian patients',
    'medical visa India from Ethiopia requirements',
    'how to travel from Addis Ababa to India for treatment',
    'India vs South Africa medical cost for Ethiopians',
    'Amharic English speaking hospital in India',
    'IVF treatment in India for Ethiopian couples',
  ],

  topConcerns: [
    'Cost savings vs Addis Ababa hospitals',
    'Visa process and documentation',
    'Travel logistics from Addis Ababa',
    'Hospital quality assurance',
    'Amharic and English support',
    'Insurance coverage',
  ],

  majorCities: ['Addis Ababa', 'Dire Dawa', 'Gondar', 'Mekelle'],
  flightTime: '6 hours from Addis Ababa',
  directFlights: true,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Addis Ababa (ADD)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'Thailand', 'Turkey'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Amharic', 'English'],
  religiousMajority: 'christian',
  culturalConsiderations: ['Christian chapel access', 'Halal food available', 'Ethiopian cuisine options', 'Fasting accommodation'],

  patientsTreated: 400,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '6.5 hours from Addis Ababa', directFlights: true, airlines: ['Ethiopian Airlines'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '6 hours from Addis Ababa', directFlights: true, airlines: ['Ethiopian Airlines'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '6.5 hours from Addis Ababa', directFlights: true, airlines: ['Ethiopian Airlines'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Ethiopian Patients',
  heroSubtitle: 'Direct flights from Addis Ababa. Amharic and English support. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Ethiopian patients. Direct flights, Amharic/English support, save 50–70% on cardiac, cancer, orthopedic care at JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Addis Ababa and across Ethiopia travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with Amharic and English language support, direct flights via Ethiopian Airlines, and JCI-accredited hospitals.',

  currency: { code: 'ETB', symbol: 'Br', exchangeRate: 128, name: 'Ethiopian Birr' },
};

// ─── Tanzania ────────────────────────────────────────────────────────────────

const tanzania: CountryMetadata = {
  code: 'TZ',
  name: 'Tanzania',
  slug: 'tanzania',
  nationality: 'Tanzanian',
  region: 'africa',

  primaryKeywords: [
    'medical tourism India from Tanzania',
    'Tanzania to India treatment cost',
    'best hospital in India for Tanzanian patients',
    'India medical visa Tanzania',
  ],

  longTailKeywords: [
    'heart surgery cost India vs Tanzania',
    'orthopedic treatment in India for Tanzanian patients',
    'cancer care in India from Tanzania',
    'kidney transplant India for Tanzanians',
    'best hospital in India for Tanzanian patients',
    'medical visa India from Tanzania requirements',
    'how to travel from Dar es Salaam to India for treatment',
    'India vs South Africa medical cost for Tanzanians',
    'Swahili English speaking hospital in India',
    'IVF treatment in India for Tanzanian couples',
  ],

  topConcerns: [
    'Cost savings vs Dar es Salaam hospitals',
    'Visa process and documentation',
    'Travel logistics from Dar es Salaam',
    'Hospital quality assurance',
    'Swahili and English support',
    'Insurance coverage',
  ],

  majorCities: ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza'],
  flightTime: '7–8 hours from Dar es Salaam (1 stop)',
  directFlights: false,
  visaType: 'e-visa',
  visaProcessingTime: '5–7 business days',
  majorAirports: ['Dar es Salaam (DAR)', 'Zanzibar (ZNZ)', 'Kilimanjaro (JRO)'],

  costSavingsVsLocal: '50–70%',
  costComparisonCountries: ['South Africa', 'Kenya', 'India'],
  treatmentCosts: baseTreatmentCosts,

  languages: ['Swahili', 'English'],
  religiousMajority: 'mixed',
  culturalConsiderations: ['Halal food available', 'Christian chapel access', 'African cuisine options'],

  patientsTreated: 350,
  establishedYear: 2020,

  recommendedCities: [
    { name: 'Bangalore', flightTime: '8 hours from Dar es Salaam (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Kenya Airways (via Nairobi)'], specialties: ['Transplant', 'Cardiac', 'Orthopedics', 'Cancer'] },
    { name: 'Mumbai', flightTime: '7 hours from Dar es Salaam (1 stop)', directFlights: false, airlines: ['Kenya Airways (via Nairobi)', 'Qatar Airways (via Doha)'], specialties: ['Cancer', 'Cardiac', 'Cosmetic'] },
    { name: 'Delhi', flightTime: '8 hours from Dar es Salaam (1 stop)', directFlights: false, airlines: ['Ethiopian Airlines', 'Emirates (via Dubai)'], specialties: ['Cardiac', 'Cancer', 'Orthopedics'] },
  ],

  visaSteps: standardVisaSteps,

  heroTitle: 'Advanced Healthcare in India for Tanzanian Patients',
  heroSubtitle: 'Flights from Dar es Salaam. Swahili and English support. Save 50–70% on world-class treatments.',
  metaDescription: 'Affordable medical treatment in India for Tanzanian patients. Save 50–70% on cardiac, cancer, orthopedic care with visa support, Swahili/English staff, and JCI hospitals. Free consultation.',
  introParagraph: 'Patients from Dar es Salaam, Dodoma, and Arusha travel to India for cardiac surgery, cancer treatment, orthopedics, kidney transplants, and IVF — with Swahili and English language support, visa assistance, and JCI-accredited hospitals.',

  currency: { code: 'TZS', symbol: 'TSh', exchangeRate: 2540, name: 'Tanzanian Shilling' },
};

export const africaCountriesPart1: CountryMetadata[] = [
  ethiopia,
  ghana,
  kenya,
  nigeria,
  tanzania,
];
