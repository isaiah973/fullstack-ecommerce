// controllers/wishlistController.js
const User = require("../models/User");
const Product = require("../models/productModel");

// Get the current user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Toggle a product in the wishlist (add or remove)
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const index = user.wishlist.indexOf(productId);
    let added;
    if (index === -1) {
      // Add to wishlist
      user.wishlist.push(productId);
      added = true;
    } else {
      // Remove from wishlist
      user.wishlist.splice(index, 1);
      added = false;
    }

    await user.save();
    res.json({ success: true, added });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
