import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhyUsSection } from '../../../../src/design-system/components/organisms/WhyUsSection';
import type { WhyUsItem } from '../../../../src/design-system/components/organisms/WhyUsSection';

const ITEMS: WhyUsItem[] = [
  {
    title: 'Free Second Opinion',
    description: 'From 3 top specialists.\nNo obligation. No cost.',
    image: '/images/patterns/doctor-page-cta.jpg',
  },
  {
    title: 'Transparency',
    description: 'Clear costs with potential savings.\nNo surprise bills.',
    image: '/images/treatments/cardiology.jpg',
  },
  {
    title: 'Verified Network',
    description: 'Accredited hospitals.\nBoard-certified doctors, vetted by us.',
    image: '/images/hospitals/apollo-hospitals-bannerghatta.jpg',
  },
  {
    title: 'Dedicated Case Manager',
    description: 'A personal coordinator with you\nfrom first message to final follow-up.',
    image: '/images/patterns/hospital-page-cta.jpg',
  },
  {
    title: 'End-to-End Support',
    description:
      'Medical visa invitation letters.\nAirport pickup. 24/7 coordinators.\nPost-treatment follow-up.',
    image: '/images/patterns/treatment-page-cta.jpg',
  },
];

describe('WhyUsSection', () => {
  it('renders the section title and all 5 items with titles + descriptions in the DOM (expected use)', () => {
    const { container } = render(<WhyUsSection title="Why patients choose us" items={ITEMS} />);
    expect(screen.getByText('Why patients choose us')).toBeInTheDocument();
    ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      // Reason: descriptions are visually hidden by default and revealed on
      // hover, so we assert their presence in the DOM text instead of using a
      // visible text query.
      expect(container.textContent ?? '').toContain(item.description);
    });
  });

  it('renders the hint on each card — "More details" on mobile, "Hover for more details" on desktop (expected use)', () => {
    render(<WhyUsSection title="Why patients choose us" items={ITEMS} />);
    // Reason: the hint text is responsive — "More details" for mobile
    // (no hover on touch), "Hover for more details" for desktop.
    const mobileHints = screen.getAllByText('More details');
    const desktopHints = screen.getAllByText('Hover for more details');
    expect(mobileHints).toHaveLength(5);
    expect(desktopHints).toHaveLength(5);
  });

  it('renders images with correct alt text for each card (edge case)', () => {
    render(<WhyUsSection title="Why patients choose us" items={ITEMS} />);
    ITEMS.forEach((item) => {
      const img = screen.getByAltText(item.title);
      expect(img).toHaveAttribute('src', item.image);
    });
  });

  it('applies col-span-2 to top 3 cards and col-span-3 to bottom 2 cards (edge case)', () => {
    const { container } = render(
      <WhyUsSection title="Why patients choose us" items={ITEMS} />
    );
    const cardWrappers = container.querySelectorAll('[data-card]');
    expect(cardWrappers).toHaveLength(5);
    // Reason: top 3 cards are 1/3 width (col-span-2 in a 6-col grid),
    // bottom 2 cards are 1/2 width (col-span-3), filling the full row.
    expect(cardWrappers[0].className).toContain('md:col-span-2');
    expect(cardWrappers[1].className).toContain('md:col-span-2');
    expect(cardWrappers[2].className).toContain('md:col-span-2');
    expect(cardWrappers[3].className).toContain('md:col-span-3');
    expect(cardWrappers[4].className).toContain('md:col-span-3');
  });

  it('applies carousel snap classes on mobile for all cards (edge case)', () => {
    const { container } = render(
      <WhyUsSection title="Why patients choose us" items={ITEMS} />
    );
    const cardWrappers = container.querySelectorAll('[data-card]');
    // Reason: on mobile, all cards are carousel slides with snap-center
    // and a fixed 85% width.
    cardWrappers.forEach((wrapper) => {
      expect(wrapper.className).toContain('snap-center');
      expect(wrapper.className).toContain('w-[85%]');
    });
  });

  it('renders prev/next navigation buttons on mobile (edge case)', () => {
    render(<WhyUsSection title="Why patients choose us" items={ITEMS} />);
    // Reason: arrow buttons let users navigate the carousel without swiping.
    expect(screen.getByLabelText('Previous card')).toBeInTheDocument();
    expect(screen.getByLabelText('Next card')).toBeInTheDocument();
  });

  it('renders without crashing when items array is empty (failure case)', () => {
    const { container } = render(<WhyUsSection title="Why us" items={[]} />);
    expect(screen.getByText('Why us')).toBeInTheDocument();
    // Reason: no cards should render, but the section + title must not crash.
    expect(container.querySelectorAll('[data-card]')).toHaveLength(0);
  });

  it('renders a <video> instead of <img> when the video prop is provided (regression)', () => {
    const videoItem: WhyUsItem = {
      title: 'Video Card',
      description: 'Description for video card.',
      image: '/images/fallback.jpg',
      video: '/videos/clip.mp4',
    };
    render(<WhyUsSection title="Why us" items={[videoItem]} />);
    // Reason: when video is provided, the component must render a <video>
    // element and NOT an <img> for that card.
    const video = screen.queryByRole('video') || document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(screen.queryByAltText('Video Card')).not.toBeInTheDocument();
  });
});
