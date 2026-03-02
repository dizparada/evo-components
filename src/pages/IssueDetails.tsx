import { useParams } from 'react-router-dom';
import { Badge, severityVariant } from '../components/Badge';
import { issueDetails } from '../data/mockData';
import './IssueDetails.css';

export function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>();
  const issue = issueDetails[issueId ?? ''] ?? issueDetails['pytorch-1131'];

  return (
    <div className="issue-details">
      <h1 className="issue-details__name">{issue.name}</h1>
      <p className="issue-details__desc">{issue.description}</p>

      <div className="issue-details__meta">
        <div className="issue-details__meta-item">
          <span className="issue-details__meta-label">Repository</span>
          <a href="#" className="issue-details__meta-link">{issue.repository}</a>
        </div>
        <div className="issue-details__meta-item">
          <span className="issue-details__meta-label">Asset name</span>
          <span>{issue.assetName}</span>
        </div>
        <div className="issue-details__meta-item">
          <span className="issue-details__meta-label">First discovered</span>
          <span>{issue.firstDiscovered}</span>
        </div>
        <div className="issue-details__meta-item">
          <span className="issue-details__meta-label">Severity</span>
          <Badge variant={severityVariant(issue.severity)} label={issue.severity} />
        </div>
      </div>

      <div className="issue-details__card">
        <div className="issue-details__card-header">Remediation steps</div>
        <p className="issue-details__card-body">{issue.remediationSteps}</p>
      </div>

      <div className="issue-details__occurrences-header">
        <span className="issue-details__occurrences-label">
          Occurrences <span className="issue-details__occurrences-count">{issue.occurrences.length}</span>
        </span>
        <div style={{ flex: 1 }} />
        <div className="inventory__search-wrap">
          <SearchIcon />
          <input className="inventory__search" placeholder="Search..." style={{ width: 140 }} />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="table__th">Location</th>
            <th className="table__th">Line</th>
            <th className="table__th">Column</th>
          </tr>
        </thead>
        <tbody>
          {issue.occurrences.map((o, i) => (
            <tr key={i} className="table__row">
              <td className="table__td">{o.location}</td>
              <td className="table__td">{o.line}</td>
              <td className="table__td">{o.column}</td>
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
