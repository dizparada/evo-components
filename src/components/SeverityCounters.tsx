import './SeverityCounters.css';

// ── SeverityCounters — Figma GKHSL8s3gPJsdvwuFdBc9K 3326-62858 ───────────────

interface SeverityCountersProps {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export function SeverityCounters({ critical, high, medium, low }: SeverityCountersProps) {
  return (
    <span className="severity-counters">
      <SeverityCounter letter="C" count={critical} variant="critical" />
      <SeverityCounter letter="H" count={high}     variant="high" />
      <SeverityCounter letter="M" count={medium}   variant="medium" />
      <SeverityCounter letter="L" count={low}       variant="low" />
    </span>
  );
}

interface SeverityCounterProps {
  letter: string;
  count: number;
  variant: 'critical' | 'high' | 'medium' | 'low';
}

function SeverityCounter({ letter, count, variant }: SeverityCounterProps) {
  const zero = count === 0;
  return (
    <span className="severity-counter">
      <span className={`severity-counter__badge ${zero ? 'severity-counter__badge--zero' : `severity-counter__badge--${variant}`}`}>
        {letter}
      </span>
      <span className={`severity-counter__count${zero ? ' severity-counter__count--zero' : ''}`}>
        {count}
      </span>
    </span>
  );
}
