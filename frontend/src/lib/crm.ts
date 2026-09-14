import { z } from 'zod';
import { supabase, MEDICAL_REPORTS_BUCKET, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './supabase';

export const LEAD_SOURCE = {
  COST_ESTIMATOR: 'cost-estimator',
  DOCTOR_PAGE: 'doctor-page',
  TREATMENT_PAGE: 'treatment-page',
  HOSPITAL_PAGE: 'hospital-page',
  SECOND_OPINION: 'second-opinion',
  GENERAL_CONTACT: 'general-contact',
  COUNTRY_PAGE: 'country-page',
  PROCEDURE_COUNTRY_PAGE: 'procedure-country-page',
  EMERGENCY: 'emergency-urgent',
  WEBSITE: 'website',
} as const;

export type LeadSource = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];

/**
 * Lead payload schema.
 */
export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(1, 'Phone is required'),
  country: z.string().optional(),
  treatment: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default(LEAD_SOURCE.WEBSITE),
  doctorSlug: z.string().optional(),
  hospitalSlug: z.string().optional(),
  estimatedTotal: z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.number().optional()
  ),
  hasReports: z.boolean().default(true),
  reportsSharedVia: z.enum(['whatsapp', 'email', 'not_yet']).optional(),
  preferredContactMethod: z.enum(['whatsapp', 'email', 'call']).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

/**
 * Validate a file against the allowed types and size limit.
 */
export function validateMedicalFile(file: File): string | null {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'Unsupported file type. Please upload PDF, JPG, or PNG.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`;
  }
  return null;
}

/**
 * Upload a medical report file to Supabase Storage.
 * Returns the storage path on success, or null on failure.
 */
export async function uploadMedicalReport(
  file: File,
  leadId: string
): Promise<{ path: string; error: string | null }> {
  const ext = file.name.split('.').pop() || 'bin';
  const fileName = `${leadId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(MEDICAL_REPORTS_BUCKET).upload(fileName, file, {
    contentType: file.type,
    cacheControl: '3600',
  });

  if (error) {
    return { path: '', error: error.message };
  }
  return { path: fileName, error: null };
}

/**
 * Submit a lead to the Supabase leads table.
 * Returns the lead ID on success so files can be linked to it.
 */
export async function submitLead(
  payload: z.input<typeof leadSchema>
): Promise<{ ok: boolean; message: string; leadId?: number }> {
  try {
    // Reason: convert camelCase to snake_case for the database columns.
    const dbPayload = {
      name: payload.name,
      email: payload.email || null,
      phone: payload.phone,
      country: payload.country || null,
      treatment: payload.treatment || null,
      message: payload.message || null,
      source: payload.source || LEAD_SOURCE.WEBSITE,
      doctor_slug: payload.doctorSlug || null,
      hospital_slug: payload.hospitalSlug || null,
      estimated_total: payload.estimatedTotal ?? null,
      has_reports: payload.hasReports ?? true,
      reports_shared_via: payload.reportsSharedVia || null,
      preferred_contact_method: payload.preferredContactMethod || null,
    };

    const { data, error } = await supabase.from('leads').insert(dbPayload).select('id').single();

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, message: 'Lead submitted successfully', leadId: data.id };
  } catch {
    return { ok: false, message: 'Network error — please try WhatsApp instead.' };
  }
}

/**
 * Update a lead with the paths of uploaded medical reports.
 */
export async function attachMedicalReports(
  leadId: number,
  filePaths: string[]
): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase
    .from('leads')
    .update({ medical_reports: filePaths })
    .eq('id', leadId);

  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true, message: 'Reports attached' };
}
