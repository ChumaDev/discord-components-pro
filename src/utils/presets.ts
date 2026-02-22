/**
 * Preset Library
 * Pre-built component configurations for common use cases
 */

import type { DiscordComponent } from '../types/discord';
import { ButtonStyle, ComponentType, ContainerAccent, SeparatorSpacing } from '../types/discord';
import { generateId } from './id';

export interface Preset {
  id: string;
  name: string;
  description: string;
  category: 'buttons' | 'forms' | 'menus' | 'layouts' | 'notifications';
  tags: string[];
  components: DiscordComponent[];
  preview?: string;
}

/**
 * Button Presets
 */
const buttonPresets: Preset[] = [
  {
    id: 'confirm-cancel',
    name: 'Confirm/Cancel Buttons',
    description: 'Standard confirmation dialog buttons',
    category: 'buttons',
    tags: ['dialog', 'confirmation', 'action'],
    components: [
      {
        id: generateId('action-row'),
        type: ComponentType.ActionRow,
        components: [
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Success,
            label: 'Confirm',
            custom_id: 'confirm',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            label: 'Cancel',
            custom_id: 'cancel',
          },
        ],
      },
    ],
  },
  {
    id: 'social-links',
    name: 'Social Media Links',
    description: 'Common social media link buttons',
    category: 'buttons',
    tags: ['links', 'social', 'external'],
    components: [
      {
        id: generateId('action-row'),
        type: ComponentType.ActionRow,
        components: [
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Link,
            label: 'Website',
            url: 'https://example.com',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Link,
            label: 'Twitter',
            url: 'https://twitter.com',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Link,
            label: 'GitHub',
            url: 'https://github.com',
          },
        ],
      },
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination Controls',
    description: 'Previous/Next navigation buttons',
    category: 'buttons',
    tags: ['navigation', 'pagination'],
    components: [
      {
        id: generateId('action-row'),
        type: ComponentType.ActionRow,
        components: [
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            label: '◀ Previous',
            custom_id: 'prev',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Primary,
            label: 'Page 1',
            custom_id: 'current',
            disabled: true,
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            label: 'Next ▶',
            custom_id: 'next',
          },
        ],
      },
    ],
  },
];

/**
 * Form Presets
 */
const formPresets: Preset[] = [
  {
    id: 'feedback-form',
    name: 'Feedback Form',
    description: 'Simple feedback collection form',
    category: 'forms',
    tags: ['feedback', 'rating', 'survey'],
    components: [
      {
        id: generateId('text'),
        type: ComponentType.TextDisplay,
        content: '📝 How would you rate your experience?',
      },
      {
        id: generateId('action-row'),
        type: ComponentType.ActionRow,
        components: [
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Success,
            label: '😊 Great',
            custom_id: 'rating_5',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Primary,
            label: '🙂 Good',
            custom_id: 'rating_4',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            label: '😐 Okay',
            custom_id: 'rating_3',
          },
          {
            id: generateId('button'),
            type: ComponentType.Button,
            style: ButtonStyle.Danger,
            label: '😞 Poor',
            custom_id: 'rating_2',
          },
        ],
      },
    ],
  },
];

/**
 * Menu Presets
 */
const menuPresets: Preset[] = [
  {
    id: 'settings-menu',
    name: 'Settings Menu',
    description: 'Common settings options',
    category: 'menus',
    tags: ['settings', 'configuration'],
    components: [
      {
        id: generateId('text'),
        type: ComponentType.TextDisplay,
        content: '⚙️ Settings',
      },
      {
        id: generateId('select'),
        type: ComponentType.StringSelect,
        custom_id: 'settings',
        placeholder: 'Choose a setting...',
        options: [
          { label: 'Notifications', value: 'notifications', emoji: { name: '🔔' } },
          { label: 'Privacy', value: 'privacy', emoji: { name: '🔒' } },
          { label: 'Language', value: 'language', emoji: { name: '🌐' } },
          { label: 'Theme', value: 'theme', emoji: { name: '🎨' } },
        ],
      },
    ],
  },
];

