import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PullQuote } from '../../../../src/design-system/components/molecules/PullQuote';

const QUOTE =
  'His dedication to expanding the frontiers of cardiac surgery and enhancing patient outcomes using state-of-the-art techniques is demonstrated by these areas of focus';

describe('PullQuote', () => {
  it('renders the quote text inside a blockquote with curly quotes', () => {
    render(<PullQuote quote={QUOTE} tone="light" />);
    // The quote text is wrapped in curly quotes alongside the visible quote.
    expect(screen.getByText(QUOTE, { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('blockquote')).toBeInTheDocument();
  });

  it('renders the attribution footer when provided', () => {
    render(<PullQuote quote={QUOTE} attribution="Dr. Ravindra Setty B R" tone="light" />);
    expect(screen.getByText('Dr. Ravindra Setty B R')).toBeInTheDocument();
  });

  it('omits the attribution footer when not provided (edge case)', () => {
    render(<PullQuote quote={QUOTE} tone="light" />);
    expect(screen.queryByText('Dr. Ravindra Setty B R')).not.toBeInTheDocument();
  });

  it('renders nothing when the quote is empty (failure case)', () => {
    const { container } = render(<PullQuote quote="" tone="light" />);
    expect(container.firstChild).toBeNull();
  });

  it('uses a cream attribution color on dark tone so it stays visible (regression)', () => {
    render(<PullQuote quote={QUOTE} attribution="Dr. Setty" tone="dark" />);
    const footer = screen.getByText('Dr. Setty');
    // Reason: the attribution previously hardcoded text-ink/50, which is
    // invisible on ink backgrounds. On dark tone it must use a cream token.
    expect(footer.className).toContain('text-cream-100/50');
    expect(footer.className).not.toContain('text-ink/50');
  });
});
