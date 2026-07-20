import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../atoms/Button';
import { gsap } from 'gsap';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: string;
  links: { label: string; href: string }[];
  cta?: { label: string; href: string };
}

/**
 * Floating pill navbar that condenses (adds shadow + reduces padding) on scroll.
 * Translucent warm-cream pill, centered links,
 * brand left, CTA right.
 */
const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, brand, links, cta, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const headerRef = React.useRef<HTMLElement>(null);
    const lastScrollY = React.useRef(0);
    const prefersReducedMotion = React.useRef(false);

    React.useEffect(() => {
      const onScroll = () => {
        const currentY = window.scrollY;
        setScrolled(currentY > 24);

        if (prefersReducedMotion.current || !headerRef.current) return;

        const delta = currentY - lastScrollY.current;
        if (currentY < 80) {
          gsap.to(headerRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
        } else if (delta > 8) {
          gsap.to(headerRef.current, { y: -100, duration: 0.3, ease: 'power2.out' });
        } else if (delta < -8) {
          gsap.to(headerRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
        }
        lastScrollY.current = currentY;
      };

      const mql = window.matchMedia('(prefers-reduced-motion: no-preference)');
      prefersReducedMotion.current = !mql.matches;
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
      <header
        className={cn('fixed top-0 left-0 right-0 z-fixed flex justify-center px-4 pt-3 transition-[padding] duration-fast ease-out-expo', className)}
        ref={(node) => {
          headerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        {...props}
      >
        <nav
          className={cn(
            'flex w-full max-w-7xl items-center justify-between rounded-pill bg-cream-200/90 backdrop-blur-md px-6 transition-[box-shadow,padding] duration-fast ease-out-expo lg:px-10',
            scrolled ? 'py-2.5 shadow-md' : 'py-3.5'
          )}
          aria-label="Main"
        >
          {/* Brand */}
          <a href="/" className="text-base font-display font-bold tracking-tight text-ink no-underline">
            {brand}
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
          <div className="flex items-center gap-3">
            {cta && (
              <Button asChild size="sm" variant="outline" className="rounded-pill">
                <a href={cta.href}>{cta.label}</a>
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
          <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl bg-cream-200/95 backdrop-blur-md shadow-lg md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm text-ink no-underline transition-colors hover:bg-cream-300"
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
