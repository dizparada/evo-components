import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IssueBadges } from '../components/Badge';
import { repositories } from '../data/mockData';
import './Inventory.css';

const statsSummary = [
  { icon: '⊞', label: 'MCP Servers', count: 5, new: 3 },
  { icon: '◉', label: 'Models', count: 13, new: 7 },
  { icon: '⊟', label: 'Datasets', count: 22, new: 5 },
  { icon: '⊡', label: 'Libraries', count: 16, new: 3 },
  { icon: '✳', label: 'Other', count: 20, new: 5 },
];

export function Inventory() {
  const [activeTab, setActiveTab] = useState<'ai-bom' | 'custom'>('ai-bom');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'repositories' | 'assets'>('repositories');

  const filtered = repositories.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory">
      <div className="inventory__stats">
        {statsSummary.map(s => (
          <div key={s.label} className="inventory__stat">
            <span className="inventory__stat-icon">{s.icon}</span>
            <span className="inventory__stat-count">{s.count}</span>
            <span className="inventory__stat-new">(+{s.new})</span>
            <span className="inventory__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="inventory__tabs">
        <button
          className={`inventory__tab ${activeTab === 'ai-bom' ? 'inventory__tab--active' : ''}`}
          onClick={() => setActiveTab('ai-bom')}
        >AI-BOM</button>
        <button
          className={`inventory__tab ${activeTab === 'custom' ? 'inventory__tab--active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >Custom discovery <span className="inventory__tab-badge">3</span></button>
      </div>

      <div className="inventory__toolbar">
        <span className="inventory__count">Repositories: {filtered.length}</span>
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
        <div className="inventory__view-toggle">
          <button
            className={`inventory__view-btn ${view === 'repositories' ? 'inventory__view-btn--active' : ''}`}
            onClick={() => setView('repositories')}
          >Repositories</button>
          <button
            className={`inventory__view-btn ${view === 'assets' ? 'inventory__view-btn--active' : ''}`}
            onClick={() => setView('assets')}
          >AI assets</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="table__th">
              Name <SortIcon />
            </th>
            <th className="table__th">Assets <SortIcon /></th>
            <th className="table__th">This week <SortIcon /></th>
            <th className="table__th">Assets by type <FilterIcon /></th>
            <th className="table__th">Issues <SortIcon /></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(repo => (
            <tr key={repo.id} className="table__row">
              <td className="table__td table__td--name">
                <Link to={`/inventory/${repo.id}`} className="table__link">{repo.name}</Link>
              </td>
              <td className="table__td">{repo.assets}</td>
              <td className="table__td table__td--green">+{repo.thisWeek}</td>
              <td className="table__td">
                <IssueBadges {...repo.issues} />
              </td>
              <td className="table__td">{repo.totalIssues}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>;
}
function SortIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{opacity:0.5}}><path d="M5 2v6M2 5h6"/></svg>;
}
function FilterIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{opacity:0.5}}><path d="M1 3h8M3 5h4M5 7h0"/></svg>;
}
