/**
 * Keyboard Utilities Tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import type { KeyboardShortcut } from '../types';
import {
  formatShortcut,
  getKeyModifiers,
  getShortcutDescription,
  isInputElement,
  matchesShortcut,
  shouldIgnoreShortcut,
} from '../utils';

describe('getKeyModifiers', () => {
  it('should extract modifiers from keyboard event', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });

    const modifiers = getKeyModifiers(event);
    expect(modifiers.ctrl).toBe(true);
    expect(modifiers.shift).toBe(false);
    expect(modifiers.alt).toBe(false);
    expect(modifiers.meta).toBe(false);
  });

  it('should handle multiple modifiers', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: false,
    });

    const modifiers = getKeyModifiers(event);
    expect(modifiers.ctrl).toBe(true);
    expect(modifiers.shift).toBe(true);
    expect(modifiers.alt).toBe(true);
  });

  it('should handle no modifiers', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });

    const modifiers = getKeyModifiers(event);
    expect(modifiers.ctrl).toBe(false);
    expect(modifiers.shift).toBe(false);
    expect(modifiers.alt).toBe(false);
    expect(modifiers.meta).toBe(false);
  });
});

describe('matchesShortcut', () => {
  it('should match simple shortcut', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });

    expect(matchesShortcut(event, shortcut)).toBe(true);
  });

  it('should not match if key is different', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    const event = new KeyboardEvent('keydown', {
      key: 'y',
      ctrlKey: true,
    });

    expect(matchesShortcut(event, shortcut)).toBe(false);
  });

  it('should not match if modifiers are different', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: false,
    });

    expect(matchesShortcut(event, shortcut)).toBe(false);
  });

  it('should match with multiple modifiers', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      shift: true,
      action: () => {},
      description: 'Redo',
    };

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
      shiftKey: true,
    });

    expect(matchesShortcut(event, shortcut)).toBe(true);
  });

  it('should not match disabled shortcut', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
      enabled: false,
    };

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });

    expect(matchesShortcut(event, shortcut)).toBe(false);
  });

  it('should be case insensitive', () => {
    const shortcut: KeyboardShortcut = {
      key: 'Z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });

    expect(matchesShortcut(event, shortcut)).toBe(true);
  });

  it('should accept meta key as ctrl on Mac', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      metaKey: true,
    });

    expect(matchesShortcut(event, shortcut)).toBe(true);
  });
});

describe('formatShortcut', () => {
  it('should format simple shortcut', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    expect(formatShortcut(shortcut)).toBe('Ctrl+Z');
  });

  it('should format shortcut with multiple modifiers', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      shift: true,
      action: () => {},
      description: 'Redo',
    };

    expect(formatShortcut(shortcut)).toBe('Ctrl+Shift+Z');
  });

  it('should format shortcut with all modifiers', () => {
    const shortcut: KeyboardShortcut = {
      key: 'a',
      ctrl: true,
      shift: true,
      alt: true,
      meta: true,
      action: () => {},
      description: 'Test',
    };

    expect(formatShortcut(shortcut)).toBe('Ctrl+Shift+Alt+Meta+A');
  });

  it('should uppercase key', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo',
    };

    expect(formatShortcut(shortcut)).toContain('Z');
  });
});

describe('getShortcutDescription', () => {
  it('should return description if provided', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
      description: 'Undo last action',
    };

    expect(getShortcutDescription(shortcut)).toBe('Undo last action');
  });

  it('should return formatted shortcut if no description', () => {
    const shortcut: KeyboardShortcut = {
      key: 'z',
      ctrl: true,
      action: () => {},
    };

    expect(getShortcutDescription(shortcut)).toBe('Ctrl+Z');
  });
});

describe('isInputElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return true for input element', () => {
    const input = document.createElement('input');
    expect(isInputElement(input)).toBe(true);
  });

  it('should return true for textarea element', () => {
    const textarea = document.createElement('textarea');
    expect(isInputElement(textarea)).toBe(true);
  });

  it('should return true for select element', () => {
    const select = document.createElement('select');
    expect(isInputElement(select)).toBe(true);
  });

  it('should return true for contenteditable element', () => {
    const div = document.createElement('div');
    div.setAttribute('contenteditable', 'true');
    expect(isInputElement(div)).toBe(true);
  });

  it('should return false for regular div', () => {
    const div = document.createElement('div');
    expect(isInputElement(div)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isInputElement(null)).toBe(false);
  });
});

describe('shouldIgnoreShortcut', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should ignore shortcuts in input elements', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });
    Object.defineProperty(event, 'target', { value: input, writable: false });

    expect(shouldIgnoreShortcut(event)).toBe(true);
  });

  it('should not ignore shortcuts in regular elements', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });
    Object.defineProperty(event, 'target', { value: div, writable: false });

    expect(shouldIgnoreShortcut(event)).toBe(false);
  });
});
