import { useEffect, useRef, useState } from 'react';

/**
 * Hook personalizado: sincroniza un estado de React con localStorage.
 * @param {string} key            - clave en localStorage
 * @param {any}    defaultValue   - valor inicial si no existe en storage
 * @returns {[any, Function]}     - [value, setValue]
 */
export function useLocalStorage(key, defaultValue) {
  // 1. Inicializador perezoso: lee localStorage SOLO en el primer render
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`[useLocalStorage] Error leyendo "${key}":`, err);
      return defaultValue;
    }
  });

  // Ref para saber si el componente sigue montado
  const isMounted = useRef(true);

  // 2. Sincroniza cambios con localStorage
  useEffect(() => {
    try {
      if (isMounted.current) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.warn(`[useLocalStorage] Error escribiendo "${key}":`, err);
    }
  }, [key, value]);

  // 3. Cleanup al desmontar
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // 4. Sincronización multi-pestaña (bonus profesional)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {
          /* ignora valores inválidos */
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [value, setValue];
}