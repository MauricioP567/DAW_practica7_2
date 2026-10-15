import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-logo">📋</div>
        <div>
          <h1>TaskFlow <span className="brand-accent">Junín</span></h1>
          <p className="brand-sub">Gestor de tareas y proyectos de ingeniería</p>
        </div>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
        <span className="theme-label">{theme === 'dark' ? 'Modo día' : 'Modo noche'}</span>
      </button>
    </header>
  );
}