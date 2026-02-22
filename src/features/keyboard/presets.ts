/**
 * Keyboard Shortcut Presets
 */

import type { KeyboardShortcut } from './types';

/**
 * Common keyboard shortcuts
 */
export const COMMON_SHORTCUTS = {
  UNDO: { key: 'z', ctrl: true, description: 'Undo' },
  REDO: { key: 'y', ctrl: true, description: 'Redo' },
  REDO_ALT: { key: 'z', ctrl: true, shift: true, description: 'Redo (alternative)' },
  COPY: { key: 'c', ctrl: true, description: 'Copy' },
  CUT: { key: 'x', ctrl: true, description: 'Cut' },
  PASTE: { key: 'v', ctrl: true, description: 'Paste' },
  SELECT_ALL: { key: 'a', ctrl: true, description: 'Select all' },
  SAVE: { key: 's', ctrl: true, description: 'Save' },
  DELETE: { key: 'Delete', description: 'Delete' },
  ESCAPE: { key: 'Escape', description: 'Cancel/Close' },
} as const;

/**
 * Create undo shortcut
 */
export function createUndoShortcut(action: () => void): KeyboardShortcut {
  return {
    ...COMMON_SHORTCUTS.UNDO,
    action,
  };
}

/**
 * Create redo shortcut
 */
export function createRedoShortcut(action: () => void): KeyboardShortcut {
  return {
    ...COMMON_SHORTCUTS.REDO,
    action,
  };
}

/**
 * Create copy shortcut
 */
export function createCopyShortcut(action: () => void): KeyboardShortcut {
  return {
    ...COMMON_SHORTCUTS.COPY,
    action,
  };
}

/**
 * Create paste shortcut
 */
export function createPasteShortcut(action: () => void): KeyboardShortcut {
  return {
    ...COMMON_SHORTCUTS.PASTE,
    action,
  };
}

/**
 * Create delete shortcut
 */
export function createDeleteShortcut(action: () => void): KeyboardShortcut {
  return {
    ...COMMON_SHORTCUTS.DELETE,
    action,
  };
}
