// src/components/Navbar.jsx
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../Pages/Context/AuthContext.jsx";
import { VendorAuthContext } from "../Pages/Context/VendorAuthContext.jsx";
import { CartContext } from "../Pages/Context/CartContext.jsx";
import { WishlistContext } from "../Pages/Context/WishlistContext.jsx";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { isVendorLoggedIn, vendorLogout } = useContext(VendorAuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVendorLogout = async () => {
    await vendorLogout();
    navigate("/");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const goToWishlist = () => navigate("/wishlist");
  const goToCart = () => navigate("/cart");

  const handleShopClick = () => {
    if (window.location.pathname === "/") {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const productsSection = document.getElementById("products-section");
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/">
          <h1 className="text-2xl font-semibold text-orange-400">StoreMart</h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-widest">
          <li
            className="hover:text-orange-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="hover:text-orange-400 cursor-pointer"
            onClick={handleShopClick}
          >
            SHOP
          </li>
          <li
            className="hover:text-orange-400 cursor-pointer"
            onClick={() => navigate("/contact-us")}
          >
            CONTACT US NOW
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          {isVendorLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <FiUser
                className="text-2xl cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              />
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-40 bg-orange-50 shadow-lg rounded-md border z-50">
                  <Link
                    to="/vendor-dashboard"
                    className="block px-4 py-2 cursor-pointer hover:bg-orange-200 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleVendorLogout}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-red-100 text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!isVendorLoggedIn &&
            (isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/user-login" className="font-semibold cursor-pointer">
                  Login
                </Link>
                <Link to="/signup" className="font-semibold cursor-pointer">
                  Signup
                </Link>
              </>
            ))}

          <div
            className="relative cursor-pointer"
            onClick={goToWishlist}
            title="Wishlist"
          >
            <FiHeart className="text-xl" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>

          <div className="h-8 w-px bg-gray-300"></div>

          <div
            className="relative cursor-pointer flex items-center"
            onClick={goToCart}
            title="Cart"
          >
            <FiShoppingBag className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
            <span className="ml-2 tracking-widest">CART</span>
          </div>
        </div>

        {/* Mobile Burger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-orange-50 shadow-md border-t py-4 px-6 flex flex-col gap-2 rounded-b-lg">
          <button
            onClick={() => {
              navigate("/");
              setMobileMenu(false);
            }}
            className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              handleShopClick();
              setMobileMenu(false);
            }}
            className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
          >
            Shop
          </button>
          <button
            onClick={() => {
              navigate("/contact-us");
              setMobileMenu(false);
            }}
            className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
          >
            Contact Us
          </button>
          <button
            onClick={() => {
              goToWishlist();
              setMobileMenu(false);
            }}
            className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => {
              goToCart();
              setMobileMenu(false);
            }}
            className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
          >
            Cart ({cartCount})
          </button>

          {isVendorLoggedIn ? (
            <button
              onClick={() => {
                handleVendorLogout();
                setMobileMenu(false);
              }}
              className="text-left text-red-600 cursor-pointer px-3 py-2 rounded hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenu(false);
              }}
              className="text-left text-red-600 cursor-pointer px-3 py-2 rounded hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/user-login");
                  setMobileMenu(false);
                }}
                className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenu(false);
                }}
                className="text-left cursor-pointer px-3 py-2 rounded hover:bg-orange-200 transition"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
