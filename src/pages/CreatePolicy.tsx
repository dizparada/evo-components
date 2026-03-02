import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePolicy.css';

const SEVERITY_OPTIONS = ['Critical', 'High', 'Medium', 'Low'] as const;
type Severity = typeof SEVERITY_OPTIONS[number];

const TYPE_OPTIONS = ['Model', 'Dataset', 'Library', 'Container'];
const MATCH_BY_OPTIONS = ['Vendor', 'Name', 'Version', 'License'];
const PERMISSION_OPTIONS = ['Allow only', 'Disallow'] as const;
type Permission = typeof PERMISSION_OPTIONS[number];

export function CreatePolicy() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [permission, setPermission] = useState<Permission>('Disallow');
  const [type, setType] = useState(TYPE_OPTIONS[0]);
  const [severity, setSeverity] = useState<Severity>('High');
  const [matchBy, setMatchBy] = useState(MATCH_BY_OPTIONS[0]);
  const [valueInput, setValueInput] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [remediation, setRemediation] = useState('');

  function addValue() {
    const trimmed = valueInput.trim();
    if (trimmed && !values.includes(trimmed)) {
      setValues([...values, trimmed]);
    }
    setValueInput('');
  }

  function handleValueKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addValue();
    }
  }

  function removeValue(val: string) {
    setValues(values.filter(v => v !== val));
  }

  return (
    <div className="create-policy">
      <div className="create-policy__header">
        <h1 className="create-policy__title">Create policy</h1>
      </div>

      <form className="create-policy__form" onSubmit={e => e.preventDefault()}>

        <div className="create-policy__field">
          <label className="create-policy__label" htmlFor="cp-name">Policy name</label>
          <input
            id="cp-name"
            className="create-policy__input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Disallow Model DeepSeek-V3.2"
          />
        </div>

        <div className="create-policy__field">
          <label className="create-policy__label">Permission</label>
          <div className="create-policy__radio-group">
            {PERMISSION_OPTIONS.map(opt => (
              <label key={opt} className="create-policy__radio-label">
                <input
                  type="radio"
                  className="create-policy__radio"
                  name="permission"
                  value={opt}
                  checked={permission === opt}
                  onChange={() => setPermission(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="create-policy__field">
          <label className="create-policy__label" htmlFor="cp-type">Type</label>
          <div className="create-policy__select-wrap">
            <select
              id="cp-type"
              className="create-policy__select"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              {TYPE_OPTIONS.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>

        <div className="create-policy__field">
          <label className="create-policy__label">Severity</label>
          <div className="create-policy__severity-group">
            {SEVERITY_OPTIONS.map(s => (
              <label key={s} className="create-policy__severity-label">
                <input
                  type="radio"
                  className="create-policy__radio"
                  name="severity"
                  value={s}
                  checked={severity === s}
                  onChange={() => setSeverity(s)}
                />
                <span className={`create-policy__severity-badge create-policy__severity-badge--${s.toLowerCase()}`}>
                  {s}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="create-policy__field">
          <label className="create-policy__label" htmlFor="cp-matchby">Match by</label>
          <div className="create-policy__select-wrap">
            <select
              id="cp-matchby"
              className="create-policy__select"
              value={matchBy}
              onChange={e => setMatchBy(e.target.value)}
            >
              {MATCH_BY_OPTIONS.map(m => <option key={m}>{m}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>

        <div className="create-policy__field">
          <label className="create-policy__label" htmlFor="cp-value">Value</label>
          <div className="create-policy__tag-input">
            {values.map(v => (
              <span key={v} className="create-policy__tag">
                {v}
                <button
                  type="button"
                  className="create-policy__tag-remove"
                  onClick={() => removeValue(v)}
                  aria-label={`Remove ${v}`}
                >
                  <XIcon />
                </button>
              </span>
            ))}
            <input
              id="cp-value"
              className="create-policy__tag-text"
              value={valueInput}
              onChange={e => setValueInput(e.target.value)}
              onKeyDown={handleValueKeyDown}
              onBlur={addValue}
              placeholder={values.length === 0 ? 'Type and press Enter…' : ''}
            />
          </div>
          <p className="create-policy__hint">
            You can list multiple values. The agent will identify exact matches for any of the items provided.
          </p>
        </div>

        <div className="create-policy__field">
          <label className="create-policy__label" htmlFor="cp-remediation">
            Remediation steps <span className="create-policy__optional">(optional)</span>
          </label>
          <textarea
            id="cp-remediation"
            className="create-policy__textarea"
            value={remediation}
            onChange={e => setRemediation(e.target.value)}
            rows={5}
          />
        </div>

        <div className="create-policy__actions">
          <button type="button" className="create-policy__btn create-policy__btn--secondary" onClick={() => navigate('/policies')}>
            Cancel
          </button>
          <button type="submit" className="create-policy__btn create-policy__btn--primary">
            Save
          </button>
        </div>

      </form>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg className="create-policy__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
