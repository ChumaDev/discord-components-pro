/**
 * Discord.js Export Formatter
 */

import type { DiscordComponent } from '../../../types/discord';

const BUTTON_STYLES = ['Primary', 'Secondary', 'Success', 'Danger', 'Link'];

export function getButtonStyleName(style: number): string {
  return BUTTON_STYLES[style - 1] || 'Primary';
}

export function generateComponentCode(component: DiscordComponent, imports: Set<string>): string {
  switch (component.type) {
    case 100: // TextDisplay
      imports.add('TextDisplayBuilder');
      return `  new TextDisplayBuilder()\n    .setContent(${JSON.stringify(component.content)})`;

    case 2: {
      // Button
      imports.add('ButtonBuilder');
      imports.add('ButtonStyle');
      let buttonCode = `  new ButtonBuilder()\n    .setStyle(ButtonStyle.${getButtonStyleName(component.style)})\n    .setLabel(${JSON.stringify(component.label)})`;

      if (component.custom_id) {
        buttonCode += `\n    .setCustomId(${JSON.stringify(component.custom_id)})`;
      }

      if (component.url) {
        buttonCode += `\n    .setURL(${JSON.stringify(component.url)})`;
      }

      if (component.emoji) {
        if (component.emoji.id) {
          // Custom Discord emoji with ID
          buttonCode += `\n    .setEmoji({ name: ${JSON.stringify(component.emoji.name || 'emoji')}, id: ${JSON.stringify(component.emoji.id)}${component.emoji.animated ? ', animated: true' : ''} })`;
        } else if (component.emoji.name) {
          // Unicode emoji or emoji name
          buttonCode += `\n    .setEmoji(${JSON.stringify(component.emoji.name)})`;
        }
      }

      return buttonCode;
    }

    case 103: // Container
      imports.add('ContainerBuilder');
      return `  new ContainerBuilder()${component.accent ? `\n    .setAccent(${component.accent})` : ''}${component.spoiler ? '\n    .setSpoiler(true)' : ''}`;

    case 102: // Separator
      imports.add('SeparatorBuilder');
      return `  new SeparatorBuilder()${component.spacing ? `\n    .setSpacing(${component.spacing})` : ''}${component.divider ? '\n    .setDivider(true)' : ''}`;

    case 1: // ActionRow
      imports.add('ActionRowBuilder');
      return `  new ActionRowBuilder()`;

    case 3: // StringSelect
      imports.add('StringSelectMenuBuilder');
      return `  new StringSelectMenuBuilder()\n    .setCustomId(${JSON.stringify(component.custom_id || 'select')})${component.placeholder ? `\n    .setPlaceholder(${JSON.stringify(component.placeholder)})` : ''}`;

    default:
      return `  // Component type ${component.type} not yet supported`;
  }
}

export function formatDiscordJS(components: DiscordComponent[]): string {
  const imports = new Set<string>();
  const componentCode: string[] = [];

  components.forEach((component) => {
    const code = generateComponentCode(component, imports);
    componentCode.push(code);
  });

  const importStatement = `import { ${Array.from(imports).join(', ')}, MessageFlags } from 'discord.js';\n\n`;
  const code = `${importStatement}const components = [\n${componentCode.join(',\n')}\n];\n\nawait interaction.reply({\n  components,\n  flags: MessageFlags.IsComponentsV2,\n});`;

  return code;
}
