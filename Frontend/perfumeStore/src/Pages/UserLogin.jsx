import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";

export default function UserLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔥 show/hide
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;

      if (login) {
        result = await login(form.email, form.password);
        if (!result || !result.success) {
          alert(result?.message || "Login failed");
          setLoading(false);
          return;
        }
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/users/login",
          form,
          { withCredentials: true }
        );

        if (res.data && res.data.token) {
          localStorage.setItem("authToken", res.data.token);
          result = { success: true };
        } else {
          alert("Login succeeded but no token returned.");
          setLoading(false);
          return;
        }
      }

      setLoading(false);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Navbar />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-sm text-blue-600 cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-3 text-center space-y-1">
          <p>
            Login as a vendor?{" "}
            <Link to="/vendor-login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
