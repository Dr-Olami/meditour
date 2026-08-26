import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../atoms/Icon';

export interface WhyUsItem {
  /** Card title — always visible, centered. */
  title: string;
  /** Card description — hidden by default, appears instantly on hover. */
  description: string;
  /** Background image path (or video poster). */
  image: string;
  /** Optional video path — when provided, renders a <video> instead of <img>. */
  video?: string;
}

export interface WhyUsSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Section heading rendered above the grid. */
  title: string;
  /** Exactly 5 items expected: first 3 form the top row, last 2 the bottom row. */
  items: WhyUsItem[];
}

/**
 * Single differentiator card. Background image (or video) with a centered
 * white title. On hover: the media blurs, the title disappears, and the
 * description appears instantly (no fade). A constant dark overlay keeps
 * white text readable at all times. When a video is provided, it plays on
 * hover and pauses on mouse-leave.
 */
function WhyUsCard({ item }: { item: WhyUsItem }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      // Reason: CSS group-hover can blur the video but cannot trigger
      // video.play() — that requires a JS call. Restart from the beginning
      // so each hover shows the full clip.
      video.currentTime = 0;
      void video.play().catch(() => {
        // Reason: play() can reject if the browser blocks autoplay or the
        // video isn't ready; silently ignore — the blur effect still works.
      });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-card shadow-base h-[460px] md:h-[520px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background media — <video> when provided, otherwise <img>.
          Reason: structure is video-ready; swapping is a one-line change
          per card via the optional `video` prop. */}
      {item.video ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out-expo group-hover:blur-[8px] group-hover:scale-105"
          src={item.video}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ) : (
        <img
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out-expo group-hover:blur-[8px] group-hover:scale-105"
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Constant dark overlay — does NOT change on hover.
          Reason: keeps white text readable over the image at all times. */}
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />

      {/* Content — centered title (visible by default, disappears on hover) +
          description (hidden by default, appears instantly on hover). */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* Reason: title disappears on hover so the description takes the
            focal position. No transition — instant swap per UX spec. */}
        <h3 className="font-display text-xl font-bold text-white opacity-100 group-hover:opacity-0 md:text-2xl">
          {item.title}
        </h3>
        {/* Reason: no transition class — description appears instantly on
            hover per the UX spec (no fade, no effect). Larger + bolder
            for stronger readability over the blurred image. */}
        <p className="absolute inset-0 flex items-center justify-center whitespace-pre-line p-6 text-base font-semibold text-white opacity-0 group-hover:opacity-100 md:text-lg">
          {item.description}
        </p>
      </div>

      {/* "Hover for more details" hint with a glowing radio-button dot.
          Reason: guides the visitor to interact; the pulsing glow draws
          the eye without adding a new color (uses the gradient accent).
          Disappears on hover so it doesn't clutter the description view. */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-xs font-bold text-white/70 opacity-100 group-hover:opacity-0">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-accent" />
        </span>
        <span className="md:hidden">More details</span>
        <span className="hidden md:inline">Hover for more details</span>
      </div>
    </div>
  );
}

/**
 * "Why Us" section — 5 differentiator cards.
 *
 * Mobile: horizontal swipeable carousel (CSS scroll-snap), each card ~85% width,
 * with left/right arrow navigation buttons beside a thin scrollbar.
 * Desktop (md+): 3+2 grid layout — top 3 cards each 1/3 width (col-span-2),
 * bottom 2 cards each 1/2 width (col-span-3), filling the full grid width.
 *
 * Hover interaction: media blurs, title disappears, description appears
 * instantly. Video plays on hover, pauses on mouse-leave.
 */
