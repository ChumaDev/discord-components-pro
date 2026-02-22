/**
 * Batch Filters
 * Filter and group operations
 */

import type { DiscordComponent } from '../../types/discord';
import { ComponentType } from '../../types/discord';

/**
 * Filter components by type
 */
export function filterByType(
  components: DiscordComponent[],
  types: ComponentType[]
): DiscordComponent[] {
  const typesSet = new Set(types);
  return components.filter((c) => typesSet.has(c.type));
}

/**
 * Group components by type
 */
export function groupByType(
  components: DiscordComponent[]
): Map<ComponentType, DiscordComponent[]> {
  const groups = new Map<ComponentType, DiscordComponent[]>();

  components.forEach((c) => {
    const existing = groups.get(c.type) || [];
    groups.set(c.type, [...existing, c]);
  });

  return groups;
}

/**
 * Filter interactive components
 */
export function filterInteractive(components: DiscordComponent[]): DiscordComponent[] {
  return components.filter(
    (c) => c.type === ComponentType.Button || c.type === ComponentType.StringSelect
  );
}

/**
 * Filter by ID pattern
 */
export function filterByIdPattern(
  components: DiscordComponent[],
  pattern: RegExp
): DiscordComponent[] {
  return components.filter((c) => c.id && pattern.test(c.id));
}
