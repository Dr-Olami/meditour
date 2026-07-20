import * as React from 'react';
import { cn } from '../../../lib/utils';
import { TestimonialCard, type TestimonialItem } from '../molecules/TestimonialCard';

export type { TestimonialItem };

export interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: TestimonialItem[];
  title?: string;
  autoPlayInterval?: number;
}

const AUTO_PLAY_DEFAULT = 5000;

/**
 * Emotional testimonial carousel.
 *
 * The track runs full-bleed so the next card peeks into the viewport. Cards
 * auto-advance every few seconds, pausing on hover/touch. Navigation is a
 * pill-shaped segmented range control instead of arrows.
 */
const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(({ className, items, title, autoPlayInterval = AUTO_PLAY_DEFAULT, ...props }, ref) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);

  const total = items.length;
  if (total === 0) return null;

  const updateActiveIndex = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || el.clientWidth;
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, total - 1));
  }, [total]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollTo = React.useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const cardWidth = el.firstElementChild?.clientWidth || el.clientWidth;
    el.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' });
    setActiveIndex(clamped);
    if (clamped > 0) setHasStarted(true);
  }, [total]);

  // First card sits without a countdown; auto-play begins from the second card.
  React.useEffect(() => {
    if (total <= 1 || hasStarted || isPaused || activeIndex !== 0) return;
    const timer = window.setTimeout(() => {
      scrollTo(1);
    }, autoPlayInterval);
    return () => window.clearTimeout(timer);
  }, [total, hasStarted, isPaused, activeIndex, autoPlayInterval, scrollTo]);

  const isPausedRef = React.useRef(isPaused);
  isPausedRef.current = isPaused;

  const handleProgressEnd = React.useCallback(() => {
    if (isPausedRef.current || total <= 1) return;
    setActiveIndex((current) => {
      const next = current >= total - 1 ? 0 : current + 1;
      scrollTo(next);
      return next;
    });
  }, [total, scrollTo]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <div className={cn('relative', className)} ref={ref} {...props}>
      {title && (
        <div className="container mb-10">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
        </div>
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch]"
          style={{
            paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2))',
            paddingRight: 'max(1.5rem, calc((100vw - 80rem) / 2))',
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label={title || 'Testimonials'}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="w-[80vw] flex-shrink-0 snap-start px-3 md:w-[40vw] lg:w-[28vw]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
            >
              <TestimonialCard item={item} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="container mt-8 flex items-center justify-center">
          <div
            className="inline-flex items-center gap-2.5 rounded-pill bg-cream-200 px-6 py-2.5"
            role="tablist"
            aria-label="Testimonial pages"
          >
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  'relative h-2.5 rounded-full transition-all duration-fast ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
                  i === activeIndex
                    ? cn(
                        'w-10',
                        i === 0 && !hasStarted
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600'
                          : 'overflow-hidden bg-cream-300'
                      )
                    : 'w-2.5 bg-cream-300 hover:bg-cream-400'
                )}
              >
                {i === activeIndex && !(i === 0 && !hasStarted) && (
                  <span
                    key={activeIndex}
                    onAnimationEnd={handleProgressEnd}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    style={{
                      width: '0%',
                      animation: `progress-fill ${autoPlayInterval}ms linear forwards`,
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
TestimonialCarousel.displayName = 'TestimonialCarousel';

export { TestimonialCarousel };
