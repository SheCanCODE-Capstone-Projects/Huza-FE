import { ArrowRight } from 'lucide-react';
import { COMPANIES } from '../pages/jobBoardData';

export default function CompanySpotlight() {
  return (
    <section style={{ background: 'var(--sage-100)' }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)', letterSpacing: '-0.5px' }} className="text-3xl font-bold mb-3">
            Companies Hiring Now
          </h2>
          <p style={{ color: 'var(--text-light)' }} className="text-base">Top design-forward companies actively looking for talent</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPANIES.map(company => (
            <div
              key={company.id}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              className="rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  style={{ background: company.color + '18', color: company.color }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                >
                  {company.initials}
                </div>
                <div>
                  <h3 style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }} className="font-semibold text-base">{company.name}</h3>
                  <span
                    style={{ background: 'var(--sage-200)', color: 'var(--primary-700)' }}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {company.openJobs} open roles
                  </span>
                </div>
              </div>
              <p style={{ color: 'var(--text-light)' }} className="text-sm leading-relaxed flex-1">{company.description}</p>
              <button
                style={{ color: 'var(--primary-700)', fontFamily: 'var(--sans)' }}
                className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all duration-150 cursor-pointer"
              >
                View jobs <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
