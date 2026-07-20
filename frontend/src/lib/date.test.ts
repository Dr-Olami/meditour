import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('formats dates in English', () => {
    const date = new Date('2026-07-19');
    expect(formatDate(date, 'en')).toContain('July');
    expect(formatDate(date, 'en')).toContain('2026');
  });

  it('formats dates in Bangla', () => {
    const date = new Date('2026-07-19');
    const formatted = formatDate(date, 'bn');
    expect(formatted).toContain('জুলাই');
    expect(formatted).toContain('২০২৬');
  });
});
