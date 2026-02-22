/**
 * Drag and Drop Feature Types
 */

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export interface DndConfig {
  activationDistance?: number;
  enableKeyboard?: boolean;
  enablePointer?: boolean;
}

export interface DndCallbacks {
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: () => void;
}

export interface DndState {
  activeId: string | null;
  isDragging: boolean;
}
