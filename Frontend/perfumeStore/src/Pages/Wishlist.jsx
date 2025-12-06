import { useContext } from "react";
import { WishlistContext } from "./Context/WishlistContext.jsx";
import { CartContext } from "./Context/CartContext.jsx";
import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const goToProduct = (id) => navigate(`/product/${id}`);

  const removeFromWishlist = (id) => {
    toggleWishlist({ _id: id });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  return (
    <>
      <Navbar />

      <div className="font-[prata] max-w-7xl mx-auto px-5 lg:px-14 py-24">
        <h1 className="text-3xl font-semibold mb-8 text-center">Wish List</h1>

        {wishlist.length === 0 ? (
          <p className="text-center mt-10 text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="relative w-full max-w-sm mx-auto cursor-pointer"
                onClick={() => goToProduct(product._id)}
              >
                <div className="bg-white overflow-hidden relative rounded-xl shadow-md">
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow z-10 hover:scale-110 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product._id);
                    }}
                  >
                    <FiHeart className="text-red-500 text-xl" />
                  </button>

                  <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h3 className="text-xl font-extralight">{product.title}</h3>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-lg font-light mt-1">N{product.price}</p>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="mt-2 bg-black text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto hover:opacity-80 transition"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
