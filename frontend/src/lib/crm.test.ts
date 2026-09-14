import { describe, it, expect, vi, beforeEach } from 'vitest';
import { leadSchema, LEAD_SOURCE, submitLead, validateMedicalFile } from './crm';

// Reason: mock Supabase so submitLead doesn't hit the real API.
vi.mock('./supabase', () => {
  const mockRpc = vi.fn((name: string) => {
    if (name === 'insert_lead') {
      return Promise.resolve({ data: 1, error: null });
    }
    if (name === 'attach_reports') {
      return Promise.resolve({ error: null });
    }
    return Promise.resolve({ data: null, error: null });
  });
  return {
    supabase: { rpc: mockRpc },
    MEDICAL_REPORTS_BUCKET: 'medical-reports',
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    ALLOWED_FILE_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
    ALLOWED_FILE_EXTENSIONS: 'PDF, JPG, PNG',
  };
});

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
    vi.clearAllMocks();
  });

  it('returns ok=true with leadId when Supabase insert succeeds', async () => {
    const result = await submitLead({ name: 'Jane', phone: '+123' });
    expect(result.ok).toBe(true);
    expect(result.leadId).toBe(1);
  });

  it('returns ok=false when Supabase RPC fails', async () => {
    const { supabase } = await import('./supabase');
    (supabase.rpc as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: null,
      error: { message: 'Insert failed' },
    });
    const result = await submitLead({ name: 'Jane', phone: '+123' });
    expect(result.ok).toBe(false);
    expect(result.message).toContain('Insert failed');
  });
});

describe('validateMedicalFile', () => {
  it('accepts a valid PDF under the size limit', () => {
    const file = new File(['content'], 'report.pdf', { type: 'application/pdf' });
    expect(validateMedicalFile(file)).toBeNull();
  });

  it('rejects an unsupported file type', () => {
    const file = new File(['content'], 'report.txt', { type: 'text/plain' });
    const error = validateMedicalFile(file);
    expect(error).not.toBeNull();
    expect(error).toContain('Unsupported file type');
  });

  it('rejects a file that exceeds the size limit', () => {
    const largeContent = new Uint8Array(11 * 1024 * 1024);
    const file = new File([largeContent], 'big.pdf', { type: 'application/pdf' });
    const error = validateMedicalFile(file);
    expect(error).not.toBeNull();
    expect(error).toContain('too large');
  });
});
