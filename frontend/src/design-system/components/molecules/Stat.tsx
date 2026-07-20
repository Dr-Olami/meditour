import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  description?: string;
}

/**
 * Statistic display molecule.
 */
const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, value, label, description, ...props }, ref) => {
    return (
      <div
        className={cn('flex flex-col items-center text-center', className)}
        ref={ref}
        {...props}
      >
        <span className="text-4xl font-bold text-ink" data-anim="counter-up">{value}</span>
        <span className="text-base font-semibold text-text-primary">{label}</span>
        {description && (
          <span className="text-sm text-text-muted">{description}</span>
        )}
      </div>
    );
  }
);
Stat.displayName = 'Stat';

export { Stat };
