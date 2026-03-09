import { useState } from 'react';
import '../components/Table.css';
import { useNavigate } from 'react-router-dom';
import { savedReports } from '../data/mockData';
import { useChatContext } from '../context/ChatContext';
import { Button } from '../components/Button';
import {
  SparklesIcon,
  MagnifyingGlassIcon,
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import './Reports.css';

// ── Reports — Figma ldezalbJY9Ml9bWU0eMqPz 1376-14435 ──────────────────────

const REPORT_SUGGESTIONS = [
  'New issues in the last 12 days by severity',
  'Top critical assets by count',
  'Show AI assets with policy violations',
];

export function Reports() {
  const navigate = useNavigate();
  const { openChat } = useChatContext();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'all' | 'mine'>('all');
  const [reports, setReports] = useState(savedReports);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const filtered = reports.filter(r =>
    (view === 'all' || r.createdBy === 'Ana Parada') &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete() {
    if (!deleteTarget) return;
    setReports(prev => prev.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  if (reports.length === 0) {
    return <EmptyState onPrompt={() => openChat(REPORT_SUGGESTIONS)} />;
  }

  return (
    <div className="reports">
      <div className="reports__header">
        <h1 className="reports__title">Reports</h1>
        <button className="reports__generate-btn" onClick={() => openChat(REPORT_SUGGESTIONS)}>
          <SparklesIcon style={{ width: 13, height: 13 }} /> Generate Report with Evo
        </button>
      </div>

      <div className="table-wrap reports__table-wrap">
        <div className="table-toolbar">
          <div className="table-toolbar__start" />
          <div className="table-toolbar__end">
            <div className="table-toolbar__search-wrap">
              <span className="table-toolbar__search-icon"><MagnifyingGlassIcon style={{ width: 13, height: 13 }} /></span>
              <input
                className="table-toolbar__search"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="reports__view-toggle">
              <button
                className={`reports__view-btn${view === 'all' ? ' reports__view-btn--active' : ''}`}
                onClick={() => setView('all')}
              >All views</button>
              <button
                className={`reports__view-btn${view === 'mine' ? ' reports__view-btn--active' : ''}`}
                onClick={() => setView('mine')}
              >My Views</button>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="table__th table__th--sortable">
                <span className="table__th-content">View Name <span className="table__th-icon"><ArrowsUpDownIcon style={{ width: 10, height: 10 }} /></span></span>
              </th>
              <th className="table__th table__th--sortable">
                <span className="table__th-content">Created at <span className="table__th-icon"><ArrowsUpDownIcon style={{ width: 10, height: 10 }} /></span></span>
              </th>
              <th className="table__th table__th--sortable">
                <span className="table__th-content">Created by <span className="table__th-icon"><ArrowsUpDownIcon style={{ width: 10, height: 10 }} /></span></span>
              </th>
              <th className="table__th table__th--sortable">
                <span className="table__th-content">Key metrics <span className="table__th-icon"><ArrowsUpDownIcon style={{ width: 10, height: 10 }} /></span></span>
              </th>
              <th className="table__th reports__th-action" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr
                key={r.id}
                className="table__row reports__row"
                onClick={() => navigate(`/reports/${r.id}`)}
              >
                <td className="table__td table__td--name">{r.name}</td>
                <td className="table__td">{r.createdAt}</td>
                <td className="table__td">{r.createdBy}</td>
                <td className="table__td" />
                <td className="table__td reports__td-action" onClick={e => e.stopPropagation()}>
                  <button
                    className="table__more-btn"
                    aria-label="Delete report"
                    onClick={() => setDeleteTarget({ id: r.id, name: r.name })}
                  >
                    <TrashIcon style={{ width: 14, height: 14 }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button className="table-pagination__btn table-pagination__btn--icon" disabled><ChevronLeftIcon style={{ width: 14, height: 14 }} /></button>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} className={`table-pagination__btn${n === 1 ? ' table-pagination__btn--active' : ''}`}>{n}</button>
        ))}
        <button className="table-pagination__btn table-pagination__btn--icon"><ChevronRightIcon style={{ width: 14, height: 14 }} /></button>
        <div className="table-pagination__perpage">
          <span className="table-pagination__perpage-label">Results per page</span>
          <select className="table-pagination__perpage-select">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          reportName={deleteTarget.name}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

// ── Delete confirmation modal — Figma ldezalbJY9Ml9bWU0eMqPz 1279-13191 ─────

function DeleteModal({ reportName, onCancel, onConfirm }: {
  reportName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="delete-modal-backdrop" onClick={onCancel}>
      <div className="delete-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
        <div className="delete-modal__header">
          <div>
            <h2 className="delete-modal__title" id="delete-modal-title">Delete report</h2>
            <p className="delete-modal__body">
              Are you sure you want to delete <strong>{reportName}</strong>?<br />
              This action cannot be undone.
            </p>
          </div>
          <button className="delete-modal__close" onClick={onCancel} aria-label="Close">
            <XMarkIcon style={{ width: 16, height: 16 }} />
          </button>
        </div>
        <div className="delete-modal__footer">
          <Button label="Cancel" variant="secondary" size="md" onClick={onCancel} />
          <Button label="Delete" variant="primary" size="md" onClick={onConfirm} />
        </div>
      </div>
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
            <SparklesIcon style={{ width: 13, height: 13 }} /> {p}
          </button>
        ))}
      </div>
    </div>
  );
}

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
