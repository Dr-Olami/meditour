import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    state: { control: 'select', options: ['default', 'error', 'success'] },
    inputSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Enter your name…', inputSize: 'md' } };
export const Error: Story = { args: { placeholder: 'invalid@email', state: 'error', value: 'invalid@email', readOnly: true } };
export const Success: Story = { args: { placeholder: 'john@example.com', state: 'success', value: 'john@example.com', readOnly: true } };
export const Disabled: Story = { args: { placeholder: 'Not editable', disabled: true } };
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  ),
};
