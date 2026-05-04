import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title, subtitle }) {
  const { user } = useAuth();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <header className="cv-topbar">
      <div>
        <div className="cv-topbar__welcome">{title || `Bienvenue, ${user?.name?.split(' ')[0]} !`}</div>
        {subtitle && <div className="cv-topbar__sub">{subtitle}</div>}
      </div>
      <div className="cv-topbar__right">
        <div className="cv-topbar__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          FR
        </div>
        <div className="cv-topbar__avatar">{initials}</div>
      </div>
    </header>
  );
}
