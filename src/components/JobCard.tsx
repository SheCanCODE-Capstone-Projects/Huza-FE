import { useState } from 'react';
import { MapPin, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Job } from '../pages/jobBoardData';

const MODE_COLORS: Record<string, string> = {
  Remote: 'var(--success)',
  Hybrid: 'var(--olive)',
  'On-site': 'var(--gold)',
};

const TYPE_BG: Record<string, string> = {
  'Full Time': 'var(--sage-200)',
  'Part Time': 'var(--sage-100)',
  Contract: '#FEF3C7',
  Freelance: '#EDE9FE',
  Internship: '#FEE2E2',
};

export default function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);

  return (
    <article
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      className="rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            style={{ background: job.companyColor + '18', color: job.companyColor }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
          >
            {job.companyInitials}
          </div>
          <div>
            <h3 style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }} className="font-semibold text-base leading-tight">{job.title}</h3>
            <p style={{ color: 'var(--text-light)' }} className="text-sm mt-0.5">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => setSaved(s => !s)}
          style={{ color: saved ? 'var(--gold)' : 'var(--text-light)' }}
          className="hover:scale-110 transition-transform duration-150 cursor-pointer mt-0.5"
          aria-label={saved ? 'Unsave job' : 'Save job'}
        >
          {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--text-light)' }}>
        <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
        <span className="flex items-center gap-1"><DollarSign size={14} />{job.salary}</span>
        <span className="flex items-center gap-1"><Clock size={14} />{job.posted}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span
          style={{ background: MODE_COLORS[job.workMode] + '18', color: MODE_COLORS[job.workMode], border: `1px solid ${MODE_COLORS[job.workMode]}40` }}
          className="text-xs font-semibold px-3 py-1 rounded-full"
        >
          {job.workMode}
        </span>
        <span
          style={{ background: TYPE_BG[job.jobType], color: 'var(--text)' }}
          className="text-xs font-medium px-3 py-1 rounded-full"
        >
          {job.jobType}
        </span>
        <span
          style={{ background: 'var(--sage-100)', color: 'var(--text-light)' }}
          className="text-xs px-3 py-1 rounded-full"
        >
          {job.experience}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {job.skills.map(skill => (
          <span
            key={skill}
            style={{ background: 'var(--sage-100)', color: 'var(--primary-700)', border: '1px solid var(--sage-300)' }}
            className="text-xs px-2.5 py-1 rounded-lg font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Apply */}
      <button
        style={{ background: 'var(--primary-700)', fontFamily: 'var(--sans)' }}
        className="mt-auto w-full text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[var(--primary-900)] transition-colors duration-200 cursor-pointer"
      >
        Apply Now
      </button>
    </article>
  );
}
