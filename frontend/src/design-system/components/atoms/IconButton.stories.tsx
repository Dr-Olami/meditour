import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    icon: {
      control: 'select',
      options: ['chevron-down', 'chevron-right', 'chevron-left', 'menu', 'close', 'phone', 'mail', 'star', 'check'],
    },
    label: { control: 'text' },
    size: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { icon: 'menu', label: 'Open menu' } };
export const Close: Story = { args: { icon: 'close', label: 'Close dialog' } };
export const Disabled: Story = { args: { icon: 'star', label: 'Favourite', disabled: true } };
