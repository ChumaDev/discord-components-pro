/**
 * Discord.js Import Parser
 */

import type { DiscordComponent } from '../../../types/discord';
import { parseJSON } from './json';

export function parseDiscordJS(code: string): DiscordComponent[] {
  // Try to extract JSON from code
  const jsonMatch = code.match(/components:\s*(\[[\s\S]*?\])/);

  if (jsonMatch?.[1]) {
    try {
      return parseJSON(jsonMatch[1]);
    } catch (error) {
      console.error('Failed to parse Discord.js code:', error);
      throw new Error('Could not extract components from Discord.js code');
    }
  }

  throw new Error('No components found in Discord.js code');
}
