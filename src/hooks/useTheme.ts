/**
 * Theme Hook
 * Manages theme state and applies it to the document
 */

import { useEffect } from 'react';
import { useComponentStore } from '../store/componentStore';

export function useTheme() {
  const theme = useComponentStore((state) => state.theme);
  const setTheme = useComponentStore((state) => state.setTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
