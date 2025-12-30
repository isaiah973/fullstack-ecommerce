// src/Components/PopularProducts.jsx
import { useEffect, useState, useContext } from "react";
import { fetchAllProducts } from "../Data/products";
import { CartContext } from "../Pages/Context/CartContext.jsx";
import { WishlistContext } from "../Pages/Context/WishlistContext.jsx";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts.slice(0, 3)); // first 3 items
    }
    getProducts();
  }, []);

  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-semibold mb-12 text-center">
        Most Popular Products
      </h2>

      <div className="flex flex-wrap justify-center gap-12">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-80 flex flex-col items-center relative cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {/* IMAGE */}
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center relative">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-72 object-contain"
              />

              {/* Wishlist button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // stops navigation
                  const alreadyInWishlist = isInWishlist(product._id);
                  toggleWishlist(product);
                  if (!alreadyInWishlist) {
                    alert(`${product.title} added to wishlist!`);
                  }
                }}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
              >
                <FiHeart
                  className={`text-xl ${
                    isInWishlist(product._id) ? "text-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-medium mt-6 text-center">
              {product.title}
            </h3>

            {/* SMALL SUBTITLE */}
            <p className="text-gray-500 text-center mt-1 text-sm">
              {product.description.substring(0, 20)}
            </p>

            {/* PRICE */}
            <div className="mt-3 flex items-center gap-2">
              {product.oldPrice && (
                <span className="line-through text-gray-400 text-lg">
                  ${product.oldPrice}
                </span>
              )}
              <span className="text-xl font-semibold">₦{product.price}</span>
            </div>

            {/* ADD TO CART BUTTON */}
            <div className="mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // stops navigation
                  addToCart(product);
                  alert(`${product.title} added to cart!`);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
              >
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
