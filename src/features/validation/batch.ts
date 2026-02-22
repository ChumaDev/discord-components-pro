/**
 * Batch Validation
 */

import type { DiscordComponent } from '../../types/discord';
import type { BatchValidationResult, ValidationError } from './types';
import { validateComponent } from './validators';

/**
 * Validate multiple components
 */
export function validateComponents(components: DiscordComponent[]): BatchValidationResult {
  const errors: Record<string, ValidationError[]> = {};
  let validCount = 0;
  let invalidCount = 0;

  components.forEach((component, index) => {
    const result = validateComponent(component);

    if (result.valid) {
      validCount++;
    } else {
      invalidCount++;
      const key = component.id || `component_${index}`;
      errors[key] = result.errors;
    }
  });

  return {
    valid: invalidCount === 0,
    errors,
    validCount,
    invalidCount,
  };
}

/**
 * Get validation summary
 */
export function getValidationSummary(result: BatchValidationResult): string {
  if (result.valid) {
    return `All ${result.validCount} components are valid`;
  }

  return `${result.validCount} valid, ${result.invalidCount} invalid components`;
}
