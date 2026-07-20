import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, type IconProps } from './Icon';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProps['name'];
  label: string;
  size?: number;
}

/**
 * Accessible icon-only button.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, label, size = 20, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-base text-text-secondary transition-colors hover:bg-bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50',
          className
        )}
        aria-label={label}
        ref={ref}
        {...props}
      >
        <Icon name={icon} size={size} />
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';

export { IconButton };
