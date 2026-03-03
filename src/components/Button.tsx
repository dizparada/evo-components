import type { ReactNode } from 'react';
import './Button.css';

// ── Button — Figma GKHSL8s3gPJsdvwuFdBc9K 1614-1550 ─────────────────────────

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'sm' | 'xs';
  disabled?: boolean;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({
  label,
  variant = 'secondary',
  size = 'md',
  disabled,
  iconBefore,
  iconAfter,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {iconBefore && <span className="btn__icon">{iconBefore}</span>}
      {label}
      {iconAfter && <span className="btn__icon">{iconAfter}</span>}
    </button>
  );
}
