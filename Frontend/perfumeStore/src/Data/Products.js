import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllProducts() {
  try {
    const res = await axios.get(`${API_URL}/products/get-products`);

    // console.log("API response:", res.data); // check response in console

    if (res.data.success) {
      console.log(res.data.allProducts[0].image);

      // return res.data.allProducts; // array of products
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
