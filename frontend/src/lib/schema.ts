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
      addressLocality: data.city,
      addressCountry: data.country,
    },
    ...(data.accreditations?.length ? { accreditation: data.accreditations } : {}),
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
