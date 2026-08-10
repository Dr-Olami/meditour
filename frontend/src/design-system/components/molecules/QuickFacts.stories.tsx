import type { Meta, StoryObj } from '@storybook/react';
import { QuickFacts } from './QuickFacts';

const FACTS = [
  { icon: 'clock' as const, label: 'Duration', value: '2-3 hours' },
  { icon: 'building' as const, label: 'Hospital stay', value: '3 days' },
  { icon: 'heart-pulse' as const, label: 'Recovery', value: '6 weeks' },
  { icon: 'tag' as const, label: 'From', value: '$1,500' },
];

const meta: Meta<typeof QuickFacts> = {
  title: 'Molecules/QuickFacts',
  component: QuickFacts,
  args: { facts: FACTS },
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

export const SingleFact: Story = {
  args: { facts: [FACTS[0]], tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};
