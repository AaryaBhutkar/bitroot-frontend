import { useState, useEffect } from "react";

const useGlobalState = () => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage
    const storedUserId = localStorage.getItem("user_id");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setUserId(storedUserId);
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  return { userId, token, role };
};

export default useGlobalState;