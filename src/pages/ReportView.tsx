import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge, severityVariant } from '../components/Badge';
import '../components/Table.css';
import { reportRows, savedReports } from '../data/mockData';
import './ReportView.css';

export function ReportView() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const isNew = reportId === 'new';
  const existing = savedReports.find(r => r.id === reportId);

  const [loading, setLoading] = useState(isNew);
  const [saved, setSaved] = useState(!isNew && !!existing);
  const [toast, setToast] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);

  const title = isNew
    ? 'New issues in the last 12 days by severity type'
    : existing?.name ?? 'Report';

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  // Simulate loading completing on mount for /new
  useState(() => {
    if (isNew) setTimeout(() => setLoading(false), 1200);
  });

  function handleSave() {
    setSaved(true);
    showToast('View saved successfully');
  }

  function handleDownload() {
    showToast('CSV download successfully started');
  }

  function handleDelete() {
    setShowDeleteModal(false);
    navigate('/reports');
  }

  if (loading) return <SkeletonLoader />;

  return (
    <div className="report-view">
      {toast && <Toast message={toast} />}

      <div className="report-view__header">
        <div className="report-view__title-row">
          {saved && (
            <button className="report-view__back" onClick={() => navigate('/reports')}>
              <ChevronLeftIcon />
            </button>
          )}
          <h1 className="report-view__title">{title}</h1>
          {!saved && <button className="report-view__edit-icon"><PencilIcon /></button>}
          <div style={{ flex: 1 }} />
          <button className="report-view__csv-btn" onClick={handleDownload}>
            <DownloadIcon /> Download as CSV
          </button>
          {saved && (
            <button className="report-view__delete-btn" onClick={() => setShowDeleteModal(true)}>
              <TrashIcon />
            </button>
          )}
        </div>
        {saved && (
          <div className="report-view__meta">
            <span className="report-view__meta-label">Last updated</span>
            <span className="report-view__meta-value">Jan 22nd, 2026 by Ana Parada</span>
          </div>
        )}
      </div>

      <div className="report-view__search-row">
        <div style={{ flex: 1 }} />
        <div className="reports__search-wrap">
          <SearchIcon />
          <input className="reports__search" placeholder="Search..." />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="table__th">Asset Name <SortIcon /></th>
            <th className="table__th">Severity <SortIcon /></th>
            <th className="table__th">Created at <SortIcon /></th>
            <th className="table__th">Assigned to <SortIcon /></th>
            <th className="table__th">Occurrences <SortIcon /></th>
          </tr>
        </thead>
        <tbody>
          {reportRows.map((row, i) => (
            <tr key={i} className="table__row">
              <td className="table__td table__td--name">{row.assetName}</td>
              <td className="table__td">
                <Badge variant={severityVariant(row.severity)} label={row.severity} />
              </td>
              <td className="table__td">{row.createdAt}</td>
              <td className="table__td">{row.assignedTo}</td>
              <td className="table__td">{row.occurrences}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="reports__pagination">
        <button className="reports__page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeftIcon /></button>
        {[1,2,3,4,5].map(n => (
          <button key={n} className={`reports__page-btn ${n === page ? 'reports__page-btn--active' : ''}`} onClick={() => setPage(n)}>{n}</button>
        ))}
        <button className="reports__page-btn" onClick={() => setPage(p => p + 1)}><ChevronRightIcon /></button>
        <span className="reports__per-page">Results per page</span>
        <select className="reports__per-page-select"><option>10</option><option>25</option></select>
      </div>

      {!saved && (
        <div className="report-view__footer">
          <button className="report-view__cancel-btn" onClick={() => navigate('/reports')}>Cancel</button>
          <button className="report-view__save-btn" onClick={handleSave}>Save</button>
        </div>
      )}

      {showDeleteModal && (
        <div className="report-view__modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="report-view__modal" onClick={e => e.stopPropagation()}>
            <div className="report-view__modal-header">
              <span>Delete report</span>
              <button className="report-view__modal-close" onClick={() => setShowDeleteModal(false)}><CloseIcon /></button>
            </div>
            <p className="report-view__modal-body">
              Are you sure you want to delete {existing?.name ?? 'this report'}?<br />
              This action cannot be undone.
            </p>
            <div className="report-view__modal-footer">
              <button className="report-view__cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="report-view__delete-confirm-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="report-skeleton">
      <div className="report-skeleton__title" />
      <div className="report-skeleton__table">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="report-skeleton__row">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="report-skeleton__cell" style={{ width: `${[30, 12, 14, 16, 8][j]}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return <div className="reports__toast"><CheckIcon /> {message}</div>;
}

function ChevronLeftIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3L5 7l4 4"/></svg>; }
function ChevronRightIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l4 4-4 4"/></svg>; }
function PencilIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10l7.5-7.5a1.5 1.5 0 012 2L4 12H2v-2z"/></svg>; }
function DownloadIcon() { return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v7M4 6l3 3 3-3M2 11h10"/></svg>; }
function TrashIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h10M5 4V2.5h4V4M4 4l.5 7.5h5L10 4"/></svg>; }
function SearchIcon() { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>; }
function SortIcon() { return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{opacity:0.5,display:'inline',marginLeft:3}}><path d="M2 3.5l3-2.5 3 2.5M2 6.5l3 2.5 3-2.5"/></svg>; }
function CloseIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3l8 8M11 3l-8 8"/></svg>; }
function CheckIcon() { return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7l4 4 6-6"/></svg>; }
