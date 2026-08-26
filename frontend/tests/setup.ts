import '@testing-library/jest-dom';

// Reason: jsdom does not implement ResizeObserver, but several components use
// it to measure carousel/track widths. Provide a no-op mock once for all tests.
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;
