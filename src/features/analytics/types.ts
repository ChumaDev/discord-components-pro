/**
 * Analytics Types
 */

import type { ComponentType } from '../../types/discord';

export type AnalyticsEventType =
  | 'create'
  | 'update'
  | 'delete'
  | 'export'
  | 'import'
  | 'undo'
  | 'redo';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  componentType?: ComponentType;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsData {
  events: AnalyticsEvent[];
  sessionStart: number;
  sessionDuration: number;
  componentCounts: Record<ComponentType, number>;
  mostUsedComponent: ComponentType | null;
  totalActions: number;
  undoRedoCount: number;
  exportCount: number;
  importCount: number;
}

export interface AnalyticsStats {
  totalActions: number;
  componentCounts: Record<ComponentType, number>;
  mostUsedComponent: ComponentType | null;
  undoRedoCount: number;
  exportCount: number;
  importCount: number;
}
