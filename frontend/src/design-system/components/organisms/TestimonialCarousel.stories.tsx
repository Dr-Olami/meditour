import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCarousel } from './TestimonialCarousel';

const ITEMS = [
  {
    name: 'B. Shruthi & Arjun',
    location: 'India',
    quote: 'From my appointments, giving birth and discharge, everything was planned, hassle-free, and smooth.',
    image: 'https://picsum.photos/seed/shruthi/800/600',
    brandLabel: 'SUPERBIRTH',
  },
  {
    name: 'Ashwinipriya and Chandra Mohan',
    location: 'India',
    quote: 'We had seen great healthcare in Sweden. Khan Meditour gave us that same sense of confidence and comfort.',
    image: 'https://picsum.photos/seed/ashwini/800/600',
    video: 'https://example.com/video1.mp4',
    videoDuration: '1:01',
    brandLabel: 'SUPERBIRTH',
  },
  {
    name: 'Adeeba Irshad',
    location: 'Bangladesh',
    quote: 'Khan Meditour never felt like a hospital. The team cared for me and my baby with so much warmth.',
    image: 'https://picsum.photos/seed/adeeba/800/600',
    brandLabel: 'SUPERBIRTH',
  },
  {
    name: 'Rahela Begum',
    location: 'United Kingdom',
    quote: 'Having visa, accommodation, and hospital arrangements all handled under one roof was truly reassuring.',
    image: 'https://picsum.photos/seed/rahela/800/600',
    brandLabel: 'SUPERBIRTH',
  },
  {
    name: 'Mohammed Al-Rashid',
    location: 'United Arab Emirates',
    quote: 'Excellent coordination and faster recovery than I expected. Highly recommended for medical travel.',
    image: 'https://picsum.photos/seed/alrashid/800/600',
    brandLabel: 'SUPERCARDIAC',
  },
];

const meta: Meta<typeof TestimonialCarousel> = {
  title: 'Organisms/TestimonialCarousel',
  component: TestimonialCarousel,
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: ITEMS, title: 'What our patients say' },
};

export const NoTitle: Story = {
  args: { items: ITEMS },
};

export const SingleItem: Story = {
  args: { items: [ITEMS[0]] },
};
