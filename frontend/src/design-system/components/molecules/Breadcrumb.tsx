import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Link } from '../atoms/Link';
import { Icon } from '../atoms/Icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  items: BreadcrumbItem[];
}

/**
 * Accessible breadcrumb navigation.
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav aria-label="Breadcrumb" ref={ref} {...props}>
        <ol className={cn('flex flex-wrap items-center gap-2 text-sm', className)}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-2">
                {index > 0 && (
                  <Icon name="chevron-right" size={14} className="text-text-muted" />
                )}
                {item.href && !isLast ? (
                  <Link href={item.href} underline="none">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-text-primary" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
