import type { Meta, StoryObj } from '@storybook/react';
import { TextDisplay } from './TextDisplay';

const meta = {
  title: 'Components/TextDisplay',
  component: TextDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a simple text display.',
  },
};

export const Editable: Story = {
  args: {
    content: 'Click to edit this text.',
    editable: true,
    onChange: (content) => console.log('Content changed:', content),
  },
};

export const Markdown: Story = {
  args: {
    content: 'This is **bold** and this is *italic* text.',
  },
};

export const MultiLine: Story = {
  args: {
    content: `Line 1
Line 2
Line 3`,
  },
};

export const WithMentions: Story = {
  args: {
    content: 'Hey <@123456789>, check out <#channel-id>!',
  },
};

export const WithCodeBlocks: Story = {
  args: {
    content: `Here's some code:
\`\`\`javascript
function hello() {
  console.log('Hello, world!');
}
\`\`\``,
  },
};

export const AllFormats: Story = {
  args: {
    content: 'Text',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextDisplay content="**Bold text**" />
      <TextDisplay content="*Italic text*" />
      <TextDisplay content="~~Strikethrough~~" />
      <TextDisplay content="`Inline code`" />
      <TextDisplay content="||Spoiler text||" />
      <TextDisplay content="[Link](https://discord.com)" />
    </div>
  ),
};
