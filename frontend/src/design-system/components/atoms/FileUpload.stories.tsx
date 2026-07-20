import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Atoms/FileUpload',
  component: FileUpload,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Click to upload your medical report' } };
export const CustomAccept: Story = { args: { label: 'Upload passport scan (PDF/JPG)', accept: '.pdf,.jpg,.jpeg' } };
export const Disabled: Story = { args: { label: 'Upload not available', disabled: true } };
