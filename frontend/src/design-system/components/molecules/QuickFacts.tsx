import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Icon, type IconProps } from '../atoms/Icon';

/**
 * Visual register for the quick-facts container, keyed to its surface.
 *
 * `light` — cream page sections; ink text on cream chips.
 * `dark`  — ink hero bands; cream text on translucent chips.
 */
const quickFactsTone = cva('flex flex-wrap gap-3', {
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
 * Visual register for an individual fact chip, keyed to the container tone.
 */
const factChipTone = cva(
  'inline-flex items-center gap-2.5 rounded-card px-4 py-2.5',
  {
    variants: {
      tone: {
        light: 'border border-cream-300 bg-cream-100',
        dark: 'border border-cream-100/15 bg-cream-100/5',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

/**
 * Visual register for the icon inside a fact chip, keyed to the container tone.
 */
const factIconTone = cva('shrink-0', {
  variants: {
    tone: {
      light: 'text-violet-600',
      dark: 'text-violet-400',
    },
  },
  defaultVariants: {
    tone: 'light',
  },
});

/**
 * Visual register for the fact label, keyed to the container tone.
 */
const factLabelTone = cva('text-xs font-medium', {
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

/**
 * Visual register for the fact value, keyed to the container tone.
 */
const factValueTone = cva('text-sm font-semibold', {
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

export interface QuickFactItem {
  /** Icon name from the Icon atom's `ICON_PATHS` registry. */
  icon: IconProps['name'];
  /** Short label — e.g. "Duration", "Hospital stay", "Recovery", "From". */
  label: string;
  /** The fact value — e.g. "2-3 hours", "3 days", "6 weeks", "$1,500". */
  value: string;
}

export interface QuickFactsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof quickFactsTone> {
  /** Facts to render as icon chips. */
  facts: QuickFactItem[];
  /** Surface tone — `light` for cream sections, `dark` for ink bands. */
  tone?: 'light' | 'dark';
}

/**
 * Quick facts molecule — renders treatment key facts (duration, hospital
 * stay, recovery time, price) as scannable icon chips.
 *
 * Pulls trust signals out of the sidebar `dl` and into the hero, where they
 * act as decision accelerators. Supports dark and light surfaces.
 */
const QuickFacts = React.forwardRef<HTMLDivElement, QuickFactsProps>(
  ({ className, facts, tone, ...props }, ref) => {
    if (!facts || facts.length === 0) return null;
    return (
      <div
        className={cn(quickFactsTone({ tone }), className)}
        ref={ref}
        {...props}
      >
        {facts.map((fact, index) => (
          <div
            key={`${fact.label}-${index}`}
            className={cn(factChipTone({ tone }))}
          >
            <Icon name={fact.icon} size={18} className={cn(factIconTone({ tone }))} />
            <div className="flex flex-col">
              <span className={cn(factLabelTone({ tone }))}>{fact.label}</span>
              <span className={cn(factValueTone({ tone }))}>{fact.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
);
QuickFacts.displayName = 'QuickFacts';

export { QuickFacts, quickFactsTone };
