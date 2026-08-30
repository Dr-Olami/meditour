type WithContext<T> = T & { '@context': 'https://schema.org' };

function thing<T extends Record<string, unknown>>(type: string, data: T): WithContext<T & { '@type': string }> {
  return { '@context': 'https://schema.org', '@type': type, ...data } as WithContext<T & { '@type': string }>;
}

interface SiteIdentity {
  name: string;
  url: string;
  whatsapp?: string;
  email?: string;
  specialties?: string[];
  sameAs?: string[];
}

/**
 * Build a MedicalBusiness JSON-LD object for the site/facilitator.
 *
 * The business is modelled as a facilitator with no public physical address,
 * so `address` is intentionally omitted.
 */
export function medicalBusiness(site: SiteIdentity): WithContext<Record<string, unknown>> {
  return thing('MedicalBusiness', {
    name: site.name,
    url: site.url,
    ...(site.whatsapp ? { telephone: site.whatsapp } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(site.specialties?.length ? { medicalSpecialty: site.specialties } : {}),
    ...(site.sameAs?.length ? { sameAs: site.sameAs } : {}),
  });
}

interface PhysicianInput {
  name: string;
  specialty: string;
  url: string;
  image?: string;
  hospitalName: string;
  hospitalUrl?: string;
  knowsAbout?: string[];
  alumniOf?: string;
  award?: string[];
  qualification?: string;
  yearsExperience?: number;
  languages?: string[];
}

/**
 * Build a Physician JSON-LD object for a doctor detail page.
 */
export function physician(data: PhysicianInput): WithContext<Record<string, unknown>> {
  return thing('Physician', {
    name: data.name,
    url: data.url,
    ...(data.image ? { image: data.image } : {}),
    medicalSpecialty: data.specialty,
    worksFor: thing('Hospital', {
      name: data.hospitalName,
      ...(data.hospitalUrl ? { url: data.hospitalUrl } : {}),
    }),
    ...(data.knowsAbout?.length ? { knowsAbout: data.knowsAbout } : {}),
    ...(data.alumniOf ? { alumniOf: data.alumniOf } : {}),
    ...(data.award?.length ? { award: data.award } : {}),
    ...(data.qualification ? { qualification: data.qualification } : {}),
    ...(data.yearsExperience !== undefined ? { hasCredential: `Years of experience: ${data.yearsExperience}` } : {}),
    ...(data.languages?.length ? { knowsLanguage: data.languages } : {}),
  });
}

interface HospitalInput {
  name: string;
  url: string;
  description: string;
  image?: string;
  city: string;
  country: string;
  accreditations?: string[];
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  establishedYear?: number;
  specialities?: string[];
}

/**
 * Build a Hospital JSON-LD object for a hospital detail page.
 */
export function hospital(data: HospitalInput): WithContext<Record<string, unknown>> {
  return thing('Hospital', {
    name: data.name,
    url: data.url,
    description: data.description,
    ...(data.image ? { image: data.image } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(data.address ? { streetAddress: data.address } : {}),
      addressLocality: data.city,
      addressCountry: data.country,
    },
    ...(data.phone ? { telephone: data.phone } : {}),
    ...(data.email ? { email: data.email } : {}),
    ...(data.website ? { sameAs: [data.website] } : {}),
    ...(data.establishedYear ? { foundingDate: String(data.establishedYear) } : {}),
    ...(data.accreditations?.length ? { accreditation: data.accreditations } : {}),
    ...(data.specialities?.length ? { medicalSpecialty: data.specialities } : {}),
  });
}

interface MedicalProcedureInput {
  name: string;
  url: string;
  description: string;
  image?: string;
  procedureType?: string;
}

/**
 * Build a MedicalProcedure JSON-LD object for a treatment detail page.
 */
export function medicalProcedure(data: MedicalProcedureInput): WithContext<Record<string, unknown>> {
  return thing('MedicalProcedure', {
    name: data.name,
    url: data.url,
    description: data.description,
    ...(data.image ? { image: data.image } : {}),
    ...(data.procedureType ? { procedureType: data.procedureType } : {}),
  });
}

interface BlogPostingInput {
  headline: string;
  url: string;
  description: string;
  image?: string;
  publishedAt: Date;
  updatedAt?: Date;
  author: string;
  siteName: string;
  siteUrl: string;
}

/**
 * Build a BlogPosting JSON-LD object for an article page.
 */
export function blogPosting(data: BlogPostingInput): WithContext<Record<string, unknown>> {
  return thing('BlogPosting', {
    headline: data.headline,
    url: data.url,
    description: data.description,
    ...(data.image ? { image: data.image } : {}),
    datePublished: data.publishedAt.toISOString(),
    ...(data.updatedAt ? { dateModified: data.updatedAt.toISOString() } : {}),
    author: {
      '@type': 'Organization',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: data.siteName,
      url: data.siteUrl,
    },
  });
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Build a BreadcrumbList JSON-LD object.
 */
export function breadcrumbs(items: BreadcrumbItem[]): WithContext<Record<string, unknown>> {
  return thing('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

interface FAQInput {
  entries: { question: string; answer: string; bullets?: string[]; answerSuffix?: string }[];
}

/**
 * Build a FAQPage JSON-LD object for pages with FAQ content.
 */
export function faqPage(data: FAQInput): WithContext<Record<string, unknown>> {
  return thing('FAQPage', {
    mainEntity: data.entries.map((entry) => {
      // Reason: combine answer, bullets, and answerSuffix into a single text
      // string for structured data — Google requires a plain text answer.
      let text = entry.answer;
      if (entry.bullets?.length) {
        text += ' ' + entry.bullets.map((b) => `- ${b}`).join(' ');
      }
      if (entry.answerSuffix) {
        text += ` ${entry.answerSuffix}`;
      }
      return {
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text,
        },
      };
    }),
  });
}

interface MedicalConditionInput {
  name: string;
  description?: string;
  possibleTreatment?: string;
}

/**
 * Build a MedicalCondition JSON-LD object for treatment pages.
 */
export function medicalCondition(data: MedicalConditionInput): WithContext<Record<string, unknown>> {
  return thing('MedicalCondition', {
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    ...(data.possibleTreatment ? { possibleTreatment: data.possibleTreatment } : {}),
  });
}

interface MedicalWebPageInput {
  name: string;
  url: string;
  description: string;
  image?: string;
  dateModified?: string;
  about?: Record<string, unknown>;
  mainEntity?: Record<string, unknown>;
  audience?: string;
  inLanguage?: string;
  specialty?: string;
}

/**
 * Build a MedicalWebPage JSON-LD object for treatment detail pages.
 *
 * Wraps the page-level medical content so AI/geo engines can identify the
 * page as a medical resource with structured metadata.
 */
export function medicalWebPage(data: MedicalWebPageInput): WithContext<Record<string, unknown>> {
  return thing('MedicalWebPage', {
    name: data.name,
    url: data.url,
    description: data.description,
    ...(data.image ? { image: data.image } : {}),
    ...(data.dateModified ? { dateModified: data.dateModified } : {}),
    ...(data.about ? { about: data.about } : {}),
    ...(data.mainEntity ? { mainEntity: data.mainEntity } : {}),
    ...(data.audience ? { audience: { '@type': 'MedicalAudience', name: data.audience } } : {}),
    ...(data.inLanguage ? { inLanguage: data.inLanguage } : {}),
    ...(data.specialty ? { medicalSpecialty: data.specialty } : {}),
  });
}
