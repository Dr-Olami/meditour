import type { Meta, StoryObj } from '@storybook/react';
import { EquipmentCarousel } from './EquipmentCarousel';

const ITEMS = [
  { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80', alt: 'MRI scanner', label: 'MRI 3T' },
  { src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80', alt: 'CT scan', label: 'CT Scan' },
  { src: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&q=80', alt: 'Lab equipment', label: 'Pathology Lab' },
  { src: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&q=80', alt: 'Operating theatre', label: 'Surgical Suite' },
];

const meta: Meta<typeof EquipmentCarousel> = {
  title: 'Organisms/EquipmentCarousel',
  component: EquipmentCarousel,
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: ITEMS, title: 'World-class Equipment' },
};

export const NoTitle: Story = {
  args: { items: ITEMS },
};

export const SingleItem: Story = {
  args: { items: [ITEMS[0]] },
};
