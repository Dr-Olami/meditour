import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface MapEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Google Maps embed URL (q=...&output=embed format). */
  src: string;
  /** Hospital name shown in the iframe title and alt text. */
  name: string;
  /** Address shown below the map. */
  address?: string;
  /** Label for the "open in Google Maps" link. */
  openLabel?: string;
  /** Latitude for the static map thumbnail. */
  latitude?: number;
  /** Longitude for the static map thumbnail. */
  longitude?: number;
}

/**
 * Click-to-load Google Maps embed with a static map thumbnail facade.
 *
 * Shows a real OpenStreetMap static map image (a single lightweight PNG,
 * ~30-50KB) with a pin marker and a "click to interact" overlay. The
 * full interactive Google Maps iframe (~500KB-1MB) is only loaded when
 * the user clicks.
 *
 * Reason: The static OSM image gives users a visual sense of the
 * hospital's location without the heavy cost of the full Maps iframe.
 * Most visitors who scroll to "How to Reach" just want to see where the
 * hospital is — the static image satisfies that. Those who need
 * turn-by-turn directions or interaction can click to load the full map.
 */
const MapEmbed = React.forwardRef<HTMLDivElement, MapEmbedProps>(
  (
    {
      className,
      src,
      name,
      address,
      openLabel = 'Open in Google Maps',
      latitude,
      longitude,
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = React.useState(false);
    const [imgError, setImgError] = React.useState(false);

    // Reason: derive the non-embed URL by stripping output=embed so the
    // "open in Google Maps" link takes the user to the full maps page.
    const directUrl = src.replace('&output=embed', '').replace('output=embed&', '');

    // Reason: OSM static map service is free, needs no API key, and
    // returns a single PNG tile image — far lighter than the full
    // Google Maps iframe. Fall back to the pin-icon facade if the
    // image fails to load or coordinates are missing.
    const hasCoords = latitude != null && longitude != null;
    const staticMapUrl = hasCoords
      ? `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=15&size=600x400&markers=${latitude},${longitude},red-pushpin`
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-card border border-cream-300 shadow-base',
          className
        )}
        {...props}
      >
        {loaded ? (
          <iframe
            src={src}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${name} location map`}
            className="block w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group relative flex h-[400px] w-full items-center justify-center overflow-hidden bg-cream-100"
            aria-label={`Load interactive map for ${name}`}
          >
            {/* Static map image facade */}
            {staticMapUrl && !imgError ? (
              <img
                src={staticMapUrl}
                alt={`${name} location map`}
                width={600}
                height={400}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Fallback: decorative pin background if image fails */
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 40%, currentColor 0, transparent 60%)',
                }}
              />
            )}

            {/* Darkening overlay so the CTA button is readable on the map image */}
            <div className="bg-ink/20 group-hover:bg-ink/30 absolute inset-0 transition-colors" />

            {/* Pin marker at center */}
            <svg
              className="relative h-12 w-12 drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#7c3aed"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            {/* CTA button */}
            <span className="absolute bottom-6 rounded-full bg-white/95 px-5 py-2 text-sm font-medium text-violet-700 shadow-md backdrop-blur-sm transition-transform group-hover:scale-105">
              📍 Click to load interactive map
            </span>
          </button>
        )}
        {address && (
          <p className="text-ink/60 border-t border-cream-200 px-5 py-3 text-sm">
            <span className="text-ink/80 font-medium">{address}</span>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-block font-medium text-violet-600 hover:text-violet-700 hover:underline"
            >
              {openLabel} →
            </a>
          </p>
        )}
      </div>
    );
  }
);

MapEmbed.displayName = 'MapEmbed';

export { MapEmbed };
