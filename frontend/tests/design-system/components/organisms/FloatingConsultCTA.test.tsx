import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FloatingConsultCTA } from '../../../../src/design-system/components/organisms/FloatingConsultCTA';

describe('FloatingConsultCTA', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders static hrefs when no context is provided', () => {
    render(
      <FloatingConsultCTA
        headline="Ready to get started?"
        primaryCta={{ label: 'Book now', href: '#contact' }}
        secondaryCta={{ label: 'WhatsApp', href: 'https://wa.me/123' }}
      />
    );
    expect(screen.getByRole('link', { name: 'Book now' })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/123'
    );
  });

  it('resolves a contextual href via lib/whatsapp.ts when context is provided', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    render(
      <FloatingConsultCTA
        headline="Ready to get started?"
        primaryCta={{ label: 'Book now', href: '#contact' }}
        secondaryCta={{
          label: 'WhatsApp',
          context: { type: 'treatment', treatmentName: 'Cardiac Surgery' },
        }}
      />
    );
    const href = screen.getByRole('link', { name: 'WhatsApp' }).getAttribute('href');
    expect(href).toContain('wa.me/8801611892986');
    expect(href).toContain('Cardiac%20Surgery');
  });
});
