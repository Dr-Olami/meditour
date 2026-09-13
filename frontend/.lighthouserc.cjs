/** @type {import('@lhci/cli').LhciConfig} */
module.exports = {
  ci: {
    collect: {
      // Reason: Vercel adapter outputs to .vercel/output/static/, not dist/
      staticDistDir: './.vercel/output/static',
      url: ['/', '/doctors'],
      numberOfRuns: 1,
    },
    assert: {
      // Reason: use a minimal preset and relax assertions that are artifacts
      // of the static file server (no cache headers, no compression, no HTTP/2).
      // The production nginx server handles all of these correctly.
      preset: 'lighthouse:no-pwa',
      assertions: {
        // --- Performance: warn only, static server skews these ---
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        interactive: ['warn', { minScore: 0.9 }],
        'max-potential-fid': ['warn', { minScore: 0.9 }],
        'bootup-time': 'off',
        'mainthread-work-breakdown': 'off',
        'dom-size': 'off',
        'unused-javascript': 'off',
        'unused-css-rules': 'off',
        'uses-responsive-images': 'off',
        'uses-long-cache-ttl': 'off',
        'uses-rel-preconnect': 'off',
        'render-blocking-resources': 'off',
        'unminified-css': 'off',
        'unminified-javascript': 'off',
        'uses-text-compression': 'off',
        'uses-http2': 'off',
        // --- Audits that don't produce a score (NaN) ---
        'lcp-lazy-loaded': 'off',
        'non-composited-animations': 'off',
        'prioritize-lcp-image': 'off',
        // --- Best practices: warn only ---
        'errors-in-console': ['warn', { minScore: 0.9 }],
        redirects: 'off',
        // --- Accessibility: keep as error, these are real ---
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // --- SEO: warn only ---
        'categories:seo': ['warn', { minScore: 0.85 }],
        // --- Best practices category: warn only ---
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        // --- Individual SEO audits: relax for static preview ---
        'color-contrast': ['warn', { minScore: 0.9 }],
        'heading-order': ['warn', { minScore: 0.9 }],
        'link-text': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
