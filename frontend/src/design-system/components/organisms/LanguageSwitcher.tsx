import * as React from 'react';
import { cn } from '../../../lib/utils';

/**
 * Supported locales. To add a new language (e.g. Arabic), append a new entry
 * here — the switcher, path stripping, and href building all adapt
 * automatically from this single source of truth.
 */
const LOCALES: { code: string; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bn', label: 'বাংলা', short: 'বাং' },
  // { code: 'ar', label: 'العربية', short: 'AR' },  // ready for Arabic
];

// Reason: build the locale-prefix regex dynamically from LOCALES so adding a
// new language requires no regex updates.
const LOCALE_CODES = LOCALES.map((l) => l.code);
const LOCALE_PREFIX_RE = new RegExp(`^\\/(${LOCALE_CODES.join('|')})\\b`);

export interface LanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  currentLocale: string;
  currentPath: string;
  /** Use short labels (e.g. "EN" instead of "English") — for compact spaces. */
  compact?: boolean;
  /**
   * Per-locale fallback hrefs for pages that are not translated into that
   * locale. Reason: country landing pages are English-only for MVP, so the
   * Bengali toggle falls back to the Bengali homepage instead of linking to
   * a 404 at /bn/countries/{slug}.
   */
  localeFallbacks?: Record<string, string>;
}

/**
 * Locale dropdown switcher that preserves the current path. Renders a button
 * showing the current locale; clicking reveals a dropdown with all supported
 * languages. Use `compact` for tight spaces like the mobile navbar.
 */
const LanguageSwitcher = React.forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ className, currentLocale, currentPath, compact, localeFallbacks, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

    // Reason: close on outside click so the dropdown behaves like a native
    // select without requiring a full-overlay backdrop.
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Reason: close on Escape for keyboard accessibility.
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open]);

    return (
      <div
        className={cn('relative', className)}
        ref={(node) => {
          // Forward both the outer ref and the internal containerRef
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Language: ${current.label}`}
          className={cn(
            'border-ink/20 flex items-center gap-1.5 rounded-full border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
            'hover:border-ink/40 bg-cream-100 text-ink hover:bg-cream-200'
          )}
        >
          {/* Globe icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{compact ? current.short : current.label}</span>
          {/* Chevron */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={cn('shrink-0 transition-transform duration-200', open && 'rotate-180')}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute right-0 top-full z-50 mt-1.5 min-w-[8rem] overflow-hidden rounded-xl border border-cream-300 bg-white py-1 shadow-lg"
          >
            {LOCALES.map((locale) => {
              const isActive = locale.code === currentLocale;
              const prefix = locale.code === 'en' ? '' : `/${locale.code}`;
              const path = currentPath === '/' ? '' : currentPath.replace(LOCALE_PREFIX_RE, '');
              // Reason: use the fallback href for untranslated locales so the
              // switcher never links to a 404.
              const href = localeFallbacks?.[locale.code] ?? `${prefix}${path || '/'}`;

              return (
                <li key={locale.code} role="option" aria-selected={isActive}>
                  <a
                    href={href}
                    hrefLang={locale.code}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between gap-2 px-3 py-2 text-sm no-underline transition-colors',
                      isActive
                        ? 'font-semibold text-ink'
                        : 'text-text-secondary hover:bg-cream-200 hover:text-ink'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-ink/40 text-xs font-bold uppercase">
                        {locale.short}
                      </span>
                      {locale.label}
                    </span>
                    {isActive && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 text-ink"
                      >
                        <path
                          d="M2 7.5L5.5 11L12 3.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);
LanguageSwitcher.displayName = 'LanguageSwitcher';

export { LanguageSwitcher, LOCALES };
