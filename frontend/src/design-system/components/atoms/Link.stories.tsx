import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {
    variant: { control: 'select', options: ['default', 'subtle', 'inverse'] },
    underline: { control: 'select', options: ['default', 'none'] },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Learn more about our services', href: '#' } };
export const Subtle: Story = { args: { children: 'View all doctors', href: '#', variant: 'subtle' } };
export const Inverse: Story = {
  args: { children: 'Contact us', href: '#', variant: 'inverse' },
  decorators: [(S) => <div className="bg-ink p-4"><S /></div>],
};
export const NoUnderline: Story = { args: { children: 'Privacy policy', href: '#', underline: 'none' } };
