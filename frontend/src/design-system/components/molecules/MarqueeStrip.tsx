import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * Visual register for the marquee strip track.
 *
 * The track is a horizontal flex container with scroll-snap, hidden scrollbars,
 * and drag-to-scroll on desktop. Children are expected to be images or badge
 * cards passed via the `items` render prop or as children.
 */
const marqueeTrack = cva(
  'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2',
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

export interface MarqueeStripProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeTrack> {
  /** Items to render in the strip. Each is wrapped in a snap-start cell. */
  items?: React.ReactNode[];
  /** Surface tone — `light` for cream sections, `dark` for ink bands. */
  tone?: 'light' | 'dark';
}

/**
 * Marquee strip molecule — a horizontal scroll-snap container for galleries
 * and accreditation badge rows.
 *
 * Replaces the sidebar 2-column gallery grid with a full-width horizontal
 * scroll that reveals more images as the user scrolls/draggs. Uses pure CSS
 * scroll-snap (no JS runtime needed); scrollbars are hidden for a clean look.
 */
const MarqueeStrip = React.forwardRef<HTMLDivElement, MarqueeStripProps>(
  ({ className, items, tone, children, ...props }, ref) => {
    const hasItems = items && items.length > 0;
    if (!hasItems && !children) return null;
    return (
      <div
        className={cn('[scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
        ref={ref}
        {...props}
      >
        <div className={cn(marqueeTrack({ tone }))}>
          {hasItems
            ? items.map((item, index) => (
                <div
                  key={index}
                  className="shrink-0 snap-start"
                >
                  {item}
                </div>
              ))
            : children}
        </div>
      </div>
    );
  }
);
MarqueeStrip.displayName = 'MarqueeStrip';

export { MarqueeStrip, marqueeTrack };
