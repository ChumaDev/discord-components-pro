import type { Meta, StoryObj } from '@storybook/react';
import { MessageBuilder } from './MessageBuilder';

const meta = {
  title: 'Components/MessageBuilder',
  component: MessageBuilder,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MessageBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: 'dark',
    editable: true,
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    editable: true,
  },
};

export const ReadOnly: Story = {
  args: {
    theme: 'dark',
    editable: false,
  },
};

export const Interactive: Story = {
  args: {
    theme: 'dark',
    editable: true,
  },
  render: (args) => {
    return (
      <div style={{ padding: '2rem' }}>
        <MessageBuilder theme={args.theme} editable={args.editable} />
      </div>
    );
  },
};
