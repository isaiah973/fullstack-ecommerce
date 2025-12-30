import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/vendor-wishlist";

export async function addToVendorWishlist(vendorId, productId) {
  return axios.post(`${API_URL}/add`, { vendorId, productId });
}

export async function removeFromVendorWishlist(vendorId, productId) {
  return axios.post(`${API_URL}/remove`, { vendorId, productId });
}

export async function fetchVendorWishlist(vendorId) {
  const res = await axios.get(`${API_URL}/${vendorId}`);
  return res.data.wishlist;
}
