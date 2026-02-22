# Storybook Documentation

This directory contains the Storybook configuration for Discord Components SDK.

## Structure

```
.storybook/
├── main.ts          # Storybook configuration
├── preview.ts       # Global preview settings
└── README.md        # This file
```

## Running Storybook

### Development Mode

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Build Static Site

```bash
npm run build-storybook
```

This will create a static site in `storybook-static/` directory.

## Configuration

### main.ts

- **stories**: Pattern for finding story files
- **addons**: Storybook addons
- **framework**: React with Vite
- **viteFinal**: Custom Vite configuration with path aliases

### preview.ts

- **parameters**: Global parameters for all stories
- **backgrounds**: Custom background colors (Discord themes)
- **controls**: Control matchers for props
- **layout**: Default layout (centered)

## Writing Stories

### Component Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: 'value1',
    prop2: 'value2',
  },
};
```

### MDX Documentation

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Documentation/MyDoc" />

# My Documentation

Content here...
```

## Addons

### Installed Addons

1. **@storybook/addon-links** - Link between stories
2. **@storybook/addon-essentials** - Essential addons bundle
   - Controls
   - Actions
   - Viewport
   - Backgrounds
   - Toolbars
   - Measure
   - Outline
3. **@storybook/addon-interactions** - Test user interactions

## Themes

Custom Discord-themed backgrounds:

- **discord-dark** (#313338) - Default Discord dark theme
- **discord-light** (#ffffff) - Discord light theme
- **midnight** (#0a0a0a) - Midnight theme

## Best Practices

### Story Organization

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.stories.tsx  ← Component stories
│       └── Button.test.tsx
└── Introduction.stories.mdx    ← Documentation
```

### Story Naming

- Use descriptive names: `Primary`, `Secondary`, `WithIcon`
- Group related stories: `AllStyles`, `AllSizes`
- Include edge cases: `Disabled`, `Loading`, `Error`

### Args vs Render

```tsx
// Simple props - use args
export const Simple: Story = {
  args: {
    label: 'Click me',
  },
};

// Complex rendering - use render
export const Complex: Story = {
  render: () => (
    <div>
      <Button label="Button 1" />
      <Button label="Button 2" />
    </div>
  ),
};
```

### Documentation

- Use `tags: ['autodocs']` for automatic documentation
- Add `argTypes` for better controls
- Include descriptions in component props
- Add examples for common use cases

## Deployment

### GitHub Pages

```bash
# Build static site
npm run build-storybook

# Deploy to GitHub Pages
# (configure in repository settings)
```

### Netlify/Vercel

1. Connect repository
2. Set build command: `npm run build-storybook`
3. Set publish directory: `storybook-static`

## Troubleshooting

### Stories Not Loading

- Check file pattern in `main.ts`
- Ensure files end with `.stories.tsx` or `.stories.mdx`
- Verify imports are correct

### Build Errors

```bash
# Clean and rebuild
rm -rf node_modules storybook-static
npm install
npm run build-storybook
```

### Path Alias Issues

- Check `viteFinal` configuration in `main.ts`
- Ensure aliases match `tsconfig.json`
- Restart Storybook after changes

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Addons](https://storybook.js.org/addons)
