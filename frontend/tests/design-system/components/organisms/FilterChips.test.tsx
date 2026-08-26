import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterChips } from '../../../../src/design-system/components/organisms/FilterChips';

const OPTIONS = [
  'All specialities',
  'Heart Failure & Transplantation Medicine',
  'Neurology',
  'Paediatric Nephrology',
  'Medical Oncology',
  'Surgical Oncology',
  'Orthopaedics',
];

beforeAll(() => {
  // Reason: jsdom does not implement ResizeObserver, but the carousel uses it
  // to measure track width and derive a consistent animation duration.
  globalThis.ResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  })) as unknown as typeof ResizeObserver;
});

describe('FilterChips', () => {
  it('renders every option duplicated in a two-row carousel (expected use)', () => {
    render(<FilterChips options={OPTIONS} active={OPTIONS[0]} onSelect={() => {}} />);
    OPTIONS.forEach((option) => {
      const chips = screen.getAllByText(option);
      expect(chips.length).toBe(2);
    });
  });

  it('splits options into two rows and highlights the active chip (expected use)', () => {
    const { container } = render(
      <FilterChips options={OPTIONS} active={OPTIONS[2]} onSelect={() => {}} />
    );
    const rows = container.querySelectorAll('[data-row]');
    expect(rows.length).toBe(2);

    const activeChips = screen.getAllByRole('button', { pressed: true });
    expect(activeChips.length).toBe(2);
    activeChips.forEach((chip) => expect(chip).toHaveTextContent(OPTIONS[2]));
  });

  it('calls onSelect with the clicked option (expected use)', () => {
    const handleSelect = vi.fn();
    render(<FilterChips options={OPTIONS} active={OPTIONS[0]} onSelect={handleSelect} />);
    fireEvent.click(screen.getAllByText(OPTIONS[3])[0]);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(OPTIONS[3]);
  });

  it('renders a single row when only one option is provided (edge case)', () => {
    const { container } = render(
      <FilterChips options={[OPTIONS[0]]} active={OPTIONS[0]} onSelect={() => {}} />
    );
    const rows = container.querySelectorAll('[data-row]');
    expect(rows.length).toBe(1);
  });

  it('renders without crashing when options is empty (failure case)', () => {
    const { container } = render(<FilterChips options={[]} active="" onSelect={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies opposing marquee animation directions to the two rows (expected use)', () => {
    const { container } = render(
      <FilterChips options={OPTIONS} active={OPTIONS[0]} onSelect={() => {}} />
    );
    const tracks = container.querySelectorAll('.animate-marquee-left, .animate-marquee-right');
    expect(tracks.length).toBe(2);
    expect(container.querySelector('.animate-marquee-left')).toBeInTheDocument();
    expect(container.querySelector('.animate-marquee-right')).toBeInTheDocument();
  });
});
