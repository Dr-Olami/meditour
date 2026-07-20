import * as React from 'react';
import { cn } from '../../../lib/utils';
import { useAnimations } from '../../motion/use-animations';

export interface StatementSectionProps extends React.HTMLAttributes<HTMLElement> {
  statement: string;
  caption?: string;
}

/**
 * Full-width editorial statement section.
 * Large display text spanning the viewport width — the "mission in one line"
 * block used between sections.
 */
const StatementSection = React.forwardRef<HTMLElement, StatementSectionProps>(
  ({ className, statement, caption, ...props }, ref) => {
    const innerRef = React.useRef<HTMLElement>(null);
    const combinedRef = (node: HTMLElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    useAnimations(innerRef as React.RefObject<HTMLElement>);

    return (
      <section
        className={cn('bg-ink py-20 px-6 text-cream-100', className)}
        ref={combinedRef}
        data-anim="scroll-reveal"
        {...props}
      >
        <div className="container">
          {caption && (
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-cream-100/40" data-anim="fade-in-up">
              {caption}
            </p>
          )}
          <p className="font-display text-4xl font-bold leading-tight tracking-tight text-cream-100 md:text-6xl lg:text-7xl" data-anim="headline-reveal">
            {statement}
          </p>
        </div>
      </section>
    );
  }
);
StatementSection.displayName = 'StatementSection';

export { StatementSection };