const WhyUsSection = React.forwardRef<HTMLElement, WhyUsSectionProps>(
  ({ className, title, items, ...props }, ref) => {
    const topItems = items.slice(0, 3);
    const bottomItems = items.slice(3, 5);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    // Reason: track the current step explicitly so the progress fill is
    // directly tied to arrow clicks rather than relying on scroll events,
    // which can fire unreliably during smooth scrolling.
    const [step, setStep] = React.useState(0);
    const [maxStep, setMaxStep] = React.useState(1);

    const recomputeMaxStep = React.useCallback(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const firstCard = carousel.querySelector<HTMLElement>('[data-card]');
      const cardWidth = firstCard ? firstCard.offsetWidth + 16 : carousel.offsetWidth * 0.85;
      const scrollable = carousel.scrollWidth - carousel.clientWidth;
      // Reason: number of discrete card-width clicks to traverse the carousel.
      const steps = Math.max(1, Math.round(scrollable / cardWidth));
      setMaxStep(steps);
    }, []);

    React.useEffect(() => {
      recomputeMaxStep();
      const carousel = carouselRef.current;
      if (!carousel) return;
      const ro =
        typeof ResizeObserver !== 'undefined' ? new ResizeObserver(recomputeMaxStep) : null;
      if (ro) ro.observe(carousel);
      // Reason: keep the step in sync if the user swipes the carousel directly.
      const onScroll = () => {
        const c = carouselRef.current;
        if (!c) return;
        const scrollable = c.scrollWidth - c.clientWidth;
        if (scrollable <= 0) return;
        const ratio = c.scrollLeft / scrollable;
        const clamped = Math.max(0, Math.min(1, ratio));
        setStep(Math.round(clamped * maxStep));
      };
      carousel.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        carousel.removeEventListener('scroll', onScroll);
        if (ro) ro.disconnect();
      };
    }, [recomputeMaxStep, maxStep]);

    /**
     * Scroll the carousel by one card width in the given direction and
     * update the progress step so the track fill follows the arrow.
     *
     * @param direction - -1 for previous, 1 for next.
     */
    const scrollByCard = (direction: 1 | -1) => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const firstCard = carousel.querySelector<HTMLElement>('[data-card]');
      const cardWidth = firstCard ? firstCard.offsetWidth + 16 : carousel.offsetWidth * 0.85;
      carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
      // Reason: update the step immediately so the fill animates in sync with
      // the arrow click, not only after the smooth scroll settles.
      setStep((prev) => Math.max(0, Math.min(maxStep, prev + direction)));
    };

    const progress = maxStep > 0 ? step / maxStep : 0;
    const canScrollLeft = step > 0;
    const canScrollRight = step < maxStep;

    return (
      <section
        className={cn('bg-cream-100 py-20', className)}
        ref={ref}
        data-anim="scroll-reveal"
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          {/* Reason: title style matches the Doctor showcase section exactly —
              same responsive scale (text-3xl → lg:text-6xl), leading-none,
              tracking-tight, and mt-12 gap before the cards. Consistency
              across homepage sections is critical. */}
          <h2
            className="text-center font-display text-3xl font-bold leading-none tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
            data-anim="fade-in-up"
          >
            {title}
          </h2>

          {/* Mobile: horizontal scroll-snap carousel. Desktop: 6-col grid.
              Reason: a single container that is `flex` on mobile (scrollable
              row) and `md:grid` on desktop (3+2 layout). A custom styled
              scrollbar is shown on mobile via the `why-us-carousel` class. */}
          <div
            ref={carouselRef}
            className="why-us-carousel mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:snap-none md:pb-0"
            data-anim="stagger-cards"
          >
            {topItems.map((item) => (
              <div
                key={item.title}
                data-card
                className="shrink-0 snap-center w-[85%] md:w-auto md:shrink md:col-span-2"
              >
                <WhyUsCard item={item} />
              </div>
            ))}
            {bottomItems.map((item) => (
              <div
                key={item.title}
                data-card
                className="shrink-0 snap-center w-[85%] md:w-auto md:shrink md:col-span-3"
              >
                <WhyUsCard item={item} />
              </div>
            ))}
          </div>

          {/* Carousel navigation — scroll-progress track + arrow row.
              Reason: visible only on mobile (md:hidden) where the carousel
              is active. The track fills proportionally to scroll position, and
              arrows disable at the start/end of the scroll range. */}
          <div className="mt-4 flex items-center justify-between md:hidden">
            {/* Reason: track uses a light solid color (cream-300) and the fill
                uses full ink. Opacity is multiplicative, so putting opacity-30
                on the parent would make the fill invisible — instead we use
                distinct colors so the fill is clearly darker than the track. */}
            <div className="h-0.5 w-64 overflow-hidden rounded-full bg-cream-300">
              <div
                className="h-full rounded-full bg-ink transition-all duration-300 ease-out-expo"
                style={{ width: `${progress * 100}%` }}
                aria-hidden="true"
              />
            </div>
            {/* Reason: arrows grouped together with a tight gap so they read as
                a single paired control, matching the reference design. */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous card"
                disabled={!canScrollLeft}
                className={cn(
                  'p-2 transition-colors',
                  canScrollLeft
                    ? 'text-ink hover:text-ink/70'
                    : 'pointer-events-none text-ink/40'
                )}
              >
                <Icon name="arrow-left" size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next card"
                disabled={!canScrollRight}
                className={cn(
                  'p-2 transition-colors',
                  canScrollRight
                    ? 'text-ink hover:text-ink/70'
                    : 'pointer-events-none text-ink/40'
                )}
              >
                <Icon name="arrow-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

WhyUsSection.displayName = 'WhyUsSection';

export { WhyUsSection };
