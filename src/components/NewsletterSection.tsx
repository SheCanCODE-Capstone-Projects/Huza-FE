import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      style={{ background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%)' }}
      className="py-16"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div
          style={{ background: 'rgba(255,255,255,0.1)' }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Mail size={26} className="text-white" />
        </div>
        <h2 style={{ fontFamily: 'var(--heading)', letterSpacing: '-0.5px' }} className="text-3xl font-bold text-white mb-3">
          Never Miss a Design Job
        </h2>
        <p className="text-white/70 text-base mb-8 leading-relaxed">
          Get the latest design opportunities delivered straight to your inbox. Curated weekly for creative professionals.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-white font-semibold text-base">
            <CheckCircle size={22} style={{ color: 'var(--sage-300)' }} />
            You're subscribed! Check your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontFamily: 'var(--sans)' }}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none placeholder:text-white/50 focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              style={{ background: 'var(--gold)', fontFamily: 'var(--sans)' }}
              className="text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
