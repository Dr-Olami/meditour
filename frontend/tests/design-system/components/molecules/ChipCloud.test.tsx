import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChipCloud } from '../../../../src/design-system/components/molecules/ChipCloud';

const ITEMS = [
  'Adult Cardiac Surgery',
  'Coronary Artery Bypass Surgery',
  'Valve Replacements',
];

describe('ChipCloud', () => {
  it('renders every chip label as a scannable pill', () => {
    render(<ChipCloud items={ITEMS} tone="light" />);
    ITEMS.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders the optional label heading when provided', () => {
    render(<ChipCloud items={ITEMS} label="Areas of expertise" tone="light" />);
    expect(screen.getByText('Areas of expertise')).toBeInTheDocument();
  });

  it('omits the label heading when not provided', () => {
    render(<ChipCloud items={ITEMS} tone="light" />);
    expect(screen.queryByText('Areas of expertise')).not.toBeInTheDocument();
  });

  it('renders nothing when the items array is empty', () => {
    const { container } = render(<ChipCloud items={[]} tone="light" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when items is undefined (failure case)', () => {
    const { container } = render(<ChipCloud items={undefined as unknown as string[]} tone="light" />);
    expect(container.firstChild).toBeNull();
  });
});
