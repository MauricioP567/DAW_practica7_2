import { useEffect, useState } from 'react';

/**
 * Hook personalizado: retrasa la propagación de un valor.
 * Útil para inputs de búsqueda: evita filtrar en cada tecla.
 */
export function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}