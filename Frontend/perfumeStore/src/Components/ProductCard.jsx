import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useEffect, useState, useContext, useMemo } from "react";
import { fetchAllProducts } from "../Data/Products.js";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../Components/HeroSlider.jsx";
import MostPopular from "../Components/MostPopular.jsx";
import { CartContext } from "../Pages/Context/CartContext.jsx";
import { WishlistContext } from "../Pages/Context/WishlistContext.jsx";
import { motion } from "framer-motion";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const ALL_CATEGORIES = ["perfume", "lotion", "body wash"];

  // Load products from backend
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllProducts();
        console.log("Fetched products from productCard.jsx:", data);
        // console.log(data.allProducts[0].image); // ✅ Check your image URLs here
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    load();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategories.length > 0) {
      list = list.filter((p) =>
        selectedCategories.includes((p.category || "").toLowerCase())
      );
    }

    if (minPrice)
      list = list.filter((p) => Number(p.price) >= Number(minPrice));
    if (maxPrice)
      list = list.filter((p) => Number(p.price) <= Number(maxPrice));

    return list;
  }, [products, selectedCategories, minPrice, maxPrice]);

  const displayProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  const toggleCategory = (cat) => {
    const c = cat.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
  };

  const goToProduct = (id) => navigate(`/product/${id}`);

  return (
    <>
      {/* Hero & Popular Sections */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSlider />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <MostPopular />
      </motion.div>

      {/* MAIN PRODUCT SECTION */}
      <motion.div
        id="products-section"
        className="font-[prata] px-4 lg:px-14 mt-10 py-14 bg-gradient-to-b from-white via-gray-50 to-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Products
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* SIDEBAR FILTERS */}
          <motion.aside
            className="hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-28">
              <h3 className="font-semibold text-xl mb-4">Filters</h3>
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Category</p>
                {ALL_CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4"
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Price Range (₦)</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
                >
                  Show All
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.aside>

          {/* PRODUCT GRID */}
          <motion.section
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {displayProducts.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-500 text-lg">
                  No products match your filters.
                </div>
              ) : (
                displayProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="relative bg-white rounded-3xl shadow-md p-5 hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => goToProduct(product._id)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const alreadyInWishlist = isInWishlist(product._id);
                        toggleWishlist(product);
                        if (!alreadyInWishlist)
                          alert(`${product.title} added to wishlist!`);
                      }}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                    >
                      <FiHeart
                        className={`text-xl ${
                          isInWishlist(product._id)
                            ? "text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>

                    <div className="flex gap-5 items-center">
                      <div className="w-1/3 h-40 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full object-contain"
                          // onError={(e) => {
                          //   e.target.src = "/fallback.png";
                          // }} // optional fallback
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{product.title}</h3>
                        <p className="text-gray-500 text-sm capitalize">
                          {product.category}
                        </p>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-2xl font-semibold">
                            ₦{product.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                              alert(`${product.title} added to cart!`);
                            }}
                            className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800"
                          >
                            <FiShoppingCart /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {!showAll && filteredProducts.length > 8 && (
              <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600"
                >
                  Show More
                </button>
              </motion.div>
            )}
          </motion.section>
        </div>
      </motion.div>
    </>
  );
}
