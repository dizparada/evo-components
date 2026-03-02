import type { ReactNode } from 'react';
import './Tooltip.css';

// ── Tooltip — Figma ldezalbJY9Ml9bWU0eMqPz 1365-13336 ────────────────────────

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
