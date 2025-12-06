import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { VendorAuthContext } from "./VendorAuthContext.jsx";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);
  const { isVendorLoggedIn } = useContext(VendorAuthContext);
  const [initialized, setInitialized] = useState(false);

  const getStorageKey = () => {
    if (isVendorLoggedIn) return "vendorWishlist";
    if (isLoggedIn) return "userWishlist";
    return "guestWishlist";
  };

  // Load wishlist
  useEffect(() => {
    const storageKey = getStorageKey();
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setWishlist(saved);
    setInitialized(true);
  }, [isLoggedIn, isVendorLoggedIn]);

  // Save wishlist whenever it changes
  useEffect(() => {
    if (!initialized) return;
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, isLoggedIn, isVendorLoggedIn, initialized]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev.filter((p) => p._id !== product._id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
