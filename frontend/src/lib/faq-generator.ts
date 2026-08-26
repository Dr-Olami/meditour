import type { Locale } from './i18n';
import { getTranslations } from './i18n';

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── Types for frontmatter data ──────────────────────────────────────────────

interface TreatmentData {
  name: string;
  category?: string;
  description: string;
  fromPrice?: string;
  toPrice?: string;
  procedures?: string[];
  duration?: string;
  hospitalStay?: string;
  recoveryTime?: string;
}

interface DoctorData {
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  languages?: string[];
}

interface HospitalData {
  name: string;
  city: string;
  country: string;
  description: string;
  accreditations?: string[];
  specialities?: string[];
  amenities?: string[];
  establishedYear?: number;
  bedCount?: number;
}

// ─── Helper: interpolate {{placeholders}} ────────────────────────────────────

function interpolate(template: string, vars: Record<string, string | undefined>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
}

// ─── Helper: strip a leading honorific so templates can re-add it ────────────
// Reason: doctor `name` frontmatter often includes the "Dr." / "ডাঃ" honorific,
// but the FAQ templates already hardcode it (e.g. "Dr. {{name}}"). Without
// stripping we would render "Dr. Dr. Aditi Singhvi".
const HONORIFIC_RE = /^(?:Dr\.?|ডাঃ)\s+/i;
function stripHonorific(name: string): string {
  return name.replace(HONORIFIC_RE, '').trim();
}

// ─── Merge logic ─────────────────────────────────────────────────────────────

/**
 * Merge auto-generated FAQs with manual overrides.
 *
 * Manual FAQs with matching questions override auto-generated answers.
 * Manual FAQs with new questions are appended to the end.
 *
 * @param auto - Auto-generated FAQ items.
 * @param manual - Manual FAQ items from frontmatter.
 * @returns Merged FAQ array.
 */
export function mergeFaqs(auto: FAQItem[], manual: FAQItem[]): FAQItem[] {
  const manualQuestions = new Set(manual.map((m) => m.question.toLowerCase()));
  const filteredAuto = auto.filter((a) => !manualQuestions.has(a.question.toLowerCase()));
  return [...filteredAuto, ...manual];
}

// ─── Treatment FAQ generator ─────────────────────────────────────────────────

/**
 * Generate default FAQs for a treatment page from frontmatter data.
 *
 * @param treatment - Treatment frontmatter data.
 * @param relatedDoctorNames - Resolved names of related doctors.
 * @param relatedHospitalNames - Resolved names of related hospitals.
 * @param locale - Target locale.
 * @returns Array of FAQ items.
 */
export function generateTreatmentFaqs(
  treatment: TreatmentData,
  relatedDoctorNames: string[],
  relatedHospitalNames: string[],
  locale: Locale,
): FAQItem[] {
  const t = getTranslations(locale);
  const templates = t.faq.templates.treatment;
  const vars: Record<string, string | undefined> = {
    treatment: treatment.name,
    fromPrice: treatment.fromPrice,
    toPrice: treatment.toPrice,
    stay: treatment.hospitalStay,
    recovery: treatment.recoveryTime,
    duration: treatment.duration,
    procedures: treatment.procedures?.join(', '),
    doctors: relatedDoctorNames.join(', '),
    hospitals: relatedHospitalNames.join(', '),
    category: treatment.category,
  };

  const faqs: FAQItem[] = [];

  // Cost FAQ
  if (treatment.fromPrice) {
    const answerTemplate = treatment.toPrice ? templates.costA : templates.costAFromOnly;
    faqs.push({
      question: interpolate(templates.costQ, vars),
      answer: interpolate(answerTemplate, vars),
    });
  }

  // Hospital stay FAQ
  if (treatment.hospitalStay) {
    faqs.push({
      question: interpolate(templates.hospitalStayQ, vars),
      answer: interpolate(templates.hospitalStayA, vars),
    });
  }

  // Recovery time FAQ
  if (treatment.recoveryTime) {
    faqs.push({
      question: interpolate(templates.recoveryTimeQ, vars),
      answer: interpolate(templates.recoveryTimeA, vars),
    });
  }

  // Duration FAQ
  if (treatment.duration) {
    faqs.push({
      question: interpolate(templates.durationQ, vars),
      answer: interpolate(templates.durationA, vars),
    });
  }

  // Procedures FAQ
  if (treatment.procedures?.length) {
    faqs.push({
      question: interpolate(templates.proceduresQ, vars),
      answer: interpolate(templates.proceduresA, vars),
    });
  }

  // Related doctors FAQ
  if (relatedDoctorNames.length) {
    faqs.push({
      question: interpolate(templates.doctorsQ, vars),
      answer: interpolate(templates.doctorsA, vars),
    });
  }

  // Related hospitals FAQ
  if (relatedHospitalNames.length) {
    faqs.push({
      question: interpolate(templates.hospitalsQ, vars),
      answer: interpolate(templates.hospitalsA, vars),
    });
  }

  // Static: accreditation FAQ
  faqs.push({
    question: interpolate(templates.accreditationQ, vars),
    answer: interpolate(templates.accreditationA, vars),
  });

  // Static: booking FAQ
  faqs.push({
    question: interpolate(templates.bookingQ, vars),
    answer: interpolate(templates.bookingA, vars),
  });

  return faqs;
}

