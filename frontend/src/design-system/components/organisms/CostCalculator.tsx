import * as React from 'react';
import { buildWhatsAppLink, getWhatsAppNumber } from '../../../lib/whatsapp';

export interface CostCalculatorTreatment {
  name: string;
  slug: string;
  fromPrice: string;
  toPrice: string;
  category?: string;
  duration?: string;
  hospitalStay?: string;
  recoveryTime?: string;
}

export interface CostBreakdownItem {
  label: string;
  percent: number;
}

export interface TreatmentCostData {
  usRange: { from: string; to: string };
  savings: string;
  breakdown: CostBreakdownItem[];
}

export interface CostCalculatorProps {
  treatments: CostCalculatorTreatment[];
  costData: Record<string, TreatmentCostData>;
  labels: {
    selectTreatment: string;
    placeholder: string;
    yourEstimate: string;
    planningRange: string;
    verified: string;
    treatment: string;
    indiaRange: string;
    usRange: string;
    indicativeSavings: string;
    category: string;
    quoteWindow: string;
    quoteWindowValue: string;
    inTheRange: string;
    getExactQuote: string;
    disclaimer: string;
    selectPrompt: string;
    procedureDuration: string;
    hospitalStay: string;
    recoveryTime: string;
    tripCostTitle: string;
    tripCostSubtitle: string;
    tripCostFlights: string;
    tripCostAccommodation: string;
    tripCostTransfers: string;
    tripCostVisa: string;
    tripCostMeals: string;
    tripCostDisclaimer: string;
    currencyNote: string;
    currencyCta: string;
  };
}

