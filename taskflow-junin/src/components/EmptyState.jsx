export default function EmptyState({ onFocusInput }) {
  return (
    <div className="global-empty">
      <div className="global-empty-icon">📝</div>
      <h2>¡Empieza a organizar tus tareas!</h2>
      <p>Añade tu primera tarea arriba para comenzar a gestionar tu proyecto.</p>
      <button type="button" className="btn-primary" onClick={onFocusInput}>
        ➕ Añadir primera tarea
      </button>
    </div>
  );
}