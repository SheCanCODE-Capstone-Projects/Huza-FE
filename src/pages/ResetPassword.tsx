import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// TODO: uncomment when backend is ready
// import axios from "axios";

interface LocationState {
  email: string;
  otp: string;
}

interface PasswordField {
  id: string;
  label: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

export default function ResetPassword() {
  const { state } = useLocation();
  const email = (state as LocationState)?.email ?? "";
  const otp = (state as LocationState)?.otp ?? "";
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: uncomment when backend is ready
    // try {
    //   await axios.post("/api/auth/reset-password", { email, otp, password });
    // } catch (err) {
    //   setError((err as AxiosError<{ message: string }>).response?.data?.message || "Something went wrong. Please try again.");
    //   setLoading(false);
    //   return;
    // }
    setLoading(false);
    navigate("/login");
  }

  const fields: PasswordField[] = [
    { id: "password", label: "New password", value: password, setter: setPassword },
    { id: "confirm", label: "Confirm password", value: confirm, setter: setConfirm },
  ];

  return (
    <div style={{ backgroundColor: "#FAFAF8" }} className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-lg"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E3DD" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0F5132" }}>Umuhuza</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B65" }}>Rwanda's Creative Talent Platform</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>Set new password</h2>
          <p className="text-sm mt-1" style={{ color: "#6B6B65" }}>Choose a strong password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ id, label, value, setter }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
                {label}
              </label>
              <input
                id={id}
                type="password"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setter(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-2.5 text-sm transition focus:outline-none"
                style={{ backgroundColor: "#FAFAF8", border: `1px solid ${error ? "#B8860B" : "#E5E3DD"}`, color: "#1A1A1A" }}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = "#0F5132")}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = error ? "#B8860B" : "#E5E3DD")}
              />
            </div>
          ))}

          {error && <p className="text-xs" style={{ color: "#B8860B" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-2.5 rounded-lg text-sm transition-colors text-white"
            style={{ backgroundColor: loading ? "#6B6B65" : "#0F5132" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!loading) e.currentTarget.style.backgroundColor = "#0B3D26"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (!loading) e.currentTarget.style.backgroundColor = "#0F5132"; }}
          >
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>

        <div className="my-6" style={{ borderTop: "1px solid #E5E3DD" }} />

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm flex items-center justify-center gap-1.5 transition-colors"
            style={{ color: "#6B6B65" }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#0F5132")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#6B6B65")}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
