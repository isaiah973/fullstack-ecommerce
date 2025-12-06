// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-orange-400">Adeola Store</h2>
          <p className="text-gray-300">123 Adeola Street, Lagos, Nigeria</p>
          <p className="text-gray-300">Email: adeolastore@example.com</p>
          <p className="text-gray-300">Phone: +234 801 234 5678</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <Link to="/" className="text-gray-300 hover:text-orange-400">
            Home
          </Link>
          <Link to="/" className="text-gray-300 hover:text-orange-400">
            Shop
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-300 hover:text-orange-400"
          >
            Contact Us
          </Link>
          <Link to="/" className="text-gray-300 hover:text-orange-400">
            FAQ
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-4 mt-1">
            <a href="#" className="hover:text-orange-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Adeola Store. All rights reserved.
      </div>
    </footer>
  );
}
