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

export interface LanguageSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
 * Locale switcher that preserves the current path. Renders a pill toggle with
 * one button per supported locale. Use `compact` for tight spaces like the
 * mobile navbar.
 */
const LanguageSwitcher = React.forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ className, currentLocale, currentPath, compact, localeFallbacks, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center gap-0.5 rounded-full p-0.5',
          compact ? 'bg-ink/5' : 'border border-border-default p-1',
          className,
        )}
        ref={ref}
        {...props}
      >
        {LOCALES.map((locale) => {
          const isActive = locale.code === currentLocale;
          const prefix = locale.code === 'en' ? '' : `/${locale.code}`;
          const path = currentPath === '/' ? '' : currentPath.replace(LOCALE_PREFIX_RE, '');
          // Reason: use the fallback href for untranslated locales so the
          // switcher never links to a 404.
          const href = localeFallbacks?.[locale.code] ?? `${prefix}${path || '/'}`;

          return (
            <a
              key={locale.code}
              href={href}
              hrefLang={locale.code}
              className={cn(
                'rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                compact ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm',
                isActive
                  ? 'bg-ink text-white'
                  : 'text-text-secondary hover:bg-bg-muted',
              )}
              aria-current={isActive ? 'true' : undefined}
              aria-label={locale.label}
            >
              {compact ? locale.short : locale.label}
            </a>
          );
        })}
      </div>
    );
  },
);
LanguageSwitcher.displayName = 'LanguageSwitcher';

export { LanguageSwitcher, LOCALES };
