import { describe, it, expect } from 'vitest';
import { parseCounterTarget } from '../../../src/design-system/motion/engine';

describe('parseCounterTarget', () => {
  // ─── Expected use ──────────────────────────────────────────────────────
  it('parses "3,500+" as 3500', () => {
    expect(parseCounterTarget('3,500+')).toBe(3500);
  });

  it('parses "98%" as 98', () => {
    expect(parseCounterTarget('98%')).toBe(98);
  });

  it('parses "25+" as 25', () => {
    expect(parseCounterTarget('25+')).toBe(25);
  });

  it('parses "5K+" as 5', () => {
    expect(parseCounterTarget('5K+')).toBe(5);
  });

  // ─── Range values (should return null — no animation) ──────────────────
  it('returns null for "50–70%" (en-dash range)', () => {
    expect(parseCounterTarget('50–70%')).toBeNull();
  });

  it('returns null for "8–10h" (en-dash range with unit)', () => {
    expect(parseCounterTarget('8–10h')).toBeNull();
  });

  it('returns null for "15–18h" (en-dash range)', () => {
    expect(parseCounterTarget('15–18h')).toBeNull();
  });

  it('returns null for "60-80%" (hyphen range)', () => {
    expect(parseCounterTarget('60-80%')).toBeNull();
  });

  // ─── Non-numeric values (should return null) ───────────────────────────
  it('returns null for "24/7"', () => {
    expect(parseCounterTarget('24/7')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseCounterTarget('')).toBeNull();
  });

  it('returns null for "—" (dash only)', () => {
    expect(parseCounterTarget('—')).toBeNull();
  });

  // ─── Edge cases ────────────────────────────────────────────────────────
  it('returns null for zero', () => {
    expect(parseCounterTarget('0')).toBeNull();
  });

  it('parses "1.5h" as 1.5', () => {
    expect(parseCounterTarget('1.5h')).toBe(1.5);
  });
});
