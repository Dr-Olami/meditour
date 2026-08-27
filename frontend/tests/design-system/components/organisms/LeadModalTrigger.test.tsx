import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeadModalTrigger } from '../../../../src/design-system/components/organisms/LeadModalTrigger';

// Reason: LeadForm calls submitLead which hits the network. Mock the module
// so the form renders without making real requests.
vi.mock('../../../../src/lib/crm', () => ({
  LEAD_SOURCE: { WEBSITE: 'website', DOCTOR_PAGE: 'doctor-page' },
  leadSchema: { parse: () => {} },
  submitLead: vi.fn().mockResolvedValue({ ok: true }),
}));

// Reason: react-hook-form uses zodResolver at module load. Provide a minimal
// stub so the form initializes without a real zod schema.
vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => () => ({ values: {}, errors: {} }),
}));

describe('LeadModalTrigger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the trigger button with the provided label', () => {
    render(
      <LeadModalTrigger
        label="Request appointment"
        modalTitle="Request a free consultation"
      />,
    );

    expect(screen.getByText('Request appointment')).toBeInTheDocument();
  });

  it('does not show the modal before the trigger is clicked', () => {
    render(
      <LeadModalTrigger
        label="Request appointment"
        modalTitle="Request a free consultation"
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the modal when the trigger button is clicked', () => {
    render(
      <LeadModalTrigger
        label="Request appointment"
        modalTitle="Request a free consultation"
        modalSubtitle="Send us a message and we will reply within 24 hours."
        closeLabel="Close"
      />,
    );

    fireEvent.click(screen.getByText('Request appointment'));

    // Reason: the modal renders into a portal at document.body, so
    // screen queries still find it.
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Request a free consultation')).toBeInTheDocument();
    expect(
      screen.getByText('Send us a message and we will reply within 24 hours.'),
    ).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    render(
      <LeadModalTrigger
        label="Request appointment"
        modalTitle="Request a free consultation"
        closeLabel="Close"
      />,
    );

    fireEvent.click(screen.getByText('Request appointment'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the modal when the backdrop is clicked', () => {
    render(
      <LeadModalTrigger
        label="Request appointment"
        modalTitle="Request a free consultation"
      />,
    );

    fireEvent.click(screen.getByText('Request appointment'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Reason: the backdrop is the first child div with onClick={onClose}.
    // It has aria-hidden="true" and no text content.
    const backdrop = screen.getByRole('dialog').querySelector(
      'div[aria-hidden="true"]',
    );
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the modal when ESC key is pressed', () => {
    render(
      <LeadModalTrigger
        label="Request appointment"
        modalTitle="Request a free consultation"
      />,
    );

    fireEvent.click(screen.getByText('Request appointment'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies the gradient variant class by default', () => {
    render(
      <LeadModalTrigger
        label="Book Now"
        modalTitle="Request a free consultation"
      />,
    );

    const trigger = screen.getByText('Book Now');
    expect(trigger.className).toContain('cta-gradient');
  });

  it('applies the dark variant class when specified', () => {
    render(
      <LeadModalTrigger
        label="Book Now"
        modalTitle="Request a free consultation"
        variant="dark"
      />,
    );

    const trigger = screen.getByText('Book Now');
    expect(trigger.className).toContain('bg-ink');
  });

  it('renders full-width when full prop is set', () => {
    render(
      <LeadModalTrigger
        label="Book Now"
        modalTitle="Request a free consultation"
        full
      />,
    );

    const trigger = screen.getByText('Book Now');
    expect(trigger.className).toContain('w-full');
  });
});
