import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { EmojiPicker } from './EmojiPicker';

const meta = {
  title: 'Components/EmojiPicker',
  component: EmojiPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: (emoji) => console.log('Selected:', emoji),
    theme: 'dark',
  },
};

export const LightTheme: Story = {
  args: {
    onSelect: (emoji) => console.log('Selected:', emoji),
    theme: 'light',
  },
};

export const Interactive: Story = {
  args: {
    onSelect: (emoji) => console.log('Selected:', emoji),
    theme: 'dark',
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>('');
    return (
      <div>
        <EmojiPicker onSelect={setSelected} theme={args.theme} />
        {selected && <p style={{ marginTop: '1rem', fontSize: '2rem' }}>Selected: {selected}</p>}
      </div>
    );
  },
};
