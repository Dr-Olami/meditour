import * as React from 'react';
import { LeadFormModal } from './LeadFormModal';
import type { LeadSource } from '../../../lib/crm';

export interface LeadModalTriggerProps {
  /** The visible CTA label text. */
  label: string;
  /** Modal title. */
  modalTitle: string;
  /** Modal subtitle. */
  modalSubtitle?: string;
  /** Close button aria-label. */
  closeLabel?: string;
  /** Visual variant — matches the existing CTA styles. */
  variant?: 'gradient' | 'dark' | 'light';
  /** Full-width button (for mobile stacked layouts). */
  full?: boolean;
  /** Extra classes for the trigger button. */
  className?: string;
  /** LeadForm context. */
  source?: LeadSource;
  defaultDoctor?: string;
  defaultTreatment?: string;
  defaultMessage?: string;
  doctorSlug?: string;
  hospitalSlug?: string;
  estimatedTotal?: number;
  treatments?: { value: string; label: string }[];
}

const VARIANT_CLASSES: Record<string, string> = {
  // Reason: cta-gradient is the shared animated gradient class defined in
  // global.css — used across all primary CTAs on the site.
  gradient: 'cta-gradient',
  dark: 'bg-ink text-cream-100 hover:opacity-90 hover:text-cream-100',
  light: 'bg-cream-100 text-ink hover:opacity-90',
};

/**
 * A CTA button that opens a LeadForm modal overlay. Drop-in replacement for
 * `<a href="/#contact">` CTAs on detail pages — keeps the visitor on the
 * current page and pre-fills the form with context (doctor, treatment, etc).
 *
 * Renders as a React island so the modal and trigger share state without
 * needing a global event bus.
 */
function LeadModalTrigger({
  label,
  modalTitle,
  modalSubtitle,
  closeLabel,
  variant = 'gradient',
  full = false,
  className,
  source,
  defaultDoctor,
  defaultTreatment,
  defaultMessage,
  doctorSlug,
  hospitalSlug,
  estimatedTotal,
  treatments,
}: LeadModalTriggerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          'inline-flex h-12 items-center justify-center rounded-card px-6 text-sm font-semibold shadow-md transition-opacity md:text-base',
          VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.gradient,
          full ? 'w-full' : '',
          className ?? '',
        ].join(' ')}
      >
        {label}
      </button>
      <LeadFormModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        closeLabel={closeLabel}
        source={source}
        defaultDoctor={defaultDoctor}
        defaultTreatment={defaultTreatment}
        defaultMessage={defaultMessage}
        doctorSlug={doctorSlug}
        hospitalSlug={hospitalSlug}
        estimatedTotal={estimatedTotal}
        treatments={treatments}
      />
    </>
  );
}

export { LeadModalTrigger };
