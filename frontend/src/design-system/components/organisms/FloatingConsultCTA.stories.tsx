import type { Meta, StoryObj } from '@storybook/react';
import { FloatingConsultCTA } from './FloatingConsultCTA';

const meta: Meta<typeof FloatingConsultCTA> = {
  title: 'Organisms/FloatingConsultCTA',
  component: FloatingConsultCTA,
  argTypes: {
    headline: { control: 'text' },
    subtext: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: 'Ready to begin your health journey?',
    subtext: 'Speak to our care coordinators — free consultation, no commitment.',
    primaryCta: { label: 'Book a Free Consult', href: '#contact' },
    secondaryCta: { label: 'Learn more', href: '#about' },
  },
};

export const PrimaryOnly: Story = {
  args: {
    headline: 'Get expert care today.',
    primaryCta: { label: 'Contact Us', href: '#contact' },
  },
};
