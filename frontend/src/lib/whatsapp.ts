/**
 * Build WhatsApp wa.me deep links.
 *
 * @param number - Phone number in international format without + or spaces.
 * @param message - Optional pre-filled message.
 * @returns Full wa.me URL.
 */
export function buildWhatsAppLink(number: string, message?: string): string {
  const cleaned = number.replace(/\D/g, '');
  const base = `https://wa.me/${cleaned}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Get the configured public WhatsApp number.
 *
 * @returns The number or a fallback empty string.
 */
export function getWhatsAppNumber(): string {
  return import.meta.env.PUBLIC_WHATSAPP_NUMBER || '';
}

/**
 * Get a pre-filled WhatsApp inquiry link for Khan Meditour.
 *
 * @returns WhatsApp deep link or empty string if no number configured.
 */
export function getInquiryLink(): string {
  const number = getWhatsAppNumber();
  if (!number) return '';
  return buildWhatsAppLink(number, 'Hi Khan Meditour, I would like to know more about your medical tourism services.');
}

/**
 * Build a WhatsApp inquiry link mentioning a specific doctor.
 *
 * @param doctorName - Full name of the doctor.
 * @returns WhatsApp deep link or empty string if no number configured.
 */
export function getDoctorInquiryLink(doctorName: string): string {
  const number = getWhatsAppNumber();
  if (!number) return '';
  return buildWhatsAppLink(
    number,
    `Hi Khan Meditour, I would like to book an appointment with ${doctorName}.`
  );
}

/**
 * Build a WhatsApp inquiry link mentioning a specific treatment.
 *
 * @param treatmentName - Name of the treatment.
 * @returns WhatsApp deep link or empty string if no number configured.
 */
export function getTreatmentInquiryLink(treatmentName: string): string {
  const number = getWhatsAppNumber();
  if (!number) return '';
  return buildWhatsAppLink(
    number,
    `Hi Khan Meditour, I am interested in ${treatmentName} and would like to know more.`
  );
}

/**
 * Build a WhatsApp inquiry link after receiving a cost estimate.
 *
 * @param treatmentName - Name of the treatment.
 * @param estimatedTotal - Estimated total cost.
 * @returns WhatsApp deep link or empty string if no number configured.
 */
export function getEstimateInquiryLink(treatmentName: string, estimatedTotal: number): string {
  const number = getWhatsAppNumber();
  if (!number) return '';
  return buildWhatsAppLink(
    number,
    `Hi Khan Meditour, I checked the estimate for ${treatmentName} (estimated total $${estimatedTotal.toLocaleString()}) and would like a detailed quote.`
  );
}

/**
 * Discriminated union describing which contextual WhatsApp message to build.
 * Used by shared CTA components (`WhatsAppCTA`, `FloatingConsultCTA`) so callers
 * can request a contextual message without knowing which builder to call.
 */
export type WhatsAppContext =
  | { type: 'general' }
  | { type: 'doctor'; doctorName: string }
  | { type: 'treatment'; treatmentName: string }
  | { type: 'estimate'; treatmentName: string; estimatedTotal: number };

/**
 * Build a WhatsApp deep link for a given page context, dispatching to the
 * matching parameterized message builder.
 *
 * @param context - The page context describing what the user is viewing.
 * @returns WhatsApp deep link or empty string if no number configured.
 */
export function getContextualWhatsAppLink(context: WhatsAppContext): string {
  switch (context.type) {
    case 'doctor':
      return getDoctorInquiryLink(context.doctorName);
    case 'treatment':
      return getTreatmentInquiryLink(context.treatmentName);
    case 'estimate':
      return getEstimateInquiryLink(context.treatmentName, context.estimatedTotal);
    default:
      return getInquiryLink();
  }
}
