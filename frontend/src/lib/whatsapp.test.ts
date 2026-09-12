import { describe, it, expect, vi } from 'vitest';
import {
  buildWhatsAppLink,
  getWhatsAppNumber,
  getInquiryLink,
  getDoctorInquiryLink,
  getTreatmentInquiryLink,
  getEstimateInquiryLink,
  getSecondOpinionLink,
  getContextualWhatsAppLink,
} from './whatsapp';

describe('buildWhatsAppLink', () => {
  it('builds a base wa.me link from a cleaned number', () => {
    expect(buildWhatsAppLink('+880 1611 892 986')).toBe('https://wa.me/8801611892986');
  });

  it('appends an encoded message', () => {
    const link = buildWhatsAppLink('8801611892986', 'Hello world');
    expect(link).toBe('https://wa.me/8801611892986?text=Hello%20world');
  });
});

describe('getWhatsAppNumber', () => {
  it('returns the fallback number when env var is missing', () => {
    expect(getWhatsAppNumber()).toBe('8801611892986');
  });
});

describe('getInquiryLink', () => {
  it('returns a valid wa.me link using the fallback number when no env var is configured', () => {
    const link = getInquiryLink();
    expect(link).toContain('https://wa.me/8801611892986');
    expect(link).toContain('medical%20tourism%20services');
  });
});

describe('getDoctorInquiryLink', () => {
  it('returns a valid wa.me link using the fallback number when no env var is configured', () => {
    const link = getDoctorInquiryLink('Dr. Sen');
    expect(link).toContain('https://wa.me/8801611892986');
    expect(link).toContain('Dr.%20Sen');
  });

  it('includes doctor name when number is configured', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getDoctorInquiryLink('Dr. Sen');
    expect(link).toContain('Dr.%20Sen');
    vi.unstubAllEnvs();
  });
});

describe('getTreatmentInquiryLink', () => {
  it('returns a valid wa.me link using the fallback number when no env var is configured', () => {
    const link = getTreatmentInquiryLink('Cardiac Surgery');
    expect(link).toContain('https://wa.me/8801611892986');
    expect(link).toContain('Cardiac%20Surgery');
  });

  it('includes treatment name when number is configured', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getTreatmentInquiryLink('Cardiac Surgery');
    expect(link).toContain('Cardiac%20Surgery');
    vi.unstubAllEnvs();
  });
});

describe('getEstimateInquiryLink', () => {
  it('returns a valid wa.me link using the fallback number when no env var is configured', () => {
    const link = getEstimateInquiryLink('Cardiac Surgery', 4500);
    expect(link).toContain('https://wa.me/8801611892986');
    expect(link).toContain('Cardiac%20Surgery');
    expect(link).toContain('%244%2C500');
  });

  it('includes treatment name and estimated total when number is configured', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getEstimateInquiryLink('Cardiac Surgery', 4500);
    expect(link).toContain('Cardiac%20Surgery');
    expect(link).toContain('%244%2C500');
    vi.unstubAllEnvs();
  });
});

describe('getSecondOpinionLink', () => {
  it('returns a valid wa.me link using the fallback number when no env var is configured', () => {
    const link = getSecondOpinionLink();
    expect(link).toContain('https://wa.me/8801611892986?text=');
    expect(link).toContain('second%20opinion');
  });

  it('includes the second-opinion message when number is configured', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getSecondOpinionLink();
    expect(link).toContain('https://wa.me/8801611892986?text=');
    expect(link).toContain('second%20opinion');
    vi.unstubAllEnvs();
  });
});

describe('getContextualWhatsAppLink', () => {
  it('dispatches to getInquiryLink for a general context', () => {
    expect(getContextualWhatsAppLink({ type: 'general' })).toBe(getInquiryLink());
  });

  it('dispatches to getDoctorInquiryLink for a doctor context', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getContextualWhatsAppLink({ type: 'doctor', doctorName: 'Dr. Sen' });
    expect(link).toContain('Dr.%20Sen');
    vi.unstubAllEnvs();
  });

  it('dispatches to getTreatmentInquiryLink for a treatment context', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getContextualWhatsAppLink({ type: 'treatment', treatmentName: 'Cardiac Surgery' });
    expect(link).toContain('Cardiac%20Surgery');
    vi.unstubAllEnvs();
  });

  it('dispatches to getEstimateInquiryLink for an estimate context', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getContextualWhatsAppLink({
      type: 'estimate',
      treatmentName: 'Cardiac Surgery',
      estimatedTotal: 4500,
    });
    expect(link).toContain('Cardiac%20Surgery');
    expect(link).toContain('%244%2C500');
    vi.unstubAllEnvs();
  });

  it('dispatches to getSecondOpinionLink for a second-opinion context', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getContextualWhatsAppLink({ type: 'second-opinion' });
    expect(link).toContain('second%20opinion');
    vi.unstubAllEnvs();
  });

  it('returns a valid link using the fallback number when no env var is configured, regardless of context', () => {
    expect(getContextualWhatsAppLink({ type: 'doctor', doctorName: 'Dr. Sen' })).toContain(
      'https://wa.me/8801611892986'
    );
    expect(getContextualWhatsAppLink({ type: 'second-opinion' })).toContain(
      'https://wa.me/8801611892986'
    );
  });
});
