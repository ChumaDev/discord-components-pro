/**
 * History Hook
 * Undo/Redo functionality with options
 */

import { useCallback, useState } from 'react';
import type { HistoryOptions, HistoryState } from './types';
import {
  calculateHistoryStats,
  compressHistory,
  createInitialState,
  hasStateChanged,
  limitHistorySize,
} from './utils';

export function useHistory<T>(initialState: T, options: HistoryOptions = {}) {
  const { maxHistorySize = 50, enableCompression = false } = options;

  const [state, setState] = useState<HistoryState<T>>(createInitialState(initialState));

  const stats = calculateHistoryStats(state);

  const set = useCallback(
    (newPresent: T) => {
      setState((currentState) => {
        // Don't add to history if state hasn't changed
        if (!hasStateChanged(currentState.present, newPresent)) {
          return currentState;
        }

        let newPast = [...currentState.past, currentState.present];

        // Apply compression if enabled
        if (enableCompression) {
          newPast = compressHistory(newPast);
        }

        // Limit history size
        newPast = limitHistorySize(newPast, maxHistorySize);

        return {
          past: newPast,
          present: newPresent,
          future: [],
        };
      });
    },
    [maxHistorySize, enableCompression]
  );

  const undo = useCallback(() => {
    setState((currentState) => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      if (!previous) return currentState;

      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      if (!next) return currentState;

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: currentState.future.slice(1),
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(createInitialState(newPresent));
  }, []);

  const clear = useCallback(() => {
    setState((currentState) => ({
      past: [],
      present: currentState.present,
      future: [],
    }));
  }, []);

  const jump = useCallback((index: number) => {
    setState((currentState) => {
      const allStates = [...currentState.past, currentState.present, ...currentState.future];

      if (index < 0 || index >= allStates.length) {
        return currentState;
      }

      const targetState = allStates[index];
      if (!targetState) return currentState;

      return {
        past: allStates.slice(0, index),
        present: targetState,
        future: allStates.slice(index + 1),
      };
    });
  }, []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    clear,
    jump,
    canUndo: stats.canUndo,
    canRedo: stats.canRedo,
    stats,
  };
}
