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
import ReactGA from "react-ga";
import ShowTask from "./components/forpublic/ShowTask";

const TRACKING_ID='G-0R29VR1RYZ';
// ReactGA.initialize(TRACKING_ID);
ReactGA.initialize('G-0R29VR1RYZ', {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123
  }
});

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
          <Route path="/tasks" element={<ShowTask/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}




export default App;
