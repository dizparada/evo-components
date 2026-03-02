import './Badge.css';

type BadgeVariant = 'critical' | 'high' | 'medium' | 'low' | 'success' | 'running' | 'active' | 'neutral' | 'type';

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  size?: 'sm' | 'md';
}

export function Badge({ variant, label, size = 'md' }: BadgeProps) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {label}
    </span>
  );
}

interface IssueBadgesProps {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export function IssueBadges({ critical, high, medium, low }: IssueBadgesProps) {
  return (
    <span className="issue-badges">
      <span className={`issue-badge ${critical > 0 ? 'issue-badge--critical' : 'issue-badge--zero'}`}>
        C {critical}
      </span>
      <span className={`issue-badge ${high > 0 ? 'issue-badge--high' : 'issue-badge--zero'}`}>
        H {high}
      </span>
      <span className={`issue-badge ${medium > 0 ? 'issue-badge--medium' : 'issue-badge--zero'}`}>
        M {medium}
      </span>
      <span className={`issue-badge ${low > 0 ? 'issue-badge--low' : 'issue-badge--zero'}`}>
        L {low}
      </span>
    </span>
  );
}

export function severityVariant(s: string): BadgeVariant {
  const m: Record<string, BadgeVariant> = { Critical: 'critical', High: 'high', Medium: 'medium', Low: 'low' };
  return m[s] ?? 'neutral';
}
