import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CostEstimator } from '../../../../src/design-system/components/organisms/CostEstimator';

const TREATMENTS = [
  { value: 'cardiac', label: 'Cardiac Surgery', cost: 3000 },
  { value: 'knee', label: 'Knee Replacement', cost: 2500 },
];

const ACCOMMODATIONS = [
  { value: 'budget', label: 'Budget Stay', cost: 500 },
  { value: 'comfort', label: 'Comfort Stay', cost: 1200 },
];

describe('CostEstimator', () => {
  it('displays the selected treatment, accommodation, and total', () => {
    render(<CostEstimator treatments={TREATMENTS} accommodations={ACCOMMODATIONS} />);
    expect(screen.getByText(/Cardiac Surgery/)).toBeInTheDocument();
    expect(screen.getByText(/\$3,500/)).toBeInTheDocument();
  });

  it('updates the total when a different treatment is selected', async () => {
    render(<CostEstimator treatments={TREATMENTS} accommodations={ACCOMMODATIONS} />);
    const select = screen.getByLabelText(/treatment/i);
    await userEvent.selectOptions(select, 'knee');
    expect(screen.getByText('$3,000', { selector: 'p' })).toBeInTheDocument();
  });

  it('uses getQuoteHref to build the quote CTA href', async () => {
    const getQuoteHref = vi.fn().mockReturnValue('https://wa.me/123');
    render(
      <CostEstimator
        treatments={TREATMENTS}
        accommodations={ACCOMMODATIONS}
        getQuoteHref={getQuoteHref}
      />
    );
    await userEvent.selectOptions(screen.getByLabelText(/treatment/i), 'knee');
    expect(getQuoteHref).toHaveBeenCalledWith('Knee Replacement', 3000);
    expect(screen.getByRole('link', { name: /get a detailed quote/i })).toHaveAttribute(
      'href',
      'https://wa.me/123'
    );
  });

  it('falls back to fallbackQuoteHref when getQuoteHref is not provided', () => {
    render(
      <CostEstimator
        treatments={TREATMENTS}
        accommodations={ACCOMMODATIONS}
        fallbackQuoteHref="/contact"
      />
    );
    expect(screen.getByRole('link', { name: /get a detailed quote/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });
});
