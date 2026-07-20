import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Visual separator.
 */
const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <hr
        className={cn(
          'border-border-default',
          orientation === 'horizontal'
            ? 'h-px w-full border-t'
            : 'h-full w-px border-l',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';

export { Divider };
