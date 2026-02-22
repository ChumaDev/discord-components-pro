/**
 * Component Props Types
 */

import type { ReactNode } from 'react';
import type { ButtonStyle, ContainerAccent, SeparatorSpacing } from './discord';

export interface BaseComponentProps {
  id?: string;
  className?: string;
  draggable?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

export interface TextDisplayProps extends BaseComponentProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

export interface ButtonProps extends BaseComponentProps {
  style: ButtonStyle;
  label: string;
  customId?: string;
  url?: string;
  disabled?: boolean;
  emoji?: string | { name?: string; id?: string; animated?: boolean };
  onClick?: () => void;
  onChange?: (props: Partial<ButtonProps>) => void;
  editable?: boolean;
}

export interface StringSelectProps extends BaseComponentProps {
  customId?: string;
  options: SelectOptionProps[];
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

export interface SelectOptionProps {
  label: string;
  value: string;
  description?: string;
  emoji?: string | { name?: string; id?: string; animated?: boolean };
  default?: boolean;
}

export interface ActionRowProps extends BaseComponentProps {
  children: ReactNode;
  onChange?: (children: ReactNode) => void;
  editable?: boolean;
}

export interface SeparatorProps extends BaseComponentProps {
  spacing?: SeparatorSpacing;
  divider?: boolean;
  onChange?: (props: Partial<SeparatorProps>) => void;
  editable?: boolean;
}

export interface ContainerProps extends BaseComponentProps {
  children: ReactNode;
  accent?: ContainerAccent;
  spoiler?: boolean;
  onChange?: (props: Partial<ContainerProps>) => void;
  editable?: boolean;
}

export interface MediaGalleryProps extends BaseComponentProps {
  items: MediaItemProps[];
  onChange?: (items: MediaItemProps[]) => void;
  editable?: boolean;
}

export interface MediaItemProps {
  url: string;
  description?: string;
  spoiler?: boolean;
}

export interface ThumbnailProps extends BaseComponentProps {
  url: string;
  onChange?: (url: string) => void;
  editable?: boolean;
}

export interface MessageBuilderProps {
  theme?: 'light' | 'dark';
  editable?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ExportOptions {
  format: 'json' | 'discord.js' | 'python' | 'typescript';
  minify?: boolean;
  includeComments?: boolean;
}
