import * as React from 'react';
import { DoctorCard, type Doctor } from '../design-system/components/organisms/DoctorCard';
import { FilterChips } from '../design-system/components/organisms/FilterChips';

export interface DoctorsPageProps {
  title: string;
  subtitle: string;
  filterAll: string;
  bookCta: string;
  doctors: Doctor[];
}

/**
 * Client-interactive Doctors listing page with specialty FilterChips.
 * Rendered as a React island (client:load) so filtering works without JS SSR.
 */
export function DoctorsPage({ title, subtitle, filterAll, bookCta, doctors }: DoctorsPageProps) {
  const specialties = React.useMemo(() => {
    const unique = Array.from(new Set(doctors.map((d) => d.specialty)));
    return [filterAll, ...unique];
  }, [doctors, filterAll]);

  const [active, setActive] = React.useState(filterAll);

  const filtered = React.useMemo(
    () => (active === filterAll ? doctors : doctors.filter((d) => d.specialty === active)),
    [active, doctors, filterAll]
  );

  return (
    <div className="container py-16 pt-32">
      {/* Page header */}
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-ink/60">{subtitle}</p>
      </div>

      {/* Filter chips */}
      <FilterChips
        options={specialties}
        active={active}
        onSelect={setActive}
        className="mb-10"
      />

      {/* Doctor grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doctor) => (
          <DoctorCard key={doctor.name} doctor={doctor} bookLabel={bookCta} />
        ))}
      </div>
    </div>
  );
}
