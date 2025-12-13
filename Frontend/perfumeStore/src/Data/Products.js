import axios from "axios";
import { data } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchAllProducts() {
  try {
    const res = await axios.get(`${API_URL}/products/get-products`);

    console.log("API response:", res.data);

    if (res.data.success) {
      return res.data.allProducts;
    }

    return [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
// export async function fetchAllProducts() {
//   try {
//     const res = await axios.get(`${API_URL}/products/get-products`, {
//       withCredentials: true,
//     });

//     console.log("API response:", res.data);

//     if (res.data.success) {
//       return res.data.allProducts;
//     }

//     return [];
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     return [];
//   }
// }
