/**
 * Batch Operations
 * Core batch operation functions
 */

import type { DiscordComponent } from '../../types/discord';

/**
 * Delete multiple components by IDs
 */
export function batchDelete(
  components: DiscordComponent[],
  idsToDelete: string[]
): { remaining: DiscordComponent[]; deleted: number } {
  const idsSet = new Set(idsToDelete);
  const remaining = components.filter((c) => !idsSet.has(c.id || ''));
  return {
    remaining,
    deleted: components.length - remaining.length,
  };
}

/**
 * Update property for multiple components
 */
export function batchUpdate<K extends keyof DiscordComponent>(
  components: DiscordComponent[],
  ids: string[],
  property: K,
  value: DiscordComponent[K]
): DiscordComponent[] {
  const idsSet = new Set(ids);
  return components.map((c) => {
    if (idsSet.has(c.id || '')) {
      return { ...c, [property]: value };
    }
    return c;
  });
}

/**
 * Duplicate multiple components
 */
export function batchDuplicate(
  components: DiscordComponent[],
  idsToDuplicate: string[]
): DiscordComponent[] {
  const idsSet = new Set(idsToDuplicate);
  const duplicates: DiscordComponent[] = [];

  components.forEach((c) => {
    if (idsSet.has(c.id || '')) {
      const duplicate = JSON.parse(JSON.stringify(c));
      duplicate.id = `${c.id}_copy_${Date.now()}`;
      duplicates.push(duplicate);
    }
  });

  return duplicates;
}

/**
 * Move components to specific position
 */
export function batchMove(
  components: DiscordComponent[],
  idsToMove: string[],
  targetIndex: number
): DiscordComponent[] {
  const idsSet = new Set(idsToMove);
  const toMove = components.filter((c) => idsSet.has(c.id || ''));
  const remaining = components.filter((c) => !idsSet.has(c.id || ''));

  const result = [...remaining];
  result.splice(targetIndex, 0, ...toMove);
  return result;
}

/**
 * Sort components by property
 */
export function sortComponents(
  components: DiscordComponent[],
  sortBy: 'type' | 'id' | 'created',
  order: 'asc' | 'desc' = 'asc'
): DiscordComponent[] {
  const sorted = [...components].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'type':
        comparison = a.type - b.type;
        break;
      case 'id':
        comparison = (a.id || '').localeCompare(b.id || '');
        break;
      case 'created':
        comparison = (a.id || '').localeCompare(b.id || '');
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}
