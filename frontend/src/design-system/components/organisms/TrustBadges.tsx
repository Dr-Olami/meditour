import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface Badge {
  label: string;
  value?: string;
}

export interface TrustBadgesProps
  extends React.HTMLAttributes<HTMLUListElement> {
  badges: Badge[];
}

/**
 * Horizontal trust badges strip.
 */
const TrustBadges = React.forwardRef<HTMLUListElement, TrustBadgesProps>(
  ({ className, badges, ...props }, ref) => {
    return (
      <ul
        className={cn(
          'grid grid-cols-2 gap-4 md:grid-cols-4',
          className
        )}
        ref={ref}
        {...props}
      >
        {badges.map((badge) => (
          <li
            key={badge.label}
            className="rounded-lg border border-border-default bg-bg-subtle p-4 text-center"
          >
            {badge.value && (
              <p className="text-2xl font-bold text-ink">{badge.value}</p>
            )}
            <p className="text-sm font-medium text-text-secondary">{badge.label}</p>
          </li>
        ))}
      </ul>
    );
  }
);
TrustBadges.displayName = 'TrustBadges';

export { TrustBadges };
export type { Badge as TrustBadge };
