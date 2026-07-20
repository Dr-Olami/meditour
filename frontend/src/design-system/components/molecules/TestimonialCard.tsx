import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface TestimonialItem {
  name: string;
  location?: string;
  quote: string;
  image?: string;
  video?: string;
  videoDuration?: string;
  brandLabel?: string;
  rating?: number;
}

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: TestimonialItem;
}

const FALLBACK_IMAGE = '/images/testimonial-placeholder.jpg';

/**
 * Emotional testimonial card with media slot, quote, and attribution.
 *
 * Supports an image or a video placeholder. Uses warm cream tones, soft
 * shadows, and a bottom image gradient so text sits cleanly on top.
 */
const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, item, ...props }, ref) => {
    return (
      <article
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-card bg-cream-100 shadow-base',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Media slot */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
          {item.video ? (
            <>
              <img
                src={item.image || FALLBACK_IMAGE}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              {item.videoDuration && (
                <span className="absolute bottom-3 right-3 rounded-md bg-ink/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {item.videoDuration}
                </span>
              )}
            </>
          ) : (
            <img
              src={item.image || FALLBACK_IMAGE}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          )}

          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream-100 via-cream-100/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col bg-cream-200 p-5">
          <blockquote className="flex-1 text-base leading-relaxed text-ink md:text-lg">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-cream-200 pt-4">
            <div>
              <p className="text-sm font-semibold text-ink">{item.name}</p>
              {item.location && (
                <p className="text-xs text-ink/50">{item.location}</p>
              )}
            </div>
            {item.brandLabel && (
              <span className="text-xs font-bold uppercase tracking-wider text-ink">
                {item.brandLabel}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }
);
TestimonialCard.displayName = 'TestimonialCard';

export { TestimonialCard };
