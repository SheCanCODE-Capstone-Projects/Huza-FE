import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// TODO: uncomment when backend is ready
// import axios from "axios";

interface LocationState {
  email: string;
}

export default function VerifyOtp() {
  const { state } = useLocation();
  const email = (state as LocationState)?.email ?? "";
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter the OTP sent to your email.");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: uncomment when backend is ready
    // try {
    //   await axios.post("/api/auth/verify-otp", { email, otp });
    // } catch (err) {
    //   setError((err as AxiosError<{ message: string }>).response?.data?.message || "Invalid or expired OTP.");
    //   setLoading(false);
    //   return;
    // }
    setLoading(false);
    navigate("/reset-password", { state: { email, otp } });
  }

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
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>Enter your OTP</h2>
          <p className="text-sm mt-1" style={{ color: "#6B6B65" }}>
            We sent a code to <span className="font-medium" style={{ color: "#0F5132" }}>{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setOtp(e.target.value); setError(""); }}
              placeholder="Enter OTP"
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
