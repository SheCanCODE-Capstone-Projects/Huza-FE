import { STATS } from '../pages/jobBoardData';

export default function StatsSection() {
  return (
    <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              className="rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
              >
              <div style={{ color: 'var(--primary-700)', fontFamily: 'var(--heading)' }} className="text-3xl font-bold mb-1">
                {s.value}
              </div>
              <div style={{ color: 'var(--text-light)' }} className="text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
