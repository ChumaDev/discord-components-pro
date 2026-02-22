/**
 * File Import Parser
 */

import type { DiscordComponent } from '../../../types/discord';
import { parseDiscordJS } from './discordjs';
import { parseJSON } from './json';

export async function parseFile(file: File): Promise<DiscordComponent[]> {
  const text = await file.text();

  if (file.name.endsWith('.json')) {
    return parseJSON(text);
  }

  if (file.name.endsWith('.js') || file.name.endsWith('.ts')) {
    return parseDiscordJS(text);
  }

  throw new Error('Unsupported file format. Use .json, .js, or .ts files.');
}
