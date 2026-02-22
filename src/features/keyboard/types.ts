/**
 * Keyboard Feature Types
 */

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description?: string;
  enabled?: boolean;
}

export interface KeyboardShortcutGroup {
  name: string;
  shortcuts: KeyboardShortcut[];
}

export interface KeyboardOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export interface KeyModifiers {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
}
