import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface Doctor {
  name: string;
  specialty: string;
  hospitalName?: string;
  hospitalHref?: string;
  qualification?: string;
  experience?: string;
  experienceYears?: number;
  avatar?: string;
  href?: string;
}

export interface DoctorCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  doctor: Doctor;
  bookLabel?: string;
}

/**
 * Doctor profile card with avatar, specialty badge, and a consultation CTA.
 * The entire card is a link so the whole surface is clickable.
 */
const DoctorCard = React.forwardRef<HTMLAnchorElement, DoctorCardProps>(
  ({ className, doctor, bookLabel = 'Request appointment', ...props }, ref) => {
    return (
      <a
        href={doctor.href ?? '#contact'}
        className={cn(
          'group flex flex-col rounded-card border border-cream-300 bg-cream-100 p-5 shadow-base transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
          className
        )}
        ref={ref}
        data-anim="tilt-card"
        {...props}
      >
        {/* Avatar */}
        <div className="mb-4 flex items-center gap-4">
          {doctor.avatar ? (
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink text-xl font-bold text-cream-100">
              {doctor.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-bold leading-tight text-ink">
              {doctor.name}
            </h3>
            {doctor.qualification && (
              <p className="text-xs text-ink/50">{doctor.qualification}</p>
            )}
          </div>
        </div>

        {/* Specialty badge */}
        <span className="inline-block self-start rounded-full bg-cream-300 px-3 py-1 text-xs font-semibold text-ink/70">
          {doctor.specialty}
        </span>

        {/* Meta */}
        <div className="mt-3 space-y-1">
          {doctor.hospitalName && (
            <p className="text-sm text-ink/60">
              {doctor.hospitalHref ? (
                <span className="inline-flex items-center gap-1">
                  {doctor.hospitalName}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              ) : (
                doctor.hospitalName
              )}
            </p>
          )}
          {doctor.experience && (
            <p className="text-sm text-ink/50">{doctor.experience}</p>
          )}
          {!doctor.experience && doctor.experienceYears !== undefined && (
            <p className="text-sm text-ink/50">{doctor.experienceYears} years experience</p>
          )}
        </div>

        {/* CTA — gradient "Book Now" + circular arrow badge */}
        <span className="mt-5 inline-flex w-full items-center justify-between rounded-card bg-gradient-to-r from-violet-600 to-indigo-600 pl-5 pr-2 py-2 text-sm font-semibold text-white no-underline shadow-md transition-opacity group-hover:opacity-90">
          <span>{bookLabel}</span>
          {/* Circular arrow badge */}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </span>
      </a>
    );
  }
);
DoctorCard.displayName = 'DoctorCard';

export { DoctorCard };
