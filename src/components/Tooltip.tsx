import type { ReactNode } from 'react';
import './Tooltip.css';

// ── Tooltip — Figma GKHSL8s3gPJsdvwuFdBc9K 3298-34453 ────────────────────────

interface TooltipProps {
  content: string;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  return (
    <span className={`tooltip-wrap tooltip-wrap--${placement}`}>
      {children}
      <span className="tooltip" role="tooltip">{content}</span>
    </span>
  );
}
