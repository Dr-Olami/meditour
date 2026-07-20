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
};

const meta: Meta<typeof DoctorCard> = {
  title: 'Organisms/DoctorCard',
  component: DoctorCard,
  argTypes: {
    bookLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { doctor: SAMPLE_DOCTOR, bookLabel: 'Book Now' },
  decorators: [(S) => <div className="w-72"><S /></div>],
};

export const WithAvatar: Story = {
  args: {
    doctor: { ...SAMPLE_DOCTOR, avatar: 'https://i.pravatar.cc/150?img=47' },
    bookLabel: 'Book Now',
  },
  decorators: [(S) => <div className="w-72"><S /></div>],
};

export const Minimal: Story = {
  args: {
    doctor: { name: 'Dr. Karim', specialty: 'Orthopedics' },
    bookLabel: 'Book Now',
  },
  decorators: [(S) => <div className="w-72"><S /></div>],
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {['Cardiology', 'Oncology', 'Neurology'].map((s, i) => (
        <DoctorCard
          key={s}
          doctor={{ name: `Dr. Example ${i + 1}`, specialty: s, experienceYears: 10 + i }}
          bookLabel="Book Now"
        />
      ))}
    </div>
  ),
};
