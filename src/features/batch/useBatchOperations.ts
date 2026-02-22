/**
 * Batch Operations Hook
 * Perform operations on multiple components at once
 */

import { useCallback } from 'react';
import * as filters from './filters';
import * as operations from './operations';
import * as statistics from './statistics';

export function useBatchOperations() {
  const batchDelete = useCallback(operations.batchDelete, []);
  const batchUpdate = useCallback(operations.batchUpdate, []);
  const batchDuplicate = useCallback(operations.batchDuplicate, []);
  const batchMove = useCallback(operations.batchMove, []);
  const sortComponents = useCallback(operations.sortComponents, []);

  const filterByType = useCallback(filters.filterByType, []);
  const groupByType = useCallback(filters.groupByType, []);
  const filterInteractive = useCallback(filters.filterInteractive, []);
  const filterByIdPattern = useCallback(filters.filterByIdPattern, []);

  const getStatistics = useCallback(statistics.getStatistics, []);
  const getTypeDistribution = useCallback(statistics.getTypeDistribution, []);

  return {
    // Operations
    batchDelete,
    batchUpdate,
    batchDuplicate,
    batchMove,
    sortComponents,

    // Filters
    filterByType,
    groupByType,
    filterInteractive,
    filterByIdPattern,

    // Statistics
    getStatistics,
    getTypeDistribution,
  };
}
