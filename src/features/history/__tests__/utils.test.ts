/**
 * History Utilities Tests
 */

import { describe, expect, it } from 'vitest';
import {
  calculateHistoryStats,
  compressHistory,
  createInitialState,
  hasStateChanged,
  limitHistorySize,
} from '../utils';

describe('createInitialState', () => {
  it('should create initial state with empty history', () => {
    const state = createInitialState('initial');
    expect(state.past).toEqual([]);
    expect(state.present).toBe('initial');
    expect(state.future).toEqual([]);
  });

  it('should work with object values', () => {
    const obj = { count: 0 };
    const state = createInitialState(obj);
    expect(state.present).toEqual(obj);
  });

  it('should work with array values', () => {
    const arr = [1, 2, 3];
    const state = createInitialState(arr);
    expect(state.present).toEqual(arr);
  });
});

describe('calculateHistoryStats', () => {
  it('should calculate stats for empty history', () => {
    const state = createInitialState('value');
    const stats = calculateHistoryStats(state);

    expect(stats.pastCount).toBe(0);
    expect(stats.futureCount).toBe(0);
    expect(stats.totalSize).toBe(1);
    expect(stats.canUndo).toBe(false);
    expect(stats.canRedo).toBe(false);
  });

  it('should calculate stats with past history', () => {
    const state = {
      past: ['a', 'b', 'c'],
      present: 'd',
      future: [],
    };
    const stats = calculateHistoryStats(state);

    expect(stats.pastCount).toBe(3);
    expect(stats.futureCount).toBe(0);
    expect(stats.totalSize).toBe(4);
    expect(stats.canUndo).toBe(true);
    expect(stats.canRedo).toBe(false);
  });

  it('should calculate stats with future history', () => {
    const state = {
      past: [],
      present: 'a',
      future: ['b', 'c'],
    };
    const stats = calculateHistoryStats(state);

    expect(stats.pastCount).toBe(0);
    expect(stats.futureCount).toBe(2);
    expect(stats.totalSize).toBe(3);
    expect(stats.canUndo).toBe(false);
    expect(stats.canRedo).toBe(true);
  });

  it('should calculate stats with both past and future', () => {
    const state = {
      past: ['a', 'b'],
      present: 'c',
      future: ['d', 'e'],
    };
    const stats = calculateHistoryStats(state);

    expect(stats.pastCount).toBe(2);
    expect(stats.futureCount).toBe(2);
    expect(stats.totalSize).toBe(5);
    expect(stats.canUndo).toBe(true);
    expect(stats.canRedo).toBe(true);
  });
});

describe('limitHistorySize', () => {
  it('should not modify history within limit', () => {
    const history = [1, 2, 3];
    const limited = limitHistorySize(history, 5);
    expect(limited).toEqual([1, 2, 3]);
  });

  it('should trim history exceeding limit', () => {
    const history = [1, 2, 3, 4, 5];
    const limited = limitHistorySize(history, 3);
    expect(limited).toEqual([3, 4, 5]);
  });

  it('should handle empty history', () => {
    const limited = limitHistorySize([], 5);
    expect(limited).toEqual([]);
  });

  it('should keep most recent items', () => {
    const history = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const limited = limitHistorySize(history, 3);
    expect(limited).toEqual([8, 9, 10]);
  });
});

describe('hasStateChanged', () => {
  it('should detect changes in primitive values', () => {
    expect(hasStateChanged(1, 2)).toBe(true);
    expect(hasStateChanged('a', 'b')).toBe(true);
    expect(hasStateChanged(true, false)).toBe(true);
  });

  it('should detect no change in primitive values', () => {
    expect(hasStateChanged(1, 1)).toBe(false);
    expect(hasStateChanged('a', 'a')).toBe(false);
    expect(hasStateChanged(true, true)).toBe(false);
  });

  it('should detect changes in objects', () => {
    expect(hasStateChanged({ a: 1 }, { a: 2 })).toBe(true);
    expect(hasStateChanged({ a: 1 }, { b: 1 })).toBe(true);
  });

  it('should detect no change in objects', () => {
    expect(hasStateChanged({ a: 1 }, { a: 1 })).toBe(false);
    expect(hasStateChanged({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(false);
  });

  it('should detect changes in arrays', () => {
    expect(hasStateChanged([1, 2], [1, 3])).toBe(true);
    expect(hasStateChanged([1, 2], [1, 2, 3])).toBe(true);
  });

  it('should detect no change in arrays', () => {
    expect(hasStateChanged([1, 2], [1, 2])).toBe(false);
  });
});

describe('compressHistory', () => {
  it('should remove consecutive duplicates', () => {
    const history = [1, 1, 2, 2, 3, 3];
    const compressed = compressHistory(history);
    expect(compressed).toEqual([1, 2, 3]);
  });

  it('should keep non-consecutive duplicates', () => {
    const history = [1, 2, 1, 2];
    const compressed = compressHistory(history);
    expect(compressed).toEqual([1, 2, 1, 2]);
  });

  it('should handle empty history', () => {
    const compressed = compressHistory([]);
    expect(compressed).toEqual([]);
  });

  it('should handle single item', () => {
    const compressed = compressHistory([1]);
    expect(compressed).toEqual([1]);
  });

  it('should work with objects', () => {
    const history = [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }];
    const compressed = compressHistory(history);
    expect(compressed).toEqual([{ a: 1 }, { a: 2 }]);
  });

  it('should not modify history with no duplicates', () => {
    const history = [1, 2, 3, 4, 5];
    const compressed = compressHistory(history);
    expect(compressed).toEqual([1, 2, 3, 4, 5]);
  });
});
