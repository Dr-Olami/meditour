import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * Form label atom.
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        className={cn('text-sm font-medium text-text-primary', className)}
        ref={ref}
        {...props}
      >
        {children}
        {required && <span aria-hidden="true"> *</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';

export { Label };
