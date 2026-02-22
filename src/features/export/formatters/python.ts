/**
 * Python Export Formatter
 */

import type { DiscordComponent } from '../../../types/discord';

export function generatePythonComponent(component: DiscordComponent): string {
  switch (component.type) {
    case 100: // TextDisplay
      return `    {"type": 100, "content": ${JSON.stringify(component.content)}}`;

    case 2: {
      // Button
      let buttonDict = `{"type": 2, "style": ${component.style}, "label": ${JSON.stringify(component.label)}`;

      if (component.custom_id) {
        buttonDict += `, "custom_id": ${JSON.stringify(component.custom_id)}`;
      }

      if (component.url) {
        buttonDict += `, "url": ${JSON.stringify(component.url)}`;
      }

      if (component.emoji) {
        const emojiParts: string[] = [];
        if (component.emoji.name) {
          emojiParts.push(`"name": ${JSON.stringify(component.emoji.name)}`);
        }
        if (component.emoji.id) {
          emojiParts.push(`"id": ${JSON.stringify(component.emoji.id)}`);
        }
        if (component.emoji.animated) {
          emojiParts.push('"animated": true');
        }
        if (emojiParts.length > 0) {
          buttonDict += `, "emoji": {${emojiParts.join(', ')}}`;
        }
      }

      buttonDict += '}';
      return `    ${buttonDict}`;
    }

    case 103: // Container
      return `    {"type": 103${component.accent ? `, "accent": ${component.accent}` : ''}${component.spoiler ? ', "spoiler": true' : ''}}`;

    case 102: // Separator
      return `    {"type": 102${component.spacing ? `, "spacing": ${component.spacing}` : ''}${component.divider ? ', "divider": true' : ''}}`;

    default:
      return `    # Component type ${component.type} not yet supported`;
  }
}

export function formatPython(components: DiscordComponent[]): string {
  const componentCode: string[] = [];

  components.forEach((component) => {
    const code = generatePythonComponent(component);
    componentCode.push(code);
  });

  const code = `from discord import ui, ButtonStyle\n\ncomponents = [\n${componentCode.join(',\n')}\n]\n\nawait interaction.response.send_message(\n    components=components,\n    flags=discord.MessageFlags.is_components_v2\n)`;

  return code;
}
