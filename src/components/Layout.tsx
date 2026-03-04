import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ChatPanel } from './ChatPanel';
import { useChatContext } from '../context/ChatContext';
import './Layout.css';

const breadcrumbMap: Record<string, string> = {
  '/': 'Home',
  '/inventory': 'Discovery agent: Inventory',
  '/policies': 'Policy agent: Policies & issues',
  '/reports': 'Reports',
  '/scans': 'Scans & jobs',
};

function getBreadcrumb(pathname: string) {
  if (pathname.startsWith('/inventory/') && pathname.split('/').length === 3) {
    const repo = pathname.split('/')[2];
    return `Discovery agent: Inventory / ${repo}`;
  }
  if (pathname.startsWith('/inventory/') && pathname.split('/').length === 4) {
    const parts = pathname.split('/');
    return `Discovery agent: Inventory / ${parts[2]} / ${parts[3]}`;
  }
  if (pathname.startsWith('/policies/issues/')) {
    const id = pathname.split('/').pop();
    return `Policy agent: Policies & issues / Block DeepSeek / ${id}`;
  }
  if (pathname.startsWith('/reports/')) {
    return `Reports / ${pathname.split('/reports/')[1]}`;
  }
  return breadcrumbMap[pathname] ?? '';
}

export function Layout() {
  const location = useLocation();
  const crumb = getBreadcrumb(location.pathname);
  const { chatOpen, openChat, closeChat } = useChatContext();

  const isReportDetail = location.pathname.startsWith('/reports/');

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        {crumb && (
          <div className="layout__breadcrumb">
            <span className="layout__crumb-text">{crumb}</span>
            {!chatOpen && (
              <button className="layout__chat-toggle" onClick={() => openChat()} aria-label="Open chat">
                <SidepanelIcon />
              </button>
            )}
          </div>
        )}
        <div className="layout__content">
          <div className="layout__content-inner">
            <Outlet />
          </div>
        </div>
      </div>
      {chatOpen && (
        <ChatPanel reportMode={isReportDetail} onClose={closeChat} />
      )}
    </div>
  );
}

function SidepanelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="3" width="5" height="10" rx="1.5" fill="currentColor" opacity="0.3" />
      <line x1="9" y1="3" x2="9" y2="13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
