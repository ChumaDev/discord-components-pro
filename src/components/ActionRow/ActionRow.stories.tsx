import type { Meta, StoryObj } from '@storybook/react';
import { ButtonStyle } from '../../types/discord';
import { Button } from '../Button';
import { ActionRow } from './ActionRow';

const meta = {
  title: 'Components/ActionRow',
  component: ActionRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithButtons: Story = {
  args: {
    children: (
      <>
        <Button style={ButtonStyle.Primary} label="Accept" />
        <Button style={ButtonStyle.Secondary} label="Decline" />
        <Button style={ButtonStyle.Danger} label="Delete" />
      </>
    ),
  },
};

export const Empty: Story = {
  args: {
    children: undefined,
  },
};

export const Editable: Story = {
  args: {
    editable: true,
    onDelete: () => console.log('Delete action row'),
    children: (
      <>
        <Button style={ButtonStyle.Primary} label="Button 1" />
        <Button style={ButtonStyle.Secondary} label="Button 2" />
      </>
    ),
  },
};

export const SingleButton: Story = {
  args: {
    children: <Button style={ButtonStyle.Success} label="✅ Verify" />,
  },
};

export const LinkButtons: Story = {
  args: {
    children: (
      <>
        <Button style={ButtonStyle.Link} label="Discord" url="https://discord.com" />
        <Button style={ButtonStyle.Link} label="GitHub" url="https://github.com" />
      </>
    ),
  },
};
