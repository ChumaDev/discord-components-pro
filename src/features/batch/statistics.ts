/**
 * Batch Statistics
 * Calculate statistics about components
 */

import type { DiscordComponent } from '../../types/discord';
import { ComponentType } from '../../types/discord';
import type { ComponentStatistics } from './types';

/**
 * Get statistics about components
 */
export function getStatistics(components: DiscordComponent[]): ComponentStatistics {
  const stats: ComponentStatistics = {
    total: components.length,
    byType: {} as Record<ComponentType, number>,
    withErrors: 0,
    interactive: 0,
  };

  components.forEach((c) => {
    stats.byType[c.type] = (stats.byType[c.type] || 0) + 1;

    // Count interactive components
    if (c.type === ComponentType.Button || c.type === ComponentType.StringSelect) {
      stats.interactive++;
    }
  });

  return stats;
}

/**
 * Get component type distribution
 */
export function getTypeDistribution(
  components: DiscordComponent[]
): Array<{ type: ComponentType; count: number; percentage: number }> {
  const stats = getStatistics(components);
  const total = stats.total;

  return Object.entries(stats.byType).map(([type, count]) => ({
    type: Number(type) as ComponentType,
    count,
    percentage: total > 0 ? (count / total) * 100 : 0,
  }));
}
