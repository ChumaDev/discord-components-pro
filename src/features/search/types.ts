/**
 * Search Feature Types
 */

import type { ComponentType } from '../../types/discord';

export interface SearchOptions {
  query: string;
  type?: ComponentType;
  caseSensitive?: boolean;
}

export interface SearchStats {
  total: number;
  filtered: number;
  hidden: number;
}
