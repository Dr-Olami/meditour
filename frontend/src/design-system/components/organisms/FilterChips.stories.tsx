import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChips } from './FilterChips';

const SPECIALTIES = [
  'All specialities',
  'Heart Failure & Transplantation Medicine',
  'Neurology',
  'Paediatric Nephrology',
  'Medical Oncology, Immunotherapy & Precision Medicine',
  'Paediatric Neurology',
  'Haematology & Bone Marrow Transplantation',
  'Uro-Oncology, Robotic Surgery & Renal Transplantation',
  'Adult & Paediatric Cardiac Surgery',
  'Surgical Oncology',
  'HPB & Liver and Pancreatic Transplant',
  'Surgical Gastroenterology',
  'Breast Oncology & Reconstructive Surgery',
  'Interventional Cardiology',
  'Nephrology & Transplant Physician',
  'Neurosurgery & Spine Surgery',
  'Adult Cardiac Surgery',
  'Cardio Thoracic & Transplant Surgery',
  'Spine Surgery & Robotic Spine Surgery',
  'Orthopaedics',
  'Surgical Oncology & Robotic Surgery',
  'Orthopaedic Surgery & Joint Replacement',
  'ENT & Endoscopic Skull Base Surgery',
  'Bariatric Surgery & General Surgery',
  'Orthopaedic & Robotic Joint Replacement Surgery',
  'Haematology, Paediatric Oncology & Bone Marrow Transplantation',
  'Urology & Robotic Surgery',
  'Head & Neck Oncology & Surgical Oncology',
];

const meta: Meta<typeof FilterChips> = {
  title: 'Organisms/FilterChips',
  component: FilterChips,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState('All specialities');
    return <FilterChips options={SPECIALTIES} active={active} onSelect={setActive} />;
  },
};

export const NarrowContainer: Story = {
  render: () => {
    const [active, setActive] = React.useState('All specialities');
    return (
      <div className="w-80">
        <FilterChips options={SPECIALTIES} active={active} onSelect={setActive} />
      </div>
    );
  },
};

export const FewOptions: Story = {
  render: () => {
    const [active, setActive] = React.useState('All specialities');
    return (
      <FilterChips
        options={['All specialities', 'Cardiology', 'Oncology']}
        active={active}
        onSelect={setActive}
      />
    );
  },
};
