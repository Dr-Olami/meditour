import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarqueeStrip } from '../../../../src/design-system/components/molecules/MarqueeStrip';

const ITEMS = [
  <img key="1" src="/img1.jpg" alt="Gallery 1" />,
  <img key="2" src="/img2.jpg" alt="Gallery 2" />,
  <img key="3" src="/img3.jpg" alt="Gallery 3" />,
];

describe('MarqueeStrip', () => {
  it('renders every item passed via the items prop', () => {
    render(<MarqueeStrip items={ITEMS} />);
    expect(screen.getByAltText('Gallery 1')).toBeInTheDocument();
    expect(screen.getByAltText('Gallery 2')).toBeInTheDocument();
    expect(screen.getByAltText('Gallery 3')).toBeInTheDocument();
  });

  it('renders children when no items prop is provided', () => {
    render(
      <MarqueeStrip>
        <span>Custom child</span>
      </MarqueeStrip>
    );
    expect(screen.getByText('Custom child')).toBeInTheDocument();
  });

  it('applies snap-start to each item cell', () => {
    const { container } = render(<MarqueeStrip items={ITEMS} />);
    const cells = container.querySelectorAll('.snap-start');
    expect(cells.length).toBe(ITEMS.length);
  });

  it('renders nothing when items is empty and no children (edge case)', () => {
    const { container } = render(<MarqueeStrip items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when items is undefined and no children (failure case)', () => {
    const { container } = render(
      <MarqueeStrip items={undefined as unknown as React.ReactNode[]} />
    );
    expect(container.firstChild).toBeNull();
  });
});
