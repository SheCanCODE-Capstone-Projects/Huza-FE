import { useMemo } from 'react';
import { Briefcase } from 'lucide-react';
import JobCard from './JobCard';
import FilterSidebar, { type Filters } from './FilterSidebar';
import { JOBS } from '../pages/jobBoardData';

interface Props {
  searchQuery: string;
  searchLocation: string;
  searchCategory: string;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
}

export default function JobListings({ searchQuery, searchLocation, searchCategory, filters, onFiltersChange }: Props) {
  const filtered = useMemo(() => {
    return JOBS.filter(job => {
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && !job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
      if (searchLocation && searchLocation !== 'All Locations' && !job.location.toLowerCase().includes(searchLocation.toLowerCase()) && job.workMode !== searchLocation) return false;
      if (searchCategory && searchCategory !== 'All Categories' && job.category !== searchCategory) return false;
      if (filters.jobType.length && !filters.jobType.includes(job.jobType)) return false;
      if (filters.experience.length && !filters.experience.includes(job.experience)) return false;
      if (filters.workMode.length && !filters.workMode.includes(job.workMode)) return false;
      if (filters.category !== 'All' && filters.category && job.category !== filters.category) return false;
      return true;
    });
  }, [searchQuery, searchLocation, searchCategory, filters]);

  return (
    <section style={{ background: 'var(--background)' }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)', letterSpacing: '-0.5px' }} className="text-3xl font-bold mb-2">
            Featured Jobs
          </h2>
          <p style={{ color: 'var(--text-light)' }} className="text-sm">{filtered.length} opportunities found</p>
        </div>

        <div className="flex gap-8 items-start">
          <FilterSidebar filters={filters} onChange={onFiltersChange} />

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Briefcase size={48} style={{ color: 'var(--sage-400)' }} />
                <p style={{ color: 'var(--text-light)' }} className="text-base">No jobs match your filters. Try adjusting your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
