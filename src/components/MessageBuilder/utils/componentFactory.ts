/**
 * Component Factory
 * Creates default component instances
 */

import type { DiscordComponent } from '../../../types/discord';
import {
  ButtonStyle,
  ComponentType,
  ContainerAccent,
  SeparatorSpacing,
} from '../../../types/discord';
import { generateId } from '../../../utils/id';

export function createDefaultComponent(type: ComponentType): DiscordComponent | null {
  const id = generateId('component');

  switch (type) {
    case ComponentType.TextDisplay:
      return {
        id,
        type,
        content: 'New text display',
      };

    case ComponentType.Button:
      return {
        id,
        type,
        style: ButtonStyle.Primary,
        label: 'New Button',
        custom_id: `btn-${Date.now()}`,
      };

    case ComponentType.StringSelect:
      return {
        id,
        type,
        custom_id: `select-${Date.now()}`,
        placeholder: 'Choose an option',
        options: [
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' },
        ],
      };

    case ComponentType.Container:
      return {
        id,
        type,
        accent: ContainerAccent.Primary,
        components: [],
      };

    case ComponentType.ActionRow:
      return {
        id,
        type,
        components: [],
      };

    case ComponentType.Separator:
      return {
        id,
        type,
        spacing: SeparatorSpacing.Small,
        divider: false,
      };

    default:
      return null;
  }
}
