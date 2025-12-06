import axios from "axios";

export async function fetchAllProducts() {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/products/get-products",
      { withCredentials: true }
    );

    console.log("API response:", res.data); // DEBUG

    if (res.data.success) {
      // <-- use allProducts instead of products
      return res.data.allProducts;
    }

    return [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
