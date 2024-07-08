// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./components/utils/AuthContext"; // Adjust the path based on your file structure
// import SignUp from "./components/pages/SignUp";
// import RoleSelector from "./components/pages/RoleSelector";
// import ProfileForm from "./components/pages/ProfileForm";
// import LoginPage from "./components/pages/LoginPage";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import EvaluatorDashboard from "./components/evaluator/EvaluatorDashboard";
// import ReactGA from "react-ga";
// import ShowTask from "./components/forpublic/ShowTask";
// import TagManager from 'react-gtm-module'

// const tagManagerArgs = {
//     gtmId: 'GTM-TDN8PLXN'
// }

// TagManager.initialize(tagManagerArgs);

// const TRACKING_ID='G-0R29VR1RYZ';
// // ReactGA.initialize(TRACKING_ID);
// ReactGA.initialize('G-0R29VR1RYZ', {
//   debug: true,
//   titleCase: false,
//   gaOptions: {
//     userId: 123
//   }
// });

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



import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/utils/AuthContext";
import SignUp from "./components/pages/SignUp";
import RoleSelector from "./components/pages/RoleSelector";
import ProfileForm from "./components/pages/ProfileForm";
import LoginPage from "./components/pages/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import EvaluatorDashboard from "./components/evaluator/EvaluatorDashboard";
import ShowTask from "./components/forpublic/ShowTask";
import ReactGA from "react-ga";
import EvalMainContent from "./components/evaluator/EvalMainContent"
import AdminMainContent from "./components/admin/AdminMainContent";

const TRACKING_ID = "G-0R29VR1RYZ";
ReactGA.initialize(TRACKING_ID, {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123,
  },
});

function RouteTracker() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Save the current route to localStorage
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    // Check if there's a stored route on initial load
    const lastRoute = localStorage.getItem("lastRoute");
    if (lastRoute && lastRoute !== location.pathname) {
      navigate(lastRoute);
    }
  }, []);

  return null;
}

function App() {
  const { role } = useGlobalState();

  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/role" element={<RoleSelector />} />
          <Route path="/profile" element={<ProfileForm />} />
          
          
          <Route path="/evaluatorDashboard" element={<EvaluatorDashboard />}>
            <Route index element={<Navigate to="tasks" replace />} />
            <Route path="tasks" element={<EvalMainContent activePage="tasks" />} />
            <Route
              path="myprojects"
              element={<EvalMainContent activePage="my projects" />}
            />
            <Route
              path="completed"
              element={<EvalMainContent activePage="completed" />}
            />
            <Route
              path="history"
              element={<EvalMainContent activePage="history" />}
            />
          </Route>

          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route index element={<Navigate to="tasks" replace />} />
            <Route path="tasks" element={<AdminMainContent activePage="tasks" />} />
            <Route
              path="requests"
              element={<AdminMainContent activePage="requests" />}
            />
            <Route
              path="analytics"
              element={<AdminMainContent activePage="analytics" />}
            />
            <Route
              path="history"
              element={<AdminMainContent activePage="history" />}
            />
          </Route>

          <Route path="/ProfileForm" element={<ProfileForm />} />
          <Route path="/tasks" element={<ShowTask />} />
        </Routes>

    </Router>
  );
}

export default App;