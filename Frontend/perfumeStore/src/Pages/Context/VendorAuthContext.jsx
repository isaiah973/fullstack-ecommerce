import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const VendorAuthContext = createContext();

export function VendorAuthProvider({ children }) {
  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(
    Boolean(localStorage.getItem("vendorToken"))
  );

  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  async function vendorLogin(email, password) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/vendors/login",
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.token;
      if (token) localStorage.setItem("vendorToken", token);

      setIsVendorLoggedIn(true);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  }

  function vendorLogout() {
    localStorage.removeItem("vendorToken");
    setIsVendorLoggedIn(false);
  }

  return (
    <VendorAuthContext.Provider
      value={{
        isVendorLoggedIn,
        setIsVendorLoggedIn,
        vendorLogin,
        vendorLogout,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </VendorAuthContext.Provider>
  );
}
