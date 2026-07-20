import React, { useMemo, useState } from 'react';
import { JOBS } from './jobBoardData';
import type { Job } from './jobBoardData';
import RecruiterJobRow from '../components/RecruiterJobRow';

const TABS: { key: 'Active' | 'Closed' | 'Draft'; label: string }[] = [
  { key: 'Active', label: 'Active' },
  { key: 'Closed', label: 'Closed' },
  { key: 'Draft', label: 'Draft' },
];

export default function RecruiterJobsPage() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Closed' | 'Draft'>('Active');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    return {
      Active: JOBS.filter(j => j.status === 'Active').length,
      Closed: JOBS.filter(j => j.status === 'Closed').length,
      Draft: JOBS.filter(j => j.status === 'Draft').length,
    } as Record<string, number>;
  }, []);

  const filtered = useMemo(() => {
    return JOBS.filter((j: Job) => (j.status ?? 'Active') === activeTab)
      .filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));
  }, [activeTab, search]);

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search artists, portfolios, or job posts..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-200"
          />
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="notifications" className="w-10 h-10 rounded-full bg-white border flex items-center justify-center">🔔</button>
          <button className="bg-green-800 text-white px-4 py-2 rounded-full">+ Post a Job</button>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">C</div>
        </div>
      </div>

      {/* Heading + tabs */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}>Job Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>Track and manage your open positions and recruitment funnel.</p>
        </div>

        <div className="flex items-center gap-2">
          {TABS.map(t => {
            const active = t.key === activeTab;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-full ${active ? 'bg-green-800 text-white' : 'bg-white border'}`}
              >
                {t.label} ({counts[t.key] ?? 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA card */}
      <div
        onClick={() => console.log('Post a new job')}
        className="border-2 border-dashed rounded-2xl p-8 mb-6 flex items-center justify-center cursor-pointer"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">+</div>
          <div className="font-semibold">Post a New Job</div>
          <div className="text-sm" style={{ color: 'var(--text-light)' }}>Reach thousands of creative talents in the region</div>
        </div>
      </div>

      {/* Job list */}
      <div className="space-y-4">
        {filtered.map(job => (
          <RecruiterJobRow key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
