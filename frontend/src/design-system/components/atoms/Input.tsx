import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const inputVariants = cva(
  'flex w-full rounded-base border border-border-default bg-bg-default px-3 py-2 text-base text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        default: '',
        error: 'border-accent-500 focus-visible:border-accent-500 focus-visible:ring-accent-500',
        success: 'border-success focus-visible:border-success focus-visible:ring-success',
      },
      inputSize: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

/**
 * Text input atom.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, inputSize, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ state, inputSize }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
