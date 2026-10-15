// ============================================================
// Utilidades del dominio de tareas
// ============================================================

export const PRIORITIES = {
  alta:  { label: 'Alta',  color: '#ef4444', weight: 3, icon: '🔴' },
  media: { label: 'Media', color: '#f59e0b', weight: 2, icon: '🟡' },
  baja:  { label: 'Baja',  color: '#22c55e', weight: 1, icon: '🟢' },
};

export const CATEGORIES = {
  desarrollo:    { label: 'Desarrollo',    icon: '💻', color: '#6366f1' },
  diseno:        { label: 'Diseño',        icon: '🎨', color: '#ec4899' },
  investigacion: { label: 'Investigación', icon: '🔬', color: '#8b5cf6' },
  reunion:       { label: 'Reunión',       icon: '👥', color: '#0891b2' },
  documentacion: { label: 'Documentación', icon: '📝', color: '#10b981' },
  otros:         { label: 'Otros',         icon: '📌', color: '#64748b' },
};

let counter = 0;
export const generateId = () =>
  `t_${Date.now()}_${counter++}_${Math.random().toString(36).slice(2, 7)}`;

export function filterTasks(items, filter, searchQuery = '') {
  const q = searchQuery.trim().toLowerCase();

  return items.filter((task) => {
    if (filter === 'pending' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;

    if (q) {
      const match =
        task.title.toLowerCase().includes(q) ||
        (task.description ?? '').toLowerCase().includes(q) ||
        (task.category ?? '').toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });
}

export function sortTasks(items, sortBy) {
  const copy = [...items];

  switch (sortBy) {
    case 'priority':
      return copy.sort((a, b) => {
        const wA = PRIORITIES[a.priority]?.weight ?? 0;
        const wB = PRIORITIES[b.priority]?.weight ?? 0;
        return wB - wA;
      });

    case 'dueDate':
      return copy.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'es'));

    case 'created':
    default:
      return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

export function getStats(items) {
  const total = items.length;
  const completed = items.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const byPriority = {
    alta:  items.filter((t) => t.priority === 'alta' && !t.completed).length,
    media: items.filter((t) => t.priority === 'media' && !t.completed).length,
    baja:  items.filter((t) => t.priority === 'baja' && !t.completed).length,
  };

  const now = new Date();
  const overdue = items.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < now
  ).length;

  return { total, completed, pending, percent, byPriority, overdue };
}

export function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function isOverdue(iso, completed) {
  if (!iso || completed) return false;
  return new Date(iso) < new Date();
}