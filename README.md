# Discord Components Pro

> Professional React SDK for building Discord Components v2 with visual editor, drag & drop, and TypeScript support.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-305%20passing-brightgreen)](https://github.com/ChumaDev/discord-components-pro)
[![Coverage](https://img.shields.io/badge/Coverage-85%25-brightgreen)](https://github.com/ChumaDev/discord-components-pro)

---

## ✨ Features

### 🎨 Visual Editor
- **MessageBuilder** - Complete visual editor with drag & drop
- **Live Preview** - Real-time Discord-style preview
- **Undo/Redo** - Full history management
- **Themes** - Dark/Light mode support

### 📦 Components (16)
- **Core**: Button, TextDisplay, StringSelect, Container, ActionRow, Separator
- **Advanced**: Dialog, EmojiPicker, ColorPicker, FileUpload, MediaGallery, MarkdownPreview
- **Utility**: Thumbnail, SortableItem, Icon, MessageBuilder

### 🔧 Features (13 Modules)
- 📤 **Export** - JSON, Discord.js, TypeScript, Python
- 📥 **Import** - From JSON with validation
- 🎨 **Drag & Drop** - Reorder components visually
- ⏮️ **History** - Undo/redo system
- ⌨️ **Keyboard** - Customizable shortcuts
- 🔍 **Search** - Find components quickly
- ✅ **Validation** - Discord API limits
- 📋 **Clipboard** - Copy/paste components
- 🎯 **Analytics** - Usage tracking
- 📦 **Batch** - Mass operations
- 📝 **Markdown** - Discord markdown support
- 🎨 **Theme** - Custom themes
- ⚡ **Performance** - Optimized hooks

### 🚀 Developer Experience
- ✅ **305 Tests** - 100% passing, 85% coverage
- 📚 **Full TypeScript** - Complete type safety
- 🎯 **Tree-shakeable** - Import only what you need
- ♿ **Accessible** - WCAG compliant
- 🏗️ **Modular** - Clean architecture

---

## 📦 Installation

```bash
npm install @discord-components/sdk
# or
yarn add @discord-components/sdk
# or
pnpm add @discord-components/sdk
```

---

## 🚀 Quick Start

```tsx
import { MessageBuilder } from '@discord-components/sdk';
import '@discord-components/sdk/sdk.css';

function App() {
  return (
    <MessageBuilder 
      theme="dark" 
      editable 
    />
  );
}
```

---

## � Usage Examples

### Basic Component

```tsx
import { Button, ButtonStyle } from '@discord-components/sdk';

function MyComponent() {
  return (
    <Button 
      style={ButtonStyle.Primary}
      label="Click Me"
      customId="my-button"
    />
  );
}
```

### Visual Editor

```tsx
import { MessageBuilder, useComponentStore } from '@discord-components/sdk';

function Editor() {
  const { components } = useComponentStore();
  
  return (
    <div>
      <MessageBuilder theme="dark" editable />
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}
```

### Export to Discord.js

```tsx
import { useExport } from '@discord-components/sdk';

function ExportButton() {
  const { exportToFormat } = useExport();
  
  const handleExport = () => {
    const result = exportToFormat(components, { format: 'discord.js' });
    console.log(result.content);
  };
  
  return <button onClick={handleExport}>Export</button>;
}
```

### Keyboard Shortcuts

```tsx
import { useKeyboardShortcuts } from '@discord-components/sdk';

function MyComponent() {
  useKeyboardShortcuts([
    { key: 's', ctrl: true, action: () => save() },
    { key: 'z', ctrl: true, action: () => undo() },
  ]);
  
  return <div>Press Ctrl+S to save</div>;
}
```

---

## 🎨 Export Formats

### JSON
```json
{
  "type": 2,
  "style": 1,
  "label": "Click me",
  "custom_id": "button_1"
}
```

### Discord.js
```javascript
new ButtonBuilder()
  .setStyle(ButtonStyle.Primary)
  .setLabel('Click me')
  .setCustomId('button_1')
```

### TypeScript
```typescript
const button: ButtonComponent = {
  type: 2,
  style: 1,
  label: 'Click me',
  custom_id: 'button_1'
};
```

### Python
```python
button = {
    "type": 2,
    "style": 1,
    "label": "Click me",
    "custom_id": "button_1"
}
```

---

## 📊 Bundle Size

| Format | Size | Gzipped |
|--------|------|---------|
| ES Module | 998 KB | 240 KB |
| UMD | 830 KB | 217 KB |
| CSS | 27 KB | 4.5 KB |

**Tree-shakeable** - Import only what you need!

---

## 🏗️ Architecture

```
src/
├── components/       # 16 React components
├── features/         # 13 feature modules
│   ├── export/       # Export to multiple formats
│   ├── import/       # Import with validation
│   ├── dnd/          # Drag & drop system
│   ├── history/      # Undo/redo
│   ├── keyboard/     # Keyboard shortcuts
│   ├── validation/   # Discord API validation
│   └── ...           # 7 more modules
├── hooks/            # React hooks
├── store/            # Zustand state management
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

---

## 🛠️ Development

```bash
# Install
npm install

# Dev server (playground)
npm run dev

# Build
npm run build

# Tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## 🧪 Testing

- **305 tests** - 100% passing
- **85% coverage** - All critical paths covered
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm run test:coverage # Coverage report
```

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern browsers with ES2020

---

## 📝 License

MIT © 2026 ChumaDev

---

## 🔗 Links

- [GitHub](https://github.com/ChumaDev/discord-components-pro)
- [Issues](https://github.com/ChumaDev/discord-components-pro/issues)
- [Changelog](CHANGELOG.md)
- [License](LICENSE)

---

## 🙏 Credits

Built with:
- [React](https://react.dev/) - UI library
- [@dnd-kit](https://dndkit.com/) - Drag and drop
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Vitest](https://vitest.dev/) - Testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

## ⚠️ Disclaimer

This is an independent community project, NOT affiliated with Discord Inc. or Discord.js.

---

**Made with ❤️ by ChumaDev**
