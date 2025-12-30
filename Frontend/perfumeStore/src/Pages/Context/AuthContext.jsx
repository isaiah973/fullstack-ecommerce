import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(Boolean(token));
    setLoading(false);
  }, []);

  async function login(email, password) {
    try {
      const res = await axios.post(
        `${API_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.token;
      if (token) localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async function logout() {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout error:", err?.response?.data || err.message);
    }

    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
