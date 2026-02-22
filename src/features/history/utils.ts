/**
 * History Utilities
 */

import type { HistoryState, HistoryStats } from './types';

/**
 * Create initial history state
 */
export function createInitialState<T>(initialValue: T): HistoryState<T> {
  return {
    past: [],
    present: initialValue,
    future: [],
  };
}

/**
 * Calculate history statistics
 */
export function calculateHistoryStats<T>(state: HistoryState<T>): HistoryStats {
  return {
    pastCount: state.past.length,
    futureCount: state.future.length,
    totalSize: state.past.length + state.future.length + 1,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}

/**
 * Limit history size
 */
export function limitHistorySize<T>(history: T[], maxSize: number): T[] {
  if (history.length <= maxSize) {
    return history;
  }

  return history.slice(history.length - maxSize);
}

/**
 * Check if state has changed
 */
export function hasStateChanged<T>(oldState: T, newState: T): boolean {
  return JSON.stringify(oldState) !== JSON.stringify(newState);
}

/**
 * Compress history by removing duplicates
 */
export function compressHistory<T>(history: T[]): T[] {
  const compressed: T[] = [];
  let lastItem: T | undefined;

  for (const item of history) {
    if (!lastItem || hasStateChanged(lastItem, item)) {
      compressed.push(item);
      lastItem = item;
    }
  }

  return compressed;
}
