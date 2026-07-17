import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

export interface Filters {
  jobType: string[];
  experience: string[];
  workMode: string[];
  salary: string;
  datePosted: string;
  category: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const JOB_TYPES = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'];
const EXPERIENCE = ['Junior', 'Mid-Level', 'Senior', 'Lead'];
const WORK_MODES = ['Remote', 'Hybrid', 'On-site'];
const SALARY_RANGES = ['Any', 'Under $60k', '$60k–$90k', '$90k–$120k', '$120k+'];
const DATE_POSTED = ['Any time', 'Last 24 hours', 'Last 3 days', 'Last week', 'Last month'];
const CATEGORIES = ['All', 'UI/UX Design', 'Graphic Design', 'Product Design', 'Branding', 'Motion Design', 'Illustration', 'Web Design', '3D Design'];

function toggle(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function CheckGroup({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="mb-6">
      <h4 style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }} className="text-sm font-semibold mb-3">{label}</h4>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              style={{ accentColor: 'var(--primary-700)' }}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span style={{ color: 'var(--text-light)' }} className="text-sm group-hover:text-[var(--text)] transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SelectGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-6">
      <h4 style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }} className="text-sm font-semibold mb-3">{label}</h4>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ background: 'var(--sage-100)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)' }}
        className="w-full text-sm rounded-xl px-3 py-2.5 outline-none focus:border-[var(--primary-700)] transition-colors"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SidebarContent({ filters, onChange, onClose }: Props & { onClose?: () => void }) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} className="rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)' }} className="font-bold text-base">Filters</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onChange({ jobType: [], experience: [], workMode: [], salary: 'Any', datePosted: 'Any time', category: 'All' })}
            style={{ color: 'var(--text-light)' }}
            className="text-xs hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            Clear all
          </button>
          {onClose && (
            <button onClick={onClose} style={{ color: 'var(--text-light)' }} className="hover:text-[var(--text)] cursor-pointer">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <CheckGroup label="Job Type" options={JOB_TYPES} selected={filters.jobType} onToggle={v => update({ jobType: toggle(filters.jobType, v) })} />
      <CheckGroup label="Experience Level" options={EXPERIENCE} selected={filters.experience} onToggle={v => update({ experience: toggle(filters.experience, v) })} />
      <CheckGroup label="Work Mode" options={WORK_MODES} selected={filters.workMode} onToggle={v => update({ workMode: toggle(filters.workMode, v) })} />
      <SelectGroup label="Salary Range" options={SALARY_RANGES} value={filters.salary} onChange={v => update({ salary: v })} />
      <SelectGroup label="Date Posted" options={DATE_POSTED} value={filters.datePosted} onChange={v => update({ datePosted: v })} />
      <SelectGroup label="Design Category" options={CATEGORIES} value={filters.category} onChange={v => update({ category: v })} />
    </div>
  );
}

export default function FilterSidebar({ filters, onChange }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ background: 'var(--primary-700)', fontFamily: 'var(--sans)' }}
          className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[var(--primary-900)] transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative ml-auto w-80 max-w-full h-full overflow-y-auto p-4" style={{ background: 'var(--background)' }}>
            <SidebarContent filters={filters} onChange={onChange} onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-6">
          <SidebarContent filters={filters} onChange={onChange} />
        </div>
      </aside>
    </>
  );
}
