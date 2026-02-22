/**
 * Component Search Hook
 * Search and filter components by type, content, or properties
 */

import { useMemo, useState } from 'react';
import type { ComponentType, DiscordComponent } from '../../types/discord';
import { calculateSearchStats, filterComponents } from './utils';

export function useComponentSearch(components: DiscordComponent[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ComponentType | undefined>();

  const filteredComponents = useMemo(
    () => filterComponents(components, searchQuery, filterType),
    [components, searchQuery, filterType]
  );

  const searchStats = useMemo(
    () => calculateSearchStats(components.length, filteredComponents.length),
    [components.length, filteredComponents.length]
  );

  const clearSearch = () => {
    setSearchQuery('');
    setFilterType(undefined);
  };

  return {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filteredComponents,
    searchStats,
    clearSearch,
  };
}
