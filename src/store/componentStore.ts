/**
 * Component Store
 * Global state management using Zustand with history and persistence
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { DiscordComponent } from '../types/discord';

interface HistoryState {
  past: DiscordComponent[][];
  future: DiscordComponent[][];
}

interface ComponentState {
  components: DiscordComponent[];
  selectedComponentId: string | null;
  theme: 'light' | 'dark';
  history: HistoryState;

  // Actions
  addComponent: (component: DiscordComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<DiscordComponent>) => void;
  reorderComponents: (startIndex: number, endIndex: number) => void;
  selectComponent: (id: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  clearComponents: () => void;
  setComponents: (components: DiscordComponent[]) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const saveToHistory = (state: ComponentState): HistoryState => ({
  past: [...state.history.past, state.components],
  future: [],
});

export const useComponentStore = create<ComponentState>()(
  devtools(
    persist(
      (set, get) => ({
        components: [],
        selectedComponentId: null,
        theme: 'dark',
        history: {
          past: [],
          future: [],
        },

        addComponent: (component) =>
          set((state) => ({
            components: [...state.components, component],
            history: saveToHistory(state),
          })),

        removeComponent: (id) =>
          set((state) => ({
            components: state.components.filter((c) => c.id !== id),
            selectedComponentId:
              state.selectedComponentId === id ? null : state.selectedComponentId,
            history: saveToHistory(state),
          })),

        updateComponent: (id, updates) =>
          set((state) => ({
            components: state.components.map((c) =>
              c.id === id ? ({ ...c, ...updates } as DiscordComponent) : c
            ),
            history: saveToHistory(state),
          })),

        reorderComponents: (startIndex, endIndex) =>
          set((state) => {
            const result = Array.from(state.components);
            const [removed] = result.splice(startIndex, 1);
            if (removed) {
              result.splice(endIndex, 0, removed);
            }
            return {
              components: result,
              history: saveToHistory(state),
            };
          }),

        selectComponent: (id) =>
          set(() => ({
            selectedComponentId: id,
          })),

        setTheme: (theme) =>
          set(() => ({
            theme,
          })),

        clearComponents: () =>
          set((state) => ({
            components: [],
            selectedComponentId: null,
            history: saveToHistory(state),
          })),

        setComponents: (components) =>
          set((state) => ({
            components,
            history: saveToHistory(state),
          })),

        undo: () =>
          set((state) => {
            if (state.history.past.length === 0) return state;

            const previous = state.history.past[state.history.past.length - 1];
            if (!previous) return state;

            const newPast = state.history.past.slice(0, -1);

            return {
              components: previous,
              history: {
                past: newPast,
                future: [state.components, ...state.history.future],
              },
            };
          }),

        redo: () =>
          set((state) => {
            if (state.history.future.length === 0) return state;

            const next = state.history.future[0];
            if (!next) return state;

            const newFuture = state.history.future.slice(1);

            return {
              components: next,
              history: {
                past: [...state.history.past, state.components],
                future: newFuture,
              },
            };
          }),

        canUndo: () => get().history.past.length > 0,
        canRedo: () => get().history.future.length > 0,
      }),
      {
        name: 'discord-components-storage',
        partialize: (state) => ({
          components: state.components,
          theme: state.theme,
        }),
      }
    ),
    { name: 'ComponentStore' }
  )
);
