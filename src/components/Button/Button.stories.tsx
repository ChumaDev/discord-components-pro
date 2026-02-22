import type { Meta, StoryObj } from '@storybook/react';
import { ButtonStyle } from '../../types/discord';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: Object.values(ButtonStyle).filter((v) => typeof v === 'number'),
    },
    disabled: {
      control: 'boolean',
    },
    emoji: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    style: ButtonStyle.Primary,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    style: ButtonStyle.Secondary,
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    style: ButtonStyle.Success,
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    style: ButtonStyle.Danger,
    disabled: false,
  },
};

export const Link: Story = {
  args: {
    label: 'Link Button',
    style: ButtonStyle.Link,
    url: 'https://discord.com',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    style: ButtonStyle.Primary,
    disabled: true,
  },
};

export const WithEmoji: Story = {
  args: {
    label: 'Button with Emoji',
    style: ButtonStyle.Primary,
    emoji: '🎉',
    disabled: false,
  },
};

export const WithCustomEmoji: Story = {
  args: {
    label: 'Custom Discord Emoji',
    style: ButtonStyle.Success,
    emoji: {
      name: 'custom',
      id: '123456789012345678',
      animated: false,
    },
    disabled: false,
  },
};

export const WithAnimatedEmoji: Story = {
  args: {
    label: 'Animated Emoji',
    style: ButtonStyle.Primary,
    emoji: {
      name: 'animated',
      id: '987654321098765432',
      animated: true,
    },
    disabled: false,
  },
};

export const EmojiVariations: Story = {
  args: {
    label: 'Button',
    style: ButtonStyle.Primary,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button label="Unicode Emoji" style={ButtonStyle.Primary} emoji="👍" />
      <Button label="Text Emoji" style={ButtonStyle.Secondary} emoji=":smile:" />
      <Button
        label="Custom Emoji"
        style={ButtonStyle.Success}
        emoji={{ name: 'custom', id: '123456789012345678' }}
      />
      <Button
        label="Animated Emoji"
        style={ButtonStyle.Danger}
        emoji={{ name: 'animated', id: '987654321098765432', animated: true }}
      />
      <Button label="Emoji Only Name" style={ButtonStyle.Secondary} emoji={{ name: '🔥' }} />
    </div>
  ),
};

export const AllStyles: Story = {
  args: {
    label: 'Button',
    style: ButtonStyle.Primary,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button label="Primary" style={ButtonStyle.Primary} />
      <Button label="Secondary" style={ButtonStyle.Secondary} />
      <Button label="Success" style={ButtonStyle.Success} />
      <Button label="Danger" style={ButtonStyle.Danger} />
      <Button label="Link" style={ButtonStyle.Link} url="https://discord.com" />
    </div>
  ),
};
