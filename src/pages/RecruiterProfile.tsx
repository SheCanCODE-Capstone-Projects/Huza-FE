import { useState } from "react";
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

type JobStatus = "Active" | "Paused" | "Closed";

interface JobPosting {
  title: string;
  posted: string;
  applicants: number;
  status: JobStatus;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10", to: "/recruiter/dashboard" },
  { label: "Jobs", icon: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01", to: "/recruiter/jobs" },
  { label: "Creatives", icon: "M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-1.13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", to: "/recruiter/creatives" },
  { label: "Applicants", icon: "M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", to: "/recruiter/applicants" },
  { label: "Profile", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0", active: true, to: "/recruiter/profile" },
];

const JOBS: JobPosting[] = [
  { title: "Senior Graphic Designer", posted: "Jul 12, 2026", applicants: 24, status: "Active" },
  { title: "Video Editor", posted: "Jul 08, 2026", applicants: 17, status: "Active" },
  { title: "Brand Strategist", posted: "Jun 30, 2026", applicants: 9, status: "Paused" },
  { title: "Motion Designer", posted: "Jun 18, 2026", applicants: 31, status: "Closed" },
];

function statusColor(status: JobStatus) {
  if (status === "Active") return { bg: "rgba(15,81,50,0.12)", fg: GREEN };
  if (status === "Paused") return { bg: "rgba(184,134,11,0.15)", fg: GOLD };
  return { bg: "rgba(178,34,34,0.12)", fg: "#B22222" };
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function MetaRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <span className="truncate">{text}</span>
    </div>
  );
}

export default function RecruiterProfile() {
  const navigate = useNavigate();
  const { profile } = useRecruiter();
  console.log("RecruiterStore profile:", profile);
  const [finishing, setFinishing] = useState<boolean>(false);

  async function handleEditProfile() {

    navigate("/recruiter/profile/edit");
  }

  function handleViewPublicPage() {
  
    navigate(`/recruiter/public/${profile.publicSlug}`);
  }

  async function handleFinishSetup() {
    setFinishing(true);
    
    setFinishing(false);
    navigate("/recruiter/profile/setup");
  }

  async function handleLogout() {
    
    navigate("/login");
  }

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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={
                item.active
                  ? { backgroundColor: GREEN, color: "#FFFFFF" }
                  : { backgroundColor: "transparent", color: INK }
              }
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!item.active) e.currentTarget.style.backgroundColor = GREEN_SOFT;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!item.active) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <NavIcon d={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${CREAM}` }}>
          <button
            onClick={handleLogout}
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
                placeholder="Search applications..."
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

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* A. Recruiter Profile Card */}
            <section
              className="rounded-2xl p-6 shadow-sm"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shrink-0"
                  style={{ backgroundColor: GREEN }}
                >
                  {profile.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>{profile.fullName}</h2>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: GREEN_SOFT, color: GREEN }}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1" style={{ color: MUTED }}>{profile.title}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                    <MetaRow icon="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" text={profile.location} />
                    <MetaRow icon="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" text={profile.joinDate} />
                    <MetaRow icon="M4 4h16v16H4zM4 6l8 6 8-6" text={profile.email} />
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={handleEditProfile}
                    className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: GREEN }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN_HOVER)}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN)}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleViewPublicPage}
                    className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GREEN}`, color: GREEN }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN_SOFT)}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                  >
                    View Public Page
                  </button>
                </div>
              </div>
            </section>

            {/* B + C row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* B. Company Information Card */}
              <section
                className="rounded-2xl p-6 shadow-sm"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
              >
                <h3 className="text-base font-semibold mb-4" style={{ color: INK }}>Company Information</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                    style={{ backgroundColor: GREEN }}
                  >
                    {profile.companyInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold" style={{ color: INK }}>{profile.companyName}</p>
                    <p className="text-xs" style={{ color: MUTED }}>Parent: {profile.parentOrg}</p>
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: MUTED }}>
                  {profile.companyDescription}
                </p>
                <div className="space-y-2.5">
                  <MetaRow icon="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-1.13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" text={profile.employees} />
                  <MetaRow icon="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" text={profile.location} />
                  <MetaRow icon="M13.5 10.5l7 7M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" text={profile.website} />
                </div>
              </section>

              {/* C. Jobs Posted Card */}
              <section
                className="rounded-2xl p-6 shadow-sm"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold" style={{ color: INK }}>Jobs Posted</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: GREEN_SOFT, color: GREEN }}>
                    {JOBS.length} total
                  </span>
                </div>
                <ul className="space-y-3">
                  {JOBS.map((job) => {
                    const sc = statusColor(job.status);
                    return (
                      <li
                        key={job.title}
                        className="flex items-center gap-3 rounded-xl p-3"
                        style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}` }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: INK }}>{job.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: MUTED }}>Posted {job.posted} · {job.applicants} applicants</p>
                        </div>
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                          style={{ backgroundColor: sc.bg, color: sc.fg }}
                        >
                          {job.status}
                        </span>
                        <button className="p-1 rounded-md shrink-0" style={{ color: MUTED }} aria-label="More options">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            {/* D. Profile Completion Card */}
            <section
              className="rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
            >
              <div className="relative w-28 h-28 shrink-0">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={CREAM} strokeWidth="3.6" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none" stroke={GREEN} strokeWidth="3.6"
                    strokeDasharray="100" strokeDashoffset="20" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: GREEN }}>80%</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base font-semibold" style={{ color: INK }}>Complete your profile</h3>
                <p className="text-sm mt-1" style={{ color: MUTED }}>
                  Finish setting up your profile to improve visibility and attract more qualified candidates.
                </p>
              </div>
              <button
                onClick={handleFinishSetup}
                disabled={finishing}
                className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors shrink-0 disabled:opacity-70"
                style={{ backgroundColor: finishing ? "#6B6B65" : GREEN }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!finishing) e.currentTarget.style.backgroundColor = GREEN_HOVER; }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (!finishing) e.currentTarget.style.backgroundColor = GREEN; }}
              >
                {finishing ? "Setting up..." : "Finish Setup"}
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
  
}
