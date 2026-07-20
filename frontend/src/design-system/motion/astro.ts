import { initAnimations } from './engine';

/**
 * Initialise GSAP animations for the full Astro document.
 * Place in a client-side `<script>` tag in `Layout.astro`.
 */
export function initPageAnimations(): void {
  if (typeof document === 'undefined') return;
  initAnimations(document);
}

initPageAnimations();
