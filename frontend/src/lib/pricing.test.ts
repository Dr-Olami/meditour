import { describe, it, expect } from 'vitest';
import { parsePrice } from './pricing';

describe('parsePrice', () => {
  it('parses formatted USD price strings', () => {
    expect(parsePrice('$1,500')).toBe(1500);
  });

  it('parses plain numeric price strings', () => {
    expect(parsePrice('2500')).toBe(2500);
  });

  it('returns 0 for undefined', () => {
    expect(parsePrice(undefined)).toBe(0);
  });

  it('returns 0 for non-numeric strings', () => {
    expect(parsePrice('Contact us')).toBe(0);
  });

  it('handles decimal values', () => {
    expect(parsePrice('$2,499.50')).toBe(2499.5);
  });
});
