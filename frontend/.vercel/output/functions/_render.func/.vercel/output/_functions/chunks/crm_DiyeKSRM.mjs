import { z } from 'zod';

const LEAD_SOURCE = {
  DOCTOR_PAGE: "doctor-page",
  TREATMENT_PAGE: "treatment-page",
  GENERAL_CONTACT: "general-contact",
  WEBSITE: "website"
};
const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().optional(),
  treatment: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default(LEAD_SOURCE.WEBSITE),
  doctorSlug: z.string().optional(),
  hospitalSlug: z.string().optional(),
  estimatedTotal: z.preprocess(
    (val) => val === "" || val === null ? void 0 : val,
    z.number().optional()
  ),
  hasReports: z.boolean().default(true),
  reportsSharedVia: z.enum(["whatsapp", "email", "not_yet"]).optional(),
  preferredContactMethod: z.enum(["whatsapp", "email", "call"]).optional()
});
async function submitLead(payload) {
  {
    return { ok: false, message: "Contact form not configured. Please reach us via WhatsApp." };
  }
}

export { LEAD_SOURCE as L, leadSchema as l, submitLead as s };
