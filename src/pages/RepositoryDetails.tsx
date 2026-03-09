import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { SeverityCounters } from '../components/SeverityCounters';
import '../components/Table.css';
import { Tabs } from '../components/Tabs';
import { assets, repositories } from '../data/mockData';
import './RepositoryDetails.css';

export function RepositoryDetails() {
  const { repoId } = useParams<{ repoId: string }>();
  const repo = repositories.find(r => r.id === repoId);
  const repoAssets = assets[repoId ?? ''] ?? [];
  const [activeTab, setActiveTab] = useState<'assets' | 'issues'>('assets');

  if (!repo) {
    return (
      <div style={{ color: 'var(--color-fg-secondary)', padding: 24 }}>
        Repository not found. <Link to="/inventory" style={{ color: 'var(--color-link)' }}>Back to Inventory</Link>
      </div>
    );
  }

  const totalIssues = repoAssets.reduce((sum, a) =>
    sum + a.issues.critical + a.issues.high + a.issues.medium + a.issues.low, 0);

  return (
    <div className="repo-details">
      <div className="repo-details__header">
        <h1 className="repo-details__name">
          {repo.name}
          <span className="repo-details__type-badge">Repo</span>
        </h1>
        <div className="repo-details__meta">
          <div className="repo-details__meta-item">
            <span className="repo-details__meta-label">Source</span>
            <a href="#" className="repo-details__meta-link">
              <LinkIcon /> github / acme-corp / dev-advisory
            </a>
          </div>
          <div className="repo-details__meta-item">
            <span className="repo-details__meta-label">First discovered</span>
            <span>Jan 13, 2025</span>
          </div>
          <div className="repo-details__meta-item">
            <span className="repo-details__meta-label">Issues</span>
            <SeverityCounters
              critical={repo.issues.critical}
              high={repo.issues.high}
              medium={repo.issues.medium}
              low={repo.issues.low}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Tabs variant="line" tabs={[{ value: 'assets', label: 'Assets', badge: repoAssets.length }, { value: 'issues', label: 'Issues', badge: totalIssues }]} value={activeTab} onChange={v => setActiveTab(v as 'assets' | 'issues')} />
      </div>

      {activeTab === 'assets' && (
        <table className="table">
          <thead>
            <tr>
              <th className="table__th">Asset name</th>
              <th className="table__th">Type</th>
              <th className="table__th">Issues</th>
              <th className="table__th">Vendor</th>
            </tr>
          </thead>
          <tbody>
            {repoAssets.map(asset => (
              <tr key={asset.id} className="table__row">
                <td className="table__td table__td--name">
                  <Link to={`/inventory/${repoId}/${asset.id}`} className="table__link">{asset.name}</Link>
                </td>
                <td className="table__td">
                  <Badge variant="type" label={asset.type} />
                </td>
                <td className="table__td">
                  <SeverityCounters {...asset.issues} />
                </td>
                <td className="table__td table__td--vendor">{asset.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'issues' && (
        <div style={{ color: 'var(--color-fg-tertiary)', fontSize: 13, padding: 24, textAlign: 'center' }}>
          {totalIssues} issues across {repoAssets.length} assets
        </div>
      )}
    </div>
  );
}

function LinkIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{display:'inline',marginRight:3}}><path d="M4.5 3H3a2 2 0 000 4h1.5M7.5 3H9a2 2 0 010 4H7.5M4 6h4"/></svg>;
}
