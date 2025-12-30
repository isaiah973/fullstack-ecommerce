import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // show/hide states
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

  // Password Strength Checker
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
      const res = await axios.post(`${API_URL}/users/register`, form, {
        withCredentials: true,
      });

      if (res.status === 201) {
        alert("Signup successful! You can now log in.");
        navigate("/user-login");
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
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
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

            {/* show/hide toggle */}
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

            {/* show/hide toggle */}
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

        <p className="mt-4 text-center">
          Want to create a vendor account?{" "}
          <a href="/vendor-signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
