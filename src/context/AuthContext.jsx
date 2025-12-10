import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("ems_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGIN
  const login = async (credentials) => {
    const { user, token } = await authService.login(credentials);

    // Save session to localStorage
    localStorage.setItem("ems_user", JSON.stringify(user));
    localStorage.setItem("ems_token", token);

    setUser(user);
    return user;
  };

  // SIGNUP
  const signup = async (data) => {
    const { user, token } = await authService.register(data);

    localStorage.setItem("ems_user", JSON.stringify(user));
    localStorage.setItem("ems_token", token);

    setUser(user);
    return user;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("ems_user");
    localStorage.removeItem("ems_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
