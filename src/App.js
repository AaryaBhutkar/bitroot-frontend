import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import RoleSelector from "./components/pages/RoleSelector";
import ProfileForm from "./components/pages/ProfileForm";
import LoginPage from "./components/pages/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import EvaluatorDashboard from "./components/evaluator/EvaluatorDashboard";
import useGlobalState from "./components/utils/useGlobalState";

// function App() {
//   return (
//     <Router>
//         <Routes>
//           <Route path="/" element={<SignUp />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/role" element={<RoleSelector />} />
//           <Route path="/profile" element={<ProfileForm />} />
//           <Route path="/evaluatorDashboard" element={<EvaluatorDashboard />} />
//           <Route path="/adminDashboard" element={<AdminDashboard />} />
//         </Routes>
//     </Router>
//   );
// }

// export default App;



function App() {
  const { role } = useGlobalState();

  return (
    <Router>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/role" element={<RoleSelector />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route
            path="/evaluatorDashboard"
            element={role === "evaluator" ? <EvaluatorDashboard /> : null}
          />
          <Route
            path="/adminDashboard"
            element={role === "admin" ? <AdminDashboard /> : null}
          />
        </Routes>

    </Router>
  );
}

export default App;