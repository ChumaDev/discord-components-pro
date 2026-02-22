/**
 * JSON Import Parser
 */

import type { DiscordComponent } from '../../../types/discord';

export function parseJSON(json: string): DiscordComponent[] {
  try {
    const parsed = JSON.parse(json);

    // Check if it's a Discord message format
    if (parsed.components && Array.isArray(parsed.components)) {
      return parsed.components;
    }

    // Check if it's just an array of components
    if (Array.isArray(parsed)) {
      return parsed;
    }

    throw new Error('Invalid JSON format. Expected components array or Discord message object.');
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON syntax');
    }
    throw error;
  }
}
