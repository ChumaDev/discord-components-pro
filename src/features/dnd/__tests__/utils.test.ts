/**
 * DnD Utilities Tests
 */

import { describe, expect, it, vi } from 'vitest';
import type { ButtonComponent, DiscordComponent } from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import { calculateNewIndex, extractComponentIds, isValidDragEvent, logDragEvent } from '../utils';

const mockComponents: DiscordComponent[] = [
  {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: 'Button 1',
    custom_id: 'btn1',
    id: 'id1',
  } as ButtonComponent,
  {
    type: ComponentType.Button,
    style: ButtonStyle.Secondary,
    label: 'Button 2',
    custom_id: 'btn2',
    id: 'id2',
  } as ButtonComponent,
  {
    type: ComponentType.Button,
    style: ButtonStyle.Success,
    label: 'Button 3',
    custom_id: 'btn3',
    id: 'id3',
  } as ButtonComponent,
];

describe('calculateNewIndex', () => {
  it('should calculate new index for valid drag', () => {
    const result = calculateNewIndex(mockComponents, 'id1', 'id3');
    expect(result).toEqual({ oldIndex: 0, newIndex: 2 });
  });

  it('should calculate new index for reverse drag', () => {
    const result = calculateNewIndex(mockComponents, 'id3', 'id1');
    expect(result).toEqual({ oldIndex: 2, newIndex: 0 });
  });

  it('should calculate new index for adjacent items', () => {
    const result = calculateNewIndex(mockComponents, 'id1', 'id2');
    expect(result).toEqual({ oldIndex: 0, newIndex: 1 });
  });

  it('should return null for non-existent active ID', () => {
    const result = calculateNewIndex(mockComponents, 'nonexistent', 'id2');
    expect(result).toBeNull();
  });

  it('should return null for non-existent over ID', () => {
    const result = calculateNewIndex(mockComponents, 'id1', 'nonexistent');
    expect(result).toBeNull();
  });

  it('should return null for both non-existent IDs', () => {
    const result = calculateNewIndex(mockComponents, 'nonexistent1', 'nonexistent2');
    expect(result).toBeNull();
  });

  it('should handle empty components array', () => {
    const result = calculateNewIndex([], 'id1', 'id2');
    expect(result).toBeNull();
  });
});

describe('isValidDragEvent', () => {
  it('should return true for valid drag event', () => {
    const event = {
      active: { id: 'id1', data: { current: {} } },
      over: { id: 'id2', data: { current: {} } },
    } as any;

    expect(isValidDragEvent(event)).toBe(true);
  });

  it('should return false when active equals over', () => {
    const event = {
      active: { id: 'id1', data: { current: {} } },
      over: { id: 'id1', data: { current: {} } },
    } as any;

    expect(isValidDragEvent(event)).toBe(false);
  });

  it('should return false when active is missing', () => {
    const event = {
      active: null,
      over: { id: 'id2', data: { current: {} } },
    } as any;

    expect(isValidDragEvent(event)).toBe(false);
  });

  it('should return false when over is missing', () => {
    const event = {
      active: { id: 'id1', data: { current: {} } },
      over: null,
    } as any;

    expect(isValidDragEvent(event)).toBe(false);
  });

  it('should return false when both are missing', () => {
    const event = {
      active: null,
      over: null,
    } as any;

    expect(isValidDragEvent(event)).toBe(false);
  });
});

describe('extractComponentIds', () => {
  it('should extract IDs from components', () => {
    const ids = extractComponentIds(mockComponents);
    expect(ids).toEqual(['id1', 'id2', 'id3']);
  });

  it('should filter out undefined IDs', () => {
    const componentsWithUndefined: DiscordComponent[] = [
      { ...mockComponents[0], id: undefined } as any,
      mockComponents[1] as DiscordComponent,
      { ...mockComponents[2], id: undefined } as any,
    ];

    const ids = extractComponentIds(componentsWithUndefined);
    expect(ids).toEqual(['id2']);
  });

  it('should handle empty array', () => {
    const ids = extractComponentIds([]);
    expect(ids).toEqual([]);
  });

  it('should handle all undefined IDs', () => {
    const componentsWithoutIds: DiscordComponent[] = [
      { ...mockComponents[0], id: undefined } as any,
      { ...mockComponents[1], id: undefined } as any,
    ];

    const ids = extractComponentIds(componentsWithoutIds);
    expect(ids).toEqual([]);
  });

  it('should preserve order', () => {
    const ids = extractComponentIds(mockComponents);
    expect(ids[0]).toBe('id1');
    expect(ids[1]).toBe('id2');
    expect(ids[2]).toBe('id3');
  });
});

describe('logDragEvent', () => {
  it('should log drag event with both IDs', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logDragEvent('dragStart', 'id1', 'id2');

    expect(consoleSpy).toHaveBeenCalledWith('[DnD] dragStart:', {
      activeId: 'id1',
      overId: 'id2',
    });

    consoleSpy.mockRestore();
  });

  it('should log drag event with only active ID', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logDragEvent('dragStart', 'id1');

    expect(consoleSpy).toHaveBeenCalledWith('[DnD] dragStart:', {
      activeId: 'id1',
      overId: undefined,
    });

    consoleSpy.mockRestore();
  });

  it('should handle numeric IDs', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logDragEvent('dragEnd', 123, 456);

    expect(consoleSpy).toHaveBeenCalledWith('[DnD] dragEnd:', {
      activeId: 123,
      overId: 456,
    });

    consoleSpy.mockRestore();
  });

  it('should handle different event types', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logDragEvent('dragCancel', 'id1');
    expect(consoleSpy).toHaveBeenCalledWith('[DnD] dragCancel:', {
      activeId: 'id1',
      overId: undefined,
    });

    logDragEvent('dragMove', 'id1', 'id2');
    expect(consoleSpy).toHaveBeenCalledWith('[DnD] dragMove:', {
      activeId: 'id1',
      overId: 'id2',
    });

    consoleSpy.mockRestore();
  });
});
