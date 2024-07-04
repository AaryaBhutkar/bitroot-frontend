import React, { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state for authenticated user

  const login = (token, userData) => {
    // Your login logic here, e.g., setting user data and token
    setUser(userData);
    localStorage.setItem("token", token); // Example: Store token in local storage
  };

  const logout = () => {
    // Your logout logic here, e.g., clearing user data and token
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
