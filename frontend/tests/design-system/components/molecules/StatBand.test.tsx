import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBand } from '../../../../src/design-system/components/molecules/StatBand';

const STATS = [
  { value: 25, label: 'Years experience', suffix: '+' },
  { value: 3, label: 'Languages' },
  { value: 'Narayana', label: 'Practices at' },
];

describe('StatBand', () => {
  it('renders every stat value and label', () => {
    render(<StatBand stats={STATS} tone="light" />);
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Narayana')).toBeInTheDocument();
    expect(screen.getByText('Years experience')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Practices at')).toBeInTheDocument();
  });

  it('renders the suffix in an accent span when provided', () => {
    const { container } = render(<StatBand stats={STATS} tone="light" />);
    const suffixSpan = container.querySelector('.text-violet-500');
    expect(suffixSpan).not.toBeNull();
    expect(suffixSpan?.textContent).toBe('+');
  });

  it('uses cream label color on dark tone (regression)', () => {
    render(<StatBand stats={STATS} tone="dark" />);
    const label = screen.getByText('Years experience');
    expect(label.className).toContain('text-cream-100/50');
    expect(label.className).not.toContain('text-ink/50');
  });

  it('renders nothing when stats array is empty (edge case)', () => {
    const { container } = render(<StatBand stats={[]} tone="light" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when stats is undefined (failure case)', () => {
    const { container } = render(
      <StatBand stats={undefined as unknown as typeof STATS} tone="light" />
    );
    expect(container.firstChild).toBeNull();
  });
});
