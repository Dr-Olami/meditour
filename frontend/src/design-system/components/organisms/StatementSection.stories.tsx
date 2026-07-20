import type { Meta, StoryObj } from '@storybook/react';
import { StatementSection } from './StatementSection';

const meta: Meta<typeof StatementSection> = {
  title: 'Organisms/StatementSection',
  component: StatementSection,
  argTypes: {
    statement: { control: 'text' },
    caption: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    caption: 'Our mission',
    statement: 'World-class healthcare, without the world-class price tag.',
  },
};

export const NoCaption: Story = {
  args: {
    statement: 'Healing begins with trust.',
  },
};
