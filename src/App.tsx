import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { RepositoryDetails } from './pages/RepositoryDetails';
import { AssetDetails } from './pages/AssetDetails';
import { Policies } from './pages/Policies';
import { IssueDetails } from './pages/IssueDetails';
import { ScansJobs } from './pages/ScansJobs';
import { Reports } from './pages/Reports';
import { ReportView } from './pages/ReportView';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ color: 'var(--color-fg-secondary)', fontSize: 14 }}>
      <h2 style={{ color: 'var(--color-fg)', fontSize: 18, fontWeight: 600, marginTop: 0 }}>{title}</h2>
      <p>Coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/:repoId" element={<RepositoryDetails />} />
          <Route path="inventory/:repoId/:assetId" element={<AssetDetails />} />
          <Route path="policies" element={<Policies />} />
          <Route path="policies/issues/:issueId" element={<IssueDetails />} />
          <Route path="scans" element={<ScansJobs />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:reportId" element={<ReportView />} />
          <Route path="secure" element={<PlaceholderPage title="Secure by design" />} />
          <Route path="observe" element={<PlaceholderPage title="Observe" />} />
          <Route path="endpoint" element={<PlaceholderPage title="Endpoint" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
