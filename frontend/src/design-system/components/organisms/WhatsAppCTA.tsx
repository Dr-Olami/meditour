import * as React from 'react';
import { cn } from '../../../lib/utils';
import { buildWhatsAppLink, getContextualWhatsAppLink, getWhatsAppNumber, type WhatsAppContext } from '../../../lib/whatsapp';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

export interface WhatsAppCTAProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  number?: string;
  message?: string;
  /**
   * Page context used to build a contextual message via lib/whatsapp.ts
   * helpers (e.g. mentioning the doctor/treatment being viewed). Takes
   * precedence over `number`/`message` when provided.
   */
  context?: WhatsAppContext;
  variant?: 'button' | 'floating';
  children?: React.ReactNode;
}

/**
 * WhatsApp call-to-action link.
 */
const WhatsAppCTA = React.forwardRef<HTMLAnchorElement, WhatsAppCTAProps>(
  (
    {
      className,
      number,
      message = 'Hi, I have a question about Khan Meditour.',
      context,
      variant = 'button',
      children,
      ...props
    },
    ref
  ) => {
    const href = context
      ? getContextualWhatsAppLink(context)
      : buildWhatsAppLink(number ?? getWhatsAppNumber(), message);

    if (variant === 'floating') {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'fixed bottom-6 right-6 z-fixed flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
            className
          )}
          aria-label="Chat on WhatsApp"
          ref={ref}
          {...props}
        >
          <Icon name="whatsapp" size={28} />
        </a>
      );
    }

    return (
      <Button
        asChild
        className={cn('bg-[#25D366] hover:bg-[#1ebe5a]', className)}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          <Icon name="whatsapp" size={20} />
          {children || 'Chat on WhatsApp'}
        </a>
      </Button>
    );
  }
);
WhatsAppCTA.displayName = 'WhatsAppCTA';

export { WhatsAppCTA };
