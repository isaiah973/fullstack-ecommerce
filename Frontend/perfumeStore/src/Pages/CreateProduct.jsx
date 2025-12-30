// src/pages/CreateProduct.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
const API_URL = import.meta.env.VITE_API_URL;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);
      formData.append("sku", form.sku);
      formData.append("tags", form.tags);
      formData.append("image", image);

      const res = await axios.post(
        `${API_URL}/products/create-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // in case your API uses cookies
        }
      );

      if (res.data.success) {
        alert("Product created successfully!");
        setForm({
          title: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          sku: "",
          tags: "",
        });
        setImage(null);
        // navigate("/");
      } else {
        alert(res.data.message || "Error creating product");
      }
    } catch (err) {
      console.error("Create product error:", err);
      alert(err.response?.data?.message || "Failed to create product");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl py-24">
        <h2 className="text-2xl font-bold mb-6">Create New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <TextArea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
          />
          <Input
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
          <Input
            label="Stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
          />
          <Input
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
          />
          <Input
            label="Tags (comma separated)"
            name="tags"
            value={form.tags}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && (
              <p className="mt-2 text-sm text-gray-500">{image.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* Input Components */
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required
        rows={4}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>
  );
}
