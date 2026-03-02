import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { StatCards } from '../components/StatCards';
import '../components/Table.css';
import './Home.css';

const assetSummary = [
  { type: 'mcp',     label: 'MCP Servers', count: 5,  delta: 3 },
  { type: 'model',   label: 'Models',      count: 13, delta: 7 },
  { type: 'dataset', label: 'Datasets',    count: 22, delta: 5 },
  { type: 'library', label: 'Libraries',   count: 16, delta: 3 },
  { type: 'other',   label: 'Other',       count: 20, delta: 8 },
];

const issueSummary = [
  { label: 'Critical Issues', count: 2,  delta: 1, variant: 'critical' },
  { label: 'High Issues',     count: 10, delta: 2, variant: 'high' },
  { label: 'Medium Issues',   count: 10, delta: 2, variant: 'medium' },
  { label: 'Low Issues',      count: 11, delta: 1, variant: 'low' },
];

const topRepos = [
  { name: 'fintech-advisory-bot', assets: 23, lastWeek: 9 },
  { name: 'lore-ipsum-name',      assets: 20, lastWeek: 11 },
  { name: 'name-dolor-sit-amet',  assets: 18, lastWeek: 5 },
  { name: 'acme-repo-name',       assets: 17, lastWeek: 3 },
  { name: 'long-repo-name',       assets: 16, lastWeek: 5 },
];

const newAssets = [
  { name: 'gpt-4o-turbo',      type: 'Model' },
  { name: 'Library-name-acme', type: 'Library' },
  { name: 'mcp-server-acme',   type: 'MCP Server' },
  { name: 'Lorem ipsum dolor', type: 'Model' },
  { name: 'new-ai-asset',      type: 'Model' },
];

export function Home() {
  return (
    <div className="home">

      {/* Asset summary row */}
      <StatCards items={assetSummary.map(s => ({
        icon: <AssetIcon type={s.type} />,
        label: s.label,
        count: s.count,
        delta: s.delta,
      }))} />

      <div className="home__divider" />

      {/* Issues KPI row */}
      <div className="home__issues">
        {issueSummary.map(i => (
          <div key={i.label} className="home__issue-item">
            <span className={`home__issue-count home__issue-count--${i.variant}`}>{i.count}</span>
            <span className="home__issue-meta">
              <span className={`home__issue-label home__issue-label--${i.variant}`}>{i.label} </span>
              <span className="home__issue-delta">(+{i.delta})</span>
            </span>
          </div>
        ))}
      </div>

      <div className="home__divider" />

      {/* Tables */}
      <div className="home__tables">
        <div className="table-wrap">
          <div className="table-wrap__title">
            <span className="table-wrap__title-text">Top 5 repos by number of AI assets</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="table__th">Repository name</th>
                <th className="table__th">AI Assets</th>
                <th className="table__th">Last week</th>
              </tr>
            </thead>
            <tbody>
              {topRepos.map(r => (
                <tr key={r.name} className="table__row">
                  <td className="table__td table__td--name">
                    <Link to="/inventory" className="table__link">{r.name}</Link>
                  </td>
                  <td className="table__td">{r.assets}</td>
                  <td className="table__td table__td--highlight">+{r.lastWeek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <div className="table-wrap__title">
            <span className="table-wrap__title-text">New assets this week</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="table__th">Name</th>
                <th className="table__th">Type</th>
              </tr>
            </thead>
            <tbody>
              {newAssets.map(a => (
                <tr key={a.name} className="table__row">
                  <td className="table__td table__td--name">{a.name}</td>
                  <td className="table__td">
                    <Badge variant="type" label={a.type} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function AssetIcon({ type }: { type: string }) {
  if (type === 'mcp') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="2" width="12" height="12" rx="2"/><rect x="5" y="5" width="6" height="6" rx="0.5"/>
    </svg>
  );
  if (type === 'model') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8" cy="8" r="5.5"/><path d="M8 5v3.5l2 1.5"/>
    </svg>
  );
  if (type === 'dataset') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M4 2h6l3 3v9H4V2z"/><path d="M10 2v3h3"/><path d="M6 8h4M6 10.5h4M6 13h2"/>
    </svg>
  );
  if (type === 'library') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="9.5" width="12" height="3" rx="0.5"/>
      <rect x="2" y="6"   width="12" height="3" rx="0.5"/>
      <rect x="2" y="2.5" width="12" height="3" rx="0.5"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M8 2v12M2 8h12M4.5 4.5l7 7M11.5 4.5l-7 7"/>
    </svg>
  );
}
