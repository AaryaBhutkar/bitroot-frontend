import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/utils/AuthContext"; // Adjust the path based on your file structure
import SignUp from "./components/pages/SignUp";
import RoleSelector from "./components/pages/RoleSelector";
import ProfileForm from "./components/pages/ProfileForm";
import Layout from "./components/pages/MainContent";
import LoginPage from "./components/pages/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import EvaluatorDashboard from "./components/evaluator/EvaluatorDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/role" element={<RoleSelector />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/evaluatorDashboard" element={<EvaluatorDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/ProfileForm" element={<ProfileForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
