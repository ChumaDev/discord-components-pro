/**
 * Discord API Types for Components v2
 * Based on official Discord API documentation
 */

export enum ComponentType {
  ActionRow = 1,
  Button = 2,
  StringSelect = 3,
  TextInput = 4,
  UserSelect = 5,
  RoleSelect = 6,
  MentionableSelect = 7,
  ChannelSelect = 8,
  // Components v2
  TextDisplay = 100,
  MediaGallery = 101,
  Separator = 102,
  Container = 103,
  Section = 104,
  Thumbnail = 105,
}

export enum ButtonStyle {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5,
}

export enum SeparatorSpacing {
  None = 0,
  Small = 1,
  Large = 2,
}

export enum ContainerAccent {
  None = 0,
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
}

export interface BaseComponent {
  type: ComponentType;
  id?: string;
}

export interface TextDisplayComponent extends BaseComponent {
  type: ComponentType.TextDisplay;
  content: string;
}

export interface ButtonComponent extends BaseComponent {
  type: ComponentType.Button;
  style: ButtonStyle;
  label: string;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
  emoji?: {
    id?: string;
    name?: string;
    animated?: boolean;
  };
}

export interface StringSelectComponent extends BaseComponent {
  type: ComponentType.StringSelect;
  custom_id: string;
  options: SelectOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: {
    id?: string;
    name?: string;
    animated?: boolean;
  };
  default?: boolean;
}

export interface ActionRowComponent extends BaseComponent {
  type: ComponentType.ActionRow;
  components: (ButtonComponent | StringSelectComponent)[];
}

export interface SeparatorComponent extends BaseComponent {
  type: ComponentType.Separator;
  spacing?: SeparatorSpacing;
  divider?: boolean;
}

export interface ContainerComponent extends BaseComponent {
  type: ComponentType.Container;
  components: DiscordComponent[];
  accent?: ContainerAccent;
  spoiler?: boolean;
}

export interface MediaGalleryComponent extends BaseComponent {
  type: ComponentType.MediaGallery;
  items: MediaItem[];
}

export interface MediaItem {
  url: string;
  description?: string;
  spoiler?: boolean;
}

export interface ThumbnailComponent extends BaseComponent {
  type: ComponentType.Thumbnail;
  url: string;
}

export type DiscordComponent =
  | TextDisplayComponent
  | ButtonComponent
  | StringSelectComponent
  | ActionRowComponent
  | SeparatorComponent
  | ContainerComponent
  | MediaGalleryComponent
  | ThumbnailComponent;

export interface DiscordMessage {
  components: DiscordComponent[];
  flags?: number;
}
