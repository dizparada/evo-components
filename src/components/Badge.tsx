import type { ReactNode } from 'react';
import './Badge.css';

// ── Badge — Figma GKHSL8s3gPJsdvwuFdBc9K 2069-81627 ──────────────────────────

type BadgeVariant =
  | 'critical' | 'high' | 'medium' | 'low' | 'unknown'
  | 'neutral' | 'default' | 'gray' | 'disabled'
  | 'success' | 'running' | 'active' | 'type';

const SEVERITY_VARIANTS = new Set<BadgeVariant>([
  'critical', 'high', 'medium', 'low', 'unknown', 'success',
]);

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  size?: 'sm' | 'md';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Badge({ variant, label, size = 'md', leadingIcon, trailingIcon }: BadgeProps) {
  const cls = `badge badge--${variant}${size === 'sm' ? ' badge--sm' : ''}`;

  // Severity badges: simple flat pill, padding handled by CSS
  if (SEVERITY_VARIANTS.has(variant)) {
    return <span className={cls}>{label}</span>;
  }

  // Non-severity badges: always use content wrapper so text is padded even without icon slots
  return (
    <span className={cls}>
      {leadingIcon && <span className="badge__icon badge__icon--leading">{leadingIcon}</span>}
      <span className="badge__content">{label}</span>
      {trailingIcon && <span className="badge__icon badge__icon--trailing">{trailingIcon}</span>}
    </span>
  );
}

// ── AssetTypeCounter — Figma GKHSL8s3gPJsdvwuFdBc9K 3267-55356 ───────────────

interface AssetTypeCounts {
  mcp: number;
  model: number;
  dataset: number;
  library: number;
  other: number;
}

export function AssetTypeCounter({ counts }: { counts: AssetTypeCounts }) {
  const types: { key: keyof AssetTypeCounts; icon: ReactNode }[] = [
    { key: 'mcp',     icon: <McpIcon /> },
    { key: 'model',   icon: <ModelIcon /> },
    { key: 'dataset', icon: <DatasetIcon /> },
    { key: 'library', icon: <LibraryIcon /> },
    { key: 'other',   icon: <OtherIcon /> },
  ];

  return (
    <span className="asset-type-counter">
      {types.map(({ key, icon }) => (
        <span key={key} className={`asset-type-pill${counts[key] === 0 ? ' asset-type-pill--zero' : ''}`}>
          <span className="asset-type-pill__count">{counts[key]}</span>
          <span className="asset-type-pill__icon">{icon}</span>
        </span>
      ))}
    </span>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function severityVariant(s: string): BadgeVariant {
  const m: Record<string, BadgeVariant> = {
    Critical: 'critical', High: 'high', Medium: 'medium', Low: 'low', Unknown: 'unknown',
  };
  return m[s] ?? 'neutral';
}

// ── Icons for AssetTypeCounter ────────────────────────────────────────────────

function McpIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5"/><rect x="5" y="5" width="6" height="6" rx="0.5"/></svg>;
}
function ModelIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 4.5L8 2l5 2.5v5L8 12l-5-2.5V4.5z"/><path d="M3 4.5l5 2.5M8 12V7M13 4.5L8 7"/></svg>;
}
function DatasetIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3.5 2.5h7l2 2v9h-9v-11z"/><path d="M10.5 2.5v2h2"/><path d="M5.5 7h5M5.5 9.5h5M5.5 12h3"/></svg>;
}
function LibraryIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2.5" y="9.5" width="11" height="3" rx="0.5"/><rect x="2.5" y="6" width="11" height="3" rx="0.5"/><rect x="2.5" y="2.5" width="11" height="3" rx="0.5"/></svg>;
}
function OtherIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2v12M2 8h12"/><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>;
}
