import * as React from 'react';
import { cn } from '../../../lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: string;
  links: { label: string; href: string }[];
  cta?: { label: string; href: string };
  /** Current locale code (e.g. "en", "bn") — enables the in-navbar switcher. */
  locale?: string;
  /** Current URL pathname — used by the language switcher to preserve path. */
  currentPath?: string;
  /**
   * Per-locale fallback hrefs for pages not translated into that locale.
   * Reason: country landing pages are English-only for MVP, so the Bengali
   * toggle falls back to the Bengali homepage instead of a 404.
   */
  localeFallbacks?: Record<string, string>;
  /** Phone number for the Call button (international format, no +). */
  phoneNumber?: string;
  /** Label for the Call button (localized). */
  callLabel?: string;
  /** WhatsApp deep link for the WhatsApp CTA button. */
  whatsappHref?: string;
  /** Label for the WhatsApp button (localized). */
  whatsappLabel?: string;
}

/**
 * Floating pill navbar that condenses (adds shadow + reduces padding) on scroll.
 * Translucent warm-cream pill, centered links,
 * brand left, CTA right. When `locale` and `currentPath` are provided a
 * compact language switcher is always visible next to the hamburger on mobile
 * and between the links and CTA on desktop.
 *
 * Mobile (not scrolled):  [brand]           [call][switcher][☰]
 * Mobile (scrolled):      [initials]        [call][switcher][☰]
 * Tablet:                 [brand]    [call+label][switcher][☰]
 * Desktop:                [brand] [links] [call] [switcher] [WhatsApp]
 */
const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      brand,
      links,
      cta: _cta,
      locale,
      currentPath,
      localeFallbacks,
      phoneNumber,
      callLabel,
      whatsappHref,
      whatsappLabel,
      ...props
    },
    ref
  ) => {
    // Reason: render the switcher internally so Astro pages only need to pass
    // string props (locale + currentPath) rather than JSX elements, which
    // Astro's template parser cannot handle in attribute values.
    const showSwitcher = Boolean(locale && currentPath);
    const switcher = showSwitcher ? (
      <LanguageSwitcher
        currentLocale={locale!}
        currentPath={currentPath!}
        localeFallbacks={localeFallbacks}
        compact
      />
    ) : null;
    const [open, setOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    // Reason: derive initials from brand for mobile logo transition
    const initials = brand
      .split(' ')
      .map((w) => w[0])
      .join('');

    React.useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 24);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-fixed flex justify-center px-4 pt-3 transition-[padding] duration-fast ease-out-expo',
          className
        )}
        ref={ref}
        {...props}
      >
        <nav
          className={cn(
            'bg-cream-200/90 flex w-full max-w-7xl items-center justify-between rounded-pill px-6 backdrop-blur-md transition-[box-shadow,padding] duration-fast ease-out-expo lg:px-10',
            scrolled ? 'py-2.5 shadow-md' : 'py-3.5'
          )}
          aria-label="Main"
        >
          {/* Brand — animates to initials on mobile when scrolled */}
          <a
            href="/"
            className="relative flex items-center font-display text-base font-bold tracking-tight text-ink no-underline md:text-base"
            aria-label={brand}
          >
            {/* Full text — visible on desktop always, animates out on mobile/tablet scroll */}
            <span
              className={cn(
                'transition-all duration-500 ease-out-expo lg:max-w-none lg:translate-x-0 lg:opacity-100',
                scrolled
                  ? 'max-w-0 translate-x-1 opacity-0 lg:max-w-none lg:translate-x-0 lg:opacity-100'
                  : 'max-w-[12rem] translate-x-0 opacity-100'
              )}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {brand}
            </span>
            {/* Initials — hidden on desktop, animates in on mobile/tablet scroll */}
            <span
              className={cn(
                'absolute left-0 transition-all duration-500 ease-out-expo lg:hidden',
                scrolled
                  ? 'translate-x-0 scale-100 opacity-100'
                  : '-translate-x-1 scale-75 opacity-0'
              )}
              style={{ transitionDelay: scrolled ? '150ms' : '0ms' }}
            >
              <span className="text-lg font-extrabold">{initials}</span>
            </span>
          </a>

          {/* Desktop links — centered (lg+ only; tablet uses hamburger) */}
          <ul className="hidden items-center gap-8 lg:flex lg:gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-600 no-underline transition-colors duration-fast hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA / Login */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Call button — sits beside the language switcher */}
            {phoneNumber && (
              <a
                href={`tel:+${phoneNumber}`}
                className="border-ink/20 hover:border-ink/40 flex items-center gap-1.5 rounded-full border bg-cream-100 px-2.5 py-1 text-xs font-semibold text-ink transition-colors hover:bg-cream-200 md:px-3 md:py-1.5 md:text-sm"
                aria-label={callLabel ?? 'Call us'}
              >
                {/* Phone icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hidden sm:inline">{callLabel ?? 'Call'}</span>
              </a>
            )}
            {/* Language switcher — always visible, sits right before the hamburger on mobile */}
            {switcher}
            {/* WhatsApp CTA — desktop only (lg+); on mobile/tablet it lives in the hamburger dropdown */}
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-ink/90 hover:shadow-ink/30 hidden items-center gap-1.5 rounded-pill bg-ink px-4 py-2 text-sm font-semibold text-white no-underline transition-all hover:text-white hover:shadow-lg lg:inline-flex"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {whatsappLabel ?? 'WhatsApp'}
              </a>
            )}
            {/* Mobile/tablet hamburger */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-300 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                {open ? (
                  <path
                    d="M1 1l16 12M17 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path
                      d="M0 1h18M0 7h18M0 13h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile/tablet dropdown */}
        {open && (
          <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl bg-white shadow-lg lg:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {links.map((link, index) => (
                <li key={link.href} className={index > 0 ? 'border-t border-cream-200 pt-1' : ''}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-4 py-3.5 text-base font-medium text-ink no-underline transition-colors hover:bg-cream-200"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {whatsappHref && (
                <li className="pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="hover:bg-ink/90 hover:shadow-ink/30 flex items-center justify-center gap-2 rounded-pill bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-all hover:text-white hover:shadow-lg"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {whatsappLabel ?? 'WhatsApp'}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>
    );
  }
);
Navbar.displayName = 'Navbar';

export { Navbar };
