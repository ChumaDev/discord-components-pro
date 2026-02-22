/**
 * TypeScript Export Formatter
 */

import type { DiscordComponent } from '../../../types/discord';
import { generateComponentCode } from './discordjs';

export function formatTypeScript(components: DiscordComponent[]): string {
  const imports = new Set<string>();
  const componentCode: string[] = [];

  components.forEach((component) => {
    const code = generateComponentCode(component, imports);
    componentCode.push(code);
  });

  const importStatement = `import type { DiscordComponent, DiscordMessage } from './types';\nimport { ${Array.from(imports).join(', ')}, MessageFlags } from 'discord.js';\n\n`;
  const code = `${importStatement}const components: DiscordComponent[] = [\n${componentCode.join(',\n')}\n];\n\nconst message: DiscordMessage = {\n  components,\n  flags: MessageFlags.IsComponentsV2,\n};\n\nawait interaction.reply(message);`;

  return code;
}
