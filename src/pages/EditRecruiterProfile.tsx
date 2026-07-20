import { useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: uncomment when backend is ready
// import axios from "axios";
import { useRecruiter } from "../stores/recruiterStore";
import type { RecruiterProfileData } from "../stores/recruiterStore";

const GREEN = "#0F5132";
const GREEN_HOVER = "#0B3D26";
const CREAM = "#E5E3DD";
const INK = "#1A1A1A";
const MUTED = "#6B6B65";
const SURFACE = "#FAFAF8";
const MINT = "#F3F8F4";
const GOLD = "#B8860B";

interface FieldDef {
  key: keyof RecruiterProfileData;
  label: string;
  type?: string;
  textarea?: boolean;
  full?: boolean;
}

const PERSONAL_FIELDS: FieldDef[] = [
  { key: "fullName", label: "Full name" },
  { key: "title", label: "Job title" },
  { key: "email", label: "Email address", type: "email" },
  { key: "phone", label: "Phone number" },
  { key: "location", label: "Location" },
  { key: "bio", label: "Bio", textarea: true, full: true },
];

const COMPANY_FIELDS: FieldDef[] = [
  { key: "companyName", label: "Company name" },
  { key: "parentOrg", label: "Parent organization" },
  { key: "employees", label: "Employee count" },
  { key: "website", label: "Website" },
  { key: "companyDescription", label: "Company description", textarea: true, full: true },
];

export default function EditRecruiterProfile() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useRecruiter();
  const [form, setForm] = useState<RecruiterProfileData>(profile);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function setField(key: keyof RecruiterProfileData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSaving(true);
    // TODO: uncomment when backend is ready
    // try {
    //   await axios.put("/api/recruiter/profile", form);
    // } catch (err) {
    //   setError("Something went wrong. Please try again.");
    //   setSaving(false);
    //   return;
    // }
    updateProfile(form);
    setSaving(false);
    navigate("/recruiter/profile");
  }

  function renderField(f: FieldDef) {
    const value = form[f.key] as string;
    const common = "w-full rounded-lg px-4 py-2.5 text-sm transition focus:outline-none";
    const style = { backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK };
    return (
      <div className={f.full ? "sm:col-span-2" : ""} key={f.key}>
        <label htmlFor={f.key} className="block text-sm font-medium mb-1.5" style={{ color: INK }}>
          {f.label}
        </label>
        {f.textarea ? (
          <textarea
            id={f.key}
            value={value}
            rows={4}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(f.key, e.target.value)}
            className={`${common} resize-none`}
            style={style}
            onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => (e.target.style.borderColor = GREEN)}
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => (e.target.style.borderColor = CREAM)}
          />
        ) : (
          <input
            id={f.key}
            type={f.type || "text"}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField(f.key, e.target.value)}
            className={common}
            style={style}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = GREEN)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = CREAM)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: MINT }}>
      <div
        className="w-full max-w-2xl mx-auto rounded-2xl shadow-sm p-8"
        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: GREEN }}>Edit Profile</h1>
          <button
            type="button"
            onClick={() => navigate("/recruiter/profile")}
            className="text-sm flex items-center gap-1.5 transition-colors"
            style={{ color: INK }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = GREEN)}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = INK)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: MUTED }}>Personal details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{PERSONAL_FIELDS.map(renderField)}</div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: MUTED }}>Company details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{COMPANY_FIELDS.map(renderField)}</div>
          </section>

          {error && <p className="text-xs" style={{ color: GOLD }}>{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/recruiter/profile")}
              className="text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              style={{ backgroundColor: SURFACE, border: `1px solid ${CREAM}`, color: INK }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-colors disabled:opacity-70"
              style={{ backgroundColor: saving ? "#6B6B65" : GREEN }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!saving) e.currentTarget.style.backgroundColor = GREEN_HOVER; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (!saving) e.currentTarget.style.backgroundColor = GREEN; }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
