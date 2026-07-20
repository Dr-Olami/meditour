import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LeadForm } from '../../../../src/design-system/components/organisms/LeadForm';
import { LEAD_SOURCE } from '../../../../src/lib/crm';

const TREATMENT_OPTIONS = [
  { value: 'Cardiac Surgery', label: 'Cardiac Surgery' },
  { value: 'Knee Replacement', label: 'Knee Replacement' },
];

describe('LeadForm', () => {
  beforeEach(() => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
    vi.stubEnv('PUBLIC_CRM_SUBMIT_URL', 'https://example.com/crm');
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ message: 'Submitted' }),
        } as Response)
      )
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('renders all visible fields and uses the provided source', () => {
    render(<LeadForm treatments={TREATMENT_OPTIONS} source={LEAD_SOURCE.TREATMENT_PAGE} />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/treatment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred contact method/i)).toBeInTheDocument();
  });

  it('pre-fills treatment, doctor, and message when provided', () => {
    render(
      <LeadForm
        treatments={TREATMENT_OPTIONS}
        source={LEAD_SOURCE.DOCTOR_PAGE}
        defaultTreatment="Cardiac Surgery"
        defaultDoctor="Dr. Sen"
      />
    );
    expect(screen.getByLabelText(/treatment/i)).toHaveValue('Cardiac Surgery');
    expect((screen.getByLabelText(/how can we help you/i) as HTMLTextAreaElement).value).toContain(
      'Dr. Sen'
    );
  });

  it('toggles a symptoms textarea when the no-reports checkbox is checked', async () => {
    render(<LeadForm treatments={TREATMENT_OPTIONS} source={LEAD_SOURCE.GENERAL_CONTACT} />);
    expect(screen.queryByLabelText(/symptoms/i)).not.toBeInTheDocument();
    const checkbox = screen.getByLabelText(/don't have my reports yet/i);
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(screen.getByLabelText(/symptoms/i)).toBeInTheDocument();
    });
  });

  it('displays a success message with report-sharing links after submission', async () => {
    render(<LeadForm treatments={TREATMENT_OPTIONS} source={LEAD_SOURCE.COST_ESTIMATOR} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/phone/i), '+1234567890');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
    const [[, init]] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls;
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.name).toBe('Jane Doe');
    expect(body.phone).toBe('+1234567890');
    expect(body.source).toBe(LEAD_SOURCE.COST_ESTIMATOR);
    expect(body.hasReports).toBe(true);

    await waitFor(() => {
      expect(screen.getByText(/review your case/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument();
  });
});
