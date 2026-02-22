/**
 * DnD Sensors Configuration
 */

import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { DndConfig } from './types';

/**
 * Hook to create sensors for drag and drop
 */
export function useDndSensors(config: DndConfig = {}) {
  const { activationDistance = 8, enableKeyboard = true, enablePointer = true } = config;

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: activationDistance,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = [];
  if (enablePointer) {
    sensors.push(pointerSensor);
  }
  if (enableKeyboard) {
    sensors.push(keyboardSensor);
  }

  return useSensors(...sensors);
}
