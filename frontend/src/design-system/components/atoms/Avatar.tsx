import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * User avatar atom.
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', fallback, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-12 w-12 text-base',
      lg: 'h-16 w-16 text-lg',
    };

    return (
      <div
        className={cn(
          'inline-flex items-center justify-center overflow-hidden rounded-full bg-bg-muted font-medium text-text-secondary',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span>{fallback?.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
