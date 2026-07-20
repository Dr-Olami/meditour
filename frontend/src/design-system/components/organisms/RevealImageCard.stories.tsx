import type { Meta, StoryObj } from '@storybook/react';
import { RevealImageCard } from './RevealImageCard';

const meta: Meta<typeof RevealImageCard> = {
  title: 'Organisms/RevealImageCard',
  component: RevealImageCard,
  argTypes: {
    label: { control: 'text' },
    caption: { control: 'text' },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    alt: 'MRI scanner',
    label: 'Advanced MRI',
    caption: '3T Siemens Magnetom — full-body imaging',
  },
  decorators: [(S) => <div className="w-80"><S /></div>],
};

export const WithLink: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80',
    alt: 'Operating theatre',
    label: 'Surgical Suite',
    caption: 'ISO-certified operating theatres',
    href: '#equipment',
  },
  decorators: [(S) => <div className="w-80"><S /></div>],
};

export const ImageOnly: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1584982751601-97ddc0e79954?w=600&q=80',
    alt: 'Hospital corridor',
  },
  decorators: [(S) => <div className="w-80"><S /></div>],
};
