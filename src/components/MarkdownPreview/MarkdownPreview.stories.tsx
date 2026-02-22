import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownPreview } from './MarkdownPreview';

const meta = {
  title: 'Components/MarkdownPreview',
  component: MarkdownPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MarkdownPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is **bold** and this is *italic* text.',
  },
};

export const Headers: Story = {
  args: {
    content: `# Header 1
## Header 2
### Header 3`,
  },
};

export const CodeBlocks: Story = {
  args: {
    content: `Inline \`code\` and block:

\`\`\`javascript
function hello() {
  console.log('Hello, world!');
}
\`\`\``,
  },
};

export const Lists: Story = {
  args: {
    content: `Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First
2. Second
3. Third`,
  },
};

export const Links: Story = {
  args: {
    content: 'Check out [Discord](https://discord.com) and [GitHub](https://github.com)!',
  },
};

export const Quotes: Story = {
  args: {
    content: `> This is a quote
> It can span multiple lines

Normal text here.`,
  },
};

export const Mixed: Story = {
  args: {
    content: `# Discord Message

This is a **bold** statement with *italic* emphasis.

> Important quote here

Check the code:
\`\`\`typescript
const message: string = "Hello!";
\`\`\`

Links:
- [Discord](https://discord.com)
- [Documentation](https://discord.js.org)`,
  },
};

export const Spoilers: Story = {
  args: {
    content: 'This is a ||spoiler|| text that can be revealed.',
  },
};

export const Mentions: Story = {
  args: {
    content: 'Hey <@123456789> and <@987654321>, check out <#channel-id>!',
  },
};
