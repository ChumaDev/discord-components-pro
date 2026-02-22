import type { Meta, StoryObj } from '@storybook/react';
import { ContainerAccent } from '../../types/discord';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: Object.values(ContainerAccent).filter((v) => typeof v === 'number'),
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>This is a container with default styling.</p>,
  },
};

export const WithFields: Story = {
  args: {
    children: (
      <div>
        <h3>User Information</h3>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    accent: ContainerAccent.Primary,
    children: (
      <div>
        <h3>Announcement</h3>
        <p>This is an important announcement.</p>
        <footer style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
          Posted by Admin
        </footer>
      </div>
    ),
  },
};

export const WithAuthor: Story = {
  args: {
    accent: ContainerAccent.Secondary,
    children: (
      <div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}
        >
          <div
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#5865F2' }}
          />
          <strong>Message from Admin</strong>
        </div>
        <p>Welcome to the server!</p>
      </div>
    ),
  },
};

export const Spoiler: Story = {
  args: {
    spoiler: true,
    children: (
      <div>
        <h3>Spoiler Content</h3>
        <p>This content is hidden until revealed.</p>
      </div>
    ),
  },
};

export const AllColors: Story = {
  args: {
    children: <p>Container</p>,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Container accent={ContainerAccent.None}>
        <p>None - No accent color</p>
      </Container>
      <Container accent={ContainerAccent.Primary}>
        <p>Primary - Discord Blurple</p>
      </Container>
      <Container accent={ContainerAccent.Secondary}>
        <p>Secondary - Gray</p>
      </Container>
      <Container accent={ContainerAccent.Success}>
        <p>Success - Green</p>
      </Container>
      <Container accent={ContainerAccent.Danger}>
        <p>Danger - Red</p>
      </Container>
    </div>
  ),
};

export const Complete: Story = {
  args: {
    accent: ContainerAccent.Primary,
    children: (
      <div>
        <h2>Complete Example</h2>
        <p>This container demonstrates all features together.</p>
        <ul>
          <li>Accent color</li>
          <li>Rich content</li>
          <li>Multiple elements</li>
        </ul>
      </div>
    ),
  },
};
