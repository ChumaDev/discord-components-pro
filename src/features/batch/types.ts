/**
 * Batch Operations Types
 */

import type { ComponentType } from '../../types/discord';

export interface BatchOperationResult {
  success: boolean;
  affected: number;
  errors?: string[];
}

export interface ComponentStatistics {
  total: number;
  byType: Record<ComponentType, number>;
  withErrors: number;
  interactive: number;
}

export type SortBy = 'type' | 'id' | 'created';
export type SortOrder = 'asc' | 'desc';
