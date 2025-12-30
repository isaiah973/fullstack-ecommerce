const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
require("./db");

const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");
const vendorWishlistRoutes = require("./routes/vendorWishlistRoutes");
const paystackRoutes = require("./routes/paystackRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   ✅ CORS (Express 5)
======================= */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* =======================
   ✅ MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =======================
   ✅ STATIC FILES
======================= */
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* =======================
   ✅ ROUTES
======================= */
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vendor-wishlist", vendorWishlistRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/cart", cartRoutes);

/* =======================
   ✅ START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
