import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JobsPage from './pages/JobsPage';
import RecruiterJobsPage from './pages/RecruiterJobsPage';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main
        className="flex-1 min-h-screen lg:ml-0 transition-all duration-300"
        style={{ marginLeft: 0 }}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* TEMPORARY LOCAL TESTING - redirect root to recruiter job management page */}
          <Route index element={<Navigate to="/recruiter/jobs" replace />} />
          <Route path="profile" element={<Navigate to="/jobs" replace />} />
          <Route path="applications" element={<Navigate to="/jobs" replace />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="recruiter/jobs" element={<RecruiterJobsPage />} />
          <Route path="*" element={<Navigate to="/recruiter/jobs" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
