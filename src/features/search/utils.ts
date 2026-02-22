/**
 * Search Utilities
 */

import type { DiscordComponent } from '../../types/discord';
import { ComponentType } from '../../types/discord';

/**
 * Extract searchable text from component
 */
export function getSearchableText(component: DiscordComponent): string {
  const parts: string[] = [];

  // Add component type name
  parts.push(ComponentType[component.type] || '');

  // Extract text based on component type
  switch (component.type) {
    case ComponentType.TextDisplay:
      if ('content' in component) {
        parts.push(component.content);
      }
      break;

    case ComponentType.Button:
      if ('label' in component) {
        parts.push(component.label);
      }
      if ('custom_id' in component) {
        parts.push(component.custom_id || '');
      }
      if ('url' in component) {
        parts.push(component.url || '');
      }
      break;

    case ComponentType.StringSelect:
      if ('placeholder' in component) {
        parts.push(component.placeholder || '');
      }
      if ('custom_id' in component) {
        parts.push(component.custom_id || '');
      }
      if ('options' in component && Array.isArray(component.options)) {
        component.options.forEach((opt) => {
          parts.push(opt.label);
          parts.push(opt.value);
          if (opt.description) parts.push(opt.description);
        });
      }
      break;

    case ComponentType.Container:
    case ComponentType.ActionRow:
      if ('components' in component && Array.isArray(component.components)) {
        component.components.forEach((child) => {
          parts.push(getSearchableText(child));
        });
      }
      break;
  }

  return parts.filter(Boolean).join(' ');
}

/**
 * Get component type display name
 */
export function getComponentTypeName(type: ComponentType): string {
  const names: Partial<Record<ComponentType, string>> = {
    [ComponentType.TextDisplay]: 'Text Display',
    [ComponentType.Button]: 'Button',
    [ComponentType.Container]: 'Container',
    [ComponentType.ActionRow]: 'Action Row',
    [ComponentType.StringSelect]: 'String Select',
    [ComponentType.Separator]: 'Separator',
    [ComponentType.MediaGallery]: 'Media Gallery',
    [ComponentType.Thumbnail]: 'Thumbnail',
  };

  return names[type] || 'Unknown';
}

/**
 * Filter components by search query
 */
export function filterComponents(
  components: DiscordComponent[],
  query: string,
  type?: ComponentType
): DiscordComponent[] {
  if (!query && type === undefined) {
    return components;
  }

  return components.filter((component) => {
    // Filter by type
    if (type !== undefined && component.type !== type) {
      return false;
    }

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      const searchableText = getSearchableText(component).toLowerCase();
      return searchableText.includes(lowerQuery);
    }

    return true;
  });
}

/**
 * Calculate search statistics
 */
export function calculateSearchStats(
  totalCount: number,
  filteredCount: number
): { total: number; filtered: number; hidden: number } {
  return {
    total: totalCount,
    filtered: filteredCount,
    hidden: totalCount - filteredCount,
  };
}
