import type { ReactNode } from 'react';
import './IconButton.css';

// ── IconButton — Figma GKHSL8s3gPJsdvwuFdBc9K 1614-1557 ──────────────────────

interface IconButtonProps {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'sm' | 'xs';
  disabled?: boolean;
  label?: string; // aria-label
  onClick?: () => void;
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled,
  label,
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={`icon-btn icon-btn--${variant} icon-btn--${size}`}
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
}
