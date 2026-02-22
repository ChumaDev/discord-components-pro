/**
 * Custom Theme Hook
 * Create and manage custom color themes
 */

import { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DEFAULT_DARK_THEME, PRESET_THEMES } from './presets';
import type { CustomTheme } from './types';
import { applyThemeToDOM, findTheme } from './utils';

export function useCustomTheme() {
  const [customThemes, setCustomThemes] = useLocalStorage<CustomTheme[]>(
    'discord-sdk-custom-themes',
    []
  );
  const [activeTheme, setActiveTheme] = useLocalStorage<string>('discord-sdk-active-theme', 'Dark');

  const allThemes = [...PRESET_THEMES, ...customThemes];
  const currentTheme = findTheme(allThemes, activeTheme) || DEFAULT_DARK_THEME;

  // Apply theme to CSS variables
  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, [currentTheme]);

  const createTheme = (theme: CustomTheme) => {
    setCustomThemes([...customThemes, theme]);
  };

  const updateTheme = (name: string, updates: Partial<CustomTheme>) => {
    setCustomThemes(customThemes.map((t) => (t.name === name ? { ...t, ...updates } : t)));
  };

  const deleteTheme = (name: string) => {
    setCustomThemes(customThemes.filter((t) => t.name !== name));
    if (activeTheme === name) {
      setActiveTheme('Dark');
    }
  };

  const getAllThemes = () => allThemes;

  return {
    currentTheme,
    activeTheme,
    setActiveTheme,
    customThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    getAllThemes,
    presetThemes: PRESET_THEMES,
  };
}
