import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Radio button atom with optional label.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="radio"
          className={cn(
            'h-4 w-4 border-border-strong text-ink focus-visible:ring-border-focus',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && <span className="text-sm text-text-secondary">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = 'Radio';

export { Radio };
