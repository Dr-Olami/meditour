import type { Meta, StoryObj } from '@storybook/react';
import { HospitalCard } from './HospitalCard';

const SAMPLE_HOSPITAL = {
  slug: 'apollo-hospitals-bannerghatta',
  name: 'Apollo Hospitals, Bannerghatta Road, Bangalore',
  city: 'Bangalore',
  country: 'India',
  image: 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?w=800&auto=format&fit=crop',
  accreditations: ['JCI Accredited', 'NABH'],
};

const meta: Meta<typeof HospitalCard> = {
  title: 'Organisms/HospitalCard',
  component: HospitalCard,
  argTypes: {
    viewLabel: { control: 'text' },
    locale: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { hospital: SAMPLE_HOSPITAL, viewLabel: 'View hospital', locale: 'en' },
  decorators: [(S) => <div className="w-80"><S /></div>],
};

export const WithoutImage: Story = {
  args: {
    hospital: { ...SAMPLE_HOSPITAL, image: undefined },
    viewLabel: 'View hospital',
    locale: 'en',
  },
  decorators: [(S) => <div className="w-80"><S /></div>],
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {[SAMPLE_HOSPITAL, { ...SAMPLE_HOSPITAL, slug: 'fortis-hospital-bannerghatta', name: 'Fortis Hospital, Bannerghatta Road, Bangalore' }, { ...SAMPLE_HOSPITAL, slug: 'sparsh-hospital-hennur', name: 'SPARSH Hospital, Hennur, Bangalore' }].map((hospital) => (
        <HospitalCard key={hospital.slug} hospital={hospital} viewLabel="View hospital" locale="en" />
      ))}
    </div>
  ),
};
