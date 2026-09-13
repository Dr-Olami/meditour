/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      // Enforce design-system boundary: DS files must never import from features/
      files: ['src/design-system/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['**/features/**'],
                message:
                  'design-system/* must not import from features/*. Keep the dependency arrow one-way.',
              },
            ],
          },
        ],
      },
    },
    {
      // Reason: carousel scroll containers use role="region" + tabIndex={0}
      // so keyboard users can scroll them (WCAG 2.1 SC 2.1.1, axe
      // scrollable-region-focusable). jsx-a11y/no-noninteractive-tabindex
      // doesn't recognize role="region" as interactive, so disable it
      // for the three carousel components.
      files: [
        'src/design-system/components/organisms/TestimonialCarousel.tsx',
        'src/design-system/components/organisms/EquipmentCarousel.tsx',
        'src/design-system/components/molecules/StepCards.tsx',
      ],
      rules: {
        'jsx-a11y/no-noninteractive-tabindex': 'off',
      },
    },
  ],
  ignorePatterns: ['dist/', 'dist-clean/', '.astro/', 'node_modules/', '*.mjs'],
};
