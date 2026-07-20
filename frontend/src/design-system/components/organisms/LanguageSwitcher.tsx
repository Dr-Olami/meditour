import * as React from 'react';
import { cn } from '../../../lib/utils';

const LOCALES: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা' },
];

export interface LanguageSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currentLocale: string;
  currentPath: string;
}

/**
 * Locale switcher that preserves the current path.
 */
const LanguageSwitcher = React.forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ className, currentLocale, currentPath, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-center gap-1 rounded-base border border-border-default p-1', className)}
        ref={ref}
        {...props}
      >
        {LOCALES.map((locale) => {
          const isActive = locale.code === currentLocale;
          const prefix = locale.code === 'en' ? '' : `/${locale.code}`;
          const path = currentPath === '/' ? '' : currentPath.replace(/^\/(en|bn)\b/, '');
          const href = `${prefix}${path || '/'}`;

          return (
            <a
              key={locale.code}
              href={href}
              hrefLang={locale.code}
              className={cn(
                'rounded px-2 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                isActive
                  ? 'bg-ink text-white'
                  : 'text-text-secondary hover:bg-bg-muted'
              )}
              aria-current={isActive ? 'true' : undefined}
            >
              {locale.label}
            </a>
          );
        })}
      </div>
    );
  }
);
LanguageSwitcher.displayName = 'LanguageSwitcher';

export { LanguageSwitcher };
