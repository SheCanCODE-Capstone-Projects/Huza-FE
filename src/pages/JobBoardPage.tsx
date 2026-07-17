import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import CategoryGrid from '../components/CategoryGrid';
import JobListings from '../components/JobListings';
import CompanySpotlight from '../components/CompanySpotlight';
import Testimonials from '../components/Testimonials';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import type { Filters } from '../components/FilterSidebar';

const DEFAULT_FILTERS: Filters = {
  jobType: [],
  experience: [],
  workMode: [],
  salary: 'Any',
  datePosted: 'Any time',
  category: 'All',
};

export default function JobBoardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('All Locations');
  const [searchCategory, setSearchCategory] = useState('All Categories');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const handleSearch = (q: string, loc: string, cat: string) => {
    setSearchQuery(q);
    setSearchLocation(loc);
    setSearchCategory(cat);
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (name: string) => {
    setFilters(f => ({ ...f, category: name }));
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <HeroSection onSearch={handleSearch} />
      <StatsSection />
      <CategoryGrid onCategoryClick={handleCategoryClick} />
      <div id="job-listings">
        <JobListings
          searchQuery={searchQuery}
          searchLocation={searchLocation}
          searchCategory={searchCategory}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
      <CompanySpotlight />
      <Testimonials />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
