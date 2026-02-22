# Testing Infrastructure

Professional testing setup for Discord Components SDK using Vitest and React Testing Library.

## Structure

```
src/test/
├── setup.ts           # Test environment setup
├── utils/             # Test utilities
│   ├── render.tsx     # Custom render with providers
│   ├── mocks.ts       # Mock data generators
│   ├── matchers.ts    # Custom test matchers
│   └── index.ts       # Exports
└── README.md          # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Writing Tests

### Basic Test Structure

```typescript
import { describe, expect, it } from 'vitest';
import { render } from '@/test/utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
```

### Using Mock Data

```typescript
import { mockButton, mockTextDisplay } from '@/test/utils';

it('should handle button component', () => {
  const button = mockButton();
  expect(button.type).toBe('button');
});
```

### Testing Utilities

```typescript
import { generateId } from '@/utils/id';

it('should generate unique ids', () => {
  const id1 = generateId();
  const id2 = generateId();
  expect(id1).not.toBe(id2);
});
```

## Test Coverage

Current coverage targets:
- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the component does, not how it does it
   - Test user interactions and outcomes

2. **Use Descriptive Test Names**
   - Use "should" statements
   - Be specific about what is being tested

3. **Keep Tests Isolated**
   - Each test should be independent
   - Use beforeEach/afterEach for setup/cleanup

4. **Mock External Dependencies**
   - Mock API calls, timers, and external services
   - Use vi.fn() for function mocks

5. **Test Edge Cases**
   - Empty arrays, null values, error states
   - Boundary conditions

## Available Mocks

### Component Mocks
- `mockTextDisplay()` - Text component
- `mockButton()` - Button component
- `mockContainer()` - Container component
- `mockActionRow()` - Action row component
- `mockStringSelect()` - Select component
- `mockMediaGallery()` - Media gallery component
- `mockComponents()` - Array of mixed components
- `mockNestedComponents()` - Nested component structures

### Custom Matchers
- `expectComponentToHaveId(component, id)`
- `expectComponentToHaveType(component, type)`
- `expectComponentArrayToHaveLength(components, length)`
- `expectComponentToBeValid(component)`

## Test Files

### Utils Tests
- `src/utils/__tests__/id.test.ts` - ID generation
- `src/utils/__tests__/color.test.ts` - Color utilities
- `src/utils/__tests__/performance.test.ts` - Performance utilities
- `src/utils/__tests__/presets.test.ts` - Presets and templates

### Feature Tests
- `src/features/clipboard/__tests__/utils.test.ts` - Clipboard operations

## Configuration

Test configuration is in `vitest.config.ts`:
- Environment: jsdom
- Setup file: `src/test/setup.ts`
- Coverage provider: v8
- Globals: enabled

## Troubleshooting

### Tests Not Running
- Check that test files match pattern: `**/*.{test,spec}.{ts,tsx}`
- Ensure vitest is installed: `npm install`

### Import Errors
- Check path aliases in `vitest.config.ts`
- Verify imports use `@/` prefix

### Coverage Issues
- Exclude test files and setup files
- Check coverage thresholds in config

## Future Improvements

- [ ] Add component integration tests
- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests
- [ ] Increase coverage to 90%+
- [ ] Add performance benchmarks
- [ ] Add accessibility tests
