import React from 'react';
import type { Job } from '../pages/jobBoardData';

interface Props {
  job: Job;
}

export default function RecruiterJobRow({ job }: Props) {
  const status = job.status ?? 'Active';

  return (
    <div
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      className="rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: job.companyColor }}
        >
          {job.companyInitials}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{job.title}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: status === 'Active' ? 'var(--success)10' : 'var(--border)', color: status === 'Active' ? 'var(--success)' : 'var(--text-light)' }}
            >
              • {status}
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
            {status === 'Closed' && job.filedBy ? `Filed by ${job.filedBy}` : `${job.posted} · ${job.location}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 ml-auto">
        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>{job.applicantCount ?? 0}</div>
            <div className="text-xs" style={{ color: 'var(--text-light)' }}>APPLICANTS</div>
          </div>
          <div>
            <div className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>{job.inReviewCount ?? 0}</div>
            <div className="text-xs" style={{ color: 'var(--text-light)' }}>IN REVIEW</div>
          </div>
        </div>

        <div>
          {status === 'Closed' ? (
            <button className="bg-green-800 text-white px-4 py-2 rounded-full">View History</button>
          ) : (
            <button className="bg-green-800 text-white px-4 py-2 rounded-full">Applicants</button>
          )}
        </div>
      </div>
    </div>
  );
}
