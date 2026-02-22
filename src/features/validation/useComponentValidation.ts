/**
 * Component Validation Hook
 */

import { useMemo } from 'react';
import type { DiscordComponent } from '../../types/discord';
import { validateComponents } from './batch';
import type { BatchValidationResult, ComponentValidation } from './types';
import { validateComponent } from './validators';

export function useComponentValidation(component: DiscordComponent): ComponentValidation {
  const validation = useMemo(() => {
    const result = validateComponent(component);
    return {
      ...result,
      componentId: component.id,
      componentType: component.type,
      isValid: result.valid,
      hasErrors: result.errors.length > 0,
    };
  }, [component]);

  return validation;
}

export function useComponentsValidation(components: DiscordComponent[]): BatchValidationResult {
  const validation = useMemo(() => {
    return validateComponents(components);
  }, [components]);

  return validation;
}
