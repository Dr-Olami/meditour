import { z } from 'zod';

export const LEAD_SOURCE = {
  COST_ESTIMATOR: 'cost-estimator',
  DOCTOR_PAGE: 'doctor-page',
  TREATMENT_PAGE: 'treatment-page',
  GENERAL_CONTACT: 'general-contact',
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
 * Reason: output is 'static' — no server endpoint. POST goes directly to the
 * external CRM URL exposed as a public env var. CRM_API_KEY is NOT included
 * here (it would be visible in the client bundle). The external CRM must
 * accept unauthenticated POST from trusted origins or use a public-safe token.
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; message: string }> {
  const crmUrl = import.meta.env.PUBLIC_CRM_SUBMIT_URL;

  if (!crmUrl) {
    return { ok: false, message: 'Contact form not configured. Please reach us via WhatsApp.' };
  }

  try {
    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({ message: 'Unexpected error' }));
    return { ok: response.ok, message: data.message || 'Unknown response' };
  } catch {
    return { ok: false, message: 'Network error — please try WhatsApp instead.' };
  }
}
