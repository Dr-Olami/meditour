import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-base border px-2 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border-default bg-bg-subtle text-text-secondary',
        active: 'border-ink bg-ink text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

/**
 * Categorization tag atom.
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        className={cn(tagVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Tag.displayName = 'Tag';

export { Tag, tagVariants };
