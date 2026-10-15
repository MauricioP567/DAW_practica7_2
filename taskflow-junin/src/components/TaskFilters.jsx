import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const FILTERS = [
  { id: 'all',       label: 'Todas',       icon: '📋' },
  { id: 'pending',   label: 'Pendientes',  icon: '⏳' },
  { id: 'completed', label: 'Completadas', icon: '✅' },
];

const SORTS = [
  { id: 'created',  label: 'Más recientes', icon: '🕐' },
  { id: 'priority', label: 'Prioridad',     icon: '🔥' },
  { id: 'dueDate',  label: 'Fecha límite',  icon: '📅' },
  { id: 'title',    label: 'Alfabético',    icon: '🔤' },
];

export default function TaskFilters({
  filter, onFilterChange,
  sortBy, onSortChange,
  search, onSearchChange,
  onClearCompleted,
  hasCompleted,
}) {
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <section className="task-filters">
      <div className="filters-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar tarea por título, categoría…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Buscar tareas"
        />
        {searchInput && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setSearchInput('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filters-row">
        <div className="filter-group" role="group" aria-label="Filtro por estado">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? 'active' : ''}
              onClick={() => onFilterChange(f.id)}
            >
              <span>{f.icon}</span> {f.label}
            </button>
          ))}
        </div>

        <label className="sort-field">
          <span>Ordenar por</span>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.icon} {s.label}
              </option>
            ))}
          </select>
        </label>

        {hasCompleted && (
          <button type="button" className="btn-ghost" onClick={onClearCompleted}>
            🗑️ Limpiar completadas
          </button>
        )}
      </div>
    </section>
  );
}