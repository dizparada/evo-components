import { useState } from 'react';
import '../components/Table.css';
import { useNavigate } from 'react-router-dom';
import { savedReports } from '../data/mockData';
import './Reports.css';

export function Reports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'all' | 'mine'>('all');
  const [toast] = useState('');

  const filtered = savedReports.filter(r =>
    (view === 'all' || r.createdBy === 'Ana Parada') &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (savedReports.length === 0) {
    return <EmptyState onPrompt={() => navigate('/reports/new')} />;
  }

  return (
    <div className="reports">
      {toast && <Toast message={toast} />}

      <div className="reports__header">
        <h1 className="reports__title">Reports</h1>
        <button className="reports__generate-btn" onClick={() => navigate('/reports/new')}>
          <SparklesIcon /> Generate Report with Evo
        </button>
      </div>

      <div className="reports__toolbar">
        <div className="reports__search-wrap">
          <SearchIcon />
          <input
            className="reports__search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="reports__view-toggle">
          <button className={`reports__view-btn ${view === 'all' ? 'reports__view-btn--active' : ''}`} onClick={() => setView('all')}>All views</button>
          <button className={`reports__view-btn ${view === 'mine' ? 'reports__view-btn--active' : ''}`} onClick={() => setView('mine')}>My Views</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="table__th">View Name <SortIcon /></th>
            <th className="table__th">Created at <SortIcon /></th>
            <th className="table__th">Created by <SortIcon /></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id} className="table__row" onClick={() => navigate(`/reports/${r.id}`)} style={{ cursor: 'pointer' }}>
              <td className="table__td table__td--name">{r.name}</td>
              <td className="table__td">{r.createdAt}</td>
              <td className="table__td">{r.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="reports__pagination">
        <button className="reports__page-btn" disabled><ChevronLeftIcon /></button>
        {[1,2,3,4,5].map(n => (
          <button key={n} className={`reports__page-btn ${n === 1 ? 'reports__page-btn--active' : ''}`}>{n}</button>
        ))}
        <button className="reports__page-btn"><ChevronRightIcon /></button>
        <span className="reports__per-page">Results per page</span>
        <select className="reports__per-page-select"><option>10</option><option>25</option><option>50</option></select>
      </div>

      {/* Floating Ask Evo button */}
      <button className="reports__ask-evo" onClick={() => navigate('/reports/new')}>
        <SparklesIcon /> Ask Evo
      </button>
    </div>
  );
}

function EmptyState({ onPrompt }: { onPrompt: () => void }) {
  const prompts = ['Show me all models grouped by count', 'List all critical issues', 'Show me AI Assets that have issues'];
  return (
    <div className="reports-empty">
      <div className="reports-empty__icon">
        <ChartIcon />
      </div>
      <h2 className="reports-empty__title">Tell stories with reports</h2>
      <p className="reports-empty__subtitle">Generate your first security report to assess and monitor your AI security posture.</p>
      <div className="reports-empty__prompts">
        {prompts.map(p => (
          <button key={p} className="reports-empty__prompt" onClick={onPrompt}>
            <SparklesIcon /> {p}
          </button>
        ))}
      </div>
      <button className="reports__ask-evo" onClick={onPrompt}>
        <SparklesIcon /> Ask Evo
      </button>
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="reports__toast">
      <CheckIcon /> {message}
    </div>
  );
}

function SparklesIcon() { return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1.5l1.2 3.1 3.3.3-2.5 2.2.8 3.2L7 8.7l-2.8 1.6.8-3.2L2.5 4.9l3.3-.3L7 1.5z"/></svg>; }
function SearchIcon() { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>; }
function SortIcon() { return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{opacity:0.5,display:'inline',marginLeft:3}}><path d="M2 3.5l3-2.5 3 2.5M2 6.5l3 2.5 3-2.5"/></svg>; }
function ChevronLeftIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3L5 7l4 4"/></svg>; }
function ChevronRightIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l4 4-4 4"/></svg>; }
function CheckIcon() { return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7l4 4 6-6"/></svg>; }
function ChartIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#27272a"/>
      <path d="M20 44l8-10 6 6 10-14" stroke="#9456d2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="44" cy="44" r="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5"/>
      <path d="M41 44h6M44 41v6" stroke="#9f9fa9" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
