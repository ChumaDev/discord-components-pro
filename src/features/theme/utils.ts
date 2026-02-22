/**
 * Theme Utilities
 */

import type { CustomTheme } from './types';

/**
 * Apply theme colors to CSS variables
 */
export function applyThemeToDOM(theme: CustomTheme): void {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = `--discord-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
}

/**
 * Find theme by name
 */
export function findTheme(themes: CustomTheme[], name: string): CustomTheme | undefined {
  return themes.find((t) => t.name === name);
}

/**
 * Validate theme structure
 */
export function isValidTheme(theme: unknown): theme is CustomTheme {
  if (!theme || typeof theme !== 'object') return false;

  const t = theme as Partial<CustomTheme>;
  if (!t.name || typeof t.name !== 'string') return false;
  if (!t.colors || typeof t.colors !== 'object') return false;

  const requiredColors = [
    'bgPrimary',
    'bgSecondary',
    'bgTertiary',
    'textPrimary',
    'textSecondary',
    'textMuted',
    'blurple',
    'green',
    'yellow',
    'red',
    'border',
    'borderHover',
    'buttonPrimary',
    'buttonSecondary',
    'buttonSuccess',
    'buttonDanger',
  ];

  const colors = t.colors as Record<string, unknown>;
  return requiredColors.every((color) => color in colors);
}
