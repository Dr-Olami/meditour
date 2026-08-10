import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * Visual register for the step cards grid.
 */
const stepCardsGrid = cva('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', {
  variants: {
    tone: {
      light: '',
      dark: '',
    },
  },
  defaultVariants: {
    tone: 'light',
  },
});

/**
 * Visual register for an individual step card, keyed to the grid tone.
 */
const stepCardTone = cva(
  'relative rounded-card border p-5 pt-8',
  {
    variants: {
      tone: {
        light: 'border-cream-300 bg-cream-100',
        dark: 'border-cream-100/15 bg-cream-100/5',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

/**
 * Visual register for the step number badge, keyed to the grid tone.
 */
const stepNumberTone = cva(
  'absolute -top-px left-5 flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold',
  {
    variants: {
      tone: {
        light: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
        dark: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

/**
 * Visual register for the step title, keyed to the grid tone.
 */
const stepTitleTone = cva('font-display text-base font-semibold', {
  variants: {
    tone: {
      light: 'text-ink',
      dark: 'text-cream-100',
    },
  },
  defaultVariants: {
    tone: 'light',
  },
});

/**
 * Visual register for the step description, keyed to the grid tone.
 */
const stepDescTone = cva('mt-1.5 text-sm leading-relaxed', {
  variants: {
    tone: {
      light: 'text-ink/60',
      dark: 'text-cream-100/60',
    },
  },
  defaultVariants: {
    tone: 'light',
  },
});

export interface StepCardItem {
  /** Step title — e.g. "Consultation", "Surgery", "Discharge". */
  title: string;
  /** Optional description / detail for the step. */
  description?: string;
}

export interface StepCardsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepCardsGrid> {
  /** Steps to render as numbered cards. */
  steps: StepCardItem[];
  /** Surface tone — `light` for cream sections, `dark` for ink bands. */
  tone?: 'light' | 'dark';
}

/**
 * Step cards molecule — renders a numbered grid of procedure steps.
 *
 * Replaces the plain bullet list of procedures with numbered cards that
 * communicate sequence and progression. The gradient number badge provides
 * the only color accent, maintaining the monochrome editorial discipline.
 */
const StepCards = React.forwardRef<HTMLDivElement, StepCardsProps>(
  ({ className, steps, tone, ...props }, ref) => {
    if (!steps || steps.length === 0) return null;
    return (
      <div
        className={cn(stepCardsGrid({ tone }), className)}
        ref={ref}
        {...props}
      >
        {steps.map((step, index) => (
          <div
            key={`${step.title}-${index}`}
            className={cn(stepCardTone({ tone }))}
          >
            <span className={cn(stepNumberTone({ tone }))}>{index + 1}</span>
            <h3 className={cn(stepTitleTone({ tone }))}>{step.title}</h3>
            {step.description && (
              <p className={cn(stepDescTone({ tone }))}>{step.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }
);
StepCards.displayName = 'StepCards';

export { StepCards, stepCardsGrid };
