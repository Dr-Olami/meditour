import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  decorators: [(S) => <div className="w-64 p-4"><S /></div>],
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [(S) => <div className="flex h-16 items-center gap-4 p-4"><span>Left</span><S /><span>Right</span></div>],
};
