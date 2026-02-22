/**
 * DnD Utilities
 */

import type { DragEndEvent } from '@dnd-kit/core';
import type { DiscordComponent } from '../../types/discord';

/**
 * Calculate new index after drag
 */
export function calculateNewIndex(
  items: DiscordComponent[],
  activeId: string,
  overId: string
): { oldIndex: number; newIndex: number } | null {
  const oldIndex = items.findIndex((c) => c.id === activeId);
  const newIndex = items.findIndex((c) => c.id === overId);

  if (oldIndex === -1 || newIndex === -1) {
    return null;
  }

  return { oldIndex, newIndex };
}

/**
 * Check if drag event is valid
 */
export function isValidDragEvent(event: DragEndEvent): boolean {
  return !!(event.active && event.over && event.active.id !== event.over.id);
}

/**
 * Extract IDs from components
 */
export function extractComponentIds(components: DiscordComponent[]): string[] {
  return components.map((c) => c.id).filter((id): id is string => id !== undefined);
}

/**
 * Log drag event for debugging
 */
export function logDragEvent(
  eventType: string,
  activeId: string | number,
  overId?: string | number
): void {
  console.log(`[DnD] ${eventType}:`, { activeId, overId });
}
