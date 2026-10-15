import { useReducer, useEffect, useCallback } from 'react';
import { generateId } from '../utils/taskHelpers';

export const initialState = {
  items: [],
  filter: 'all',
  sortBy: 'created',
  search: '',
};

export function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        items: [
          {
            id: generateId(),
            title: action.payload.title,
            description: action.payload.description ?? '',
            priority: action.payload.priority ?? 'media',
            category: action.payload.category ?? 'otros',
            dueDate: action.payload.dueDate ?? '',
            completed: false,
            createdAt: new Date().toISOString(),
          },
          ...state.items,
        ],
      };

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((t) => t.id !== action.payload),
      };

    case 'TOGGLE':
      return {
        ...state,
        items: state.items.map((t) =>
          t.id === action.payload
            ? {
                ...t,
                completed: !t.completed,
                completedAt: !t.completed ? new Date().toISOString() : null,
              }
            : t
        ),
      };

    case 'EDIT':
      return {
        ...state,
        items: state.items.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.changes } : t
        ),
      };

    case 'FILTER':
      return { ...state, filter: action.payload };

    case 'SORT':
      return { ...state, sortBy: action.payload };

    case 'SEARCH':
      return { ...state, search: action.payload };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        items: state.items.filter((t) => !t.completed),
      };

    case 'HYDRATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

const STORAGE_KEY = 'taskflow:state';

export function useTasksReducer() {
  const [state, dispatch] = useReducer(tasksReducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return init;
      const parsed = JSON.parse(raw);
      return {
        ...init,
        items: Array.isArray(parsed.items) ? parsed.items : [],
        filter: parsed.filter ?? init.filter,
        sortBy: parsed.sortBy ?? init.sortBy,
      };
    } catch (err) {
      console.warn('[useTasksReducer] Error hidratando:', err);
      return init;
    }
  });

  useEffect(() => {
    try {
      const toSave = {
        items: state.items,
        filter: state.filter,
        sortBy: state.sortBy,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.warn('[useTasksReducer] Error guardando:', err);
    }
  }, [state.items, state.filter, state.sortBy]);

  const addTask = useCallback((task) => dispatch({ type: 'ADD', payload: task }), []);
  const removeTask = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), []);
  const toggleTask = useCallback((id) => dispatch({ type: 'TOGGLE', payload: id }), []);
  const editTask = useCallback(
    (id, changes) => dispatch({ type: 'EDIT', payload: { id, changes } }),
    []
  );
  const setFilter = useCallback((f) => dispatch({ type: 'FILTER', payload: f }), []);
  const setSortBy = useCallback((s) => dispatch({ type: 'SORT', payload: s }), []);
  const setSearch = useCallback((s) => dispatch({ type: 'SEARCH', payload: s }), []);
  const clearCompleted = useCallback(() => dispatch({ type: 'CLEAR_COMPLETED' }), []);

  return {
    state,
    addTask,
    removeTask,
    toggleTask,
    editTask,
    setFilter,
    setSortBy,
    setSearch,
    clearCompleted,
  };
}

export default useTasksReducer;