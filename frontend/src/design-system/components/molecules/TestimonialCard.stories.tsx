import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from './TestimonialCard';

const ITEM = {
  name: 'B. Shruthi & Arjun',
  location: 'India',
  quote: 'From my appointments, giving birth and discharge, everything was planned, hassle-free, and smooth.',
  image: 'https://picsum.photos/seed/shruthi/800/600',
  brandLabel: 'SUPERBIRTH',
};

const VIDEO_ITEM = {
  name: 'Ashwinipriya and Chandra Mohan',
  location: 'India',
  quote: 'We had seen great healthcare in Sweden. Khan Meditour gave us that same sense of confidence and comfort.',
  image: 'https://picsum.photos/seed/ashwini/800/600',
  video: 'https://example.com/video1.mp4',
  videoDuration: '1:01',
  brandLabel: 'SUPERBIRTH',
};

const meta: Meta<typeof TestimonialCard> = {
  title: 'Molecules/TestimonialCard',
  component: TestimonialCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { item: ITEM },
};

export const Video: Story = {
  args: { item: VIDEO_ITEM },
};

export const WithoutBrandLabel: Story = {
  args: {
    item: {
      ...ITEM,
      brandLabel: undefined,
    },
  },
};
