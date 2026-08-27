import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * Visual register for the step cards grid.
 *
 * Mobile: horizontal scroll-snap carousel with a peeking next card.
 * sm and up: static grid (original behavior).
 */
const stepCardsGrid = cva(
  'flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch] sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-x-visible lg:grid-cols-3',
  {
    variants: {
      tone: {
        light: '',
        dark: '',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

/**
 * Visual register for an individual step card, keyed to the grid tone.
 *
 * Mobile: fixed-width snap slide so the next card peeks into view.
 * sm and up: width resets to auto for the grid.
 */
const stepCardTone = cva(
  'relative w-[75vw] flex-shrink-0 snap-start rounded-card border p-5 pt-8 sm:w-auto',
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
        light: 'bg-gradient-accent text-white',
        dark: 'bg-gradient-accent text-white',
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

/** Horizontal gap between slides (gap-4) — used in scroll offset math. */
const GAP_PX = 16;

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
 *
 * On mobile the grid becomes a swipeable scroll-snap carousel (next card
 * peeks in from the right) with dot navigation; from `sm` up it stays a
 * static grid.
 */
const StepCards = React.forwardRef<HTMLDivElement, StepCardsProps>(
  ({ className, steps, tone, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const total = steps?.length ?? 0;

    // Track the snapped card so the mobile dots stay in sync with swipes.
    React.useEffect(() => {
      const el = scrollRef.current;
      if (!el || total <= 1) return;
      const onScroll = () => {
        const card = el.firstElementChild as HTMLElement | null;
        const cardWidth = card ? card.clientWidth + GAP_PX : el.clientWidth;
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(Math.min(idx, total - 1));
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      return () => el.removeEventListener('scroll', onScroll);
    }, [total]);

    const scrollTo = React.useCallback(
      (index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const clamped = Math.max(0, Math.min(index, total - 1));
        const card = el.firstElementChild as HTMLElement | null;
        const cardWidth = card ? card.clientWidth + GAP_PX : el.clientWidth;
        el.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' });
        setActiveIndex(clamped);
      },
      [total]
    );

    if (total === 0) return null;
    return (
      <div className={cn('min-w-0', className)} ref={ref} {...props}>
        <div
          ref={scrollRef}
          className={cn(stepCardsGrid({ tone }))}
          role="region"
          aria-roledescription="carousel"
          aria-label="Steps"
        >
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className={cn(stepCardTone({ tone }))}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
            >
              <span className={cn(stepNumberTone({ tone }))}>{index + 1}</span>
              <h3 className={cn(stepTitleTone({ tone }))}>{step.title}</h3>
              {step.description && (
                <p className={cn(stepDescTone({ tone }))}>{step.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Dot navigation — mobile carousel only; grid has no paging on sm+. */}
        {total > 1 && (
          <div
            className="mt-4 flex items-center justify-center gap-2 sm:hidden"
            role="tablist"
            aria-label="Step pages"
          >
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to step ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-fast ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
                  i === activeIndex
                    ? 'w-6 bg-gradient-accent'
                    : 'w-2.5 bg-cream-300 hover:bg-cream-400'
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
StepCards.displayName = 'StepCards';

export { StepCards, stepCardsGrid };
