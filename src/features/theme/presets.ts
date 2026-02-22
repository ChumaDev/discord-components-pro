/**
 * Theme Presets
 */

import type { CustomTheme } from './types';

export const DEFAULT_DARK_THEME: CustomTheme = {
  name: 'Dark',
  colors: {
    bgPrimary: '#313338',
    bgSecondary: '#2b2d31',
    bgTertiary: '#1e1f22',
    textPrimary: '#f2f3f5',
    textSecondary: '#b5bac1',
    textMuted: '#80848e',
    blurple: '#5865f2',
    green: '#23a55a',
    yellow: '#f0b232',
    red: '#f23f43',
    border: '#3f4147',
    borderHover: '#4e5058',
    buttonPrimary: '#5865f2',
    buttonSecondary: '#4e5058',
    buttonSuccess: '#23a55a',
    buttonDanger: '#da373c',
  },
};

export const DEFAULT_LIGHT_THEME: CustomTheme = {
  name: 'Light',
  colors: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f2f3f5',
    bgTertiary: '#e3e5e8',
    textPrimary: '#060607',
    textSecondary: '#4e5058',
    textMuted: '#80848e',
    blurple: '#5865f2',
    green: '#23a55a',
    yellow: '#f0b232',
    red: '#f23f43',
    border: '#d4d7dc',
    borderHover: '#b9bbbe',
    buttonPrimary: '#5865f2',
    buttonSecondary: '#4e5058',
    buttonSuccess: '#23a55a',
    buttonDanger: '#da373c',
  },
};

export const MIDNIGHT_THEME: CustomTheme = {
  name: 'Midnight',
  colors: {
    bgPrimary: '#0a0b0d',
    bgSecondary: '#16171a',
    bgTertiary: '#1e1f22',
    textPrimary: '#ffffff',
    textSecondary: '#b5bac1',
    textMuted: '#80848e',
    blurple: '#7289da',
    green: '#43b581',
    yellow: '#faa61a',
    red: '#f04747',
    border: '#2f3136',
    borderHover: '#40444b',
    buttonPrimary: '#7289da',
    buttonSecondary: '#4f545c',
    buttonSuccess: '#43b581',
    buttonDanger: '#f04747',
  },
};

export const AMOLED_THEME: CustomTheme = {
  name: 'Amoled',
  colors: {
    bgPrimary: '#000000',
    bgSecondary: '#0d0d0d',
    bgTertiary: '#1a1a1a',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    textMuted: '#999999',
    blurple: '#5865f2',
    green: '#57f287',
    yellow: '#fee75c',
    red: '#ed4245',
    border: '#333333',
    borderHover: '#4d4d4d',
    buttonPrimary: '#5865f2',
    buttonSecondary: '#4d4d4d',
    buttonSuccess: '#57f287',
    buttonDanger: '#ed4245',
  },
};

export const PRESET_THEMES: CustomTheme[] = [
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  MIDNIGHT_THEME,
  AMOLED_THEME,
];
