import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiter } from "../stores/recruiterStore";

const GREEN = "#0F5132";
const GREEN_HOVER = "#0B3D26";
const GREEN_SOFT = "rgba(15, 81, 50, 0.08)";
const CREAM = "#E5E3DD";
const INK = "#1A1A1A";
const MUTED = "#6B6B65";
const SURFACE = "#FAFAF8";
const MINT = "#F3F8F4";
const GOLD = "#B8860B";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10", to: "/recruiter/dashboard" },
  { label: "Jobs", icon: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01", to: "/recruiter/jobs" },
  { label: "Creatives", icon: "M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-1.13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", to: "/recruiter/creatives" },
  { label: "Applicants", icon: "M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", to: "/recruiter/applicants" },
  { label: "Profile", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0", to: "/recruiter/profile" },
  { label: "Settings", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z", to: "/recruiter/settings" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

async function handleLogout(navigate: ReturnType<typeof useNavigate>) {
  // TODO: uncomment when backend is ready
  // try {
  //   await axios.post("/api/auth/logout");
  // } catch (err) {
  //   console.error(err);
  // }
  navigate("/login");
}

export default function DashboardLayout({
  active,
  searchPlaceholder = "Search...",
  children,
}: {
  active: string;
  searchPlaceholder?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { profile } = useRecruiter();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: MINT }}>
      {/* Left Sidebar Navigation */}
      <aside
        className="w-64 shrink-0 hidden md:flex flex-col p-5"
        style={{ backgroundColor: "#FFFFFF", borderRight: `1px solid ${CREAM}` }}
      >
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: GREEN }}>Umuhuza</h1>
          <p className="text-xs font-medium mt-0.5" style={{ color: MUTED }}>Recruiter Dashboard</p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === active;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={
                  isActive
                    ? { backgroundColor: GREEN, color: "#FFFFFF" }
                    : { backgroundColor: "transparent", color: INK }
                }
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = GREEN_SOFT;
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <NavIcon d={item.icon} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${CREAM}` }}>
          <button
            onClick={() => handleLogout(navigate)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors"
            style={{ color: "#B22222" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = "rgba(178,34,34,0.08)")}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header
          className="flex items-center gap-4 px-6 py-4"
          style={{ backgroundColor: "#FFFFFF", borderBottom: `1px solid ${CREAM}` }}
        >
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: MUTED }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
              </svg>
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="bg-transparent outline-none w-full"
                style={{ color: INK }}
              />
            </div>
          </div>

          <button
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: INK }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN_SOFT)}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-5-5.9V4a1 1 0 1 0-2 0v1.1A6 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
          </button>

          <button
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: GREEN }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN_HOVER)}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN)}
          >
            Post a Job
          </button>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 cursor-pointer"
            style={{ backgroundColor: GREEN }}
            onClick={() => navigate("/recruiter/profile")}
          >
            {profile.initials}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}