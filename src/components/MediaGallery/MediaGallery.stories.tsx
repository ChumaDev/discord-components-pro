import type { Meta, StoryObj } from '@storybook/react';
import { MediaGallery } from './MediaGallery';

const meta = {
  title: 'Components/MediaGallery',
  component: MediaGallery,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MediaGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleImage: Story = {
  args: {
    items: [
      {
        url: 'https://picsum.photos/400/300',
        description: 'Beautiful landscape',
      },
    ],
  },
};

export const MultipleImages: Story = {
  args: {
    items: [
      { url: 'https://picsum.photos/400/300?random=1' },
      { url: 'https://picsum.photos/400/300?random=2' },
      { url: 'https://picsum.photos/400/300?random=3' },
      { url: 'https://picsum.photos/400/300?random=4' },
    ],
  },
};

export const WithSpoilers: Story = {
  args: {
    items: [
      {
        url: 'https://picsum.photos/400/300?random=5',
        spoiler: true,
        description: 'Spoiler image - click to reveal',
      },
      {
        url: 'https://picsum.photos/400/300?random=6',
        spoiler: true,
      },
    ],
  },
};

export const WithDescriptions: Story = {
  args: {
    items: [
      {
        url: 'https://picsum.photos/400/300?random=7',
        description: 'Mountain view at sunset',
      },
      {
        url: 'https://picsum.photos/400/300?random=8',
        description: 'Ocean waves crashing',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Editable: Story = {
  args: {
    items: [
      { url: 'https://picsum.photos/400/300?random=9' },
      { url: 'https://picsum.photos/400/300?random=10' },
    ],
    editable: true,
    onEdit: () => console.log('Edit gallery'),
    onDelete: () => console.log('Delete gallery'),
  },
};
