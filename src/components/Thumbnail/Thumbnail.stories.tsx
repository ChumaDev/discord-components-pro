import type { Meta, StoryObj } from '@storybook/react';
import { Thumbnail } from './Thumbnail';

const meta = {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://picsum.photos/200/200',
  },
};

export const Empty: Story = {
  args: {
    url: '',
  },
};

export const Editable: Story = {
  args: {
    url: 'https://picsum.photos/200/200?random=1',
    editable: true,
    onEdit: () => console.log('Edit thumbnail'),
    onDelete: () => console.log('Delete thumbnail'),
  },
};

export const SquareImage: Story = {
  args: {
    url: 'https://picsum.photos/300/300',
  },
};

export const Portrait: Story = {
  args: {
    url: 'https://picsum.photos/200/300',
  },
};
