import { useMemo } from 'react';
import { getStats } from '../utils/taskHelpers';

export default function StatsPanel({ tasks }) {
  const stats = useMemo(() => getStats(tasks), [tasks]);

  return (
    <section className="stats-panel">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
      </div>

      <div className="stat-card stat-pending">
        <div className="stat-icon">⏳</div>
        <div className="stat-info">
          <span className="stat-label">Pendientes</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
      </div>

      <div className="stat-card stat-completed">
        <div className="stat-icon">✅</div>
        <div className="stat-info">
          <span className="stat-label">Completadas</span>
          <span className="stat-value">{stats.completed}</span>
        </div>
      </div>

      <div className="stat-card stat-progress">
        <div className="stat-icon">🎯</div>
        <div className="stat-info">
          <span className="stat-label">Progreso</span>
          <span className="stat-value">{stats.percent}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${stats.percent}%` }} />
        </div>
      </div>

      {stats.overdue > 0 && (
        <div className="stat-card stat-overdue">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <span className="stat-label">Vencidas</span>
            <span className="stat-value">{stats.overdue}</span>
          </div>
        </div>
      )}
    </section>
  );
}