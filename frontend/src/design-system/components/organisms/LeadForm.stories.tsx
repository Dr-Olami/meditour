import type { Meta, StoryObj } from '@storybook/react';
import { LeadForm } from './LeadForm';
import { LEAD_SOURCE } from '../../../lib/crm';

const TREATMENT_OPTIONS = [
  { value: 'Cardiac Surgery', label: 'Cardiac Surgery' },
  { value: 'Knee Replacement', label: 'Knee Replacement' },
];

const meta: Meta<typeof LeadForm> = {
  title: 'Organisms/LeadForm',
  component: LeadForm,
  argTypes: {
    source: { control: 'select', options: Object.values(LEAD_SOURCE) },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    treatments: TREATMENT_OPTIONS,
    source: LEAD_SOURCE.GENERAL_CONTACT,
  },
  decorators: [(S) => <div className="max-w-md"><S /></div>],
};

export const PreFilledFromTreatment: Story = {
  args: {
    treatments: TREATMENT_OPTIONS,
    source: LEAD_SOURCE.TREATMENT_PAGE,
    defaultTreatment: 'Cardiac Surgery',
  },
  decorators: [(S) => <div className="max-w-md"><S /></div>],
};

export const PreFilledFromDoctor: Story = {
  args: {
    treatments: TREATMENT_OPTIONS,
    source: LEAD_SOURCE.DOCTOR_PAGE,
    defaultDoctor: 'Dr. Aisha Rahman',
    doctorSlug: 'dr-aisha-rahman',
    hospitalSlug: 'dhaka-medical',
  },
  decorators: [(S) => <div className="max-w-md"><S /></div>],
};

export const WithEstimateContext: Story = {
  args: {
    treatments: TREATMENT_OPTIONS,
    source: LEAD_SOURCE.COST_ESTIMATOR,
    defaultTreatment: 'Knee Replacement',
    estimatedTotal: 3500,
  },
  decorators: [(S) => <div className="max-w-md"><S /></div>],
};
