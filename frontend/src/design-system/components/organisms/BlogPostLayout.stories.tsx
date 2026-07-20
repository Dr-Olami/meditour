import type { Meta, StoryObj } from '@storybook/react';
import { BlogPostLayout } from './BlogPostLayout';

const meta: Meta<typeof BlogPostLayout> = {
  title: 'Organisms/BlogPostLayout',
  component: BlogPostLayout,
  args: {
    title: 'Cost of Cardiac Care in India vs. Bangladesh, UAE & UK',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop',
    publishedAt: '10 July 2026',
    updatedAt: '15 July 2026',
    author: 'Khan Meditour Team',
    tags: ['cardiology', 'cost-guide'],
    relatedTreatments: [
      { name: 'Cardiology', href: '/treatments/cardiology' },
    ],
    ctaHref: '/#contact',
    ctaLabel: 'Get a free cost estimate',
    backHref: '/blog',
    backLabel: 'Back to blog',
    bodyHtml: `
      <p>India has become one of the most trusted destinations for cardiac care.</p>
      <h2>What drives the price difference?</h2>
      <p>In Bangladesh, the UAE or the UK, cardiac procedures can be expensive because of hospital overheads and long waiting lists.</p>
      <h2>Typical starting costs</h2>
      <ul>
        <li>Coronary angiogram: from $200</li>
        <li>Angioplasty: from $2,500</li>
      </ul>
    `,
  },
};

export default meta;
type Story = StoryObj<typeof BlogPostLayout>;

export const Default: Story = {};

export const WithoutCover: Story = {
  args: {
    coverImage: undefined,
  },
};
