import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';

// Hook personalizado para consumir el contexto.
// Este archivo SOLO exporta un hook (función sin JSX).
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
}