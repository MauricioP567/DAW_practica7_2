import { useEffect, useMemo, useCallback } from 'react';
import { ThemeContext } from './theme-context';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Este archivo SOLO exporta el componente ThemeProvider
export function ThemeProvider({ children }) {
  // Hook personalizado: persiste automáticamente en localStorage
  const [theme, setTheme] = useLocalStorage('taskflow:theme', 'dark');

  // Aplica el atributo data-theme al <html> para CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {};
  }, [theme]);

  // useCallback: identidad estable del toggle
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  // useMemo: value del contexto memoizado → evita re-renders innecesarios
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}