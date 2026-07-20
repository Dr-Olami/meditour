import { describe, it, expect } from 'vitest';
import { entrySlug } from '../../src/lib/slug';

describe('entrySlug', () => {
  it('strips the locale subfolder from an entry id', () => {
    expect(entrySlug({ id: 'en/dr-rajesh-sharma' })).toBe('dr-rajesh-sharma');
    expect(entrySlug({ id: 'bn/dr-rajesh-sharma' })).toBe('dr-rajesh-sharma');
  });

  it('strips the file extension if present', () => {
    expect(entrySlug({ id: 'en/dr-rajesh-sharma.md' })).toBe('dr-rajesh-sharma');
    expect(entrySlug({ id: 'bn/dr-rajesh-sharma.mdx' })).toBe('dr-rajesh-sharma');
  });

  it('returns the plain filename for legacy flat ids', () => {
    expect(entrySlug({ id: 'dr-rajesh-sharma' })).toBe('dr-rajesh-sharma');
  });

  it('preserves nested path segments after the locale', () => {
    expect(entrySlug({ id: 'en/team/dr-rajesh-sharma.md' })).toBe('team/dr-rajesh-sharma');
  });
});
