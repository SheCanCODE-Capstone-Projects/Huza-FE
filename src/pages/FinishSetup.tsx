import { useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: uncomment when backend is ready
// import axios from "axios";
import { useRecruiter } from "../stores/recruiterStore";
import type { RecruiterProfileData } from "../stores/recruiterStore";

const GREEN = "#0F5132";
const GREEN_HOVER = "#0B3D26";
const GREEN_SOFT = "rgba(15, 81, 50, 0.08)";
const CREAM = "#E5E3DD";
const INK = "#1A1A1A";
const MUTED = "#6B6B65";
const SURFACE = "#FAFAF8";
const MINT = "#F3F8F4";
const GOLD = "#B8860B";

interface SetupField {
  key: keyof RecruiterProfileData;
  label: string;
  placeholder: string;
  textarea?: boolean;
}

// Fields considered "missing" when empty — Finish Setup focuses on these.
const SETUP_FIELDS: SetupField[] = [
  { key: "phone", label: "Phone number", placeholder: "+250 ..." },
  { key: "bio", label: "Short bio", placeholder: "Tell candidates about yourself...", textarea: true },
  { key: "parentOrg", label: "Parent organization", placeholder: "e.g. Huza Group" },
  { key: "employees", label: "Employee count", placeholder: "e.g. 120 employees" },
  { key: "website", label: "Company website", placeholder: "www.example.rw" },
];

export default function FinishSetup() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useRecruiter();
  const [form, setForm] = useState<RecruiterProfileData>(profile);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Only show fields that are still empty/missing.
  const missing = SETUP_FIELDS.filter((f) => !(form[f.key] as string)?.trim());

  function setField(key: keyof RecruiterProfileData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    // TODO: uncomment when backend is ready
    // try {
    //   await axios.post("/api/recruiter/profile/complete", form);
    // } catch (err) {
    //   setError("Something went wrong. Please try again.");
    //   setSaving(false);
    //   return;
    // }
    updateProfile(form);
    setSaving(false);
    navigate("/recruiter/profile");
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: MINT }}>
      <div
        className="w-full max-w-2xl mx-auto rounded-2xl shadow-sm p-8"
        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: GREEN_SOFT }}
          >
            <svg className="w-6 h-6" fill="none" stroke={GREEN} viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: GREEN }}>Finish Setup</h1>
            <p className="text-sm" style={{ color: MUTED }}>
              {missing.length > 0
                ? `Add ${missing.length} missing item${missing.length > 1 ? "s" : ""} to complete your profile.`
                : "Everything looks complete — review and save."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {missing.length === 0 && (
            <p className="text-sm rounded-lg px-4 py-3" style={{ backgroundColor: GREEN_SOFT, color: GREEN }}>
              Your profile is fully set up. You can still update any details below.
            </p>
          )}

          {missing.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} className="block text-sm font-medium mb-1.5" style={{ color: INK }}>
                {f.label}
              </label>
              {f.textarea ? (
                <textarea
                  id={f.key}
                  value={form[f.key] as string}
                  rows={4}
                  placeholder={f.placeholder}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(f.key, e.target.value)}
                  className="w-full rounded-lg px-4 py-2.5 text-sm transition focus:outline-none resize-none"
                  style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK }}
                  onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => (e.target.style.borderColor = GREEN)}
                  onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => (e.target.style.borderColor = CREAM)}
                />
              ) : (
                <input
                  id={f.key}
                  type="text"
                  value={form[f.key] as string}
                  placeholder={f.placeholder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField(f.key, e.target.value)}
                  className="w-full rounded-lg px-4 py-2.5 text-sm transition focus:outline-none"
                  style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = GREEN)}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = CREAM)}
                />
              )}
            </div>
          ))}

          {error && <p className="text-xs" style={{ color: GOLD }}>{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/recruiter/profile")}
              className="text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK }}
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={saving}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-colors disabled:opacity-70"
              style={{ backgroundColor: saving ? "#6B6B65" : GREEN }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!saving) e.currentTarget.style.backgroundColor = GREEN_HOVER; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (!saving) e.currentTarget.style.backgroundColor = GREEN; }}
            >
              {saving ? "Saving..." : "Save & Finish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
