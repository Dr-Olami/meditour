import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Economy class', name: 'class' } };
export const Checked: Story = { args: { label: 'Business class', name: 'class', defaultChecked: true } };
export const Disabled: Story = { args: { label: 'First class (unavailable)', name: 'class', disabled: true } };
