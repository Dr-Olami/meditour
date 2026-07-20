import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface EquipmentItem {
  src: string;
  alt: string;
  label?: string;
}

export interface EquipmentCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: EquipmentItem[];
  title?: string;
}

/**
 * Horizontal scroll carousel for hospital equipment / technology images.
 * Snaps to items on mobile, shows ~3 at a time on desktop.
 * No JS dependency — uses CSS scroll-snap.
 */
const EquipmentCarousel = React.forwardRef<HTMLDivElement, EquipmentCarouselProps>(
  ({ className, items, title, ...props }, ref) => {
    return (
      <div className={cn('', className)} ref={ref} {...props}>
        {title && (
          <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
        )}
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none">
          {items.map((item, i) => (
            <div
              key={i}
              className="w-[min(80vw,320px)] shrink-0 snap-start overflow-hidden rounded-card bg-cream-200"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              {item.label && (
                <p className="px-4 py-3 text-sm font-medium text-ink/70">{item.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
EquipmentCarousel.displayName = 'EquipmentCarousel';

export { EquipmentCarousel };
