import { useState } from 'react';
import { Nudge } from './Nudge';
import './ChatPanel.css';

interface Message { role: 'user' | 'bot'; text: string; suggestions?: string[]; }

const REPORT_CONVO: Message[] = [
  { role: 'user', text: 'Show how many new issues I had, group by severity type, for the past 12 days' },
  {
    role: 'bot',
    text: 'Done. Here is a table with new issues. Anything else or should we Create it as is?',
    suggestions: ['{prompt suggestion}', '{prompt suggestion}', '{prompt suggestion}'],
  },
];

export function ChatPanel({ reportMode = false }: { reportMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>(reportMode ? REPORT_CONVO : []);
  const [input, setInput] = useState('');

  function send() {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: 'user', text: input },
      { role: 'bot', text: "I've updated the report based on your request. Anything else?" },
    ]);
    setInput('');
  }

  return (
    <aside className="chat-panel">
      <div className="chat-panel__header">
        <span className="chat-panel__title">Evo</span>
        <div className="chat-panel__header-actions">
          {reportMode ? (
            <button className="chat-panel__create-report-btn">Create report</button>
          ) : (
            <>
              <button className="chat-panel__icon-btn"><PlusIcon /></button>
              <button className="chat-panel__icon-btn"><HistoryIcon /></button>
              <button className="chat-panel__icon-btn"><MoreIcon /></button>
              <button className="chat-panel__icon-btn"><CollapseIcon /></button>
            </>
          )}
        </div>
      </div>

      <div className="chat-panel__body">
        {messages.length === 0 ? (
          <div className="chat-panel__welcome">
            <p className="chat-panel__welcome-text">
              Hello. I'm your EVO AI assistant. I can help you with AI governance, security analysis, policy compliance and more. What would you like to know?
            </p>
            <div className="chat-panel__nudges">
              <Nudge label="Help me analyze my scans" onClick={() => setInput('Help me analyze my scans')} />
              <Nudge label="Scan all my repos" onClick={() => setInput('Scan all my repos')} />
            </div>
          </div>
        ) : (
          <div className="chat-panel__messages">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`chat-panel__message chat-panel__message--${m.role}`}>{m.text}</div>
                {m.suggestions && (
                  <div className="chat-panel__suggestions-list">
                    {m.suggestions.map((s, j) => (
                      <button key={j} className="chat-panel__suggestion chat-panel__suggestion--sm">
                        <SparklesIcon /> {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-panel__footer">
        <div className="chat-panel__input-row">
          <input
            className="chat-panel__input"
            placeholder="Ask Evo..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button className="chat-panel__send" onClick={send} disabled={!input.trim()}><SendIcon /></button>
        </div>
        <p className="chat-panel__disclaimer">
          By using Evo chat, you agree to this <a href="#" className="chat-panel__link">disclaimer</a>
        </p>
      </div>
    </aside>
  );
}

function PlusIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v10M2 7h10"/></svg>; }
function HistoryIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="M7 4v3.5l2 1.5"/></svg>; }
function MoreIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="2.5" cy="7" r="1.2"/><circle cx="7" cy="7" r="1.2"/><circle cx="11.5" cy="7" r="1.2"/></svg>; }
function CollapseIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="12" height="12" rx="2"/></svg>; }
function SparklesIcon() { return <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1.5l1.2 3.1 3.3.3-2.5 2.2.8 3.2L7 8.7l-2.8 1.6.8-3.2L2.5 4.9l3.3-.3L7 1.5z"/></svg>; }
function SendIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>; }
