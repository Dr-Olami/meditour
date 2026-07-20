import * as React from 'react';
import { TreatmentCard, type Treatment } from '../design-system/components/organisms/TreatmentCard';
import { FilterChips } from '../design-system/components/organisms/FilterChips';

export interface TreatmentsPageProps {
  title: string;
  subtitle: string;
  filterAll: string;
  treatments: Treatment[];
  fromLabel: string;
}

/**
 * Client-interactive treatments listing page with category FilterChips.
 */
export function TreatmentsPage({ title, subtitle, filterAll, treatments, fromLabel }: TreatmentsPageProps) {
  const categories = React.useMemo(() => {
    const unique = Array.from(
      new Set(
        treatments
          .map((t) => (t as unknown as { category?: string }).category)
          .filter(Boolean) as string[]
      )
    );
    return [filterAll, ...unique];
  }, [treatments, filterAll]);

  const [active, setActive] = React.useState(filterAll);

  const filtered = React.useMemo(
    () =>
      active === filterAll
        ? treatments
        : treatments.filter((t) => (t as unknown as { category?: string }).category === active),
    [active, filterAll, treatments]
  );

  return (
    <div className="container py-16 pt-32">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-ink/60">{subtitle}</p>
      </div>

      {categories.length > 1 && (
        <FilterChips options={categories} active={active} onSelect={setActive} className="mb-10" />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((treatment) => (
          <TreatmentCard key={treatment.name} treatment={treatment} fromLabel={fromLabel} />
        ))}
      </div>
    </div>
  );
}
