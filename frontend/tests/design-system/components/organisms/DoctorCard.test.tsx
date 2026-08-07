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
  whatsappHref: 'https://wa.me/8801611892986?text=Hi',
};

describe('DoctorCard', () => {
  it('renders doctor name, specialty and qualification', () => {
    render(<DoctorCard doctor={DOCTOR} />);
    expect(screen.getByText(DOCTOR.name)).toBeInTheDocument();
    expect(screen.getByText(DOCTOR.specialty)).toBeInTheDocument();
    expect(screen.getByText(DOCTOR.qualification)).toBeInTheDocument();
  });

  it('links the portrait and name to the doctor detail page', () => {
    render(<DoctorCard doctor={DOCTOR} />);
    const links = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href') === DOCTOR.href);
    // portrait link, name link, and Book Now CTA all point to the profile
    expect(links.length).toBeGreaterThanOrEqual(3);
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

  it('renders the portrait image with object-top cropping when avatar is provided', () => {
    render(<DoctorCard doctor={{ ...DOCTOR, avatar: '/images/doctors/dr-rajesh-sharma.webp' }} />);
    const img = screen.getByRole('img', { name: DOCTOR.name });
    expect(img).toHaveAttribute('src', '/images/doctors/dr-rajesh-sharma.webp');
    expect(img.className).toContain('object-top');
  });

  it('renders a WhatsApp CTA when whatsappHref is provided', () => {
    render(<DoctorCard doctor={DOCTOR} whatsappLabel="WhatsApp" />);
    const whatsapp = screen.getByRole('link', { name: /whatsapp/i });
    expect(whatsapp).toHaveAttribute('href', DOCTOR.whatsappHref);
    expect(whatsapp).toHaveAttribute('target', '_blank');
  });

  it('omits the WhatsApp CTA when whatsappHref is missing', () => {
    const { whatsappHref, ...doctor } = DOCTOR;
    render(<DoctorCard doctor={doctor} />);
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument();
  });
});
