import type { Meta, StoryObj } from '@storybook/react';
import { SeparatorSpacing } from '../../types/discord';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: Object.values(SeparatorSpacing),
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: SeparatorSpacing.Small,
    divider: true,
  },
};

export const NoSpacing: Story = {
  args: {
    spacing: SeparatorSpacing.None,
    divider: true,
  },
};

export const LargeSpacing: Story = {
  args: {
    spacing: SeparatorSpacing.Large,
    divider: true,
  },
};

export const NoDivider: Story = {
  args: {
    spacing: SeparatorSpacing.Small,
    divider: false,
  },
};

export const Editable: Story = {
  args: {
    spacing: SeparatorSpacing.Small,
    divider: true,
    editable: true,
    onEdit: () => console.log('Edit separator'),
    onDelete: () => console.log('Delete separator'),
  },
};
