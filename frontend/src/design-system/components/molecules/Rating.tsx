import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
}

/**
 * Star rating display.
 */
const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value, max = 5, size = 16, ...props }, ref) => {
    const stars = Array.from({ length: max }, (_, index) => index + 1);

    return (
      <div
        className={cn('inline-flex items-center gap-0.5', className)}
        role="img"
        aria-label={`Rating: ${value} out of ${max}`}
        ref={ref}
        {...props}
      >
        {stars.map((index) => {
          const filled = index <= Math.round(value);
          return (
            <svg
              key={index}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={filled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
              className={cn(
                'text-secondary-500',
                !filled && 'text-border-strong'
              )}
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a.53.53 0 0 0 .4.293l5.164.753c.46.067.643.632.31.957l-3.735 3.64a.53.53 0 0 0-.152.472l.882 5.14a.53.53 0 0 1-.77.56l-4.618-2.428a.53.53 0 0 0-.493 0L6.95 20.146a.53.53 0 0 1-.77-.56l.881-5.139a.53.53 0 0 0-.152-.472l-3.735-3.64a.53.53 0 0 1 .31-.957l5.164-.753a.53.53 0 0 0 .4-.293z" />
            </svg>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = 'Rating';

export { Rating };
