import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Checkbox atom with optional label.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          className={cn(
            'mt-0.5 h-4 w-4 rounded-sm border-border-strong text-ink focus-visible:ring-border-focus',
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
Checkbox.displayName = 'Checkbox';

export { Checkbox };
