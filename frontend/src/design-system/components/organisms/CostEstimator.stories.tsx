import type { Meta, StoryObj } from '@storybook/react';
import { CostEstimator } from './CostEstimator';

const TREATMENTS = [
  { value: 'cardiac', label: 'Cardiac Surgery', cost: 3000 },
  { value: 'knee', label: 'Knee Replacement', cost: 2500 },
  { value: 'oncology', label: 'Oncology Consultation', cost: 1200 },
];

const ACCOMMODATIONS = [
  { value: 'budget', label: 'Budget Guesthouse', cost: 400 },
  { value: 'mid', label: 'Mid-Range Hotel', cost: 900 },
  { value: 'premium', label: 'Premium Service Apartment', cost: 1800 },
];

const meta: Meta<typeof CostEstimator> = {
  title: 'Organisms/CostEstimator',
  component: CostEstimator,
  argTypes: {
    quoteCta: { control: 'text' },
    disclaimer: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    treatments: TREATMENTS,
    accommodations: ACCOMMODATIONS,
    quoteCta: 'Get a personalized quote',
    disclaimer: 'Estimated totals are indicative and exclude flights, visas, and unforeseen medical costs.',
  },
  decorators: [(S) => <div className="max-w-2xl"><S /></div>],
};

export const WithQuoteHref: Story = {
  args: {
    ...Default.args,
    fallbackQuoteHref: 'https://wa.me/8801611892986',
  },
  decorators: [(S) => <div className="max-w-2xl"><S /></div>],
};
