import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Briefcase,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/applications', label: 'Applications', icon: Briefcase },
  { path: '/jobs', label: 'Jobs', icon: MessageSquare },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => !isOpen && onClose()}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 rounded-lg cursor-pointer"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
        aria-label="Open menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-[260px]
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Brand */}
          <div className="px-6 py-5 flex items-center justify-between">
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
              <div
                style={{ background: 'var(--primary-700)' }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span
                style={{ fontFamily: 'var(--heading)', color: 'var(--text)' }}
                className="text-lg font-bold"
              >
                Huza
              </span>
            </Link>
            {/* Close button on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md cursor-pointer"
              style={{ color: 'var(--text-light)' }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer"
                  style={{
                    background: isActive ? 'var(--primary-700)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-light)',
                  }}
                >
                  <item.icon
                    size={18}
                    style={{ color: isActive ? '#FFFFFF' : 'var(--text-light)' }}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4">
            <div
              style={{ background: 'var(--sage-100)', border: '1px solid var(--sage-300)' }}
              className="rounded-xl p-4"
            >
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--primary-700)' }}>
                Upgrade to Pro
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-light)' }}>
                Unlock exclusive jobs and priority support.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
