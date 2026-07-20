import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface Hospital {
  slug: string;
  name: string;
  city: string;
  country: string;
  image?: string;
  accreditations?: string[];
}

export interface HospitalCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  hospital: Hospital;
  viewLabel?: string;
  locale?: string;
}

/**
 * Hospital card matching the visual language of DoctorCard.
 * The whole card links to the hospital detail page.
 */
const HospitalCard = React.forwardRef<HTMLAnchorElement, HospitalCardProps>(
  ({ className, hospital, viewLabel = 'View hospital', locale = 'en', ...props }, ref) => {
    const href = locale === 'bn' ? `/bn/hospitals/${hospital.slug}` : `/hospitals/${hospital.slug}`;

    return (
      <a
        href={href}
        className={cn(
          'group flex flex-col overflow-hidden rounded-card border border-cream-300 bg-cream-100 shadow-base transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
          className
        )}
        ref={ref}
        data-anim="tilt-card"
        {...props}
      >
        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden rounded-t-card bg-cream-200">
          {hospital.image ? (
            <img
              src={hospital.image}
              alt={hospital.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink/30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold leading-tight text-ink">
            {hospital.name}
          </h3>
          <p className="mt-1 text-sm text-ink/60">
            {hospital.city}, {hospital.country}
          </p>

          {hospital.accreditations && hospital.accreditations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {hospital.accreditations.map((badge) => (
                <span
                  key={badge}
                  className="inline-block rounded-full bg-cream-300 px-2.5 py-1 text-xs font-medium text-ink/70"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <span className="mt-5 inline-flex w-full items-center justify-between rounded-card bg-ink pl-5 pr-2 py-2 text-sm font-semibold text-white no-underline shadow-md">
            <span>{viewLabel}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </span>
        </div>
      </a>
    );
  }
);
HospitalCard.displayName = 'HospitalCard';

export { HospitalCard };
