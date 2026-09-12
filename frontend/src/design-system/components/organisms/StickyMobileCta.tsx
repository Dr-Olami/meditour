import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface StickyMobileCtaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the primary CTA button (e.g. "Free consultation"). */
  primaryLabel: string;
  /** href for the primary CTA — usually an anchor to the lead form (#contact). */
  primaryHref: string;
  /** Label for the WhatsApp button. */
  whatsappLabel: string;
  /** WhatsApp deep link href. */
  whatsappHref: string;
  /** Optional: distance (px) from top of page before the bar appears. Default: 600. */
  appearAfter?: number;
}

/**
 * Sticky bottom CTA bar for mobile devices only.
 *
 * Reason: hospital pages have 12+ sections and on mobile the desktop sticky
 * sidebar (lg:sticky) collapses to inline, leaving users with no persistent
 * call-to-action. This fixed bottom bar keeps WhatsApp + consultation CTAs
 * always visible after the user scrolls past the hero, without obstructing
 * the initial above-the-fold content.
 *
 * Hidden on desktop (lg:hidden) — desktop users have the sticky sidebar.
 * The bar appears after scrolling `appearAfter` pixels (default 600px) so it
 * doesn't cover the hero CTAs on initial load.
 */
const StickyMobileCta = React.forwardRef<HTMLDivElement, StickyMobileCtaProps>(
  (
    { className, primaryLabel, primaryHref, whatsappLabel, whatsappHref, appearAfter = 600 },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      // Reason: only show after the user scrolls past the hero so the bar
      // doesn't compete with the hero's own CTAs on initial load.
      const onScroll = () => {
        setVisible(window.scrollY > appearAfter);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, [appearAfter]);

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-x-0 bottom-0 z-fixed lg:hidden',
          'transition-transform duration-300 ease-out-expo',
          visible ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        <div className="bg-cream-100/95 border-t border-cream-300 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-md items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink/15 flex flex-1 items-center justify-center gap-2 rounded-card border bg-cream-200 px-4 py-3 text-sm font-semibold text-ink transition-colors active:bg-cream-300"
            >
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="truncate">{whatsappLabel}</span>
            </a>
            <a
              href={primaryHref}
              className="active:bg-ink/90 flex flex-1 items-center justify-center gap-2 rounded-card bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors"
            >
              {primaryLabel}
            </a>
          </div>
        </div>
      </div>
    );
  }
);

StickyMobileCta.displayName = 'StickyMobileCta';

export { StickyMobileCta };
