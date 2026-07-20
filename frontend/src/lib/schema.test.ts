import { describe, it, expect } from 'vitest';
import { medicalBusiness, physician, hospital, medicalProcedure, blogPosting, breadcrumbs } from './schema';

describe('schema.org helpers', () => {
  it('medicalBusiness omits address for a facilitator', () => {
    const json = medicalBusiness({ name: 'Khan Meditour', url: 'https://example.com' });
    expect(json['@type']).toBe('MedicalBusiness');
    expect(json).not.toHaveProperty('address');
    expect(json.name).toBe('Khan Meditour');
  });

  it('medicalBusiness includes optional contact and specialty fields', () => {
    const json = medicalBusiness({
      name: 'Khan Meditour',
      url: 'https://example.com',
      whatsapp: '+8801611892986',
      email: 'khan@meditour.com',
      specialties: ['Cardiology'],
    });
    expect(json.telephone).toBe('+8801611892986');
    expect(json.email).toBe('khan@meditour.com');
    expect(json.medicalSpecialty).toEqual(['Cardiology']);
  });

  it('physician includes worksFor hospital', () => {
    const json = physician({
      name: 'Dr. Rajesh Sharma',
      specialty: 'Cardiology',
      url: 'https://example.com/doctors/dr-rajesh-sharma',
      hospitalName: 'Apollo Hospital, New Delhi',
    });
    expect(json['@type']).toBe('Physician');
    expect((json.worksFor as Record<string, unknown>)['@type']).toBe('Hospital');
    expect((json.worksFor as Record<string, unknown>).name).toBe('Apollo Hospital, New Delhi');
  });

  it('hospital includes address and accreditations', () => {
    const json = hospital({
      name: 'Apollo Hospital, New Delhi',
      url: 'https://example.com/hospitals/apollo',
      description: 'A leading hospital.',
      city: 'New Delhi',
      country: 'India',
      accreditations: ['JCI'],
    });
    expect(json['@type']).toBe('Hospital');
    expect((json.address as Record<string, string>).addressLocality).toBe('New Delhi');
    expect(json.accreditation).toEqual(['JCI']);
  });

  it('medicalProcedure captures procedure type', () => {
    const json = medicalProcedure({
      name: 'Cardiology',
      url: 'https://example.com/treatments/cardiology',
      description: 'Heart care.',
      procedureType: 'Heart',
    });
    expect(json['@type']).toBe('MedicalProcedure');
    expect(json.procedureType).toBe('Heart');
  });

  it('blogPosting includes author, publisher and dates', () => {
    const published = new Date('2026-07-19T00:00:00.000Z');
    const json = blogPosting({
      headline: 'Test Post',
      url: 'https://example.com/blog/test',
      description: 'A test post.',
      publishedAt: published,
      author: 'Khan Meditour Team',
      siteName: 'Khan Meditour',
      siteUrl: 'https://example.com',
    });
    expect(json['@type']).toBe('BlogPosting');
    expect((json.author as Record<string, string>).name).toBe('Khan Meditour Team');
    expect(json.datePublished).toBe(published.toISOString());
    expect(json).not.toHaveProperty('dateModified');
  });

  it('breadcrumbs builds a list with positions', () => {
    const json = breadcrumbs([
      { name: 'Home', url: 'https://example.com/' },
      { name: 'Blog', url: 'https://example.com/blog' },
    ]);
    expect(json['@type']).toBe('BreadcrumbList');
    const items = json.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(2);
    expect(items[0].position).toBe(1);
    expect(items[1].name).toBe('Blog');
  });
});
