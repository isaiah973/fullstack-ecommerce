// src/Components/HeroSlider.jsx
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export default function HeroSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    async function getProducts() {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
    }
    getProducts();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [products]);

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading products...
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="font-[prata] relative w-full h-[70vh] overflow-hidden pt-32 mt-16">
      <AnimatePresence>
        <motion.div
          key={currentProduct._id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-yellow-200 via-white to-yellow-200"
        >
          {/* Image */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 text-center md:text-left p-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              {currentProduct.title}
            </h2>
            <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
              ₦{currentProduct.price.toLocaleString()}
            </p>
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              {currentProduct.description.length > 150
                ? currentProduct.description.slice(0, 150) + "..."
                : currentProduct.description}
            </p>
            <button
              onClick={() => goToProduct(currentProduct._id)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-lg"
            >
              Shop Now
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? products.length - 1 : currentIndex - 1
          )
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-lg"
      >
        &#10094;
      </button>
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === products.length - 1 ? 0 : currentIndex + 1
          )
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-lg"
      >
        &#10095;
      </button>

      {/* Arrow Down */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <FiChevronDown className="text-4xl text-gray-800" />
      </div>
    </div>
  );
}
