import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StringSelect } from './StringSelect';

const meta = {
  title: 'Components/StringSelect',
  component: StringSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StringSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    placeholder: 'Select an option',
  },
};

export const WithEmojis: Story = {
  args: {
    options: [
      { label: 'Red Team', value: 'red', emoji: '🔴' },
      { label: 'Blue Team', value: 'blue', emoji: '🔵' },
      { label: 'Green Team', value: 'green', emoji: '🟢' },
    ],
    placeholder: 'Choose your team',
  },
};

export const WithDescriptions: Story = {
  args: {
    options: [
      {
        label: 'Beginner',
        value: 'beginner',
        emoji: '🌱',
        description: 'Just starting out',
      },
      {
        label: 'Intermediate',
        value: 'intermediate',
        emoji: '⚡',
        description: 'Some experience',
      },
      {
        label: 'Expert',
        value: 'expert',
        emoji: '🏆',
        description: 'Highly skilled',
      },
    ],
    placeholder: 'Select your level',
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
    placeholder: 'Disabled select',
    disabled: true,
  },
};

export const Editable: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
    editable: true,
    onEdit: () => console.log('Edit select'),
    onDelete: () => console.log('Delete select'),
  },
};

export const Interactive: Story = {
  args: {
    options: [
      { label: 'Apple', value: 'apple', emoji: '🍎' },
      { label: 'Banana', value: 'banana', emoji: '🍌' },
      { label: 'Orange', value: 'orange', emoji: '🍊' },
    ],
    placeholder: 'Pick a fruit',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return (
      <div>
        <StringSelect
          options={args.options}
          value={value}
          onChange={setValue}
          placeholder={args.placeholder}
        />
        {value && <p style={{ marginTop: '1rem' }}>Selected: {value}</p>}
      </div>
    );
  },
};
