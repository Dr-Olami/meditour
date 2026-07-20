import * as React from 'react';
import { cn } from '../../../lib/utils';
import { useAnimations } from '../../motion/use-animations';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: React.ReactNode;
  eyebrow?: string;
  media?: React.ReactNode;
}

/**
 * Full-viewport hero section with display headline, eyebrow, CTAs, and
 * optional media slot. Uses a solid ink primary CTA button.
 * Adds top padding so it clears the floating Navbar.
 */
const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    { className, headline, subheadline, primaryCta, secondaryCta, eyebrow, media, ...props },
    ref
  ) => {
    const innerRef = React.useRef<HTMLElement>(null);
    const combinedRef = (node: HTMLElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    useAnimations(innerRef as React.RefObject<HTMLElement>);

    return (
      <section
        className={cn(
          'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream-100 px-6 pt-28 pb-24 text-center',
          className
        )}
        ref={combinedRef}
        {...props}
      >
        {/* Background gradient blob */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/3 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-200/30 to-indigo-200/20 blur-3xl" />
        </div>

        {eyebrow && (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40" data-anim="fade-in-up">
            {eyebrow}
          </p>
        )}

        <h1
          className="font-display text-5xl font-bold leading-[1.05] tracking-display text-ink md:text-7xl lg:text-8xl"
          data-anim="headline-reveal"
        >
          {headline}
        </h1>

        {subheadline && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/60 md:text-xl" data-anim="fade-in-up">
            {subheadline}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-anim="fade-in-up">
          {primaryCta && (
            <a
              href={primaryCta.href}
              className="inline-flex min-w-[16rem] items-center justify-center gap-2 rounded-card bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              data-anim="press-button"
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta}
        </div>

        {media && (
          <div className="mt-16 w-full max-w-4xl" data-anim="hero-parallax">
            {media}
          </div>
        )}
      </section>
    );
  }
);
HeroSection.displayName = 'HeroSection';

export { HeroSection };
