import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepCards } from '../../../../src/design-system/components/molecules/StepCards';

const STEPS = [
  { title: 'Consultation', description: 'Initial assessment with the specialist.' },
  { title: 'Surgery', description: 'Procedure under general anaesthesia.' },
  { title: 'Discharge', description: 'Final consultation and follow-up schedule.' },
];

describe('StepCards', () => {
  it('renders every step title and description', () => {
    render(<StepCards steps={STEPS} tone="light" />);
    STEPS.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('renders numbered badges starting from 1', () => {
    render(<StepCards steps={STEPS} tone="light" />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders titles without descriptions when description is omitted (edge case)', () => {
    const noDesc = STEPS.map((s) => ({ title: s.title }));
    render(<StepCards steps={noDesc} tone="light" />);
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.queryByText('Initial assessment with the specialist.')).not.toBeInTheDocument();
  });

  it('renders nothing when steps array is empty (failure case)', () => {
    const { container } = render(<StepCards steps={[]} tone="light" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when steps is undefined (failure case)', () => {
    const { container } = render(
      <StepCards steps={undefined as unknown as typeof STEPS} tone="light" />
    );
    expect(container.firstChild).toBeNull();
  });
});