/**
 * Layout Presets
 */
const layoutPresets: Preset[] = [
  {
    id: 'info-card',
    name: 'Information Card',
    description: 'Styled information display',
    category: 'layouts',
    tags: ['card', 'info', 'display'],
    components: [
      {
        id: generateId('container'),
        type: ComponentType.Container,
        accent: ContainerAccent.Primary,
        components: [
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: '📌 Important Information',
          },
          {
            id: generateId('separator'),
            type: ComponentType.Separator,
            spacing: SeparatorSpacing.Small,
            divider: true,
          },
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: 'This is some important information that users should know about.',
          },
        ],
      },
    ],
  },
  {
    id: 'announcement',
    name: 'Announcement Banner',
    description: 'Eye-catching announcement layout',
    category: 'layouts',
    tags: ['announcement', 'banner', 'alert'],
    components: [
      {
        id: generateId('container'),
        type: ComponentType.Container,
        accent: ContainerAccent.Success,
        components: [
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: '🎉 New Feature Released!',
          },
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: 'Check out our latest update with amazing new features.',
          },
          {
            id: generateId('action-row'),
            type: ComponentType.ActionRow,
            components: [
              {
                id: generateId('button'),
                type: ComponentType.Button,
                style: ButtonStyle.Link,
                label: 'Learn More',
                url: 'https://example.com/updates',
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * Notification Presets
 */
const notificationPresets: Preset[] = [
  {
    id: 'success-notification',
    name: 'Success Notification',
    description: 'Success message with action',
    category: 'notifications',
    tags: ['success', 'notification', 'alert'],
    components: [
      {
        id: generateId('container'),
        type: ComponentType.Container,
        accent: ContainerAccent.Success,
        components: [
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: '✅ Action completed successfully!',
          },
          {
            id: generateId('action-row'),
            type: ComponentType.ActionRow,
            components: [
              {
                id: generateId('button'),
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                label: 'Dismiss',
                custom_id: 'dismiss',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'error-notification',
    name: 'Error Notification',
    description: 'Error message with retry option',
    category: 'notifications',
    tags: ['error', 'notification', 'alert'],
    components: [
      {
        id: generateId('container'),
        type: ComponentType.Container,
        accent: ContainerAccent.Danger,
        components: [
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: '❌ An error occurred',
          },
          {
            id: generateId('text'),
            type: ComponentType.TextDisplay,
            content: 'Please try again or contact support if the problem persists.',
          },
          {
            id: generateId('action-row'),
            type: ComponentType.ActionRow,
            components: [
              {
                id: generateId('button'),
                type: ComponentType.Button,
                style: ButtonStyle.Danger,
                label: 'Retry',
                custom_id: 'retry',
              },
              {
                id: generateId('button'),
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                label: 'Cancel',
                custom_id: 'cancel',
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * All presets combined
 */
export const allPresets: Preset[] = [
  ...buttonPresets,
  ...formPresets,
  ...menuPresets,
  ...layoutPresets,
  ...notificationPresets,
];

/**
 * Get preset by ID
 */
export function getPreset(id: string): Preset | undefined {
  return allPresets.find((preset) => preset.id === id);
}

/**
 * Get presets by category
 */
export function getPresetsByCategory(category: Preset['category']): Preset[] {
  return allPresets.filter((preset) => preset.category === category);
}

/**
 * Get presets by tag
 */
export function getPresetsByTag(tag: string): Preset[] {
  return allPresets.filter((preset) => preset.tags.includes(tag));
}

/**
 * Search presets
 */
export function searchPresets(query: string): Preset[] {
  const lowerQuery = query.toLowerCase();
  return allPresets.filter(
    (preset) =>
      preset.name.toLowerCase().includes(lowerQuery) ||
      preset.description.toLowerCase().includes(lowerQuery) ||
      preset.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get all preset categories
 */
export function getPresetCategories(): Preset['category'][] {
  return ['buttons', 'forms', 'menus', 'layouts', 'notifications'];
}
