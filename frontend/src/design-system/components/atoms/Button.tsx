import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-card font-medium transition-[background-color,color,opacity,box-shadow] duration-fast ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-violet disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Solid black pill — the primary conversion CTA
        primary: 'bg-ink text-white hover:bg-ink-strong hover:text-white',
        // Violet→indigo gradient — reserved for high-intent actions (e.g. "Book Now")
        gradient: 'bg-gradient-accent text-white hover:opacity-90',
        // Soft cream fill for secondary emphasis
        secondary: 'bg-cream-200 text-ink hover:bg-cream-300',
        // Ink outline
        outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
        // Minimal
        ghost: 'text-ink hover:bg-cream-200',
        // Functional destructive (validation/errors only)
        danger: 'bg-error text-white hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-11 w-11 px-0',
      },
      full: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Primary action button. Supports rendering as a child element via asChild.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, full }), className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        {
          ref,
          className: cn(classes, children.props.className),
          ...props,
        } as React.HTMLAttributes<HTMLElement>
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
