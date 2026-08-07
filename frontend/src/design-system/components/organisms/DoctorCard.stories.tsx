import type { Meta, StoryObj } from '@storybook/react';
import { DoctorCard } from './DoctorCard';

const SAMPLE_DOCTOR = {
  name: 'Dr. Aisha Rahman',
  specialty: 'Cardiology',
  hospitalName: 'Dhaka Medical College & Hospital',
  hospitalHref: '/hospitals/dhaka-medical',
  qualification: 'MBBS, MD (Cardiology), FESC',
  experienceYears: 18,
  href: '#book',
  whatsappHref: 'https://wa.me/8801611892986',
};

const meta: Meta<typeof DoctorCard> = {
  title: 'Organisms/DoctorCard',
  component: DoctorCard,
  argTypes: {
    bookLabel: { control: 'text' },
    whatsappLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { doctor: SAMPLE_DOCTOR, bookLabel: 'Book Now', whatsappLabel: 'WhatsApp' },
  decorators: [(S) => <div className="w-[36rem] max-w-full"><S /></div>],
};

export const WithPhoto: Story = {
  args: {
    doctor: { ...SAMPLE_DOCTOR, avatar: 'https://i.pravatar.cc/480x600?img=47' },
    bookLabel: 'Book Now',
    whatsappLabel: 'WhatsApp',
  },
  decorators: [(S) => <div className="w-[36rem] max-w-full"><S /></div>],
};

export const NoWhatsApp: Story = {
  args: {
    doctor: { ...SAMPLE_DOCTOR, whatsappHref: undefined },
    bookLabel: 'Book Now',
  },
  decorators: [(S) => <div className="w-[36rem] max-w-full"><S /></div>],
};

export const Minimal: Story = {
  args: {
    doctor: { name: 'Dr. Karim', specialty: 'Orthopedics' },
    bookLabel: 'Book Now',
  },
  decorators: [(S) => <div className="w-[36rem] max-w-full"><S /></div>],
};

export const Grid: Story = {
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      {['Cardiology', 'Oncology', 'Neurology'].map((s, i) => (
        <DoctorCard
          key={s}
          doctor={{
            name: `Dr. Example ${i + 1}`,
            specialty: s,
            experienceYears: 10 + i,
            avatar: `https://i.pravatar.cc/480x600?img=${i + 11}`,
            whatsappHref: 'https://wa.me/8801611892986',
          }}
          bookLabel="Book Now"
        />
      ))}
    </div>
  ),
};
