import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * Visual register for the stat band container, keyed to its surface.
 *
 * `light` — cream page sections; ink numerals on a cream card.
 * `dark`  — ink hero bands; cream numerals on an ink band.
 */
const statBandTone = cva('grid gap-8 sm:grid-cols-3', {
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
 * Visual register for an individual stat cell, keyed to the band tone.
 */
const statCellTone = cva('flex flex-col', {
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
 * Visual register for the stat label, keyed to the band tone.
 */
const statLabelTone = cva('text-xs font-semibold uppercase tracking-wider', {
  variants: {
    tone: {
      light: 'text-ink/50',
      dark: 'text-cream-100/50',
    },
  },
  defaultVariants: {
    tone: 'light',
  },
});

export interface StatItem {
  /** The big numeral — e.g. "25", "500", "3". */
  value: string | number;
  /** Short label — e.g. "Years experience", "Beds", "Languages". */
  label: string;
  /** Optional accent suffix rendered in the gradient color — e.g. "+". */
  suffix?: string;
}

export interface StatBandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statBandTone> {
  /** Stats to render in the band. */
  stats: StatItem[];
  /** Surface tone — `light` for cream sections, `dark` for ink bands. */
  tone?: 'light' | 'dark';
}

/**
 * Stat band molecule — a horizontal row of big counted numerals with labels.
 *
 * Renders trust signals (years, beds, languages, established year) as objects
 * with visual weight, not `dl` table rows. Supports dark and light surfaces
 * for use on ink hero bands and cream page sections alike.
 */
const StatBand = React.forwardRef<HTMLDivElement, StatBandProps>(
  ({ className, stats, tone, ...props }, ref) => {
    if (!stats || stats.length === 0) return null;
    return (
      <div
        className={cn(statBandTone({ tone }), className)}
        ref={ref}
        {...props}
      >
        {stats.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className={cn(statCellTone({ tone }))}
          >
            <dt className={cn(statLabelTone({ tone }))}>{stat.label}</dt>
            <dd className="mt-1 font-display text-3xl font-bold md:text-4xl">
              {stat.value}
              {stat.suffix && (
                <span className="text-violet-500">{stat.suffix}</span>
              )}
            </dd>
          </div>
        ))}
      </div>
    );
  }
);
StatBand.displayName = 'StatBand';

export { StatBand, statBandTone };
