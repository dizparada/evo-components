import type { ReactNode } from 'react';
import './DropdownMenu.css';

// ── DropdownMenu — Figma GKHSL8s3gPJsdvwuFdBc9K 3208-25789 ──────────────────

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface DropdownMenuProps {
  items: MenuItem[];
  className?: string;
}

export function DropdownMenu({ items, className }: DropdownMenuProps) {
  return (
    <div className={`dropdown-menu${className ? ` ${className}` : ''}`}>
      {items.map((item, i) => (
        <button
          key={i}
          className={`menu-item${item.active ? ' menu-item--active' : ''}${item.disabled ? ' menu-item--disabled' : ''}`}
          disabled={item.disabled}
          onClick={item.onClick}
          type="button"
        >
          {item.icon && <span className="menu-item__icon">{item.icon}</span>}
          <span className="menu-item__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
