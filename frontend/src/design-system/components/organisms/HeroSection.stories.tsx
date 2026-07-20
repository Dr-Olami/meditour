import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    eyebrow: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'World-class medical care',
    headline: 'Your health journey starts here.',
    subheadline: 'Expert doctors, world-class facilities, and seamless care coordination — all from Bangladesh.',
    primaryCta: { label: 'Book a Consultation', href: '#contact' },
  },
};

export const WithoutMedia: Story = {
  args: {
    headline: 'Trusted by 10,000+ patients worldwide.',
    primaryCta: { label: 'Get Started', href: '#' },
  },
};

export const MinimalHero: Story = {
  args: {
    headline: 'Expert Care. Simplified.',
  },
};
