/**
 * Import Validation
 */

import type { DiscordComponent } from '../../types/discord';
import { ComponentType } from '../../types/discord';
import { generateId } from '../../utils/id';
import type { ValidationResult } from './types';

/**
 * Check if component is valid
 */
export function isValidComponent(component: unknown): component is DiscordComponent {
  if (!component || typeof component !== 'object') {
    return false;
  }

  const comp = component as Record<string, unknown>;

  if (!('type' in comp)) {
    return false;
  }

  const validTypes = Object.values(ComponentType).filter((v) => typeof v === 'number');
  if (!validTypes.includes(comp.type as number)) {
    return false;
  }

  return true;
}

/**
 * Normalize component (ensure ID exists)
 */
export function normalizeComponent(component: DiscordComponent): DiscordComponent {
  return {
    ...component,
    id: component.id || generateId(component.type.toString()),
  };
}

/**
 * Validate and normalize components
 */
export function validateComponents(components: unknown[]): ValidationResult {
  const valid: DiscordComponent[] = [];
  const invalid: unknown[] = [];
  const warnings: string[] = [];

  for (let i = 0; i < components.length; i++) {
    const component = components[i];

    if (!isValidComponent(component)) {
      invalid.push(component);
      warnings.push(`Component at index ${i} is invalid and was skipped`);
      continue;
    }

    const normalized = normalizeComponent(component);
    valid.push(normalized);
  }

  return { valid, invalid, warnings };
}
