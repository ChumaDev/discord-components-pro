/**
 * MessageBuilder Constants
 */

import { ComponentType } from '../../../types/discord';

export interface ComponentMenuItem {
  type: ComponentType;
  label: string;
  icon: string;
}

export const COMPONENT_MENU_ITEMS: ComponentMenuItem[] = [
  {
    type: ComponentType.TextDisplay,
    label: 'Text Display',
    icon: '📝',
  },
  {
    type: ComponentType.Button,
    label: 'Button',
    icon: '🔘',
  },
  {
    type: ComponentType.StringSelect,
    label: 'String Select',
    icon: '📋',
  },
  {
    type: ComponentType.Container,
    label: 'Container',
    icon: '📦',
  },
  {
    type: ComponentType.ActionRow,
    label: 'Action Row',
    icon: '↔️',
  },
  {
    type: ComponentType.Separator,
    label: 'Separator',
    icon: '➖',
  },
];
