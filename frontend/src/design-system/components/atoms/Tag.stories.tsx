import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  argTypes: {
    variant: { control: 'select', options: ['default', 'active'] },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Cardiology', variant: 'default' } };
export const Active: Story = { args: { children: 'Oncology', variant: 'active' } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tag variant="default">Cardiology</Tag>
      <Tag variant="active">Oncology</Tag>
    </div>
  ),
};
