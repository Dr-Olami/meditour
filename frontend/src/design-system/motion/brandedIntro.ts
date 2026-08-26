/**
 * Branded intro loader — gating + timing logic.
 *
 * Pure helpers extracted so the inline Astro script in `BrandedIntro.astro`
 * stays thin and the behaviour is unit-testable without a DOM. The Astro
 * component duplicates the small amount of decision logic inline (so it can
 * run synchronously during parse via `is:inline` and avoid a first-paint
 * flash), but the canonical source of truth for timings + the storage key
 * lives here.
 */

/** sessionStorage key used to remember that the intro has played. */
export const INTRO_STORAGE_KEY = 'khan:branded-intro-seen';

/**
 * Intro phase durations in milliseconds.
 *
 * The total MUST stay at or below 1200ms per the UX spec — a branded intro
 * longer than ~1.2s starts to feel like a barrier rather than a moment.
 */
export const INTRO_TIMINGS = {
  /** Wordmark draw-in (left→right clip reveal + rule scale). */
  drawIn: 600,
  /** Hold fully-visible before wiping away. */
  hold: 300,
  /** Wipe-away (overlay slides up + fades). */
  wipe: 300,
} as const;

/** Total intro duration in milliseconds. */
export const INTRO_TOTAL_MS =
  INTRO_TIMINGS.drawIn + INTRO_TIMINGS.hold + INTRO_TIMINGS.wipe;

/**
 * Decide whether the branded intro should play on this visit.
 *
 * @param storage - Storage-like object (sessionStorage in the browser).
 * @param prefersReducedMotion - Whether the user requested reduced motion.
 * @returns True if the intro should be shown.
 */
export function shouldShowIntro(
  storage: Pick<Storage, 'getItem'>,
  prefersReducedMotion: boolean
): boolean {
  // Reason: reduced-motion users get the content immediately, no animation.
  if (prefersReducedMotion) return false;
  return storage.getItem(INTRO_STORAGE_KEY) !== '1';
}

/**
 * Mark the intro as seen so it does not replay this session.
 *
 * Silently ignores storage failures (private mode / sandboxed iframes) —
 * failing to persist must never break the page.
 *
 * @param storage - Storage-like object (sessionStorage in the browser).
 */
export function markIntroSeen(storage: Pick<Storage, 'setItem'>): void {
  try {
    storage.setItem(INTRO_STORAGE_KEY, '1');
  } catch {
    // Reason: sessionStorage can throw in private-mode / sandboxed iframes;
    // failing to persist must never break the page.
  }
}
