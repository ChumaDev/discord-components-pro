/**
 * Components Hook
 * Manages component CRUD operations
 */

import { useCallback } from 'react';
import { useComponentStore } from '../store/componentStore';
import type { DiscordComponent } from '../types/discord';
import { generateId } from '../utils/id';

export function useComponents() {
  const components = useComponentStore((state) => state.components);
  const addComponent = useComponentStore((state) => state.addComponent);
  const removeComponent = useComponentStore((state) => state.removeComponent);
  const updateComponent = useComponentStore((state) => state.updateComponent);
  const reorderComponents = useComponentStore((state) => state.reorderComponents);
  const clearComponents = useComponentStore((state) => state.clearComponents);
  const setComponents = useComponentStore((state) => state.setComponents);
  const undo = useComponentStore((state) => state.undo);
  const redo = useComponentStore((state) => state.redo);
  const canUndo = useComponentStore((state) => state.canUndo);
  const canRedo = useComponentStore((state) => state.canRedo);

  const addNewComponent = useCallback(
    (component: Omit<DiscordComponent, 'id'>) => {
      const newComponent = {
        ...component,
        id: generateId(component.type.toString()),
      } as DiscordComponent;
      addComponent(newComponent);
      return newComponent;
    },
    [addComponent]
  );

  const duplicateComponent = useCallback(
    (id: string) => {
      const component = components.find((c) => c.id === id);
      if (component) {
        const duplicate = {
          ...component,
          id: generateId(component.type.toString()),
        };
        addComponent(duplicate);
        return duplicate;
      }
      return null;
    },
    [components, addComponent]
  );

  const moveComponent = useCallback(
    (fromIndex: number, toIndex: number) => {
      reorderComponents(fromIndex, toIndex);
    },
    [reorderComponents]
  );

  return {
    components,
    addComponent: addNewComponent,
    removeComponent,
    updateComponent,
    duplicateComponent,
    moveComponent,
    clearComponents,
    setComponents,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
