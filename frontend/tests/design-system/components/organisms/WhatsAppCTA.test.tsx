import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhatsAppCTA } from '../../../../src/design-system/components/organisms/WhatsAppCTA';

describe('WhatsAppCTA', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('builds a link from number and message when no context is provided', () => {
    render(
      <WhatsAppCTA number="8801611892986" message="Hello there">
        Chat
      </WhatsAppCTA>
    );
    expect(screen.getByRole('link', { name: /chat/i })).toHaveAttribute(
      'href',
      'https://wa.me/8801611892986?text=Hello%20there'
    );
  });

  it('builds a contextual link from the configured number when context is provided', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    render(
      <WhatsAppCTA context={{ type: 'doctor', doctorName: 'Dr. Sen' }}>Chat</WhatsAppCTA>
    );
    const href = screen.getByRole('link', { name: /chat/i }).getAttribute('href');
    expect(href).toContain('wa.me/8801611892986');
    expect(href).toContain('Dr.%20Sen');
  });

  it('prefers context over number/message when both are provided', () => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    render(
      <WhatsAppCTA
        number="1234567890"
        message="ignored"
        context={{ type: 'treatment', treatmentName: 'Cardiac Surgery' }}
      >
        Chat
      </WhatsAppCTA>
    );
    const href = screen.getByRole('link', { name: /chat/i }).getAttribute('href');
    expect(href).toContain('Cardiac%20Surgery');
    expect(href).not.toContain('ignored');
  });
});
