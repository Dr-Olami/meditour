import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../../../../src/design-system/components/organisms/Navbar';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Hospitals', href: '/hospitals' },
];

const WHATSAPP_HREF = 'https://wa.me/8801611892986';
const PHONE_NUMBER = '919606624861';

describe('Navbar', () => {
  it('renders the brand and all nav links', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} />);

    expect(screen.getByLabelText('Khan Meditour')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Doctors')).toBeInTheDocument();
    expect(screen.getByText('Hospitals')).toBeInTheDocument();
  });

  it('renders the WhatsApp CTA button when whatsappHref is provided', () => {
    render(
      <Navbar
        brand="Khan Meditour"
        links={LINKS}
        whatsappHref={WHATSAPP_HREF}
        whatsappLabel="WhatsApp"
      />
    );

    const waLink = screen.getByText('WhatsApp');
    expect(waLink).toBeInTheDocument();
    expect(waLink.closest('a')).toHaveAttribute('href', WHATSAPP_HREF);
  });

  it('renders the Call button when phoneNumber is provided', () => {
    render(
      <Navbar brand="Khan Meditour" links={LINKS} phoneNumber={PHONE_NUMBER} callLabel="Call" />
    );

    const callLink = screen.getByText('Call');
    expect(callLink).toBeInTheDocument();
    expect(callLink.closest('a')).toHaveAttribute('href', `tel:+${PHONE_NUMBER}`);
  });

  it('does not render the WhatsApp CTA when whatsappHref is omitted', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} />);

    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument();
  });

  it('renders the language switcher button when locale and currentPath are provided', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} locale="en" currentPath="/" />);

    // Reason: compact mode renders the current locale's short label (EN) on the button.
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('does not render the language switcher when locale is omitted', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} currentPath="/" />);

    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('does not render the language switcher when currentPath is omitted', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} locale="en" />);

    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('marks the current locale as active in the switcher dropdown', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} locale="bn" currentPath="/bn" />);

    // Reason: the switcher is a dropdown — open it to reveal the locale options.
    const switcherButton = screen.getByLabelText('Language: বাংলা');
    fireEvent.click(switcherButton);

    // Reason: the active locale is marked with aria-selected on the <li> option.
    // Use বাংলা (full label) which only appears in the dropdown, not the button.
    const bnOption = screen.getByText('বাংলা').closest('li');
    expect(bnOption).toHaveAttribute('aria-selected', 'true');
  });

  it('always shows the switcher button — no need to open the mobile menu', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} locale="en" currentPath="/" />);

    // Reason: the switcher button is always visible in the navbar, not hidden
    // inside the hamburger dropdown.
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('switcher dropdown options show full language names when opened', () => {
    render(<Navbar brand="Khan Meditour" links={LINKS} locale="en" currentPath="/" />);

    // Reason: the full language names are only rendered when the dropdown is open.
    const switcherButton = screen.getByLabelText('Language: English');
    fireEvent.click(switcherButton);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('বাংলা')).toBeInTheDocument();
  });

  it('uses localeFallbacks for untranslated pages instead of a 404 path', () => {
    render(
      <Navbar
        brand="Khan Meditour"
        links={LINKS}
        locale="en"
        currentPath="/countries/bangladesh"
        localeFallbacks={{ bn: '/bn' }}
      />
    );

    // Reason: country pages are English-only for MVP — the Bengali toggle must
    // fall back to the Bengali homepage, not /bn/countries/bangladesh (a 404).
    const switcherButton = screen.getByLabelText('Language: English');
    fireEvent.click(switcherButton);

    expect(screen.getByText('বাংলা').closest('a')).toHaveAttribute('href', '/bn');
    // The English toggle still preserves the current path.
    expect(screen.getByText('English').closest('a')).toHaveAttribute(
      'href',
      '/countries/bangladesh'
    );
  });

  it('preserves the path for translated locales when no fallback is given', () => {
    render(
      <Navbar
        brand="Khan Meditour"
        links={LINKS}
        locale="en"
        currentPath="/treatments/cardiology"
      />
    );

    const switcherButton = screen.getByLabelText('Language: English');
    fireEvent.click(switcherButton);

    expect(screen.getByText('বাংলা').closest('a')).toHaveAttribute(
      'href',
      '/bn/treatments/cardiology'
    );
    expect(screen.getByText('English').closest('a')).toHaveAttribute(
      'href',
      '/treatments/cardiology'
    );
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
