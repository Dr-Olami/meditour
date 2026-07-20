import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    state: { control: 'select', options: ['default', 'error'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} className="w-48">
      <option value="">Choose a country</option>
      <option value="bd">Bangladesh</option>
      <option value="in">India</option>
      <option value="pk">Pakistan</option>
    </Select>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Select {...args} state="error" className="w-48">
      <option value="">-- select --</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled className="w-48">
      <option value="">Not available</option>
    </Select>
  ),
};
