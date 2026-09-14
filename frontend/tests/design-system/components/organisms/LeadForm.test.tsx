import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LeadForm } from '../../../../src/design-system/components/organisms/LeadForm';
import { LEAD_SOURCE } from '../../../../src/lib/crm';

const TREATMENT_OPTIONS = [
  { value: 'Cardiac Surgery', label: 'Cardiac Surgery' },
  { value: 'Knee Replacement', label: 'Knee Replacement' },
];

// Reason: mock the Supabase module so tests don't hit the real API.
// Uses rpc() since we switched to SECURITY DEFINER functions to bypass RLS.
vi.mock('../../../../src/lib/supabase', () => ({
  supabase: {
    rpc: vi.fn((name: string) => {
      if (name === 'insert_lead') return Promise.resolve({ data: 1, error: null });
      if (name === 'attach_reports') return Promise.resolve({ error: null });
      return Promise.resolve({ data: null, error: null });
    }),
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(() => Promise.resolve({ error: null })),
      })),
    },
  },
  MEDICAL_REPORTS_BUCKET: 'medical-reports',
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  ALLOWED_FILE_EXTENSIONS: 'PDF, JPG, PNG',
}));

describe('LeadForm', () => {
  beforeEach(() => {
    vi.stubEnv('PUBLIC_WHATSAPP_NUMBER', '8801611892986');
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

    // Reason: verify the success message and report-sharing links appear
    await waitFor(() => {
      expect(screen.getByText(/review your case/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument();
  });

  it('shows the medical reports upload field when reports are available', () => {
    render(<LeadForm treatments={TREATMENT_OPTIONS} source={LEAD_SOURCE.GENERAL_CONTACT} />);
    expect(screen.getByLabelText(/medical reports/i)).toBeInTheDocument();
  });

  it('hides the medical reports upload field when no-reports is checked', async () => {
    render(<LeadForm treatments={TREATMENT_OPTIONS} source={LEAD_SOURCE.GENERAL_CONTACT} />);
    const checkbox = screen.getByLabelText(/don't have my reports yet/i);
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(screen.queryByLabelText(/medical reports/i)).not.toBeInTheDocument();
    });
  });
});
