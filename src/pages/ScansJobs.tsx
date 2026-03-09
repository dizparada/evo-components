import { useState } from 'react';
import { Badge } from '../components/Badge';
import '../components/Table.css';
import { scansJobs } from '../data/mockData';
import './ScansJobs.css';

export function ScansJobs() {
  const [activeSearch, setActiveSearch] = useState('');
  const [finishedSearch, setFinishedSearch] = useState('');

  const active = scansJobs.activeTests.filter(j =>
    j.description.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const finished = scansJobs.finishedJobs.filter(j =>
    j.description.toLowerCase().includes(finishedSearch.toLowerCase())
  );

  return (
    <div className="scans-jobs">
      {/* Active tests */}
      <div className="scans-jobs__section">
        <div className="scans-jobs__section-header">
          <div className="scans-jobs__section-title-row">
            <span className="scans-jobs__section-title">Active tests</span>
            <Badge variant="neutral" label={String(active.length)} />
          </div>
          <div className="inventory__search-wrap">
            <SearchIcon />
            <input
              className="inventory__search"
              placeholder="Search..."
              value={activeSearch}
              onChange={e => setActiveSearch(e.target.value)}
              style={{ width: 140 }}
            />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="table__th">Description</th>
              <th className="table__th">Type</th>
              <th className="table__th">Initiator</th>
              <th className="table__th">Status</th>
              <th className="table__th">Progress</th>
            </tr>
          </thead>
          <tbody>
            {active.length === 0 ? (
              <tr className="table__row">
                <td colSpan={5} className="table__td" style={{ textAlign: 'center', color: 'var(--color-fg-muted)' }}>
                  No active tests
                </td>
              </tr>
            ) : (
              active.map(job => (
                <tr key={job.id} className="table__row">
                  <td className="table__td table__td--name">{job.description}</td>
                  <td className="table__td"><Badge variant="type" label={job.type} /></td>
                  <td className="table__td">{job.initiator}</td>
                  <td className="table__td">
                    <Badge variant="running" label={job.status} />
                  </td>
                  <td className="table__td">
                    <div className="scans-jobs__progress">
                      <div className="scans-jobs__progress-bar">
                        <div className="scans-jobs__progress-fill" style={{ width: `${job.progress}%` }} />
                      </div>
                      <span className="scans-jobs__progress-label">{job.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Activity log */}
      <div className="scans-jobs__section">
        <div className="scans-jobs__section-header">
          <div className="scans-jobs__section-title-row">
            <span className="scans-jobs__section-title">Activity log</span>
          </div>
        </div>

        <div className="scans-jobs__finished-header">
          <div className="scans-jobs__section-title-row">
            <span className="scans-jobs__finished-label">Finished jobs</span>
            <Badge variant="neutral" label={String(finished.length)} />
          </div>
          <div className="inventory__search-wrap">
            <SearchIcon />
            <input
              className="inventory__search"
              placeholder="Search..."
              value={finishedSearch}
              onChange={e => setFinishedSearch(e.target.value)}
              style={{ width: 140 }}
            />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="table__th">Description</th>
              <th className="table__th">Type</th>
              <th className="table__th">Initiator</th>
              <th className="table__th">Status</th>
              <th className="table__th">Finished</th>
            </tr>
          </thead>
          <tbody>
            {finished.map(job => (
              <tr key={job.id} className="table__row">
                <td className="table__td table__td--name">{job.description}</td>
                <td className="table__td"><Badge variant="type" label={job.type} /></td>
                <td className="table__td">{job.initiator}</td>
                <td className="table__td">
                  <Badge variant="success" label={job.status} />
                </td>
                <td className="table__td table__td--secondary">{job.finished}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9 9l2.5 2.5"/></svg>;
}
