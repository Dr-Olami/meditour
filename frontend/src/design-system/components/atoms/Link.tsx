import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const linkVariants = cva('transition-colors focus-visible:outline-none', {
  variants: {
    variant: {
      default: 'text-ink hover:text-ink-strong',
      subtle: 'text-text-secondary hover:text-ink',
      inverse: 'text-white hover:text-white/80',
    },
    underline: {
      default: 'underline',
      none: 'no-underline',
    },
  },
  defaultVariants: {
    variant: 'default',
    underline: 'none',
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

/**
 * Styled anchor link.
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, children, ...props }, ref) => {
    return (
      <a
        className={cn(linkVariants({ variant, underline }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  }
);
Link.displayName = 'Link';

export { Link, linkVariants };
