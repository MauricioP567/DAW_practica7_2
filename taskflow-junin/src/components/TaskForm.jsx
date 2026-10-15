import { useRef, useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../utils/taskHelpers';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('media');
  const [category, setCategory] = useState('desarrollo');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // useRef: referencia al input para auto-focus (no dispara re-render)
  const titleRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }

    onAdd({
      title: title.trim(),
      priority,
      category,
      dueDate: dueDate || '',
    });

    setTitle('');
    setPriority('media');
    setCategory('desarrollo');
    setDueDate('');
    setShowAdvanced(false);

    titleRef.current?.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-main">
        <input
          ref={titleRef}
          type="text"
          className="task-input"
          placeholder="¿Qué tarea necesitas completar?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Título de la tarea"
        />
        <button type="submit" className="btn-primary">
          ➕ Añadir
        </button>
      </div>

      <button
        type="button"
        className="task-form-toggle"
        onClick={() => setShowAdvanced((v) => !v)}
      >
        {showAdvanced ? '− Ocultar opciones' : '+ Más opciones'}
      </button>

      {showAdvanced && (
        <div className="task-form-advanced">
          <label className="field">
            <span>Prioridad</span>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {Object.entries(PRIORITIES).map(([key, p]) => (
                <option key={key} value={key}>
                  {p.icon} {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Categoría</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {Object.entries(CATEGORIES).map(([key, c]) => (
                <option key={key} value={key}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Fecha límite</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
      )}
    </form>
  );
}