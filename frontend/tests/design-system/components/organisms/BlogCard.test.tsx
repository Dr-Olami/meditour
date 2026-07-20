import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogCard } from '../../../../src/design-system/components/organisms/BlogCard';

const POST = {
  slug: 'cost-of-cardiac-care-in-india',
  title: 'Cost of Cardiac Care in India vs. Bangladesh, UAE & UK',
  excerpt: 'A transparent look at angioplasty, bypass and valve surgery costs in India.',
  coverImage: 'https://example.com/cover.jpg',
  date: '10 July 2026',
  tags: ['cardiology', 'cost-guide'],
};

describe('BlogCard', () => {
  it('renders the post title, excerpt and date', () => {
    render(<BlogCard post={POST} href={`/blog/${POST.slug}`} />);
    expect(screen.getByText(POST.title)).toBeInTheDocument();
    expect(screen.getByText(POST.excerpt)).toBeInTheDocument();
    expect(screen.getByText(POST.date)).toBeInTheDocument();
  });

  it('links to the provided href', () => {
    render(<BlogCard post={POST} href={`/blog/${POST.slug}`} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/blog/${POST.slug}`);
  });

  it('displays the first tag as a badge', () => {
    render(<BlogCard post={POST} href={`/blog/${POST.slug}`} />);
    expect(screen.getByText(POST.tags[0])).toBeInTheDocument();
  });

  it('uses the read-more label prop', () => {
    render(<BlogCard post={POST} href={`/blog/${POST.slug}`} readMoreLabel="পড়ুন" />);
    expect(screen.getByText('পড়ুন')).toBeInTheDocument();
  });
});
