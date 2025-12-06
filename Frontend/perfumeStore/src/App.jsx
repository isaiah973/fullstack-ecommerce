import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import UserSignup from "./Pages/UserSignup";
import UserLogin from "./Pages/UserLogin";
import VendorLogin from "./Pages/VendorLogin";
import VendorSignup from "./Pages/VendorSignup";
import { VendorAuthProvider } from "./Pages/Context/VendorAuthContext.jsx";
import { AuthProvider } from "./Pages/Context/AuthContext.jsx";
import VendorDashboard from "./Pages/VendorDashboard.jsx";
import CreateProduct from "./Pages/CreateProduct.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import { WishlistProvider } from "./Pages/Context/WishlistContext.jsx";
import { CartProvider } from "./Pages/Context/CartContext.jsx";
import Cart from "./Pages/Cart.jsx";
import Contact from "./Pages/Contact.jsx";
// import { Toaster } from "react-hot-toast";
// <Toaster position="top-center" />;

function App() {
  return (
    <div>
      <VendorAuthProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/vendor-login" element={<VendorLogin />} />
                <Route path="/vendor-signup" element={<VendorSignup />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route
                  path="/vendor-create-product"
                  element={<CreateProduct />}
                />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact-us" element={<Contact />} />
              </Routes>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </VendorAuthProvider>
    </div>
  );
}

export default App;
