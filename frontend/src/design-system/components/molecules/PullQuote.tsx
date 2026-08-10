import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * Visual register for the pull quote, keyed to its surrounding surface.
 *
 * `light` — cream page sections; large ink quote with a violet accent rule.
 * `dark`  — ink hero bands; cream quote with a violet accent rule.
 */
const pullQuoteTone = cva(
  'relative border-l-4 py-2 pl-6 pr-2 font-display text-xl font-semibold leading-snug md:text-2xl',
  {
    variants: {
      tone: {
        light: 'border-violet-600 text-ink',
        dark: 'border-violet-500 text-cream-100',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

export interface PullQuoteProps
  extends React.HTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof pullQuoteTone> {
  /** The quote body — typically a patient-care philosophy sentence. */
  quote: string;
  /** Optional attribution rendered beneath the quote. */
  attribution?: string;
  /** Surface tone — `light` for cream sections, `dark` for ink bands. */
  tone?: 'light' | 'dark';
}

/**
 * Pull quote molecule — breaks prose walls with a single emotional beat.
 *
 * Lifts a patient-care philosophy sentence out of a long bio and renders it
 * as a large, accent-ruled blockquote between the hero and the prose body.
 */
const PullQuote = React.forwardRef<HTMLQuoteElement, PullQuoteProps>(
  ({ className, quote, attribution, tone, ...props }, ref) => {
    if (!quote) return null;
    return (
      <blockquote
        className={cn(pullQuoteTone({ tone }), className)}
        ref={ref}
        {...props}
      >
        <span aria-hidden="true" className="select-none text-violet-500">
          &ldquo;
        </span>
        {quote}
        <span aria-hidden="true" className="select-none text-violet-500">
          &rdquo;
        </span>
        {attribution && (
          <footer
            className={cn(
              'mt-3 text-sm font-medium not-italic',
              tone === 'dark' ? 'text-cream-100/50' : 'text-ink/50'
            )}
          >
            {attribution}
          </footer>
        )}
      </blockquote>
    );
  }
);
PullQuote.displayName = 'PullQuote';

export { PullQuote, pullQuoteTone };
