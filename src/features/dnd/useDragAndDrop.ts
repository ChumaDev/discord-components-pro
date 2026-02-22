/**
 * Drag and Drop Hook
 */

import { closestCenter, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import { useComponentStore } from '../../store/componentStore';
import { useDndSensors } from './sensors';
import type { DndCallbacks, DndConfig, DndState } from './types';
import { calculateNewIndex, extractComponentIds, isValidDragEvent, logDragEvent } from './utils';

export function useDragAndDrop(config: DndConfig = {}, callbacks: DndCallbacks = {}) {
  const components = useComponentStore((state) => state.components);
  const reorderComponents = useComponentStore((state) => state.reorderComponents);

  const [dndState, setDndState] = useState<DndState>({
    activeId: null,
    isDragging: false,
  });

  const sensors = useDndSensors(config);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setDndState({
        activeId: event.active.id as string,
        isDragging: true,
      });

      logDragEvent('Drag started', event.active.id);

      if (callbacks.onDragStart) {
        callbacks.onDragStart(event);
      }
    },
    [callbacks]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setDndState({
        activeId: null,
        isDragging: false,
      });

      if (!isValidDragEvent(event)) {
        return;
      }

      const indices = calculateNewIndex(
        components,
        event.active.id as string,
        event.over?.id as string
      );

      if (indices) {
        reorderComponents(indices.oldIndex, indices.newIndex);
        logDragEvent('Drag ended', event.active.id, event.over?.id);
      }

      if (callbacks.onDragEnd) {
        callbacks.onDragEnd(event);
      }
    },
    [components, reorderComponents, callbacks]
  );

  const handleDragCancel = useCallback(() => {
    setDndState({
      activeId: null,
      isDragging: false,
    });

    if (callbacks.onDragCancel) {
      callbacks.onDragCancel();
    }
  }, [callbacks]);

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    collisionDetection: closestCenter,
    componentIds: extractComponentIds(components),
    dndState,
  };
}
