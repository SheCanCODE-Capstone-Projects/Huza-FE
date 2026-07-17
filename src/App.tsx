import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';

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

function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1
        style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}
        className="text-2xl font-bold mb-6"
      >
        Profile
      </h1>
      <div
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        className="rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            style={{ background: 'var(--primary-700)' }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
          >
            JD
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
              John Doe
            </h2>
            <p style={{ color: 'var(--text-light)' }}>Senior Product Designer</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Email', value: 'john@example.com' },
            { label: 'Location', value: 'San Francisco, CA' },
            { label: 'Experience', value: '8 years' },
            { label: 'Specialization', value: 'UI/UX Design' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-light)' }}>
                {item.label}
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplicationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1
        style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}
        className="text-2xl font-bold mb-6"
      >
        Applications
      </h1>
      <div className="space-y-4">
        {[
          { role: 'Senior UI/UX Designer', company: 'Figma', status: 'Under Review', color: 'var(--warning)' },
          { role: 'Product Designer', company: 'Notion', status: 'Interview', color: 'var(--primary-700)' },
          { role: 'Brand Designer', company: 'Stripe', status: 'Applied', color: 'var(--text-light)' },
        ].map(app => (
          <div
            key={app.role}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            className="rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {app.role}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                {app.company}
              </p>
            </div>
            <span
              style={{ background: app.color + '18', color: app.color, border: `1px solid ${app.color}40` }}
              className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
