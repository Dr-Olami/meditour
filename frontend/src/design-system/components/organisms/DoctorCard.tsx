import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../atoms/Icon';

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
  whatsappHref?: string;
}

export interface DoctorCardProps extends React.HTMLAttributes<HTMLElement> {
  doctor: Doctor;
  bookLabel?: string;
  whatsappLabel?: string;
}

/**
 * Doctor profile card in a horizontal split layout: a full-height portrait
 * panel on the left, and name, specialty, qualification, hospital and
 * experience on the right, with "Book Now" + WhatsApp CTAs at the bottom.
 * Stacks vertically (photo on top) on small screens.
 */
const DoctorCard = React.forwardRef<HTMLElement, DoctorCardProps>(
  (
    { className, doctor, bookLabel = 'Request appointment', whatsappLabel = 'WhatsApp', ...props },
    ref
  ) => {
    const profileHref = doctor.href ?? '#contact';
    return (
      <article
        className={cn(
          'group flex flex-col overflow-hidden rounded-card border border-cream-300 bg-cream-100 shadow-base transition-shadow hover:shadow-lg sm:flex-row',
          className
        )}
        ref={ref}
        data-anim="tilt-card"
        {...props}
      >
        {/* Portrait panel — object-top keeps faces from being cropped */}
        <a
          href={profileHref}
          aria-label={doctor.name}
          className="relative block h-52 w-full shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:h-auto sm:w-2/5"
        >
          {doctor.avatar ? (
            <img
              src={doctor.avatar}
              alt={doctor.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ink font-display text-4xl font-bold text-cream-100">
              {doctor.name.charAt(0)}
            </div>
          )}
        </a>

        {/* Details */}
        <div className="flex flex-1 flex-col p-5">
          <span className="inline-block self-start rounded-full bg-cream-300 px-3 py-1 text-xs font-semibold text-ink/70">
            {doctor.specialty}
          </span>

          <h3 className="mt-3 font-display text-lg font-bold leading-tight text-ink">
            <a
              href={profileHref}
              className="transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              {doctor.name}
            </a>
          </h3>

          {doctor.qualification && (
            <p className="mt-1 line-clamp-2 text-xs text-ink/50">{doctor.qualification}</p>
          )}

          <div className="mt-3 space-y-1.5">
            {doctor.hospitalName && (
              <p className="flex items-start gap-1.5 text-sm text-ink/60">
                <Icon name="map-pin" size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{doctor.hospitalName}</span>
              </p>
            )}
            {doctor.experience && (
              <p className="flex items-start gap-1.5 text-sm text-ink/50">
                {/* Clock icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{doctor.experience}</span>
              </p>
            )}
            {!doctor.experience && doctor.experienceYears !== undefined && (
              <p className="flex items-start gap-1.5 text-sm text-ink/50">
                {/* Clock icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{doctor.experienceYears} years experience</span>
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-auto flex items-stretch gap-2 pt-4">
            <a
              href={profileHref}
              className="cta-gradient flex flex-1 items-center justify-between rounded-card py-2 pl-4 pr-2 text-sm font-semibold no-underline shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <span>{bookLabel}</span>
              {/* Circular arrow badge */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            {doctor.whatsappHref && (
              <a
                href={doctor.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${whatsappLabel} — ${doctor.name}`}
                className="flex items-center justify-center gap-1.5 rounded-card border border-ink/20 px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <Icon name="whatsapp" size={16} aria-hidden="true" />
                <span className="hidden xl:inline">{whatsappLabel}</span>
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }
);
DoctorCard.displayName = 'DoctorCard';

export { DoctorCard };
