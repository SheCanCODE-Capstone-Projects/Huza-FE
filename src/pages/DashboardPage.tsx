import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StatsSection from '../components/StatsSection';
import CompanySpotlight from '../components/CompanySpotlight';
import { JOBS } from './jobBoardData';

export default function DashboardPage() {
  const recentJobs = JOBS.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1
          style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}
          className="text-2xl sm:text-3xl font-bold mb-1"
        >
          Welcome back, John
        </h1>
        <p style={{ color: 'var(--text-light)' }} className="text-sm sm:text-base">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Recent Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}
            className="text-lg font-bold"
          >
            Recent Opportunities
          </h2>
          <Link
            to="/jobs"
            className="flex items-center gap-1 text-sm font-medium cursor-pointer"
            style={{ color: 'var(--primary-700)' }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {recentJobs.map(job => (
            <div
              key={job.id}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  style={{ background: job.companyColor + '18', color: job.companyColor }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                >
                  {job.companyInitials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
                    {job.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-light)' }}>
                    {job.company} · {job.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  style={{
                    background: 'var(--sage-200)',
                    color: 'var(--primary-700)',
                  }}
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                >
                  {job.jobType}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-light)' }}>
                  {job.salary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Spotlight */}
      <CompanySpotlight />
    </div>
  );
}
