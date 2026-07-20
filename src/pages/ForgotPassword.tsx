import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// TODO: uncomment when backend is ready
// import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: uncomment when backend is ready
    // try {
    //   await axios.post("/api/auth/forgot-password", { email });
    // } catch (err) {
    //   setError((err as AxiosError<{ message: string }>).response?.data?.message || "Something went wrong. Please try again.");
    //   setLoading(false);
    //   return;
    // }
    setLoading(false);
    navigate("/verify-otp", { state: { email } });
  }

  return (
    <div style={{ backgroundImage: "url('/Background.png')", backgroundSize: "cover", backgroundPosition: "center" }} className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-lg"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.75)", border: "1px solid #E5E3DD" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0F5132" }}>Umuhuza</h1>
          <p className="text-sm mt-1 font-medium" style={{ color: "#1A1A1A" }}>Rwanda's Creative Talent Platform</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>Forgot your password?</h2>
          <p className="text-sm mt-1 font-medium" style={{ color: "#1A1A1A" }}>Enter your email and we'll send you a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-2.5 text-sm transition focus:outline-none"
              style={{ backgroundColor: "#FAFAF8", border: `1px solid ${error ? "#B8860B" : "#E5E3DD"}`, color: "#1A1A1A" }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = "#0F5132")}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = error ? "#B8860B" : "#E5E3DD")}
            />
            {error && <p className="text-xs mt-1.5" style={{ color: "#B8860B" }}>{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-2.5 rounded-lg text-sm transition-colors text-white"
            style={{ backgroundColor: loading ? "#6B6B65" : "#0F5132" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!loading) e.currentTarget.style.backgroundColor = "#0B3D26"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (!loading) e.currentTarget.style.backgroundColor = "#0F5132"; }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="my-6" style={{ borderTop: "1px solid #E5E3DD" }} />

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm flex items-center justify-center gap-1.5 transition-colors"
            style={{ color: "#1A1A1A" }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#0F5132")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#1A1A1A")}
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
