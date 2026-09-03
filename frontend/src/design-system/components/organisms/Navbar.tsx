import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../atoms/Button';
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
}

/**
 * Floating pill navbar that condenses (adds shadow + reduces padding) on scroll.
 * Translucent warm-cream pill, centered links,
 * brand left, CTA right. When `locale` and `currentPath` are provided a
 * compact language switcher is always visible next to the hamburger on mobile
 * and between the links and CTA on desktop.
 *
 * Mobile (not scrolled):  [brand]              [switcher][☰]
 * Mobile (scrolled):      [initials]           [switcher][☰]
 * Desktop:                [brand] [links] [switcher] [CTA]
 */
const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, brand, links, cta, locale, currentPath, localeFallbacks, ...props }, ref) => {
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
    const initials = brand.split(' ').map((w) => w[0]).join('');

    React.useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 24);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
      <header
        className={cn('fixed top-0 left-0 right-0 z-fixed flex justify-center px-4 pt-3 transition-[padding] duration-fast ease-out-expo', className)}
        ref={ref}
        {...props}
      >
        <nav
          className={cn(
            'flex w-full max-w-7xl items-center justify-between rounded-pill bg-cream-200/90 backdrop-blur-md px-6 transition-[box-shadow,padding] duration-fast ease-out-expo lg:px-10',
            scrolled ? 'py-2.5 shadow-md' : 'py-3.5'
          )}
          aria-label="Main"
        >
          {/* Brand — animates to initials on mobile when scrolled */}
          <a
            href="/"
            className="relative flex items-center text-base font-display font-bold tracking-tight text-ink no-underline md:text-base"
            aria-label={brand}
          >
            {/* Full text — visible on desktop always, animates out on mobile scroll */}
            <span
              className={cn(
                'transition-all duration-500 ease-out-expo md:opacity-100 md:max-w-none md:translate-x-0',
                scrolled
                  ? 'max-w-0 opacity-0 translate-x-1 md:max-w-none md:opacity-100 md:translate-x-0'
                  : 'max-w-[12rem] opacity-100 translate-x-0'
              )}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {brand}
            </span>
            {/* Initials — hidden on desktop, animates in on mobile scroll */}
            <span
              className={cn(
                'absolute left-0 transition-all duration-500 ease-out-expo md:hidden',
                scrolled
                  ? 'opacity-100 scale-100 translate-x-0'
                  : 'opacity-0 scale-75 -translate-x-1'
              )}
              style={{ transitionDelay: scrolled ? '150ms' : '0ms' }}
            >
              <span className="text-lg font-extrabold">{initials}</span>
            </span>
          </a>

          {/* Desktop links — centered */}
          <ul className="hidden items-center gap-8 md:flex lg:gap-10">
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
            {/* Language switcher — always visible, sits right before the hamburger on mobile */}
            {switcher}
            {/* CTA — desktop only; on mobile it lives in the hamburger dropdown */}
            {cta && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden rounded-pill md:inline-flex"
              >
                <a href={cta.href} className="whitespace-nowrap">{cta.label}</a>
              </Button>
            )}
            {/* Mobile hamburger */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-300 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M1 1l16 12M17 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl bg-white shadow-lg md:hidden">
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
              {cta && (
                <li className="pt-2">
                  <Button asChild size="sm" full>
                    <a href={cta.href} onClick={() => setOpen(false)}>{cta.label}</a>
                  </Button>
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
