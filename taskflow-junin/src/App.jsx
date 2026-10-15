import { useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeProvider';
import { useTasksReducer } from './hooks/useTasksReducer';

import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import EmptyState from './components/EmptyState';

function Dashboard() {
  const {
    state: { items, filter, sortBy, search },
    addTask,
    removeTask,
    toggleTask,
    setFilter,
    setSortBy,
    setSearch,
    clearCompleted,
  } = useTasksReducer();

  // useRef: acceso imperativo al input desde el estado vacío
  const formRef = useRef(null);

  const handleFocusForm = () => {
    const input = formRef.current?.querySelector('input');
    input?.focus();
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const hasCompleted = items.some((t) => t.completed);

  return (
    <div className="app">
      <Header />

      <StatsPanel tasks={items} />

      <div ref={formRef}>
        <TaskForm onAdd={addTask} />
      </div>

      {items.length > 0 && (
        <>
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            search={search}
            onSearchChange={setSearch}
            onClearCompleted={clearCompleted}
            hasCompleted={hasCompleted}
          />

          <TaskList
            tasks={items}
            filter={filter}
            sortBy={sortBy}
            search={search}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        </>
      )}

      {items.length === 0 && <EmptyState onFocusInput={handleFocusForm} />}

      <footer className="app-footer">
        <p className="muted">
          TaskFlow Junín · Desarrollo de Aplicaciones Web (IS093A) · Semana 07
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}