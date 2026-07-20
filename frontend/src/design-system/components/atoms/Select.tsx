import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const selectVariants = cva(
  'flex w-full appearance-none rounded-base border border-border-default bg-bg-default px-3 py-2 pr-8 text-base text-text-primary focus-visible:border-border-focus focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        default: '',
        error: 'border-accent-500 focus-visible:border-accent-500 focus-visible:ring-accent-500',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

/**
 * Select dropdown atom.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, state, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(selectVariants({ state }), className)}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
          ▼
        </span>
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select, selectVariants };
