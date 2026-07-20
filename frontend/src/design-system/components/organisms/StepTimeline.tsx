import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface Step {
  title: string;
  description: string;
  duration?: string;
}

export interface StepTimelineProps
  extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
}

/**
 * Numbered step timeline for the patient journey.
 */
const StepTimeline = React.forwardRef<HTMLOListElement, StepTimelineProps>(
  ({ className, steps, ...props }, ref) => {
    return (
      <ol
        className={cn(
          'relative grid gap-8 before:absolute before:left-6 before:top-0 before:h-full before:w-0.5 before:bg-cream-300 md:grid-cols-5 md:before:hidden',
          className
        )}
        ref={ref}
        data-anim="stagger-children"
        {...props}
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative pl-16 md:pl-0 md:text-center"
          >
            <span
              className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lg font-bold text-cream-100 md:static md:mx-auto md:mb-4"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-text-secondary">{step.description}</p>
            {step.duration && (
              <p className="mt-1 flex items-center justify-start gap-1 text-xs font-medium text-ink/60 md:justify-center">
                <span aria-hidden="true">⏱</span>
                {step.duration}
              </p>
            )}
          </li>
        ))}
      </ol>
    );
  }
);
StepTimeline.displayName = 'StepTimeline';

export { StepTimeline };
