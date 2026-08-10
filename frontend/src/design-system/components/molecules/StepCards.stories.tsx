import type { Meta, StoryObj } from '@storybook/react';
import { StepCards } from './StepCards';

const STEPS = [
  { title: 'Consultation', description: 'Initial assessment with the specialist to review your medical history and treatment options.' },
  { title: 'Pre-operative tests', description: 'Blood work, imaging, and cardiac clearance to ensure surgical readiness.' },
  { title: 'Surgery', description: 'The procedure is performed under general anaesthesia by your surgical team.' },
  { title: 'Recovery', description: 'Post-operative monitoring in the ICU followed by ward transfer.' },
  { title: 'Discharge', description: 'Final consultation, discharge summary, and follow-up schedule.' },
  { title: 'Follow-up', description: 'Telemedicine review at 2 weeks and 6 weeks post-discharge.' },
];

const meta: Meta<typeof StepCards> = {
  title: 'Molecules/StepCards',
  component: StepCards,
  args: { steps: STEPS },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};

export const Dark: Story = {
  args: { tone: 'dark' },
  parameters: {
    backgrounds: { default: 'ink', values: [{ name: 'ink', value: '#0e0f13' }] },
  },
};

export const WithoutDescriptions: Story = {
  args: {
    steps: STEPS.map((s) => ({ title: s.title })),
    tone: 'light',
  },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};

export const SingleStep: Story = {
  args: { steps: [STEPS[0]], tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};
