import { Layers, Globe, Link, Share2, AtSign } from 'lucide-react';

const LINKS = {
  'For Designers': ['Browse Jobs', 'Upload Portfolio', 'Career Resources', 'Salary Guide', 'Design Blog'],
  'For Recruiters': ['Post a Job', 'Search Talent', 'Pricing', 'Recruiter Tools', 'Success Stories'],
  'Company': ['About Us', 'Careers', 'Press', 'Contact', 'Privacy Policy'],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary-900)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div style={{ background: 'var(--gold)' }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Layers size={16} className="text-white" />
              </div>
              <span style={{ fontFamily: 'var(--heading)' }} className="text-white text-xl font-bold">Huza</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              The premier job board connecting creative designers with world-class companies.
            </p>
            <div className="flex gap-3">
              {[Globe, Link, Share2, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 style={{ fontFamily: 'var(--heading)' }} className="text-white text-sm font-semibold mb-4">{heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-white/50 text-sm hover:text-white transition-colors duration-150">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Huza. All rights reserved.</p>
          <div className="flex gap-5">
            {['Terms', 'Privacy', 'Cookies'].map(l => (
              <a key={l} href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
