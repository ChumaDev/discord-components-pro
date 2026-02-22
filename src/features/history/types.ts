/**
 * History Feature Types
 */

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface HistoryOptions {
  maxHistorySize?: number;
  enableCompression?: boolean;
}

export interface HistoryStats {
  pastCount: number;
  futureCount: number;
  totalSize: number;
  canUndo: boolean;
  canRedo: boolean;
}
