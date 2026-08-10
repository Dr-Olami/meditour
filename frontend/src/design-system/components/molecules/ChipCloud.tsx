import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * Visual register for the chip cloud container.
 *
 * `light` — cream surfaces (default), used on cream page sections.
 * `dark`  — ink surfaces, used on dark hero bands.
 */
const chipCloudTone = cva('flex flex-wrap gap-2', {
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
 * Visual register for an individual chip, keyed to the cloud tone so chips
 * read correctly on either cream or ink backgrounds.
 */
const chipTone = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      tone: {
        light: 'border-cream-300 bg-cream-100 text-ink/70',
        dark: 'border-cream-100/15 bg-cream-100/5 text-cream-100/70',
      },
    },
    defaultVariants: {
      tone: 'light',
    },
  }
);

export interface ChipCloudProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof chipCloudTone> {
  /** Chip labels to render. */
  items: string[];
  /** Optional accessible heading rendered as a small uppercase label above the cloud. */
  label?: string;
  /** Surface tone — `light` for cream sections, `dark` for ink hero bands. */
  tone?: 'light' | 'dark';
}

/**
 * Chip cloud molecule — renders a list of credentials / tags as scannable
 * pill objects instead of comma-separated prose or table rows.
 *
 * Used for doctor expertise, qualifications, languages and hospital
 * specialities / amenities.
 */
const ChipCloud = React.forwardRef<HTMLDivElement, ChipCloudProps>(
  ({ className, items, label, tone, ...props }, ref) => {
    if (!items || items.length === 0) return null;
    return (
      <div
        className={cn(chipCloudTone({ tone }), className)}
        ref={ref}
        {...props}
      >
        {label && (
          <span
            className={cn(
              'w-full text-xs font-semibold uppercase tracking-wider',
              tone === 'dark' ? 'text-cream-100/50' : 'text-ink/50'
            )}
          >
            {label}
          </span>
        )}
        {items.map((chip) => (
          <span key={chip} className={cn(chipTone({ tone }))}>
            {chip}
          </span>
        ))}
      </div>
    );
  }
);
ChipCloud.displayName = 'ChipCloud';

export { ChipCloud, chipCloudTone, chipTone };
