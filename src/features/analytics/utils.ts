/**
 * Analytics Utilities
 */

import type { ComponentType } from '../../types/discord';
import type { AnalyticsData, AnalyticsEvent, AnalyticsStats } from './types';

/**
 * Calculate analytics statistics from events
 */
export function calculateStats(events: AnalyticsEvent[]): AnalyticsStats {
  const componentCounts: Record<ComponentType, number> = {} as Record<ComponentType, number>;
  let undoRedoCount = 0;
  let exportCount = 0;
  let importCount = 0;

  events.forEach((event) => {
    if (event.componentType !== undefined) {
      componentCounts[event.componentType] = (componentCounts[event.componentType] || 0) + 1;
    }

    if (event.type === 'undo' || event.type === 'redo') {
      undoRedoCount++;
    }
    if (event.type === 'export') {
      exportCount++;
    }
    if (event.type === 'import') {
      importCount++;
    }
  });

  // Find most used component
  let mostUsedComponent: ComponentType | null = null;
  let maxCount = 0;
  for (const [type, count] of Object.entries(componentCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostUsedComponent = Number(type) as ComponentType;
    }
  }

  return {
    totalActions: events.length,
    componentCounts,
    mostUsedComponent,
    undoRedoCount,
    exportCount,
    importCount,
  };
}

/**
 * Format session duration to human readable string
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

/**
 * Export analytics data to JSON string
 */
export function exportAnalyticsData(data: AnalyticsData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Filter events by type
 */
export function filterEventsByType(
  events: AnalyticsEvent[],
  type: AnalyticsEvent['type']
): AnalyticsEvent[] {
  return events.filter((event) => event.type === type);
}

/**
 * Filter events by component type
 */
export function filterEventsByComponentType(
  events: AnalyticsEvent[],
  componentType: ComponentType
): AnalyticsEvent[] {
  return events.filter((event) => event.componentType === componentType);
}

/**
 * Get events in time range
 */
export function getEventsInTimeRange(
  events: AnalyticsEvent[],
  startTime: number,
  endTime: number
): AnalyticsEvent[] {
  return events.filter((event) => event.timestamp >= startTime && event.timestamp <= endTime);
}
