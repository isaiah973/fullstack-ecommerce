// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import Navbar from "../Components/Navbar.jsx";
import { CartContext } from "../Pages/Context/CartContext.jsx";
import { WishlistContext } from "../Pages/Context/WishlistContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  // Fetch product data
  useEffect(() => {
    axios
      .get(
        `https://fullstack-ecommerce-production-244f.up.railway.app/api/products/get-product/${id}`
      )
      .then((res) => setProduct(res.data.product))
      .catch((e) => console.log(e));
  }, [id]);

  if (!product) return <p className="p-10">Loading...</p>;

  const wish = isInWishlist(product._id);

  return (
    <>
      {/* Navbar with live wishlist count */}
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 lg:p-12 font-[prata] lg:py-36 py-36">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gradient-to-br from-white via-[#f9f5e8] to-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#d4af37]/30"
        >
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white border border-[#d4af37]/20 rounded-2xl shadow-lg p-6 flex items-center justify-center"
          >
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md border border-black/10 hover:scale-110 transition z-50"
            >
              <FiHeart
                className={`text-2xl ${
                  wish ? "text-[#d4af37]" : "text-black"
                } transition`}
              />
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="w-full max-h-[500px] object-contain drop-shadow-lg relative z-10"
            />
          </motion.div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-semibold mb-3 text-black drop-shadow-sm">
              {product.title}
            </h1>
            <p className="text-black/70 text-lg leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-4xl font-light text-[#d4af37] mb-6">
              ₦{product.price?.toLocaleString()}
            </p>

            <div className="grid grid-cols-2 gap-6 text-sm">
              {[
                { label: "Category", value: product.category },
                { label: "Stock", value: product.stock },
                { label: "SKU", value: product.sku },
                { label: "Tags", value: product.tags?.join(", ") },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white shadow-sm rounded-lg p-4 border border-[#d4af37]/40"
                >
                  <p className="text-black/40">{item.label}</p>
                  <p className="font-medium text-black">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Add to Cart with Alert */}
            <button
              onClick={() => {
                addToCart(product);
                alert(`${product.title} successfully added to cart!`);
              }}
              className="mt-10 px-10 py-4 rounded-xl bg-black text-white shadow-lg tracking-widest hover:opacity-80 transition text-sm font-semibold border border-[#d4af37]"
            >
              ADD TO CART
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
