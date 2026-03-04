import type { ReactNode } from 'react';
import './Table.css';

// ── Container ────────────────────────────────────────────────────────────────

interface TableWrapProps {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function TableWrap({ title, actions, children, className }: TableWrapProps) {
  return (
    <div className={`table-wrap${className ? ` ${className}` : ''}`}>
      {title && (
        <div className="table-wrap__title">
          <span className="table-wrap__title-text">{title}</span>
          {actions && <span>{actions}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

// ── Toolbar — Figma 3288-74396 ───────────────────────────────────────────────

interface TableToolbarProps {
  title?: string;
  count?: number;
  search?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  className?: string;
}

export function TableToolbar({ title, count, search, onSearch, actions, className }: TableToolbarProps) {
  return (
    <div className={`table-toolbar${className ? ` ${className}` : ''}`}>
      {(title != null || count != null) && (
        <div className="table-toolbar__start">
          {title && <span className="table-toolbar__title">{title}</span>}
          {count != null && <span className="table-toolbar__badge">{count}</span>}
        </div>
      )}
      <div className="table-toolbar__end">
        {onSearch != null && (
          <div className="table-toolbar__search-wrap">
            <span className="table-toolbar__search-icon"><SearchIcon /></span>
            <input
              className="table-toolbar__search"
              placeholder="Search..."
              value={search ?? ''}
              onChange={e => onSearch(e.target.value)}
            />
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}

// ── Pagination — Figma 3288-74406 ────────────────────────────────────────────

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage?: number;
  onPerPageChange?: (perPage: number) => void;
  perPageOptions?: number[];
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  perPageOptions = [10, 25, 50],
}: TablePaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="table-pagination">
      <button
        className="table-pagination__btn table-pagination__btn--icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map(p => (
        <button
          key={p}
          className={`table-pagination__btn${p === currentPage ? ' table-pagination__btn--active' : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className="table-pagination__btn table-pagination__btn--icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>

      {perPage != null && onPerPageChange && (
        <div className="table-pagination__perpage">
          <span className="table-pagination__perpage-label">Results per page</span>
          <select
            className="table-pagination__perpage-select"
            value={perPage}
            onChange={e => onPerPageChange(Number(e.target.value))}
          >
            {perPageOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}
    </div>
  );
}

// ── Cell helpers — Figma 3288-74236 ──────────────────────────────────────────

/** Two-line cell: primary text with dimmer subtext below */
export function CellSubText({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return (
    <div>
      <div className="table__cell-primary">{primary}</div>
      <div className="table__cell-secondary">{secondary}</div>
    </div>
  );
}

/** Trend pill — up (green) or down (red) */
export function CellTrend({ value, direction }: { value: string; direction: 'up' | 'down' }) {
  return (
    <span className={`table__trend table__trend--${direction}`}>
      <span className="table__trend-icon">
        {direction === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
      </span>
      {value}
    </span>
  );
}

/** Horizontal progress bar with percentage label */
export function CellProgress({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="table__progress">
      <div className="table__progress-bar">
        <div className="table__progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="table__progress-pct">{pct}%</span>
    </div>
  );
}

// ── Issue tracker (severity mini-cards C / H / M / L) ────────────────────────

export interface IssueCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export function IssueTracker({ counts }: { counts: IssueCounts }) {
  const cells: { key: keyof IssueCounts; label: string }[] = [
    { key: 'critical', label: 'C' },
    { key: 'high',     label: 'H' },
    { key: 'medium',   label: 'M' },
    { key: 'low',      label: 'L' },
  ];

  return (
    <div className="issue-tracker">
      {cells.map(({ key, label }) => {
        const count = counts[key];
        const severity = count === 0 ? 'zero' : key;
        return (
          <span key={key} className={`issue-tracker__card issue-tracker__card--${severity}`}>
            <span className="issue-tracker__count">{count}</span>
            <span className="issue-tracker__label">{label}</span>
          </span>
        );
      })}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>;
}

function ChevronLeftIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3L5 7l4 4"/></svg>;
}

function ChevronRightIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l4 4-4 4"/></svg>;
}

function TrendUpIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7l3-4 3 4"/></svg>;
}

function TrendDownIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3l3 4 3-4"/></svg>;
}
