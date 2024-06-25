import React from 'react';
import SignUp from './components/pages/SignUp';
import RoleSelector from './components/pages/RoleSelector';
import ProfileForm from './components/pages/ProfileForm';
import Layout from './components/pages/MainContent';
import LoginPage from './components/pages/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import Dashboard from './components/pages/Dashboard';
import EvaluatorDashboard from './components/evaluator/EvaluatorDashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />
  }, 
  {
    path: "/login",
    element: <LoginPage />
  }, 
  {
    path: "/role",
    element: <RoleSelector />
  },
  {
    path: "/profile",
    element: <ProfileForm />
  },
  {
    path: "/dashboard",
    element: <EvaluatorDashboard />
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />      
      {/* <AdminDashboard /> */}
      {/* <EvaluatorDashboard /> */}
    </div>
  );
}

export default App;
