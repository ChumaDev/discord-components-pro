/**
 * Import Feature Types
 */

import type { DiscordComponent } from '../../types/discord';

export type ImportFormat = 'json' | 'discord.js' | 'file';

export interface ImportResult {
  success: boolean;
  components: DiscordComponent[];
  error?: string;
  warnings?: string[];
}

export interface ImportOptions {
  replace?: boolean;
  validate?: boolean;
  skipInvalid?: boolean;
}

export interface ValidationResult {
  valid: DiscordComponent[];
  invalid: unknown[];
  warnings: string[];
}
