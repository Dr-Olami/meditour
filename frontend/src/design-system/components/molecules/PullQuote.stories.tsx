import type { Meta, StoryObj } from '@storybook/react';
import { PullQuote } from './PullQuote';

const QUOTE =
  'His dedication to expanding the frontiers of cardiac surgery and enhancing patient outcomes using state-of-the-art techniques is demonstrated by these areas of focus.';

const meta: Meta<typeof PullQuote> = {
  title: 'Molecules/PullQuote',
  component: PullQuote,
  args: { quote: QUOTE, attribution: 'Dr. Ravindra Setty B R' },
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

export const WithoutAttribution: Story = {
  args: { attribution: undefined, tone: 'light' },
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};
