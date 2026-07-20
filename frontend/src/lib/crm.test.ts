import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { leadSchema, LEAD_SOURCE, submitLead } from './crm';

describe('LEAD_SOURCE', () => {
  it('contains all expected source constants', () => {
    expect(LEAD_SOURCE.COST_ESTIMATOR).toBe('cost-estimator');
    expect(LEAD_SOURCE.DOCTOR_PAGE).toBe('doctor-page');
    expect(LEAD_SOURCE.TREATMENT_PAGE).toBe('treatment-page');
    expect(LEAD_SOURCE.GENERAL_CONTACT).toBe('general-contact');
    expect(LEAD_SOURCE.WEBSITE).toBe('website');
  });
});

describe('leadSchema', () => {
  it('validates a minimal valid lead', () => {
    const result = leadSchema.safeParse({ name: 'Jane Doe', phone: '+1234567890' });
    expect(result.success).toBe(true);
  });

  it('validates a complete lead with all new Phase 2 fields', () => {
    const result = leadSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1234567890',
      country: 'BD',
      treatment: 'Cardiac Surgery',
      message: 'Need a second opinion',
      source: LEAD_SOURCE.TREATMENT_PAGE,
      doctorSlug: 'dr-jane-doe',
      hospitalSlug: 'apollo-hospital',
      estimatedTotal: 5500,
      hasReports: false,
      reportsSharedVia: 'not_yet',
      preferredContactMethod: 'whatsapp',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = leadSchema.safeParse({ name: 'Jane', phone: '+123', email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects an unknown reportsSharedVia value', () => {
    const result = leadSchema.safeParse({
      name: 'Jane',
      phone: '+123',
      reportsSharedVia: 'fax',
    });
    expect(result.success).toBe(false);
  });
});

describe('submitLead', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('returns ok=false when CRM URL is not configured', async () => {
    vi.stubEnv('PUBLIC_CRM_SUBMIT_URL', '');
    const result = await submitLead({ name: 'Jane', phone: '+123' });
    expect(result.ok).toBe(false);
    expect(result.message).toContain('not configured');
  });

  it('returns ok=true when fetch succeeds', async () => {
    vi.stubEnv('PUBLIC_CRM_SUBMIT_URL', 'https://example.com/crm');
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Submitted' }),
    } as Response);
    const result = await submitLead({ name: 'Jane', phone: '+123' });
    expect(result.ok).toBe(true);
  });

  it('returns ok=false when fetch fails', async () => {
    vi.stubEnv('PUBLIC_CRM_SUBMIT_URL', 'https://example.com/crm');
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('network'));
    const result = await submitLead({ name: 'Jane', phone: '+123' });
    expect(result.ok).toBe(false);
  });
});
