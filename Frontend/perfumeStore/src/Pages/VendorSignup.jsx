import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

export default function VendorSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    address: "",
    phone: "",
  });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Show/hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "password") {
      checkStrength(value);
    }

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        name === "password"
          ? value === form.confirmPassword
          : form.password === value
      );
    }
  };

  // Password strength checker
  const checkStrength = (password) => {
    let strength = "";
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const longEnough = password.length >= 8;

    if (longEnough && hasUpper && hasNumber && hasSpecial) {
      strength = "Strong";
    } else if (password.length >= 6) {
      strength = "Medium";
    } else {
      strength = "Weak";
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }

    if (passwordStrength !== "Strong") {
      alert("Password must be STRONG before you can sign up.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/vendors/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          storeName: form.storeName,
          address: form.address,
          phone: form.phone,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Signup successful! You can now log in.");
        navigate("/vendor-login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === "Weak") return "text-red-500";
    if (passwordStrength === "Medium") return "text-yellow-500";
    if (passwordStrength === "Strong") return "text-green-600";
    return "";
  };

  const submitDisabled = !passwordMatch || passwordStrength !== "Strong";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Navbar />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md py-14">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a Vendor Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-sm text-blue-600 cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {form.password.length > 0 && (
              <p className={`mt-1 text-sm font-semibold ${getStrengthColor()}`}>
                Strength: {passwordStrength}
              </p>
            )}
            {passwordStrength !== "Strong" && (
              <p className="text-xs mt-1 text-gray-600">
                * Must be at least 8 characters, include uppercase, number, and
                a special character.
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-xl border ${
                passwordMatch ? "border-gray-300" : "border-red-500"
              } focus:ring-2 focus:ring-blue-400`}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-10 text-sm text-blue-600 cursor-pointer select-none"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={form.storeName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitDisabled}
            className={`w-full py-2 rounded-xl font-semibold transition ${
              submitDisabled
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
