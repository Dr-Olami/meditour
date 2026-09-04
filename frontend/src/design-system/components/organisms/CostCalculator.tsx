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
        `Hi Khan Meditour, I checked the estimate for ${selected.name} (range ${selected.fromPrice}–${selected.toPrice}) and would like an exact quote for my case.`,
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
              onChange={(e) => setSelectedSlug(e.target.value)}
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
              <p className="mt-6 text-sm leading-relaxed text-ink/50">
                {labels.selectPrompt}
              </p>
            )}

            {/* Quick treatment list for mobile tapping */}
            {!selected && (
              <div className="mt-4 flex flex-wrap gap-2">
                {treatments.slice(0, 6).map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => setSelectedSlug(t.slug)}
                    className="rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-violet-600 hover:text-violet-600"
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
                  <h3 className="font-display text-xl font-bold text-ink">
                    {selected.name}
                  </h3>
                  <span className="text-xs text-ink/40">· {labels.planningRange}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-semibold text-green-700">
                    &#10003; {labels.verified}
                  </span>
                </div>

                {/* Details table */}
                <dl className="mt-6 divide-y divide-cream-300">
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-sm text-ink/50">{labels.treatment}</dt>
                    <dd className="text-sm font-medium text-ink">{selected.name}</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-sm text-ink/50">{labels.indiaRange}</dt>
                    <dd className="text-sm font-semibold text-ink">
                      {selected.fromPrice}–{selected.toPrice}
                    </dd>
                  </div>
                  {extra && (
                    <>
                      <div className="flex items-center justify-between py-2.5">
                        <dt className="text-sm text-ink/50">{labels.usRange}</dt>
                        <dd className="text-sm text-ink/70">
                          {extra.usRange.from}–{extra.usRange.to}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-2.5">
                        <dt className="text-sm text-ink/50">{labels.indicativeSavings}</dt>
                        <dd className="text-sm font-semibold text-violet-600">
                          {extra.savings}
                        </dd>
                      </div>
                    </>
                  )}
                  {selected.category && (
                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-sm text-ink/50">{labels.category}</dt>
                      <dd className="text-sm font-medium text-ink">{selected.category}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-sm text-ink/50">{labels.quoteWindow}</dt>
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
                          <dt className="text-sm text-ink/70">{row.label}</dt>
                          <dd className="text-sm font-medium text-ink/80">
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
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-card bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
                >
                  {labels.getExactQuote}
                </a>
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center">
                <p className="text-center text-sm text-ink/40">
                  {labels.selectPrompt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer — always visible */}
        <p className="mt-6 text-xs leading-relaxed text-ink/50">
          {labels.disclaimer}
        </p>
      </div>
    );
  }
);

CostCalculator.displayName = 'CostCalculator';
export { CostCalculator };
