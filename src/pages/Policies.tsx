import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, severityVariant } from '../components/Badge';
import { StatCards } from '../components/StatCards';
import '../components/Table.css';
import { Tabs } from '../components/Tabs';
import { Tooltip } from '../components/Tooltip';
import { policies, policyIssues } from '../data/mockData';
import './Policies.css';

const issueSummary = [
  { label: 'Critical issues', count: 1, new: 1 },
  { label: 'High issues',     count: 2, new: 2 },
  { label: 'Medium issues',   count: 1, new: 0 },
  { label: 'Low issues',      count: 1, new: 1 },
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
        label: s.label,
        count: s.count,
        delta: s.new,
      }))} />

      <div className="policies__tabs-row">
        <Tabs variant="line" tabs={[{ value: 'policies', label: 'Policies', badge: policies.length }, { value: 'issues', label: 'Issues', badge: policyIssues.length }]} value={activeTab} onChange={v => setActiveTab(v as 'policies' | 'issues')} />
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
                  {policy.id.includes('mcp') ? (
                    <Tooltip content="MCP server policies can't be modified" placement="left">
                      <button className="table__more-btn" disabled style={{ opacity: 0.3, cursor: 'not-allowed' }}>
                        <MoreIcon />
                      </button>
                    </Tooltip>
                  ) : (
                    <button className="table__more-btn"><MoreIcon /></button>
                  )}
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


function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>;
}

function MoreIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="2.5" cy="7" r="1.2"/><circle cx="7" cy="7" r="1.2"/><circle cx="11.5" cy="7" r="1.2"/></svg>;
}
