import type { Meta } from '@storybook/react';

const meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Welcome = () => (
  <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
    <h1>Discord Components SDK</h1>
    <p style={{ fontSize: '18px', color: '#666' }}>
      Welcome to the Discord Components SDK Storybook documentation!
    </p>

    <h2>Overview</h2>
    <p>
      This is a professional React library for building Discord Components v2 with TypeScript
      support and modular architecture.
    </p>

    <h2>Features</h2>

    <h3>🎨 Components (15)</h3>
    <ul>
      <li>
        <strong>Core</strong>: TextDisplay, Button, Container, ActionRow, Separator, MediaGallery,
        StringSelect, Thumbnail
      </li>
      <li>
        <strong>Utility</strong>: Dialog, EmojiPicker, ColorPicker, FileUpload, MarkdownPreview,
        SortableItem
      </li>
      <li>
        <strong>Composite</strong>: MessageBuilder with full drag & drop
      </li>
    </ul>

    <h3>⚡ Features (13 Modular Systems)</h3>
    <ul>
      <li>Analytics - Track component usage</li>
      <li>Batch Operations - Mass operations</li>
      <li>Clipboard - Copy/paste with ID regeneration</li>
      <li>DnD - Drag & drop with @dnd-kit</li>
      <li>Export - JSON, Discord.js, TypeScript, Python</li>
      <li>Import - From JSON, Discord.js, files</li>
      <li>History - Undo/redo with compression</li>
      <li>Keyboard - Shortcuts with presets</li>
      <li>Markdown - Discord markdown parsing</li>
      <li>Performance - Debounce, throttle, lazy load</li>
      <li>Search - Component search and filtering</li>
      <li>Theme - Custom theme management</li>
      <li>Validation - Zod schemas for Discord limits</li>
    </ul>

    <h2>Getting Started</h2>

    <h3>Installation</h3>
    <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
      <code>npm install @discord-components/sdk</code>
    </pre>

    <h3>Basic Usage</h3>
    <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
      <code>{`import { Button, Container, TextDisplay } from '@discord-components/sdk';
import '@discord-components/sdk/styles';

function App() {
  return (
    <Container title="Welcome" color="#5865F2">
      <TextDisplay content="Hello, Discord!" />
      <Button label="Click me" style="primary" />
    </Container>
  );
}`}</code>
    </pre>

    <h2>Documentation</h2>
    <ul>
      <li>
        <strong>Components</strong> - Browse all available components
      </li>
      <li>
        <strong>Features</strong> - Explore feature modules
      </li>
      <li>
        <strong>Examples</strong> - See real-world examples
      </li>
    </ul>

    <h2>Resources</h2>
    <ul>
      <li>
        <a
          href="https://github.com/ChumaDev/discord-components-pro"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ChumaDev/discord-components-pro/blob/master/API_REFERENCE.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          API Reference
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ChumaDev/discord-components-pro/blob/master/DEVELOPER_GUIDE.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developer Guide
        </a>
      </li>
    </ul>

    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

    <p style={{ color: '#666', fontSize: '14px' }}>
      <strong>Version</strong>: 0.1.0
      <br />
      <strong>License</strong>: MIT
      <br />
      Made with ❤️ and professional engineering practices
    </p>
  </div>
);
