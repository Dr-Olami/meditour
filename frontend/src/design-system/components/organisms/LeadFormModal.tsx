import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';
import { LeadForm } from './LeadForm';
import type { LeadSource } from '../../../lib/crm';

export interface LeadFormModalProps {
  /** Whether the modal is currently open. */
  open: boolean;
  /** Called when the modal requests to close (backdrop click, ESC, close button). */
  onClose: () => void;
  /** Modal title shown in the header. */
  title: string;
  /** Optional subtitle shown below the title. */
  subtitle?: string;
  /** Close button aria-label. */
  closeLabel?: string;
  /** LeadForm context props — passed through to the embedded form. */
  source?: LeadSource;
  defaultDoctor?: string;
  defaultTreatment?: string;
  defaultMessage?: string;
  doctorSlug?: string;
  hospitalSlug?: string;
  estimatedTotal?: number;
  treatments?: { value: string; label: string }[];
}

/**
 * Modal dialog wrapping the LeadForm. Renders into a portal at document.body
 * so it overlays the full page regardless of where it's mounted in the tree.
 *
 * Responsive: full-screen sheet on mobile, centered card on desktop.
 * Accessible: focus trap, ESC to close, body scroll lock, aria-modal.
 */
function LeadFormModal({
  open,
  onClose,
  title,
  subtitle,
  closeLabel = 'Close',
  source,
  defaultDoctor,
  defaultTreatment,
  defaultMessage,
  doctorSlug,
  hospitalSlug,
  estimatedTotal,
  treatments,
}: LeadFormModalProps) {
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  // Reason: lock body scroll while the modal is open so the background
  // doesn't scroll behind the overlay on mobile.
  React.useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Reason: trap focus inside the dialog and restore focus on close.
  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    dialog?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialog) {
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel — bottom sheet on mobile, centered card on desktop */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          'relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden bg-cream-100 shadow-2xl outline-none',
          // Mobile: full-width bottom sheet with rounded top
          'rounded-t-2xl',
          // Desktop: centered card with rounded corners
          'md:max-w-lg md:rounded-2xl',
        )}
      >
        {/* Header — sticky so it stays visible while scrolling the form */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-cream-300 bg-cream-100 px-5 py-4 md:px-6">
          <div>
            <h2 className="font-display text-lg font-bold text-ink md:text-xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-ink/60">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable form area */}
        <div className="overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          <LeadForm
            source={source}
            defaultDoctor={defaultDoctor}
            defaultTreatment={defaultTreatment}
            defaultMessage={defaultMessage}
            doctorSlug={doctorSlug}
            hospitalSlug={hospitalSlug}
            estimatedTotal={estimatedTotal}
            treatments={treatments}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export { LeadFormModal };
