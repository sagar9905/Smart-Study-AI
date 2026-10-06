import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AssessmentGeneratorPage from "./pages/assessment/AssessmentGeneratorPage";
import AssessmentRoomPage from "./pages/assessment/AssessmentRoomPage";
import CodingRoomPage from "./pages/coding/CodingRoomPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import StudyPlannerPage from "./pages/studyplanner/StudyPlannerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assessment" element={<AssessmentGeneratorPage />} />
            <Route path="/assessment/:id" element={<AssessmentRoomPage />} />
            <Route path="/coding" element={<CodingRoomPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/study-planner" element={<StudyPlannerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
