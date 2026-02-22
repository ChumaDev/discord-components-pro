import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#5865F2',
    onChange: (color) => console.log('Color changed:', color),
  },
};

export const NoValue: Story = {
  args: {
    value: null,
    onChange: (color) => console.log('Color changed:', color),
  },
};

export const Interactive: Story = {
  args: {
    value: '#5865F2',
    onChange: (color) => console.log('Color changed:', color),
  },
  render: (args) => {
    const [color, setColor] = useState<string | null>(args.value || '#5865F2');
    return (
      <div>
        <ColorPicker value={color} onChange={setColor} />
        {color && (
          <div style={{ marginTop: '1rem' }}>
            <p>Selected color: {color}</p>
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: color,
                borderRadius: '8px',
                marginTop: '0.5rem',
              }}
            />
          </div>
        )}
      </div>
    );
  },
};

export const PresetColors: Story = {
  args: {
    value: '#ED4245',
    onChange: (color) => console.log('Color changed:', color),
  },
  render: (args) => {
    const [color, setColor] = useState<string | null>(args.value || '#ED4245');
    return (
      <div>
        <ColorPicker value={color} onChange={setColor} />
        <p style={{ marginTop: '1rem' }}>Try the preset Discord colors!</p>
      </div>
    );
  },
};
