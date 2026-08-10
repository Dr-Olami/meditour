import type { Meta, StoryObj } from '@storybook/react';
import { ChipCloud } from './ChipCloud';

const ITEMS = [
  'Adult Cardiac Surgery',
  'Coronary Artery Bypass Surgery',
  'Valve Replacements',
  'Mitral Valve Repairs',
  'Redo Valve Surgeries',
  'TAPVC Repair',
];

const meta: Meta<typeof ChipCloud> = {
  title: 'Molecules/ChipCloud',
  component: ChipCloud,
  args: { items: ITEMS },
  parameters: {
    backgrounds: { default: 'cream' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { tone: 'light', label: 'Areas of expertise' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};

export const Dark: Story = {
  args: { tone: 'dark', label: 'Areas of expertise' },
  parameters: {
    backgrounds: { default: 'ink', values: [{ name: 'ink', value: '#0e0f13' }] },
  },
};

export const WithoutLabel: Story = {
  args: { tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};

export const Empty: Story = {
  args: { items: [], tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
  render: () => <div data-testid="empty-cloud" />,
};
