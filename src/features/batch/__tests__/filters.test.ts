/**
 * Batch Filters Tests
 */

import { describe, expect, it } from 'vitest';
import type {
  ButtonComponent,
  DiscordComponent,
  TextDisplayComponent,
} from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import { filterByIdPattern, filterByType, filterInteractive, groupByType } from '../filters';

const mockComponents: DiscordComponent[] = [
  {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: 'Button 1',
    custom_id: 'btn1',
    id: 'button_1',
  } as ButtonComponent,
  {
    type: ComponentType.TextDisplay,
    content: 'Text 1',
    id: 'text_1',
  } as TextDisplayComponent,
  {
    type: ComponentType.Button,
    style: ButtonStyle.Secondary,
    label: 'Button 2',
    custom_id: 'btn2',
    id: 'button_2',
  } as ButtonComponent,
  {
    type: ComponentType.StringSelect,
    custom_id: 'select_1',
    options: [],
    id: 'select_1',
  } as any,
];

describe('filterByType', () => {
  it('should filter components by single type', () => {
    const filtered = filterByType(mockComponents, [ComponentType.Button]);
    expect(filtered).toHaveLength(2);
    expect(filtered.every((c) => c.type === ComponentType.Button)).toBe(true);
  });

  it('should filter components by multiple types', () => {
    const filtered = filterByType(mockComponents, [
      ComponentType.Button,
      ComponentType.StringSelect,
    ]);
    expect(filtered).toHaveLength(3);
  });

  it('should return empty array for non-existent type', () => {
    const filtered = filterByType(mockComponents, [ComponentType.Container]);
    expect(filtered).toHaveLength(0);
  });

  it('should handle empty types array', () => {
    const filtered = filterByType(mockComponents, []);
    expect(filtered).toHaveLength(0);
  });

  it('should handle empty components array', () => {
    const filtered = filterByType([], [ComponentType.Button]);
    expect(filtered).toHaveLength(0);
  });
});

describe('groupByType', () => {
  it('should group components by type', () => {
    const groups = groupByType(mockComponents);
    expect(groups.size).toBe(3);
    expect(groups.get(ComponentType.Button)).toHaveLength(2);
    expect(groups.get(ComponentType.TextDisplay)).toHaveLength(1);
    expect(groups.get(ComponentType.StringSelect)).toHaveLength(1);
  });

  it('should handle empty components array', () => {
    const groups = groupByType([]);
    expect(groups.size).toBe(0);
  });

  it('should handle single component', () => {
    const groups = groupByType([mockComponents[0] as DiscordComponent]);
    expect(groups.size).toBe(1);
    expect(groups.get(ComponentType.Button)).toHaveLength(1);
  });
});

describe('filterInteractive', () => {
  it('should filter interactive components', () => {
    const filtered = filterInteractive(mockComponents);
    expect(filtered).toHaveLength(3);
    expect(
      filtered.every(
        (c) => c.type === ComponentType.Button || c.type === ComponentType.StringSelect
      )
    ).toBe(true);
  });

  it('should exclude non-interactive components', () => {
    const filtered = filterInteractive(mockComponents);
    expect(filtered.some((c) => c.type === ComponentType.TextDisplay)).toBe(false);
  });

  it('should handle empty components array', () => {
    const filtered = filterInteractive([]);
    expect(filtered).toHaveLength(0);
  });

  it('should handle array with no interactive components', () => {
    const nonInteractive: DiscordComponent[] = [
      {
        type: ComponentType.TextDisplay,
        content: 'Text',
        id: 'text_1',
      } as TextDisplayComponent,
    ];
    const filtered = filterInteractive(nonInteractive);
    expect(filtered).toHaveLength(0);
  });
});

describe('filterByIdPattern', () => {
  it('should filter by ID pattern', () => {
    const filtered = filterByIdPattern(mockComponents, /^button_/);
    expect(filtered).toHaveLength(2);
    expect(filtered.every((c) => c.id?.startsWith('button_'))).toBe(true);
  });

  it('should handle pattern matching no IDs', () => {
    const filtered = filterByIdPattern(mockComponents, /^nonexistent_/);
    expect(filtered).toHaveLength(0);
  });

  it('should handle empty components array', () => {
    const filtered = filterByIdPattern([], /^button_/);
    expect(filtered).toHaveLength(0);
  });

  it('should handle components without IDs', () => {
    const noIds: DiscordComponent[] = [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'Button',
        custom_id: 'btn',
      } as ButtonComponent,
    ];
    const filtered = filterByIdPattern(noIds, /^button_/);
    expect(filtered).toHaveLength(0);
  });

  it('should support complex regex patterns', () => {
    const filtered = filterByIdPattern(mockComponents, /_(1|2)$/);
    expect(filtered).toHaveLength(4);
  });
});
