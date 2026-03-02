import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ChatPanel } from './ChatPanel';
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

  // Reports listing pages: hide chat panel, show floating Ask Evo button
  const isReportsListing = location.pathname === '/reports';
  const isReportDetail = location.pathname.startsWith('/reports/');

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        {crumb && (
          <div className="layout__breadcrumb">
            <span className="layout__crumb-text">{crumb}</span>
          </div>
        )}
        <div className="layout__content">
          <Outlet />
        </div>
      </div>
      {!isReportsListing && <ChatPanel reportMode={isReportDetail} />}
    </div>
  );
}
