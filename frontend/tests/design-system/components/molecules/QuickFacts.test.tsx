import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuickFacts } from '../../../../src/design-system/components/molecules/QuickFacts';

const FACTS = [
  { icon: 'clock' as const, label: 'Duration', value: '2-3 hours' },
  { icon: 'building' as const, label: 'Hospital stay', value: '3 days' },
  { icon: 'heart-pulse' as const, label: 'Recovery', value: '6 weeks' },
  { icon: 'tag' as const, label: 'From', value: '$1,500' },
];

describe('QuickFacts', () => {
  it('renders every fact label and value', () => {
    render(<QuickFacts facts={FACTS} tone="light" />);
    FACTS.forEach((fact) => {
      expect(screen.getByText(fact.label)).toBeInTheDocument();
      expect(screen.getByText(fact.value)).toBeInTheDocument();
    });
  });

  it('renders an SVG icon for each fact', () => {
    const { container } = render(<QuickFacts facts={FACTS} tone="light" />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(FACTS.length);
  });

  it('uses cream value color on dark tone (regression)', () => {
    render(<QuickFacts facts={FACTS} tone="dark" />);
    const value = screen.getByText('2-3 hours');
    expect(value.className).toContain('text-cream-100');
  });

  it('renders nothing when facts array is empty (edge case)', () => {
    const { container } = render(<QuickFacts facts={[]} tone="light" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when facts is undefined (failure case)', () => {
    const { container } = render(
      <QuickFacts facts={undefined as unknown as typeof FACTS} tone="light" />
    );
    expect(container.firstChild).toBeNull();
  });
});
