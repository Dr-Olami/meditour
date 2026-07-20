import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../atoms/Icon';

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
 */
const FAQAccordion = React.forwardRef<HTMLDivElement, FAQAccordionProps>(
  ({ className, items, allowMultiple, ...props }, ref) => {
    return (
      <div
        className={cn('divide-y divide-border-default rounded-xl border border-border-default', className)}
        ref={ref}
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
            <div className="px-5 pb-5 text-text-secondary" style={{ height: 0, opacity: 0, overflow: 'hidden' }}>{item.answer}</div>
          </details>
        ))}
      </div>
    );
  }
);
FAQAccordion.displayName = 'FAQAccordion';

export { FAQAccordion };
