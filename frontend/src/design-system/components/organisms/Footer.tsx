import * as React from 'react';
import { cn } from '../../../lib/utils';
import { getWhatsAppNumber, buildWhatsAppLink } from '../../../lib/whatsapp';

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand: string;
  legalLinks: FooterLegalLink[];
  conciergeLabel: string;
  conciergePrefix: string;
  conciergeSuffix: string;
  copyright: string;
  address?: string;
}

/**
 * Minimal full-bleed black footer: legal links, a concierge/emergency
 * contact line, a copyright row, and a giant solid wordmark bleeding off
 * the bottom edge.
 */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    { className, brand, legalLinks, conciergeLabel, conciergePrefix, conciergeSuffix, copyright, address, ...props },
    ref
  ) => {
    const number = getWhatsAppNumber();
    const phone = number ? `+${number}` : '';
    const whatsappHref = phone
      ? buildWhatsAppLink(number, 'Thank you for contacting us. How may we assist you today?')
      : '';
    const safeLegalLinks = legalLinks?.length ? legalLinks : [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Policies', href: '/privacy' },
    ];

    return (
      <footer
        className={cn('bg-ink text-gray-500 overflow-hidden', className)}
        ref={ref}
        {...props}
      >
        {/* Inner container: holds everything except the bleeding wordmark */}
        <div className="container">
          {/* Legal links */}
          <div className="border-t border-cream-100/15 py-8">
            <ul className="flex flex-wrap gap-6">
              {safeLegalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 no-underline transition-none hover:text-gray-500 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge / emergency line */}
          {phone && (
            <div className="border-t border-cream-100/15 py-8">
              <p className="text-sm">
                <span className="text-base">{conciergePrefix}</span>{' '}
                <strong className="text-sm font-semibold">{conciergeLabel}</strong>{' '}
                <span className="text-base">{conciergeSuffix}</span>{' '}
                <a
                  href={whatsappHref}
                  className="text-sm text-gray-500 no-underline transition-none hover:text-gray-500 hover:underline"
                >
                  {phone}
                </a>
              </p>
            </div>
          )}

          {/* Brand + copyright */}
          <div className="border-t border-cream-100/15 py-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <a
                href="/"
                className="text-sm font-display font-bold text-gray-500 no-underline transition-none hover:text-gray-500"
              >
                {brand}
              </a>
              {address && <p className="text-xs text-gray-500 whitespace-pre-line">{address}</p>}
            </div>
            <p className="text-xs">{copyright}</p>
          </div>
        </div>

        {/* Giant wordmark bleed row */}
        <div className="select-none overflow-hidden px-4 pt-2 pb-0 sm:px-8" aria-hidden="true">
          <p className="font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-none tracking-tighter text-cream-100 whitespace-nowrap text-center">
            {brand}
          </p>
        </div>
      </footer>
    );
  }
);
Footer.displayName = 'Footer';

export { Footer };