// ─── Doctor FAQ generator ────────────────────────────────────────────────────

/**
 * Generate default FAQs for a doctor page from frontmatter data.
 *
 * Reduced to the 4 questions potential clients most often search for online:
 * specialty, experience, hospital affiliation, and booking. Qualification and
 * language details are already surfaced in the doctor's profile bio, so they
 * are not duplicated here.
 *
 * @param doctor - Doctor frontmatter data.
 * @param hospitalName - Resolved name of the affiliated hospital.
 * @param locale - Target locale.
 * @returns Array of FAQ items.
 */
export function generateDoctorFaqs(
  doctor: DoctorData,
  hospitalName: string,
  locale: Locale,
): FAQItem[] {
  const t = getTranslations(locale);
  const templates = t.faq.templates.doctor;
  const vars: Record<string, string | undefined> = {
    // Reason: strip the honorific because the templates already prepend "Dr."
    // / "ডাঃ" to {{name}}. Keeps the raw name available for other consumers.
    name: stripHonorific(doctor.name),
    specialty: doctor.specialty,
    qualification: doctor.qualification,
    years: String(doctor.experienceYears),
    hospital: hospitalName,
    languages: doctor.languages?.join(', '),
  };

  const faqs: FAQItem[] = [];

  // Specialty FAQ — primary search intent ("what does Dr. X treat?")
  faqs.push({
    question: interpolate(templates.specialtyQ, vars),
    answer: interpolate(templates.specialtyA, vars),
  });

  // Experience FAQ — trust/credibility signal
  faqs.push({
    question: interpolate(templates.experienceQ, vars),
    answer: interpolate(templates.experienceA, vars),
  });

  // Hospital affiliation FAQ — critical for medical tourists choosing a hospital
  faqs.push({
    question: interpolate(templates.hospitalQ, vars),
    answer: interpolate(templates.hospitalA, vars),
  });

  // Static: booking FAQ — conversion intent
  faqs.push({
    question: interpolate(templates.bookingQ, vars),
    answer: interpolate(templates.bookingA, vars),
  });

  return faqs;
}

// ─── Hospital FAQ generator ──────────────────────────────────────────────────

/**
 * Generate default FAQs for a hospital page from frontmatter data.
 *
 * @param hospital - Hospital frontmatter data.
 * @param locale - Target locale.
 * @returns Array of FAQ items.
 */
export function generateHospitalFaqs(
  hospital: HospitalData,
  locale: Locale,
): FAQItem[] {
  const t = getTranslations(locale);
  const templates = t.faq.templates.hospital;
  const vars: Record<string, string | undefined> = {
    hospital: hospital.name,
    city: hospital.city,
    country: hospital.country,
    beds: hospital.bedCount !== undefined ? String(hospital.bedCount) : undefined,
    year: hospital.establishedYear !== undefined ? String(hospital.establishedYear) : undefined,
    accreditations: hospital.accreditations?.join(', '),
    specialities: hospital.specialities?.join(', '),
  };

  const faqs: FAQItem[] = [];

  // Accreditations FAQ
  if (hospital.accreditations?.length) {
    faqs.push({
      question: interpolate(templates.accreditationQ, vars),
      answer: interpolate(templates.accreditationA, vars),
    });
  }

  // Specialities FAQ
  if (hospital.specialities?.length) {
    faqs.push({
      question: interpolate(templates.specialitiesQ, vars),
      answer: interpolate(templates.specialitiesA, vars),
    });
  }

  // Location FAQ
  faqs.push({
    question: interpolate(templates.locationQ, vars),
    answer: interpolate(templates.locationA, vars),
  });

  // Bed count FAQ
  if (hospital.bedCount !== undefined) {
    faqs.push({
      question: interpolate(templates.bedsQ, vars),
      answer: interpolate(templates.bedsA, vars),
    });
  }

  // Established year FAQ
  if (hospital.establishedYear !== undefined) {
    faqs.push({
      question: interpolate(templates.establishedQ, vars),
      answer: interpolate(templates.establishedA, vars),
    });
  }

  // International patient services FAQ
  const hasIntlServices = hospital.amenities?.some((a) =>
    /international|visa|airport|interpreter|currency|transl/i.test(a),
  );
  faqs.push({
    question: interpolate(templates.internationalQ, vars),
    answer: interpolate(hasIntlServices ? templates.internationalYesA : templates.internationalNoA, vars),
  });

  // Static: booking FAQ
  faqs.push({
    question: interpolate(templates.bookingQ, vars),
    answer: interpolate(templates.bookingA, vars),
  });

  return faqs;
}
