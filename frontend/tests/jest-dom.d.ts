/**
 * Type-graph entry point for @testing-library/jest-dom vitest matchers.
 *
 * `tests/setup.ts` imports `@testing-library/jest-dom` at runtime so the
 * matchers exist when vitest runs, but the TypeScript language server only
 * typechecks files that are either in `tsconfig.json`'s `include` or
 * currently open in the editor. Test files under `tests/**` are not in the
 * include array, so without this ambient reference the jest-dom augmentation
 * of vitest's `Assertion` type is not visible and matchers like
 * `toBeInTheDocument` raise TS errors.
 *
 * The `./vitest` subpath loads the vitest-specific augmentation (the package
 * root entry point targets jest, which is not installed here). Including this
 * `.d.ts` in `tsconfig.json` loads the augmentation into the program's type
 * graph, making it visible to every test file the TS server checks.
 */
import '@testing-library/jest-dom/vitest';
