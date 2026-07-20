import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ApplicantsPage from "./pages/ApplicantsPage";
import SettingsPage from "./pages/SettingsPage";
import RecruiterProfile from "./pages/RecruiterProfile";
import EditRecruiterProfile from "./pages/EditRecruiterProfile";
import PublicRecruiterProfile from "./pages/PublicRecruiterProfile";
import FinishSetup from "./pages/FinishSetup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/recruiter/applicants" element={<ApplicantsPage />} />
      <Route path="/recruiter/settings" element={<SettingsPage />} />
      <Route path="/recruiter/profile" element={<RecruiterProfile />} />
      <Route path="/recruiter/profile/edit" element={<EditRecruiterProfile />} />
      <Route path="/recruiter/profile/setup" element={<FinishSetup />} />
      <Route path="/recruiter/public/:slug" element={<PublicRecruiterProfile />} />
    </Routes>
  );
}

export default App;