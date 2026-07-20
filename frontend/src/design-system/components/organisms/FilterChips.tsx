import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface FilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}

const SCROLL_STEP = 160;

/**
 * Horizontal pill chip group for filtering lists (e.g. doctor specialties).
 * Controlled: parent owns `active` state.
 * On mobile a left/right scroll arrow pair appears when content overflows.
 */
const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  ({ className, options, active, onSelect, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const updateArrows = React.useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    React.useEffect(() => {
      updateArrows();
      const el = scrollRef.current;
      if (!el) return;
      const ro = new ResizeObserver(updateArrows);
      ro.observe(el);
      el.addEventListener('scroll', updateArrows, { passive: true });
      return () => {
        ro.disconnect();
        el.removeEventListener('scroll', updateArrows);
      };
    }, [options, updateArrows]);

    const scroll = (dir: 'left' | 'right') => {
      scrollRef.current?.scrollBy({
        left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
        behavior: 'smooth',
      });
    };

    return (
      <div
        className={cn('relative flex items-center gap-1', className)}
        ref={ref}
        {...props}
      >
        {/* Left arrow — only rendered when there is content to scroll back to */}
        <button
          type="button"
          aria-label="Scroll filters left"
          onClick={() => scroll('left')}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream-300 bg-cream-100 text-ink shadow-sm transition-opacity duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:hidden',
            canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          tabIndex={canScrollLeft ? 0 : -1}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scrollable chip row */}
        <div
          ref={scrollRef}
          role="group"
          aria-label="Filter options"
          className="flex snap-x gap-2 overflow-x-auto scrollbar-none md:flex-wrap"
        >
          {options.map((option) => {
            const isActive = option === active;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                aria-pressed={isActive}
                className={cn(
                  'shrink-0 snap-start rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
                  isActive
                    ? 'bg-ink text-cream-100'
                    : 'border border-cream-300 bg-cream-100 text-ink hover:bg-cream-200'
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          aria-label="Scroll filters right"
          onClick={() => scroll('right')}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream-300 bg-cream-100 text-ink shadow-sm transition-opacity duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:hidden',
            canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          tabIndex={canScrollRight ? 0 : -1}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    );
  }
);
FilterChips.displayName = 'FilterChips';

export { FilterChips };
