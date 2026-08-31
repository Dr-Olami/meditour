import { describe, it, expect, vi } from 'vitest';
import { getCountryInquiryLink } from '../../src/lib/whatsapp';

describe('getCountryInquiryLink', () => {
  it('returns empty string when no number is configured', () => {
    expect(getCountryInquiryLink('Bangladesh', 'Bangladeshi')).toBe('');
  });

  it('includes country name in the pre-filled message', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getCountryInquiryLink('Bangladesh', 'Bangladeshi');
    expect(link).toContain('Bangladesh');
    vi.unstubAllEnvs();
  });

  it('uses nationality adjective when provided', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getCountryInquiryLink('United Arab Emirates', 'Emirati');
    expect(link).toContain('Emirati%20patient');
    vi.unstubAllEnvs();
  });

  it('falls back to "patient from {country}" when nationality is omitted', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getCountryInquiryLink('Nigeria');
    expect(link).toContain('patient%20from%20Nigeria');
    vi.unstubAllEnvs();
  });

  it('includes "cost estimate" in the message', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getCountryInquiryLink('Kenya', 'Kenyan');
    expect(link).toContain('cost%20estimate');
    vi.unstubAllEnvs();
  });

  it('builds a valid wa.me URL', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    const link = getCountryInquiryLink('United States', 'American');
    expect(link).toMatch(/^https:\/\/wa\.me\/8801611892986\?text=/);
    vi.unstubAllEnvs();
  });
});
