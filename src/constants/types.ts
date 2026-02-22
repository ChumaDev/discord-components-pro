/**
 * Component Type Constants
 */

import { ComponentType } from '../types/discord';

export const COMPONENT_TYPES = {
  TEXT_DISPLAY: ComponentType.TextDisplay,
  BUTTON: ComponentType.Button,
  STRING_SELECT: ComponentType.StringSelect,
  ACTION_ROW: ComponentType.ActionRow,
  SEPARATOR: ComponentType.Separator,
  CONTAINER: ComponentType.Container,
  MEDIA_GALLERY: ComponentType.MediaGallery,
  THUMBNAIL: ComponentType.Thumbnail,
} as const;

export const COMPONENT_NAMES: Record<ComponentType, string> = {
  [ComponentType.ActionRow]: 'Action Row',
  [ComponentType.Button]: 'Button',
  [ComponentType.StringSelect]: 'Select Menu',
  [ComponentType.TextInput]: 'Text Input',
  [ComponentType.UserSelect]: 'User Select',
  [ComponentType.RoleSelect]: 'Role Select',
  [ComponentType.MentionableSelect]: 'Mentionable Select',
  [ComponentType.ChannelSelect]: 'Channel Select',
  [ComponentType.TextDisplay]: 'Text Display',
  [ComponentType.MediaGallery]: 'Media Gallery',
  [ComponentType.Separator]: 'Separator',
  [ComponentType.Container]: 'Container',
  [ComponentType.Section]: 'Section',
  [ComponentType.Thumbnail]: 'Thumbnail',
};

export const INTERACTIVE_COMPONENTS = [
  ComponentType.Button,
  ComponentType.StringSelect,
  ComponentType.UserSelect,
  ComponentType.RoleSelect,
  ComponentType.MentionableSelect,
  ComponentType.ChannelSelect,
] as const;

export const CONTAINER_COMPONENTS = [ComponentType.ActionRow, ComponentType.Container] as const;
