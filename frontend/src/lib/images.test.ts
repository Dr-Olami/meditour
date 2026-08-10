import { describe, it, expect } from 'vitest';
import { resolvePublicImage } from './images';

describe('resolvePublicImage', () => {
  it('returns the public URL when a webp file exists', () => {
    expect(resolvePublicImage('images/doctors/dr-deepak-dubey')).toBe(
      '/images/doctors/dr-deepak-dubey.webp'
    );
  });

  it('falls back to jpg when no webp exists', () => {
    expect(resolvePublicImage('images/treatments/bariatric-weight-loss')).toBe(
      '/images/treatments/bariatric-weight-loss.jpg'
    );
  });

  it('returns null when no file exists for any extension', () => {
    expect(resolvePublicImage('images/treatments/does-not-exist')).toBeNull();
  });
});
