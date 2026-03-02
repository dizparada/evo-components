import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const mainNav = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/inventory', label: 'Inventory', icon: InventoryIcon },
  { to: '/policies', label: 'Policies', icon: PoliciesIcon },
  { to: '/reports', label: 'Reports', icon: ReportsIcon },
  { to: '/scans', label: 'Scans & Jobs', icon: ScansIcon, badge: 1 },
];

const previewNav = [
  { to: '/secure', label: 'Secure by design', icon: SecureIcon },
  { to: '/observe', label: 'Observe', icon: ObserveIcon },
  { to: '/endpoint', label: 'Endpoint', icon: EndpointIcon },
];

export function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar__logo">
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
          <text x="0" y="15" fontSize="16" fontWeight="700" fill="white">evo</text>
        </svg>
        <div className="sidebar__logo-dot" />
        <button className="sidebar__collapse">
          <CollapseIcon />
        </button>
      </div>

      <div className="sidebar__section">
        {mainNav.map(({ to, label, icon: Icon, badge }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
            <span className="sidebar__icon"><Icon /></span>
            <span className="sidebar__label">{label}</span>
            {badge && <span className="sidebar__badge">{badge}</span>}
          </NavLink>
        ))}
      </div>

      <div className="sidebar__preview-label">Preview</div>
      <div className="sidebar__section">
        {previewNav.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
            <span className="sidebar__icon"><Icon /></span>
            <span className="sidebar__label">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 6.5L8 2l6 4.5V14a.5.5 0 01-.5.5H10v-4H6v4H2.5A.5.5 0 012 14V6.5z"/>
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="5.5" height="5.5" rx="0.5"/>
      <rect x="8.5" y="2" width="5.5" height="5.5" rx="0.5"/>
      <rect x="2" y="8.5" width="5.5" height="5.5" rx="0.5"/>
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.5"/>
    </svg>
  );
}

function PoliciesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5L2 4v5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z"/>
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l3-3 2 2 5-5"/>
      <rect x="1.5" y="1.5" width="13" height="13" rx="1"/>
    </svg>
  );
}

function ScansIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="5.5"/>
      <path d="M8 5v3.5l2 1.5"/>
    </svg>
  );
}

function SecureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5L2 4v5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z"/>
      <path d="M5.5 8l2 2 3-3"/>
    </svg>
  );
}

function ObserveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M1.5 8s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5z"/>
    </svg>
  );
}

function EndpointIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="12" height="8" rx="1"/>
      <path d="M5 10l2-2-2-2M8.5 10h3"/>
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3L5 7l4 4"/>
    </svg>
  );
}
