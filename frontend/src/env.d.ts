/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Reason: Google Tag Manager pushes objects to window.dataLayer. Declaring
// the type here avoids `any` casts at every call site.
interface Window {
  dataLayer?: Record<string, unknown>[];
}
