import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'I agree to the terms and conditions' } };
export const Checked: Story = { args: { label: 'Pre-checked', defaultChecked: true } };
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } };
export const NoLabel: Story = { args: {} };
