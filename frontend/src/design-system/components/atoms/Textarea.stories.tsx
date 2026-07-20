import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    state: { control: 'select', options: ['default', 'error'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Describe your medical query…', rows: 4 } };
export const Error: Story = { args: { state: 'error', placeholder: 'This field is required', rows: 4 } };
export const Disabled: Story = { args: { placeholder: 'Not editable', disabled: true, rows: 3 } };
