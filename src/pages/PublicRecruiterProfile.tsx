import { useNavigate, useParams } from "react-router-dom";
import { useRecruiter } from "../stores/recruiterStore";

const GREEN = "#0F5132";
const GREEN_SOFT = "rgba(15, 81, 50, 0.08)";
const CREAM = "#E5E3DD";
const INK = "#1A1A1A";
const MUTED = "#6B6B65";
const SURFACE = "#FAFAF8";
const MINT = "#F3F8F4";

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

export default function PublicRecruiterProfile() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { profile } = useRecruiter();

  return (
    <div
      style={{ backgroundImage: "url('/Background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      className="min-h-screen py-10 px-4"
    >
      <div
        className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", border: `1px solid ${CREAM}` }}
      >
        {/* Banner */}
        <div className="h-28" style={{ backgroundColor: GREEN }} />

        <div className="px-8 pb-8 -mt-12">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4"
            style={{ backgroundColor: GREEN, borderColor: "#FFFFFF" }}
          >
            {profile.initials}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>{profile.fullName}</h1>
              <p className="text-sm font-medium" style={{ color: MUTED }}>{profile.title}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                <MetaRow icon="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" text={profile.location} />
                <MetaRow icon="M4 4h16v16H4zM4 6l8 6 8-6" text={profile.email} />
                <MetaRow icon="M3 5h18M3 10h18M3 15h18M3 20h18" text={profile.phone} />
              </div>
            </div>
            <button
              onClick={() => navigate("/recruiter/profile")}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
              style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = GREEN_SOFT)}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = SURFACE)}
            >
              Back to Dashboard
            </button>
          </div>

          {/* About */}
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: MUTED }}>About</h2>
            <p className="text-sm leading-relaxed" style={{ color: INK }}>{profile.bio}</p>
          </section>

          {/* Company */}
          <section className="mt-6 rounded-xl p-5" style={{ backgroundColor: MINT, border: `1px solid ${CREAM}` }}>
            <div className="flex items-center gap-4">
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
            <p className="text-sm mt-4 leading-relaxed" style={{ color: INK }}>{profile.companyDescription}</p>
            <div className="mt-4 space-y-2.5">
              <MetaRow icon="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-1.13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" text={profile.employees} />
              <MetaRow icon="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" text={profile.location} />
              <MetaRow icon="M13.5 10.5l7 7M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" text={profile.website} />
            </div>
          </section>

          <p className="text-center text-xs mt-6" style={{ color: MUTED }}>
            Public profile {slug ? `· ${slug}` : ""} · Powered by Umuhuza
          </p>
        </div>
      </div>
    </div>
  );
}
