/**
 * Clipboard Types
 */

import type { DiscordComponent } from '../../types/discord';

export interface ClipboardData {
  components: DiscordComponent[];
  timestamp: number;
}

export interface ClipboardOptions {
  regenerateIds?: boolean;
  copyToSystem?: boolean;
}
