import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HospitalCard } from '../../../../src/design-system/components/organisms/HospitalCard';

const HOSPITAL = {
  slug: 'apollo-hospital-delhi',
  name: 'Apollo Hospital, New Delhi',
  city: 'New Delhi',
  country: 'India',
  image: 'https://example.com/image.jpg',
  accreditations: ['JCI Accredited'],
};

describe('HospitalCard', () => {
  it('renders the hospital name and location', () => {
    render(<HospitalCard hospital={HOSPITAL} locale="en" />);
    expect(screen.getByText(HOSPITAL.name)).toBeInTheDocument();
    expect(screen.getByText('New Delhi, India')).toBeInTheDocument();
  });

  it('links to the hospital detail page using the provided locale', () => {
    render(<HospitalCard hospital={HOSPITAL} locale="en" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/hospitals/apollo-hospital-delhi');
  });

  it('renders the Bangla href when locale is bn', () => {
    render(<HospitalCard hospital={HOSPITAL} locale="bn" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/bn/hospitals/apollo-hospital-delhi');
  });

  it('renders accreditation badges', () => {
    render(<HospitalCard hospital={HOSPITAL} locale="en" />);
    expect(screen.getByText('JCI Accredited')).toBeInTheDocument();
  });

  it('does not render an image when none is provided', () => {
    render(<HospitalCard hospital={{ ...HOSPITAL, image: undefined }} locale="en" />);
    expect(screen.queryByAltText(HOSPITAL.name)).not.toBeInTheDocument();
  });
});
