import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DoctorCard } from '../../../../src/design-system/components/organisms/DoctorCard';

const DOCTOR = {
  name: 'Dr. Rajesh Sharma',
  specialty: 'Cardiology',
  hospitalName: 'Apollo Hospital, New Delhi',
  hospitalHref: '/hospitals/apollo-hospital-delhi',
  qualification: 'MBBS, MD',
  experienceYears: 22,
  href: '/doctors/dr-rajesh-sharma',
};

describe('DoctorCard', () => {
  it('renders doctor name, specialty and qualification', () => {
    render(<DoctorCard doctor={DOCTOR} />);
    expect(screen.getByText(DOCTOR.name)).toBeInTheDocument();
    expect(screen.getByText(DOCTOR.specialty)).toBeInTheDocument();
    expect(screen.getByText(DOCTOR.qualification)).toBeInTheDocument();
  });

  it('renders a link to the doctor detail page on the whole card', () => {
    render(<DoctorCard doctor={DOCTOR} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', DOCTOR.href);
  });

  it('renders experience years fallback when no experience string is provided', () => {
    render(<DoctorCard doctor={DOCTOR} />);
    expect(screen.getByText(/22 years experience/i)).toBeInTheDocument();
  });

  it('prefers explicit experience string over years', () => {
    const doctor = { ...DOCTOR, experience: 'Two decades' };
    render(<DoctorCard doctor={doctor} />);
    expect(screen.getByText('Two decades')).toBeInTheDocument();
  });

  it('renders initials fallback when no avatar is provided', () => {
    render(<DoctorCard doctor={DOCTOR} />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });
});
