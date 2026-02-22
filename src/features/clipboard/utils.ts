/**
 * Clipboard Utilities
 */

import type { DiscordComponent } from '../../types/discord';
import { generateId } from '../../utils/id';

/**
 * Deep clone components
 */
export function cloneComponents(components: DiscordComponent[]): DiscordComponent[] {
  return JSON.parse(JSON.stringify(components));
}

/**
 * Regenerate IDs for components to avoid duplicates
 */
export function regenerateComponentIds(components: DiscordComponent[]): DiscordComponent[] {
  return components.map((component) => ({
    ...component,
    id: generateId(component.type.toString()),
  }));
}

/**
 * Copy components to system clipboard
 */
export async function copyToSystemClipboard(components: DiscordComponent[]): Promise<boolean> {
  if (!navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(JSON.stringify(components, null, 2));
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

/**
 * Read components from system clipboard
 */
export async function readFromSystemClipboard(): Promise<DiscordComponent[] | null> {
  if (!navigator.clipboard) {
    return null;
  }

  try {
    const text = await navigator.clipboard.readText();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : null;
  } catch (err) {
    console.error('Failed to read from clipboard:', err);
    return null;
  }
}
