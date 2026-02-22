/**
 * Template Utilities
 * Pre-built component templates
 */

import type { DiscordComponent } from '../types/discord';
import { ButtonStyle, ComponentType, ContainerAccent, SeparatorSpacing } from '../types/discord';
import { generateId } from './id';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced' | 'interactive' | 'media';
  components: DiscordComponent[];
}

export const templates: Template[] = [
  {
    id: 'welcome-message',
    name: 'Welcome Message',
    description: 'Simple welcome message with button',
    category: 'basic',
    components: [
      {
        type: ComponentType.TextDisplay,
        content: 'Welcome to our server! 👋',
        id: generateId('text'),
      },
      {
        type: ComponentType.Separator,
        spacing: SeparatorSpacing.Small,
        divider: true,
        id: generateId('separator'),
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            style: ButtonStyle.Primary,
            label: 'Get Started',
            custom_id: 'welcome-start',
            id: generateId('button'),
          },
        ],
        id: generateId('actionrow'),
      },
    ],
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Important announcement with accent',
    category: 'basic',
    components: [
      {
        type: ComponentType.Container,
        accent: ContainerAccent.Primary,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: '📢 Important Announcement',
            id: generateId('text'),
          },
          {
            type: ComponentType.TextDisplay,
            content: 'This is an important message for all members.',
            id: generateId('text'),
          },
        ],
        id: generateId('container'),
      },
    ],
  },
  {
    id: 'poll',
    name: 'Simple Poll',
    description: 'Poll with multiple choice buttons',
    category: 'interactive',
    components: [
      {
        type: ComponentType.TextDisplay,
        content: '📊 What is your favorite color?',
        id: generateId('text'),
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            style: ButtonStyle.Primary,
            label: '🔵 Blue',
            custom_id: 'poll-blue',
            id: generateId('button'),
          },
          {
            type: ComponentType.Button,
            style: ButtonStyle.Success,
            label: '🟢 Green',
            custom_id: 'poll-green',
            id: generateId('button'),
          },
          {
            type: ComponentType.Button,
            style: ButtonStyle.Danger,
            label: '🔴 Red',
            custom_id: 'poll-red',
            id: generateId('button'),
          },
        ],
        id: generateId('actionrow'),
      },
    ],
  },
  {
    id: 'menu',
    name: 'Selection Menu',
    description: 'Dropdown menu for options',
    category: 'interactive',
    components: [
      {
        type: ComponentType.TextDisplay,
        content: 'Choose an option:',
        id: generateId('text'),
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.StringSelect,
            custom_id: 'menu-select',
            placeholder: 'Select an option',
            options: [
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' },
              { label: 'Option 3', value: 'opt3' },
            ],
            id: generateId('select'),
          },
        ],
        id: generateId('actionrow'),
      },
    ],
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: Template['category']): Template[] {
  return templates.filter((t) => t.category === category);
}

export function getAllTemplates(): Template[] {
  return templates;
}
