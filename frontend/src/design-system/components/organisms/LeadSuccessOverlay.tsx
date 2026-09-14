import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';

export interface LeadSuccessOverlayProps {
  /** Whether the overlay is visible. */
  open: boolean;
  /** Called when the user dismisses the overlay. */
  onClose: () => void;
  /** Pre-built WhatsApp href for sending reports. */
  whatsappHref: string;
  /** Email address for sending reports. */
  contactEmail: string;
  /** Submitted name (for email subject). */
  submittedName: string;
}

/**
 * Centered success confirmation shown after a lead is submitted.
 *
 * Reason: the form modal closes immediately on success, and this overlay
 * takes its place so the visitor sees a clean, centered confirmation
 * with clear next steps. The user dismisses it explicitly — no auto-close.
 */
function LeadSuccessOverlay({
  open,
  onClose,
  whatsappHref,
  contactEmail,
  submittedName,
}: LeadSuccessOverlayProps) {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  // Reason: lock body scroll and focus the overlay for accessibility.
  React.useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    overlayRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Reason: close on Escape key.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Inquiry submitted"
    >
      {/* Backdrop — click to close */}
      <div
        className="bg-ink/60 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Success card — centered on all screens */}
      <div
        ref={overlayRef}
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full max-w-md rounded-2xl bg-cream-100 p-6 text-center shadow-2xl outline-none md:p-8'
        )}
      >
        {/* Success checkmark */}
        <div className="bg-success/15 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              className="text-success"
            />
            <path
              d="M8 12l2.5 2.5L16 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success"
            />
          </svg>
        </div>

        <h2 className="font-display text-xl font-bold text-ink">Request received!</h2>
        <p className="text-ink/70 mt-2 text-sm">
          We'll review your case and connect you with a specialist within 24–48 hours.
        </p>

        {/* Next steps — send medical reports */}
        <div className="mt-6 border-t border-cream-300 pt-5">
          <p className="text-sm font-semibold text-ink">
            Send your medical reports for a faster response
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-card bg-success px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.6 2.32A7.85 7.85 0 0 0 8.02 0C3.67 0 .13 3.54.13 7.89c0 1.4.37 2.76 1.06 3.96L.07 16l4.28-1.12a7.86 7.86 0 0 0 3.77.96h.003c4.35 0 7.89-3.54 7.89-7.89 0-2.11-.82-4.09-2.31-5.58zM8.02 14.5a6.5 6.5 0 0 1-3.31-.9l-.24-.14-2.74.72.73-2.67-.16-.25a6.48 6.48 0 0 1-.99-3.46c0-3.6 2.93-6.53 6.54-6.53 1.75 0 3.39.68 4.63 1.92a6.5 6.5 0 0 1 1.91 4.62c0 3.6-2.93 6.53-6.53 6.53z" />
              </svg>
              Send on WhatsApp
            </a>
            <a
              href={`mailto:${contactEmail}?subject=Medical%20reports%20for%20${encodeURIComponent(
                submittedName || 'inquiry'
              )}`}
              className="inline-flex items-center justify-center gap-2 rounded-card border border-cream-300 bg-cream-100 px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect
                  x="2"
                  y="3"
                  width="12"
                  height="10"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Email reports
            </a>
          </div>
        </div>

        {/* Done button — user dismisses explicitly */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-card bg-ink px-5 py-2.5 text-sm font-semibold text-cream-100 transition-opacity hover:opacity-90"
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  );
}

export { LeadSuccessOverlay };
