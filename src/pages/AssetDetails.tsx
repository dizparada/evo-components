import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge, IssueBadges, severityVariant } from '../components/Badge';
import { assetDetails, assets } from '../data/mockData';
import './AssetDetails.css';

type Tab = 'occurrences' | 'issues' | 'related' | 'risk' | 'capabilities';

export function AssetDetails() {
  const { repoId, assetId } = useParams<{ repoId: string; assetId: string }>();
  const repoAssets = assets[repoId ?? ''] ?? [];
  const assetMeta = repoAssets.find(a => a.id === assetId);
  const detail = assetDetails[assetId ?? ''];
  const [activeTab, setActiveTab] = useState<Tab>('risk');

  const displayDetail = detail ?? {
    name: assetId ?? 'Asset',
    type: assetMeta?.type ?? 'Model',
    repository: repoId ?? '',
    firstDiscovered: 'Jan 13, 2026',
    occurrences: 3,
    issues: assetMeta?.issues ?? { critical: 0, high: 0, medium: 0, low: 0 },
    capabilities: {
      architecture: 'Transformer', parameters: 'SaaS (Hosted API)',
      tokenLimit: 128000, inputOutput: 'Multimodal',
      scores: [
        { label: 'Logic & reasoning tasks', value: 60 },
        { label: 'Coding & software engineering tasks', value: 54 },
        { label: 'Transition & multilingual tasks', value: 88 },
        { label: 'General purpose tasks', value: 96 },
      ],
    },
    riskProfile: {
      categories: [
        { label: 'CBRN', value: 85 }, { label: 'Privacy & PII', value: 72 },
        { label: 'Factual accuracy', value: 60 }, { label: 'Malicious code', value: 45 },
        { label: 'Bias & fairness', value: 55 }, { label: 'Jailbreak resistance', value: 40 },
        { label: 'Toxicity', value: 50 }, { label: 'Human autonomy', value: 65 },
      ],
    },
    infrastructure: { policy: '—', type: 'SaaS (Hosted API)', region: 'US-East (Virginia)', dataResidency: 'United states' },
    audit: { lastAssessed: 'Jan 15, 2025', assessedBy: 'Evo risk agent', notes: '—' },
    occurrenceList: [
      { file: '.../scripts/acme-tools/mod_fin.py', line: 143, column: 25 },
      { file: '.../scripts/acme-tools/mod_res.py', line: 80, column: 1 },
    ],
  };

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'occurrences', label: 'Occurrences', count: displayDetail.occurrences },
    { key: 'issues', label: 'Issues', count: Object.values(displayDetail.issues).reduce((a, b) => a + b, 0) },
    { key: 'related', label: 'Related assets', count: 3 },
    { key: 'risk', label: 'Risk profile' },
    { key: 'capabilities', label: 'Capabilities' },
  ];

  return (
    <div className="asset-details">
      <div className="asset-details__header">
        <h1 className="asset-details__name">
          {displayDetail.name}
          <span className="asset-details__type-badge">{displayDetail.type}</span>
        </h1>
        <div className="asset-details__meta">
          <div className="asset-details__meta-item">
            <span className="asset-details__meta-label">Repository</span>
            <Link to={`/inventory/${repoId}`} className="asset-details__meta-link">
              {displayDetail.repository}
            </Link>
          </div>
          <div className="asset-details__meta-item">
            <span className="asset-details__meta-label">First discovered</span>
            <span>{displayDetail.firstDiscovered}</span>
          </div>
          <div className="asset-details__meta-item">
            <span className="asset-details__meta-label">Occurrences</span>
            <span>{displayDetail.occurrences}</span>
          </div>
          <div className="asset-details__meta-item">
            <span className="asset-details__meta-label">Issues</span>
            <IssueBadges {...displayDetail.issues} />
          </div>
        </div>

        <button className="asset-details__expand">
          <ChevronIcon /> Model identity & metadata
        </button>
      </div>

      <div className="asset-details__tabs">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            className={`asset-details__tab ${activeTab === key ? 'asset-details__tab--active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
            {count !== undefined && (
              <span className="asset-details__tab-count">{count}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'risk' && <RiskProfile data={displayDetail.riskProfile} infrastructure={displayDetail.infrastructure} audit={displayDetail.audit} />}
      {activeTab === 'capabilities' && <Capabilities data={displayDetail.capabilities} />}
      {activeTab === 'occurrences' && <OccurrencesList occurrences={displayDetail.occurrenceList} />}
      {activeTab === 'issues' && <IssuesList issues={displayDetail.issues} />}
      {activeTab === 'related' && <RelatedAssets repoId={repoId ?? ''} currentId={assetId ?? ''} />}
    </div>
  );
}

function RiskProfile({ data, infrastructure, audit }: {
  data: { categories: { label: string; value: number }[] };
  infrastructure: { policy: string; type: string; region: string; dataResidency: string };
  audit: { lastAssessed: string; assessedBy: string; notes: string };
}) {
  return (
    <div className="risk-profile">
      <section className="risk-profile__section">
        <h2 className="risk-profile__section-title">Risk distribution</h2>
        <div className="risk-profile__chart-area">
          <div className="risk-profile__radar">
            <RadarChart categories={data.categories} />
          </div>
          <div className="risk-profile__chart-hint">
            <p>Click on a risk category on the left to read more about it and our methodology</p>
          </div>
        </div>
      </section>

      <section className="risk-profile__section">
        <h2 className="risk-profile__section-title">Infrastructure & policy</h2>
        <table className="detail-table">
          <tbody>
            <tr><td className="detail-table__label">Evo policy</td><td>{infrastructure.policy}</td></tr>
            <tr><td className="detail-table__label">Infrastructure type</td><td>{infrastructure.type}</td></tr>
            <tr><td className="detail-table__label">Provider region</td><td>{infrastructure.region}</td></tr>
            <tr><td className="detail-table__label">Data residency</td><td>{infrastructure.dataResidency}</td></tr>
          </tbody>
        </table>
      </section>

      <section className="risk-profile__section">
        <h2 className="risk-profile__section-title">Audit trail & metadata</h2>
        <table className="detail-table">
          <tbody>
            <tr><td className="detail-table__label">Last assessed date</td><td>{audit.lastAssessed}</td></tr>
            <tr><td className="detail-table__label">Assessed by</td><td>{audit.assessedBy}</td></tr>
            <tr><td className="detail-table__label">Notes commentary</td><td>{audit.notes}</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

function RadarChart({ categories }: { categories: { label: string; value: number }[] }) {
  const cx = 120, cy = 120, r = 90;
  const n = categories.length;
  const rings = [20, 40, 60, 80, 100];

  function polarToCart(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  const axes = categories.map((_, i) => ({
    angle: (360 / n) * i,
    end: polarToCart((360 / n) * i, r),
  }));

  const dataPoints = categories.map((c, i) => polarToCart((360 / n) * i, (c.value / 100) * r));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // ring colors from inner to outer: dark orange to red
  const ringColors = ['#b45309', '#c2410c', '#dc2626', '#ef4444', '#f87171'];

  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {rings.map((ringR, ri) => {
        const pts = axes.map((_, i) => polarToCart((360 / n) * i, (ringR / 100) * r));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={ri} d={path} fill={ringColors[ri]} fillOpacity={0.35} stroke="none" />;
      })}

      {axes.map((ax, i) => (
        <line key={i} x1={cx} y1={cy} x2={ax.end.x} y2={ax.end.y} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      ))}

      <path d={dataPath} fill="rgba(220,38,38,0.3)" stroke="#ef4444" strokeWidth="1.5" />

      {categories.map((c, i) => {
        const labelPos = polarToCart((360 / n) * i, r + 22);
        return (
          <text key={i} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle"
            fill="var(--color-fg-secondary)" fontSize="9" fontFamily="Inter, sans-serif">
            {c.label}
          </text>
        );
      })}

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ef4444" />
      ))}
    </svg>
  );
}

function Capabilities({ data }: { data: { architecture: string; parameters: string; tokenLimit: number; inputOutput: string; scores: { label: string; value: number }[] } }) {
  return (
    <div className="capabilities">
      <section className="risk-profile__section">
        <h2 className="risk-profile__section-title">Technical specifications</h2>
        <table className="detail-table">
          <tbody>
            <tr><td className="detail-table__label">Architecture</td><td>{data.architecture}</td></tr>
            <tr><td className="detail-table__label">Total parameter count across all experts</td><td>{data.parameters}</td></tr>
            <tr><td className="detail-table__label">Maximum input token limit</td><td>{data.tokenLimit.toLocaleString()}</td></tr>
            <tr><td className="detail-table__label">Input / output types supported</td><td>{data.inputOutput}</td></tr>
          </tbody>
        </table>
      </section>

      <section className="risk-profile__section">
        <h2 className="risk-profile__section-title">Capability scores</h2>
        <table className="detail-table">
          <tbody>
            {data.scores.map(s => (
              <tr key={s.label}>
                <td className="detail-table__label">{s.label}</td>
                <td>{s.value} / 100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function OccurrencesList({ occurrences }: { occurrences: { file: string; line: number; column: number }[] }) {
  return (
    <div>
      <div className="occurrences-header">
        <span className="occurrences-count">Occurrences {occurrences.length}</span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table__th">Location</th>
            <th className="table__th">Line</th>
            <th className="table__th">Column</th>
          </tr>
        </thead>
        <tbody>
          {occurrences.map((o, i) => (
            <tr key={i} className="table__row">
              <td className="table__td">{o.file}</td>
              <td className="table__td">{o.line}</td>
              <td className="table__td">{o.column}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IssuesList({ issues }: { issues: { critical: number; high: number; medium: number; low: number } }) {
  const entries = Object.entries(issues).filter(([, v]) => v > 0);
  return (
    <div style={{ color: 'var(--color-fg-secondary)', fontSize: 13 }}>
      {entries.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        entries.map(([k, v]) => (
          <div key={k} style={{ padding: '8px 0', display: 'flex', gap: 8 }}>
            <Badge variant={severityVariant(k.charAt(0).toUpperCase() + k.slice(1))} label={k.charAt(0).toUpperCase() + k.slice(1)} />
            <span>{v} issue{v !== 1 ? 's' : ''}</span>
          </div>
        ))
      )}
    </div>
  );
}

function RelatedAssets({ repoId, currentId }: { repoId: string; currentId: string }) {
  const repoAssets = assets[repoId] ?? [];
  const related = repoAssets.filter(a => a.id !== currentId).slice(0, 3);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table__th">Asset name</th>
            <th className="table__th">Type</th>
            <th className="table__th">Issues</th>
          </tr>
        </thead>
        <tbody>
          {related.map(a => (
            <tr key={a.id} className="table__row">
              <td className="table__td table__td--name">
                <Link to={`/inventory/${repoId}/${a.id}`} className="table__link">{a.name}</Link>
              </td>
              <td className="table__td"><Badge variant="type" label={a.type} /></td>
              <td className="table__td"><IssueBadges {...a.issues} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChevronIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{display:'inline',marginRight:4}}><path d="M3 4.5l3 3 3-3"/></svg>;
}
