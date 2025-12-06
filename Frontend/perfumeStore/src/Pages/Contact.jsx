// src/pages/ContactUs.jsx
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-center mb-8">
        Have questions or feedback? Reach out to us and we’ll get back to you!
      </p>
      <p>Phone: +23480********</p>
      <p>Email: adeolaisaiah01@gmail.com</p>

      {/* Your contact form or info goes here */}

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
