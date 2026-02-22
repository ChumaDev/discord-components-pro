/**
 * Search Utilities Tests
 */

import { describe, expect, it } from 'vitest';
import type {
  ButtonComponent,
  StringSelectComponent,
  TextDisplayComponent,
} from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import {
  calculateSearchStats,
  filterComponents,
  getComponentTypeName,
  getSearchableText,
} from '../utils';

describe('getSearchableText', () => {
  it('should extract text from TextDisplay component', () => {
    const component: TextDisplayComponent = {
      type: ComponentType.TextDisplay,
      content: 'Hello world',
    };

    const text = getSearchableText(component);
    expect(text).toContain('Hello world');
  });

  it('should extract text from Button component', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Click me',
      custom_id: 'button_1',
    };

    const text = getSearchableText(component);
    expect(text).toContain('Click me');
    expect(text).toContain('button_1');
  });

  it('should extract text from StringSelect component', () => {
    const component: StringSelectComponent = {
      type: ComponentType.StringSelect,
      custom_id: 'select_1',
      placeholder: 'Choose option',
      options: [
        { label: 'Option 1', value: 'opt1', description: 'First option' },
        { label: 'Option 2', value: 'opt2' },
      ],
    };

    const text = getSearchableText(component);
    expect(text).toContain('Choose option');
    expect(text).toContain('Option 1');
    expect(text).toContain('opt1');
    expect(text).toContain('First option');
    expect(text).toContain('Option 2');
  });

  it('should handle component with no searchable text', () => {
    const component = {
      type: ComponentType.Separator,
    } as any;

    const text = getSearchableText(component);
    expect(text).toBeTruthy();
  });
});

describe('getComponentTypeName', () => {
  it('should return correct names for component types', () => {
    expect(getComponentTypeName(ComponentType.TextDisplay)).toBe('Text Display');
    expect(getComponentTypeName(ComponentType.Button)).toBe('Button');
    expect(getComponentTypeName(ComponentType.Container)).toBe('Container');
    expect(getComponentTypeName(ComponentType.ActionRow)).toBe('Action Row');
    expect(getComponentTypeName(ComponentType.StringSelect)).toBe('String Select');
    expect(getComponentTypeName(ComponentType.Separator)).toBe('Separator');
    expect(getComponentTypeName(ComponentType.MediaGallery)).toBe('Media Gallery');
    expect(getComponentTypeName(ComponentType.Thumbnail)).toBe('Thumbnail');
  });

  it('should return "Unknown" for unknown types', () => {
    expect(getComponentTypeName(999 as ComponentType)).toBe('Unknown');
  });
});

describe('filterComponents', () => {
  const components = [
    {
      type: ComponentType.TextDisplay,
      content: 'Hello world',
    } as TextDisplayComponent,
    {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Click me',
      custom_id: 'button_1',
    } as ButtonComponent,
    {
      type: ComponentType.Button,
      style: ButtonStyle.Secondary,
      label: 'Cancel',
      custom_id: 'button_2',
    } as ButtonComponent,
  ];

  it('should return all components when no filters', () => {
    const filtered = filterComponents(components, '');
    expect(filtered).toHaveLength(3);
  });

  it('should filter by search query', () => {
    const filtered = filterComponents(components, 'click');
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.type).toBe(ComponentType.Button);
  });

  it('should filter by component type', () => {
    const filtered = filterComponents(components, '', ComponentType.Button);
    expect(filtered).toHaveLength(2);
    expect(filtered.every((c) => c.type === ComponentType.Button)).toBe(true);
  });

  it('should filter by both query and type', () => {
    const filtered = filterComponents(components, 'cancel', ComponentType.Button);
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.type).toBe(ComponentType.Button);
  });

  it('should be case insensitive', () => {
    const filtered = filterComponents(components, 'HELLO');
    expect(filtered).toHaveLength(1);
  });

  it('should return empty array when no matches', () => {
    const filtered = filterComponents(components, 'nonexistent');
    expect(filtered).toHaveLength(0);
  });
});

describe('calculateSearchStats', () => {
  it('should calculate stats correctly', () => {
    const stats = calculateSearchStats(10, 5);
    expect(stats.total).toBe(10);
    expect(stats.filtered).toBe(5);
    expect(stats.hidden).toBe(5);
  });

  it('should handle no filtering', () => {
    const stats = calculateSearchStats(10, 10);
    expect(stats.total).toBe(10);
    expect(stats.filtered).toBe(10);
    expect(stats.hidden).toBe(0);
  });

  it('should handle all filtered out', () => {
    const stats = calculateSearchStats(10, 0);
    expect(stats.total).toBe(10);
    expect(stats.filtered).toBe(0);
    expect(stats.hidden).toBe(10);
  });

  it('should handle empty list', () => {
    const stats = calculateSearchStats(0, 0);
    expect(stats.total).toBe(0);
    expect(stats.filtered).toBe(0);
    expect(stats.hidden).toBe(0);
  });
});
