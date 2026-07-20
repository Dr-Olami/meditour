import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from './BlogCard';

const meta: Meta<typeof BlogCard> = {
  title: 'Organisms/BlogCard',
  component: BlogCard,
  args: {
    href: '/blog/cost-of-cardiac-care-in-india',
    post: {
      slug: 'cost-of-cardiac-care-in-india',
      title: 'Cost of Cardiac Care in India vs. Bangladesh, UAE & UK',
      excerpt:
        'A transparent look at angioplasty, bypass and valve surgery costs in India — and why patients save 40–70% without compromising quality.',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
      date: '10 July 2026',
      tags: ['cardiology', 'cost-guide'],
    },
    readMoreLabel: 'Read more',
  },
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {};

export const NoImage: Story = {
  args: {
    post: {
      ...meta.args!.post,
      coverImage: undefined,
    },
  },
};

export const SingleTag: Story = {
  args: {
    post: {
      ...meta.args!.post,
      tags: ['medical-tourism'],
    },
  },
};
