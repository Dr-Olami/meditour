import * as React from 'react';
import { HospitalCard, type Hospital } from '../design-system/components/organisms/HospitalCard';

export interface HospitalsPageProps {
  title: string;
  subtitle: string;
  hospitals: Hospital[];
  viewLabel: string;
  locale: string;
}

/**
 * Static hospitals listing page rendered as a responsive grid.
 */
export function HospitalsPage({ title, subtitle, hospitals, viewLabel, locale }: HospitalsPageProps) {
  return (
    <div className="container py-16 pt-32">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-ink/60">{subtitle}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.slug}
            hospital={hospital}
            viewLabel={viewLabel}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
