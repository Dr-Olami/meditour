import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Stat } from '../molecules/Stat';

export interface StatData {
  value: string;
  label: string;
  description?: string;
}

export interface StatCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatData[];
}

/**
 * Stat counter grid.
 */
const StatCounter = React.forwardRef<HTMLDivElement, StatCounterProps>(
  ({ className, stats, ...props }, ref) => {
    return (
      <div
        className={cn(
          'grid grid-cols-2 gap-8 md:grid-cols-4',
          className
        )}
        ref={ref}
        {...props}
      >
        {stats.map((stat) => (
          <Stat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            description={stat.description}
          />
        ))}
      </div>
    );
  }
);
StatCounter.displayName = 'StatCounter';

export { StatCounter };
