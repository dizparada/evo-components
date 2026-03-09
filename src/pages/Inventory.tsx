import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { StatCards } from '../components/StatCards';
import '../components/Table.css';
import { Tabs } from '../components/Tabs';
import { Tooltip } from '../components/Tooltip';
import { repositories } from '../data/mockData';
import './Inventory.css';

const statsSummary = [
  { type: 'mcp',     label: 'MCP Servers', count: 5,  delta: 3 },
  { type: 'model',   label: 'Models',      count: 13, delta: 7 },
  { type: 'dataset', label: 'Datasets',    count: 22, delta: 5 },
  { type: 'library', label: 'Libraries',   count: 16, delta: 3 },
  { type: 'other',   label: 'Other',       count: 20, delta: 5 },
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
      <StatCards items={statsSummary.map(s => ({
        icon: <StatIcon type={s.type} />,
        label: s.label,
        count: s.count,
        delta: s.delta,
      }))} />

      <Tabs variant="line" tabs={[{ value: 'ai-bom', label: 'AI-BOM' }, { value: 'custom', label: 'Custom discovery', badge: 3 }]} value={activeTab} onChange={v => setActiveTab(v as 'ai-bom' | 'custom')} />

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
        <Tabs variant="contained" tabs={[{ value: 'repositories', label: 'Repositories' }, { value: 'assets', label: 'AI assets' }]} value={view} onChange={v => setView(v as 'repositories' | 'assets')} />
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

function StatIcon({ type }: { type: string }) {
  if (type === 'mcp')     return <McpIcon />;
  if (type === 'model')   return <ModelIcon />;
  if (type === 'dataset') return <DatasetIcon />;
  if (type === 'library') return <LibraryIcon />;
  return <OtherIcon />;
}

type ByType = { mcp: number; model: number; dataset: number; library: number; other: number };

const ASSET_TYPE_LABELS: Record<keyof ByType, string> = {
  mcp:     'MCP server',
  model:   'Model',
  dataset: 'Dataset',
  library: 'Library',
  other:   'Other',
};

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
        <Tooltip key={key} content={ASSET_TYPE_LABELS[key]} placement="top">
          <span className={`assets-by-type__card ${byType[key] === 0 ? 'assets-by-type__card--zero' : ''}`}>
            <span className="assets-by-type__count">{byType[key]}</span>
            <span className="assets-by-type__icon">{icon}</span>
          </span>
        </Tooltip>
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
