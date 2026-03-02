import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
                <AssetsByType byType={repo.byType} />
              </td>
              <td className="table__td">{repo.totalIssues}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ByType = { mcp: number; model: number; dataset: number; library: number; other: number };

function AssetsByType({ byType }: { byType: ByType }) {
  const types: { key: keyof ByType; icon: ReactNode }[] = [
    { key: 'mcp',     icon: <McpIcon /> },
    { key: 'model',   icon: <ModelIcon /> },
    { key: 'dataset', icon: <DatasetIcon /> },
    { key: 'library', icon: <LibraryIcon /> },
    { key: 'other',   icon: <OtherIcon /> },
  ];
  return (
    <div className="assets-by-type">
      {types.map(({ key, icon }) => (
        <span key={key} className="assets-by-type__group">
          <span className={`assets-by-type__count ${byType[key] === 0 ? 'assets-by-type__count--zero' : ''}`}>{byType[key]}</span>
          <span className="assets-by-type__icon">{icon}</span>
        </span>
      ))}
    </div>
  );
}

function McpIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="2" width="10" height="10" rx="1.5"/><rect x="4.5" y="4.5" width="5" height="5" rx="0.5"/></svg>;
}
function ModelIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="7" cy="7" r="4.5"/><path d="M7 4v3l2 1.5"/></svg>;
}
function DatasetIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 2h6l2 2v8H3V2z"/><path d="M9 2v2h2"/><path d="M5 6h4M5 8.5h4M5 11h2"/></svg>;
}
function LibraryIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="8" width="10" height="2.5" rx="0.5"/><rect x="2" y="5" width="10" height="2.5" rx="0.5"/><rect x="2" y="2" width="10" height="2.5" rx="0.5"/></svg>;
}
function OtherIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M7 2v10M2 7h10"/><path d="M4 4l6 6M10 4l-6 6"/></svg>;
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
