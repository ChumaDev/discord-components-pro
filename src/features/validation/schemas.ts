/**
 * Validation Schemas
 */

import { z } from 'zod';
import { DISCORD_LIMITS, VALIDATION_MESSAGES } from '../../constants/limits';

export const urlSchema = z.string().url(VALIDATION_MESSAGES.INVALID_URL);

export const buttonSchema = z.object({
  label: z
    .string()
    .max(DISCORD_LIMITS.BUTTON_LABEL_LENGTH, VALIDATION_MESSAGES.BUTTON_LABEL_TOO_LONG),
  custom_id: z
    .string()
    .max(DISCORD_LIMITS.CUSTOM_ID_LENGTH, VALIDATION_MESSAGES.CUSTOM_ID_TOO_LONG)
    .optional(),
  url: urlSchema.optional(),
});

export const textDisplaySchema = z.object({
  content: z
    .string()
    .max(DISCORD_LIMITS.TEXT_DISPLAY_CONTENT_LENGTH, VALIDATION_MESSAGES.TEXT_CONTENT_TOO_LONG),
});

export const selectOptionSchema = z.object({
  label: z.string().max(DISCORD_LIMITS.SELECT_OPTION_LABEL_LENGTH),
  value: z.string().max(DISCORD_LIMITS.SELECT_OPTION_VALUE_LENGTH),
  description: z.string().max(DISCORD_LIMITS.SELECT_OPTION_DESCRIPTION_LENGTH).optional(),
});

export const stringSelectSchema = z.object({
  custom_id: z
    .string()
    .min(1, VALIDATION_MESSAGES.CUSTOM_ID_REQUIRED)
    .max(DISCORD_LIMITS.CUSTOM_ID_LENGTH, VALIDATION_MESSAGES.CUSTOM_ID_TOO_LONG),
  options: z
    .array(selectOptionSchema)
    .max(DISCORD_LIMITS.SELECT_OPTIONS, VALIDATION_MESSAGES.TOO_MANY_SELECT_OPTIONS),
  placeholder: z.string().max(DISCORD_LIMITS.SELECT_PLACEHOLDER_LENGTH).optional(),
});
