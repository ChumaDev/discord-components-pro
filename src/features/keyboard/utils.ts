/**
 * Keyboard Utilities
 */

import type { KeyboardShortcut, KeyModifiers } from './types';

/**
 * Extract modifiers from keyboard event
 */
export function getKeyModifiers(event: KeyboardEvent): KeyModifiers {
  return {
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    alt: event.altKey,
    meta: event.metaKey,
  };
}

/**
 * Check if shortcut matches event
 */
export function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  // Check if shortcut is enabled
  if (shortcut.enabled === false) {
    return false;
  }

  // Check key match
  const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
  if (!keyMatch) return false;

  // Check modifiers
  const ctrlMatch = shortcut.ctrl
    ? event.ctrlKey || event.metaKey
    : !event.ctrlKey && !event.metaKey;

  const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
  const altMatch = shortcut.alt ? event.altKey : !event.altKey;

  // Meta key is optional and only checked if explicitly set
  const metaMatch = shortcut.meta !== undefined ? shortcut.meta === event.metaKey : true;

  return ctrlMatch && shiftMatch && altMatch && metaMatch;
}

/**
 * Format shortcut for display
 */
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];

  if (shortcut.ctrl) parts.push('Ctrl');
  if (shortcut.shift) parts.push('Shift');
  if (shortcut.alt) parts.push('Alt');
  if (shortcut.meta) parts.push('Meta');

  parts.push(shortcut.key.toUpperCase());

  return parts.join('+');
}

/**
 * Get shortcut description
 */
export function getShortcutDescription(shortcut: KeyboardShortcut): string {
  return shortcut.description || formatShortcut(shortcut);
}

/**
 * Check if element is input
 */
export function isInputElement(element: Element | null): boolean {
  if (!element) return false;

  const tagName = element.tagName.toLowerCase();
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    element.getAttribute('contenteditable') === 'true'
  );
}

/**
 * Should ignore shortcut in current context
 */
export function shouldIgnoreShortcut(event: KeyboardEvent): boolean {
  return isInputElement(event.target as Element);
}
