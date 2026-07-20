import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChips } from './FilterChips';

const SPECIALTIES = ['All', 'Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'Dermatology', 'Ophthalmology', 'Gastroenterology'];

const meta: Meta<typeof FilterChips> = {
  title: 'Organisms/FilterChips',
  component: FilterChips,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState('All');
    return (
      <FilterChips options={SPECIALTIES} active={active} onSelect={setActive} />
    );
  },
};

export const MobileScrollArrows: Story = {
  render: () => {
    const [active, setActive] = React.useState('All');
    return (
      <div className="w-80">
        <FilterChips options={SPECIALTIES} active={active} onSelect={setActive} />
      </div>
    );
  },
};

export const FewOptions: Story = {
  render: () => {
    const [active, setActive] = React.useState('All');
    return (
      <FilterChips options={['All', 'Cardiology', 'Oncology']} active={active} onSelect={setActive} />
    );
  },
};
