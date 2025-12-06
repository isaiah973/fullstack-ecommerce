import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { StrictMode } from "react";
import "./index.css";
import { AuthProvider } from "./Pages/Context/AuthContext.jsx";
import { CartProvider } from "./Pages/Context/CartContext.jsx";
import { WishlistProvider } from "./Pages/Context/WishlistContext.jsx";
import { VendorAuthProvider } from "./Pages/Context/VendorAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <VendorAuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </VendorAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
