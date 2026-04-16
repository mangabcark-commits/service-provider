import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");

      if (!saved) return null;

      return JSON.parse(saved);
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("user"); // remove bad data
      return null;
    }
  });

  const login = (payload) => {
    localStorage.setItem("token", payload.token);

    // IMPORTANT FIX 👇
    localStorage.setItem("user", JSON.stringify(payload.user));

    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedCity");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);