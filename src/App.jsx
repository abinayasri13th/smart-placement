import MockInterview from './pages/MockInterview'
import Chatbot from './pages/Chatbot'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import ResumeUpload from './pages/ResumeUpload'
import ATSScore from './pages/ATSScore'
import CompanyRecommendations from './pages/CompanyRecommendations'
import SkillGap from './pages/SkillGap'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/interview" element={<MockInterview />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/ats" element={<ATSScore />} />
        <Route path="/companies" element={<CompanyRecommendations />} />
        <Route path="/skills" element={<SkillGap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}