import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface RevealImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  href?: string;
}

/**
 * Image card that reveals a text overlay on hover.
 * Used in the equipment / hospital gallery grid.
 */
const RevealImageCard = React.forwardRef<HTMLDivElement, RevealImageCardProps>(
  ({ className, src, alt, label, caption, href, ...props }, ref) => {
    const content = (
      <div
        className={cn(
          'group relative overflow-hidden rounded-card bg-cream-200',
          className
        )}
        ref={ref}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
        />
        {(label || caption) && (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-fast group-hover:opacity-100">
            {label && (
              <p className="font-display text-lg font-bold leading-tight text-cream-100">
                {label}
              </p>
            )}
            {caption && (
              <p className="mt-1 text-sm text-cream-100/70">{caption}</p>
            )}
          </div>
        )}
      </div>
    );

    if (href) {
      return (
        <a href={href} className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-card">
          {content}
        </a>
      );
    }

    return content;
  }
);
RevealImageCard.displayName = 'RevealImageCard';

export { RevealImageCard };
