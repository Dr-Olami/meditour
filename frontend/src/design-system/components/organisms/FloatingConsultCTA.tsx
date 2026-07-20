import * as React from 'react';
import { cn } from '../../../lib/utils';
import { getContextualWhatsAppLink, type WhatsAppContext } from '../../../lib/whatsapp';

export interface FloatingConsultCTAAction {
  label: string;
  /** Static href. Ignored if `context` is provided. */
  href?: string;
  /** Page context used to build a contextual WhatsApp link instead of a static href. */
  context?: WhatsAppContext;
}

export interface FloatingConsultCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subtext?: string;
  primaryCta: FloatingConsultCTAAction;
  secondaryCta?: FloatingConsultCTAAction;
}

function resolveCtaHref(cta: FloatingConsultCTAAction): string {
  if (cta.context) return getContextualWhatsAppLink(cta.context);
  return cta.href ?? '#';
}

/**
 * Sticky bottom strip / full-width CTA panel that floats above the fold
 * and invites the user to book a consultation. Used at the bottom of key
 * sections as a conversion nudge.
 */
const FloatingConsultCTA = React.forwardRef<HTMLDivElement, FloatingConsultCTAProps>(
  ({ className, headline, subtext, primaryCta, secondaryCta, ...props }, ref) => {
    const primaryHref = resolveCtaHref(primaryCta);
    const secondaryHref = secondaryCta ? resolveCtaHref(secondaryCta) : undefined;
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white md:p-12',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Decorative blurred circle */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {headline}
            </h2>
            {subtext && (
              <p className="mt-2 text-white/70">{subtext}</p>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={primaryHref}
              className="inline-flex items-center rounded-card bg-ink px-6 py-3 text-sm font-semibold text-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              data-anim="magnetic press-button"
            >
              {primaryCta.label}
            </a>
            {secondaryCta && (
              <a
                href={secondaryHref}
                className="inline-flex items-center rounded-card border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                data-anim="magnetic press-button"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);
FloatingConsultCTA.displayName = 'FloatingConsultCTA';

export { FloatingConsultCTA };
