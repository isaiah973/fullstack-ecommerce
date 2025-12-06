import { useContext } from "react";
import { CartContext } from "./Context/CartContext.jsx";
import { VendorAuthContext } from "./Context/VendorAuthContext.jsx";
import { AuthContext } from "./Context/AuthContext.jsx"; // ensure this path matches your file
import { FiTrash2 } from "react-icons/fi";
import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isVendorLoggedIn, setRedirectAfterLogin } =
    useContext(VendorAuthContext);

  const { isLoggedIn, loading } = useContext(AuthContext); // added loading

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const wishlist = JSON.parse(localStorage.getItem("vendorWishlist")) || [];

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCheckout = () => {
    console.log(
      "[Cart] User logged in:",
      isLoggedIn,
      "Vendor logged in:",
      isVendorLoggedIn,
      "LocalStorage token:",
      localStorage.getItem("authToken")
    );

    // Determine if user is logged in (with fallback)
    const userLogged = loading
      ? Boolean(localStorage.getItem("authToken"))
      : Boolean(isLoggedIn);

    // --- Allow checkout if USER or VENDOR is logged in ---
    if (!userLogged && !isVendorLoggedIn) {
      alert("You need to log in to continue with checkout.");

      // redirect user to USER LOGIN (default)
      navigate("/user-login");

      // OPTIONAL: if you want vendor login instead, change above
      return;
    }

    // Cart empty check
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Checkout Successful!");

    const handler = window.PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxxxxxxxxxxx",
      email: "customer@example.com",
      amount: total * 100,
      currency: "NGN",
      ref: "MP-" + Math.floor(Math.random() * 1000000000),

      callback: function (response) {
        alert("Payment successful! Reference: " + response.reference);

        fetch("http://localhost:5000/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference }),
        })
          .then((res) => res.json())
          .then((data) => console.log("Verification:", data))
          .catch((err) => console.error(err));

        localStorage.removeItem("cart");
        window.location.reload();
      },

      onClose: function () {
        alert("Payment cancelled.");
      },
    });

    handler.openIframe();
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar wishlistCount={wishlist.length} />
        <p className="text-center mt-10 font-[prata]">Your cart is empty.</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 lg:px-14 py-32 font-[prata]">
        <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 bg-white p-4 rounded-xl shadow cursor-pointer"
              onClick={() => goToProduct(item._id)}
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-gray-500">₦{item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item._id, item.quantity - 1);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item._id, item.quantity + 1);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item._id);
                }}
                className="text-red-500 text-xl"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <p className="text-right mt-6 text-2xl font-semibold">
          Total: ₦{total.toLocaleString()}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleCheckout}
            className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-80 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}

// import { useContext } from "react";
// import { CartContext } from "./Context/CartContext.jsx";
// import { VendorAuthContext } from "./Context/VendorAuthContext.jsx";
// import { FiTrash2 } from "react-icons/fi";
// import Navbar from "../Components/Navbar.jsx";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
//   const { isVendorLoggedIn, setRedirectAfterLogin } =
//     useContext(VendorAuthContext);

//   const navigate = useNavigate();

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const wishlist = JSON.parse(localStorage.getItem("vendorWishlist")) || [];

//   const goToProduct = (id) => {
//     navigate(`/product/${id}`);
//   };

//   const handleCheckout = () => {
//     if (!isVendorLoggedIn) {
//       alert("You need to log in to continue with checkout.");
//       setRedirectAfterLogin("/cart");
//       navigate("/vendor-login");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     // Alert checkout successful since vendor is logged in
//     alert("Checkout Successful!");

//     const handler = window.PaystackPop.setup({
//       key: "pk_test_xxxxxxxxxxxxxxxxxxxxx",
//       email: "customer@example.com",
//       amount: total * 100,
//       currency: "NGN",
//       ref: "MP-" + Math.floor(Math.random() * 1000000000),

//       callback: function (response) {
//         alert("Payment successful! Reference: " + response.reference);

//         fetch("http://localhost:5000/api/paystack/verify", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ reference: response.reference }),
//         })
//           .then((res) => res.json())
//           .then((data) => console.log("Verification:", data))
//           .catch((err) => console.error(err));

//         localStorage.removeItem("cart");
//         window.location.reload();
//       },

//       onClose: function () {
//         alert("Payment cancelled.");
//       },
//     });

//     handler.openIframe();
//   };

//   if (cart.length === 0) {
//     return (
//       <>
//         <Navbar wishlistCount={wishlist.length} />
//         <p className="text-center mt-10 font-[prata]">Your cart is empty.</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar wishlistCount={wishlist.length} />

//       <div className="max-w-7xl mx-auto px-5 lg:px-14 py-10 font-[prata]">
//         <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center gap-6 bg-white p-4 rounded-xl shadow cursor-pointer"
//               onClick={() => goToProduct(item._id)}
//             >
//               <img
//                 src={`http://localhost:5000${item.image}`}
//                 alt={item.title}
//                 className="w-24 h-24 object-contain"
//               />

//               <div className="flex-1">
//                 <h3 className="text-xl font-medium">{item.title}</h3>
//                 <p className="text-gray-500">₦{item.price}</p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       updateQuantity(item._id, item.quantity - 1);
//                     }}
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     -
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       updateQuantity(item._id, item.quantity + 1);
//                     }}
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   removeFromCart(item._id);
//                 }}
//                 className="text-red-500 text-xl"
//               >
//                 <FiTrash2 />
//               </button>
//             </div>
//           ))}
//         </div>

//         <p className="text-right mt-6 text-2xl font-semibold">
//           Total: ₦{total.toLocaleString()}
//         </p>

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleCheckout}
//             className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-80 transition"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
