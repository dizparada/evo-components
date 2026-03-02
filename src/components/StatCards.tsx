import type { ReactNode } from 'react';
import './StatCards.css';

export interface StatCardItem {
  icon?: ReactNode;
  label: string;
  count: number;
  delta?: number;
  variant?: 'critical' | 'high' | 'medium' | 'low';
}

export function StatCards({ items }: { items: StatCardItem[] }) {
  return (
    <div className="stat-cards">
      {items.map(item => (
        <div key={item.label} className="stat-card">
          <div className="stat-card__header">
            {item.icon && <span className="stat-card__icon">{item.icon}</span>}
            <span className="stat-card__label">{item.label}</span>
          </div>
          <div className="stat-card__body">
            <span className={`stat-card__count${item.variant ? ` stat-card__count--${item.variant}` : ''}`}>
              {item.count}
            </span>
            {item.delta !== undefined && item.delta > 0 && (
              <span className="stat-card__delta">+{item.delta}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
