import type { Meta, StoryObj } from '@storybook/react';
import { StatBand } from './StatBand';

const STATS = [
  { value: 25, label: 'Years experience', suffix: '+' },
  { value: 3, label: 'Languages' },
  { value: 'Narayana', label: 'Practices at' },
];

const HOSPITAL_STATS = [
  { value: 500, label: 'Beds' },
  { value: 2000, label: 'Established' },
  { value: 12, label: 'Specialities' },
];

const meta: Meta<typeof StatBand> = {
  title: 'Molecules/StatBand',
  component: StatBand,
  args: { stats: STATS },
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

export const HospitalStats: Story = {
  args: { stats: HOSPITAL_STATS, tone: 'dark' },
  parameters: {
    backgrounds: { default: 'ink', values: [{ name: 'ink', value: '#0e0f13' }] },
  },
};

export const SingleStat: Story = {
  args: { stats: [STATS[0]], tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};
