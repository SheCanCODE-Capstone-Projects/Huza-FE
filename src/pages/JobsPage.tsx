import { useState } from 'react';
import { MessageSquare, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { JOBS } from './jobBoardData';

type Tab = 'jobs' | 'messages';

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
}

const MESSAGES: MessageItem[] = [
  { id: 1, from: 'Figma Recruiting', preview: 'We were impressed with your portfolio...', time: '2h ago', unread: true },
  { id: 2, from: 'Notion HR', preview: 'Your application for Product Designer is under review.', time: '1d ago', unread: true },
  { id: 3, from: 'Stripe Talent', preview: 'Would you be available for a quick chat this week?', time: '3d ago', unread: false },
];

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Full Time': { bg: 'var(--sage-200)', text: 'var(--primary-700)', border: 'var(--sage-300)' },
  'Part Time': { bg: 'var(--sage-100)', text: 'var(--text-light)', border: 'var(--sage-300)' },
  Contract: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
  Freelance: { bg: '#EDE9FE', text: '#5B21B6', border: '#A78BFA' },
  Internship: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
};

function isNewJob(posted: string): boolean {
  return ['1 day ago', '2 days ago'].includes(posted);
}

export default function JobsPage() {
  const [tab, setTab] = useState<Tab>('jobs');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}
            className="text-2xl sm:text-3xl font-bold"
          >
            {tab === 'jobs' ? 'Browse Jobs' : 'Messages'}
          </h1>
          <p style={{ color: 'var(--text-light)' }} className="text-sm mt-1">
            {tab === 'jobs'
              ? `${JOBS.length} positions available for you`
              : `${MESSAGES.filter(m => m.unread).length} unread messages`}
          </p>
        </div>

        {/* Tab toggle */}
        <div
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          className="inline-flex rounded-xl p-1"
        >
          <button
            onClick={() => setTab('jobs')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
            style={{
              background: tab === 'jobs' ? 'var(--primary-700)' : 'transparent',
              color: tab === 'jobs' ? '#FFFFFF' : 'var(--text-light)',
            }}
          >
            <Briefcase size={16} />
            <span className="hidden sm:inline">Jobs</span>
          </button>
          <button
            onClick={() => setTab('messages')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
            style={{
              background: tab === 'messages' ? 'var(--primary-700)' : 'transparent',
              color: tab === 'messages' ? '#FFFFFF' : 'var(--text-light)',
            }}
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Messages</span>
            {MESSAGES.filter(m => m.unread).length > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{
                  background: tab === 'messages' ? '#FFFFFF' : 'var(--primary-700)',
                  color: tab === 'messages' ? 'var(--primary-700)' : '#FFFFFF',
                }}
              >
                {MESSAGES.filter(m => m.unread).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Jobs tab */}
      {tab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {JOBS.map(job => {
            const colors = TYPE_COLORS[job.jobType] || TYPE_COLORS['Full Time'];
            const tagLabel = isNewJob(job.posted) && job.jobType === 'Full Time'
              ? 'NEW'
              : job.jobType.toUpperCase();

            return (
              <div
                key={job.id}
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
                    <div className="min-w-0">
                      <h3
                        style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }}
                        className="font-semibold text-base leading-tight truncate"
                      >
                        {job.title}
                      </h3>
                      <p style={{ color: 'var(--text-light)' }} className="text-sm mt-0.5 truncate">
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                  >
                    {tagLabel}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: 'var(--text-light)' }}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign size={14} />
                    {job.salary}
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
              </div>
            );
          })}
        </div>
      )}

      {/* Messages tab */}
      {tab === 'messages' && (
        <div className="space-y-3">
          {MESSAGES.map(msg => (
            <div
              key={msg.id}
              style={{
                background: 'var(--surface)',
                border: msg.unread ? '1px solid var(--primary-700)' : '1px solid var(--border)',
              }}
              className="rounded-2xl p-5 shadow-sm flex items-start gap-4 cursor-pointer hover:shadow-md transition-all duration-200"
            >
              <div
                style={{ background: 'var(--sage-200)', color: 'var(--primary-700)' }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              >
                {msg.from.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
                    {msg.from}
                  </p>
                  <span className="text-xs shrink-0" style={{ color: 'var(--text-light)' }}>
                    {msg.time}
                  </span>
                </div>
                <p className="text-sm mt-1 truncate" style={{ color: 'var(--text-light)' }}>
                  {msg.preview}
                </p>
              </div>
              {msg.unread && (
                <span
                  style={{ background: 'var(--primary-700)' }}
                  className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
