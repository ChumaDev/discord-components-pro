/**
 * Keyboard Shortcuts Hook
 */

import { useEffect } from 'react';
import type { KeyboardOptions, KeyboardShortcut } from './types';
import { matchesShortcut, shouldIgnoreShortcut } from './utils';

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], options: KeyboardOptions = {}) {
  const { enabled = true, preventDefault = true, stopPropagation = false } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore shortcuts when typing in inputs
      if (shouldIgnoreShortcut(event)) {
        return;
      }

      for (const shortcut of shortcuts) {
        if (matchesShortcut(event, shortcut)) {
          if (preventDefault) {
            event.preventDefault();
          }
          if (stopPropagation) {
            event.stopPropagation();
          }

          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled, preventDefault, stopPropagation]);
}
