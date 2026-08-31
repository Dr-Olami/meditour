import '@testing-library/jest-dom';

// Reason: jsdom does not implement ResizeObserver, but several components use
// it to measure carousel/track widths. Provide a no-op mock once for all tests.
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

// Reason: jsdom does not implement matchMedia, but gsap (used by the motion
// engine) calls it on import. Provide a no-op mock so tests that import the
// engine don't crash.
if (!globalThis.matchMedia) {
  globalThis.matchMedia = (() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof globalThis.matchMedia;
}
