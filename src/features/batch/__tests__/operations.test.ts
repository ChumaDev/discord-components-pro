/**
 * Batch Operations Tests
 */

import { describe, expect, it } from 'vitest';
import type {
  ButtonComponent,
  DiscordComponent,
  TextDisplayComponent,
} from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import { batchDelete, batchDuplicate, batchMove, batchUpdate, sortComponents } from '../operations';

const mockComponents: DiscordComponent[] = [
  {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: 'Button 1',
    custom_id: 'btn1',
    id: 'id1',
  } as ButtonComponent,
  {
    type: ComponentType.TextDisplay,
    content: 'Text 1',
    id: 'id2',
  } as TextDisplayComponent,
  {
    type: ComponentType.Button,
    style: ButtonStyle.Secondary,
    label: 'Button 2',
    custom_id: 'btn2',
    id: 'id3',
  } as ButtonComponent,
];

describe('batchDelete', () => {
  it('should delete components by IDs', () => {
    const result = batchDelete(mockComponents, ['id1', 'id3']);
    expect(result.remaining).toHaveLength(1);
    expect(result.deleted).toBe(2);
    expect(result.remaining[0]?.id).toBe('id2');
  });

  it('should handle empty IDs array', () => {
    const result = batchDelete(mockComponents, []);
    expect(result.remaining).toHaveLength(3);
    expect(result.deleted).toBe(0);
  });

  it('should handle non-existent IDs', () => {
    const result = batchDelete(mockComponents, ['nonexistent']);
    expect(result.remaining).toHaveLength(3);
    expect(result.deleted).toBe(0);
  });

  it('should handle empty components array', () => {
    const result = batchDelete([], ['id1']);
    expect(result.remaining).toHaveLength(0);
    expect(result.deleted).toBe(0);
  });
});

describe('batchUpdate', () => {
  it('should update property for specified components', () => {
    const updated = batchUpdate(mockComponents, ['id1', 'id3'], 'type', ComponentType.Container);
    expect(updated[0]?.type).toBe(ComponentType.Container);
    expect(updated[1]?.type).toBe(ComponentType.TextDisplay);
    expect(updated[2]?.type).toBe(ComponentType.Container);
  });

  it('should not modify components not in IDs list', () => {
    const updated = batchUpdate(mockComponents, ['id1'], 'type', ComponentType.Container);
    expect(updated[1]?.type).toBe(ComponentType.TextDisplay);
    expect(updated[2]?.type).toBe(ComponentType.Button);
  });

  it('should handle empty IDs array', () => {
    const updated = batchUpdate(mockComponents, [], 'type', ComponentType.Container);
    expect(updated).toEqual(mockComponents);
  });

  it('should handle non-existent IDs', () => {
    const updated = batchUpdate(mockComponents, ['nonexistent'], 'type', ComponentType.Container);
    expect(updated).toEqual(mockComponents);
  });
});

describe('batchDuplicate', () => {
  it('should duplicate specified components', () => {
    const duplicates = batchDuplicate(mockComponents, ['id1', 'id2']);
    expect(duplicates).toHaveLength(2);
    expect(duplicates[0]?.id).toContain('id1_copy_');
    expect(duplicates[1]?.id).toContain('id2_copy_');
  });

  it('should create deep copies', () => {
    const duplicates = batchDuplicate(mockComponents, ['id1']);
    expect(duplicates[0]).not.toBe(mockComponents[0]);
    expect(duplicates[0]?.type).toBe(mockComponents[0]?.type);
  });

  it('should handle empty IDs array', () => {
    const duplicates = batchDuplicate(mockComponents, []);
    expect(duplicates).toHaveLength(0);
  });

  it('should handle non-existent IDs', () => {
    const duplicates = batchDuplicate(mockComponents, ['nonexistent']);
    expect(duplicates).toHaveLength(0);
  });
});

describe('batchMove', () => {
  it('should move components to target index', () => {
    const moved = batchMove(mockComponents, ['id3'], 0);
    expect(moved[0]?.id).toBe('id3');
    expect(moved[1]?.id).toBe('id1');
    expect(moved[2]?.id).toBe('id2');
  });

  it('should move multiple components', () => {
    const moved = batchMove(mockComponents, ['id1', 'id3'], 1);
    expect(moved[0]?.id).toBe('id2');
    expect(moved[1]?.id).toBe('id1');
    expect(moved[2]?.id).toBe('id3');
  });

  it('should handle empty IDs array', () => {
    const moved = batchMove(mockComponents, [], 0);
    expect(moved).toEqual(mockComponents);
  });

  it('should handle target index at end', () => {
    const moved = batchMove(mockComponents, ['id1'], 3);
    expect(moved[2]?.id).toBe('id1');
  });
});

describe('sortComponents', () => {
  it('should sort by type ascending', () => {
    const sorted = sortComponents(mockComponents, 'type', 'asc');
    expect(sorted[0]?.type).toBeLessThanOrEqual(sorted[1]?.type || 0);
  });

  it('should sort by type descending', () => {
    const sorted = sortComponents(mockComponents, 'type', 'desc');
    expect(sorted[0]?.type).toBeGreaterThanOrEqual(sorted[1]?.type || 0);
  });

  it('should sort by id ascending', () => {
    const sorted = sortComponents(mockComponents, 'id', 'asc');
    expect(sorted[0]?.id).toBe('id1');
    expect(sorted[1]?.id).toBe('id2');
    expect(sorted[2]?.id).toBe('id3');
  });

  it('should sort by id descending', () => {
    const sorted = sortComponents(mockComponents, 'id', 'desc');
    expect(sorted[0]?.id).toBe('id3');
    expect(sorted[1]?.id).toBe('id2');
    expect(sorted[2]?.id).toBe('id1');
  });

  it('should not modify original array', () => {
    const original = [...mockComponents];
    sortComponents(mockComponents, 'type', 'asc');
    expect(mockComponents).toEqual(original);
  });

  it('should handle empty array', () => {
    const sorted = sortComponents([], 'type', 'asc');
    expect(sorted).toHaveLength(0);
  });
});
