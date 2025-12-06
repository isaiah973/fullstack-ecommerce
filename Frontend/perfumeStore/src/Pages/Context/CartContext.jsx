import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { VendorAuthContext } from "./VendorAuthContext.jsx";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const { isVendorLoggedIn } = useContext(VendorAuthContext);
  const [initialized, setInitialized] = useState(false);

  const getStorageKey = () => {
    if (isVendorLoggedIn) return "vendorCart";
    if (isLoggedIn) return "userCart";
    return "guestCart";
  };

  // Load cart
  useEffect(() => {
    const storageKey = getStorageKey();
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setCart(saved);
    setInitialized(true);
  }, [isLoggedIn, isVendorLoggedIn]);

  // Save cart whenever it changes
  useEffect(() => {
    if (!initialized) return;
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, isLoggedIn, isVendorLoggedIn, initialized]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists)
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
