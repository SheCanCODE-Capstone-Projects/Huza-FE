import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const GREEN = "#0F5132";
const GREEN_SOFT = "rgba(15, 81, 50, 0.08)";
const CREAM = "#E5E3DD";
const INK = "#1A1A1A";
const MUTED = "#6B6B65";
const SURFACE = "#FAFAF8";
const GOLD = "#B8860B";

type Status = "Pending" | "Interviewing" | "Hired";

interface Applicant {
  id: string;
  name: string;
  role: string;
  match: number;
  status: Status;
}

const APPLICANTS: Applicant[] = [
  { id: "1", name: "Elena Rodriguez", role: "Senior UX Designer", match: 98, status: "Interviewing" },
  { id: "2", name: "Marcus Chen", role: "Lead Full-Stack Dev", match: 85, status: "Pending" },
];

interface Message {
  from: "them" | "me";
  text: string;
  time: string;
}

const MESSAGES: Message[] = [
  { from: "them", text: "Hi, I'm following up on my application for the Lead Full-Stack role.", time: "10:24 AM" },
  { from: "me", text: "Hello Marcus! Thanks for reaching out. We're currently reviewing your portfolio.", time: "10:30 AM" },
];

function statusStyle(status: Status) {
  if (status === "Interviewing") return { bg: "rgba(15,81,50,0.12)", fg: GREEN };
  if (status === "Hired") return { bg: "rgba(15,81,50,0.12)", fg: GREEN };
  return { bg: "rgba(184,134,11,0.15)", fg: GOLD };
}

const FILTERS = ["All Jobs", "Pending", "Interviewing", "Hired"];

export default function ApplicantsPage() {
  const [filter, setFilter] = useState("All Jobs");
  const [selected, setSelected] = useState<Applicant>(APPLICANTS[1]);
  const [draft, setDraft] = useState("");

  return (
    <DashboardLayout active="Applicants" searchPlaceholder="Search artists, portfolios, or job posts...">
      <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>Applicants</h1>
      <p className="text-sm mt-1" style={{ color: MUTED }}>
        Manage and review your incoming talent pool across all active listings.
      </p>

      <div className="flex gap-2 mt-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            style={
              filter === f
                ? { backgroundColor: GREEN, color: "#FFFFFF" }
                : { backgroundColor: "#FFFFFF", color: INK, border: `1px solid ${CREAM}` }
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Table */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${CREAM}` }}>
                <th className="text-left font-semibold px-5 py-3" style={{ color: MUTED }}>APPLICANT</th>
                <th className="text-left font-semibold px-5 py-3" style={{ color: MUTED }}>APPLIED ROLE</th>
                <th className="text-left font-semibold px-5 py-3" style={{ color: MUTED }}>MATCH</th>
                <th className="text-left font-semibold px-5 py-3" style={{ color: MUTED }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {APPLICANTS.map((a) => {
                const sc = statusStyle(a.status);
                return (
                  <tr
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderBottom: `1px solid ${CREAM}`,
                      backgroundColor: selected.id === a.id ? GREEN_SOFT : "transparent",
                    }}
                  >
                    <td className="px-5 py-3 flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: GREEN }}
                      >
                        {a.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium" style={{ color: INK }}>{a.name}</span>
                    </td>
                    <td className="px-5 py-3" style={{ color: MUTED }}>{a.role}</td>
                    <td className="px-5 py-3 font-semibold" style={{ color: INK }}>{a.match}%</td>
                    <td className="px-5 py-3">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: sc.bg, color: sc.fg }}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-5 py-3 text-sm" style={{ color: MUTED }}>
            <span>1–{APPLICANTS.length} of 1,248</span>
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded-md" style={{ border: `1px solid ${CREAM}` }}>‹</button>
              <button className="w-7 h-7 rounded-md" style={{ border: `1px solid ${CREAM}` }}>›</button>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
        >
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${CREAM}` }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: GREEN }}
            >
              {selected.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: INK }}>{selected.name}</p>
              <p className="text-xs flex items-center gap-1" style={{ color: MUTED }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GREEN }} /> Online
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto" style={{ minHeight: 220 }}>
            {MESSAGES.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] rounded-2xl px-3 py-2 text-sm"
                  style={
                    m.from === "me"
                      ? { backgroundColor: GREEN, color: "#FFFFFF" }
                      : { backgroundColor: SURFACE, color: INK }
                  }
                >
                  <p>{m.text}</p>
                  <p className="text-[10px] mt-1 opacity-70">{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3" style={{ borderTop: `1px solid ${CREAM}` }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK }}
            />
            <button
              onClick={() => setDraft("")}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: GREEN }}
              aria-label="Send"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}