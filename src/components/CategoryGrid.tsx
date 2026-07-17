import { Layers, PenTool, Package, Feather, Play, Brush, Monitor, Box } from 'lucide-react';
import { CATEGORIES } from '../pages/jobBoardData';

const ICON_MAP: Record<string, React.ElementType> = {
  Layers, PenTool, Package, Feather, Play, Brush, Monitor, Box,
};

interface Props {
  onCategoryClick: (name: string) => void;
}

export default function CategoryGrid({ onCategoryClick }: Props) {
  return (
    <section style={{ background: 'var(--sage-100)' }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)', letterSpacing: '-0.5px' }} className="text-3xl font-bold mb-3">
            Browse by Category
          </h2>
          <p style={{ color: 'var(--text-light)' }} className="text-base">Explore opportunities across every design discipline</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <button
                key={i}
                onClick={() => onCategoryClick(cat.name)}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer text-center"
              >
                <div
                  style={{ background: 'var(--sage-200)', color: 'var(--primary-700)' }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-[var(--primary-700)] group-hover:text-white transition-colors duration-200"
                >
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }} className="text-xs font-semibold leading-tight mb-1">{cat.name}</div>
                  <div style={{ color: 'var(--text-light)' }} className="text-xs">{cat.jobs.toLocaleString()} jobs</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
