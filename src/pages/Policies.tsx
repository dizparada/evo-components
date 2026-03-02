import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, severityVariant } from '../components/Badge';
import { StatCards } from '../components/StatCards';
import { policies, policyIssues } from '../data/mockData';
import './Policies.css';

const issueSummary = [
  { label: 'Critical issues', count: 1, new: 1,  variant: 'critical' as const },
  { label: 'High issues',     count: 2, new: 2,  variant: 'high'     as const },
  { label: 'Medium issues',   count: 1, new: 0,  variant: 'medium'   as const },
  { label: 'Low issues',      count: 1, new: 1,  variant: 'low'      as const },
];

export function Policies() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'policies' | 'issues'>('policies');
  const [search, setSearch] = useState('');

  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredIssues = policyIssues.filter(i =>
    i.assetName.toLowerCase().includes(search.toLowerCase()) ||
    i.policyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="policies">
      <StatCards items={issueSummary.map(s => ({
        icon: <SeverityIcon variant={s.variant} />,
        label: s.label,
        count: s.count,
        delta: s.new,
        variant: s.variant,
      }))} />

      <div className="policies__tabs-row">
        <div className="policies__tabs">
          <button
            className={`policies__tab ${activeTab === 'policies' ? 'policies__tab--active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Policies <span className="policies__tab-count">{policies.length}</span>
          </button>
          <button
            className={`policies__tab ${activeTab === 'issues' ? 'policies__tab--active' : ''}`}
            onClick={() => setActiveTab('issues')}
          >
            Issues <span className="policies__tab-count">{policyIssues.length}</span>
          </button>
        </div>
        {activeTab === 'policies' && (
          <button className="policies__create-btn" onClick={() => navigate('/policies/create')}>Create policy</button>
        )}
      </div>

      <div className="policies__toolbar">
        <div style={{ flex: 1 }} />
        <div className="inventory__search-wrap">
          <SearchIcon />
          <input
            className="inventory__search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {activeTab === 'policies' && (
        <table className="table">
          <thead>
            <tr>
              <th className="table__th">Policy name</th>
              <th className="table__th">Severity</th>
              <th className="table__th">Issues</th>
              <th className="table__th">Status</th>
              <th className="table__th">Created by</th>
              <th className="table__th" style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map(policy => (
              <tr key={policy.id} className="table__row">
                <td className="table__td table__td--name">{policy.name}</td>
                <td className="table__td">
                  <Badge variant={severityVariant(policy.severity)} label={policy.severity} />
                </td>
                <td className="table__td">{policy.issues}</td>
                <td className="table__td">
                  <Badge variant="active" label={policy.status} />
                </td>
                <td className="table__td">{policy.createdBy}</td>
                <td className="table__td">
                  <button className="table__more-btn"><MoreIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'issues' && (
        <table className="table">
          <thead>
            <tr>
              <th className="table__th">Asset name</th>
              <th className="table__th">Repository</th>
              <th className="table__th">Policy name</th>
              <th className="table__th">Severity</th>
              <th className="table__th">Occurrences</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map(issue => (
              <tr key={issue.id} className="table__row">
                <td className="table__td table__td--name">
                  <Link to={`/policies/issues/${issue.id}`} className="table__link">{issue.assetName}</Link>
                </td>
                <td className="table__td table__td--secondary">{issue.repository}</td>
                <td className="table__td table__td--secondary">{issue.policyName}</td>
                <td className="table__td">
                  <Badge variant={severityVariant(issue.severity)} label={issue.severity} />
                </td>
                <td className="table__td">{issue.occurrences}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function SeverityIcon({ variant }: { variant: 'critical' | 'high' | 'medium' | 'low' }) {
  if (variant === 'critical') return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="8" cy="8" r="6"/><path d="M8 5v3M8 11.5h.01"/></svg>;
  if (variant === 'high')     return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2.5l5.5 10H2.5L8 2.5z"/><path d="M8 7v2.5M8 11.5h.01"/></svg>;
  if (variant === 'medium')   return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="8" cy="8" r="6"/><path d="M5 8h6"/></svg>;
  return                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="8" cy="8" r="6"/><path d="M8 7.5v3M8 5h.01"/></svg>;
}

function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>;
}

function MoreIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="2.5" cy="7" r="1.2"/><circle cx="7" cy="7" r="1.2"/><circle cx="11.5" cy="7" r="1.2"/></svg>;
}
