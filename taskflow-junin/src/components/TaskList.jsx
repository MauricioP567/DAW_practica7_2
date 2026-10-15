import { useCallback, useMemo } from 'react';
import TaskItem from './TaskItem';
import { filterTasks, sortTasks } from '../utils/taskHelpers';

export default function TaskList({ tasks, filter, sortBy, search, onToggle, onRemove }) {
  // useMemo: pipeline filtrado + ordenado
  const processedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter, search);
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, sortBy, search]);

  // useCallback: handlers estables para hijos memoizados
  const handleToggle = useCallback((id) => onToggle(id), [onToggle]);
  const handleRemove = useCallback((id) => onRemove(id), [onRemove]);

  const countLabel = useMemo(() => {
    const n = processedTasks.length;
    return n === 1 ? '1 tarea' : `${n} tareas`;
  }, [processedTasks.length]);

  if (processedTasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon">📭</div>
        <p>No hay tareas que coincidan</p>
        <small>Ajusta los filtros o añade una nueva tarea.</small>
      </div>
    );
  }

  return (
    <section className="task-list-wrapper">
      <div className="task-list-header">
        <span className="task-count">{countLabel}</span>
      </div>

      <ul className="task-list">
        {processedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        ))}
      </ul>
    </section>
  );
}