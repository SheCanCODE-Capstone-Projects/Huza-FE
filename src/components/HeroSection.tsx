import { useState } from 'react';
import { Search, MapPin, ChevronDown, Briefcase, Users, CheckCircle2 } from 'lucide-react';
import { JOBS } from '../pages/jobBoardData';

const LOCATIONS = ['All Locations', 'Remote', 'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'London, UK', 'Toronto, Canada'];
const DESIGN_CATS = ['All Categories', 'UI/UX Design', 'Graphic Design', 'Product Design', 'Branding', 'Motion Design', 'Illustration', 'Web Design', '3D Design'];

interface Props {
  onSearch: (q: string, loc: string, cat: string) => void;
}

export default function HeroSection({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [category, setCategory] = useState('All Categories');

  return (
    <section
      style={{ background: 'linear-gradient(135deg, var(--sage-100) 0%, var(--sage-200) 60%, var(--sage-300) 100%)' }}
      className="relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div style={{ background: 'var(--sage-300)', opacity: 0.4 }} className="absolute -top-16 -left-16 w-72 h-72 rounded-full blur-3xl" />
        <div style={{ background: 'var(--sage-400)', opacity: 0.3 }} className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: text + search */}
        <div className="flex-1 animate-fade-in-up">
          <span
            style={{
              background: 'var(--surface)',
              color: 'var(--primary-700)',
              border: '1px solid var(--sage-400)',
              boxShadow: '0 1px 4px rgba(46,106,70,0.10)',
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <Briefcase size={14} strokeWidth={2.5} />
            Design Jobs Platform
          </span>
          <h1
            style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)', letterSpacing: '-1.5px' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
          >
            Find Your Next<br />
            <span style={{ color: 'var(--primary-700)' }}>Design Opportunity</span>
          </h1>
          <p style={{ color: 'var(--text-light)' }} className="text-lg mb-10 max-w-xl leading-relaxed">
            Connect with top recruiters, explore creative opportunities, and discover jobs that match your skills and portfolio.
          </p>

          {/* Search bar */}
          <div
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            className="flex flex-col sm:flex-row rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Keyword */}
            <div className="flex items-center flex-1 px-4 py-3 gap-3">
              <Search size={18} style={{ color: 'var(--text-light)' }} className="shrink-0" />
              <input
                type="text"
                placeholder="Job title, skill, or keyword…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}
                className="flex-1 outline-none text-sm bg-transparent placeholder:text-[var(--text-light)]"
              />
            </div>

            <div style={{ background: 'var(--border)' }} className="w-px hidden sm:block self-stretch" />

            {/* Location */}
            <div className="flex items-center px-4 py-3 gap-2 relative">
              <MapPin size={16} style={{ color: 'var(--text-light)' }} className="shrink-0" />
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}
                className="outline-none text-sm bg-transparent appearance-none pr-5 cursor-pointer"
              >
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown size={14} style={{ color: 'var(--text-light)' }} className="absolute right-3 pointer-events-none" />
            </div>

            <div style={{ background: 'var(--border)' }} className="w-px hidden sm:block self-stretch" />

            {/* Category */}
            <div className="flex items-center px-4 py-3 gap-2 relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ color: 'var(--text)', fontFamily: 'var(--sans)' }}
                className="outline-none text-sm bg-transparent appearance-none pr-5 cursor-pointer"
              >
                {DESIGN_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} style={{ color: 'var(--text-light)' }} className="absolute right-3 pointer-events-none" />
            </div>

            <div className="p-2">
              <button
                onClick={() => onSearch(query, location, category)}
                style={{ background: 'var(--primary-700)', fontFamily: 'var(--sans)' }}
                className="w-full sm:w-auto text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200 hover:bg-[var(--primary-900)] cursor-pointer"
              >
                Search Jobs
              </button>
            </div>
          </div>

          <p style={{ color: 'var(--text-light)' }} className="text-sm mt-4">
            Popular: <span className="font-medium" style={{ color: 'var(--primary-700)' }}>UI/UX Design · Product Design · Branding · Motion</span>
          </p>
        </div>

        {/* Right: job preview panel */}
        <div className="hidden lg:flex flex-1 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

// Figma (purple), Stripe (indigo), Airbnb (red) — maximally distinct brand colors
const PREVIEW_JOBS = [JOBS[0], JOBS[2], JOBS[3]];

const MODE_COLOR: Record<string, string> = {
  Remote:   'var(--success)',
  Hybrid:   'var(--olive)',
  'On-site':'var(--gold)',
};

function HeroPreview() {
  return (
    <div className="relative w-full max-w-md">

      {/* Browser chrome */}
      <div
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        className="rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Title bar */}
        <div style={{ background: 'var(--primary-700)' }} className="flex items-center justify-between px-4 py-3">
          <div className="flex gap-1.5">
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <span key={c} style={{ background: c }} className="w-3 h-3 rounded-full opacity-80" />
            ))}
          </div>
          <div
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
            className="text-xs px-3 py-1 rounded-full"
          >
            huza.io/jobs
          </div>
          <div style={{ background: 'var(--gold)' }} className="text-white text-xs font-semibold px-3 py-1 rounded-full">
            Post a Job
          </div>
        </div>

        {/* Section label */}
        <div style={{ background: 'var(--sage-100)', borderBottom: '1px solid var(--border)' }} className="px-4 py-2.5 flex items-center justify-between">
          <span style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)' }} className="text-xs font-bold tracking-wide uppercase">
            Featured Jobs
          </span>
          <span style={{ color: 'var(--text-light)' }} className="text-xs">3 of 5,000+</span>
        </div>

        {/* Job cards */}
        <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
          {PREVIEW_JOBS.map((job, i) => (
            <div
              key={job.id}
              style={{ background: i === 0 ? 'var(--sage-100)' : 'var(--surface)' }}
              className="flex gap-3 px-4 py-3.5"
            >
              {/* Company avatar */}
              <div
                style={{ background: job.companyColor + '18', color: job.companyColor, border: `1.5px solid ${job.companyColor}40` }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
              >
                {job.companyInitials}
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Title row */}
                <div className="flex items-center gap-2 mb-0.5">
                  <p
                    style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }}
                    className="text-sm font-semibold truncate"
                  >
                    {job.title}
                  </p>
                  {/* ✓ Matched chip — inline on first card only */}
                  {i === 0 && (
                    <span
                      style={{ background: 'var(--primary-700)', color: 'white' }}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                    >
                      <CheckCircle2 size={9} strokeWidth={3} />
                      Matched
                    </span>
                  )}
                </div>

                {/* Company · location */}
                <p style={{ color: 'var(--text-light)' }} className="text-xs truncate mb-2">
                  {job.company} · {job.location}
                </p>

                {/* Skill tags — first 2 only */}
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 2).map(skill => (
                    <span
                      key={skill}
                      style={{ background: 'var(--sage-200)', color: 'var(--primary-700)', border: '1px solid var(--sage-300)' }}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right meta: salary + workMode */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  style={{ color: 'var(--primary-700)', fontFamily: 'var(--heading)' }}
                  className="text-xs font-bold whitespace-nowrap"
                >
                  {job.salary}
                </span>
                <span
                  style={{
                    background: MODE_COLOR[job.workMode] + '18',
                    color: MODE_COLOR[job.workMode],
                    border: `1px solid ${MODE_COLOR[job.workMode]}40`,
                  }}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  {job.workMode}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer strip */}
        <div style={{ background: 'var(--sage-100)', borderTop: '1px solid var(--border)' }} className="px-4 py-2.5 flex items-center justify-between">
          <span style={{ color: 'var(--text-light)' }} className="text-xs">Updated just now</span>
          <span style={{ color: 'var(--primary-700)' }} className="text-xs font-semibold cursor-pointer hover:underline">
            View all jobs →
          </span>
        </div>
      </div>

      {/* Badge: 15k Designers — anchored to bottom-left corner */}
      <div
        style={{ background: 'var(--gold)', boxShadow: '0 4px 14px rgba(166,124,46,0.35)' }}
        className="absolute -bottom-4 -left-4 flex items-center gap-1.5 text-white text-xs font-bold px-3.5 py-2.5 rounded-2xl"
      >
        <Users size={13} strokeWidth={2.5} />
        15k Designers
      </div>

    </div>
  );
}
