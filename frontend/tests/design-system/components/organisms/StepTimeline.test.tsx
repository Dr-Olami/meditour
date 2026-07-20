import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepTimeline } from '../../../../src/design-system/components/organisms/StepTimeline';

const STEPS = [
  { title: 'Share reports', description: 'Send your reports.', duration: '~5 minutes' },
  { title: 'Get a plan', description: 'We match you.', duration: '24 hours' },
  { title: 'Travel', description: 'We arrange everything.' },
];

describe('StepTimeline', () => {
  it('renders all step titles and descriptions', () => {
    render(<StepTimeline steps={STEPS} />);
    STEPS.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('renders durations only when present', () => {
    render(<StepTimeline steps={STEPS} />);
    expect(screen.getByText('~5 minutes')).toBeInTheDocument();
    expect(screen.getByText('24 hours')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });

  it('renders numbered badges', () => {
    render(<StepTimeline steps={STEPS} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
