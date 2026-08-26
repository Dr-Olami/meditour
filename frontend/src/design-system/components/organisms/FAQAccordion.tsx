import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../atoms/Icon';
import { useAnimations } from '../../motion/use-animations';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: FAQItem[];
  allowMultiple?: boolean;
}

/**
 * FAQ accordion using details/summary for progressive disclosure.
 *
 * Relies on the native `<details>`/`<summary>` elements for visibility so the
 * answer is always accessible even when GSAP animations are unavailable
 * (e.g. `prefers-reduced-motion: reduce` or hydration timing). The GSAP
 * motion engine (`runFaqAccordion`) layers smooth open/close animations on
 * top via `useAnimations`.
 */
const FAQAccordion = React.forwardRef<HTMLDivElement, FAQAccordionProps>(
  ({ className, items, allowMultiple, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    // Reason: merge the forwarded ref with the internal ref so GSAP can scope
    // to this container while callers can still access the DOM node.
    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // Reason: self-initialise GSAP so the accordion works after
    // `client:visible` hydration, not just on static server-rendered pages.
    useAnimations(innerRef);

    return (
      <div
        className={cn('divide-y divide-border-default rounded-xl border border-border-default', className)}
        ref={setRef}
        data-anim="faq-accordion"
        {...props}
      >
        {items.map((item, index) => (
          <details
            key={index}
            name={allowMultiple ? undefined : 'faq'}
            className="group"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-medium text-text-primary hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus">
              {item.question}
              <Icon
                name="chevron-down"
                className="transition-transform group-open:rotate-180"
                size={20}
              />
            </summary>
            <div className="px-5 pb-5 text-text-secondary">{item.answer}</div>
          </details>
        ))}
      </div>
    );
  }
);
FAQAccordion.displayName = 'FAQAccordion';

export { FAQAccordion };
