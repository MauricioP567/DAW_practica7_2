import { memo } from 'react';
import { CATEGORIES, PRIORITIES, formatDate, isOverdue } from '../utils/taskHelpers';

// memo: evita re-render si las props no cambian
const TaskItem = memo(function TaskItem({ task, onToggle, onRemove }) {
  const priority = PRIORITIES[task.priority] ?? PRIORITIES.media;
  const category = CATEGORIES[task.category] ?? CATEGORIES.otros;
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <li className={`task-item ${task.completed ? 'is-completed' : ''} ${overdue ? 'is-overdue' : ''}`}>
      <button
        type="button"
        className="task-checkbox"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      >
        {task.completed ? '✓' : ''}
      </button>

      <div className="task-body">
        <div className="task-title-row">
          <h3 className="task-title">{task.title}</h3>
          <span className="priority-pill" style={{ background: priority.color }}>
            {priority.icon} {priority.label}
          </span>
        </div>

        {task.description && <p className="task-desc">{task.description}</p>}

        <div className="task-meta">
          <span className="task-category" style={{ color: category.color }}>
            {category.icon} {category.label}
          </span>
          {task.dueDate && (
            <span className={`task-date ${overdue ? 'overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
              {overdue && ' · Vencida'}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="btn-icon btn-danger"
        onClick={() => onRemove(task.id)}
        aria-label="Eliminar tarea"
      >
        🗑️
      </button>
    </li>
  );
});

export default TaskItem;