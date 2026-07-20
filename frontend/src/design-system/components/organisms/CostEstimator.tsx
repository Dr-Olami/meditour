import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/Button';

export interface CostEstimatorOption {
  value: string;
  label: string;
  cost: number;
}

export interface CostEstimatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  treatments: CostEstimatorOption[];
  accommodations: CostEstimatorOption[];
  disclaimer?: string;
  quoteCta?: string;
  fallbackQuoteHref?: string;
  getQuoteHref?: (treatmentLabel: string, total: number) => string;
}

/**
 * Interactive cost estimator organism.
 */
const CostEstimator = React.forwardRef<HTMLDivElement, CostEstimatorProps>(
  (
    {
      className,
      treatments,
      accommodations,
      disclaimer = 'This is an estimate only. Your final cost breakdown is confirmed by our medical team within 3–5 days.',
      quoteCta = 'Get a detailed quote',
      fallbackQuoteHref = '/contact#contact',
      getQuoteHref,
      ...props
    },
    ref
  ) => {
    const [treatment, setTreatment] = React.useState(treatments[0]?.value ?? '');
    const [accommodation, setAccommodation] = React.useState(
      accommodations[0]?.value ?? ''
    );

    const treatmentOption = treatments.find((t) => t.value === treatment);
    const treatmentCost = treatmentOption?.cost ?? 0;
    const accommodationCost =
      accommodations.find((a) => a.value === accommodation)?.cost ?? 0;
    const total = treatmentCost + accommodationCost;

    const quoteHref = getQuoteHref
      ? getQuoteHref(treatmentOption?.label ?? treatment, total)
      : fallbackQuoteHref;

    return (
      <div
        className={cn(
          'rounded-2xl border border-border-default bg-bg-subtle p-6 shadow-base md:p-8',
          className
        )}
        ref={ref}
        {...props}
      >
        <h3 className="mb-6 text-2xl font-semibold">Estimate your trip cost</h3>
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="est-treatment">
              Treatment
            </label>
            <Select
              id="est-treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            >
              {treatments.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} — ${t.cost.toLocaleString()}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="est-accommodation">
              Accommodation
            </label>
            <Select
              id="est-accommodation"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
            >
              {accommodations.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label} — ${a.cost.toLocaleString()}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-6 sm:flex-row">
          <div>
            <p className="text-sm text-text-muted">Estimated total</p>
            <p className="text-4xl font-bold text-ink">
              ${total.toLocaleString()}
            </p>
          </div>
          <Button size="lg" asChild>
            <a href={quoteHref}>{quoteCta}</a>
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-text-muted">{disclaimer}</p>
      </div>
    );
  }
);
CostEstimator.displayName = 'CostEstimator';

export { CostEstimator };
