/**
 * Component Validators
 */

import { z } from 'zod';
import { DISCORD_LIMITS, VALIDATION_MESSAGES } from '../../constants/limits';
import type {
  ButtonComponent,
  DiscordComponent,
  StringSelectComponent,
  TextDisplayComponent,
} from '../../types/discord';
import { buttonSchema, stringSelectSchema, textDisplaySchema, urlSchema } from './schemas';
import type { ValidationError, ValidationResult } from './types';

/**
 * Validate a single component
 */
export function validateComponent(component: DiscordComponent): ValidationResult {
  const errors: ValidationError[] = [];

  try {
    switch (component.type) {
      case 2: // Button
        buttonSchema.parse(component as ButtonComponent);
        break;
      case 3: // StringSelect
        stringSelectSchema.parse(component as StringSelectComponent);
        break;
      case 100: // TextDisplay
        textDisplaySchema.parse(component as TextDisplayComponent);
        break;
      // Add more component types as needed
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(
        ...error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }))
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  try {
    urlSchema.parse(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate custom ID
 */
export function validateCustomId(customId: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!customId || customId.length === 0) {
    errors.push({
      field: 'custom_id',
      message: VALIDATION_MESSAGES.CUSTOM_ID_REQUIRED,
      code: 'required',
    });
  } else if (customId.length > DISCORD_LIMITS.CUSTOM_ID_LENGTH) {
    errors.push({
      field: 'custom_id',
      message: VALIDATION_MESSAGES.CUSTOM_ID_TOO_LONG,
      code: 'too_long',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate button label
 */
export function validateButtonLabel(label: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!label || label.length === 0) {
    errors.push({
      field: 'label',
      message: 'Button label is required',
      code: 'required',
    });
  } else if (label.length > DISCORD_LIMITS.BUTTON_LABEL_LENGTH) {
    errors.push({
      field: 'label',
      message: VALIDATION_MESSAGES.BUTTON_LABEL_TOO_LONG,
      code: 'too_long',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate text content
 */
export function validateTextContent(content: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (content.length > DISCORD_LIMITS.TEXT_DISPLAY_CONTENT_LENGTH) {
    errors.push({
      field: 'content',
      message: VALIDATION_MESSAGES.TEXT_CONTENT_TOO_LONG,
      code: 'too_long',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
