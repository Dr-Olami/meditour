import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../../../../src/design-system/components/organisms/Navbar';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Hospitals', href: '/hospitals' },
];

const CTA = { label: 'Contact', href: '#contact' };

describe('Navbar', () => {
  it('renders the brand and all nav links', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} cta={CTA} />);

    expect(screen.getByLabelText('Khan Meditour')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Doctors')).toBeInTheDocument();
    expect(screen.getByText('Hospitals')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} cta={CTA} />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders without a CTA when none is provided', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} />);

    expect(screen.queryByText('Contact')).not.toBeInTheDocument();
  });

  it('renders the language switcher when locale and currentPath are provided', () => {
    render(
      <Navbar brand="Khan Meditour" links={LINKS} locale="en" currentPath="/" />,
    );

    // Reason: compact mode renders short labels (EN, বাং) with aria-labels
    // for accessibility.
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('বাং')).toBeInTheDocument();
  });

  it('does not render the language switcher when locale is omitted', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} currentPath="/" />);

    expect(screen.queryByText('EN')).not.toBeInTheDocument();
    expect(screen.queryByText('বাং')).not.toBeInTheDocument();
  });

  it('does not render the language switcher when currentPath is omitted', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} locale="en" />);

    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('marks the current locale as active in the switcher', () => {
    render(
      <Navbar brand="Khan Meditour" links={LINKS} locale="bn" currentPath="/bn" />,
    );

    const bnLink = screen.getByText('বাং').closest('a');
    expect(bnLink).toHaveAttribute('aria-current', 'true');
  });

  it('always shows the switcher — no need to open the mobile menu', () => {
    render(
      <Navbar brand="Khan Meditour" links={LINKS} locale="en" currentPath="/" />,
    );

    // Reason: the switcher is always visible in the navbar, not hidden inside
    // the hamburger dropdown. It should be present before any click.
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('বাং')).toBeInTheDocument();
  });

  it('switcher links have accessible aria-labels with full language names', () => {
    render(
      <Navbar brand="Khan Meditour" links={LINKS} locale="en" currentPath="/" />,
    );

    expect(screen.getByLabelText('English')).toBeInTheDocument();
    expect(screen.getByLabelText('বাংলা')).toBeInTheDocument();
  });

  it('toggles the mobile menu open and closed', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} />);

    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });
});
