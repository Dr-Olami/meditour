import type { Meta, StoryObj } from '@storybook/react';
import { MarqueeStrip } from './MarqueeStrip';

const GALLERY_IMAGES = [
  'https://picsum.photos/seed/hospital-1/600/400',
  'https://picsum.photos/seed/hospital-2/600/400',
  'https://picsum.photos/seed/hospital-3/600/400',
  'https://picsum.photos/seed/hospital-4/600/400',
  'https://picsum.photos/seed/hospital-5/600/400',
  'https://picsum.photos/seed/hospital-6/600/400',
];

const ACCREDITATIONS = ['JCI Accredited', 'NABH Accredited', 'ISO 9001', 'Green OT'];

const meta: Meta<typeof MarqueeStrip> = {
  title: 'Molecules/MarqueeStrip',
  component: MarqueeStrip,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <MarqueeStrip
      items={GALLERY_IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Gallery ${i + 1}`}
          className="h-48 w-72 rounded-card object-cover"
        />
      ))}
    />
  ),
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};

export const AccreditationBadges: Story = {
  render: () => (
    <MarqueeStrip
      items={ACCREDITATIONS.map((badge, i) => (
        <span
          key={i}
          className="inline-flex items-center rounded-full border border-cream-100/15 bg-cream-100/5 px-5 py-2.5 text-sm font-semibold text-cream-100"
        >
          {badge}
        </span>
      ))}
      tone="dark"
    />
  ),
  parameters: {
    backgrounds: { default: 'ink', values: [{ name: 'ink', value: '#0e0f13' }] },
  },
};

export const Empty: Story = {
  render: () => <MarqueeStrip items={[]} />,
  parameters: {
    backgrounds: { default: 'cream', values: [{ name: 'cream', value: '#f7f3ec' }] },
  },
};