/** Parse a price string like "$2,500" into a number. */
function parsePrice(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

/** Format a number back to a dollar string. */
function formatPrice(n: number): string {
  return `$${n.toLocaleString()}`;
}

const CostCalculator = React.forwardRef<HTMLDivElement, CostCalculatorProps>(
  ({ treatments, costData, labels }, ref) => {
    const [selectedSlug, setSelectedSlug] = React.useState<string>('');
    const selected = treatments.find((t) => t.slug === selectedSlug);
    const extra = selectedSlug ? costData[selectedSlug] : undefined;

    const quoteHref = React.useMemo(() => {
      const number = getWhatsAppNumber();
      if (!number || !selected) return '';
      return buildWhatsAppLink(
        number,
        `Hi Khan Meditour, I checked the estimate for ${selected.name} (range ${selected.fromPrice}–${selected.toPrice}) and would like an exact quote for my case.`
      );
    }, [selected]);

    const currencyHref = React.useMemo(() => {
      const number = getWhatsAppNumber();
      if (!number || !selected) return '';
      return buildWhatsAppLink(
        number,
        `Hi Khan Meditour, I checked the estimate for ${selected.name} (range ${selected.fromPrice}–${selected.toPrice}) and would like a quote in my local currency.`
      );
    }, [selected]);

    // Compute breakdown line items from the India range and percentages
    const breakdownRows = React.useMemo(() => {
      if (!selected || !extra) return [];
      const from = parsePrice(selected.fromPrice);
      const to = parsePrice(selected.toPrice);
      return extra.breakdown.map((item) => ({
        label: item.label,
        from: formatPrice(Math.round((from * item.percent) / 100)),
        to: formatPrice(Math.round((to * item.percent) / 100)),
      }));
    }, [selected, extra]);

    return (
      <div ref={ref}>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-8">
          {/* ── LEFT: selector ─────────────────────────────────────── */}
          <div className="rounded-card border border-cream-300 bg-cream-100 p-6">
            <label htmlFor="cost-treatment" className="block text-sm font-semibold text-ink">
              {labels.selectTreatment}
            </label>
            <select
              id="cost-treatment"
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                // Reason: push to dataLayer so GTM can fire the
                // cost_calculator_complete conversion event when a user
                // selects a treatment and views an estimate.
                if (e.target.value && typeof window !== 'undefined') {
                  const treatment = treatments.find((t) => t.slug === e.target.value);
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'cost_calculator_complete',
                    treatment_name: treatment?.name || e.target.value,
                    treatment_slug: e.target.value,
                  });
                }
              }}
              className="mt-3 w-full rounded-card border border-cream-300 bg-white px-4 py-3 text-sm font-medium text-ink focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              <option value="">{labels.placeholder}</option>
              {treatments.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Prompt when nothing is selected */}
            {!selected && (
              <p className="text-ink/50 mt-6 text-sm leading-relaxed">{labels.selectPrompt}</p>
            )}

            {/* Quick treatment list for mobile tapping */}
            {!selected && (
              <div className="mt-4 flex flex-wrap gap-2">
                {treatments.slice(0, 6).map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => setSelectedSlug(t.slug)}
                    className="text-ink/70 rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-medium hover:border-violet-600 hover:text-violet-600"
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: estimate ────────────────────────────────────── */}
          <div className="rounded-card border border-cream-300 bg-cream-100 p-6 md:p-8">
            {selected ? (
              <div>
                {/* Header */}
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                  {labels.yourEstimate}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">{selected.name}</h3>
                  <span className="text-ink/40 text-xs">· {labels.planningRange}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-semibold text-green-700">
                    &#10003; {labels.verified}
                  </span>
                </div>

                {/* Details table */}
                <dl className="mt-6 divide-y divide-cream-300">
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-ink/50 text-sm">{labels.treatment}</dt>
                    <dd className="text-sm font-medium text-ink">{selected.name}</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-ink/50 text-sm">{labels.indiaRange}</dt>
                    <dd className="text-sm font-semibold text-ink">
                      {selected.fromPrice}–{selected.toPrice}
                    </dd>
                  </div>
                  {extra && (
                    <>
                      <div className="flex items-center justify-between py-2.5">
                        <dt className="text-ink/50 text-sm">{labels.usRange}</dt>
                        <dd className="text-ink/70 text-sm">
                          {extra.usRange.from}–{extra.usRange.to}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-2.5">
                        <dt className="text-ink/50 text-sm">{labels.indicativeSavings}</dt>
                        <dd className="text-sm font-semibold text-violet-600">{extra.savings}</dd>
                      </div>
                    </>
                  )}
                  {selected.category && (
                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-ink/50 text-sm">{labels.category}</dt>
                      <dd className="text-sm font-medium text-ink">{selected.category}</dd>
                    </div>
                  )}
                  {selected.duration && (
                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-ink/50 text-sm">{labels.procedureDuration}</dt>
                      <dd className="text-sm font-medium text-ink">{selected.duration}</dd>
                    </div>
                  )}
                  {selected.hospitalStay && (
                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-ink/50 text-sm">{labels.hospitalStay}</dt>
                      <dd className="text-sm font-medium text-ink">{selected.hospitalStay}</dd>
                    </div>
                  )}
                  {selected.recoveryTime && (
                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-ink/50 text-sm">{labels.recoveryTime}</dt>
                      <dd className="text-sm font-medium text-ink">{selected.recoveryTime}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-ink/50 text-sm">{labels.quoteWindow}</dt>
                    <dd className="text-sm font-medium text-ink">{labels.quoteWindowValue}</dd>
                  </div>
                </dl>

                {/* Breakdown */}
                {breakdownRows.length > 0 && (
                  <div className="mt-6 border-t border-cream-300 pt-4">
                    <p className="text-sm font-semibold text-ink">{labels.inTheRange}</p>
                    <dl className="mt-3 space-y-2.5">
                      {breakdownRows.map((row) => (
                        <div key={row.label} className="flex items-center justify-between">
                          <dt className="text-ink/70 text-sm">{row.label}</dt>
                          <dd className="text-ink/80 text-sm font-medium">
                            {row.from}–{row.to}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* CTA */}
                <a
                  href={quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-ink/90 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-card bg-ink px-6 py-3 text-sm font-semibold text-white"
                >
                  {labels.getExactQuote}
                </a>

                {/* Total trip cost estimate */}
                <div className="bg-cream-200/50 mt-6 rounded-card border border-cream-300 p-5">
                  <p className="text-sm font-semibold text-ink">{labels.tripCostTitle}</p>
                  <p className="text-ink/50 mt-1 text-xs leading-relaxed">
                    {labels.tripCostSubtitle}
                  </p>
                  <dl className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <dt className="text-ink/70 text-sm">{labels.tripCostFlights}</dt>
                      <dd className="text-ink/80 text-sm font-medium">$200–$1,200</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-ink/70 text-sm">{labels.tripCostAccommodation}</dt>
                      <dd className="text-ink/80 text-sm font-medium">$6–$96</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-ink/70 text-sm">{labels.tripCostTransfers}</dt>
                      <dd className="text-ink/80 text-sm font-medium">$15–$40</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-ink/70 text-sm">{labels.tripCostVisa}</dt>
                      <dd className="text-ink/80 text-sm font-medium">$25–$80</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-ink/70 text-sm">{labels.tripCostMeals}</dt>
                      <dd className="text-ink/80 text-sm font-medium">$4–$10</dd>
                    </div>
                  </dl>
                  <p className="text-ink/50 mt-4 text-xs leading-relaxed">
                    {labels.tripCostDisclaimer}
                  </p>
                </div>

                {/* Currency conversion note */}
                <div className="mt-4 rounded-card border border-cream-300 bg-cream-100 p-4">
                  <p className="text-ink/70 text-xs leading-relaxed">{labels.currencyNote}</p>
                  <a
                    href={currencyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
                  >
                    {labels.currencyCta}
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center">
                <p className="text-ink/40 text-center text-sm">{labels.selectPrompt}</p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer — always visible */}
        <p className="text-ink/50 mt-6 text-xs leading-relaxed">{labels.disclaimer}</p>
      </div>
    );
  }
);

CostCalculator.displayName = 'CostCalculator';
export { CostCalculator };
