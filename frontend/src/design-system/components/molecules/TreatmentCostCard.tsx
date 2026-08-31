import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface TreatmentCostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Treatment slug for linking */
  slug: string;
  /** Display name of the treatment */
  name: string;
  /** Treatment category (e.g., "Cardiology", "Oncology") */
  category?: string;
  /** India cost in USD */
  indiaUSD: string;
  /** Local currency cost (optional) */
  localCurrency?: string;
  /** Local currency code (e.g., "NGN", "BDT") */
  currencyCode?: string;
  /** USA/comparison country cost */
  usaCost: string;
  /** Savings percentage (e.g., "~89% less") */
  savingsPercent: string;
}

/**
 * Treatment cost comparison card - mobile-first design.
 * 
 * Displays treatment costs in a card format optimized for mobile viewing,
 * with visual hierarchy and clear cost breakdowns. Based on competitor
 * analysis showing card-based layouts are more scannable than tables on
 * small screens.
 */
const TreatmentCostCard = React.forwardRef<HTMLDivElement, TreatmentCostCardProps>(
  (
    {
      className,
      slug,
      name,
      category,
      indiaUSD,
      localCurrency,
      currencyCode,
      usaCost,
      savingsPercent,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'group rounded-card border border-cream-300 bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Header with category and savings badge */}
        <div className="mb-3 flex items-start justify-between gap-3">
          {category && (
            <span className="inline-block rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-ink">
              {category}
            </span>
          )}
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {savingsPercent}
          </span>
        </div>

        {/* Treatment name */}
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">
          {name}
        </h3>

        {/* Cost breakdown */}
        <div className="space-y-3 border-t border-cream-200 pt-4">
          {/* India cost */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink">India</span>
            <span className="text-base font-bold text-ink">{indiaUSD}</span>
          </div>

          {/* Local currency (if provided) */}
          {localCurrency && currencyCode && (
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-ink/60">≈ {currencyCode}</span>
              <span className="text-sm text-ink/80">{localCurrency}</span>
            </div>
          )}

          {/* USA cost */}
          <div className="flex items-baseline justify-between border-t border-cream-200 pt-3">
            <span className="text-sm font-medium text-ink/60">Typical USA</span>
            <span className="text-base text-ink/60">{usaCost}</span>
          </div>
        </div>

        {/* Link to treatment details */}
        <a
          href={`/treatments/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700"
        >
          {name} details
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    );
  }
);
TreatmentCostCard.displayName = 'TreatmentCostCard';

export { TreatmentCostCard };
