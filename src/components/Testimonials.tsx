import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../pages/jobBoardData';

export default function Testimonials() {
  return (
    <section style={{ background: 'var(--surface)' }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 style={{ color: 'var(--primary-900)', fontFamily: 'var(--heading)', letterSpacing: '-0.5px' }} className="text-3xl font-bold mb-3">
            Designer Success Stories
          </h2>
          <p style={{ color: 'var(--text-light)' }} className="text-base">Real designers, real results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              style={{ background: 'var(--sage-100)', border: '1px solid var(--sage-300)' }}
              className="rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <Quote size={24} style={{ color: 'var(--gold)' }} />
              <p style={{ color: 'var(--text)' }} className="text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid var(--sage-300)' }}>
                <div
                  style={{ background: 'var(--primary-700)', color: 'white' }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ color: 'var(--text)', fontFamily: 'var(--heading)' }} className="text-sm font-semibold">{t.name}</div>
                  <div style={{ color: 'var(--text-light)' }} className="text-xs">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
