/**
 * JSON Export Formatter
 */

import type { DiscordComponent, DiscordMessage } from '../../../types/discord';
import type { ExportOptions } from '../types';

export function formatJSON(components: DiscordComponent[], options: ExportOptions): string {
  const message: DiscordMessage = {
    components,
    flags: 1 << 7, // IsComponentsV2 flag
  };

  if (options.minify) {
    return JSON.stringify(message);
  }

  return JSON.stringify(message, null, 2);
}
