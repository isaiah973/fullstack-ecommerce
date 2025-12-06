// src/pages/VendorDashboard.jsx
import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import {
  FiShoppingCart,
  FiUsers,
  FiBox,
  FiDollarSign,
  FiSearch,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { VendorAuthContext } from "../Pages/Context/VendorAuthContext.jsx";

export default function VendorDashboard() {
  const { vendorLogout } = useContext(VendorAuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleVendorLogout = async () => {
    await vendorLogout();
    navigate("/");
  };

  // Sample data ...
  const topProducts = [
    {
      id: "01",
      name: "Belle Woman",
      price: " ₦2000",
      sold: 180,
      total: "₦360,000",
    },
    {
      id: "02",
      name: "Green Garden Body Wash",
      price: " ₦4000",
      sold: 150,
      total: "₦600,000",
    },
    { id: "03", name: "Coco", price: " ₦6000", sold: 200, total: "₦1,200,000" },
  ];

  const productRequests = [
    { name: "Belle Woman", date: "10 Jul", status: "Pending", color: "yellow" },
    {
      name: "Green Garden Body Wash",
      date: "08 Jul",
      status: "Live",
      color: "green",
    },
    { name: "Coco", date: "12 Jul", status: "Declined", color: "red" },
  ];

  const statusColor = (color) => {
    if (color === "green") return "bg-green-500";
    if (color === "red") return "bg-red-500";
    if (color === "yellow") return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* ---------------------- MOBILE MENU BUTTON ---------------------- */}
      <button
        className="md:hidden absolute top-4 left-4 bg-gray-900 text-white p-3 rounded-full z-50"
        onClick={() => setMenuOpen(true)}
      >
        <FiMenu size={22} />
      </button>

      {/* ---------------------- MOBILE DROPDOWN MENU ---------------------- */}
      {menuOpen && (
        <>
          {/* Dark Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          ></div>

          {/* Slide-in Menu */}
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-200 p-6 z-50 shadow-lg animate-slideRight">
            {/* Close button */}
            <button
              className="text-white absolute top-4 right-4"
              onClick={() => setMenuOpen(false)}
            >
              <FiX size={24} />
            </button>

            <Link to="/" onClick={() => setMenuOpen(false)}>
              <h2 className="text-3xl font-bold mb-8 text-orange-400">
                Adeola Store
              </h2>
            </Link>

            <nav className="space-y-6">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-white p-2"
              >
                🏠 Home
              </Link>

              <Link
                to="/vendor-create-product"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-white p-2"
              >
                <FiBox /> Create Product
              </Link>

              <button
                onClick={handleVendorLogout}
                className="flex items-center gap-3 text-left hover:text-white p-2 text-red-400"
              >
                <FiLogOut /> Logout
              </button>
            </nav>
          </div>
        </>
      )}

      {/* ---------------------- DESKTOP SIDEBAR ---------------------- */}
      <aside className="w-64 bg-gray-900 text-gray-200 px-6 py-8 hidden md:block">
        <h1 className="text-2xl font-bold mb-12">Perfume Store</h1>

        <nav className="space-y-4">
          <Link
            to="/vendor-create-product"
            className="flex items-center gap-3 hover:text-white p-2"
          >
            <FiBox /> Create Product
          </Link>

          <Link to="/" className="flex items-center gap-3 hover:text-white p-2">
            Home
          </Link>

          <button
            onClick={handleVendorLogout}
            className="flex items-center gap-3 hover:text-white p-2 text-red-400"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow w-full max-w-lg">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="ml-3 outline-none w-full"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Sale" value=" ₦400000" change="+4.3%" />
          <StatCard title="Total Purchase" value=" ₦1025200" change="-2.3%" />
          <StatCard title="Total Product" value="2,521" change="+8.2%" />
          <StatCard title="Total Customer" value="24,162" change="+6.2%" />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">#</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Sold Qty</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="py-2">{p.id}</td>
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.price}</td>
                    <td className="py-2">{p.sold}</td>
                    <td className="py-2">{p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Product Requests */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Product Requests</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {productRequests.map((r, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{r.name}</td>
                    <td className="py-2">{r.date}</td>
                    <td className="flex items-center gap-2 py-2">
                      <span
                        className={`w-3 h-3 rounded-full ${statusColor(
                          r.color
                        )}`}
                      ></span>
                      {r.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------------- STAT CARD COMPONENT ---------------------- */
function StatCard({ title, value, change }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
      <p
        className={`text-sm mt-1 ${
          change.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {change} this month
      </p>
    </div>
  );
}
