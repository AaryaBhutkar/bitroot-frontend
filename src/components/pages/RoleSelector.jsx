import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    if (localStorage.getItem("user")) localStorage.removeItem("user");
    if (localStorage.getItem("name")) localStorage.removeItem("name");
  }, []);

  const handleRoleSelection = (role) => {
    // Store the selected role in localStorage
    localStorage.setItem("role", role);
    navigate("/login", { state: { role } });
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          ARE YOU A EVALUATOR OR ADMIN?
        </h1>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleRoleSelection("evaluator")}
            className="flex-1 py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
          >
            EVALUATOR
          </button>
          <button
            onClick={() => handleRoleSelection("admin")}
            className="flex-1 py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
          >
            ADMIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;