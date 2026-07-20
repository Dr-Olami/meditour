import type { Meta, StoryObj } from '@storybook/react';
import { Icon, ICON_PATHS } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'select', options: Object.keys(ICON_PATHS) },
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { name: 'star', size: 24 } };

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      {(Object.keys(ICON_PATHS) as Array<keyof typeof ICON_PATHS>).map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <span className="text-xs text-gray-500">{name}</span>
        </div>
      ))}
    </div>
  ),
};
