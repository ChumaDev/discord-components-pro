/**
 * Theme Utilities Tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import type { CustomTheme } from '../types';
import { applyThemeToDOM, findTheme, isValidTheme } from '../utils';

const mockTheme: CustomTheme = {
  name: 'Test Theme',
  colors: {
    bgPrimary: '#313338',
    bgSecondary: '#2b2d31',
    bgTertiary: '#1e1f22',
    textPrimary: '#f2f3f5',
    textSecondary: '#b5bac1',
    textMuted: '#80848e',
    blurple: '#5865f2',
    green: '#23a559',
    yellow: '#f0b232',
    red: '#f23f43',
    border: '#3f4147',
    borderHover: '#4e5058',
    buttonPrimary: '#5865f2',
    buttonSecondary: '#4e5058',
    buttonSuccess: '#23a559',
    buttonDanger: '#da373c',
  },
};

describe('applyThemeToDOM', () => {
  beforeEach(() => {
    // Clear any existing CSS variables
    document.documentElement.style.cssText = '';
  });

  it('should apply theme colors to CSS variables', () => {
    applyThemeToDOM(mockTheme);

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--discord-bg-primary')).toBe('#313338');
    expect(root.style.getPropertyValue('--discord-text-primary')).toBe('#f2f3f5');
    expect(root.style.getPropertyValue('--discord-blurple')).toBe('#5865f2');
  });

  it('should convert camelCase to kebab-case', () => {
    applyThemeToDOM(mockTheme);

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--discord-bg-primary')).toBeTruthy();
    expect(root.style.getPropertyValue('--discord-text-secondary')).toBeTruthy();
    expect(root.style.getPropertyValue('--discord-button-primary')).toBeTruthy();
  });

  it('should handle all theme colors', () => {
    applyThemeToDOM(mockTheme);

    const root = document.documentElement;
    Object.keys(mockTheme.colors).forEach((key) => {
      const cssVar = `--discord-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      expect(root.style.getPropertyValue(cssVar)).toBeTruthy();
    });
  });
});

describe('findTheme', () => {
  const themes: CustomTheme[] = [
    { ...mockTheme, name: 'Dark' },
    { ...mockTheme, name: 'Light' },
    { ...mockTheme, name: 'Midnight' },
  ];

  it('should find theme by name', () => {
    const theme = findTheme(themes, 'Dark');
    expect(theme).toBeDefined();
    expect(theme?.name).toBe('Dark');
  });

  it('should return undefined for non-existent theme', () => {
    const theme = findTheme(themes, 'NonExistent');
    expect(theme).toBeUndefined();
  });

  it('should be case sensitive', () => {
    const theme = findTheme(themes, 'dark');
    expect(theme).toBeUndefined();
  });

  it('should handle empty themes array', () => {
    const theme = findTheme([], 'Dark');
    expect(theme).toBeUndefined();
  });
});

describe('isValidTheme', () => {
  it('should validate correct theme', () => {
    expect(isValidTheme(mockTheme)).toBe(true);
  });

  it('should reject null', () => {
    expect(isValidTheme(null)).toBe(false);
  });

  it('should reject undefined', () => {
    expect(isValidTheme(undefined)).toBe(false);
  });

  it('should reject non-object', () => {
    expect(isValidTheme('theme')).toBe(false);
    expect(isValidTheme(123)).toBe(false);
    expect(isValidTheme(true)).toBe(false);
  });

  it('should reject theme without name', () => {
    const invalid = { ...mockTheme, name: undefined };
    expect(isValidTheme(invalid)).toBe(false);
  });

  it('should reject theme without colors', () => {
    const invalid = { name: 'Test', colors: undefined };
    expect(isValidTheme(invalid)).toBe(false);
  });

  it('should reject theme with missing required colors', () => {
    const invalid = {
      name: 'Test',
      colors: {
        bgPrimary: '#000',
        // Missing other required colors
      },
    };
    expect(isValidTheme(invalid)).toBe(false);
  });

  it('should accept theme with all required colors', () => {
    expect(isValidTheme(mockTheme)).toBe(true);
  });

  it('should accept theme with extra colors', () => {
    const extended = {
      ...mockTheme,
      colors: {
        ...mockTheme.colors,
        customColor: '#ffffff',
      },
    };
    expect(isValidTheme(extended)).toBe(true);
  });
});
