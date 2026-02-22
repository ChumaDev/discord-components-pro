import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ButtonStyle } from '../../types/discord';
import { Button } from '../Button';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    children: <p>This action cannot be undone.</p>,
    trigger: <Button style={ButtonStyle.Primary} label="Open Dialog" />,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Delete Message',
    description: 'This will permanently delete the message',
    children: <p>Are you absolutely sure? This action cannot be undone.</p>,
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button style={ButtonStyle.Secondary} label="Cancel" />
        <Button style={ButtonStyle.Danger} label="Delete" />
      </div>
    ),
    trigger: <Button style={ButtonStyle.Danger} label="Delete" />,
  },
};

export const LongContent: Story = {
  args: {
    title: 'Terms of Service',
    description: 'Please read carefully',
    children: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
        <p>Excepteur sint occaecat cupidatat non proident.</p>
      </div>
    ),
    footer: <Button style={ButtonStyle.Primary} label="Accept" />,
    trigger: <Button style={ButtonStyle.Secondary} label="View Terms" />,
  },
};

export const Controlled: Story = {
  args: {
    title: 'Controlled Dialog',
    description: 'This dialog is controlled by state',
    children: <p>You can control the open state programmatically.</p>,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button
          style={ButtonStyle.Primary}
          label="Open Controlled Dialog"
          onClick={() => setOpen(true)}
        />
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title={args.title}
          description={args.description}
        >
          {args.children}
        </Dialog>
      </div>
    );
  },
};

export const NoDescription: Story = {
  args: {
    title: 'Simple Dialog',
    children: <p>This dialog has no description.</p>,
    trigger: <Button style={ButtonStyle.Secondary} label="Open" />,
  },
};
