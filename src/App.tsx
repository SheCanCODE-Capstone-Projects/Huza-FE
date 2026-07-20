import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyOtp from './pages/VerifyOtp';
import RecruiterProfile from './pages/RecruiterProfile';
import EditRecruiterProfile from './pages/EditRecruiterProfile';
import PublicRecruiterProfile from './pages/PublicRecruiterProfile';
import FinishSetup from './pages/FinishSetup';
import { RecruiterProvider } from './stores/recruiterStore';
import './App.css'

//fixing deployment
function App() {
  return (
    <BrowserRouter>
      <RecruiterProvider>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
          <Route path="/recruiter/profile/edit" element={<EditRecruiterProfile />} />
          <Route path="/recruiter/profile/setup" element={<FinishSetup />} />
          <Route path="/recruiter/public/:slug" element={<PublicRecruiterProfile />} />
        </Routes>
      </RecruiterProvider>
    </BrowserRouter>
  )
}

export default App
